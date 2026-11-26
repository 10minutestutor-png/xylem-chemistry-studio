
/* XYLEM CHEMISTRY STUDIO V2.0
   INTERACTIVE ANIMATION ENGINE
*/

const MetalsAnimations = (() => {

    const frame = (content) => `
        <svg viewBox="0 0 800 340"
             xmlns="http://www.w3.org/2000/svg"
             style="width:100%;max-width:850px;
                    max-height:340px;flex-shrink:0">

            <defs>
                <linearGradient id="steel">
                    <stop stop-color="#475569"/>
                    <stop offset=".5" stop-color="#e2e8f0"/>
                    <stop offset="1" stop-color="#475569"/>
                </linearGradient>

                <linearGradient id="water"
                    x2="0" y2="1">
                    <stop stop-color="#38bdf8"
                          stop-opacity=".4"/>
                    <stop offset="1"
                          stop-color="#0369a1"/>
                </linearGradient>

                <linearGradient id="heat"
                    x2="0" y2="1">
                    <stop stop-color="#facc15"/>
                    <stop offset="1" stop-color="#dc2626"/>
                </linearGradient>

                <radialGradient id="planet">
                    <stop stop-color="#60a5fa"/>
                    <stop offset=".7" stop-color="#0369a1"/>
                    <stop offset="1" stop-color="#082f49"/>
                </radialGradient>
            </defs>

            ${content}
        </svg>
    `;

    function label(x, y, value, color = "#ffffff", size = 18) {

        return `
            <text x="${x}" y="${y}"
                  fill="${color}"
                  font-size="${size}"
                  font-family="Segoe UI,Arial"
                  text-anchor="middle">
                ${value}
            </text>
        `;
    }

    function particle(x, y, color, dx, dy, delay = 0, radius = 6) {

        return `
            <circle cx="${x}" cy="${y}"
                    r="${radius}" fill="${color}">

                <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="0 0;${dx} ${dy}"
                    dur="3s"
                    begin="${delay}s"
                    repeatCount="indefinite"/>

            </circle>
        `;
    }

    function particles(count, x, y, color, dx, dy) {

        return Array.from({length: count}, (_, i) =>

            particle(
                x + (i % 5) * 22,
                y + Math.floor(i / 5) * 14,
                color,
                dx,
                dy,
                i * 0.18
            )

        ).join("");
    }

    // ======================================
    // EARTH AND MINERAL DEPOSITS
    // ======================================

    function earth() {

        return frame(`

            <circle cx="210" cy="155" r="125"
                    fill="url(#planet)"
                    stroke="#38bdf8"
                    stroke-width="3"/>

            <clipPath id="earthClip">
                <circle cx="210" cy="155" r="123"/>
            </clipPath>

            <g clip-path="url(#earthClip)">

                <g fill="#65a765">

                    <path d="M95 65 L150 40 L205 80
                        L175 120 L120 140 L90 100Z"/>

                    <path d="M160 145 L210 135 L240 185
                        L205 255 L180 230Z"/>

                    <path d="M240 65 L300 50 L350 90
                        L310 140 L255 115Z"/>

                    <path d="M250 145 L290 150 L305 200
                        L270 235 L245 185Z"/>

                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="-35 0;35 0;-35 0"
                        dur="12s"
                        repeatCount="indefinite"/>

                </g>
            </g>

            ${label(210, 315, "Earth")}

            <path d="M330 130 L420 70
                     M330 190 L420 260"
                  stroke="#38bdf8"
                  stroke-width="2"
                  stroke-dasharray="7 5"/>

            <rect x="420" y="70"
                  width="340" height="190"
                  rx="12" fill="#795438"/>

            <path d="M420 85 Q500 40 580 85
                     T760 85 V70 H420Z"
                  fill="#65a30d"/>

            <path d="M420 125 Q500 155 580 125
                     T760 125"
                  stroke="#b08968"
                  stroke-width="25" fill="none"/>

            <path d="M420 205 Q500 175 580 205
                     T760 205"
                  stroke="#4a3024"
                  stroke-width="35" fill="none"/>

            ${particles(10, 470, 145,
                "#facc15", 0, 0)}

            ${particles(8, 600, 195,
                "#cbd5e1", 0, 0)}

            ${label(590, 40, "Earth's crust")}
            ${label(590, 295, "Mineral deposits", "#facc15")}

        `);
    }

    // ======================================
    // HYDRAULIC WASHING
    // ======================================

    function hydraulic() {

        return frame(`

            <path d="M100 80 L160 260 H640 L700 80"
                  fill="#17283d"
                  stroke="#94a3b8"
                  stroke-width="5"/>

            <path d="M120 135 H680 L640 260 H160Z"
                  fill="url(#water)"/>

            ${label(190, 40, "Powdered ore")}
            ${label(610, 40, "Flowing water", "#38bdf8")}

            ${particles(15, 150, 75,
                "#d6b98c", 480, 55)}

            ${particles(15, 180, 90,
                "#64748b", 140, 145)}

            ${particles(12, 550, 145,
                "#38bdf8", -350, 0)}

            <rect x="250" y="240"
                  width="300" height="20"
                  rx="8" fill="#64748b"/>

            ${label(400, 300, "Dense ore settles")}
            ${label(640, 115, "Gangue", "#facc15")}

        `);
    }

    // ======================================
    // FROTH FLOATATION
    // ======================================

    function froth() {

        return frame(`

            <rect x="180" y="90"
                  width="440" height="205"
                  rx="12"
                  fill="#17283d"
                  stroke="#94a3b8"
                  stroke-width="4"/>

            <rect x="185" y="145"
                  width="430" height="145"
                  fill="url(#water)"/>

            <rect x="390" y="20"
                  width="20" height="210"
                  fill="url(#steel)"/>

            <rect x="335" y="215"
                  width="130" height="15"
                  rx="7" fill="#cbd5e1">

                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 400 222"
                    to="360 400 222"
                    dur="2s"
                    repeatCount="indefinite"/>

            </rect>

            ${particles(20, 230, 260,
                "#e0f2fe", 0, -145)}

            ${particles(15, 430, 245,
                "#facc15", 0, -125)}

            ${particles(12, 230, 240,
                "#64748b", 0, 35)}

            ${Array.from({length: 15}, (_, i) => `
                <circle cx="${200 + i * 28}"
                        cy="130"
                        r="17"
                        fill="#e0f2fe"
                        fill-opacity=".8"/>
            `).join("")}

            ${label(400, 65, "Ore-rich froth")}
            ${label(100, 200, "Air", "#38bdf8")}
            ${label(400, 330, "Water + Pine oil + Ore")}

        `);
    }

    // ======================================
    // MAGNETIC SEPARATION
    // ======================================

    function magnetic() {

        return frame(`

            <rect x="100" y="80"
                  width="520" height="30"
                  rx="15" fill="#475569"/>

            <circle cx="130" cy="95" r="30"
                    fill="url(#steel)"/>

            <circle cx="590" cy="95" r="40"
                    fill="#dc2626"
                    stroke="#cbd5e1"
                    stroke-width="4"/>

            ${label(590, 102, "N S")}
            ${label(590, 35, "Magnetic roller")}

            ${particles(12, 120, 60,
                "#facc15", 420, 0)}

            ${particles(12, 150, 65,
                "#64748b", 400, 0)}

            ${particles(10, 590, 120,
                "#64748b", -85, 140)}

            ${particles(10, 630, 110,
                "#facc15", 65, 150)}

            <path d="M380 240 L400 300
                     H550 L570 240Z"
                  fill="#334155"
                  stroke="#94a3b8"/>

            <path d="M590 240 L610 300
                     H750 L770 240Z"
                  fill="#334155"
                  stroke="#94a3b8"/>

            ${label(475, 330, "Magnetic")}
            ${label(680, 330, "Non-magnetic")}

        `);
    }

    // ======================================
    // LEACHING
    // ======================================

    function leaching() {

        return frame(`

            <path d="M80 65 V240
                     Q80 260 100 260
                     H260 Q280 260 280 240 V65"
                  fill="#17283d"
                  stroke="#cbd5e1"
                  stroke-width="4"/>

            <rect x="85" y="130"
                  width="190" height="125"
                  fill="url(#water)"/>

            ${particles(15, 100, 90,
                "#facc15", 20, 110)}

            ${label(180, 40, "Ore + Solvent")}

            <path d="M300 155 H380"
                  stroke="#38bdf8"
                  stroke-width="5"/>

            ${label(340, 140, "→", "#38bdf8", 40)}

            <path d="M380 80 H560 L485 200
                     V245 H455 V200Z"
                  fill="#cbd5e1"
                  fill-opacity=".2"
                  stroke="#cbd5e1"
                  stroke-width="3"/>

            <path d="M400 115 H540 L470 190Z"
                  fill="#795438"/>

            ${particles(8, 465, 200,
                "#38bdf8", 0, 70)}

            ${label(470, 50, "Filtration")}
            ${label(470, 105, "Gangue")}

            <path d="M410 245 V315 H530 V245"
                  fill="#0369a1"
                  fill-opacity=".5"
                  stroke="#cbd5e1"
                  stroke-width="3"/>

            ${label(660, 270, "Ore solution", "#38bdf8")}

        `);
    }

    // ======================================
    // HEATING: CALCINATION AND ROASTING
    // ======================================

    function heating(roasting = false) {

        return frame(`

            <rect x="180" y="90"
                  width="440" height="180"
                  rx="20"
                  fill="#334155"
                  stroke="#94a3b8"
                  stroke-width="4"/>

            <rect x="205" y="115"
                  width="390" height="130"
                  rx="12" fill="#451a03"/>

            <path d="M260 215 H540 L520 245 H280Z"
                  fill="#64748b"/>

            ${particles(20, 310, 200,
                "#facc15", 0, -20)}

            ${particles(12, 320, 180,
                "#e2e8f0", 0, -140)}

            ${Array.from({length: 6}, (_, i) => `
                <path d="M${240+i*60} 300
                    q-20 -30 0 -55
                    q25 30 0 55"
                    fill="url(#heat)">
                    <animate attributeName="opacity"
                        values=".5;1;.5"
                        dur="1s"
                        repeatCount="indefinite"/>
                </path>
            `).join("")}

            ${roasting ? particles(
                12, 35, 145, "#38bdf8", 220, 0
            ) : ""}

            ${label(400, 35,
                roasting ? "SO₂ gas" : "CO₂ gas")}

            ${label(400, 335,
                roasting
                ? "Heating in presence of air"
                : "Heating with limited or no air")}

            ${label(400, 155,
                roasting ? "Sulphide ore" : "Carbonate ore")}

        `);
    }

    // ======================================
    // BLAST FURNACE
    // ======================================

    function blastFurnace() {

        return frame(`

            <path d="M340 30 H460
                     L480 95 L550 180
                     L510 270 V310
                     H290 V270 L250 180
                     L320 95Z"
                  fill="url(#steel)"
                  stroke="#94a3b8"
                  stroke-width="4"/>

            <path d="M355 45 H445
                     L465 110 L520 180
                     L480 270 H320
                     L280 180 L335 110Z"
                  fill="#451a03"/>

            ${particles(18, 350, 45,
                "#64748b", 0, 170)}

            ${particles(18, 350, 250,
                "#facc15", 0, -175)}

            <rect x="300" y="280"
                  width="200" height="25"
                  fill="#f97316"/>

            <rect x="300" y="260"
                  width="200" height="20"
                  fill="#d6b98c"/>

            <path d="M80 225 H290
                     M720 225 H510"
                  stroke="#ef4444"
                  stroke-width="12"/>

            ${particles(10, 80, 210,
                "#f97316", 200, 0)}

            ${particles(10, 650, 210,
                "#f97316", -150, 0)}

            <path d="M500 270 H650"
                  stroke="#d6b98c"
                  stroke-width="12"/>

            <path d="M300 295 H150"
                  stroke="#f97316"
                  stroke-width="12"/>

            ${label(400, 20, "Charge")}
            ${label(150, 195, "Hot air", "#f97316")}
            ${label(650, 195, "Hot air", "#f97316")}
            ${label(680, 270, "Slag")}
            ${label(100, 325, "Molten iron", "#f97316")}
            ${label(400, 150, "Reduction")}

        `);
    }

    // ======================================
    // ELECTROLYTIC REFINING
    // ======================================

    function electrolysis(copper = false) {

        const metal = copper ? "Cu" : "M";

        return frame(`

            <rect x="320" y="15"
                  width="160" height="45"
                  rx="8" fill="#334155"
                  stroke="#94a3b8"/>

            ${label(400, 44, "DC Supply")}

            <path d="M320 35 H210 V100
                     M480 35 H590 V100"
                  fill="none"
                  stroke="#cbd5e1"
                  stroke-width="4"/>

            <rect x="150" y="110"
                  width="500" height="180"
                  rx="12"
                  fill="#17283d"
                  stroke="#94a3b8"
                  stroke-width="4"/>

            <rect x="155" y="160"
                  width="490" height="125"
                  fill="url(#water)"/>

            <rect x="190" y="90"
                  width="45" height="160"
                  fill="#b87333"/>

            <rect x="580" y="90"
                  width="18" height="160"
                  fill="#e6a064">

                <animate attributeName="width"
                    values="18;40"
                    dur="6s"
                    repeatCount="indefinite"/>

            </rect>

            ${particles(15, 240, 175,
                "#facc15", 310, 0)}

            ${label(210, 80, "Anode (+)")}
            ${label(590, 80, "Cathode (−)")}
            ${label(400, 145,
                metal + " ions", "#facc15")}

            ${label(400, 320,
                copper ? "Acidified copper sulphate"
                       : "Metal salt solution")}

        `);
    }

    // ======================================
    // HALL–HEROULT PROCESS
    // ======================================

    function aluminium() {

        return frame(`

            <rect x="130" y="95"
                  width="540" height="205"
                  rx="12"
                  fill="#475569"
                  stroke="#94a3b8"
                  stroke-width="4"/>

            <rect x="150" y="115"
                  width="500" height="165"
                  fill="#111827"/>

            <rect x="165" y="150"
                  width="470" height="115"
                  fill="#b45309"/>

            <rect x="165" y="245"
                  width="470" height="25"
                  fill="#cbd5e1"/>

            ${[250, 380, 510].map(x => `
                <rect x="${x}" y="40"
                      width="45" height="165"
                      fill="#334155"
                      stroke="#64748b"/>
            `).join("")}

            ${particles(18, 240, 170,
                "#e2e8f0", 0, 75)}

            ${particles(15, 280, 150,
                "#facc15", 0, -115)}

            ${label(400, 25, "Carbon anodes (+)")}
            ${label(400, 225, "Alumina + Molten cryolite")}
            ${label(400, 263, "Molten aluminium", "#111827")}
            ${label(400, 330, "Carbon lining — Cathode (−)")}

        `);
    }

    // ======================================
    // CORROSION AND CATHODIC PROTECTION
    // ======================================

    function corrosion() {

        return frame(`

            ${[220, 580].map((x, i) => `

                <path d="M${x-85} 60
                         V250 Q${x} 330 ${x+85} 250
                         V60"
                      fill="#17283d"
                      stroke="#cbd5e1"
                      stroke-width="4"/>

                <path d="M${x-80} 130
                         V250 Q${x} 315 ${x+80} 250
                         V130Z"
                      fill="url(#water)"/>

                <rect x="${x-8}" y="95"
                      width="16" height="150"
                      fill="url(#steel)"/>

                ${Array.from({length: 8}, (_, j) => `
                    <ellipse cx="${x}"
                             cy="${115+j*15}"
                             rx="23" ry="7"
                             fill="none"
                             stroke="${i===0
                                 ? "#b87333"
                                 : "#cbd5e1"}"
                             stroke-width="5"/>
                `).join("")}

                ${i===0 ? `
                    <rect x="${x-10}" y="155"
                          width="20" height="90"
                          fill="#b45309">

                        <animate attributeName="opacity"
                            values="0;1"
                            dur="6s"
                            fill="freeze"/>

                    </rect>
                ` : ""}

                ${label(x, 35,
                    i===0 ? "Iron + Copper"
                          : "Iron + Magnesium")}

                ${label(x, 330,
                    i===0 ? "Iron corrodes"
                          : "Iron is protected",
                    i===0 ? "#f87171" : "#4ade80")}

            `).join("")}

        `);
    }

    // ======================================
    // GENERAL PROCESS FLOW
    // ======================================

    function flowchart(points) {

        const steps = points.slice(0, 5);
        const width = 700 / steps.length;

        return frame(`

            ${steps.map((point, i) => `

                <rect x="${50+i*width}"
                      y="105"
                      width="${width-15}"
                      height="120"
                      rx="12"
                      fill="#17283d"
                      stroke="#38bdf8"
                      stroke-width="2">

                    <animate attributeName="opacity"
                        values=".3;1"
                        dur=".8s"
                        begin="${i*.5}s"
                        fill="freeze"/>

                </rect>

                ${label(
                    50+i*width+(width-15)/2,
                    170,
                    "Step " + (i+1),
                    "#38bdf8",
                    20
                )}

                ${i < steps.length-1
                    ? label(
                        50+(i+1)*width-7,
                        170,
                        "→",
                        "#ffffff",
                        24
                    )
                    : ""}

            `).join("")}

        `);
    }

    // ======================================
    // ANIMATION SELECTOR
    // ======================================

    function render(topic) {

        switch(topic.type) {

            case "earth":
                return earth();

            case "hydraulic":
                return hydraulic();

            case "froth":
                return froth();

            case "magnetic":
                return magnetic();

            case "leaching":
            case "bauxite":
                return leaching();

            case "heating":
                return heating(
                    topic.title === "Roasting"
                );

            case "blastFurnace":
            case "slag":
                return blastFurnace();

            case "electrolysis":
                return electrolysis(false);

            case "copperRefining":
                return electrolysis(true);

            case "aluminium":
                return aluminium();

            case "corrosion":
            case "protection":
                return corrosion();

            case "flowchart":
            case "reduction":
            case "liquation":
            case "distillation":
            case "zinc":
            case "copper":
                return flowchart(topic.points || []);

            default:
                return "";
        }
    }

    // ======================================
    // PLAY, PAUSE AND RESET
    // ======================================

    function pause() {

        document.querySelectorAll("#scene svg")
            .forEach(svg => svg.pauseAnimations?.());
    }

    function play() {

        document.querySelectorAll("#scene svg")
            .forEach(svg => svg.unpauseAnimations?.());
    }

    function reset() {

        document.querySelectorAll("#scene svg")
            .forEach(svg => {

                svg.setCurrentTime?.(0);
                svg.unpauseAnimations?.();

            });
    }

    return {
        render,
        play,
        pause,
        reset
    };

})();
