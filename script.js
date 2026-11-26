
/* ==========================================
   XYLEM NADAPURAM
   CHEMISTRY STUDIO V2.0
   MAIN APPLICATION ENGINE
========================================== */

const topics = METALS_CHAPTER.topics;

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
                ? "blank"
                : String(currentScene)
        );

    }
}

function restoreCurrentInk() {

    if (window.Whiteboard?.loadScene) {

        window.Whiteboard.loadScene(
            blankMode
                ? "blank"
                : String(currentScene)
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
        "CHAPTER 06 • " + topic.title.toUpperCase();

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

        case "minerals":
            scene.innerHTML = renderMinerals(topic);
            break;

        case "oreSelection":
            scene.innerHTML = renderOreSelection(topic);
            break;

        case "table":
            scene.innerHTML = renderTable(topic);
            break;

        case "reactivity":
            scene.innerHTML = renderReactivity(topic);
            break;

        case "quiz":
            scene.innerHTML = MetalsQuiz.render();
            break;

        case "uses":
            scene.innerHTML = renderUses(topic);
            break;

        default:
            scene.innerHTML = renderLesson(topic);

    }

    scene.scrollTop = 0;

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
                STANDARD X — CHAPTER 06
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
// USES OF METALS
// ==========================================

function renderUses(topic) {

    const icons = ["🚗", "🚜", "🏗️", "💻", "🍳"];

    return `

        <div class="eyebrow">
            METALS IN DAILY LIFE
        </div>

        <h2>${escapeHTML(topic.title)}</h2>

        <div class="card-grid">

            ${topic.points.map((point, i) => `

                <div class="content-card"
                     style="animation:fadeIn .5s
                     ${i * .15}s both">

                    <div style="font-size:65px">
                        ${icons[i]}
                    </div>

                    <h3>${escapeHTML(point)}</h3>

                </div>

            `).join("")}

        </div>

        <div class="definition">
            Can you identify metals used in
            each of these sectors?
        </div>

    `;

}

// ==========================================
// MINERALS
// ==========================================

function renderMinerals(topic) {

    return `

        <div class="eyebrow">
            OCCURRENCE OF METALS
        </div>

        <h2>Minerals</h2>

        <div class="definition">
            ${escapeHTML(topic.definition)}
        </div>

        <h3>Minerals of Aluminium</h3>

        <div class="mineral-grid">

            ${topic.examples.map(([name, formula]) => `

                <button class="mineral-card"
                        onclick="inspectMineral(
                            '${name}',
                            '${formula}'
                        )">

                    <div class="rock
                        ${name.toLowerCase()}">
                    </div>

                    <h3>${escapeHTML(name)}</h3>

                    <small>
                        ${escapeHTML(formula)}
                    </small>

                </button>

            `).join("")}

        </div>

        <div id="mineralInfo"
             class="definition hidden">
        </div>

        <button class="reveal-button"
                onclick="goToScene(4)">
            Which mineral is an ore? →
        </button>

    `;

}

function inspectMineral(name, formula) {

    const info = $("mineralInfo");

    info.classList.remove("hidden");

    info.textContent =
        name + " (" + formula + ")"
        + " is a mineral of aluminium.";

}

// ==========================================
// INTERACTIVE ORE SELECTION
// ==========================================

function renderOreSelection(topic) {

    const minerals = [
        ["Clay", "Al₂O₃·2SiO₂·2H₂O"],
        ["Bauxite", "Al₂O₃·2H₂O"],
        ["Cryolite", "Na₃AlF₆"]
    ];

    return `

        <div class="eyebrow">
            MINERAL OR ORE?
        </div>

        <h2>Which is the ore of aluminium?</h2>

        <p>Select the correct mineral.</p>

        <div class="mineral-grid">

            ${minerals.map(([name, formula]) => `

                <button class="mineral-card"
                        data-mineral="${name}"
                        onclick="selectOre('${name}')">

                    <div class="rock
                        ${name.toLowerCase()}">
                    </div>

                    <h3>${name}</h3>

                    <small>${formula}</small>

                </button>

            `).join("")}

        </div>

        <div id="oreFeedback"
             class="definition hidden">
        </div>

        <div id="oreDefinition"
             class="definition hidden">

            <strong>ORE</strong>

            <br>

            ${escapeHTML(topic.definition)}

        </div>

        <button class="reveal-button"
                onclick="revealOreDefinition()">
            Reveal Definition
        </button>

    `;

}

function selectOre(name) {

    const feedback = $("oreFeedback");

    feedback.classList.remove("hidden");

    document.querySelectorAll("[data-mineral]")
        .forEach(card => {

            card.classList.remove(
                "correct", "incorrect"
            );

            if (card.dataset.mineral === name) {

                card.classList.add(
                    name === "Bauxite"
                        ? "correct"
                        : "incorrect"
                );

            }

        });

    if (name === "Bauxite") {

        feedback.style.color = "#86efac";

        feedback.textContent =
            "Correct! Aluminium can be extracted "
            + "economically from bauxite.";

        revealOreDefinition();

    } else {

        feedback.style.color = "#facc15";

        feedback.textContent =
            name + " is a mineral of aluminium. "
            + "However, bauxite is its principal ore.";

    }

}

function revealOreDefinition() {

    $("oreDefinition")
        ?.classList.remove("hidden");

}

// ==========================================
// TABLE RENDERER
// ==========================================

function renderTable(topic) {

    return `

        <div class="eyebrow">
            METALS • REFERENCE TABLE
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
// REACTIVITY SERIES
// ==========================================

function renderReactivity(topic) {

    return `

        <div class="eyebrow">
            EXTRACTION OF METALS
        </div>

        <h2>Reactivity Series</h2>

        <div class="reactivity-grid">

            ${topic.groups.map((group, index) => `

                <div class="reactivity-group">

                    <h3 style="color:${
                        ["#f87171",
                         "#facc15",
                         "#4ade80"][index]
                    }">

                        ${escapeHTML(group.name)}

                    </h3>

                    <div>

                        ${group.metals.map(metal => `

                            <span class="metal-symbol">
                                ${escapeHTML(metal)}
                            </span>

                        `).join("")}

                    </div>

                    <button style="margin-top:15px"
                            onclick="
                            document.getElementById(
                                'method${index}'
                            ).classList.remove('hidden')
                            ">

                        Reveal Extraction Method

                    </button>

                    <p id="method${index}"
                       class="hidden">

                        ${escapeHTML(group.method)}

                    </p>

                </div>

            `).join("")}

        </div>

        <div class="definition">
            The extraction method depends on the
            reactivity of the metal.
        </div>

    `;

}

// ==========================================
// GENERAL LESSON RENDERER
// ==========================================

function renderLesson(topic) {

    const animation = MetalsAnimations.render(topic);

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
        (timestamp - lastFrameTime) / 1000;

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

    MetalsAnimations.pause();

    animationFrame =
        requestAnimationFrame(animationTick);

}

function pauseAnimations() {

    animationPlaying = false;

    stopAnimationClock();

    MetalsAnimations.pause();

    scene.classList.add("paused");

}

function resetAnimations() {

    stopAnimationClock();

    MetalsAnimations.reset();

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
        "Xylem Chemistry Studio V2.0 Ready"
    );

    console.log(
        "Total teaching scenes: " + topics.length
    );

}

initialiseStudio();
