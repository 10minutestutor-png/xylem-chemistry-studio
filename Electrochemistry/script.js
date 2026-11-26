
/* ==========================================
   XYLEM NADAPURAM
   CHEMISTRY STUDIO V5.0
   MAIN APPLICATION ENGINE
========================================== */

const topics = ELECTROCHEMISTRY_CHAPTER.topics;

const $ = id => document.getElementById(id);

let currentScene = 0;
let revealedPoints = 0;
let revealedEquations = 0;
let blankMode = false;
let animationSpeed = 1;
let animationPlaying = true;
let animationFrame = null;
let lastFrameTime = null;

const scene = $("scene");

// ==========================================
// UTILITIES
// ==========================================

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, ch => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[ch]);
}

function formatNumber(number) {
    return String(number).padStart(2, "0");
}

// ==========================================
// CHAPTER NAVIGATION
// ==========================================

function buildNavigation() {

    const search = $("topicSearch")
        .value.toLowerCase().trim();

    $("topicList").innerHTML = "";

    topics.forEach((topic, index) => {

        if (!topic.title.toLowerCase()
            .includes(search)) return;

        const button = document.createElement("button");

        button.textContent =
            formatNumber(index + 1)
            + "  " + topic.title;

        button.dataset.index = index;

        if (index === currentScene) {
            button.classList.add("active");
        }

        button.addEventListener("click", () => {

            goToScene(index);

            if (window.innerWidth <= 760) {
                document.body.classList.add(
                    "sidebar-hidden"
                );
            }

        });

        $("topicList").appendChild(button);

    });
}

// ==========================================
// WHITEBOARD INTEGRATION
// ==========================================

function saveCurrentInk() {

    if (window.Whiteboard?.saveScene) {

        window.Whiteboard.saveScene(
            blankMode
                ? "electrochemistry-blank"
                : "electrochemistry-" + currentScene
        );

    }
}

function restoreCurrentInk() {

    if (window.Whiteboard?.loadScene) {

        window.Whiteboard.loadScene(
            blankMode
                ? "electrochemistry-blank"
                : "electrochemistry-" + currentScene
        );

    } else if (typeof clearInk === "function") {

        clearInk();

    }
}

// ==========================================
// CHANGE SCENE
// ==========================================

function goToScene(index) {

    if (index < 0 || index >= topics.length) return;

    saveCurrentInk();

    blankMode = false;

    document.body.classList.remove("blank-board");

    currentScene = index;
    revealedPoints = 0;
    revealedEquations = 0;

    renderScene();

    restoreCurrentInk();

    if (typeof setTool === "function") {
        setTool("pointer");
    }

    buildNavigation();

    $("topicList")
        .querySelector(".active")
        ?.scrollIntoView({
            block: "nearest",
            behavior: "smooth"
        });

}

// ==========================================
// LESSON HEADER
// ==========================================

function updateHeader() {

    const topic = topics[currentScene];

    $("sectionLabel").textContent =
        "CHAPTER 05 • " + topic.title.toUpperCase();

    $("pageLabel").textContent =
        "Page " + topic.page;

    $("sceneNumber").textContent =
        formatNumber(currentScene + 1);

    $("totalScenes").textContent =
        formatNumber(topics.length);

    $("lessonProgress").style.width =
        ((currentScene + 1) / topics.length * 100)
        + "%";

    $("prevBtn").disabled = currentScene === 0;

    $("nextBtn").disabled =
        currentScene === topics.length - 1;

}

// ==========================================
// MAIN SCENE RENDERER
// ==========================================

function renderScene() {

    stopAnimationClock();

    const topic = topics[currentScene];

    scene.classList.remove("paused");

    updateHeader();

    switch (topic.type) {

        case "intro":
            scene.innerHTML = renderIntro(topic);
            break;

        case "table":
            scene.innerHTML = topic.animation ? renderLesson(topic) : renderTable(topic);
            break;

        default:
            scene.innerHTML = renderLesson(topic);

    }

    scene.scrollTo({top: 0, behavior: "instant"});

    playAnimations();

}

// ==========================================
// CHAPTER INTRODUCTION
// ==========================================

function renderIntro(topic) {

    return `

        <div class="intro-screen">

            <div class="eyebrow">
                XYLEM NADAPURAM • CHEMISTRY
            </div>

            <div class="eyebrow">
                STANDARD X — CHAPTER 05
            </div>

            <h1 class="metal-title">
                ${escapeHTML(topic.title)}
            </h1>

            <p class="intro-subtitle">
                ${escapeHTML(topic.subtitle)}
            </p>

            <button id="beginBtn"
                    onclick="goToScene(1)">
                Begin Exploration →
            </button>

        </div>

    `;

}

// ==========================================
// TABLE RENDERER
// ==========================================

function renderTable(topic) {

    return `

        <div class="eyebrow">
            ELECTROCHEMISTRY • REFERENCE TABLE
        </div>

        <h2>${escapeHTML(topic.title)}</h2>

        <div class="table-wrapper">

            <table>

                <thead>

                    <tr>

                        ${topic.headers.map(header => `
                            <th>
                                ${escapeHTML(header)}
                            </th>
                        `).join("")}

                    </tr>

                </thead>

                <tbody>

                    ${topic.rows.map(row => `

                        <tr>

                            ${row.map(cell => `
                                <td>
                                    ${escapeHTML(cell)}
                                </td>
                            `).join("")}

                        </tr>

                    `).join("")}

                </tbody>

            </table>

        </div>

    `;

}

// ==========================================
// GENERAL LESSON RENDERER
// ==========================================

function renderLesson(topic) {

    const animation = ElectrochemistryAnimations.render(topic);

    return `

        <div class="eyebrow">
            INTERACTIVE CHEMISTRY
        </div>

        <h2>${escapeHTML(topic.title)}</h2>

        ${animation ? `

            <div class="animation-panel">

                ${animation}

            </div>

        ` : ""}

        ${topic.definition ? `

            <div class="definition">

                ${escapeHTML(topic.definition)}

            </div>

        ` : ""}

        ${topic.points?.length ? `

            <div id="pointsList"
                 class="points-list">
            </div>

            <button id="revealPointBtn"
                    class="reveal-button"
                    onclick="revealNextPoint()">

                Reveal Next Point
                (0/${topic.points.length})

            </button>

        ` : ""}

        ${topic.equations?.length ? `

            <div id="equationList"
                 class="equation-list">
            </div>

            <button id="revealEquationBtn"
                    class="reveal-button"
                    onclick="revealNextEquation()">

                Reveal Equation
                (0/${topic.equations.length})

            </button>

        ` : ""}

        ${(topic.points?.length ||
           topic.equations?.length) ? `

            <button onclick="revealAll()">
                Show All Content
            </button>

        ` : ""}

    `;

}

// ==========================================
// STEP-BY-STEP POINT REVEAL
// ==========================================

function revealNextPoint(scroll = true) {

    const points = topics[currentScene].points || [];

    const container = $("pointsList");

    if (!container ||
        revealedPoints >= points.length) return;

    const card = document.createElement("div");

    card.className = "point-card";

    card.textContent =
        (revealedPoints + 1)
        + ". " + points[revealedPoints];

    container.appendChild(card);

    revealedPoints++;

    const button = $("revealPointBtn");

    button.textContent =
        "Reveal Next Point ("
        + revealedPoints
        + "/" + points.length + ")";

    if (revealedPoints === points.length) {

        button.textContent = "All Points Revealed";

        button.disabled = true;

    }

    if (scroll) {
        card.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    }

}

// ==========================================
// CHEMICAL EQUATION REVEAL
// ==========================================

function revealNextEquation(scroll = true) {

    const equations =
        topics[currentScene].equations || [];

    const container = $("equationList");

    if (!container ||
        revealedEquations >= equations.length) return;

    const card = document.createElement("div");

    card.className = "equation";

    card.textContent =
        equations[revealedEquations];

    container.appendChild(card);

    revealedEquations++;

    const button = $("revealEquationBtn");

    button.textContent =
        "Reveal Equation ("
        + revealedEquations
        + "/" + equations.length + ")";

    if (revealedEquations === equations.length) {

        button.textContent = "All Equations Revealed";

        button.disabled = true;

    }

    if (scroll) {
        card.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    }

}

function revealAll() {

    const topic = topics[currentScene];

    if ($("pointsList")) {

        while (
            revealedPoints < (topic.points?.length || 0)
        ) {
            revealNextPoint(false);
        }

    }

    if ($("equationList")) {

        while (
            revealedEquations <
            (topic.equations?.length || 0)
        ) {
            revealNextEquation(false);
        }

    }
    const last = $("equationList")?.lastElementChild || $("pointsList")?.lastElementChild;
    last?.scrollIntoView({behavior:"smooth",block:"nearest"});

}

// ==========================================
// ANIMATION SPEED ENGINE
// ==========================================

function stopAnimationClock() {

    if (animationFrame !== null) {

        cancelAnimationFrame(animationFrame);

        animationFrame = null;

    }

    lastFrameTime = null;

}

function animationTick(timestamp) {

    if (!animationPlaying) return;

    if (lastFrameTime === null) {

        lastFrameTime = timestamp;

    }

    const elapsed =
        Math.min(0.1, (timestamp - lastFrameTime) / 1000);

    lastFrameTime = timestamp;

    document.querySelectorAll("#scene svg")
        .forEach(svg => {

            if (svg.getCurrentTime &&
                svg.setCurrentTime) {

                svg.setCurrentTime(
                    svg.getCurrentTime()
                    + elapsed * animationSpeed
                );

            }

        });

    animationFrame =
        requestAnimationFrame(animationTick);

}

function playAnimations() {

    stopAnimationClock();

    animationPlaying = true;

    scene.classList.remove("paused");

    ElectrochemistryAnimations.pause();

    animationFrame =
        requestAnimationFrame(animationTick);

}

function pauseAnimations() {

    animationPlaying = false;

    stopAnimationClock();

    ElectrochemistryAnimations.pause();

    scene.classList.add("paused");

}

function resetAnimations() {

    stopAnimationClock();

    ElectrochemistryAnimations.reset();
    ElectrochemistryAnimations.pause();

    playAnimations();

}

// ==========================================
// BLANK EXPLANATION BOARD
// ==========================================

function openBlankBoard() {

    if (blankMode) return;

    saveCurrentInk();

    blankMode = true;

    pauseAnimations();

    document.body.classList.add("blank-board");

    $("sectionLabel").textContent =
        "TEACHER EXPLANATION BOARD";

    $("pageLabel").textContent = "";

    scene.innerHTML = `

        <div class="eyebrow"
             style="opacity:.45">

            XYLEM NADAPURAM • WHITEBOARD

        </div>

    `;

    restoreCurrentInk();

    if (typeof setTool === "function") {
        setTool("pen");
    }

}

function returnToLesson() {

    if (!blankMode) return;

    saveCurrentInk();

    blankMode = false;

    document.body.classList.remove("blank-board");

    revealedPoints = 0;
    revealedEquations = 0;

    renderScene();

    restoreCurrentInk();

    if (typeof setTool === "function") {
        setTool("pointer");
    }

}

// ==========================================
// FULL SCREEN
// ==========================================

async function toggleFullscreen() {

    try {

        if (!document.fullscreenElement) {

            await document.documentElement
                .requestFullscreen();

        } else {

            await document.exitFullscreen();

        }

    } catch (error) {

        alert("Full screen is unavailable.");

    }

}

// ==========================================
// CLASSROOM MODE
// ==========================================

function toggleClassroomMode() {

    const active = document.body.classList.toggle(
        "classroom-mode"
    );

    $("classroomBtn").textContent = active
        ? "Exit Classroom"
        : "Classroom Mode";

}

// ==========================================
// BUTTON CONNECTIONS
// ==========================================

$("prevBtn").addEventListener("click", () => {

    goToScene(currentScene - 1);

});

$("nextBtn").addEventListener("click", () => {

    goToScene(currentScene + 1);

});

$("playBtn").addEventListener(
    "click", playAnimations
);

$("pauseBtn").addEventListener(
    "click", pauseAnimations
);

$("resetBtn").addEventListener(
    "click", resetAnimations
);

$("fullscreenBtn").addEventListener(
    "click", toggleFullscreen
);

$("classroomBtn").addEventListener(
    "click", toggleClassroomMode
);

$("blankBtn").addEventListener(
    "click", openBlankBoard
);

$("restoreBtn").addEventListener(
    "click", returnToLesson
);

$("menuBtn").addEventListener("click", () => {

    document.body.classList.remove(
        "classroom-mode"
    );

    $("classroomBtn").textContent =
        "Classroom Mode";

    document.body.classList.toggle(
        "sidebar-hidden"
    );

});

$("topicSearch").addEventListener(
    "input", buildNavigation
);

$("animationSpeed").addEventListener(
    "change", event => {

        animationSpeed =
            Number(event.target.value);

    }
);

document.addEventListener(
    "fullscreenchange", () => {

        $("fullscreenBtn").textContent =
            document.fullscreenElement
                ? "⛶ Exit Full Screen"
                : "⛶ Full Screen";

    }
);

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================

document.addEventListener("keydown", event => {

    const tag = event.target.tagName;

    if (["INPUT", "TEXTAREA", "SELECT"]
        .includes(tag)) return;

    if (event.target.isContentEditable ||
        event.ctrlKey || event.metaKey ||
        event.altKey) return;

    switch (event.key.toLowerCase()) {

        case "arrowright":

            if (!blankMode) {
                goToScene(currentScene + 1);
            }

            break;

        case "arrowleft":

            if (!blankMode) {
                goToScene(currentScene - 1);
            }

            break;

        case " ":

            if (tag === "BUTTON") return;

            event.preventDefault();

            if (animationPlaying) {
                pauseAnimations();
            } else {
                playAnimations();
            }

            break;

        case "f":
            toggleFullscreen();
            break;

        case "n":
            if (!blankMode) revealNextPoint();
            break;

        case "e":
            if (!blankMode) revealNextEquation();
            break;

        case "b":

            if (blankMode) {
                returnToLesson();
            } else {
                openBlankBoard();
            }

            break;

    }

});

// ==========================================
// APPLICATION INITIALISATION
// ==========================================

function initialiseStudio() {

    if (window.innerWidth <= 760) {

        document.body.classList.add(
            "sidebar-hidden"
        );

    }

    buildNavigation();

    renderScene();

    restoreCurrentInk();

    console.log(
        "Xylem Chemistry Studio V5.0 Ready"
    );

    console.log(
        "Total teaching scenes: " + topics.length
    );

}

initialiseStudio();

// ==========================================
// V5.0 HIDE / SHOW TOOLS - FIX
// ==========================================

(() => {

    function initializeToolsToggle() {

        const oldButton =
            document.getElementById("toggleToolsBtn");

        const toolbar =
            document.getElementById("toolbar");

        if (!oldButton || !toolbar) return;

        // Remove previous event handlers
        const button = oldButton.cloneNode(true);

        oldButton.replaceWith(button);

        function updateButton() {

            const hidden =
                document.body.classList.contains(
                    "tools-hidden"
                );

            button.textContent = hidden
                ? "✎ Show Tools"
                : "✎ Hide Tools";

            button.setAttribute(
                "aria-expanded",
                String(!hidden)
            );

            toolbar.style.display =
                hidden ? "none" : "";

        }

        button.addEventListener("click", event => {

            event.preventDefault();

            const hidden =
                document.body.classList.toggle(
                    "tools-hidden"
                );

            if (hidden) {
                window.Whiteboard?.setTool?.("pointer");
            }

            updateButton();

            requestAnimationFrame(() => {
                window.dispatchEvent(
                    new Event("resize")
                );
            });

        });

        updateButton();

        console.log("Tools Toggle Ready");

    }

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initializeToolsToggle
        );

    } else {

        initializeToolsToggle();

    }

})();
