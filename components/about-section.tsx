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
            style={{contain: "paint"}}
          >
            Hi, I'm Harry Chang 👋🏻 — a curious builder, storyteller, and explorer at heart.
            <br /><br />
            Currently studying at Chingshin Academy, with a love for making things — whether it’s code, visuals, or hands-on projects. Grew up around tools and machines, always more interested in how things worked than what they looked like.
            <br /><br />
            Driven by curiosity, shaped by community, and grounded in the joy of learning by doing. Passion lives in the process — and in the little moments, like filming under pressure or tinkering late into the night.
            
          </p>
        </div>

          {/* Two-column section for roles and descriptions */}
          <div className="col-span-12 md:col-span-6 mt-8 md:mt-0">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-5">
                <h2 className="text-lg uppercase tracking-wider text-secondary mb-4">Roles</h2>
              </div>
              <div className="col-span-7">
                <h2 className="text-lg uppercase tracking-wider text-secondary mb-4">Description</h2>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-5">
                  <h3 className="font-medium">LLM Researcher</h3>
                  <p className="text-secondary">2024 - Present</p>
                </div>
                <div className="col-span-7">
                  <p className="text-primary">Researching LLM safety with lightweight classifiers trained on synthetic adversarial dataset.</p>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-5">
                  <h3 className="font-medium">Speaker – AIGO, SITCON</h3>
                  <p className="text-secondary">2024 - 2025</p>
                </div>
                <div className="col-span-7">
                  <p className="text-primary">Spoke at the AIGO closing ceremony and delivered keynote about RAG at SITCON 2025</p>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-5">
                  <h3 className="font-medium">Designer & VP – Student Council</h3>
                  <p className="text-secondary">2023 - 2024</p>
                </div>
                <div className="col-span-7">
                  <p className="text-primary">Designed the school’s anniversary clothing line, key visuals, and branding materials.</p>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-5">
                  <h3 className="font-medium">Developer - Chingshin RAG</h3>
                  <p className="text-secondary">2023 - 2024</p>
                </div>
                <div className="col-span-7">
                  <p className="text-primary">Involved heavily development of Chingshin's RAG chatbot. Won first prize in the GenAI Star by NSTC.</p>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-5">
                  <h3 className="font-medium">Photographer & Editor</h3>
                  <p className="text-secondary">2022 - Present</p>
                </div>
                <div className="col-span-7">
                  <p className="text-primary">DaVinci Resolve editor with experience ranging from montages to educational videos for AAAI.</p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

