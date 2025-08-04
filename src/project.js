
// import { stories } from "./data.js";
// import gsap from "gsap";

// let activeStory = 0;
// const storyDuration = 4000;
// const contentUpdateDelay = 0.4;
// let direction = "next";
// let storyTimeout;

// const cursor = document.querySelector(".cursor")
// const cursorText = cursor.querySelector("p");


// export const projectanimation =()=>{
//   function changeStory() {
//   const previousStory = activeStory;
//   if( direction === "next"){
//     activeStory = (activeStory + 1) % stories.length;
//   }else {
//     activeStory = (activeStory - 1 + stories.length) % stories.length;
//   }

//   const story = stories[activeStory];

//   gsap.to(".profile-name p",{
//     y: direction === "next" ? -24 : 24,
//     duration:  0.5,
//     delay: contentUpdateDelay,
//   });

//   gsap.to(".title-row h1", {
//     y: direction === "next" ? -48 : 48,
//     duration: 0.5,
//     delay: contentUpdateDelay,
//   })

//   const currentImgContianer = document.querySelector(".story-img .img")
//   const currentImg = currentImgContianer.querySelector("img");

//   setTimeout(()=> {
//     const newProfileName = document.createElement("p");
//     newProfileName.innerText = story.profileName;
//     newProfileName.style.transform = direction === "next" ? "translateY(24px)" : "translateY(-24px)";
//     const profileNameDiv = document.querySelector(".profile-name");
//     profileNameDiv.appendChild(newProfileName);

//     gsap.to(newProfileName, {
//       y: 0,
//       duration: 0.5,
//       delay: contentUpdateDelay
//     });

//     const titleRows = document.querySelectorAll(".title-row");
//     story.title.forEach((line,index)=>{
//       if(titleRows[index]){
//         const newTitle = document.createElement("h1");
//         newTitle.innerText = line;
//         newTitle.style.transform = direction === "next" ? "translateY(50px)" : "translateY(-50px)";
//         titleRows[index].appendChild(newTitle);

//         gsap.to(newTitle, {
//           y:0,
//           duration: 0.5,
//           delay: contentUpdateDelay,
//         })
//       }
//     }) 

//     const newImgContainer = document.createElement("div");
//     newImgContainer.classList.add("img");
//     const newStoryImg = document.createElement("img");
//     newStoryImg.src = story.storyImg;
//     newStoryImg.loading = 'lazy';
//     newStoryImg.alt = story.profileName;
//     newImgContainer.appendChild(newStoryImg);
//     const storyImgDiv = document.querySelector(".story-img");
//     storyImgDiv.appendChild(newImgContainer)

//     animateNewImage(newImgContainer);

//     const upcomingImg = newStoryImg;
//     animateImageScale(currentImg, upcomingImg);

//     resetIndexHighlight(previousStory)
//     animateIndexHighlight(activeStory)

//     clearUpElements();
    
//     clearTimeout(storyTimeout);
//     storyTimeout = setTimeout(changeStory, storyDuration);
//   }, 200);

//   setTimeout(()=> {
//     const profileImg = document.querySelector(".profile-icon img");
//     profileImg.src = story.profileImg;
//     const link = document.querySelector(".link a");
//     link.textContent = story.linkLable;
//     link.href = story.linkSrc;

//   },600)

// }

// function animateNewImage(imgContainer){
//    gsap.set(imgContainer, {
//     clipPath: direction === "next" ? "ploygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)":"ploygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
//    });

//    gsap.to(imgContainer, {
//     clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
//     duration:1,
//     ease: "power4.inOut",
//    });
// }

// function animateImageScale(currentImg, upcoming){
//   gsap.fromTo(currentImg,{
//     scale: 1, rotate: 0
//   },{
//     scale:2,
//     rotate: direction === "next" ? -25 : 25,
//     duration: 1,
//     ease: "power4.inOut",
//      force3D: true,
//     onComplete:()=>{
//       currentImg.parentElement.remove();
//     },
//   });
//   gsap.fromTo(upcoming, {
//     scale:2, rotate:direction === "next"? 25 : -25
//   },{
//     scale: 1,
//     rotate: 0,
//     duration: 1,
//     ease: "power4.inOut",
//      force3D: true,
//   });
// }

// function resetIndexHighlight(index){
//     const highlight = document.querySelectorAll(".index .index-highlight")[
//       index
//     ];
//     gsap.killTweensOf(highlight);
//     gsap.to(highlight, {
//       width: direction === "next" ? "100%": "0%",
//       duration: 0.3,
//       onStart: ()=>{
//         gsap.to(highlight, {
//           transformOrigin: "right center",
//           scaleX: 0,
//           duration: 0.3,
//         })
//       }
//     })
//   }

// function animateIndexHighlight(index){
//   const highlight = document.querySelectorAll(".index .index-highlight")[index];
//   gsap.set(highlight,{
//     width: "0%",
//     scaleX: 1,
//     transformOrigin: "right center"
//   });
//   gsap.to(highlight,{
//     width: "100%",
//     duration: storyDuration / 1000,
//     ease: "none",

//   });

// }

// function clearUpElements(){
//   const profileNameDiv = document.querySelector(".profile-name");
//   const titleRows = document.querySelectorAll(".title-row");

//   while (profileNameDiv.childElementCount > 2){
//     profileNameDiv.removeChild(profileNameDiv.firstChild);
//   }

//   titleRows.forEach((titleRow)=>{
//     while (titleRow.childElementCount > 2){
//         titleRow.removeChild(titleRow.firstChild);
//     }
//  });
// }

// const setX = gsap.quickSetter(cursor, "x", "px");
// const setY = gsap.quickSetter(cursor, "y", "px");

// // document.addEventListener("mousemove", (event) =>{
 

// //   const { clientX, clientY} = event;
// //   gsap.to(cursor, {
// //     x: clientX - cursor.offsetWidth / 2,
// //     y: clientY - cursor.offsetHeight / 2,
// //     // ease: "power4.inOut",
// //     duration: 0.3,
// //   });

// //   const viewportWidth = window.innerWidth;
// //   if (clientX < viewportWidth / 2) {
// //     cursorText.textContent = "Prev";
// //     direction = "prev";
// //   }else{
// //     cursorText.textContent = "Next"
// //     direction = "next"
// //   }
// // })



// document.addEventListener("mousemove", (event) => {
//   const { clientX, clientY } = event;

//   // Instantly set X and Y (faster than gsap.to)
//   setX(clientX - cursor.offsetWidth / 2);
//   setY(clientY - cursor.offsetHeight / 2);

//   const viewportWidth = window.innerWidth;

//   if (clientX < viewportWidth / 2) {
//     cursorText.textContent = "Prev";
//     direction = "prev";
//   } else {
//     cursorText.textContent = "Next";
//     direction = "next";
//   }
// });


// document.addEventListener("click", ()=>{
//   clearTimeout(storyTimeout);
//   resetIndexHighlight(activeStory);
//   changeStory();
// })

// storyTimeout = setTimeout(changeStory, storyDuration);
// animateIndexHighlight(activeStory);
// }



import { stories } from "./data.js";
import gsap from "gsap";

let activeStory = 0;
const storyDuration = 4000;
const contentUpdateDelay = 0.4;
let direction = "next";
let storyTimeout;
let isAnimating = false;

// Cache DOM elements
const elements = {
    cursor: document.querySelector(".cursor"),
    cursorText: null,
    profileNameDiv: null,
    titleRows: null,
    storyImgDiv: null,
    highlights: null
};

// Initialize cached elements
function cacheElements() {
    elements.cursorText = elements.cursor?.querySelector("p");
    elements.profileNameDiv = document.querySelector(".profile-name");
    elements.titleRows = document.querySelectorAll(".title-row");
    elements.storyImgDiv = document.querySelector(".story-img");
    elements.highlights = document.querySelectorAll(".index .index-highlight");
}

// Optimized GSAP setters
const cursorSetters = elements.cursor ? {
    setX: gsap.quickSetter(elements.cursor, "x", "px"),
    setY: gsap.quickSetter(elements.cursor, "y", "px")
} : null;

export const projectanimation = () => {
    cacheElements();
    initializeStory();
    setupEventListeners();
    startStoryProgression();
};

function initializeStory() {
    if (!stories.length) return;
    updateStoryContent(stories[activeStory], false);
    animateIndexHighlight(activeStory);
}

function changeStory() {
    if (isAnimating || !stories.length) return;
    
    isAnimating = true;
    const previousStory = activeStory;
    
    activeStory = direction === "next" 
        ? (activeStory + 1) % stories.length
        : (activeStory - 1 + stories.length) % stories.length;
    
    const story = stories[activeStory];
    const moveDistance = direction === "next" ? -24 : 24;
    const titleMoveDistance = direction === "next" ? -48 : 48;
    
    // Exit animations
    const lastProfileName = elements.profileNameDiv?.querySelector("p:last-child");
    const lastTitles = elements.titleRows ? Array.from(elements.titleRows).map(row => row.querySelector("h1:last-child")).filter(Boolean) : [];
    
    if (lastProfileName) {
        gsap.to(lastProfileName, { y: moveDistance, duration: 0.5, ease: "power2.inOut" });
    }
    
    lastTitles.forEach(title => {
        gsap.to(title, { y: titleMoveDistance, duration: 0.5, ease: "power2.inOut" });
    });
    
    // Content update
    setTimeout(() => {
        updateStoryContent(story, true);
        resetIndexHighlight(previousStory);
        animateIndexHighlight(activeStory);
        
        requestAnimationFrame(() => {
            cleanupElements();
            isAnimating = false;
            startStoryProgression();
        });
    }, 200);
    
    // Profile and link update
    setTimeout(() => updateProfileAndLink(story), 600);
}

function updateStoryContent(story, animate) {
    updateProfileName(story.profileName, animate);
    updateTitle(story.title, animate);
    updateStoryImage(story.storyImg, story.profileName, animate);
}

function updateProfileName(profileName, animate) {
    if (!elements.profileNameDiv) return;
    
    const newElement = document.createElement("p");
    newElement.textContent = profileName;
    
    if (animate) {
        const translateY = direction === "next" ? "24px" : "-24px";
        newElement.style.transform = `translateY(${translateY})`;
        elements.profileNameDiv.appendChild(newElement);
        
        gsap.to(newElement, {
            y: 0,
            duration: 0.5,
            delay: contentUpdateDelay,
            ease: "power2.inOut"
        });
    } else {
        elements.profileNameDiv.appendChild(newElement);
    }
}

function updateTitle(titleLines, animate) {
    if (!elements.titleRows) return;
    
    titleLines.forEach((line, index) => {
        if (!elements.titleRows[index]) return;
        
        const newTitle = document.createElement("h1");
        newTitle.textContent = line;
        
        if (animate) {
            const translateY = direction === "next" ? "50px" : "-50px";
            newTitle.style.transform = `translateY(${translateY})`;
            elements.titleRows[index].appendChild(newTitle);
            
            gsap.to(newTitle, {
                y: 0,
                duration: 0.5,
                delay: contentUpdateDelay,
                ease: "power2.inOut"
            });
        } else {
            elements.titleRows[index].appendChild(newTitle);
        }
    });
}

function updateStoryImage(imageSrc, altText, animate) {
    if (!elements.storyImgDiv) return;
    
    const currentImgContainer = elements.storyImgDiv.querySelector(".img");
    const currentImg = currentImgContainer?.querySelector("img");
    
    const newImgContainer = document.createElement("div");
    newImgContainer.className = "img";
    
    const newStoryImg = document.createElement("img");
    Object.assign(newStoryImg, {
        src: imageSrc,
        loading: 'lazy',
        alt: altText,
        onload: () => {
            newImgContainer.appendChild(newStoryImg);
            elements.storyImgDiv.appendChild(newImgContainer);
            
            if (animate && currentImg) {
                animateNewImage(newImgContainer);
                animateImageScale(currentImg, newStoryImg);
            }
        },
        onerror: () => {
            console.warn(`Failed to load image: ${imageSrc}`);
            if (!animate) {
                newImgContainer.appendChild(newStoryImg);
                elements.storyImgDiv.appendChild(newImgContainer);
            }
        }
    });
}

function animateNewImage(imgContainer) {
    const startClipPath = direction === "next" 
        ? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
        : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)";
    
    gsap.fromTo(imgContainer, 
        { clipPath: startClipPath },
        { 
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1,
            ease: "power4.inOut"
        }
    );
}

function animateImageScale(currentImg, upcomingImg) {
    const rotationAngle = direction === "next" ? -25 : 25;
    const upcomingRotation = direction === "next" ? 25 : -25;
    
    gsap.fromTo(currentImg, 
        { scale: 1, rotation: 0 },
        {
            scale: 2,
            rotation: rotationAngle,
            duration: 1,
            ease: "power4.inOut",
            force3D: true,
            onComplete: () => currentImg.parentElement?.remove()
        }
    );
    
    gsap.fromTo(upcomingImg, 
        { scale: 2, rotation: upcomingRotation },
        {
            scale: 1,
            rotation: 0,
            duration: 1,
            ease: "power4.inOut",
            force3D: true
        }
    );
}

function resetIndexHighlight(index) {
    const highlight = elements.highlights?.[index];
    if (!highlight) return;
    
    gsap.killTweensOf(highlight);
    
    const targetWidth = direction === "next" ? "100%" : "0%";
    gsap.to(highlight, {
        width: targetWidth,
        duration: 0.3,
        ease: "power2.inOut",
        onStart: () => gsap.to(highlight, {
            transformOrigin: "right center",
            scaleX: 0,
            duration: 0.3,
            ease: "power2.inOut"
        })
    });
}

function animateIndexHighlight(index) {
    const highlight = elements.highlights?.[index];
    if (!highlight) return;
    
    gsap.set(highlight, {
        width: "0%",
        scaleX: 1,
        transformOrigin: "left center"
    });
    
    gsap.to(highlight, {
        width: "100%",
        duration: storyDuration / 1000,
        ease: "none"
    });
}

function cleanupElements() {
    // Clean profile names (keep last 2)
    if (elements.profileNameDiv) {
        const children = elements.profileNameDiv.children;
        while (children.length > 2) {
            elements.profileNameDiv.removeChild(children[0]);
        }
    }
    
    // Clean titles (keep last 2 in each row)
    elements.titleRows?.forEach(titleRow => {
        const children = titleRow.children;
        while (children.length > 2) {
            titleRow.removeChild(children[0]);
        }
    });
    
    // Clean image containers (keep last 2)
    if (elements.storyImgDiv) {
        const imgContainers = elements.storyImgDiv.querySelectorAll(".img");
        for (let i = 0; i < imgContainers.length - 2; i++) {
            imgContainers[i].remove();
        }
    }
}

function updateProfileAndLink(story) {
    const profileImg = document.querySelector(".profile-icon img");
    const link = document.querySelector(".link a");
    
    if (profileImg) profileImg.src = story.profileImg;
    if (link) {
        link.textContent = story.linkLabel || story.linkLable;
        link.href = story.linkSrc;
    }
}

function setupEventListeners() {
    if (cursorSetters) {
        document.addEventListener("mousemove", ({ clientX, clientY }) => {
            cursorSetters.setX(clientX - elements.cursor.offsetWidth / 2);
            cursorSetters.setY(clientY - elements.cursor.offsetHeight / 2);
            
            const isLeftHalf = clientX < window.innerWidth / 2;
            if (elements.cursorText) {
                elements.cursorText.textContent = isLeftHalf ? "Prev" : "Next";
            }
            direction = isLeftHalf ? "prev" : "next";
        });
    }
    
    document.addEventListener("click", () => {
        if (isAnimating) return;
        clearTimeout(storyTimeout);
        resetIndexHighlight(activeStory);
        changeStory();
    });
    
    document.addEventListener("keydown", ({ key }) => {
        if (isAnimating) return;
        
        if (key === "ArrowRight" || key === " ") {
            direction = "next";
        } else if (key === "ArrowLeft") {
            direction = "prev";
        } else {
            return;
        }
        
        clearTimeout(storyTimeout);
        resetIndexHighlight(activeStory);
        changeStory();
    });
}

function startStoryProgression() {
    clearTimeout(storyTimeout);
    storyTimeout = setTimeout(() => {
        if (!isAnimating) {
            direction = "next";
            changeStory();
        } else {
            startStoryProgression();
        }
    }, storyDuration);
}

export function cleanupProjectAnimation() {
    clearTimeout(storyTimeout);
    gsap.killTweensOf("*");
}