import "./style.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const texts = gsap.utils.toArray("#first p");
const timeline = gsap.timeline();
texts.forEach((text) => {
    console.log(text);
    timeline.fromTo(
        text,
        {
            clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
        },
        {
            duration: 1,
            // ease: "power4.easeInOut",
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            scrollTrigger: {
                trigger: text,
                start: "center 55%",
                end: "center 45%",
                scrub: true,
                markers: true,
            },
        }
    );
});
