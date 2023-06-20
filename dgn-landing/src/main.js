import "./style.css";

import {
	createAboutTimeline,
	createCommunityTimeline,
	createEntryTimeline,
	createHeroTimeline,
	createNavTimeline,
	createPurposeTimeline,
	// createPrestigeTimeline,
	// createJoinTimeline,
	createJoinTimeline2,
	// createFooterTimeline,
} from "./timelines";

// createEntryTimeline();
createNavTimeline();
createHeroTimeline();
createAboutTimeline();
createPurposeTimeline();
createCommunityTimeline();
// createPrestigeTimeline();
// createJoinTimeline();
// createFooterTimeline();
createJoinTimeline2();

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();

		document.querySelector(this.getAttribute("href")).scrollIntoView({
			behavior: "smooth",
		});
	});
});
