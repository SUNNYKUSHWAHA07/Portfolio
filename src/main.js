
import {gsap} from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { textanimation } from "./textanime.js";
import { skillanimation } from "./skills.js";
import { gradient } from "./gradient.js";
import { preloader } from "./preloader.js";
import { exprience } from "./expreience.js";
import { cta } from "./cta.js";
import {createGallery} from "./gallery.js"

 const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
import './styles/gradient.css';
 import './styles/projects.css' ;
import './styles/loader.css';
import './styles/text.css';
import './styles/skill.css';
import './styles/exprience.css';
import "./styles/footer.css"
import "./styles/cta.css"


 gsap.registerPlugin(ScrollTrigger);

 preloader();
gradient();
textanimation();
createGallery();







// let galleryContainer;

// let myFunction = async () => {
//   // Only load and initialize if not already created
//   if (!galleryContainer) {
//     const { createGallery } = await import('./gallery.js');
//     galleryContainer = createGallery(); // store the reference
//   }
// };

// let cleanFunction = () => {
//   if (galleryContainer) {
//     galleryContainer.remove(); // remove the gallery from DOM
//     galleryContainer = null;
//   }
// };


// let trigger;

// // Set it up when DOM is ready
// window.addEventListener("DOMContentLoaded", () => {
//   trigger = ScrollTrigger.create({
//     trigger: "#gallery", // page 2 section
//     start: "top center", // when top of page2 hits center of viewport
//     endTrigger: ".feature", // page 3 section
//     end: "top top", // when top of page3 hits center
//     onEnter: () => myFunction(),
//     onLeave: () => cleanFunction(),
//     onEnterBack: () => myFunction(),
//     onLeaveBack: () => cleanFunction(),
    
//   });
// });


ScrollTrigger.create({
  trigger: ".skill-hero",
  start: "top center",        // when skill-hero hits middle of screen
  end: "bottom center",       // till skill-hero's bottom passes center
  onEnter: () => {
    gsap.to(".sticky-bar", { opacity: 1, duration: 0.3, ease: "power1.out" });
  },
  onLeave: () => {
    gsap.to(".sticky-bar", { opacity: 0, duration: 0.3, ease: "power1.out" });
  },
  onEnterBack: () => {
    gsap.to(".sticky-bar", { opacity: 1, duration: 0.3, ease: "power1.out" });
  },
  onLeaveBack: () => {
    gsap.to(".sticky-bar", { opacity: 0, duration: 0.3, ease: "power1.out" });
  },
  markers: false  // set true if you want to see start/end markers
});


skillanimation()
exprience()
cta()