"use client";
import { useState, useEffect, useRef } from 'react';
import LetterGlitch from '@/components/letter-glitch';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/language-switcher';

const manifestoChunksEn = [
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
        "While I honor the child I once was,",
        "This is not a self-centered reverence—",
        "I am profoundly grateful for the progressive family that nurtured that child,",
        "Who saw in dismantled locks not destruction but discovery,",
        "Who understood that wonder needs both freedom and foundation."
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
        "Still lives in the very person who unlocks AI's mysteries."
    ],
    [
        "When breath came hard in hospital beds,",
        "When lungs collapsed like faulty code,",
        "I learned that existence precedes essence—",
        "That we are not defined by our limitations but by our response to them.",
        "For the light that burns twice as bright burns half as long,",
        "and I have always chosen to burn brightly."
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

// Traditional Chinese version - placeholder for now, you can replace with your translation
const manifestoChunksZhTw = [
    [
        "我是那個孩子，在樂高積木裡，看見了教堂",
        "不為斑斕色彩，只為其中神聖的幾何",
        "每一處接榫，都是對可能性的禱文",
        "每一具齒輪，都是對未來世界的冥想"
    ],
    [
        "我不信奉神，除非那是我親手塑造",
        "我不誦讀經文，除非那是我黎明寫下的程式碼",
        "天堂，是思想展翅高飛的瞬間",
        "地獄，是潛能被壓抑的無聲死寂"
    ],
    [
        "我活著，不為掌聲或喝采",
        "而是為了那個五歲的自己",
        "騎著搖晃的單車，穿梭在上海的工廠",
        "對著那些會呼吸、會歌唱的機器，滿眼驚奇",
        "有人說，燃燒得加倍明亮的火焰，持續的時間也只有一半。而我，選擇光芒。"
    ],
    [
        "我緬懷那個孩子，卻非出於自戀",
        "我深深感謝，那個開明的家庭",
        "在被拆解的鎖裡，他們看到的不是破壞，而是探索",
        "他們明白，成長需要自由，也需要根基"
    ],
    [
        "知識不是我的桂冠，而是羅盤",
        "學習的每道演算法，剪輯的每幀影像",
        "開發的每個機器人，訴說的每個故事",
        "都引我回到最初的提問：「它，能用在何方？」"
    ],
    [
        "我拒絕讓專業變成傲慢",
        "拒絕讓成就築起高牆，隔絕了曾用好奇心搭建的橋樑",
        "那個拆解門鎖，只為理解其中奧秘的男孩",
        "依然活在今日，這個解開 AI 之謎的青年心中"
    ],
    [
        "當呼吸在病床上變得艱難",
        "當肺葉如壞損的程式碼般崩潰",
        "我學會了：存在先於本質",
        "定義我們的，不是我們的極限",
        "而是我們如何回應極限"
    ],
    [
        "我是自己的觀眾，自己的評審，自己的繆思",
        "這並非自戀，而是源於自由",
        "一種得以華麗失敗的自由",
        "一種無須許可便能探索的自由",
        "一種不求回報就能分享的自由"
    ],
    [
        "我寫下的每一行程式碼",
        "剪下的每一格影片",
        "發表的每一次演說",
        "都是與那個孩子的對話",
        "他問的不是「這有用嗎？」",
        "而是「這能創造怎樣的世界？」"
    ],
    [
        "我誓願永遠保持未完成",
        "永遠在學習，永遠在傳承",
        "永遠走那條人跡罕至的路",
        "不因其艱難",
        "只因那條路，由我親手開創"
    ],
    [
        "因為我建造的，不是履歷或名聲",
        "我建造的，是一座橋，回到最初的驚奇",
        "一座讓他人也能走過的橋",
        "去尋找他們自己心中那個五歲的靈魂",
        "在夢想的機械中，耐心等候"
    ],
    [
        "在這我選擇創造的實存中",
        "我既是提問，也是追尋",
        "既是建造者，也是被造物",
        "永遠在演化",
        "永遠在初始",
        "永遠是那個工廠裡的孩子",
        "仰望著無垠",
        "雙手沾滿創造的塵土，內心因好奇而澄淨。"
    ]
];

export default function ManifestoPage() {
    const { language } = useLanguage();
    const [introComplete, setIntroComplete] = useState(false);
    
    // Get the appropriate manifesto chunks based on language
    const manifestoChunks = language === 'zh-TW' ? manifestoChunksZhTw : manifestoChunksEn;
    
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

    // Reset visible chunks when language changes
    useEffect(() => {
        setVisibleChunks(new Array(manifestoChunks.length).fill(false));
    }, [language, manifestoChunks.length]);

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

    }, [introComplete, language]);

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
