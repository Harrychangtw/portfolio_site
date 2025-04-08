export default function AboutSection() {
  return (
    <section id="about" className="py-12 md:py-16 border-b border-border">
      <div className="container">
        <div className="grid grid-cols-12 gap-2">
          {/* About column - spans half the width on desktop */}
          <div className="col-span-12 md:col-span-6 pr-0 md:pr-12">
            <h2 className="text-lg uppercase tracking-wider text-secondary mb-4">About</h2>
            <p className="text-primary">
              Hi, I’m Harry Chang, a student from Taiwan with a deep passion for AI, robotics, design, and storytelling. Growing up surrounded by tools and technology—from LEGO to factory machinery—I developed a hands-on curiosity that shaped my love for building and creating. Whether it’s designing a robotics mechanism, directing a film, or building an AI chatbot from scratch, I enjoy diving deep and connecting ideas across fields.
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
                <p className="text-primary">Building beautiful tools for your life's work.</p>
              </div>
              <div>
                <p className="text-primary">
                  First full-time design hire. Scaled design team to 5 people. Built Anime.com, Anime, and interactive
                  experiences for the Axial IP.
                </p>
              </div>
              <div>
                <p className="text-primary">
                  Design consulting for emerging AI and productivity companies. Notable clients: Superhuman, Rewind
                  (Corner AI) · Blit · JetBrain
                </p>
              </div>
              <div>
                <p className="text-primary">
                  First full-time design hire. 0-1 design for Email Editor, Drive, Calendar, Board and 1M+ users.
                  Recently acquired by Notion HQ.
                </p>
              </div>
              <div>
                <p className="text-primary">
                  Two summers at Apple working on conversational AI interfaces for Siri in the AI/ML Organization.
                  Explored multimodal patterns and new behaviors empowered by natural language input.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

