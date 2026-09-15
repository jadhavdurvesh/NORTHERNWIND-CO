import React from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDownRight, ArrowUpRight, Instagram, Mail, Menu, MoveUpRight, X } from 'lucide-react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import './styles.css';

const services = [
  ['01','SOCIAL PRESENCE','Social media management built around a consistent, recognisable brand voice.'],
  ['02','CONTENT SYSTEMS','Planned monthly deliverables that turn ideas, assets and offers into a dependable content rhythm.'],
  ['03','BRAND MOMENTUM','Creative direction, content and feedback cycles designed to keep your presence moving.']
];
const packages = [
  ['01','Basic','A focused starting point for building a consistent social presence.'],
  ['02','Growth','More room for recurring content and a stronger monthly rhythm.'],
  ['03','Premium','A deeper ongoing creative partnership for ambitious brands.'],
  ['04','Custom','A tailored scope shaped around your platforms and deliverables.']
];
function App(){
  const [open,setOpen]=React.useState(false);
  const {scrollYProgress}=useScroll();
  const p=useSpring(scrollYProgress,{stiffness:70,damping:20});
  const fog=useTransform(p,[0,1],['0%','22%']);
  return <div className="app">
    <motion.div className="progress" style={{scaleX:p}}/><div className="noise"/>
    <header className="nav">
      <a className="brand" href="#top"><span className="mark">N</span><span><b>Northernwind</b><small>&amp; Co</small></span></a>
      <div className="links">{['services','packages','approach','contact'].map(x=><a key={x} href={'#'+x}>{x}</a>)}</div>
      <a className="navcta" href="#contact">Start a conversation <MoveUpRight size={15}/></a>
      <button className="menub" onClick={()=>setOpen(!open)} aria-label="Menu">{open?<X/>:<Menu/>}</button>
    </header>
    {open&&<motion.div className="mobile" initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}}>{['services','packages','approach','contact'].map(x=><a key={x} href={'#'+x} onClick={()=>setOpen(false)}>{x}</a>)}</motion.div>}
    <main id="top">
      <section className="hero section"><div className="wind">{[0,1,2,3,4,5,6].map(i=><i key={i} style={{'--i':i}}/>)}</div>
        <motion.div className="mountains" style={{y:fog}}><div/><div/><div/></motion.div>
        <div className="container heroIn"><p className="eyebrow">A DMJ Group company <span>·</span> Creative &amp; social</p>
          <h1><span>Content</span><em>that moves</em><span>brands.</span></h1>
          <p className="heroCopy">Northernwind &amp; Co helps businesses build a steady, recognisable presence through thoughtful social media and recurring content.</p>
          <div className="actions"><a className="primary" href="#contact">Build momentum <ArrowUpRight size={17}/></a><a className="textlink" href="#services">Explore the studio <ArrowDownRight size={17}/></a></div>
        </div><div className="container meta"><span>01 — INTRO</span><span>01 / 04</span></div>
      </section>
      <section className="section intro" id="services"><div className="container two"><div><p className="eyebrow">The north star</p><h2>Steady motion.<br/><span>Clear presence.</span></h2></div><div className="lead"><p>We treat content as a system, not a scramble. Every month is shaped around the platforms you need, the deliverables you select and the feedback loop that keeps work moving.</p><a className="inline" href="#approach">How it works <ArrowDownRight size={17}/></a></div></div>
        <div className="container list">{services.map((s,i)=><motion.article className="service" key={s[0]} initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08}}><span className="num">{s[0]}</span><div><div className="tag">SERVICE <span>↗</span></div><h3>{s[1]}</h3></div><p>{s[2]}</p></motion.article>)}</div>
      </section>
      <section className="section" id="packages"><div className="container"><div className="heading"><div><p className="eyebrow">Choose your current</p><h2>Four ways to<br/><span>move forward.</span></h2></div><p>Monthly service packages designed to flex around your platforms, scope and deliverables.</p></div>
        <div className="packlist">{packages.map((x,i)=><motion.div className="pack" key={x[0]} initial={{opacity:0,x:-18}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*.06}}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p><ArrowUpRight size={20}/></motion.div>)}</div>
      </div></section>
      <section className="section approach" id="approach"><div className="container approachIn"><div className="orbit"><div className="ring a"/><div className="ring b"/><div className="core">NW</div><span className="o o1">PLAN</span><span className="o o2">CREATE</span><span className="o o3">REFINE</span><span className="o o4">REPEAT</span></div><div><p className="eyebrow">The Northernwind approach</p><h2>Quietly<br/><span>relentless.</span></h2><p className="copy">The work starts with scope, platforms and a monthly rhythm. We create, collect feedback and keep the system moving — so your brand can stay visible without everything feeling reactive.</p><div className="points">{[['01','Clear monthly scope'],['02','Defined deliverables'],['03','Structured feedback loop']].map(x=><div key={x[0]}><b>{x[0]}</b><span>{x[1]}</span></div>)}</div></div></div></section>
      <section className="section contact" id="contact"><div className="container card"><div><p className="eyebrow">Start a conversation</p><h2>Let’s give your<br/><span>brand some weather.</span></h2></div><div className="cright"><p>Tell us what you’re building, which platforms matter and what kind of monthly support you need.</p><a className="darkbtn" href="mailto:hello@northernwind.co">hello@northernwind.co <Mail size={17}/></a><div className="cfoot"><span>Northernwind &amp; Co</span><span>Part of DMJ Group</span><Instagram size={17}/></div></div></div></section>
    </main><footer><div className="container foot"><span>© {new Date().getFullYear()} Northernwind &amp; Co</span><span>A DMJ Group company</span><a href="#top">Back to top ↑</a></div></footer>
  </div>
}
createRoot(document.getElementById('root')).render(<App/>);