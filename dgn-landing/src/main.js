import "./style.css";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const entrytl = gsap.timeline();
entrytl
	.to(
		"#topbar",
		{
			y: "-8.1vw",
			duration: 2.5,
			ease: "sine.out",
		},
		"0.5"
	)
	.to(
		"#bottombar",
		{
			y: "8.1vw",
			duration: 2.5,
			ease: "sine.out",
		},
		"0.5"
	)
	.fromTo(
		"#loading-logo",
		{
			letterSpacing: "0.08em",
		},
		{
			letterSpacing: "-0.08em",
			duration: 2.5,
		},
		"0.5"
	)
	.to("#loader", {
		delay: 0.2,
		opacity: 0,
		duration: 0.7,
	})
	.to("#loader", {
		display: "none",
	});

const titles = gsap.utils.toArray("#hero h1 span");

const navtl = gsap.timeline({
	defaults: {
		scrollTrigger: {
			trigger: "nav",
			start: "top top",
			end: "bottom top",
			scrub: true,
		},
	},
});

navtl
	.fromTo(
		"nav",
		{
			// position: "fixed",
			borderBottom: "1px solid black",
		},
		{
			// position: "fixed",
			height: "4rem",
			duration: 2,
			borderBottom: "1px solid #787878",
		}
	)

	.to(
		"nav svg",
		{
			scale: 0.5,
			transformOrigin: "left",
		},
		"-=0.5"
	);

const herotl = gsap.timeline();
herotl.fromTo("#hero img", { opacity: 0 }, { opacity: 1, duration: 1 });
gsap.fromTo(
	"#hero img",
	{ scale: 1 },
	{ scale: 1.2, transformOrigin: "center", duration: 10 }
);
titles.forEach((title) => {
	herotl.fromTo(
		title,
		{ opacity: 0, y: 50 },
		{ opacity: 1, y: 0, duration: 0.5, stagger: 0.5 }
	);
	// gsap.fromTo(
	//     title,
	//     {
	//         y: 0,
	//     },
	//     {
	//         // duration: 0.5,
	//         y: -50,
	//         opacity: 0,
	//         scrollTrigger: {
	//             trigger: title,
	//             start: "bottom 20%",
	//             end: "+=30%",
	//             scrub: 1,
	//         },
	//     }
	// );
});

herotl.fromTo(
	"#hero h3",
	{ opacity: 0, y: 50 },
	{ opacity: 1, y: 0, duration: 0.4 }
);
// .fromTo(
//     "#hero h2",
//     {
//         y: 0,
//         opacity: 1,
//     },
//     {
//         duration: 0.5,
//         y: -50,
//         opacity: 0,
//         scrollTrigger: {
//             trigger: "#hero h2",
//             start: "bottom 20%",
//             end: "+=30%",
//             scrub: true,
//             // markers: true,
//         },
//     }
// );

// About Us Section

const abouttl = gsap.timeline();
abouttl.fromTo(
	"#about h2",
	{ opacity: 0, y: 50 },
	{
		opacity: 1,
		y: 0,
		duration: 0.4,
		scrollTrigger: {
			trigger: "#about h2",
			scrub: 1,
			start: "top 90%",
			end: "top 60%",
		},
	}
);
const aboutp = new SplitType("#about p", { types: "lines" });
console.log(aboutp);

aboutp?.lines?.forEach((line) => {
	abouttl.fromTo(
		line,
		{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" },
		{
			clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
			scrollTrigger: {
				trigger: line,
				scrub: true,
				start: "center 53%",
				end: "center 47%",
				// markers: true,
			},
		}
	);
});
abouttl.fromTo(
	"#about img",
	{ opacity: 0, x: -200 },
	{ opacity: 1, x: 0, scrollTrigger: { trigger: "#about img", scrub: 1 } }
);
// abouttl.fromTo("#about p", { opacity: 0, y: 50 }, { opacity: 1, y: 0 });

// Purpose Section

const purposetl = gsap.timeline();

purposetl.fromTo(
	"#purpose",
	{
		opacity: 0.2,
	},
	{
		opacity: 1,
		scrollTrigger: {
			trigger: "#purpose",
			scrub: 1,
			start: "top 90%",
			end: "top 30%",
		},
	}
);
purposetl.fromTo(
	"#purpose h2",
	{ opacity: 0, scale: 1.1, transformOrigin: "center" },
	{ opacity: 1, scale: 1, duration: 0.4 }
);
const purposeps = document.querySelectorAll("#purpose p");
console.log(purposeps);
purposeps.forEach((p) => {
	purposetl.fromTo(
		p,
		{ opacity: 0, y: 50 },
		{ opacity: 1, y: 0, duration: 0.4 }
	);
});
new SplitType("#purpose p.ghost", { types: "words" });
const purposep = new SplitType("#purpose p.main", { types: "words" });
// purposep.chars?.forEach((chars, i) => {
purposetl.fromTo(
	purposep.words,
	{ opacity: 0, rotation: 5 },
	{
		opacity: 1,
		rotation: 0,
		transformOrigin: "left",
		stagger: 0.1,
		duration: 0.1,
	}
);
ScrollTrigger.create({
	animation: purposetl,
	trigger: "#purpose",
	start: "top top",
	end: "+=4000",
	pin: true,
	scrub: true,
});
// });
// purposetl;

const communitylist = gsap.utils.toArray("#community ul li");
gsap.to("#community ul li", {
	xPercent: -100 * (communitylist.length - 1),
	scrollTrigger: {
		trigger: "#community",
		scrub: 2,
		pin: true,
		// snap: 1 / (communitylist.length - 1),
		start: "top 10%",
		markers: true,
	},
});
