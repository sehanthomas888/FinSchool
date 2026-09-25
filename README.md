# R357 Education

Repository: https://github.com/sehanthomas888/R357-Education

R357 Education is the umbrella for a set of schools. Each school teaches one subject from its sources: plain-English lessons, interactive tools and breakdowns of the research behind the ideas.

| Folder | What it is | Vercel project | Address |
| --- | --- | --- | --- |
| `portal/` | Landing page listing all schools | `r357-education` | https://r357-education.vercel.app |
| `marginal/` | **Marginal by R357**: finance and economics | `marginal-r357` | https://marginal-r357.vercel.app |

All sites are static (plain HTML, CSS and JavaScript, no build step). Each folder is deployed as its own Vercel project by setting that project's **Root Directory** to the folder. Every push to `main` redeploys whichever projects are affected.

## Run a school locally

```bash
node marginal/serve.js   # then open http://localhost:8123
```

You can also open `marginal/index.html` directly in a browser.

## Adding a new school (for example physics)

1. Create a new folder next to `marginal/` (for example `physics/`) with its own `index.html`.
2. In Vercel, create a new project from this repo and set its Root Directory to that folder.
3. Add a card for it in `portal/index.html`.
4. When a second school exists, move the shared engine (styles, charts, quiz and progress code) into a `shared/` folder so schools reuse it instead of copying it.

## Marginal's content layout

`marginal/content-*.js` hold the lessons, paper breakdowns, glossary and formula sheet; `marginal/widgets.js` holds the interactive tools; `marginal/app.js` is the router and UI. The order of lessons is set by the `TRACKS` list at the top of `marginal/app.js`.
