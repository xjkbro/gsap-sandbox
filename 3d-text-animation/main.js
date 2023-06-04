import "./style.css";

import gsap from "gsap";
import SplitTextJS from "split-text-js";

const titles = gsap.utils.toArray("p");
const timeline = gsap.timeline({ defaults: { opacity: 0, stagger: 0.02 } });

titles.forEach((title) => {
    const splitText = new SplitTextJS(title);
    timeline
        .from(
            splitText.chars,
            {
                y: 100,
                rotateX: -90,
            },
            "<"
        )
        .to(
            splitText.chars,
            {
                delay: 1.5,
                y: -100,
                rotateX: 90,
            },
            "<1"
        )
        .repeat(-1);
});
