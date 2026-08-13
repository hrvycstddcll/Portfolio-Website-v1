import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const CARDS_DATA = [
  {
    step: "01",
    tag: "VISION",
    title: "The Vision",
    subtitle: "Every project starts with a core question:",
    quote: "How can this feel unforgettable?",
    text: "I don't just build websites; I construct visual narratives that captivate users from the very first frame.",
  },
  {
    step: "02",
    tag: "IDENTITY",
    title: "Who I Am",
    subtitle: "Harvey Dacillo",
    text: "A web developer & creative designer who believes that digital products are far more than lines of code—they are living brand experiences.",
  },
  {
    step: "03",
    tag: "WORKFLOW",
    title: "My Process",
    subtitle: "Purposeful Development",
    text: "Every pixel serves a purpose. I bridge the gap between complex engineering and elegant, problem-solving UI design.",
  },
  {
    step: "04",
    tag: "OUTPUT",
    title: "What I Build",
    subtitle: "End-to-End Solutions",
    text: "From ultra-fast personal portfolios to complex web applications, I deliver scalable, performant, and memorable digital products.",
  },
];

const FIREFLIES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${(i * 3.7 + (i % 5) * 4) % 96}%`,
  top: `${10 + ((i * 7) % 85)}%`,
  size: i % 3 === 0 ? "w-2 h-2" : i % 2 === 0 ? "w-1.5 h-1.5" : "w-1 h-1",
  color: i % 4 === 0 ? "from-amber-300 to-amber-500" : i % 3 === 0 ? "from-orange-400 to-amber-600" : "from-amber-200 to-yellow-400",
}));

export default function About() {
  const aboutSection = useRef(null);
  const bgImg = useRef(null);
  const cardsRef = useRef([]);
  const shapesRef = useRef([]);
  const particlesRef = useRef([]);

  useGSAP(() => {
    const getPanDistance = () => {
        if (!bgImg.current) return 0;
        const imgHeight = bgImg.current.offsetHeight;
        const viewportHeight = window.innerHeight;
        return -(imgHeight - viewportHeight);
    }; 

    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      const isEven = index % 2 === 0;
      gsap.set(card, {
        x: isEven ? "-140" : "140",
        y: "80px",
        rotateY: isEven ? 25 : -25,
        rotateX: 10, opacity: 0, scale: 0.8, transformPerspective: 1000,
      });
    });

    shapesRef.current.forEach((shape, index) => {
      if(!shape) return;
      gsap.set(shape, {
        y: `${(index + 1) * 40}px`,
        rotate: index * 45, scale: 0.6 + (index % 3) * 0.3,
          opacity: 0.3,
      })
    });

    particlesRef.current.forEach((particle, index) => {
        if (!particle) return;
        gsap.set(particle, {
          opacity: 0.2 + (index % 5) * 0.15,
          scale: 0.8 + (index % 3) * 0.4,
        });
      });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutSection.current,
        start: "top top",
        end: "+=400%",
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
    tl.to(bgImg.current,
      {
        y: getPanDistance,
        ease: "none",
        duration: 100,
    },0);
    
    shapesRef.current.forEach((shape, index) => {
        if (!shape) return;
        const speed = (index + 1) * -80;
        const rotSpeed = (index % 2 === 0 ? 1 : -1) * 360;

        tl.to(
          shape,
          {
            y: `${speed}px`,
            rotateX: rotSpeed,
            rotateY: rotSpeed / 2,
            rotateZ: rotSpeed,
            scale: 1.1,
            opacity: 0.7,
            ease: "none",
            duration: 100,
          },
          0
        );
      });
    
    particlesRef.current.forEach((particle, index) => {
        if (!particle) return;
        const verticalDrift = -180 - (index % 7) * 60; 
        const horizontalSway = (index % 2 === 0 ? 1 : -1) * (30 + (index % 4) * 20);

        tl.to(
          particle,
          {
            y: `${verticalDrift}px`,
            x: `${horizontalSway}px`,
            opacity: index % 2 === 0 ? 0.9 : 0.3,
            ease: "none",
            duration: 100,
          },
          0
        );
      });

    const startUnit = 5;
    const endUnit = 90;
    const cardWindow = (endUnit - startUnit) / CARDS_DATA.length;

    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      const cardStart = startUnit + index * cardWindow;
      tl.to(card, {
        x: "0%", y: "0px", rotateY: 0, opacity: 1, scale: 1,
        duration: cardWindow * 0.3, ease: "power3.out",
      }, cardStart)
      .to(card, {
        y: "-30px", duration: cardWindow * 0.3, ease: "none",
      }, `>`)
      .to(card, {
        y: "-160px", rotateX: -15, opacity: 0,
        scale: 0.85, duration: cardWindow * 0.3, pointerEvents: "none",
        ease: "power3.in",
      }, `>`)
    });
  });
  return (
    <section
      ref={aboutSection}
      className="relative h-screen w-full overflow-hidden flex flex-col justify-between items-center select-none py-8 md:py-12"
    >
      <img src="/src/assets/tazm.png" alt="Spider-Man"
      ref={bgImg}
      className="absolute top-0 left-0 z-0 w-full h-auto min-h-full object-cover object-top pointer-events-none origin-top"/>
      <div className="relative z-20 text-center px-4 mt-2 sm:mt-4 transition-transform duration-200">
        <h1 className="relative font-bebas text-[10vh] sm:text-[14vh] md:text-[16vh] lg:text-[18vh]
         text-neutral-100 tracking-wider drop-shadow-2xl">
          ABOUT
        </h1>
      </div>   

      <div className="absolute inset-0 z-10 pointer-none overflow-hidden">

        <div
        ref={(el) => (shapesRef.current[0] = el)}
          className="absolute top-20 right-[15%] w-24 h-24 border-2 border-amber-400/30 rounded-xl"
        />
        <div
        ref={(el) => (shapesRef.current[1] = el)}
          className="absolute top-30 left-[12%] w-24 h-24 border-2 border-amber-400/30 rounded-full"
        />
        <div
          ref={(el) => (shapesRef.current[2] = el)}
          className="absolute top-1/2 left-[8%] w-16 h-16 border border-white/20 rotate-45 backdrop-blur-[2px]"
        />
        <div
          ref={(el) => (shapesRef.current[4] = el)}
          className="absolute bottom-32 left-[18%] w-32 h-32 rounded-full border-2 border-dashed border-amber-500/25"
        />
        <div
          ref={(el) => (shapesRef.current[5] = el)}
          className="absolute top-36 left-[25%] font-mono text-amber-400/40 text-3xl font-light"
        >
          +
        </div>
        <div
          ref={(el) => (shapesRef.current[6] = el)}
          className="absolute bottom-28 right-[22%] w-20 h-20 border-r-2 border-b-2 border-amber-400/40"
        />
        {FIREFLIES.map((p, idx) => (
          <div
            key={p.id}
            ref={(el) => (particlesRef.current[idx] = el)}
            style={{ left: p.left, top: p.top }}
            className={`absolute rounded-full bg-gradient-to-r ${p.color} ${p.size} shadow-[0_0_12px_rgba(251,191,36,0.8)] filter blur-[0.5px]`}
          />
        ))}
      </div>

      <div className="relative z-20  max-w-6xl w-full px-4 md:px-8 my-auto h-80 sm:h-96 flex items-center justify-center">
        {CARDS_DATA.map((card, idx) =>{
          const isEven = idx % 2 === 0;
          return (
              <div 
              key={idx} ref={(el) => (cardsRef.current[idx] = el)}
              className={`absolute flex flex-col justify-between p-6 sm:p-7 bg-neutral-900/80 backdrop-blur-xl border border-white/15 hover:border-amber-500/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] pointer-events-none w-[88vw] sm:w-[360px] md:w-[400px] transition-colors duration-300 group ${
                isEven
                  ? "left-4 sm:left-8 md:left-16"
                  : "right-4 sm:right-8 md:right-16"
              }`}>
              <div>
                <div className="absolute -top-12 -left-12 w-30 h-30 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-400/20"/>
                <div className="flex justify-between items-center border-b border-white/20 pb-3 mb-3 group-hover:border-amber-400">
                  <span className="font-mono font-bold text-amber-400 text-xs tracking-widest">
                    {card.step} // {card.tag}
                  </span>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full group-hover:bg-white/20"/>
                    <div className="w-1.5 h-1.5 bg-white/20 rounded-full group-hover:bg-amber-400"/>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-bebas font-bold text-white text-2xl sm:text-3xl tracking-widest">
                    {card.title}
                  </h3>
                  {card.subtitle && (
                    <span className="font-inter font-medium text-xs sm:text-sm text-neutral-300">
                      {card.subtitle}
                    </span>
                  )}
                  {card.quote && (
                    <span className="font-inter font-bold text-amber-400 text-xs sm:text-sm border-l-2 border-amber-400 my-1 pl-2 italic">
                      {card.quote}
                    </span>
                  )}

                  <p className="font-inter fotn-light text-neutral-300 text-xs sm:text-sm leading-relaxed">
                    {card.text}
                  </p>
                  <div className="flex justify-between font-mono text-neutral-400 text-xs sm:text-sm py-2 border-t border-white/20 group-hover:border-amber-400">
                    <span>
                      HRVYCSTDDCLL // DEV
                    </span>
                    <span>@2026</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
      </div>
    </section>
  );
}