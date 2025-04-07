export default function AboutSection() {
  return (
    <section id="about" className="py-12 md:py-16 border-b border-border">
      <div className="container">
        <div className="grid grid-cols-12 gap-2">
          {/* About column - spans half the width on desktop */}
          <div className="col-span-12 md:col-span-6 pr-0 md:pr-12">
            <h2 className="text-lg uppercase tracking-wider text-secondary mb-4">About</h2>
            <p className="text-primary">
              Jo (He/Him) designs interfaces. He thrives in complex, ambiguous problem spaces focused around interactive
              media, digital tooling, and intelligence augmentation. He is currently studying Design and Human-Computer
              Interaction at Carnegie Mellon University, where someone he holds fondly and will cherish for the rest of
              his life. If you have an interesting idea, please get in touch.
            </p>
          </div>

          {/* Team column - spans 1/4 of the width on desktop */}
          <div className="col-span-6 md:col-span-3 mt-8 md:mt-0">
            <h2 className="text-lg uppercase tracking-wider text-secondary mb-4">Team</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Notion</h3>
                <p className="text-secondary">2023 - Present</p>
              </div>
              <div>
                <h3 className="font-medium">Azuki</h3>
                <p className="text-secondary">2023 - 2025</p>
              </div>
              <div>
                <h3 className="font-medium">Independent Practice</h3>
              </div>
              <div>
                <h3 className="font-medium">Skiff</h3>
                <p className="text-secondary">2022 - 2023</p>
              </div>
              <div>
                <h3 className="font-medium">Apple</h3>
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

