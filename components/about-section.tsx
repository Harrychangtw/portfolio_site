export default function AboutSection() {
  return (
    <section id="about" className="py-12 md:py-16 border-b border-border">
      <div className="container">
        <div className="grid grid-cols-12 gap-2">
          {/* About column - spans half the width on desktop */}
          <div className="col-span-12 md:col-span-6 pr-0 md:pr-12">
            <h2 className="font-space-grotesk text-lg uppercase tracking-wider text-secondary mb-4">About</h2>
            <p className="font-ibm-plex text-primary lcp-bio" style={{contain: "paint"}}>
              Hi, I'm Harry Chang 👋🏻 — a curious builder, storyteller, and explorer at heart.
              <br /><br />
              Currently studying at Chingshin Academy, with a love for making things — whether it's code, visuals, or hands-on projects. Grew up around tools and machines, always more interested in how things worked than what they looked like.
              <br /><br />
              Driven by curiosity, shaped by community, and grounded in the joy of learning by doing. Passion lives in the process — and in the little moments, like filming under pressure or tinkering late into the night.
            </p>
          </div>

          {/* Two-column section for roles and descriptions */}
          <div className="col-span-12 md:col-span-6 mt-8 md:mt-0">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-5">
                <h2 className="font-space-grotesk text-lg uppercase tracking-wider text-secondary mb-4">Roles</h2>
              </div>
              <div className="col-span-7">
                <h2 className="font-space-grotesk text-lg uppercase tracking-wider text-secondary mb-4">Description</h2>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-5">
                  <h3 className="font-space-grotesk font-medium">LLM Researcher</h3>
                  <p className="font-ibm-plex text-secondary">2024 - Present</p>
                </div>
                <div className="col-span-7">
                  <p className="font-ibm-plex text-primary">Researching LLM safety with a focus on lightweight external classifiers, with two papers currently under review.</p>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-5">
                  <h3 className="font-space-grotesk font-medium">Speaker – AI WAVE SHOW, SITCON</h3>
                  <p className="font-ibm-plex text-secondary">2024 - 2025</p>
                </div>
                <div className="col-span-7">
                    <p className="font-ibm-plex text-primary">
                    Spoke at the {" "}
                    <a
                      href="https://www.technice.com.tw/issues/ai/185561/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-external"
                    >
                      AI WAVE SHOW
                    </a>
                     and delivered keynote about RAG at {" "}
                    <a
                      href="https://www.youtube.com/watch?v=ujxlUTXlC04"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-external"
                    >
                      SITCON 2025
                    </a>
                    .
                    </p>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-5">
                  <h3 className="font-space-grotesk font-medium">Designer & VP – Student Council</h3>
                  <p className="font-ibm-plex text-secondary">2023 - 2024</p>
                </div>
                <div className="col-span-7">
                  <p className="font-ibm-plex text-primary">Designed the school's anniversary clothing line, key visuals, and branding materials.</p>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-5">
                  <h3 className="font-space-grotesk font-medium">Developer - Chingshin RAG</h3>
                  <p className="font-ibm-plex text-secondary">2023 - 2024</p>
                </div>
                <div className="col-span-7">
                  <p className="font-ibm-plex text-primary">Involved heavily development of Chingshin's RAG chatbot. Won first prize in the GenAI Star by NSTC.</p>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-5">
                  <h3 className="font-space-grotesk font-medium">Photographer & Editor</h3>
                  <p className="font-ibm-plex text-secondary">2022 - Present</p>
                </div>
                <div className="col-span-7">
                  <p className="font-ibm-plex text-primary">
                    DaVinci Resolve editor with experience ranging from montages to educational videos for{" "}
                    <a
                      href="https://www.youtube.com/watch?v=eSuEhZpHesU&t=2s"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-external"
                    >
                      AAAI
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

