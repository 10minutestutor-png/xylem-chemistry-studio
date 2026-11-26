
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
// V3.0 - MINERAL VISUAL ENGINE
// ==========================================


function mineralPhoto(name) {

    const file = name.trim().toLowerCase() + ".jpg";
    const path = "./assets/images/" + file;

    return `
        <img
            src="${path}"
            alt="${escapeHTML(name)}"
            draggable="false"
            style="
                display:block;
                width:100%;
                height:180px;
                object-fit:contain;
                background:#091321;
                border-radius:12px;
                margin-bottom:8px;
            "
            onerror="
                this.style.display='none';
                this.nextElementSibling.style.display='block';
            "
        >

        <div style="
            display:none;
            padding:15px;
            color:#ff7777;
            border:1px solid #ef4444;
            border-radius:8px;
        ">
            Image not found:<br>
            ${path}
        </div>
    `;
}


// ==========================================
// MINERALS
// ==========================================

function renderMinerals(topic) {

    return `

        <div class="eyebrow">
            EXPLORE NATURAL MINERALS
        </div>

        <h2>Minerals</h2>

        <div class="definition">
            ${escapeHTML(topic.definition)}
        </div>

        <h3>Minerals of Aluminium</h3>

        <div class="mineral-grid"
             style="
                display:grid;
                grid-template-columns:repeat(3,minmax(0,1fr));
                gap:12px;
             ">

            ${topic.examples.map(([name,formula],i)=>`

                <button
                    class="mineral-card"
                    data-specimen="${name}"
                    style="
                        min-width:0;
                        padding:10px;
                        animation:fadeIn .6s ${i*.2}s both;
                        transition:all .3s;
                    "
                    onclick="inspectMineral(
                        '${name}',
                        '${formula}'
                    )">

                    ${mineralPhoto(name)}

                    <h3>${escapeHTML(name)}</h3>

                    <small style="color:#38bdf8">
                        Tap to explore
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

function inspectMineral(name,formula) {

    const info = $("mineralInfo");

    const descriptions = {

        Clay:
            "Clay contains aluminium compounds. "
            + "Kaolinite is an example.",

        Bauxite:
            "Bauxite is rich in aluminium-bearing "
            + "minerals and is the principal ore "
            + "of aluminium.",

        Cryolite:
            "Cryolite is an aluminium-containing "
            + "mineral used in aluminium extraction."

    };

    document.querySelectorAll("[data-specimen]")
        .forEach(card => {

            const active =
                card.dataset.specimen === name;

            card.style.borderColor =
                active ? "#38bdf8" : "";

            card.style.boxShadow =
                active
                ? "0 0 18px #38bdf844"
                : "";

        });

    info.classList.remove("hidden");

    info.innerHTML = `

        <h3 style="color:#38bdf8;margin:5px">

            ${escapeHTML(name)}

        </h3>

        <div style="
            font-size:clamp(18px,3vw,30px);
            color:#facc15;
            font-weight:bold;
            margin:8px;
        ">

            ${escapeHTML(formula)}

        </div>

        <p>

            ${escapeHTML(descriptions[name] || "")}

        </p>

    `;
}

// ==========================================
// INTERACTIVE ORE SELECTION
// ==========================================

function renderOreSelection(topic) {

    const minerals = topics.find(
        item => item.type === "minerals"
    ).examples;

    return `

        <div class="eyebrow">
            THINK • OBSERVE • SELECT
        </div>

        <h2>Which is the ore of aluminium?</h2>

        <p style="color:#94a3b8">
            Select the correct specimen.
        </p>

        <div class="mineral-grid"
             style="
                display:grid;
                grid-template-columns:repeat(3,minmax(0,1fr));
                gap:12px;
             ">

            ${minerals.map(([name,formula],i)=>`

                <button
                    class="mineral-card"
                    data-mineral="${name}"
                    style="
                        min-width:0;
                        padding:10px;
                        transition:all .3s;
                        animation:fadeIn .6s ${i*.2}s both;
                    "
                    onclick="selectOre('${name}')">

                    ${mineralPhoto(name)}

                    <h3>${escapeHTML(name)}</h3>

                    <small>
                        ${escapeHTML(formula)}
                    </small>

                </button>

            `).join("")}

        </div>

        <div id="oreFeedback"
             class="definition hidden">
        </div>

        <div id="oreDefinition"
             class="definition hidden">

            <h3 style="color:#4ade80">
                ORE
            </h3>

            ${escapeHTML(topic.definition)}

            <div style="
                margin-top:15px;
                font-weight:bold;
                color:#38bdf8;
            ">

                All ores are minerals,
                but all minerals are not ores.

            </div>

        </div>

        <button class="reveal-button"
                onclick="revealOreDefinition()">

            Reveal Definition

        </button>

        <button class="reveal-button"
                onclick="resetOreSelection()">

            Try Again

        </button>

    `;
}

// ==========================================
// CHECK STUDENT ANSWER
// ==========================================

function selectOre(name) {

    const feedback = $("oreFeedback");

    const correct =
        name === topics[currentScene].answer;

    feedback.classList.remove("hidden");

    document.querySelectorAll("[data-mineral]")
        .forEach(card => {

            card.classList.remove(
                "correct","incorrect"
            );

            card.style.boxShadow = "";
            card.style.borderColor = "";
            card.style.opacity = "1";

            if(card.dataset.mineral === name) {

                card.classList.add(
                    correct ? "correct" : "incorrect"
                );

                card.style.borderColor =
                    correct ? "#22c55e" : "#ef4444";

                card.style.boxShadow =
                    correct
                    ? "0 0 20px #22c55e55"
                    : "0 0 15px #ef444444";

            } else if(correct) {

                card.style.opacity = ".45";

            }

        });

    if(correct) {

        feedback.style.color = "#86efac";

        feedback.innerHTML = `

            <h3>✓ Correct! Bauxite</h3>

            <p>
                Aluminium can be extracted
                economically from bauxite.
            </p>

            <div style="
                display:flex;
                justify-content:center;
                align-items:center;
                flex-wrap:wrap;
                gap:12px;
                margin:12px 0;
            ">

                <strong>Bauxite</strong>

                <span style="color:#38bdf8">
                    →
                </span>

                <strong>Alumina</strong>

                <span style="color:#38bdf8">
                    →
                </span>

                <strong style="
                    color:#e2e8f0;
                    background:linear-gradient(
                        135deg,#334155,#64748b
                    );
                    padding:12px;
                    border-radius:8px;
                    animation:fadeIn 1s both;
                ">

                    Aluminium (Al)

                </strong>

            </div>

            <small>
                Overall extraction process
            </small>

        `;

        revealOreDefinition();

    } else {

        $("oreDefinition").classList.add("hidden");

        feedback.style.color = "#facc15";

        feedback.innerHTML = `

            <h3>Try Again!</h3>

            <p>
                ${escapeHTML(name)} contains aluminium,
                but is not its principal commercial ore.
            </p>

        `;

    }

}

// ==========================================
// REVEAL ORE DEFINITION
// ==========================================

function revealOreDefinition() {

    $("oreDefinition")
        ?.classList.remove("hidden");

}

// ==========================================
// RESET ORE ACTIVITY
// ==========================================

function resetOreSelection() {

    $("oreFeedback")
        ?.classList.add("hidden");

    $("oreDefinition")
        ?.classList.add("hidden");

    document.querySelectorAll("[data-mineral]")
        .forEach(card => {

            card.classList.remove(
                "correct","incorrect"
            );

            card.style.opacity = "1";
            card.style.boxShadow = "";
            card.style.borderColor = "";

        });

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

// ==========================================
// V3.0 COLLAPSIBLE TEACHING TOOLBAR
// ==========================================

(() => {

    const toolsButton =
        document.getElementById("toggleToolsBtn");

    if (!toolsButton) return;

    function toggleTeachingTools() {

        const hidden =
            document.body.classList.toggle(
                "tools-hidden"
            );

        toolsButton.textContent = hidden
            ? "✎ Show Tools"
            : "✎ Hide Tools";

        toolsButton.setAttribute(
            "aria-expanded",
            String(!hidden)
        );

        if (hidden) {
            window.Whiteboard?.setTool("pointer");
        }

    }

    toolsButton.addEventListener(
        "click",
        toggleTeachingTools
    );

})();

// ==========================================
// V3.1 SMART AUTOMATIC LESSON SCROLLING
// ==========================================

(() => {

    const teachingArea =
        document.getElementById("scene");

    if (!teachingArea) return;

    let scrollTimer;
    let previousHeight = teachingArea.scrollHeight;

    const observer = new MutationObserver(records => {

        const newHeight = teachingArea.scrollHeight;

        const newLesson = records.some(record =>
            record.type === "childList" &&
            record.target === teachingArea &&
            record.removedNodes.length > 0
        );

        if (newLesson) {

            clearTimeout(scrollTimer);

            teachingArea.scrollTo({
                top: 0,
                behavior: "instant"
            });

            previousHeight = newHeight;

            return;
        }

        if (newHeight > previousHeight + 5) {

            clearTimeout(scrollTimer);

            scrollTimer = setTimeout(() => {

                teachingArea.scrollTo({
                    top: teachingArea.scrollHeight,
                    behavior: "smooth"
                });

            }, 150);

        }

        previousHeight = newHeight;

    });

    observer.observe(teachingArea, {

        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["class", "style", "hidden"]

    });

})();

// ==========================================
// V3.1 HIDE / SHOW TOOLS - FIX
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
                window.Whiteboard?.setTool("pointer");
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
