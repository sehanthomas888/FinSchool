// Independent recomputation of the worked examples, quiz answers and widget formulas. Run: node tools/check-math-core.js
const close=(a,b,t=0.006)=>Math.abs(a-b)<=t*Math.max(1,Math.abs(b));
let fails=0; const T=(name,got,want,tol)=>{const ok=close(got,want,tol); if(!ok){fails++;} console.log((ok?'OK  ':'FAIL')+' '+name+' got '+(+got).toFixed(5)+' want '+want);};
// exact normal CDF via erf series
const Phi=x=>{let s=x,t=x;for(let i=1;i<300;i++){t*=x*x/(2*i+1);s+=t;}return 0.5+s*Math.exp(-x*x/2)/Math.sqrt(2*Math.PI);};
// math basics
T('1.07^3',Math.pow(1.07,3),1.225043);
T('e^.05 *100',100*Math.exp(.05),105.13);
T('e^-.015',Math.exp(-.015),0.9851);
T('ln1.1',Math.log(1.1),0.0953);
const r=[4,12,-2,10],m=r.reduce((a,b)=>a+b)/4; const v=r.reduce((a,b)=>a+(b-m)**2,0)/4; T('sd pop',Math.sqrt(v),5.477); T('sd sample',Math.sqrt(v*4/3),6.325);
T('daily->yearly',1*Math.sqrt(252),15.87); T('15%/sqrt252',15/Math.sqrt(252),0.945); T('25*sqrt.5',25*Math.sqrt(.5),17.68);
T('z=-.467',(0-7)/15,-0.4667); T('N(z)',Phi(-7/15),0.32,0.02);
T('N(1)',Phi(1),0.8413);T('N(-1)',Phi(-1),0.1587);T('N(2)',Phi(2),0.9772);T('N(1.645)',Phi(1.645),0.95,0.001);
// TVM
T('PV 1225.04',1225.04/Math.pow(1.07,3),1000);
T('NPV',-1000+600/1.1+600/1.21,41.32);T('perp',50/.05,1000);T('gordon',2/(.08-.03),40);
// risk
const w=.6,sa=18,sb=6,rho=.2; const t1=w*w*sa*sa,t2=(1-w)**2*sb*sb,t3=2*w*(1-w)*rho*sa*sb; T('t1',t1,116.64);T('t2',t2,5.76);T('t3',t3,10.368);T('port sd',Math.sqrt(t1+t2+t3),11.52);T('wavg sd',.6*18+.4*6,13.2);T('port mu',.6*8+.4*3,6);T('Sharpe mix',(6-2)/Math.sqrt(t1+t2+t3),0.347);T('Sharpe stocks',(8-2)/18,0.333);
// capm
T('capm',3+1.3*5.5,10.15);T('capm quiz',3+1.2*5,9);
// prospect
T('100^.88',Math.pow(100,.88),57.5,0.01);T('-2.25*',2.25*Math.pow(100,.88),129.4,0.01);T('need',Math.pow(2.25,1/.88)*100,251,0.01);
// capstruct
T('rE',10+(10-5)*1,15);T('blend',.5*15+.5*5,10);T('rE tax',10+(10-5)*.75*(.4/.6),12.5);T('wacc',.6*12.5+.4*5*.75,9);T('wacc formula',10*(1-.25*.4),9);T('quiz rE',10+(10-6)*.5,12);T('VL',100+.25*40,110);
// BS
const bs=(S,K,T_,s,r)=>{const d1=(Math.log(S/K)+(r+s*s/2)*T_)/(s*Math.sqrt(T_)),d2=d1-s*Math.sqrt(T_);return{d1,d2,C:S*Phi(d1)-K*Math.exp(-r*T_)*Phi(d2),P:K*Math.exp(-r*T_)*Phi(-d2)-S*Phi(-d1)}};
const b=bs(100,100,.5,.25,.03); T('d1',b.d1,0.1732);T('d2',b.d2,-0.0035);T('N(d1)',Phi(b.d1),0.5688);T('N(d2)',Phi(b.d2),0.4986);T('S*N(d1)',100*Phi(b.d1),56.88);T('K e-rT N(d2)',100*Math.exp(-.015)*Phi(b.d2),49.12);T('C',b.C,7.76);T('P',b.P,6.27);T('parity',b.C-b.P,1.49);T('S-Ke-rT',100-100*Math.exp(-.015),1.49);T('drift',(.03+.03125)*.5,.030625);T('wobble',.25*Math.sqrt(.5),.1768);
const b2=bs(100,100,1,.2,.05); T('BS ref C (10.4506)',b2.C,10.4506,0.0005);T('BS ref P (5.5735)',b2.P,5.5735,0.0005);
// rates
T('fisher',(1.05/1.03-1)*100,1.94);
// pm-cal
T('CAL ret',3+.5*5,5.5);T('CAL sd',.5*16,8);T('y*',.05/(4*.0256),0.488,.005);T('y* A2',.05/(2*.0256),0.977,.005);T('y* A8',.05/(8*.0256),0.244,.005);
// pm-perf
T('sharpe fund',(11-3)/18,.444);T('sharpe mkt',(8-3)/15,.333);T('treynor',(11-3)/1.1,7.27);T('alpha',11-(3+1.1*5),2.5);T('IR',(11-8)/4,.75);T('t10',.75*Math.sqrt(10),2.37);T('t3',.75*Math.sqrt(3),1.30);T('alpha quiz',12-(3+1.2*6),1.8);T('IR quiz t',0.5*Math.sqrt(4),1.0);
// fees
T('low fee',10000*Math.pow(1.0695,30),75063,.001);T('high fee',10000*Math.pow(1.06,30),57435,.001);
// VaR
const z95=1.6449; T('VaR',1e6*(z95*(.15/Math.sqrt(252))-.07/252),15265,.005);
T('CVaR',1e6*((.15/Math.sqrt(252))*Math.exp(-z95*z95/2)/Math.sqrt(2*Math.PI)/.05-.07/252),19213,.005);
// FSA
T('CFO',187.5+100-150,137.5); T('NI ex',(1000-650-100)*.75,187.5);
T('gm',400/1000,.4);T('roe',94.5/550,.1718);T('roa',94.5/1200,.07875);T('cur',370/250,1.48);T('quick',220/250,.88);T('cov',150/24,6.25);T('turn',600/150,4);T('D/E',400/550,.727);T('ni',(150-24)*.75,94.5);
T('dupont',.08*1.2*2,.192);T('sust g',.15*.6,.09);
T('FIFO cogs',1000+20*11,1220);T('LIFO cogs',100*11+20*10,1300);T('FIFO gp',120*22-1220,1420);T('LIFO gp',120*22-1300,1340);
T('accrual ratio',40/1000,.04);
T('FCFF',200*.75+50-80-10,110);
let f=100,pv=0; for(let t=1;t<=5;t++){f*=1.08;pv+=f/Math.pow(1.09,t);} const tv=f*1.025/.065, pvtv=tv/Math.pow(1.09,5); T('FCF5',f,146.93);T('PV1-5',pv,486.4);T('TV',tv,2317,.002);T('PVTV',pvtv,1506,.003);T('EV',pv+pvtv,1992,.002);T('per share',(pv+pvtv-300)/100,16.92,.003);T('TV share',pvtv/(pv+pvtv),.756,.01);
T('PE',.6/.045,13.33);T('PE g5',.6/.03,20);T('EV',800+300-100,1000);T('EV/EBITDA',1000/125,8);
T('Z',1.2*.15+1.4*.25+3.3*.10+.6*1.2+1.1,2.68);
T('bond',-7*.01,-.07);
console.log(fails?('FAILS: '+fails):'ALL NUMERIC CHECKS PASSED');

process.exit(fails ? 1 : 0);
