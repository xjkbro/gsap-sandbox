import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/all";
import SplitType from "split-type";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(MotionPathPlugin);

export const createEntryTimeline = () => {
	const entrytl = gsap.timeline();
	entrytl
		.to("#loader", {
			display: "grid",
			duration: 0,
		})
		.to("body", {
			overflow: "hidden",
			duration: 0,
		})
		.fromTo(
			"#topbar",
			{
				x: -100,
			},
			{
				x: 0,
				duration: 0.7,
			}
		)
		.fromTo(
			"#bottombar",
			{
				x: 100,
			},
			{
				x: 0,
				duration: 0.7,
			}
		)
		.fromTo(
			"#topbar",
			{
				x: -100,
			},
			{
				y: "-8.1vw",
				x: 0,
				duration: 2.5,
				ease: "sine.out",
			},
			"0.5"
		)
		.fromTo(
			"#bottombar",
			{
				x: 100,
			},
			{
				y: "8.1vw",
				x: 0,
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
		.to("#topbar", {
			opacity: 0,
			duration: 0.7,
		})
		.to(
			"#bottombar",
			{
				opacity: 0,
			},
			"-=0.7"
		)
		.to("#loader", {
			delay: 0.2,
			opacity: 0,
			duration: 0.7,
		})
		.to("body", {
			overflow: "unset",
		})
		.to("#loader", {
			display: "none",
		});
};

export const createNavTimeline = () => {
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
};

export const createHeroTimeline = () => {
	const titles = gsap.utils.toArray("#hero h1 span");

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
	});

	herotl.fromTo(
		"#hero h3",
		{ opacity: 0, y: 50 },
		{ opacity: 1, y: 0, duration: 0.4 }
	);
};

export const createAboutTimeline = () => {
	const abouttl = gsap.timeline();
	abouttl.fromTo(
		"#about img",
		{ opacity: 0, x: -200 },
		{ opacity: 1, x: 0, scrollTrigger: { trigger: "#about img", scrub: 1 } }
	);
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
				},
			}
		);
	});
};

export const createPurposeTimeline = () => {
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
	purposeps.forEach((p) => {
		purposetl.fromTo(
			p,
			{ opacity: 0, y: 50 },
			{ opacity: 1, y: 0, duration: 0.4 }
		);
	});
	new SplitType("#purpose p.ghost", { types: "words" });
	const purposep = new SplitType("#purpose p.main", { types: "words" });
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
		end: "+=1500",
		pin: true,
		scrub: 1,
	});
};

export const createCommunityTimeline = () => {
	const communitytl = gsap.timeline();
	// const communitylist = gsap.utils.toArray("#community ul li");

	const imgArr = gsap.utils.toArray("#community div");
	imgArr.forEach((img, i) => {
		// console.log(img.children);
		communitytl
			.fromTo(
				img,
				{
					xPercent: i % 2 === 0 ? -50 : 0,
				},
				{
					xPercent: i % 2 === 0 ? 0 : -50,
					scrollTrigger: {
						trigger: img,
						scrub: 1,
						start: "top 100%",
						end: "bottom 0%",
					},
				}
			)
			.fromTo(
				img.children,
				{ opacity: 0.5 },
				{
					opacity: 1,
					stagger: 0.5,
					scrollTrigger: {
						trigger: img.children,
						scrub: 1,
						start: "top 100%",
						end: "bottom 0%",
					},
				}
			);
	});
	communitytl.fromTo(
		"#community article",
		{ opacity: 0, y: 50 },
		{
			opacity: 1,
			y: 0,
			scrollTrigger: {
				trigger: "#community",
				scrub: 1,
				// pin: true,
				start: "top 75%",
				end: "bottom 25%",
			},
		}
	);
};

// GOD I GIVEN UP ON THIS
export const createPrestigeTimeline = () => {};
// export const createPrestigeTimeline = () => {
// 	const prestigetl = gsap.timeline();

// 	const path = [
// 		{ x: 800, y: 0 },
// 		{ x: 0, y: 100 },
// 	];
// 	// gsap.from("#box", {
// 	// 	immediateRender: true,
// 	// 	motionPath: {
// 	// 		path: [
// 	// 			{ x: 800, y: 100 },
// 	// 			{ x: 200, y: 200 },
// 	// 		],
// 	// 		curviness: 1.5,
// 	// 		autoRotate: true,
// 	// 		align: "start",
// 	// 	},
// 	// 	scrollTrigger: {
// 	// 		trigger: "#box",
// 	// 		scrub: 1,
// 	// 		start: "top 100%",
// 	// 		end: "bottom 0%",
// 	// 		markers: true,
// 	// 	},
// 	// });
// 	const box = "#prestige div";
// 	gsap.to(box, {
// 		scrollTrigger: {
// 			trigger: box,
// 			start: "top right",
// 			end: "bottom left",
// 			scrub: true,
// 			markers: true,
// 		},
// 		scale: 12,
// 		immediateRender: true,
// 		motionPath: {
// 			path: [
// 				{ x: 1000, y: 0 },
// 				{ x: 0, y: 0 },
// 			],
// 			curviness: 1.5,
// 			start: 0.5,
// 		},
// 	});
// 	const elements = gsap.utils.toArray("#prestige");
// 	["#prestige div", "#prestige p"].forEach((element) => {
// 		gsap.set(element, { transformOrigin: "center" });
// 		prestigetl.fromTo(
// 			element,
// 			{ opacity: 0 },
// 			{
// 				scrollTrigger: {
// 					trigger: box,
// 					start: "top right",
// 					end: "+=5000",
// 					scrub: true,
// 					markers: true,
// 				},
// 				opacity: 1,
// 				scale: 12,
// 				immediateRender: true,
// 				motionPath: {
// 					path: [
// 						{ x: 1000, y: 0 },
// 						{ x: 0, y: 0 },
// 					],
// 					curviness: 1.5,
// 					start: 0.5,
// 				},
// 			}
// 		);
// 	});
// 	// prestigetl.to("#prestige div", {
// 	// 	immediateRender: true,
// 	// 	motionPath: {
// 	// 		path: path,
// 	// 		align: "self",
// 	// 	},
// 	// 	scrollTrigger: {
// 	// 		trigger: "#prestige div",
// 	// 		scrub: 1,
// 	// 		start: "top 100%",
// 	// 		end: "bottom 0%",
// 	// 		markers: true,
// 	// 	},
// 	// });
// 	// prestigetl.to("#prestige p", {
// 	// 	motionPath: {
// 	// 		path: path,
// 	// 		align: path,
// 	// 	},
// 	// 	immediateRender: true,
// 	// 	scrollTrigger: {
// 	// 		trigger: "#prestige p",
// 	// 		scrub: 1,
// 	// 		start: "top 100%",
// 	// 		end: "bottom 0%",
// 	// 		markers: true,
// 	// 	},
// 	// });
// 	// prestigetl.to("#prestige h2", {
// 	// 	motionPath: {
// 	// 		// path: "#prestige path",
// 	// 		path: [
// 	// 			{ x: 400, y: 0 },
// 	// 			{ x: -400, y: 300 },
// 	// 			{ x: 400, y: 600 },
// 	// 		],
// 	// 		// align: "#prestige path",
// 	// 		// autoRotate: true,
// 	// 	},
// 	// 	scrollTrigger: {
// 	// 		trigger: "#prestige h2",
// 	// 		scrub: 1,
// 	// 		pin: true,
// 	// 		start: "center 50%",
// 	// 		end: "+=5000",
// 	// 	},
// 	// 	duration: 10,
// 	// });
// };
// export const createPrestigeTimeline = () => {
// 	const prestigetl = gsap.timeline();
// 	const renderer = new THREE.WebGLRenderer({ alpha: true });
// 	const prestige = document.querySelector("#prestige");
// 	renderer.setSize(window.innerWidth, window.innerHeight);
// 	prestige.appendChild(renderer.domElement);

// 	const scene = new THREE.Scene();
// 	const camera = new THREE.PerspectiveCamera(
// 		75,
// 		window.innerWidth / window.innerHeight,
// 		0.1,
// 		1000
// 	);
// 	const axesHelper = new THREE.AxesHelper(9);
// 	// scene.add(axesHelper);
// 	camera.position.set(2, 2, 16);
// 	camera.lookAt(0, 0, 0);

// 	const light = new THREE.AmbientLight(0x404040); // soft white light
// 	const spotLight = new THREE.SpotLight(0xffffff);

// 	const assetLoader = new GLTFLoader();
// 	let gb;
// 	assetLoader.load(
// 		// "./gameboy_challenge.glb",
// 		"./destiny_2_character_bust.glb",
// 		function (gltf) {
// 			gb = gltf.scene;
// 			scene.add(gb);
// 			// for (let i = 0; i < gb.children.length; i++) {
// 			// 	gb.children[i].material = gb.children[i].material.clone();
// 			// }
// 		},
// 		undefined,
// 		function (error) {
// 			// console.log(error);
// 		}
// 	);
// 	// scene.add(cube);
// 	scene.add(light);
// 	scene.add(spotLight);
// 	function animate() {
// 		renderer.render(scene, camera);
// 	}
// 	renderer.setAnimationLoop(animate);
// 	// gb.rotation.y = 1.5;
// 	const height = document.querySelector("#prestige").offsetHeight;
// 	console.log(height);
// 	console.log(gb);
// 	prestigetl.to(camera.position, {
// 		scrollTrigger: {
// 			trigger: "#prestige",
// 			scrub: 1,
// 			markers: true,
// 			pin: true,
// 			start: "top top",
// 			end: "+=" + prestige.offsetHeight,
// 			// end: "bottom bottom",
// 			onUpdate: (self) => {
// 				console.log(gb.rotation.y);
// 				// console.log(camera.position.z - self.progress * 5);
// 				camera.position.z = 16;
// 				// camera.position.z = 2 + (1 - self.progress) * 5;
// 				// camera.position.y = 0.5 + (1 - self.progress) * 5;
// 				// camera.position.x = 0 + (1 - self.progress) * 5;
// 				camera.lookAt(0, 0.5, 0);
// 				// gb.rotation.x += self.getVelocity() / 700000;
// 				gb.rotation.y += self.getVelocity() / 500000;
// 				// console.log(gb.rotation.y);
// 			},
// 		},
// 	});
// 	// .to("#hi", {
// 	// 	scrollTrigger: {
// 	// 		trigger: "#prestige",
// 	// 		start: "bottom bottom",
// 	// 		end: "+=1000",
// 	// 		pin: true,
// 	// 		scrub: 1,
// 	// 	},
// 	// });
// 	const divs = document.querySelectorAll("#prestige div");
// 	// divs.forEach((div) => {
// 	// 	prestigetl.fromTo(
// 	// 		div,
// 	// 		{
// 	// 			opacity: 0,
// 	// 			x: -300,
// 	// 		},
// 	// 		{
// 	// 			opacity: 1,
// 	// 			x: 100,
// 	// 			scrollTrigger: {
// 	// 				trigger: div,
// 	// 				// pin: true,
// 	// 				markers: true,
// 	// 				scrub: 1,
// 	// 				start: "top 100%",
// 	// 				end: "bottom 100%",
// 	// 			},
// 	// 		}
// 	// 	);
// 	// });
// 	// prestigetl.to("#first", {
// 	// 	x: 200,
// 	// 	scrollTrigger: {
// 	// 		trigger: "#first",
// 	// 		markers: true,
// 	// 		scrub: 1,
// 	// 		start: "top 50%",
// 	// 		bottom: "bottom 50%",
// 	// 	},
// 	// });
// 	// 	.to("#prestige div", {
// 	// 		scrollTrigger: {
// 	// 			trigger: "#prestige",
// 	// 			scrub: 1,
// 	// 			start: "center 50%",
// 	// 			end: "center 60%",
// 	// 			pin: true,
// 	// 		},
// 	// 	})
// 	// 	.fromTo(
// 	// 		"#first",
// 	// 		{
// 	// 			translateX: -300,
// 	// 			opacity: 0,
// 	// 		},
// 	// 		{
// 	// 			translateX: 0,
// 	// 			opacity: 1,
// 	// 			scrollTrigger: {
// 	// 				trigger: "#prestige",
// 	// 				scrub: 1,
// 	// 				markers: true,
// 	// 				start: "top top",
// 	// 				end: "+=" + (height / 4) * 1,
// 	// 			},
// 	// 		}
// 	// 	)
// 	// 	.fromTo(
// 	// 		"#second",
// 	// 		{
// 	// 			translateY: -300,
// 	// 			opacity: 0,
// 	// 		},
// 	// 		{
// 	// 			translateY: 0,
// 	// 			opacity: 1,
// 	// 			scrollTrigger: {
// 	// 				trigger: "#prestige",
// 	// 				scrub: 1,
// 	// 				markers: true,
// 	// 				start: "top 25%",
// 	// 				end: "+=" + (height / 4) * 2,
// 	// 			},
// 	// 		}
// 	// 	)
// 	// 	.fromTo(
// 	// 		"#third",
// 	// 		{
// 	// 			translateY: 300,
// 	// 			opacity: 0,
// 	// 		},
// 	// 		{
// 	// 			translateY: 0,
// 	// 			opacity: 1,
// 	// 			scrollTrigger: {
// 	// 				trigger: "#prestige",
// 	// 				scrub: 1,
// 	// 				markers: true,
// 	// 				start: "top 50%",
// 	// 				end: "+=" + (height / 4) * 3,
// 	// 			},
// 	// 		}
// 	// 	)
// 	// 	.fromTo(
// 	// 		"#fourth",
// 	// 		{
// 	// 			translateY: 300,
// 	// 			opacity: 0,
// 	// 		},
// 	// 		{
// 	// 			translateY: 0,
// 	// 			opacity: 1,
// 	// 			scrollTrigger: {
// 	// 				trigger: "#prestige",
// 	// 				scrub: 1,
// 	// 				markers: true,
// 	// 				start: "top 75%",
// 	// 				end: "+=" + (height / 4) * 4,
// 	// 			},
// 	// 		}
// 	// 	);
// };

export const createJoinTimeline = () => {
	const jointl = document.querySelector("#join");
	const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	const send = document.querySelector("#sendnow");

	// renderer.setSize(send.offestWidth, send.offsetHeight);
	renderer.setSize(600, 600);
	send.appendChild(renderer.domElement);

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(80, 1, 0.1, 1000);
	const axesHelper = new THREE.AxesHelper(9);
	// scene.add(axesHelper);
	// camera.position.set(1, 1, 1);
	// camera.lookAt(0, 0, 0);
	let mixer;
	// const controls = new OrbitControls(camera, renderer.domElement);
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.target.set(0, 0, 0);
	controls.update();
	controls.enablePan = false;
	controls.enableZoom = false;
	// controls.en
	controls.enableDamping = true;

	const light = new THREE.AmbientLight(0x404040); // soft white light
	const spotLight = new THREE.SpotLight(0xffffff);

	const assetLoader = new GLTFLoader();
	let gb;
	assetLoader.load(
		// "./gameboy_challenge.glb",
		"./smol.glb",
		function (gltf) {
			gb = gltf.scene;
			gb.position.set(0, -1, 0);
			scene.add(gb);
			mixer = new THREE.AnimationMixer(gb);
			const clips = gltf.animations;
			clips.forEach((clip) => {
				mixer.clipAction(clip).play();
			});
		},
		undefined,
		function (error) {}
	);
	scene.add(light);
	scene.add(spotLight);
	// function animate() {
	// 	renderer.render(scene, camera);
	// }
	camera.position.set(2, 2, 4.5);
	camera.lookAt(0, 0, 0);

	// controls.update();
	window.onresize = function () {
		camera.aspect = 1;
		camera.updateProjectionMatrix();

		renderer.setSize(600, 600);
	};
	const clock = new THREE.Clock();
	function animate() {
		requestAnimationFrame(animate);
		if (mixer) mixer.update(clock.getDelta());

		// required if controls.enableDamping or controls.autoRotate are set to true
		// controls.update();

		renderer.render(scene, camera);
	}
	renderer.setAnimationLoop(animate);
};
