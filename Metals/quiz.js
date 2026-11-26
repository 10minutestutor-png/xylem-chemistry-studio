
/* XYLEM NADAPURAM
   CHEMISTRY STUDIO V2.0
   METALS - INTERACTIVE ASSESSMENT
*/

const MetalsQuiz = (() => {

    const questions = [

        {
            type: "mcq",
            question: "Which is the principal ore of aluminium?",
            options: ["Clay", "Bauxite", "Cryolite", "Magnetite"],
            correct: 1,
            explanation: "Aluminium is extracted economically from bauxite."
        },

        {
            type: "mcq",
            question: "Which is an ore of iron?",
            options: ["Calamine", "Cryolite", "Haematite", "Zinc blende"],
            correct: 2,
            explanation: "Haematite (Fe₂O₃) is an important ore of iron."
        },

        {
            type: "mcq",
            question: "Which statement is correct?",
            options: [
                "All minerals are ores",
                "All ores are minerals",
                "All minerals are pure metals",
                "All ores contain iron"
            ],
            correct: 1,
            explanation: "All ores are minerals, but all minerals are not ores."
        },

        {
            type: "mcq",
            question: "Hydraulic washing is based on the difference in:",
            options: [
                "Colour",
                "Density",
                "Melting point",
                "Magnetic property"
            ],
            correct: 1,
            explanation: "Dense ore particles are separated from lighter impurities."
        },

        {
            type: "mcq",
            question: "Which method is generally used to concentrate sulphide ores?",
            options: [
                "Distillation",
                "Liquation",
                "Froth floatation",
                "Electrolysis"
            ],
            correct: 2,
            explanation: "Sulphide ore particles preferentially attach to the froth."
        },

        {
            type: "mcq",
            question: "Which method is used to concentrate magnetite?",
            options: [
                "Magnetic separation",
                "Liquation",
                "Distillation",
                "Electrolytic refining"
            ],
            correct: 0,
            explanation: "Magnetite possesses magnetic properties."
        },

        {
            type: "mcq",
            question: "Which method is used to concentrate bauxite?",
            options: [
                "Roasting",
                "Leaching",
                "Distillation",
                "Liquation"
            ],
            correct: 1,
            explanation: "Bauxite is treated with hot sodium hydroxide solution."
        },

        {
            type: "mcq",
            question: "Carbonate ores are generally converted into oxides by:",
            options: [
                "Roasting",
                "Calcination",
                "Electrolysis",
                "Magnetic separation"
            ],
            correct: 1,
            explanation: "Calcination involves heating in limited quantities or absence of air."
        },

        {
            type: "mcq",
            question: "Which is the main reducing agent in a blast furnace?",
            options: [
                "Calcium oxide",
                "Carbon dioxide",
                "Carbon monoxide",
                "Silicon dioxide"
            ],
            correct: 2,
            explanation: "Carbon monoxide reduces iron oxide to iron."
        },

        {
            type: "mcq",
            question: "Which substance acts as a basic flux during iron extraction?",
            options: [
                "CaO",
                "SiO₂",
                "CO₂",
                "Fe₂O₃"
            ],
            correct: 0,
            explanation: "Calcium oxide reacts with silica to form calcium silicate slag."
        },

        {
            type: "mcq",
            question: "Which method can be used to purify zinc?",
            options: [
                "Froth floatation",
                "Hydraulic washing",
                "Distillation",
                "Roasting"
            ],
            correct: 2,
            explanation: "Zinc can be vaporised and condensed during distillation."
        },

        {
            type: "mcq",
            question: "During electrolytic refining, impure metal is used as:",
            options: [
                "Cathode",
                "Anode",
                "Electrolyte",
                "Flux"
            ],
            correct: 1,
            explanation: "Impure metal dissolves at the anode and pure metal deposits at the cathode."
        },

        {
            type: "mcq",
            question: "Which method is used to extract aluminium?",
            options: [
                "Reduction using coke",
                "Reduction using carbon monoxide",
                "Electrolysis",
                "Liquation"
            ],
            correct: 2,
            explanation: "Aluminium is highly reactive and is extracted by electrolytic reduction."
        },

        {
            type: "mcq",
            question: "Why is cryolite added during aluminium extraction?",
            options: [
                "To increase the melting temperature",
                "To produce iron",
                "To lower the operating melting temperature",
                "To increase corrosion"
            ],
            correct: 2,
            explanation: "Cryolite lowers the operating melting temperature and improves conductivity."
        },

        {
            type: "mcq",
            question: "Which metal protects iron through cathodic protection?",
            options: [
                "Copper",
                "Silver",
                "Gold",
                "Magnesium"
            ],
            correct: 3,
            explanation: "Magnesium acts as the sacrificial anode and protects iron."
        },

        // CHEMICAL EQUATION COMPLETION

        {
            type: "equation",
            question: "Complete the calcination reaction.",
            equation: "ZnCO₃ → ______ + CO₂",
            answers: ["ZnO"],
            explanation: "ZnCO₃ → ZnO + CO₂"
        },

        {
            type: "equation",
            question: "Complete the roasting reaction.",
            equation: "2ZnS + 3O₂ → 2ZnO + ______",
            answers: ["2SO2", "2SO₂"],
            explanation: "2ZnS + 3O₂ → 2ZnO + 2SO₂"
        },

        {
            type: "equation",
            question: "Complete the reduction of iron oxide.",
            equation: "Fe₂O₃ + 3CO → 2Fe + ______",
            answers: ["3CO2", "3CO₂"],
            explanation: "Fe₂O₃ + 3CO → 2Fe + 3CO₂"
        },

        {
            type: "equation",
            question: "Identify the slag formed.",
            equation: "CaO + SiO₂ → ______",
            answers: ["CaSiO3", "CaSiO₃"],
            explanation: "Calcium silicate (CaSiO₃) is formed."
        },

        {
            type: "equation",
            question: "Complete the cathode reaction.",
            equation: "Al³⁺ + 3e⁻ → ______",
            answers: ["Al"],
            explanation: "Aluminium ions gain electrons to form aluminium metal."
        },

        {
            type: "equation",
            question: "Complete the copper refining reaction.",
            equation: "Cu²⁺ + 2e⁻ → ______",
            answers: ["Cu"],
            explanation: "Copper is deposited at the cathode."
        },

        // DESCRIPTIVE QUESTIONS

        {
            type: "descriptive",
            question: "Define an ore. Give the ore of aluminium.",
            explanation: "A mineral from which a metal can be extracted easily and economically is called an ore. Example: Bauxite."
        },

        {
            type: "descriptive",
            question: "What are the characteristics of a good ore?",
            explanation: "Abundance, high metal content, easy extraction and economical production."
        },

        {
            type: "descriptive",
            question: "Differentiate between calcination and roasting.",
            explanation: "Calcination: Heating below the melting point in limited quantities or absence of air. Roasting: Heating below the melting point in the presence of air."
        },

        {
            type: "descriptive",
            question: "Define flux. Which flux is used in copper extraction and why?",
            explanation: "Flux combines with gangue to form slag. Silica (SiO₂), an acidic flux, removes basic iron oxide impurities."
        },

        {
            type: "descriptive",
            question: "Explain the role of limestone in the extraction of iron.",
            explanation: "Limestone decomposes into calcium oxide and carbon dioxide. Calcium oxide reacts with silica to form calcium silicate slag."
        },

        {
            type: "descriptive",
            question: "Why is electricity used for the extraction of aluminium?",
            explanation: "Aluminium is highly reactive. Its oxide cannot be reduced economically using common chemical reducing agents such as carbon."
        },

        {
            type: "descriptive",
            question: "What is cathodic protection?",
            explanation: "A method of preventing corrosion by making the metal to be protected the cathode of an electrochemical cell."
        },

        {
            type: "descriptive",
            question: "Why are magnesium or zinc blocks attached to ship hulls?",
            explanation: "Magnesium or zinc acts as a sacrificial anode and corrodes preferentially, protecting the iron hull."
        },

        {
            type: "descriptive",
            question: "What is the likely extraction method for gallium? Write the cathode reaction during electrolysis of GaCl₃.",
            explanation: "Expected textbook answer: Electrolysis. Cathode: Ga³⁺ + 3e⁻ → Ga. Outermost subshell configuration: 4s² 4p¹."
        }

    ];

    // QUIZ STATE

    let current = 0;
    let score = 0;
    let attempted = 0;
    let answered = false;

    const escapeHTML = value =>
        String(value).replace(/[&<>"']/g, ch => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[ch]);

    // RENDER QUESTION

    function render() {

        const q = questions[current];

        return `

            <div id="quizPanel"
                 style="width:100%;max-width:850px">

                <div class="eyebrow">
                    CHAPTER ASSESSMENT
                </div>

                <div style="
                    display:flex;
                    justify-content:space-between;
                    color:#94a3b8;
                    margin-bottom:20px">

                    <span>
                        Question ${current + 1}
                        / ${questions.length}
                    </span>

                    <span>
                        Score: ${score} / ${attempted}
                    </span>

                </div>

                <div style="
                    height:7px;
                    background:#334155;
                    border-radius:10px;
                    margin-bottom:25px">

                    <div style="
                        height:100%;
                        width:${(current+1)/questions.length*100}%;
                        background:#38bdf8;
                        border-radius:10px">
                    </div>

                </div>

                <h2 style="font-size:clamp(20px,3vw,36px)">
                    ${escapeHTML(q.question)}
                </h2>

                ${renderAnswerArea(q)}

                <div id="quizFeedback"
                     style="display:none;
                            margin-top:20px;
                            padding:18px;
                            border-radius:12px;
                            background:#17283d"
                     aria-live="polite">
                </div>

                <div style="
                    display:flex;
                    justify-content:center;
                    flex-wrap:wrap;
                    gap:10px;
                    margin-top:20px">

                    <button onclick="MetalsQuiz.previous()">
                        ← Previous
                    </button>

                    <button onclick="MetalsQuiz.reveal()">
                        Reveal Answer
                    </button>

                    <button onclick="MetalsQuiz.restart()">
                        Restart
                    </button>

                    <button onclick="MetalsQuiz.next()">
                        Next Question →
                    </button>

                </div>

            </div>
        `;
    }

    // ANSWER AREA

    function renderAnswerArea(q) {

        if (q.type === "mcq") {

            return `

                <div style="
                    display:grid;
                    grid-template-columns:
                    repeat(auto-fit,minmax(200px,1fr));
                    gap:12px;
                    margin-top:20px">

                    ${q.options.map((option, i) => `

                        <button
                            class="quiz-option"
                            onclick="MetalsQuiz.check(${i})"
                            style="
                                min-height:65px;
                                font-size:18px;
                                text-align:left;
                                padding:15px">

                            ${String.fromCharCode(65+i)}.
                            ${escapeHTML(option)}

                        </button>

                    `).join("")}

                </div>
            `;
        }

        if (q.type === "equation") {

            return `

                <div class="definition"
                     style="font-size:clamp(22px,4vw,40px)">

                    ${escapeHTML(q.equation)}

                </div>

                <input id="quizAnswer"
                       placeholder="Type the missing product"
                       autocomplete="off"
                       style="
                           padding:15px;
                           width:90%;
                           max-width:450px;
                           background:#111d2e;
                           color:white;
                           border:2px solid #38bdf8;
                           border-radius:8px;
                           font-size:20px">

                <button onclick="MetalsQuiz.checkEquation()"
                        style="margin-top:12px">
                    Check Answer
                </button>
            `;
        }

        return `

            <div style="
                border:2px dashed #475569;
                border-radius:15px;
                min-height:150px;
                padding:20px;
                margin-top:20px">

                <p style="color:#94a3b8;font-size:18px">
                    Discuss the answer with students.
                    Use the Pen tool to write here.
                </p>

            </div>
        `;
    }

    // STORE QUESTION RESULTS

    const results = new Map();

    function record(correct) {

        if (results.has(current)) return;

        results.set(current, correct);

        attempted++;

        if (correct) score++;
    }

    // FEEDBACK

    function feedback(message, correct = null) {

        const element =
            document.getElementById("quizFeedback");

        if (!element) return;

        element.style.display = "block";

        element.style.color =
            correct === true ? "#4ade80" :
            correct === false ? "#f87171" :
            "#e2e8f0";

        element.textContent = message;

        element.style.fontSize = "20px";
        element.style.lineHeight = "1.6";
    }

    // CHECK MULTIPLE CHOICE

    function check(index) {

        const q = questions[current];

        if (q.type !== "mcq" || answered) return;

        answered = true;

        const correct = index === q.correct;

        record(correct);

        document.querySelectorAll(".quiz-option")
            .forEach((button, i) => {

                button.disabled = true;

                if (i === q.correct) {

                    button.style.background = "#14532d";
                    button.style.borderColor = "#4ade80";

                } else if (i === index) {

                    button.style.background = "#7f1d1d";
                    button.style.borderColor = "#f87171";

                }
            });

        feedback(
            (correct ? "✓ Correct! " : "✗ Incorrect. ")
            + q.explanation,
            correct
        );
    }

    // NORMALISE CHEMICAL FORMULAE

    function normalise(value) {

        const subscripts = "₀₁₂₃₄₅₆₇₈₉";

        return String(value)
            .trim()
            .replace(/[₀-₉]/g,
                char => subscripts.indexOf(char))
            .replace(/\s+/g, "");
    }

    // CHECK EQUATION

    function checkEquation() {

        if (answered) return;

        const q = questions[current];

        const input =
            document.getElementById("quizAnswer");

        if (!input || q.type !== "equation") return;

        const value = normalise(input.value);

        if (!value) {

            feedback("Enter an answer first.");

            return;
        }

        const correct = q.answers.some(
            answer => normalise(answer) === value
        );

        answered = true;

        input.disabled = true;

        record(correct);

        feedback(
            (correct ? "✓ Correct! " : "✗ Incorrect. ")
            + q.explanation,
            correct
        );
    }

    // TEACHER-CONTROLLED ANSWER REVEAL

    function reveal() {

        const q = questions[current];

        answered = true;

        document.querySelectorAll(".quiz-option")
            .forEach((button, i) => {

                button.disabled = true;

                if (i === q.correct) {
                    button.style.background = "#14532d";
                    button.style.borderColor = "#4ade80";
                }
            });

        const input =
            document.getElementById("quizAnswer");

        if (input) input.disabled = true;

        feedback("Answer: " + q.explanation);
    }

    // QUESTION NAVIGATION

    function refresh() {

        answered = results.has(current);

        const scene =
            document.getElementById("scene");

        scene.innerHTML = render();

        if (typeof clearInk === "function") {
            clearInk();
        }

        if (typeof setTool === "function") {
            setTool("pointer");
        }

        if (answered) {
            reveal();
        }
    }

    function next() {

        if (current < questions.length - 1) {

            current++;

            refresh();

        } else {

            showResults();
        }
    }

    function previous() {

        if (current > 0) {

            current--;

            refresh();
        }
    }

    // FINAL RESULT

    function showResults() {

        const percentage = attempted
            ? Math.round(score / attempted * 100)
            : 0;

        document.getElementById("scene").innerHTML = `

            <div class="eyebrow">
                ASSESSMENT COMPLETED
            </div>

            <h1 style="color:#38bdf8">
                ${percentage}%
            </h1>

            <div class="definition">

                Correct answers: ${score}<br>

                Incorrect answers: ${attempted-score}<br>

                Scored questions attempted: ${attempted}<br>

                Total scored questions:
                ${questions.filter(q =>
                    q.type !== "descriptive").length}

            </div>

            <button onclick="MetalsQuiz.restart()">
                Try Again
            </button>

        `;
    }

    // RESTART QUIZ

    function restart() {

        current = 0;
        score = 0;
        attempted = 0;
        answered = false;

        results.clear();

        refresh();
    }

    return {

        render,
        restart,
        check,
        checkEquation,
        reveal,
        next,
        previous

    };

})();
