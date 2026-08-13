import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';

const projects = [
  {
    id: '01',
    title: 'BCD Scholarship Profiling System',
    category: 'Full Stack Development',
    shortDescription: 'A Python and SQLite-powered information system built as an academic semestral project for digital scholar profiling.',
    fullDescription: 'Developed as a semestral project, the BCD Scholarship Profiling System replaces manual paper-based workflows with a centralized, local digital database. Built to streamline scholar management for administrators and applicants, it offers automated eligibility tracking, data verification, and secure record exports.',
    features: [
      'Automated applicant verification & eligibility checks',
      'Role-based access control for administrators and students',
      'Instant report generation and export capabilities',
      'Offline-first local database support via SQLite'
    ],
    githubUrl: 'https://github.com',
    liveUrl: null,
    image: 'https://raw.githubusercontent.com/hrvycstddcll/Portfolio-Website-v1/main/src/assets/p1s1.png',
    screenshots: [
      'https://raw.githubusercontent.com/hrvycstddcll/Portfolio-Website-v1/main/src/assets/p1icon.png',
      'https://raw.githubusercontent.com/hrvycstddcll/Portfolio-Website-v1/main/src/assets/Project1.png',
      'https://raw.githubusercontent.com/hrvycstddcll/Portfolio-Website-v1/main/src/assets/p1s1.png',
      'https://raw.githubusercontent.com/hrvycstddcll/Portfolio-Website-v1/main/src/assets/p1s2.png',
    ],
    tags: ['Python', 'SQLite', 'PyQt5', 'Desktop GUI'],
  },
  {
    id: '02',
    title: 'Hamster Pet Shop System',
    category: 'Full Stack Web Development',
    shortDescription: 'A Python, and MySQL-powered management system built as a semestral project running locally via XAMPP.',
    fullDescription: 'The Hamster Pet Shop System is a database-driven application built as a semestral project to manage pet shop operations locally. Hosted using XAMPP (Apache & MySQL) with Python backend integration, it provides centralized management for hamster supplies, customer transactions, automated inventory tracking, and sales reporting in a local environment.',
    features: [
      'Interactive product catalog with automated inventory updates',
      'Python-driven data processing and backend logic',
      'Local relational database management powered by MySQL',
      'Role-based features for administrative management and reporting',
      'Offline-first local web deployment hosted via XAMPP (Apache)'
    ],
    githubUrl: 'https://github.com/hrvycstddcll/HamsterPetShop',
    liveUrl: null,
    image: 'https://raw.githubusercontent.com/hrvycstddcll/Portfolio-Website-v1/main/src/assets/p2s2.png',
    screenshots: [
      'https://raw.githubusercontent.com/hrvycstddcll/Portfolio-Website-v1/main/src/assets/p2icon.jpg',
      'https://raw.githubusercontent.com/hrvycstddcll/Portfolio-Website-v1/main/src/assets/p2s1.png',
      'https://raw.githubusercontent.com/hrvycstddcll/Portfolio-Website-v1/main/src/assets/p2s2.png',
      'https://raw.githubusercontent.com/hrvycstddcll/Portfolio-Website-v1/main/src/assets/p2s3.png',
      'https://raw.githubusercontent.com/hrvycstddcll/Portfolio-Website-v1/main/src/assets/p2s4.png',
      'https://raw.githubusercontent.com/hrvycstddcll/Portfolio-Website-v1/main/src/assets/p2s5.png'
    ],
    tags: ['Python', 'MySQL', 'Apache', 'XAMPP'],
  },
  
];

export default function Projects() {
  const componentRef = useRef(null);
  const sectionRef = useRef(null);
  const modalRef = useRef(null);
  const modalContentRef = useRef(null);

  const [isClient, setIsClient] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      setActiveImage(selectedProject.image);
    }
  }, [selectedProject]);

  // Conditional GSAP Horizontal Scroll Setup (Desktop Only)
  useEffect(() => {
    if (!isClient) return;

    const mm = gsap.matchMedia();

    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      mm.add('(min-width: 768px)', () => {
        const section = sectionRef.current;
        if (!section || !componentRef.current) return;

        const cards = section.querySelectorAll('.snap-center');
        const lastCard = cards[cards.length - 1];

        const lastCardOffset = lastCard 
          ? (lastCard.offsetLeft + lastCard.offsetWidth / 2) - (window.innerWidth / 2)
          : section.scrollWidth - window.innerWidth;

        const animation = gsap.to(section, {
          x: -lastCardOffset,
          ease: 'none',
          scrollTrigger: {
            trigger: componentRef.current,
            pin: true,
            scrub: 1,
            end: () => `+=${section.scrollWidth}`,
            invalidateOnRefresh: true,
          },
        });

        return () => animation.kill();
      });
    }).catch((err) => {
      console.warn("GSAP ScrollTrigger failed to load:", err);
    });

    return () => mm.revert();
  }, [isClient]);

  // Modal Animation Handling
  useEffect(() => {
    if (selectedProject && modalRef.current && modalContentRef.current) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'power2.out' }
      );
      gsap.fromTo(
        modalContentRef.current,
        { y: 30, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out', delay: 0.05 }
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedProject]);

  const closeModal = () => {
    if (modalRef.current && modalContentRef.current) {
      gsap.to(modalContentRef.current, {
        y: 20,
        opacity: 0,
        scale: 0.98,
        duration: 0.2,
        ease: 'power2.in',
      });
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => setSelectedProject(null),
      });
    } else {
      setSelectedProject(null);
    }
  };

  // Safe 3D tilt calculation (Disabled for mobile/touch devices)
  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = (e) => {
    if (window.innerWidth < 768) return;
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  if (!isClient) {
    return <div className="h-screen w-full bg-black" />;
  }

  return (
    <div
      ref={componentRef}
      className="relative w-full overflow-hidden bg-black text-white min-h-screen py-12 md:py-0"
    >
      <div
        ref={sectionRef}
        className="flex flex-col md:flex-row md:h-screen w-full md:w-max items-center gap-8 md:gap-12 px-4 sm:px-8 md:px-20 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none"
      >
        {/* Intro Section */}
        <div className="w-full md:w-[380px] flex-shrink-0 md:pr-4 snap-start">
          <span className="text-xs font-bebas font-semibold tracking-[0.2em] text-amber-400 uppercase">
            RECENT PROJECTS
          </span>
          <h2 className="mt-2 font-inter text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-300">
            Selected Works
          </h2>
          <p className="mt-3 md:mt-4 font-mono text-neutral-400 text-xs sm:text-sm md:text-base leading-relaxed">
            Documenting continuous progress. Tap or click on any project card to inspect system details, screenshots, and architecture.
          </p>
        </div>

        {/* Project Cards Container */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full md:w-auto overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-6 md:pb-0 scrollbar-none">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={(e) => {
                // Verify if card is fully within viewport bounds before selecting
                const rect = e.currentTarget.getBoundingClientRect();
                const isFullyVisible =
                  rect.left >= 0 && rect.right <= window.innerWidth;

                if (isFullyVisible || window.innerWidth < 768) {
                  setSelectedProject(project);
                }
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="group relative flex flex-col justify-between min-h-[460px] md:min-h-[540px] h-auto w-full sm:w-[340px] md:w-[400px] flex-shrink-0 snap-center overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 p-5 md:p-6 shadow-lg cursor-pointer transition-all duration-200 ease-out hover:border-amber-400/50"
            >
              {/* Card Background Image */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover filter brightness-[0.75] transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              </div>

              {/* Header Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-base md:text-lg font-mono font-bold text-amber-400">
                  {project.id}
                </span>
                <span className="flex h-7 md:h-8 px-2.5 md:px-3 items-center justify-center rounded-full bg-neutral-900/80 text-[10px] md:text-xs font-mono text-neutral-300 backdrop-blur-md transition-colors group-hover:bg-amber-400 group-hover:text-black">
                  View Details ↗
                </span>
              </div>

              {/* Card Content Footer */}
              <div className="absolute bottom-5 left-5 right-5 md:bottom-6 md:left-6 md:right-6 z-10">
                <span className="text-xs md:text-sm font-bebas font-semibold uppercase tracking-[0.2em] text-amber-400">
                  {project.category}
                </span>
                <h3 className="mt-1 text-lg sm:text-xl font-bold font-inter text-white md:text-2xl line-clamp-1">
                  {project.title}
                </h3>
                <p className="mt-1 md:mt-2 text-[11px] md:text-xs font-inter text-neutral-300 line-clamp-2">
                  {project.shortDescription}
                </p>

                {/* Tech Tags */}
                <div className="mt-3 md:mt-4 flex flex-wrap gap-1.5 md:gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full font-mono bg-neutral-800/90 px-2 md:px-2.5 py-0.5 md:py-1 text-[9px] md:text-[10px] font-medium text-neutral-300 border border-neutral-700/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Adaptive Detail Modal View (Rendered via React Portal) */}
      {selectedProject && isClient
        ? createPortal(
            <div
              ref={modalRef}
              onClick={closeModal}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 md:p-8 backdrop-blur-md overflow-y-auto"
              style={{ touchAction: 'pan-y' }}
            >
              <div
                ref={modalContentRef}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-3xl max-h-[85vh] my-auto overflow-y-auto rounded-2xl border border-neutral-800 bg-neutral-900 p-5 sm:p-6 md:p-8 shadow-2xl text-white scrollbar-thin scrollbar-thumb-neutral-700"
              >
                {/* Sticky Close Icon */}
                <button
                  onClick={closeModal}
                  className="sticky top-0 float-right z-30 -mr-1 -mt-1 flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-full bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
                >
                  ✕
                </button>

                {/* Modal Header */}
                <div className="flex items-center gap-2 md:gap-3 pr-8">
                  <span className="text-base md:text-lg font-mono font-bold text-amber-400">
                    {selectedProject.id}
                  </span>
                  <span className="text-xs md:text-sm font-bebas font-semibold uppercase tracking-[0.2em] text-amber-400">
                    {selectedProject.category}
                  </span>
                </div>

                <h2 className="mt-1 text-xl sm:text-2xl md:text-4xl font-bold font-inter text-white pr-8">
                  {selectedProject.title}
                </h2>

                {/* Interactive Image Gallery */}
                <div className="mt-4 md:mt-6">
                  <div className="h-48 sm:h-60 md:h-80 w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950">
                    <img
                      src={activeImage}
                      alt={selectedProject.title}
                      className="h-full w-full object-cover transition-all duration-300"
                    />
                  </div>

                  {/* Thumbnails list */}
                  {selectedProject.screenshots && selectedProject.screenshots.length > 1 && (
                    <div className="mt-3 flex items-center gap-2.5 overflow-x-auto pb-1">
                      {selectedProject.screenshots.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImage(img)}
                          className={`relative h-12 w-20 sm:h-16 sm:w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                            activeImage === img ? 'border-amber-400 scale-105' : 'border-neutral-800 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt={`Screenshot ${idx + 1}`} className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Overview */}
                <div className="mt-5 md:mt-6">
                  <h3 className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-neutral-400">
                    System Overview
                  </h3>
                  <p className="mt-1.5 md:mt-2 text-xs sm:text-sm md:text-base font-inter text-neutral-300 leading-relaxed">
                    {selectedProject.fullDescription}
                  </p>
                </div>

                {/* Features */}
                {selectedProject.features && (
                  <div className="mt-5 md:mt-6">
                    <h3 className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-neutral-400">
                      Key Capabilities
                    </h3>
                    <ul className="mt-2 md:mt-3 space-y-1.5 md:space-y-2">
                      {selectedProject.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm font-inter text-neutral-300">
                          <span className="text-amber-400 font-mono mt-0.5">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack */}
                <div className="mt-5 md:mt-6">
                  <h3 className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-neutral-400">
                    Technologies Used
                  </h3>
                  <div className="mt-2 md:mt-3 flex flex-wrap gap-1.5 md:gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md font-mono bg-neutral-800 px-2.5 py-1 text-[11px] md:text-xs text-neutral-200 border border-neutral-700/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="mt-6 md:mt-8 flex flex-wrap gap-3 md:gap-4 pt-4 border-t border-neutral-800">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-lg bg-neutral-800 px-3.5 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-mono font-medium text-white hover:bg-neutral-700 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    Source Code
                  </a>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}