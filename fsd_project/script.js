// 1. INITIALIZE LOCOMOTIVE & GSAP PROXY
gsap.registerPlugin(ScrollTrigger);

const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
});

// Each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync)
scroll.on("scroll", ScrollTrigger.update);

// Tell ScrollTrigger to use these proxy methods for the "#main" element
ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things through transforms, so we don't need to pin
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// Refresh ScrollTrigger and update Locomotive on window resize/update
ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.refresh();


// 2. HERO ANIMATIONS
const tl = gsap.timeline();

tl.from("#nav", {
    y: '-10',
    opacity: 0,
    duration: 1.5,
    ease: "expo.out"
})
.from("#heading h1, #secondh1", {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
}, "-=1")
.from("#herofooter", {
    y: -10,
    opacity: 0,
    duration: 1.5,
    delay: -0.5,
    ease: "expo.out"
});


// 3. IMAGE HOVER FOLLOW EFFECT
document.querySelectorAll(".elem").forEach(function (elem) {
    let rotate = 0;
    let diffrot = 0;

    elem.addEventListener("mousemove", function (details) {
        // Calculate vertical position relative to the element
        let diff = details.clientY - elem.getBoundingClientRect().top;
        
        // Calculate rotation based on mouse movement speed
        diffrot = details.clientX - rotate;
        rotate = details.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: "power3.out",
            top: diff,
            left: details.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5), // Limits rotation to 20 deg
            duration: 0.5
        });
    });

    elem.addEventListener("mouseleave", function () {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            duration: 0.5,
            ease: "power3.out"
        });
    });
});


// 4. SCROLL-TRIGGERED ANIMATIONS
// Elements in the "Second" section
gsap.from(".elem", {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    scrollTrigger: {
        trigger: "#second",
        scroller: "#main",
        start: "top 70%",
    }
});

// About Section Content
gsap.from("#about img, #textabout", {
    opacity: 0,
    y: 100,
    duration: 1,
    scrollTrigger: {
        trigger: "#about",
        scroller: "#main",
        start: "top 80%"
    }
});