-- Rosetta Education: learner accounts and saved progress.
--
-- Accounts themselves live in Supabase Auth (auth.users). This migration adds the one table the site needs:
-- one row per learner per course, holding their progress. Row Level Security guarantees a learner can only
-- ever read or change their own rows; the public (anon) key can do nothing to this table.

create table public.progress (
  user_id    uuid    not null references auth.users (id) on delete cascade,
  course_id  text    not null check (char_length(course_id) between 1 and 64),
  -- marks: { "<lessonId>": <signed milliseconds> }. Positive = completed at that time, negative = un-completed at that time.
  -- Keeping the time and sign lets two devices merge correctly, including "undo".
  marks      jsonb   not null default '{}'::jsonb,
  -- scores: { "<lessonId>": [correct, total] } (best quiz result per lesson)
  scores     jsonb   not null default '{}'::jsonb,
  -- denormalised counts so the school home page can show progress without loading a whole course
  done_count integer not null default 0 check (done_count >= 0),
  total      integer not null default 0 check (total >= 0),
  updated_at timestamptz not null default now(),
  primary key (user_id, course_id),
  -- a learner cannot store more than ~20 KB of progress per course
  constraint progress_size check (pg_column_size(marks) < 20000 and pg_column_size(scores) < 20000)
);

comment on table public.progress is 'Per-learner, per-course saved progress. Protected by row level security.';

alter table public.progress enable row level security;

create policy "learners read their own progress"
  on public.progress for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "learners create their own progress"
  on public.progress for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "learners update their own progress"
  on public.progress for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "learners delete their own progress"
  on public.progress for delete to authenticated
  using ((select auth.uid()) = user_id);

-- Grants: only signed-in learners get table access; the anonymous role gets none.
revoke all on public.progress from anon, public;
grant select, insert, update, delete on public.progress to authenticated;

-- Keep updated_at honest, whatever the client sends.
create function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger progress_touch_updated_at
  before update on public.progress
  for each row execute function public.touch_updated_at();

-- Let a learner delete their own account and all their data (progress is removed by the cascade above).
create function public.delete_my_account()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := (select auth.uid());
begin
  if uid is null then
    raise exception 'not signed in';
  end if;
  delete from auth.users where id = uid;
end;
$$;

revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;
