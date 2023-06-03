import "./style.css";

import gsap from "gsap";
import SplitTextJS from "split-text-js";

const titles = gsap.utils.toArray("p");
const timeline = gsap.timeline();
titles.forEach((title) => {
    console.log(title);
    const splitText = new SplitTextJS(title);
    timeline
        .from(
            splitText.chars,
            {
                opacity: 0,
                y: 100,
                rotateX: -90,
                stagger: 0.02,
            },
            "<"
        )
        .to(
            splitText.chars,
            {
                delay: 1.5,
                opacity: 0,
                y: -100,
                rotateX: 90,
                stagger: 0.02,
            },
            "<1"
        );
});
