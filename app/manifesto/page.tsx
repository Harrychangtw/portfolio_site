"use client";
import { useState, useEffect, useRef } from 'react';
import LetterGlitch from '@/components/letter-glitch';

const manifestoChunks = [
    [
        "I am the child who saw cathedrals in LEGO bricks,",
        "Not for their colors, but for the sacred geometry within—",
        "Each joint a prayer to possibility,",
        "Each mechanism a meditation on what could be."
    ],
    [
        "I choose no gods but the ones I build with my own hands,",
        "No scripture but the code I write at dawn,",
        "No heaven but the moment when an idea takes flight,",
        "No hell but the silence of unexpressed potential."
    ],
    [
        "I live not for applause or accolades,",
        "But for the five-year-old who rode uncertain bicycles",
        "Through Shanghai factory yards,",
        "Eyes wide with wonder at machines that breathed and sang."
    ],
    [
        "Knowledge is not my crown but my compass—",
        "Each algorithm learned, each frame edited,",
        "Each robot programmed, each story told,",
        `Returns me to that first question: "Where can this be used?"`
    ],
    [
        "I refuse to let expertise become arrogance,",
        "To let achievement build walls where curiosity built bridges.",
        "The boy who dismantled locks to understand their secrets",
        "Still lives in the man who unlocks AI's mysteries."
    ],
    [
        "When breath came hard in hospital beds,",
        "When lungs collapsed like faulty code,",
        "I learned that existence precedes essence—",
        "That we are not defined by our limitations but by our response to them."
    ],
    [
        "I am my own audience, my own critic, my own muse.",
        "Not from narcissism, but from freedom—",
        "The freedom to fail magnificently,",
        "The freedom to explore without permission,",
        "The freedom to share without expectation."
    ],
    [
        "Every line of code I write,",
        "Every frame I cut,",
        "Every speech I give,",
        `Is a conversation with that child who asked not "Is this useful?"`,
        `But "What worlds can this create?"`
    ],
    [
        "I pledge to remain forever unfinished,",
        "Forever learning, forever teaching,",
        "Forever taking the road less traveled—",
        "Not because it's harder,",
        "But because it's mine to make."
    ],
    [
        "For I am not building a resume or a reputation.",
        "I am building a bridge back to wonder,",
        "A bridge others might cross",
        "To find their own five-year-old selves",
        "Waiting patiently in the machinery of dreams."
    ],
    [
        "In this existence I choose to create,",
        "I am both the question and the quest,",
        "Both the builder and the built,",
        "Forever becoming,",
        "Forever beginning,",
        "Forever that child in the factory yard,",
        "Looking up at the infinite.",
        "Hands dirty with creation, heart clean with wonder.",
    ],

];

export default function ManifestoPage() {
    const [introComplete, setIntroComplete] = useState(false);
    const [visibleChunks, setVisibleChunks] = useState<boolean[]>(
        new Array(manifestoChunks.length).fill(false)
    );
    const chunkRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleAnimationComplete = () => {
        // Add a small delay for a smoother transition between animation and content
        setTimeout(() => setIntroComplete(true), 500);
    };

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Block scrolling until the intro animation is complete
    useEffect(() => {
        if (!introComplete) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Cleanup on component unmount
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [introComplete]);

    // Set up IntersectionObserver to reveal chunks on scroll
    useEffect(() => {
        if (!introComplete) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
                        setVisibleChunks((prev) => {
                            const newVisible = [...prev];
                            newVisible[index] = true;
                            return newVisible;
                        });
                        // Stop observing the element once it's visible
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                rootMargin: '0px',
                threshold: 0.2 // Trigger when 20% of the chunk is visible
            }
        );

        chunkRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        // Cleanup observer on component unmount
        return () => observer.disconnect();

    }, [introComplete]);

    return (
        <div className="min-h-screen font-mono bg-black text-gray-300">
            {/* Header section with glitch effect */}
            <div className="h-screen relative">
                <LetterGlitch 
                    onAnimationComplete={handleAnimationComplete}
                />
            </div>
            
            {/* Content section, revealed after the intro */}
            <div className={`transition-opacity duration-1000 ${introComplete ? 'opacity-100' : 'opacity-0'}`}>
                <div className="container min-h-screen py-24">
                    <div className="max-w-4xl mx-auto">
                        <article className="space-y-24 bg-black/50 backdrop-blur-sm p-8 md:p-12 rounded-lg">
                            {manifestoChunks.map((chunk, chunkIndex) => (
                                <div
                                    key={chunkIndex}
                                    ref={(el) => {
                                        chunkRefs.current[chunkIndex] = el;
                                    }}
                                    data-index={chunkIndex}
                                    className="space-y-4"
                                >
                                    {chunk.map((line, lineIndex) => (
                                        <div 
                                            key={`${chunkIndex}-${lineIndex}`} 
                                            className={`block transition-all duration-1000 ease-out ${
                                                visibleChunks[chunkIndex] 
                                                    ? 'opacity-100 translate-y-0' 
                                                    : 'opacity-0 translate-y-8'
                                            }`}
                                            style={{
                                                transitionDelay: visibleChunks[chunkIndex] ? `${lineIndex * 200}ms` : '0ms'
                                            }}
                                        >
                                            <p className="text-base md:text-lg leading-relaxed text-gray-200">
                                                {line}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </article>
                    </div>
                </div>
            </div>
        </div>
    );
}
