// Include GSAP and ScrollTrigger libraries
gsap.registerPlugin(ScrollTrigger);

function initGSAPAnimations() {
    const sections = gsap.utils.toArray(".container-animation .panel");
    const container = document.querySelector(".container-animation");

    // Calculate the total width needed for scrolling
    const totalWidth = sections.reduce((width, section) => width + section.offsetWidth, 0);

    // Create the GSAP animation with ScrollTrigger
    gsap.to(sections, {
        xPercent: -100 * (sections.length - 1), // Move sections to the left
        ease: "none",
        scrollTrigger: {
            trigger: container,                // Element to trigger the scroll
            pin: true,                         // Pin the container during scroll
            scrub: 1,                          // Smooth scrubbing
            end: () => "+=" + totalWidth,     // Set the end of the trigger based on total width
            onUpdate: self => {
                // Prevent scrolling to negative
                if (self.direction === -1 && self.scroll() <= 0) {
                    self.scroll(1);
                }
            },
        },
    });

    // Adding a wheel event to control scrolling behavior
    container.addEventListener("wheel", function () {
        if (gsap.getProperty(container, "scrollPos") >= totalWidth) {
            // Extend the scene duration when at the end
            container.style.height = (totalWidth + window.innerHeight) + 'px';
            // Allow scrolling
            gsap.to(container, {
                scrollTo: gsap.getProperty(container, "scrollPos") + 1,
                duration: 0.5,
            });
        }
    });

    // Touch event to allow scrolling on mobile
    container.addEventListener("touchstart", function () {
        if (gsap.getProperty(container, "scrollPos") >= totalWidth) {
            // Extend the scene duration when at the end
            container.style.height = (totalWidth + window.innerHeight) + 'px';
            // Allow scrolling
            gsap.to(container, {
                scrollTo: gsap.getProperty(container, "scrollPos") + 1,
                duration: 0.5,
            });
        }
    });
}

// Initialize GSAP animations
initGSAPAnimations();
