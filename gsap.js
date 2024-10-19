// Include GSAP and ScrollMagic libraries
gsap.registerPlugin(ScrollTrigger);
const controller = new ScrollMagic.Controller();

function initGSAPAnimations() {
    const sections = gsap.utils.toArray(".container-animation .panel");
    const container = document.querySelector(".container-animation");

    // Calculate the total width needed for scrolling
    const totalWidth = sections.reduce((width, section) => width + section.offsetWidth, 0);

    // Create the GSAP animation
    const animation = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: ".container-animation",
            pin: true,
            scrub: 1,
            end: () => "+=" + totalWidth,
            onUpdate: self => {
                if (self.direction === -1 && self.scroll() <= 0) {
                    self.scroll(1);
                }
            }
        },
    });

    // Create a ScrollMagic Scene
    const scene = new ScrollMagic.Scene({
        triggerElement: ".container-animation",
        duration: totalWidth,
        triggerHook: 0,
    })
    .setTween(animation) // Link GSAP animation to ScrollMagic
    .setPin(".container-animation")
    .addIndicators({ name: "ScrollMagic Scene" }) // Add indicators for debugging
    .addTo(controller)
    .on("end", function (event) {
        if (event.scrollDirection === "FORWARD") {
            controller.scrollTo(controller.info("scrollPos") - 1); // Pause scrolling
        }
    });

    // Resume scrolling on user interaction
    container.addEventListener("wheel", function () {
        if (controller.info("scrollPos") >= totalWidth) {
            scene.duration(totalWidth + window.innerHeight); // Extend the scene duration
            controller.scrollTo(controller.info("scrollPos") + 1); // Allow scrolling
        }
    });

    container.addEventListener("touchstart", function () {
        if (controller.info("scrollPos") >= totalWidth) {
            scene.duration(totalWidth + window.innerHeight); // Extend the scene duration
            controller.scrollTo(controller.info("scrollPos") + 1); // Allow scrolling
        }
    });
}

// Initialize GSAP animations
initGSAPAnimations();
