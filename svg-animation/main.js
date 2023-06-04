import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import myLogo from "/logo.svg";
import { setupCounter } from "./counter.js";
import { gsap } from "gsap";
import SplitTextJs from "split-text-js";

{
    /* <a href="https://jkbro.dev" target="_blank">
  <img src="${myLogo}" class="logo" alt="My logo" />
</a> */
}
document.querySelector("#app").innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1 id="hello">Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector("#counter"));

const tl = gsap.timeline({ defaults: { ease: "power1.out" } });
const text = document.querySelector("#hello");
const splitText = new SplitTextJs(text);

// // console.log(splitText);

document.querySelector("#counter").addEventListener("click", () => {
    tl.restart();
});

const fillLoad = document.querySelector(".fill-load");

tl.to(fillLoad, {
    duration: 2,
    y: -64,
});
tl.to("svg", {
    duration: 0.3,
    scale: 0,
});
tl.to(".blind", {
    duration: 1,
    stagger: 0.3,
    scaleY: 0,
});
tl.to("#loader", {
    display: "none",
});

splitText.chars.forEach((char, i) => {
    tl.from(char, {
        duration: 0.07,
        opacity: 0,
        y: 10,
        stagger: 0.4,
    });
});
