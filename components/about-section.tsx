export default function AboutSection() {
  return (
    <section id="about" className="py-12 md:py-16 border-b border-border">
      <div className="container">
        <div className="grid grid-cols-12 gap-2">
          {/* About column - spans half the width on desktop */}
          <div className="col-span-12 md:col-span-6 pr-0 md:pr-12">
            <h2 className="text-lg uppercase tracking-wider text-secondary mb-4">About</h2>
            <p 
              className="text-primary lcp-bio" 
              // Use priority rendering attributes
              style={{contain: "paint"}}
            >
              Hi, I'm Harry Chang, a student from Taiwan with a deep passion for AI, robotics, design, and storytelling. Growing up surrounded by tools and technology—from LEGO to factory machinery—I developed a hands-on curiosity that shaped my love for building and creating. Whether it's designing a robotics mechanism, directing a film, or building an AI chatbot from scratch, I enjoy diving deep and connecting ideas across fields.
            </p>
          </div>

          {/* Team column - spans 1/4 of the width on desktop */}
          <div className="col-span-6 md:col-span-3 mt-8 md:mt-0">
            <h2 className="text-lg uppercase tracking-wider text-secondary mb-4">Roles</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">LLM Researcher</h3>
                <p className="text-secondary">2024 - Present</p>
              </div>
              <div>
                <h3 className="font-medium">Speaker – AIGO, SITCON</h3>
                <p className="text-secondary">2024</p>
              </div>
              <div>
                <h3 className="font-medium">Designer & VP – Student Council</h3>
                <p className="text-secondary">2023 - 2024</p>  
              </div>
              <div>
                <h3 className="font-medium">Developer - Chingshin RAG</h3>
                <p className="text-secondary">2023 - 2024</p>
              </div>
              <div>
                <h3 className="font-medium">Photographer & Editor</h3>
                <p className="text-secondary">2020 - 2021</p>
              </div>
            </div>
          </div>

          {/* Description column - spans 1/4 of the width on desktop */}
          <div className="col-span-6 md:col-span-3 mt-8 md:mt-0">
            <h2 className="text-lg uppercase tracking-wider text-secondary mb-4">Description</h2>
            <div className="space-y-4">
            <div>
                <p className="text-primary">Tinkerer turned maker. Grew up around locks, LEGOs, and robotics. Lifelong passion for building and storytelling.</p>
              </div>
              <div>
                <p className="text-primary">
                  Involved in robtotics development (VEX, Robofest), winning 1st place globally. Built innovative mechanisms and developed advanced C++ codebases.
                </p>
              </div>
              <div>
                <p className="text-primary">
                  Core member of AI Research Team. Built a school RAG system that won 1st prize in GenAI Star Competition.
                </p>
              </div>
              <div>
                <p className="text-primary">
                  Directed school design initiatives. Branded 5th Student Council, led clothing line launches, and taught creative workflows across teams.
                </p>
              </div>
              <div>
                <p className="text-primary">
                  Passionate visual storyteller. Produced award-winning videos, from montages to global AI campaigns for AAAI .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

