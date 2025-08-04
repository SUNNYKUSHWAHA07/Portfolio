import gsap from "gsap";

export const cta = () =>{

    const btn = document.querySelector(".btn");
    const sendIcon = document.querySelector(".send");
    const links = document.querySelector(".links");
    

    links.style.display = "none";
    const closedDimensions = {
        width: btn.offsetWidth,
        height:btn.offsetHeight,
    };
    links.style.display = "block";
    const OpenDimensions = {
        width: btn.offsetWidth,
        height: btn.offsetHeight
    };

    gsap.set(links, {autoAlpha:0});
    gsap.set(sendIcon, {autoAlpha:1});
    btn.style.width = `${closedDimensions.width}px`;
    btn.style.height = `${closedDimensions.height}px`;

    let isOpen = false;

    const toggleMenu = () =>{

        const timelineSettings = isOpen ? {
         btnSize: closedDimensions,
         alpha1: 0,
         alpha2: 1,
         scaleVlaue: 1,
         marginTop: 0,
        }:
        {
         btnSize: OpenDimensions,
         alpha1: 1,
         alpha2: 0,
         scaleVlaue: 0,
         marginTop: -btn.offsetHeight / 6,
        };

        const tl = gsap.timeline();

        tl.to(btn, {
            duration: 0.75,
            width:`${timelineSettings.btnSize.width}px`,
            height:`${timelineSettings.btnSize.height}px`,
            ease:"elastic.out"
        })
        .to(sendIcon,{
            duration: 0.125,
            autoAlpha: timelineSettings.alpha2,
            scale:timelineSettings.scaleVlaue,
            marginTop:timelineSettings.marginTop,

        },0).to(links,{
            duration: 0.2,
            autoAlpha: timelineSettings.alpha1,
            delay: isOpen ? -0.2 : 0.125,
        },0);

       isOpen = !isOpen;
    };

    btn.addEventListener("click", toggleMenu)
   links.querySelectorAll(".link>a").forEach(function(link){
       link.addEventListener('click', function(e){
            console.log("clicked");
           e.preventDefault()
         if (isOpen) toggleMenu();
       });
    });

}

