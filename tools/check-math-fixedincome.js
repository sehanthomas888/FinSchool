// Independent recomputation of the worked examples, quiz answers and widget formulas. Run: node tools/check-math-fixedincome.js
const priceN=(cpn,y,n,red,m=2,face=100)=>{const c=face*cpn/m,i=y/m; return c*(1-Math.pow(1+i,-n))/i+red*Math.pow(1+i,-n);};
// independent cash-flow-by-cash-flow pricing (no annuity shortcut)
const priceCF=(cpn,y,n,red,m=2,face=100)=>{let p=0;for(let t=1;t<=n;t++){p+=(face*cpn/m+(t===n?red:0))/Math.pow(1+y/m,t);}return p;};
let fails=0; const T=(nm,g,w,tol=0.002)=>{const ok=Math.abs(g-w)<=tol*Math.max(1,Math.abs(w)); if(!ok)fails++; console.log((ok?'OK  ':'FAIL')+' '+nm+' got '+g.toFixed(4)+' want '+w);};
T('price 5/4/10 annuity vs CF',priceN(.05,.04,20,100),priceCF(.05,.04,20,100),1e-9);
T('price*10',10*priceCF(.05,.04,20,100),1081.76);T('at 6%',10*priceCF(.05,.06,20,100),925.61);T('par',priceCF(.05,.05,20,100),100);
T('zero',1000/1.02**20,672.97);T('coupons PV',25*(1-1.02**-20)/.02,408.79);T('face PV',1000/1.02**20,672.97);
// bootstrap
const s2=Math.sqrt(104/(100-4/1.03))-1; T('spot2 (4.02%)',s2*100,4.02,.002);
T('check bootstrap eq',4/1.03+104/(1+s2)**2,100,1e-9);
T('fwd 3,4',(1.04**2/1.03-1)*100,5.01); T('108.16 check',100*1.04**2,108.16); T('via forward',103*(1+.0501),108.16,.001);
// duration by cash flow definition, brute force in years
const dur=(cpn,y,yrs)=>{const n=yrs*2;let P=0,D=0;for(let t=1;t<=n;t++){const pv=(100*cpn/2+(t===n?100:0))/(1+y/2)**t;P+=pv;D+=(t/2)*pv;}return D/P;};
T('Mac 5/5/10',dur(.05,.05,10),7.99);T('Mod',dur(.05,.05,10)/1.025,7.79);T('zero 10',dur(0,.05,10),10);T('8% coupon',dur(.08,.05,10),7.39);T('30y',dur(.05,.05,30),15.84);
// duration by numerical derivative (independent of the formula): -dP/dy / P
const P=y=>priceCF(.05,y,20,100); const h=1e-6; const numMod=-(P(.05+h)-P(.05-h))/(2*h)/P(.05); T('numeric mod dur',numMod,7.79);
const cvxNum=(P(.05+1e-4)+P(.05-1e-4)-2*P(.05))/(1e-8)/P(.05); T('numeric convexity',cvxNum,73.63,.002);
T('exact +1',(P(.06)/100-1)*100,-7.44);T('dur est',-7.7946,-7.79,.002);T('exact -2',(P(.03)/100-1)*100,17.17);
T('DV01 $',7.7946*1e6*1e-4,779,.002);
// YTM
const solve=(Pp,cpn,n,red)=>{let lo=-.2,hi=1.5;for(let k=0;k<200;k++){const mid=(lo+hi)/2;if(priceCF(cpn,mid,n,red)>Pp)lo=mid;else hi=mid;}return(lo+hi)/2;};
T('YTM 105',solve(105,.06,20,100)*100,5.35);T('YTC',solve(105,.06,10,102)*100,5.21);T('eff',((1+solve(105,.06,20,100)/2)**2-1)*100,5.42);T('CY',6/105*100,5.71);T('shortcut',(6+(100-105)/10)/102.5*100,5.37);
// credit
const rf=.04,lam=.02,R=.4,TT=5,S=Math.exp(-lam*TT),Pr=Math.exp(-rf*TT)*(S+R*(1-S));T('risky px',Pr*100,77.20);T('rf px',Math.exp(-rf*TT)*100,81.87);T('yield',-Math.log(Pr)/TT*100,5.18);T('spread bp',(-Math.log(Pr)/TT-rf)*1e4,117.6,.003);T('EL',0.03*0.6*1e6,18000);
// tips
T('BE',(1.04/1.015-1)*100,2.46);T('tips ret',(1.015*1.03-1)*100,4.55);
// immunization by explicit simulation of cash flows (brute force, separate code path)
const sim=(cpn,M,H,y0,dy)=>{const yp=y0+dy;let cash=0;const units=1/priceCF(cpn,y0,M,100,1);/*annual*/ const P0=(()=>{let p=0;for(let t=1;t<=M;t++)p+=(cpn*100+ (t===M?100:0))/(1+y0)**t;return p;})();
 let wealth=0; for(let t=1;t<=M;t++){const cf=cpn*100+(t===M?100:0); if(t<=H) wealth+=cf*(1+yp)**(H-t);} if(M>H){let pv=0;for(let t=H+1;t<=M;t++)pv+=(cpn*100+(t===M?100:0))/(1+yp)**(t-H); wealth+=pv;} return wealth/(P0*(1+y0)**H)-1;};
T('immun +1',sim(.05,10,8,.05,.01)*100,-0.06,.05);T('immun +3',sim(.05,10,8,.05,.03)*100,0.06,.1);T('immun -3',sim(.05,10,8,.05,-.03)*100,0.67,.02);T('20y +1',sim(.05,20,8,.05,.01)*100,-4.50,.005);T('20y +3',sim(.05,20,8,.05,.03)*100,-11.62,.005);
T('immun dur',(()=>{let p=0,d=0;for(let t=1;t<=10;t++){const pv=(5+(t===10?100:0))/1.05**t;p+=pv;d+=t*pv;}return d/p;})(),8.11,.002);
T('port dur',.5*4+.5*10,7,1e-9);
console.log(fails?('FAILS '+fails):'ALL FIXED-INCOME NUMERIC CHECKS PASSED');

process.exit(fails ? 1 : 0);
