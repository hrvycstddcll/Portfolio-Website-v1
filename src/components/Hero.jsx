import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import MorphSVGPlugin from "gsap/MorphSVGPlugin";




gsap.registerPlugin(Flip, SplitText, ScrollTrigger, MorphSVGPlugin);

const roles = [ "WEB DEV", "FREELANCER", "STUDENT"];
const status = [
  {top: "3+", bottom: "YEARS OF LEARNING"},
  {top: "100%", bottom: "DEDICATION TO QUALITY"},
  {top: "10+", bottom: "TECH STACKS"},
  
];

export default function Hero() {
  const heroSection = useRef(null);
  const statsRef = useRef([]);


  return (
    <section
      ref={heroSection}
      className="relative min-h-screen w-full max-w-full overflow-x-hidden mx-auto pt-6 pb-8 sm:pt-18 md:pt-25 bg-black overflow-hidden"
    >
      <div className="flex flex-col md:flex-row w-full h-auto md:h-[600px]">
        
        {/* LEFT SIDE // TOP */}
        <div className="z-10 w-full md:w-1/2 flex flex-col justify-center items-start px-4 md:px-8 py-12 sm:py-0 select-none">
          
          <div className="flex flex-col py-2 gap-2">
            <div className="hero-roles flex items-start gap-2 min-[100px]:max-[280px]:flex-col">
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-neutral-300 uppercase font-mono">
                I AM A
              </span>
              <div className="group relative inline-flex h-5 sm:h-6 min-w-[150px] sm:min-w-[200px] overflow-hidden items-center">
                {roles.map((role, idx) => (
                  <span
                    key={role}
                    className="text-roller absolute left-0 text-xs sm:text-sm font-semibold tracking-[0.2em] text-amber-400 uppercase font-inter whitespace-nowrap opacity-0"
                    style={{ animationDelay: `${idx * 2}s` }}
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex pb-2">
              <div className="h-0.5 min-w-[45px] bg-amber-400"/>
              <div className="h-0.5 min-w-[15px] bg-amber-600"/>
            </div>
          </div>
          
          <h1
            className="hero-fn z-10 flex flex-col font-bebas text-[clamp(1.5rem,10vw,6rem)] text-white tracking-widest leading-[0.9em]">
            <span>Creative</span>
            <span className="text-amber-400 -mt-[0.05em]">Engineering</span>
            <div className="flex flex-col items-start -mt-[0.05em]">
              <span className="text-white">
                &#40;Hybrid <span className="text-amber-400">UI/UX</span> &#43;
              </span>
              <span className="text-neutral-400">
                Web Dev<span className="text-white">&#41;</span>
              </span>
            </div>
          </h1>
          

          <div className="pt-4 flex flex-col gap-8 w-full max-w-xl">
            <p className="hero-phrase text-neutral-400 font-inter w-full text-sm sm:text-base sm:max-w-sm md:max-w-md leading-relaxed">
              I transform ideas into digital experiences with clean code, modern design, and innovative problem-solving.
            </p>
          </div>
          
          <div className="flex flex-col gap-y-3 py-2 w-full">

            <div className="flex items-center justify-center w-full max-w-[500px]">
              <div className="bg-neutral-800 h-[0.5px] w-full"/>
              <div className="bg-neutral-600 h-[1px] min-w-4"/>
              <div className="bg-neutral-400 h-[1.5px] min-w-2.5"/>
              <div className="bg-neutral-200 h-1 w-1 rounded-full ml-0.5"/>
            </div>

           
            <div className="flex divide-x divide-neutral-800"> 
              {status.map((stats, idx) => (
                <div key={idx} ref={(el) => (statsRef.current[idx] = el)}
                className="flex text-neutral-50 text-xl items-start gap-1  py-2 px-3 first:pl-0">
                  <div className="flex flex-col items-start justify-center gap-1">
                    <span className="font-inter font-bold text-amber-300 tracking-widest text-sm sm:text-2xl ">
                      {stats.top}
                    </span>
                    <span className="font-inter font-light text-neutral-300 text-[10px] sm:text-xs tracking-wide
                    min-[100px]:max-[280px]:text-[8px]">
                      {stats.bottom}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* DESIGNLEFTSIDE */}
          <div className="absolute z-10 top-30 left-0 h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full blur-3xl bg-neutral-300/20 animate-pulse duration-700
          -translate-x-50"/>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[-10] h-[100px] w-[200px] sm:h-[200px] sm:w-[400px] md:h-[300px] md:w-[700px] pointer-events-none select-none overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_80%)]" />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[-10] h-[50px] w-[100px] sm:h-[100px] sm:w-[200px] md:h-[200px] md:w-[500px] pointer-events-none select-none overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:radial-gradient(ellipse_at_bottom,black_40%,transparent_80%)]" />
          </div>

        </div>  


        {/* RIGHT SIDE // BOTTOM */}
        <div className="relative flex w-full md:w-1/2 min-h-[500px] overflow-visible items-end justify-end">
  
          <div className="absolute z-10 right-0 top-[clamp(280px,18%,400px)] md:top-[clamp(450px,50%,550px)] translate-y-full rotate-90 origin-top-right text-neutral-200 font-bebas text-[clamp(4rem,12vw,9rem)] whitespace-nowrap pointer-events-none select-none">
            <span>HRVY</span>
            <span className="text-neutral-400">CSTD</span>
            <span className="text-neutral-500">DCLL</span>
          </div>

          <img 
            src="/harveybg.png" 
            alt="Harvey" 
            className="absolute bottom-0 right-0 z-20 max-h-full max-w-full object-contain object-bottom-right 
            sm:scale-130 sm:-translate-x-20 md:scale-150 md:-translate-x-20
            mask-[linear-gradient(to_bottom,black_75%,transparent)]
            [-webkit-mask-image:linear-gradient(to_bottom,black_75%,transparent),linear-gradient(to_right,black_75%,transparent)] 
            [-webkit-mask-composite:source-in] [mask-composite:intersect]" 
          />

          {/* DESIGN RIGHTSIDE */}
          <div className="absolute z-10 top-0 left-0 h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full blur-3xl bg-neutral-300/20 animate-pulse duration-1000"/>
          <div className="absolute z-0 top-1/2 -translate-y-1/2 right-0 translate-x-[35%]  h-[500px] w-[500px] md:h-[800px] md:w-[800px] rounded-full border-3 border-neutral-800 [mask-image:linear-gradient(to_right,black_0%,transparent_30%)]"/>
          
        </div>    

      </div>
      
    </section>
  );
}