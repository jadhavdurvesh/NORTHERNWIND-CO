import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDownRight, ArrowUpRight, CheckCircle2, Copy, Instagram, Mail, Menu, Navigation, Send, Wind, X } from 'lucide-react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import './styles.css';

const services = [
  ['01', 'SOCIAL PRESENCE', 'Social media management built around a consistent, recognisable brand voice.', ['FEEDBACK LOOP', 'BRAND VOICE']],
  ['02', 'CONTENT SYSTEMS', 'Planned monthly deliverables that turn ideas, assets and offers into a dependable content rhythm.', ['MONTHLY PRODUCTION', 'CONTENT RHYTHM']],
  ['03', 'BRAND MOMENTUM', 'Creative direction, content and feedback cycles designed to keep your presence moving.', ['ONGOING EVOLUTION', 'CREATIVE DIRECTION']]
];
const packages = [
  ['01 // FLIGHT', 'Basic', 'A focused starting point for building a consistent social presence.', ['Scoped monthly deliverables', 'Structured feedback', 'Selected platform coverage']],
  ['02 // STEADY RUN', 'Growth', 'More room for recurring content and a stronger monthly rhythm.', ['Expanded monthly deliverables', 'Platform-ready content', 'Creative direction', 'Platform coverage']],
  ['03 // AMPLITUDE', 'Premium', 'A deeper ongoing creative partnership for ambitious brands.', ['Extended monthly deliverables', 'Ongoing content production', 'Structured review cycle']],
  ['04 // ARCHITECT', 'Custom', 'A tailored scope shaped around your platforms and deliverables.', ['Custom scope & deliverables', 'Tailored platform coverage', 'Custom creative direction']]
];

function Aurora() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; const gl = canvas?.getContext('webgl'); if (!gl) return;
    const resize = () => { const d = Math.min(devicePixelRatio || 1, 1.5); canvas.width = canvas.clientWidth*d; canvas.height = canvas.clientHeight*d; gl.viewport(0,0,canvas.width,canvas.height); };
    resize(); window.addEventListener('resize', resize);
    const vs = 'attribute vec2 p; void main(){gl_Position=vec4(p,0.,1.);}';
    const fs = `precision highp float; uniform float t; uniform vec2 r; uniform vec2 m;
      float n(vec2 p){return sin(p.x*3.1+sin(p.y*2.7+t))*.5+.5*sin(p.y*4.0+p.x*1.4-t*.7);}
      void main(){vec2 u=gl_FragCoord.xy/r; vec2 q=u-.5; float v=n(u*2.5+vec2(t*.08,-t*.04))+n(u*5.-vec2(t*.04,t*.07))*.3; float g=exp(-length(u-m/r)*3.2); vec3 a=vec3(.035,.065,.095),b=vec3(.08,.16,.21),c=vec3(.32,.74,.82); vec3 col=mix(a,b,u.y+v*.12); col+=c*pow(clamp(v*.5+.5,0.,1.),3.)*.18+c*g*.07; float vig=1.-.32*length(q*vec2(r.x/r.y,1.)); gl_FragColor=vec4(col*vig,1.);}`;
    const sh=(type,src)=>{const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);return s}; const p=gl.createProgram(); gl.attachShader(p,sh(gl.VERTEX_SHADER,vs));gl.attachShader(p,sh(gl.FRAGMENT_SHADER,fs));gl.linkProgram(p);gl.useProgram(p);
    const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);const loc=gl.getAttribLocation(p,'p');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    const ut=gl.getUniformLocation(p,'t'),ur=gl.getUniformLocation(p,'r'),um=gl.getUniformLocation(p,'m');let mouse={x:canvas.width*.5,y:canvas.height*.5},frame;
    const mm=e=>{const x=e.clientX-canvas.getBoundingClientRect().left,y=e.clientY-canvas.getBoundingClientRect().top;mouse={x:x/canvas.clientWidth*canvas.width,y:(1-y/canvas.clientHeight)*canvas.height}};window.addEventListener('mousemove',mm);
    const draw=time=>{gl.uniform1f(ut,time*.001);gl.uniform2f(ur,canvas.width,canvas.height);gl.uniform2f(um,mouse.x,mouse.y);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);frame=requestAnimationFrame(draw)};frame=requestAnimationFrame(draw);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('resize',resize);window.removeEventListener('mousemove',mm)};
  },[]);
  return <canvas ref={ref} className="aurora" aria-hidden="true"/>;
}

function Radar() { return <div className="radar"><div className="radar-grid"><span/><span/><span/></div><div className="sweep"/><div className="radar-cross h"/><div className="radar-cross v"/><div className="radar-core"><b>NW</b><small>SYSTEM</small></div><label className="r1">PLAN</label><label className="r2">CREATE</label><label className="r3">REFINE</label><label className="r4">REPEAT</label></div> }

function App(){
  const [menu,setMenu]=useState(false),[focus,setFocus]=useState('Social Presence'),[copied,setCopied]=useState(false);
  const {scrollYProgress}=useScroll(); const progress=useSpring(scrollYProgress,{stiffness:80,damping:20}); const heroY=useTransform(progress,[0,.25],['0%','14%']);
  const copyEmail=()=>navigator.clipboard?.writeText('hello@northernwind.co').then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2200)});
  return <div className="app">
    <motion.div className="progress" style={{scaleX:progress}}/><div className="noise"/>
    <header className="nav"><div className="navInner">
      <a className="brand" href="#top"><span className="mark">N</span><span><b>Northernwind &amp; Co</b><small>A DMJ Group company</small></span></a>
      <div className="coord"><i/>64°N <span>→</span></div>
      <nav className="links"><a href="#services">Services</a><a href="#the-north-star">Systems</a><a href="#packages">Packages</a><a href="#approach">Studio</a></nav>
      <a className="navcta" href="#contact">Start a conversation <ArrowUpRight size={14}/></a><button className="menub" onClick={()=>setMenu(!menu)} aria-label="Menu">{menu?<X/>:<Menu/>}</button>
    </div></header>
    {menu&&<motion.div className="mobile" initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}}>{['services','the-north-star','packages','approach','contact'].map(x=><a key={x} href={'#'+x} onClick={()=>setMenu(false)}>{x.replaceAll('-',' ')}</a>)}</motion.div>}
    <main id="top">
      <section className="hero"><Aurora/><div className="heroLines">{[1,2,3,4].map(x=><span key={x}/>)}</div><motion.div className="heroMount" style={{y:heroY}}><i/><i/><i/></motion.div>
        <div className="container heroContent"><div className="pills"><span className="status"><i/> A DMJ GROUP COMPANY · CREATIVE &amp; SOCIAL · 64°08′N</span><span className="current"><Wind size={13}/> CURRENT: STEADY FLOW <em>ARCTIC CURRENT</em></span></div>
          <div className="heroGrid"><div><h1>Content<br/><span>that moves</span><br/>brands.</h1><p>We help businesses build a steady, recognisable presence through thoughtful social media and recurring content.</p><div className="actions"><a className="primary" href="#packages">Build momentum <ArrowUpRight size={16}/></a><a className="secondary" href="#services">Explore the studio <ArrowDownRight size={16}/></a></div></div>
            <div className="gauge"><div className="gaugeTop"><span><Wind size={17}/> ATMOSPHERIC GAUGE</span><small>SYS ACTIVE</small></div><div className="gaugeMain"><div className="compass"><Navigation size={26}/></div><div><b>STEADY FLOW</b><strong>Continuous Flow</strong><p>Predictable monthly publication rhythm.</p></div></div><div className="bar"><span>SYSTEMIC CADENCE</span><b>MONTHLY</b><i/></div></div>
          </div><div className="meta"><span>01 // INTRO · ARCTIC MOMENTUM</span><span>● SYSTEM RADIAL ARCHITECTURE</span><span>01 / 04</span></div>
        </div>
      </section>
      <section className="section north" id="the-north-star"><div className="container"><div className="sectionHead"><div><label>THE NORTH STAR // 01</label><h2>Steady motion.<br/><span>Clear presence.</span></h2></div><div><p>We treat content as a system, not a scramble. Every month is shaped around the platforms you need, the deliverables you select and the feedback loop that keeps work moving.</p><a href="#approach">How it works <ArrowDownRight size={15}/></a></div></div>
        <div className="flowPanel"><div className="flow"><div className="flowLabel"><span>● SYSTEMATIC CONTENT VECTOR</span><span>MONTHLY CADENCE</span></div><div className="stream"><i/><i/><i/><b/><b/><b/><label>SCOPE</label><label>DELIVERY</label><label>MOMENTUM</label></div><small>Standard reactive cycle: fragmented bursts &amp; brand burnout</small></div><div className="metrics"><article><b>DEFINED</b><span>Scope Predictability</span><p>Platforms, deliverables and monthly scope are agreed up front.</p></article><article><b>REPEAT</b><span>Recurring Rhythm</span><p>Consistent delivery keeps the work moving.</p></article></div></div>
      </div></section>
      <section className="section services" id="services"><div className="container"><div className="serviceHead"><span><Wind size={18}/> SERVICES // 02</span><small>MONTHLY RECURRING ARCHITECTURE</small></div><div className="serviceRows">{services.map((s,i)=><motion.article className="serviceRow" key={s[0]} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08}}><span className="num">{s[0]}</span><div><small>SERVICE</small><h3>{s[1]}</h3></div><div><p>{s[2]}</p><div className="tags">{s[3].map(t=><em key={t}>{t}</em>)}</div></div><a href="#contact"><ArrowUpRight/></a></motion.article>)}</div></div></section>
      <section className="section packageSection" id="packages"><div className="container"><div className="sectionHead"><div><label>CHOOSE YOUR CURRENT // 03</label><h2>Four ways to<br/><span>move forward.</span></h2></div><p>Monthly service packages designed to flex around your platforms, scope and deliverables.</p></div><div className="packageGrid">{packages.map((p,i)=><motion.article className={'package '+(i===1?'featured':'')} key={p[1]} initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.07}}>{i===1&&<b className="badge">PREVAILING GALE</b>}<div className="packageTop"><span>{p[0]}</span><Wind size={17}/></div><h3>{p[1]}</h3><p>{p[2]}</p><ul>{p[3].map(x=><li key={x}><CheckCircle2 size={16}/>{x}</li>)}</ul><a href="#contact">Select vector <ArrowUpRight size={15}/></a></motion.article>)}</div></div></section>
      <section className="section approach" id="approach"><div className="container approachGrid"><Radar/><div><label>THE NORTHERNWIND APPROACH // 04</label><h2>Quietly<br/><span>relentless.</span></h2><p>The work starts with scope, platforms and a monthly rhythm. We create, collect feedback and keep the system moving — so your brand can stay visible without everything feeling reactive.</p><div className="steps"><article><b>01</b><div><h4>Clear monthly scope</h4><p>Monthly scope, platform coverage and deliverables are agreed before work begins.</p></div></article><article><b>02</b><div><h4>Defined deliverables</h4><p>Approved content is prepared around the selected platforms and agreed deliverables.</p></div></article><article><b>03</b><div><h4>Structured feedback loop</h4><p>Client feedback and approvals stay structured so the monthly schedule keeps moving.</p></div></article></div></div></div></section>
      <section className="section contact" id="contact"><div className="container contactCard"><div><label>START A CONVERSATION</label><h2>Let’s give your<br/><span>brand some weather.</span></h2><p>Tell us what you’re building, which platforms matter and what kind of monthly support you need.</p><div className="focus"><b>FOCUS AREA:</b>{['Social Presence','Content Systems','Brand Momentum'].map(x=><button key={x} className={focus===x?'active':''} onClick={()=>setFocus(x)}>{x}</button>)}</div></div><div className="dispatch"><span>DIRECT FREQUENCY</span><div className="emailBox"><a href="mailto:hello@northernwind.co">hello@northernwind.co</a><button onClick={copyEmail} aria-label="Copy email"><Copy size={17}/></button></div>{copied&&<small className="copied">FREQUENCY COPIED TO CLIPBOARD ↗</small>}<a className="dispatchBtn" href={`mailto:hello@northernwind.co?subject=Inquiry:%20${encodeURIComponent(focus)}`}>Dispatch briefing <Send size={15}/></a><div className="attribution">NORTHERNWIND &amp; CO · PART OF DMJ GROUP <Instagram size={14}/></div></div></div></section>
    </main><footer><div className="container footerInner"><span>● SYSTEMS ACTIVE · INQUIRIES OPEN</span><span>A DMJ Group company</span><span>© {new Date().getFullYear()} Northernwind &amp; Co</span><a href="#top">Back to top ↑</a></div></footer>
  </div>
}
createRoot(document.getElementById('root')).render(<App/>);