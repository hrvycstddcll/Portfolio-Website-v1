import { Terminal } from "lucide-react";
import { Menu } from "lucide-react";
import { MoveUpRight  } from "lucide-react";
import { X } from "lucide-react"
import { gsap } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";
import { use, useRef } from "react";
import { useState } from "react";

const navLinks = [
  { name: "HOME", href: "#home", id: "01"},
  { name: "SKILLS", href: "#skills", id: "02"},
  { name: "PROJECTS", href: "#projects", id: "03"},
  { name: "CONTACT", href: "#contact", id: "04"},
];

export default function Navbar() {
  
  const [mobileIsOpen, setMobileIsOpen] = useState(false);
  const navRefDesk = useRef(null);
  const navRefMob = useRef(null);
  useGSAP(() => {
    const tl = gsap.timeline(
      {
        defaults: {ease: "power4.out"}

      }
    );
    tl.from(navRefDesk.current, {
      opacity: 0, filter: "blur(20px)", y: -20,
      duration: 1, ease: "power2.out"
    })
    .fromTo(".desk-link", 
      {opacity: 0, y:-30},
      {opacity: 1, y: 0, stagger:0.2, duration: 0.3, ease: "power3.out"}
    );

  }, {scope: navRefDesk})
  useGSAP(() => {
    if (mobileIsOpen && navRefMob.current) {
      const tl = gsap.timeline();

      tl.fromTo(navRefMob.current, 
        {opacity: 0},
        {opacity: 1, duration: 0.1, ease: "power2.out", clearProps: "opacity"}
      ).fromTo( ".mob-link", 
        {opacity: 0, x:-30},
        {opacity: 1, x: 0, stagger:0.2, duration: 0.3, ease: "power3.out"}
      )
    }
  }, {scope: navRefMob, dependencies: [mobileIsOpen]});

  const {contextSafe: contextDesk} = useGSAP({scope: navRefDesk});
  const rollEnter = contextDesk((e) => {
    const li = e.currentTarget;
    const rolls = li.querySelectorAll(".nav-links");
    const id = li.querySelector(".nav-id");

    gsap.to(rolls, {
      yPercent: -50, duration: 0.3, ease: "power2.inOut", stagger: 0.025,
      overwrite: "auto",
    })
    if (id) {
      gsap.to(id, {
        color:"#ad7e23", xPercent:-10, duration: 0.25, overwrite: "auto",
      })
    }
  });
  
  const rollLeave = contextDesk((e) => {
    const li = e.currentTarget;
    const rolls = li.querySelectorAll(".nav-links");
    const id = li.querySelector(".nav-id");

    gsap.to(rolls, {
      yPercent: 0, duration: 0.5, ease: "power2.inOut", stagger: 0.025,
      overwrite: "auto",
    })
    if(id) {
      gsap.to(id, {
        color:"#a3a3a3", xPercent:0, duration: 0.25, overwrite: "auto",
      })
    }
  });

  return(
    <>

        <nav ref={navRefDesk} className="fixed top-0 left-0 w-full z-50 border-b border-white/10 backdrop-blur-md bg-black/20">
          
          <div className="flex justify-between items-center px-8">

            <div className="flex justify-center items-center">
              <img src="icon.svg" alt="logo" className="h-15 w-auto"/>
            </div>
            <ul className="hidden md:flex justify-center items-center gap-12">
              {navLinks.map((link) => (
                <li key={link.name} className="desk-link flex text-xs lg:text-lg tracking-tight space-x-2"
                onMouseEnter={rollEnter}
                onMouseLeave={rollLeave}
                >
                  <span className="nav-id text-neutral-400 font-mono "> {link.id}</span>
                  <a href={link.href} className="flex items-center">
                    {link.name.split("").map((char, index) => (
                      <span key={index} className="relative overflow-hidden inline-block h-3 lg:h-4">
                        <span className="nav-links flex flex-col">
                          <span className="text-neutral-300 font-inter leading-none">
                            {char === " " ? "\u00A0" : char}
                          </span>
                          <span className="text-amber-400 font-inter font-semibold leading-none">
                            {char === " " ? "\u00A0" : char}
                          </span>
                        </span>
                      </span>
                    ))}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex justify-cente items-center gap-15">
              
              <button onClick={() => setMobileIsOpen((prev) => !prev)} className="h-5 w-5 md:hidden cursor-pointer hover:-rotate-360 transition-all duration-700">
                {mobileIsOpen 
                ? <X className="text-amber-400"/>
                : <Menu className="text-neutral-300"/>
                }
              </button>
            </div>
          </div>
        </nav>

        {mobileIsOpen && 
          (
            <nav ref={navRefMob} className="fixed md:hidden inset-0 z-40 border-b border-white/10 backdrop-blur-md bg-black/90 p-8 pt-28 overflow-y-auto">
              <div className="flex flex-col ">
                <ul className="flex flex-col min-h-[calc(100vh-20rem)]">
                  <div className="items-start space-y-4 sm:space-y-8">
                    {navLinks.map((link) => (
                      <li key={link.name} className="mob-link border-b border-white/10 pb-4"
                      onClick={() => setMobileIsOpen(false)}
                      >
                        <a href={link.href} className="flex items-baseline justify-between tracking-[0.15em] group group-hover:text-amber-400 transition-all">
                          <span className="text-neutral-300 text-2xl font-inter font-semibold group-hover:text-amber-300 transition-all">
                            {link.name}  
                          </span>
                          <span className="text-neutral-400 text-xs font-mono group-hover:text-[#ad7e23] transition-all">
                            {link.id}
                          </span>
                        </a>
                      </li>
                    ))}
                  </div>
                </ul>
                <div className="mob-link flex flex-col pt-8 items-center">
                  <span className="font-inter text-neutral-300 text-xs tracking-[0.2em]">
                    AVAILABLE FOR COMISSIONS
                  </span>
                  <span className="font-mono text-xs text-amber-400">
                    2026
                  </span>
                </div>
              </div>
            </nav>
          )
        }
    </>

    
  )  
}
