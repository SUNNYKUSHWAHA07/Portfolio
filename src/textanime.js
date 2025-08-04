
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export const textanimation = () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false
    });
    
    lenis.on("scroll", ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);

    const animeTextParagraphs = document.querySelectorAll(".anime-text p");
    const wordHighlightBgColor = "60, 60, 60";

    const keywords = [
    "MERN stack developer",
    "full-stack developer",
    "MongoDB",
    "Express.js",
    "React.js",
    "Node.js",
    "web applications",
    "frontend",
    "backend",
    "responsive",
    "GSAP",
    "Three.js",
    "animations",
    "UI/UX",
    "interactive",
    "JavaScript",
    "HTML",
    "CSS",
    "REST APIs",
    "JWT authentication",
    "Git",
   "deployment",
   "problem-solving",
   "Maruti House Design",
   "freelance developer",
   "real estate website",
   "modern design",
   "contact",
   "email",
   "full-time roles",
   "remote opportunities",
   "clean code",
   "performance",
   "creative thinker",
   "mobile-friendly",
   "user experience",
   "digital experiences",
   "tech"
    ];

    // Process text into words with better performance
    animeTextParagraphs.forEach((paragraph) => {
        const text = paragraph.textContent;
        const words = text.split(/\s+/).filter(word => word.trim());
        
        // Use DocumentFragment for better performance
        const fragment = document.createDocumentFragment();
        paragraph.innerHTML = "";
        
        words.forEach((word) => {
            const wordContainer = document.createElement("div");
            wordContainer.className = "word";
            
            const wordText = document.createElement("span");
            wordText.textContent = word;
            
            const normalizedWord = word.toLowerCase().replace(/[.,!?;:"]/g, "");
            if (keywords.includes(normalizedWord)) {
                wordContainer.classList.add("keyword-wrapper");
                wordText.classList.add("keyword", normalizedWord);
            }
            
            wordContainer.appendChild(wordText);
            fragment.appendChild(wordContainer);
        });
        
        paragraph.appendChild(fragment);
    });

    const animeTextContainers = document.querySelectorAll(".anime-text-container");

    animeTextContainers.forEach((container) => {
        const words = Array.from(container.querySelectorAll(".anime-text .word"));
        const totalWords = words.length;
        
        // Pre-cache word elements and spans for better performance
        const wordElements = words.map(word => ({
            container: word,
            text: word.querySelector("span")
        }));

        ScrollTrigger.create({
            trigger: container,
            pin: container,
            start: "top top",
            end: `+=${window.innerHeight * 4}`,
            pinSpacing: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
                const progress = self.progress;
                
                // Use requestAnimationFrame for smoother updates
                requestAnimationFrame(() => {
                    updateWordAnimations(progress, wordElements, totalWords, wordHighlightBgColor);
                });
            }
        });
    });
};

// Separate function for word animations to improve performance
function updateWordAnimations(progress, wordElements, totalWords, wordHighlightBgColor) {
    const revealPhaseEnd = 0.7;
    
    wordElements.forEach((wordElement, index) => {
        const { container, text } = wordElement;
        
        if (progress <= revealPhaseEnd) {
            // Reveal phase (0 to 0.7)
            animateRevealPhase(progress, revealPhaseEnd, container, text, index, totalWords, wordHighlightBgColor);
        } else {
            // Reverse phase (0.7 to 1.0)
            animateReversePhase(progress, revealPhaseEnd, container, text, index, totalWords, wordHighlightBgColor);
        }
    });
}

function animateRevealPhase(progress, progressTarget, container, text, index, totalWords, wordHighlightBgColor) {
    const revealProgress = Math.min(1, progress / progressTarget);
    const overlapWords = 15;
    
    // Calculate timing more efficiently
    const wordStart = index / totalWords;
    const wordEnd = wordStart + overlapWords / totalWords;
    
    const timelineScale = 1 / Math.min(1.5, 1 + overlapWords / totalWords);
    const adjustedStart = wordStart * timelineScale;
    const adjustedEnd = wordEnd * timelineScale;
    const duration = adjustedEnd - adjustedStart;
    
    let wordProgress = 0;
    if (revealProgress > adjustedStart) {
        if (revealProgress >= adjustedEnd) {
            wordProgress = 1;
        } else {
            wordProgress = (revealProgress - adjustedStart) / duration;
        }
    }
    
    // Apply smooth easing
    const easedProgress = easeOutCubic(wordProgress);
    
    // Update container opacity
    container.style.opacity = easedProgress;
    
    // Background fade logic
    const backgroundFadeStart = easedProgress >= 0.9 ? (easedProgress - 0.9) / 0.1 : 0;
    const backgroundOpacity = Math.max(0, 1 - backgroundFadeStart);
    container.style.backgroundColor = `rgba(${wordHighlightBgColor}, ${backgroundOpacity})`;
    
    // Text reveal with smoother transition
    const textRevealThreshold = 0.9;
    let textRevealProgress = 0;
    if (easedProgress >= textRevealThreshold) {
        textRevealProgress = (easedProgress - textRevealThreshold) / (1 - textRevealThreshold);
    }
    
    text.style.opacity = Math.pow(textRevealProgress, 0.3); // Smoother curve
}

function animateReversePhase(progress, revealPhaseEnd, container, text, index, totalWords, wordHighlightBgColor) {
    const reverseProgress = (progress - revealPhaseEnd) / (1 - revealPhaseEnd);
    const reverseOverlapWords = 5;
    
    // Calculate reverse timing
    const reverseWordStart = index / totalWords;
    const reverseWordEnd = reverseWordStart + reverseOverlapWords / totalWords;
    
    const reverseTimelineScale = 1 / Math.max(1, (totalWords - 1) / totalWords + reverseOverlapWords / totalWords);
    const reverseAdjustedStart = reverseWordStart * reverseTimelineScale;
    const reverseAdjustedEnd = reverseWordEnd * reverseTimelineScale;
    const reverseDuration = reverseAdjustedEnd - reverseAdjustedStart;
    
    let reverseWordProgress = 0;
    if (reverseProgress > reverseAdjustedStart) {
        if (reverseProgress >= reverseAdjustedEnd) {
            reverseWordProgress = 1;
        } else {
            reverseWordProgress = (reverseProgress - reverseAdjustedStart) / reverseDuration;
        }
    }
    
    // Apply smooth easing for reverse animation
    const easedReverseProgress = easeInCubic(reverseWordProgress);
    
    // Ensure container is fully visible
    container.style.opacity = "1";
    
    if (easedReverseProgress > 0) {
        const fadeOutProgress = 1 - reverseProgress;
        text.style.opacity = Math.max(0, fadeOutProgress);
        container.style.backgroundColor = `rgba(${wordHighlightBgColor}, ${easedReverseProgress})`;
    } else {
        text.style.opacity = "1";
        container.style.backgroundColor = `rgba(${wordHighlightBgColor}, 0)`;
    }
}

// Smooth easing functions
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function easeInCubic(t) {
    return t * t * t;
}