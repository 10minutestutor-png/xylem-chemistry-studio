
/* ==========================================
   XYLEM NADAPURAM CHEMISTRY STUDIO
   CHAPTER 05 - ELECTROCHEMISTRY
   INTERACTIVE ANIMATION ENGINE
========================================== */

const MetalsAnimations = (() => {

    const frame = content => `
        <svg viewBox="0 0 800 340"
             xmlns="http://www.w3.org/2000/svg"
             style="width:100%;max-width:900px;
             max-height:340px;flex-shrink:0">

            <defs>
                <linearGradient id="zinc">
                    <stop stop-color="#64748b"/>
                    <stop offset=".5" stop-color="#e2e8f0"/>
                    <stop offset="1" stop-color="#64748b"/>
                </linearGradient>

                <linearGradient id="copper">
                    <stop stop-color="#92400e"/>
                    <stop offset=".5" stop-color="#fdba74"/>
                    <stop offset="1" stop-color="#b45309"/>
                </linearGradient>

                <linearGradient id="solution"
                    x1="0" y1="0" x2="0" y2="1">
                    <stop stop-color="#38bdf8"
                          stop-opacity=".45"/>
                    <stop offset="1"
                          stop-color="#0369a1"
                          stop-opacity=".85"/>
                </linearGradient>

                <radialGradient id="glow">
                    <stop stop-color="#fef9c3"/>
                    <stop offset=".4" stop-color="#facc15"/>
                    <stop offset="1" stop-color="#facc15"
                          stop-opacity="0"/>
                </radialGradient>

                <marker id="arrow"
                    markerWidth="8" markerHeight="8"
                    refX="6" refY="3" orient="auto">
                    <path d="M0 0 L6 3 L0 6Z"
                          fill="#38bdf8"/>
                </marker>
            </defs>

            ${content}

        </svg>
    `;

    function label(x,y,text,color="#e2e8f0",size=16) {

        return `
            <text x="${x}" y="${y}"
                  fill="${color}"
                  font-size="${size}"
                  font-family="Segoe UI,Arial"
                  text-anchor="middle">
                ${text}
            </text>
        `;
    }

    function movingParticle(
        path, color, text="", delay=0, duration=4
    ) {

        return `
            <g>
                <circle r="10" fill="${color}"/>
                ${label(0,4,text,"#081426",10)}
                <animateMotion
                    path="${path}"
                    dur="${duration}s"
                    begin="${delay}s"
                    repeatCount="indefinite"/>
            </g>
        `;
    }

    function stream(path,color,text,count=5,duration=4) {

        return Array.from({length:count},(_,i)=>
            movingParticle(
                path,color,text,
                -i*duration/count,duration
            )
        ).join("");
    }

    function beaker(x,y,w,h,color) {

        return `
            <rect x="${x+5}" y="${y+45}"
                  width="${w-10}" height="${h-50}"
                  rx="5" fill="${color}"/>

            <path d="M${x} ${y}
                     V${y+h-12}
                     Q${x} ${y+h} ${x+12} ${y+h}
                     H${x+w-12}
                     Q${x+w} ${y+h} ${x+w} ${y+h-12}
                     V${y}"
                  fill="none"
                  stroke="#bae6fd"
                  stroke-width="3"/>

            <path d="M${x+10} ${y+15}
                     V${y+h-15}"
                  stroke="#ffffff"
                  stroke-opacity=".25"
                  stroke-width="5"/>

            ${Array.from({length:4},(_,i)=>`
                <path d="M${x+w-25} ${y+30+i*24}
                         h15"
                      stroke="#bae6fd"
                      stroke-opacity=".5"/>
            `).join("")}
        `;
    }

    function electrode(x,y,w,h,color) {

        return `
            <rect x="${x}" y="${y}"
                  width="${w}" height="${h}"
                  rx="3" fill="${color}"
                  stroke="#94a3b8"/>
        `;
    }

    function battery(x,y) {

        return `
            <rect x="${x}" y="${y}"
                  width="100" height="40"
                  rx="7" fill="#334155"
                  stroke="#94a3b8"/>

            ${label(x+50,y+25,"DC SOURCE","#fff",13)}
            ${label(x+12,y-7,"−","#38bdf8",20)}
            ${label(x+88,y-7,"+","#f87171",20)}
        `;
    }

    // ======================================
    // GALVANIC CELL
    // ======================================

    function galvanic(
        mode="bulb",
        anode="Zn",
        cathode="Cu",
        voltage="1.10 V"
    ) {

        const copperAnode = anode === "Cu";
        const copperCathode = cathode === "Cu";

        let instrument = "";

        if(mode==="bulb") {

            instrument = `
                <circle cx="400" cy="48" r="42"
                        fill="url(#glow)">
                    <animate attributeName="opacity"
                        values=".6;1;.6"
                        dur="2s"
                        repeatCount="indefinite"/>
                </circle>

                <circle cx="400" cy="48" r="20"
                        fill="#fef08a"
                        stroke="#facc15"
                        stroke-width="3"/>

                ${label(400,53,"×","#92400e",23)}
            `;

        } else {

            instrument = `
                <rect x="340" y="15"
                      width="120" height="65"
                      rx="10" fill="#e2e8f0"
                      stroke="#64748b"/>

                ${label(400,36,
                    mode==="meter"?"VOLTMETER":"GALVANOMETER",
                    "#334155",11)}

                ${mode==="meter"
                    ? label(400,63,voltage,"#047857",22)
                    : `
                        <path d="M365 65 Q400 15 435 65"
                              fill="none" stroke="#64748b"/>

                        <line x1="400" y1="67"
                              x2="400" y2="43"
                              stroke="#dc2626"
                              stroke-width="3">
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                values="0 400 67;
                                        30 400 67"
                                dur="1.5s"
                                fill="freeze"/>
                        </line>
                    `}
            `;
        }

        return frame(`

            ${beaker(65,145,260,145,
                copperAnode
                ?"url(#solution)"
                :"#94a3b855")}

            ${beaker(475,145,260,145,
                copperCathode
                ?"url(#solution)"
                :"#94a3b855")}

            <path d="M275 230 V135
                     Q275 100 310 100
                     H490
                     Q525 100 525 135
                     V230"
                  fill="none"
                  stroke="#cbd5e1"
                  stroke-width="26"
                  stroke-linecap="round"/>

            <path d="M275 230 V135
                     Q275 100 310 100
                     H490
                     Q525 100 525 135
                     V230"
                  fill="none"
                  stroke="#a5f3fc"
                  stroke-width="17"
                  stroke-linecap="round"/>

            ${label(400,93,"Salt bridge","#a5f3fc",14)}

            ${electrode(140,120,34,140,
                copperAnode
                ?"url(#copper)"
                :"url(#zinc)")}

            ${electrode(625,120,34,140,
                copperCathode
                ?"url(#copper)"
                :"url(#zinc)")}

            <path d="M157 120 V48 H340
                     M460 48 H642 V120"
                  fill="none"
                  stroke="#94a3b8"
                  stroke-width="5"/>

            ${instrument}

            ${stream(
                "M157 120 V48 H330",
                "#facc15","e⁻",4,3
            )}

            ${stream(
                "M470 48 H642 V120",
                "#facc15","e⁻",4,3
            )}

            ${stream(
                "M390 100 H310 Q275 100 275 135 V230",
                "#67e8f9","−",3,5
            )}

            ${stream(
                "M410 100 H490 Q525 100 525 135 V230",
                "#fda4af","+",3,5
            )}

            ${stream(
                "M175 210 L235 245",
                "#cbd5e1","+",3,4
            )}

            ${stream(
                "M565 245 L625 210",
                "#fb923c","+",3,4
            )}

            ${label(157,111,anode+" (−)","#facc15",17)}
            ${label(642,111,cathode+" (+)","#facc15",17)}

            ${label(195,312,
                anode+" salt solution","#cbd5e1")}

            ${label(605,312,
                cathode+" salt solution","#7dd3fc")}

            ${label(195,334,"ANODE · Oxidation","#f87171",14)}
            ${label(605,334,"CATHODE · Reduction","#4ade80",14)}
        `);
    }

    // ======================================
    // METAL DISPLACEMENT
    // ======================================

    function displacement(metal="Zn",ion="Cu") {

        const silver = ion==="Ag";
        const deposit = silver?"#e2e8f0":"#c87533";

        return frame(`

            ${beaker(240,65,320,225,
                silver?"#cbd5e133":"url(#solution)")}

            <rect x="245" y="110"
                  width="310" height="175"
                  rx="5"
                  fill="${silver?"#0284c7":"#cbd5e1"}"
                  opacity="0">
                <animate attributeName="opacity"
                    values="0;.8"
                    dur="12s" fill="freeze"/>
            </rect>

            ${electrode(375,35,50,220,
                metal==="Cu"
                ?"url(#copper)"
                :"url(#zinc)")}

            ${Array.from({length:45},(_,i)=>{

                const x=376+(i*13)%48;
                const y=115+(i*19)%135;

                return `
                    <circle cx="${x}" cy="${y}"
                            r="${3+i%4}"
                            fill="${deposit}"
                            opacity="0">
                        <animate attributeName="opacity"
                            from="0" to="1"
                            begin="${i*.18}s"
                            dur="1s"
                            fill="freeze"/>
                    </circle>
                `;
            }).join("")}

            ${stream(
                "M370 170 L295 240",
                "#cbd5e1","+",4,5
            )}

            ${stream(
                "M510 235 L425 180",
                deposit,"+",4,5
            )}

            ${label(400,25,metal+" metal","#facc15",20)}

            ${label(400,312,
                silver?"Silver nitrate solution":
                       "Copper sulphate solution",
                "#7dd3fc",18)}

            ${label(135,175,"Oxidation","#f87171",18)}
            ${label(665,175,"Reduction","#4ade80",18)}

            ${label(400,335,
                ion+" deposits on "+metal,
                "#facc15",16)}
        `);
    }

    // ======================================
    // GAS BUBBLES
    // ======================================

    function bubbles(x,y,count,color="#bae6fd") {

        return Array.from({length:count},(_,i)=>`
            <circle cx="${x+(i%3-1)*9}"
                    cy="${y}"
                    r="${3+i%4}"
                    fill="${color}"
                    fill-opacity=".3"
                    stroke="${color}">
                <animate attributeName="cy"
                    from="${y}" to="120"
                    dur="${2+i%3}s"
                    begin="${-i*.4}s"
                    repeatCount="indefinite"/>
                <animate attributeName="opacity"
                    values="0;1;1;0"
                    dur="${2+i%3}s"
                    begin="${-i*.4}s"
                    repeatCount="indefinite"/>
            </circle>
        `).join("");
    }

    // ======================================
    // HYDROGEN DISPLACEMENT
    // ======================================

    function hydrogenDisplacement() {

        const metals=["Fe","Mg","Cu","Pb","Zn"];
        const rates=[6,18,0,2,11];

        return frame(`

            ${metals.map((metal,i)=>{

                const x=110+i*145;

                return `
                    <rect x="${x-35}" y="75"
                          width="70" height="210"
                          rx="35"
                          fill="#94a3b822"
                          stroke="#bae6fd"
                          stroke-width="3"/>

                    <rect x="${x-30}" y="140"
                          width="60" height="140"
                          rx="30"
                          fill="#38bdf833"/>

                    <rect x="${x-15}" y="235"
                          width="30" height="30"
                          rx="4"
                          fill="${metal==="Cu"
                              ?"#b87333":"#94a3b8"}"/>

                    ${bubbles(x,235,rates[i])}

                    ${label(x,55,metal,"#facc15",23)}

                    ${label(x,310,
                        rates[i]?"H₂ gas":"No reaction",
                        rates[i]?"#4ade80":"#f87171",14)}
                `;
            }).join("")}

            ${label(400,25,
                "Metals with dilute hydrochloric acid",
                "#e2e8f0",19)}
        `);
    }

    // ======================================
    // ELECTROLYTIC CELL
    // ======================================

    function electrolytic(mode="general") {

        const water=mode==="water";
        const molten=mode==="molten";
        const brine=mode==="brine";
        const plating=mode==="plating";

        const cathodeGas=water||brine;
        const anodeGas=water||molten||brine;

        const liquid=plating
            ?"url(#solution)"
            :molten?"#f59e0b66":"#38bdf844";

        return frame(`

            ${battery(350,20)}

            <path d="M362 60 V80 H240 V145
                     M438 60 V80 H560 V145"
                  fill="none"
                  stroke="#94a3b8"
                  stroke-width="5"/>

            ${beaker(135,115,530,175,liquid)}

            ${plating
                ? `
                    <ellipse cx="240" cy="215"
                             rx="35" ry="43"
                             fill="none"
                             stroke="#94a3b8"
                             stroke-width="13">
                        <animate attributeName="stroke"
                            values="#94a3b8;#c87533"
                            dur="12s" fill="freeze"/>
                    </ellipse>
                    <path d="M240 145 V172"
                          stroke="#94a3b8"
                          stroke-width="6"/>
                `
                : electrode(225,125,30,140,"#475569")
            }

            ${electrode(545,125,30,140,
                plating?"url(#copper)":"#475569")}

            ${stream(
                "M362 60 V80 H240 V125",
                "#facc15","e⁻",4,4
            )}

            ${stream(
                "M560 125 V80 H438 V60",
                "#facc15","e⁻",4,4
            )}

            ${stream(
                "M430 225 L260 225",
                "#fda4af",
                plating?"Cu²⁺":molten?"Na⁺":"+",
                5,5
            )}

            ${stream(
                "M370 250 L540 250",
                "#67e8f9",
                molten||brine?"Cl⁻":"−",
                5,5
            )}

            ${cathodeGas
                ?bubbles(240,235,14)
                :""
            }

            ${anodeGas
                ?bubbles(560,235,water?7:12,
                    molten||brine?"#bef264":"#bae6fd")
                :""
            }

            ${molten?`
                <rect x="222" y="230"
                      width="36" height="30"
                      rx="6" fill="#e2e8f0">
                    <animate attributeName="height"
                        from="0" to="30"
                        dur="10s" fill="freeze"/>
                </rect>
            `:""}

            ${brine?`
                <ellipse cx="255" cy="240"
                         rx="75" ry="35"
                         fill="#ec4899" opacity="0">
                    <animate attributeName="opacity"
                        from="0" to=".55"
                        dur="8s" fill="freeze"/>
                </ellipse>
            `:""}

            ${label(240,105,"CATHODE (−)","#38bdf8",15)}
            ${label(560,105,"ANODE (+)","#f87171",15)}

            ${label(240,310,
                water||brine?"Hydrogen":
                molten?"Sodium":
                plating?"Copper-coated ring":"Reduction",
                "#4ade80",16)}

            ${label(560,310,
                water?"Oxygen":
                molten||brine?"Chlorine":
                plating?"Copper plate":"Oxidation",
                "#f87171",16)}

            ${label(400,335,
                water?"Acidified water · H₂ : O₂ = 2 : 1":
                molten?"Molten sodium chloride":
                brine?"Brine · NaOH forms in solution":
                plating?"Copper sulphate solution":
                "Electrolyte",
                "#7dd3fc",15)}
        `);
    }

    // ======================================
    // ENERGY CONVERSION
    // ======================================

    function energyConversion(reverse=false) {

        return frame(`

            <rect x="40" y="90"
                  width="270" height="150"
                  rx="20" fill="#164e63"
                  stroke="#22d3ee"/>

            <rect x="490" y="90"
                  width="270" height="150"
                  rx="20" fill="#713f12"
                  stroke="#facc15"/>

            ${label(175,155,
                reverse?"Electrical":"Chemical",
                "#fff",25)}

            ${label(175,190,"Energy","#fff",23)}

            ${label(625,155,
                reverse?"Chemical":"Electrical",
                "#fff",25)}

            ${label(625,190,
                reverse?"Change":"Energy",
                "#fff",23)}

            <path d="M320 165 H480"
                  stroke="#38bdf8"
                  stroke-width="4"
                  marker-end="url(#arrow)"/>

            ${stream(
                "M330 165 H470",
                "#facc15","",4,3
            )}

            ${label(400,290,
                reverse?"Electrolytic cell":"Galvanic cell",
                "#7dd3fc",24)}
        `);
    }

    // ======================================
    // SOLID AND MOLTEN NaCl
    // ======================================

    function ionicLattice() {

        return frame(`

            <rect x="45" y="65"
                  width="320" height="220"
                  rx="15" fill="#1e293b"
                  stroke="#64748b"/>

            <rect x="435" y="65"
                  width="320" height="220"
                  rx="15" fill="#78350f55"
                  stroke="#f59e0b"/>

            ${Array.from({length:24},(_,i)=>{

                const row=Math.floor(i/6);
                const col=i%6;
                const positive=(row+col)%2===0;

                return `
                    <g>
                        <circle cx="${90+col*45}"
                                cy="${100+row*45}"
                                r="17"
                                fill="${positive
                                    ?"#fda4af":"#67e8f9"}"/>

                        ${label(90+col*45,104+row*45,
                            positive?"Na⁺":"Cl⁻",
                            "#0f172a",10)}
                    </g>
                `;
            }).join("")}

            ${Array.from({length:18},(_,i)=>{

                const x=475+(i*37)%235;
                const y=105+(i*29)%135;

                return `
                    <g>
                        <circle r="16"
                                fill="${i%2
                                    ?"#67e8f9":"#fda4af"}"/>

                        ${label(0,4,i%2?"Cl⁻":"Na⁺",
                            "#0f172a",10)}

                        <animateMotion
                            path="M${x} ${y}
                                  l${i%2?25:-25} 20
                                  l${i%2?-25:25} -20"
                            dur="${3+i%3}s"
                            repeatCount="indefinite"/>
                    </g>
                `;
            }).join("")}

            ${label(205,45,"SOLID NaCl","#7dd3fc",22)}
            ${label(595,45,"MOLTEN NaCl","#facc15",22)}

            ${label(205,315,"Fixed ions","#f87171",18)}
            ${label(595,315,"Mobile ions","#4ade80",18)}
        `);
    }

    // ======================================
    // BATTERY WORKING
    // ======================================

    function lithiumBattery(charging=false) {

        return frame(`

            <rect x="100" y="70"
                  width="600" height="215"
                  rx="20" fill="#1e293b"
                  stroke="#94a3b8" stroke-width="3"/>

            <rect x="125" y="95"
                  width="170" height="165"
                  rx="10" fill="#b45309"/>

            <rect x="505" y="95"
                  width="170" height="165"
                  rx="10" fill="#0369a1"/>

            <rect x="390" y="80"
                  width="20" height="195"
                  fill="#e2e8f0"
                  opacity=".7"/>

            ${stream(
                charging
                    ?"M530 180 H270"
                    :"M270 180 H530",
                "#a3e635","Li⁺",7,5
            )}

            <path d="M210 95 V35 H590 V95"
                  fill="none"
                  stroke="#94a3b8"
                  stroke-width="5"/>

            ${stream(
                charging
                    ?"M590 95 V35 H210 V95"
                    :"M210 95 V35 H590 V95",
                "#facc15","e⁻",6,5
            )}

            ${label(210,145,"Negative","#fff",17)}
            ${label(210,168,"Electrode","#fff",17)}

            ${label(590,145,"Positive","#fff",17)}
            ${label(590,168,"Electrode","#fff",17)}

            ${label(400,310,
                charging?"CHARGING":"DISCHARGING",
                "#4ade80",23)}
        `);
    }

    // ======================================
    // FUEL CELL
    // ======================================

    function fuelCell() {

        return frame(`

            <rect x="240" y="85"
                  width="320" height="180"
                  rx="15" fill="#164e63"
                  stroke="#67e8f9"/>

            <rect x="390" y="90"
                  width="20" height="170"
                  fill="#cbd5e1"/>

            ${electrode(265,100,25,150,"#64748b")}
            ${electrode(510,100,25,150,"#64748b")}

            <path d="M278 100 V35 H522 V100"
                  stroke="#94a3b8"
                  stroke-width="4" fill="none"/>

            ${stream(
                "M278 100 V35 H522 V100",
                "#facc15","e⁻",6,5
            )}

            ${stream(
                "M50 160 H260",
                "#bae6fd","H₂",4,4
            )}

            ${stream(
                "M750 160 H540",
                "#fda4af","O₂",4,4
            )}

            ${stream(
                "M290 190 H510",
                "#a3e635","H⁺",4,4
            )}

            ${stream(
                "M535 240 L700 290",
                "#38bdf8","H₂O",4,4
            )}

            ${label(125,135,"Hydrogen","#7dd3fc",20)}
            ${label(675,135,"Oxygen","#fda4af",20)}

            ${label(400,315,
                "2H₂ + O₂ → 2H₂O",
                "#4ade80",24)}
        `);
    }

    // ======================================
    // ANIMATION ROUTER
    // ======================================

    function render(topic) {

        switch(topic.animation || topic.type) {

            case "energyConversion":
            case "energySources":
                return energyConversion();

            case "danielConstruction":
            case "danielCell":
            case "electrodeIdentification":
            case "electronTransfer":
            case "saltBridge":
            case "danielReactions":
            case "galvanicSimulator":
                return galvanic();

            case "galvanometer":
                return galvanic("galvanometer");

            case "voltmeter":
                return galvanic("meter");

            case "zincCopper":
            case "displacementSimulator":
                return displacement("Zn","Cu");

            case "copperSilver":
                return displacement("Cu","Ag");

            case "magnesiumCopper":
            case "redoxAgents":
                return displacement("Mg","Cu");

            case "hydrogenDisplacement":
                return hydrogenDisplacement();

            case "electrolyticCell":
            case "electrolyteIons":
            case "ionMigration":
                return electrolytic();

            case "waterElectrolysis":
                return electrolytic("water");

            case "ionicLattice":
                return ionicLattice();

            case "moltenNaCl":
                return electrolytic("molten");

            case "aqueousNaCl":
                return electrolytic("brine");

            case "electroplating":
            case "platingSimulator":
                return electrolytic("plating");

            case "primaryCell":
                return energyConversion();

            case "secondaryCell":
            case "lithiumBattery":
                return lithiumBattery();

            case "fuelCell":
                return fuelCell();

            default:
                return "";
        }
    }

    // ======================================
    // ANIMATION CONTROLS
    // ======================================

    function pause() {

        document.querySelectorAll("#scene svg")
            .forEach(svg=>svg.pauseAnimations?.());
    }

    function play() {

        document.querySelectorAll("#scene svg")
            .forEach(svg=>svg.unpauseAnimations?.());
    }

    function reset() {

        document.querySelectorAll("#scene svg")
            .forEach(svg=>{

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



const GalvanicLab = (() => {

    const metals = {
        Mg: {v:-2.37, n:2, color:"#b9c6d4"},
        Al: {v:-1.66, n:3, color:"#e2e8f0"},
        Zn: {v:-0.76, n:2, color:"#94a3b8"},
        Cu: {v:0.34, n:2, color:"#c87941"},
        Ag: {v:0.80, n:1, color:"#e5e7eb"}
    };

    function ion(m) {
        return m + ({1:"⁺",2:"²⁺",3:"³⁺"}[metals[m].n]);
    }

    function diagram(left, right, connected) {

        const l = metals[left];
        const r = metals[right];

        const forward = l.v < r.v;
        const active = connected && left !== right;

        const anode = forward ? left : right;
        const cathode = forward ? right : left;

        const voltage = Math.abs(l.v-r.v).toFixed(2);

        const path = forward
            ? "M180 145 V55 H620 V145"
            : "M620 145 V55 H180 V145";

        function moving(path, text, color, count=5) {

            if (!active) return "";

            return Array.from({length:count},(_,i)=>`
                <g>
                    <circle r="10" fill="${color}"/>
                    <text y="4" text-anchor="middle"
                        font-size="12" fill="#07111f">
                        ${text}
                    </text>
                    <animateMotion
                        path="${path}"
                        dur="4s"
                        begin="${i*.8}s"
                        repeatCount="indefinite"/>
                </g>
            `).join("");
        }

        function beaker(x,m,isAnode) {

            return `
                <rect x="${x}" y="170"
                    width="240" height="112"
                    rx="8"
                    fill="${m==="Cu"?"#087db5":"#64748b"}"
                    opacity=".55"/>

                <ellipse cx="${x+120}" cy="170"
                    rx="120" ry="10"
                    fill="${m==="Cu"?"#38bdf8":"#cbd5e1"}"
                    opacity=".5"/>

                <path d="M${x} 140 V275
                    Q${x} 290 ${x+15} 290
                    H${x+225}
                    Q${x+240} 290 ${x+240} 275
                    V140"
                    fill="none"
                    stroke="#bae6fd"
                    stroke-width="3"/>

                <rect x="${x+25}" y="120"
                    width="30" height="135"
                    rx="3" fill="${metals[m].color}"
                    stroke="#e2e8f0"/>

                ${Array.from({length:10},(_,i)=>`
                    <circle
                        cx="${x+80+(i*31)%140}"
                        cy="${190+(i*19)%75}"
                        r="12"
                        fill="#bae6fd"
                        opacity=".75"/>
                    <text
                        x="${x+80+(i*31)%140}"
                        y="${194+(i*19)%75}"
                        font-size="10"
                        text-anchor="middle"
                        fill="#0f172a">${ion(m)}</text>
                `).join("")}

                <text x="${x+120}" y="315"
                    text-anchor="middle"
                    fill="#e2e8f0"
                    font-size="18">
                    ${m} | ${ion(m)}
                </text>

                <text x="${x+120}" y="338"
                    text-anchor="middle"
                    fill="${isAnode?"#fca5a5":"#86efac"}"
                    font-size="16">
                    ${left===right?"Identical half-cell":
                    isAnode?"Anode (−)":"Cathode (+)"}
                </text>
            `;
        }

        return `
        <svg viewBox="0 0 800 360"
            xmlns="http://www.w3.org/2000/svg"
            style="width:100%;max-width:850px">

            <rect width="800" height="360"
                rx="14" fill="#091525"/>

            <path d="M180 145 V55 H370
                M430 55 H620 V145"
                fill="none"
                stroke="#94a3b8"
                stroke-width="4"/>

            <path d="${connected
                ?"M370 55 H430"
                :"M370 55 L420 25"}"
                stroke="#facc15"
                stroke-width="4"/>

            <rect x="310" y="80"
                width="180" height="60"
                rx="10" fill="#1e293b"
                stroke="#64748b"/>

            <text x="400" y="100"
                fill="#94a3b8"
                font-size="12"
                text-anchor="middle">
                STANDARD CELL POTENTIAL
            </text>

            <text x="400" y="126"
                fill="#86efac"
                font-size="25"
                font-weight="bold"
                text-anchor="middle">
                ${voltage} V
            </text>

            ${beaker(140,left,forward)}
            ${beaker(580-0,right,!forward)
                .replaceAll('820','820')}

            <path d="M330 220 V160
                Q330 145 350 145
                H550
                Q570 145 570 160
                V220"
                fill="none"
                stroke="#cbd5e1"
                stroke-width="20"
                stroke-linecap="round"/>

            <path d="M330 220 V160
                Q330 145 350 145
                H550
                Q570 145 570 160
                V220"
                fill="none"
                stroke="#67e8f9"
                stroke-width="12"
                stroke-linecap="round"/>

            <text x="450" y="175"
                text-anchor="middle"
                fill="#e2e8f0"
                font-size="14">
                Salt bridge
            </text>

            ${moving(path,"e⁻","#facc15")}

            ${moving(
                forward
                ?"M450 145 H330 V220"
                :"M450 145 H570 V220",
                "−","#fda4af",3)}

            ${moving(
                forward
                ?"M450 145 H570 V220"
                :"M450 145 H330 V220",
                "+","#86efac",3)}

        </svg>
        `.replace(
            beaker(580,right,!forward),
            beaker(500,right,!forward)
                .replace('x="525" y="120"','x="605" y="120"')
        );
    }

    function simulator() {

        const options = selected =>
            Object.keys(metals).map(m=>`
                <option value="${m}"
                    ${m===selected?"selected":""}>
                    ${m}
                </option>
            `).join("");

        return `
            <div id="galvanicLab"
                data-connected="true"
                style="width:100%">

                <div style="
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    flex-wrap:wrap;
                    gap:12px;
                    margin-bottom:10px">

                    <label>
                        Left electrode
                        <select id="leftMetal"
                            onchange="GalvanicLab.update()">
                            ${options("Zn")}
                        </select>
                    </label>

                    <label>
                        Right electrode
                        <select id="rightMetal"
                            onchange="GalvanicLab.update()">
                            ${options("Cu")}
                        </select>
                    </label>

                    <button id="circuitBtn"
                        onclick="GalvanicLab.toggle()">
                        Disconnect Circuit
                    </button>

                </div>

                <div id="galvanicDiagram">
                    ${diagram("Zn","Cu",true)}
                </div>

                <div id="galvanicResult"
                    class="definition">
                    Zn → Zn²⁺ + 2e⁻
                    <br>
                    Cu²⁺ + 2e⁻ → Cu
                    <br>
                    Zn + Cu²⁺ → Zn²⁺ + Cu
                </div>

            </div>
        `;
    }

    function update() {

        const lab = document.getElementById("galvanicLab");

        if (!lab) return;

        const left = document.getElementById("leftMetal").value;
        const right = document.getElementById("rightMetal").value;

        const connected = lab.dataset.connected==="true";

        const a = metals[left].v < metals[right].v
            ? left : right;

        const c = a===left ? right : left;

        document.getElementById("galvanicDiagram").innerHTML =
            diagram(left,right,connected);

        const result = document.getElementById("galvanicResult");

        if (left===right) {

            result.textContent =
                "Identical standard half-cells: no net cell reaction.";

        } else if (!connected) {

            result.textContent =
                "Circuit disconnected. No sustained electron flow.";

        } else {

            const na = metals[a].n;
            const nc = metals[c].n;

            const gcd = (x,y) => y ? gcd(y,x%y) : x;
            const ca = nc/gcd(na,nc);
            const cc = na/gcd(na,nc);
            const k = n => n===1?"":n;

            result.innerHTML = `
                <strong>Electron flow: ${a} → ${c}</strong>
                <br>
                Oxidation: ${a} → ${ion(a)} + ${k(na)}e⁻
                <br>
                Reduction: ${ion(c)} + ${k(nc)}e⁻ → ${c}
                <br>
                Overall: ${k(ca)}${a} + ${k(cc)}${ion(c)}
                → ${k(ca)}${ion(a)} + ${k(cc)}${c}
            `;
        }

        pause();
    }

    function toggle() {

        const lab = document.getElementById("galvanicLab");

        if (!lab) return;

        const connected = lab.dataset.connected!=="true";

        lab.dataset.connected = String(connected);

        document.getElementById("circuitBtn").textContent =
            connected ? "Disconnect Circuit" : "Connect Circuit";

        update();
    }

    function render(topic) {

        switch(topic.animation) {

            case "galvanicSimulator":
                return simulator();

            case "danielConstruction":
            case "danielCell":
            case "galvanometer":
            case "voltmeter":
            case "electrodeIdentification":
            case "electronTransfer":
            case "saltBridge":
            case "danielReactions":
                return diagram("Zn","Cu",true);

            default:
                return "";
        }
    }

    function pause() {
        document.querySelectorAll("#scene svg")
            .forEach(svg=>svg.pauseAnimations?.());
    }

    function play() {
        document.querySelectorAll("#scene svg")
            .forEach(svg=>svg.unpauseAnimations?.());
    }

    function reset() {
        document.querySelectorAll("#scene svg")
            .forEach(svg=>svg.setCurrentTime?.(0));
    }

    return {
        render,
        pause,
        play,
        reset,
        update,
        toggle
    };

})();

const ElectrochemistryAnimations = {...MetalsAnimations, render(topic) { return topic.animation === "galvanicSimulator" ? GalvanicLab.render(topic) : MetalsAnimations.render(topic); }};

/* DANIEL CELL - LABEL UPGRADE */

(() => {

    const originalRender =
        ElectrochemistryAnimations.render;

    ElectrochemistryAnimations.render = function(topic) {

        let output = originalRender.call(this, topic);

        const danielScenes = [
            "danielConstruction",
            "danielCell",
            "galvanometer",
            "voltmeter",
            "electrodeIdentification",
            "electronTransfer",
            "saltBridge",
            "danielReactions"
        ];

        if (!danielScenes.includes(topic.animation)) {
            return output;
        }

        output = output
            .replaceAll(
                "Zn salt solution",
                "Zinc sulphate (ZnSO₄)"
            )
            .replaceAll(
                "Cu salt solution",
                "Copper sulphate (CuSO₄)"
            )
            .replaceAll(
                "Salt bridge",
                "KNO₃ salt bridge"
            )
            .replace(
                'x="400" y="93"',
                'x="400" y="132"'
            );

        return output;
    };

})();

/* DANIEL CELL - ELECTRODE REACTION UPGRADE */

(() => {

    const previousRender =
        ElectrochemistryAnimations.render;

    ElectrochemistryAnimations.render = function(topic) {

        let output = previousRender.call(this, topic);

        const scenes = [
            "danielCell",
            "electronTransfer",
            "saltBridge",
            "danielReactions",
            "electrodeIdentification"
        ];

        if (!scenes.includes(topic.animation)) {
            return output;
        }

        if (!output.includes("</svg>")) {
            return output;
        }

        /* Label individual ions */

        output = output
            .replaceAll(
                'fill="#081426"',
                'fill="#081426"'
            )
            .replace(
                /(<rect x="140" y="120"[\s\S]*?)\/>/,
                `$1>
                    <animate
                        attributeName="width"
                        from="34" to="22"
                        dur="20s"
                        fill="freeze"/>
                </rect>`
            );

        /* Copper deposition */

        const copperDeposit = Array.from(
            {length:24}, (_,i) => {

                const x = 625 + (i % 2) * 34;
                const y = 195 + (i * 17) % 60;

                return `
                    <circle
                        cx="${x}"
                        cy="${y}"
                        r="${2 + i % 3}"
                        fill="#fb923c"
                        stroke="#fdba74"
                        stroke-width=".5"
                        opacity="0">

                        <animate
                            attributeName="opacity"
                            from="0" to="1"
                            begin="${i * .65}s"
                            dur=".8s"
                            fill="freeze"/>

                    </circle>
                `;
            }
        ).join("");

        /* Animated chemical ions */

        function ionStream(path, text, colour) {

            return Array.from(
                {length:3}, (_,i) => `

                <g>

                    <circle r="13"
                        fill="${colour}"
                        stroke="#e2e8f0"
                        stroke-width=".5"/>

                    <text
                        y="4"
                        text-anchor="middle"
                        font-size="10"
                        font-weight="bold"
                        fill="#081426">
                        ${text}
                    </text>

                    <animateMotion
                        path="${path}"
                        dur="6s"
                        begin="${-i * 2}s"
                        repeatCount="indefinite"/>

                </g>

            `).join("");
        }

        const reactions = `

            ${copperDeposit}

            ${ionStream(
                "M175 205 Q200 220 245 250",
                "Zn²⁺",
                "#cbd5e1"
            )}

            ${ionStream(
                "M550 245 Q590 230 625 210",
                "Cu²⁺",
                "#fb923c"
            )}

            ${ionStream(
                "M390 100 H310 Q275 100 275 135 V230",
                "NO₃⁻",
                "#67e8f9"
            )}

            ${ionStream(
                "M410 100 H490 Q525 100 525 135 V230",
                "K⁺",
                "#fda4af"
            )}

            <text
                x="195" y="180"
                text-anchor="middle"
                font-size="12"
                fill="#fca5a5">
                Zn dissolves
            </text>

            <text
                x="605" y="180"
                text-anchor="middle"
                font-size="12"
                fill="#86efac">
                Cu deposits
            </text>

        `;

        return output.replace(
            "</svg>",
            reactions + "</svg>"
        );
    };

})();

/* INTERACTIVE SALT BRIDGE LAB */

const SaltBridgeLab = (() => {

    function particles(path, text, color, count = 4) {

        return Array.from({length: count}, (_, i) => `
            <g>
                <circle r="12" fill="${color}"/>
                <text y="4"
                    text-anchor="middle"
                    font-size="10"
                    font-weight="bold"
                    fill="#081426">${text}</text>

                <animateMotion
                    path="${path}"
                    dur="5s"
                    begin="${-i * 5 / count}s"
                    repeatCount="indefinite"/>
            </g>
        `).join("");
    }

    function diagram(connected) {

        return `
        <svg viewBox="0 0 800 360"
            xmlns="http://www.w3.org/2000/svg"
            style="width:100%;font-family:Segoe UI,Arial">

            <defs>
                <linearGradient id="sbZinc">
                    <stop stop-color="#64748b"/>
                    <stop offset=".5" stop-color="#e2e8f0"/>
                    <stop offset="1" stop-color="#64748b"/>
                </linearGradient>

                <linearGradient id="sbCopper">
                    <stop stop-color="#92400e"/>
                    <stop offset=".5" stop-color="#fdba74"/>
                    <stop offset="1" stop-color="#b45309"/>
                </linearGradient>
            </defs>

            <!-- External circuit -->

            <path d="M150 145 V50 H370
                     M430 50 H650 V145"
                fill="none"
                stroke="#94a3b8"
                stroke-width="4"/>

            <!-- Current indicator -->

            <circle cx="400" cy="50" r="30"
                fill="${connected ? "#facc1533" : "#334155"}"/>

            <circle cx="400" cy="50" r="21"
                fill="${connected ? "#fef08a" : "#475569"}"
                stroke="${connected ? "#facc15" : "#64748b"}"
                stroke-width="3"/>

            <path d="M390 40 L410 60 M410 40 L390 60"
                stroke="${connected ? "#92400e" : "#94a3b8"}"
                stroke-width="2"/>

            <text x="400" y="15"
                text-anchor="middle"
                fill="${connected ? "#86efac" : "#fca5a5"}"
                font-size="14">

                ${connected
                    ? "CURRENT FLOWS"
                    : "NO SUSTAINED CURRENT"}

            </text>

            <!-- Solutions -->

            <rect x="65" y="205"
                width="260" height="90"
                rx="5" fill="#94a3b844"/>

            <rect x="475" y="205"
                width="260" height="90"
                rx="5" fill="#0284c788"/>

            <!-- Glass beakers -->

            <path d="M60 165 V285 Q60 300 75 300
                     H315 Q330 300 330 285 V165

                     M470 165 V285 Q470 300 485 300
                     H725 Q740 300 740 285 V165"
                stroke="#bae6fd"
                stroke-width="3"
                fill="none"/>

            <!-- Electrodes -->

            <rect x="133" y="145"
                width="34" height="135"
                rx="3" fill="url(#sbZinc)"/>

            <rect x="633" y="145"
                width="34" height="135"
                rx="3" fill="url(#sbCopper)"/>

            <!-- Salt bridge -->

            <g transform="translate(0 ${connected ? 0 : -90})">

                <path d="M280 255 V145
                         Q280 110 315 110
                         H485
                         Q520 110 520 145
                         V255"
                    fill="none"
                    stroke="#cbd5e1"
                    stroke-width="24"
                    stroke-linecap="round"/>

                <path d="M280 255 V145
                         Q280 110 315 110
                         H485
                         Q520 110 520 145
                         V255"
                    fill="none"
                    stroke="#67e8f9"
                    stroke-width="15"
                    stroke-linecap="round"/>

            </g>

            <!-- Labels -->

            <g text-anchor="middle" font-size="15">

                <text x="150" y="135" fill="#e2e8f0">
                    Zn (−)
                </text>

                <text x="650" y="135" fill="#fdba74">
                    Cu (+)
                </text>

                <text x="400" y="150" fill="#a5f3fc">
                    ${connected
                        ? "KNO₃ salt bridge"
                        : "Salt bridge removed"}
                </text>

                <text x="195" y="322" fill="#cbd5e1">
                    Zinc sulphate
                </text>

                <text x="605" y="322" fill="#7dd3fc">
                    Copper sulphate
                </text>

                <text x="195" y="345" fill="#fca5a5">
                    ANODE · Oxidation
                </text>

                <text x="605" y="345" fill="#86efac">
                    CATHODE · Reduction
                </text>

            </g>

            ${connected ? `

                ${particles(
                    "M150 145 V50 H370",
                    "e⁻", "#facc15"
                )}

                ${particles(
                    "M430 50 H650 V145",
                    "e⁻", "#facc15"
                )}

                ${particles(
                    "M390 110 H315 Q280 110 280 145 V255",
                    "NO₃⁻", "#67e8f9", 3
                )}

                ${particles(
                    "M410 110 H485 Q520 110 520 145 V255",
                    "K⁺", "#fda4af", 3
                )}

                ${particles(
                    "M167 230 L245 265",
                    "Zn²⁺", "#cbd5e1", 3
                )}

                ${particles(
                    "M555 265 L633 230",
                    "Cu²⁺", "#fb923c", 3
                )}

                <text x="400" y="180"
                    text-anchor="middle"
                    fill="#86efac" font-size="13">
                    Electrical neutrality maintained
                </text>

            ` : `

                <text x="195" y="235"
                    text-anchor="middle"
                    fill="#fca5a5" font-size="14">
                    Excess positive charge
                </text>

                <text x="605" y="235"
                    text-anchor="middle"
                    fill="#7dd3fc" font-size="14">
                    Excess negative charge
                </text>

                <text x="400" y="185"
                    text-anchor="middle"
                    fill="#fca5a5" font-size="16">
                    Charge imbalance
                </text>

                <text x="400" y="210"
                    text-anchor="middle"
                    fill="#fca5a5" font-size="13">
                    Ionic circuit interrupted
                </text>

            `}

        </svg>`;
    }

    function render() {

        return `
            <div id="saltBridgeLab"
                data-connected="true"
                style="width:100%">

                <div id="saltBridgeDiagram">
                    ${diagram(true)}
                </div>

                <div style="
                    display:flex;
                    justify-content:center;
                    gap:12px;
                    flex-wrap:wrap;
                    margin:12px 0">

                    <button type="button"
                        id="saltBridgeButton"
                        onclick="SaltBridgeLab.toggle()"
                        style="
                            padding:12px 20px;
                            border:1px solid #38bdf8;
                            border-radius:8px;
                            background:#075985;
                            color:white;
                            cursor:pointer">

                        Remove Salt Bridge

                    </button>

                </div>

                <div id="saltBridgeObservation"
                    style="
                        padding:14px;
                        border:1px solid #334155;
                        border-radius:10px;
                        text-align:center;
                        color:#86efac">

                    NO₃⁻ moves towards the anode.
                    K⁺ moves towards the cathode.
                    Electrical neutrality is maintained.

                </div>

            </div>
        `;
    }

    function toggle() {

        const lab =
            document.getElementById("saltBridgeLab");

        if (!lab) return;

        const connected =
            lab.dataset.connected !== "true";

        lab.dataset.connected = String(connected);

        document.getElementById(
            "saltBridgeDiagram"
        ).innerHTML = diagram(connected);

        document.getElementById(
            "saltBridgeButton"
        ).textContent = connected
            ? "Remove Salt Bridge"
            : "Reconnect Salt Bridge";

        const observation = document.getElementById(
            "saltBridgeObservation"
        );

        observation.style.color = connected
            ? "#86efac"
            : "#fca5a5";

        observation.textContent = connected
            ? "Salt bridge connected. Ion migration maintains electrical neutrality and allows sustained current."
            : "Salt bridge removed. Charge imbalance develops and sustained electron flow stops.";

        ElectrochemistryAnimations.pause();
    }

    return {render, toggle};

})();


/* CONNECT SALT BRIDGE LAB TO SCENE 10 */

(() => {

    const previousRender =
        ElectrochemistryAnimations.render;

    ElectrochemistryAnimations.render = function(topic) {

        if (topic.animation === "saltBridge") {

            return SaltBridgeLab.render();

        }

        return previousRender.call(this, topic);
    };

})();

/* INTERACTIVE METAL DISPLACEMENT LAB */

const DisplacementLab = (() => {

    const metals = {
        Mg: {
            name:"Magnesium", charge:2, rank:1,
            color:"#cbd5e1", salt:"Magnesium sulphate"
        },
        Al: {
            name:"Aluminium", charge:3, rank:2,
            color:"#e2e8f0", salt:"Aluminium sulphate"
        },
        Zn: {
            name:"Zinc", charge:2, rank:3,
            color:"#94a3b8", salt:"Zinc sulphate"
        },
        Fe: {
            name:"Iron", charge:2, rank:4,
            color:"#64748b", salt:"Iron(II) sulphate"
        },
        Cu: {
            name:"Copper", charge:2, rank:5,
            color:"#b87333", salt:"Copper sulphate"
        },
        Ag: {
            name:"Silver", charge:1, rank:6,
            color:"#e5e7eb", salt:"Silver nitrate"
        }
    };

    function ion(m) {
        return m + ({
            1:"⁺", 2:"²⁺", 3:"³⁺"
        }[metals[m].charge]);
    }

    function solutionColor(m) {

        if (m === "Cu") return "#0284c7";
        if (m === "Fe") return "#86efac";

        return "#cbd5e1";
    }

    function diagram(metal, salt, started) {

        const reacts =
            metals[metal].rank < metals[salt].rank;

        const active = started && reacts;

        const deposit = active
            ? Array.from({length:40}, (_,i) => `

                <circle
                    cx="${365 + i%5*17}"
                    cy="${165 + Math.floor(i/5)*13}"
                    r="${3+i%3}"
                    fill="${metals[salt].color}"
                    stroke="#cbd5e1"
                    stroke-width=".5"
                    opacity="0">

                    <animate
                        attributeName="opacity"
                        from="0" to="1"
                        begin="${i*.25}s"
                        dur=".7s"
                        fill="freeze"/>

                </circle>

            `).join("")
            : "";

        const particles = Array.from(
            {length:12}, (_,i) => {

                const x = i%2===0
                    ? 245+(i*19)%95
                    : 465+(i*17)%95;

                const y = 175+(i*23)%100;

                return `
                    <g>

                        <circle
                            cx="${x}" cy="${y}"
                            r="14"
                            fill="#bae6fd"
                            opacity=".85"/>

                        <text
                            x="${x}" y="${y+4}"
                            text-anchor="middle"
                            font-size="10"
                            fill="#081426">

                            ${ion(salt)}

                        </text>

                        ${active ? `
                            <animateTransform
                                attributeName="transform"
                                type="translate"
                                values="0 0;
                                ${400-x} ${220-y};
                                0 0"
                                dur="${5+i%3}s"
                                repeatCount="indefinite"/>
                        ` : ""}

                    </g>
                `;
            }
        ).join("");

        const newIons = active
            ? Array.from({length:6}, (_,i) => `

                <g>
                    <circle r="14"
                        fill="#fda4af"/>

                    <text y="4"
                        text-anchor="middle"
                        font-size="10"
                        fill="#081426">
                        ${ion(metal)}
                    </text>

                    <animateMotion
                        path="M400 210
                              Q350 230 285 270"
                        dur="5s"
                        begin="${-i*.8}s"
                        repeatCount="indefinite"/>
                </g>

            `).join("")
            : "";

        return `
        <svg viewBox="0 0 800 360"
            xmlns="http://www.w3.org/2000/svg"
            style="width:100%;font-family:Segoe UI,Arial">

            <defs>

                <linearGradient id="dlMetal">
                    <stop stop-color="${metals[metal].color}"/>
                    <stop offset=".5" stop-color="#ffffff"/>
                    <stop offset="1"
                        stop-color="${metals[metal].color}"/>
                </linearGradient>

            </defs>

            <text x="400" y="22"
                text-anchor="middle"
                font-size="14"
                fill="#94a3b8"
                letter-spacing="2">

                DISPLACEMENT REACTION LAB

            </text>

            <!-- Solution -->

            <rect x="220" y="150"
                width="360" height="145"
                rx="7"
                fill="${solutionColor(salt)}"
                opacity=".55">

                ${active ? `
                    <animate
                        attributeName="fill"
                        from="${solutionColor(salt)}"
                        to="${solutionColor(metal)}"
                        dur="15s"
                        fill="freeze"/>
                ` : ""}

            </rect>

            <!-- Glass beaker -->

            <path d="M215 110 V280
                     Q215 305 240 305
                     H560 Q585 305 585 280
                     V110"
                fill="none"
                stroke="#bae6fd"
                stroke-width="3"/>

            <ellipse cx="400" cy="150"
                rx="180" ry="9"
                fill="#bae6fd"
                opacity=".18"/>

            <!-- Metal strip -->

            <g>

                <rect x="365" y="40"
                    width="70" height="200"
                    rx="5"
                    fill="url(#dlMetal)"
                    stroke="#e2e8f0"/>

                <text x="400" y="70"
                    text-anchor="middle"
                    font-size="22"
                    font-weight="bold"
                    fill="#081426">

                    ${metal}

                </text>

                ${started ? "" : `
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        from="0 -155"
                        to="0 -155"
                        dur="1s"
                        fill="freeze"/>
                `}

                ${deposit}

            </g>

            ${particles}

            ${newIons}

            <text x="400" y="328"
                text-anchor="middle"
                font-size="17"
                fill="#e2e8f0">

                ${metals[salt].salt} solution

            </text>

            ${started ? `

                <text x="400" y="350"
                    text-anchor="middle"
                    font-size="14"
                    fill="${reacts
                        ? "#86efac"
                        : "#fca5a5"}">

                    ${reacts
                        ? "DISPLACEMENT OCCURS"
                        : "NO DISPLACEMENT"}

                </text>

            ` : ""}

            ${active ? `

                <path d="M435 205 H610"
                    stroke="#86efac"
                    stroke-dasharray="4 4"/>

                <text x="620" y="200"
                    font-size="14"
                    fill="#86efac">

                    ${salt} deposit

                </text>

                <text x="620" y="220"
                    font-size="12"
                    fill="#94a3b8">

                    ${metals[salt].name}

                </text>

            ` : ""}

        </svg>`;
    }

    function render() {

        const options = (selected, saltMode) =>
            Object.keys(metals).map(m => `

                <option value="${m}"
                    ${m===selected?"selected":""}>

                    ${saltMode
                        ? metals[m].salt
                        : metals[m].name}

                </option>

            `).join("");

        return `
            <div id="displacementLab"
                style="width:100%">

                <div style="
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    flex-wrap:wrap;
                    gap:15px;
                    margin-bottom:12px">

                    <label>

                        Metal:

                        <select id="dlMetalSelect"
                            onchange="DisplacementLab.reset()">

                            ${options("Zn",false)}

                        </select>

                    </label>

                    <label>

                        Salt solution:

                        <select id="dlSaltSelect"
                            onchange="DisplacementLab.reset()">

                            ${options("Cu",true)}

                        </select>

                    </label>

                </div>

                <div id="dlDiagram">

                    ${diagram("Zn","Cu",false)}

                </div>

                <div style="
                    display:flex;
                    justify-content:center;
                    flex-wrap:wrap;
                    gap:12px;
                    margin:12px">

                    <button type="button"
                        onclick="DisplacementLab.start()">

                        Start Experiment

                    </button>

                    <button type="button"
                        onclick="DisplacementLab.reset()">

                        Reset Experiment

                    </button>

                </div>

                <div id="dlResult"
                    class="definition">

                    Select a metal and salt solution.
                    Start the experiment.

                </div>

            </div>
        `;
    }

    function start() {

        const metal =
            document.getElementById("dlMetalSelect").value;

        const salt =
            document.getElementById("dlSaltSelect").value;

        const reacts =
            metals[metal].rank < metals[salt].rank;

        document.getElementById("dlDiagram").innerHTML =
            diagram(metal,salt,true);

        const result =
            document.getElementById("dlResult");

        if (!reacts) {

            result.innerHTML = `

                <strong style="color:#fca5a5">
                    No displacement reaction
                </strong>

                <br>

                ${metals[metal].name} cannot displace
                ${metals[salt].name} under the
                assumed conditions.

            `;

        } else {

            const a = metals[metal].charge;
            const b = metals[salt].charge;

            const gcd = (x,y) =>
                y ? gcd(y,x%y) : x;

            const p = b/gcd(a,b);
            const q = a/gcd(a,b);

            const k = n => n===1?"":n;

            result.innerHTML = `

                <strong style="color:#86efac">

                    Displacement reaction occurs

                </strong>

                <br><br>

                Oxidation:

                ${metal} → ${ion(metal)}
                + ${k(a)}e⁻

                <br>

                Reduction:

                ${ion(salt)} + ${k(b)}e⁻
                → ${salt}

                <br><br>

                Overall ionic equation:

                ${k(p)}${metal}
                + ${k(q)}${ion(salt)}
                →
                ${k(p)}${ion(metal)}
                + ${k(q)}${salt}

                <br><br>

                Reducing agent: ${metal}

                <br>

                Oxidising agent: ${ion(salt)}

                ${metal==="Al" ? `
                    <br><br>
                    Note: Aluminium's protective
                    oxide layer may slow or prevent
                    the visible reaction.
                ` : ""}

            `;
        }

        ElectrochemistryAnimations.pause();

        if (typeof playAnimations === "function") {
            playAnimations();
        }
    }

    function reset() {

        const metal =
            document.getElementById("dlMetalSelect").value;

        const salt =
            document.getElementById("dlSaltSelect").value;

        document.getElementById("dlDiagram").innerHTML =
            diagram(metal,salt,false);

        document.getElementById("dlResult").textContent =
            "Select the reactants and start the experiment.";

        ElectrochemistryAnimations.pause();
    }

    return {render,start,reset};

})();


/* CONNECT DISPLACEMENT LAB TO SCENE 17 */

(() => {

    const previousRender =
        ElectrochemistryAnimations.render;

    ElectrochemistryAnimations.render = function(topic) {

        if (topic.animation === "displacementSimulator") {

            return DisplacementLab.render();

        }

        return previousRender.call(this,topic);
    };

})();

/* ==========================================
   INTERACTIVE HYDROGEN DISPLACEMENT LAB
========================================== */

const HydrogenLab = (() => {

    const metals = [
        {
            symbol:"Fe",
            name:"Iron",
            color:"#64748b",
            rate:7,
            reaction:"Fe + 2HCl → FeCl₂ + H₂",
            observation:"Slower hydrogen evolution"
        },
        {
            symbol:"Mg",
            name:"Magnesium",
            color:"#cbd5e1",
            rate:22,
            reaction:"Mg + 2HCl → MgCl₂ + H₂",
            observation:"Rapid hydrogen evolution"
        },
        {
            symbol:"Cu",
            name:"Copper",
            color:"#b87333",
            rate:0,
            reaction:"No reaction",
            observation:"No hydrogen evolution"
        },
        {
            symbol:"Pb",
            name:"Lead",
            color:"#94a3b8",
            rate:2,
            reaction:"Pb + 2HCl → PbCl₂ + H₂",
            observation:"Very slow reaction"
        },
        {
            symbol:"Zn",
            name:"Zinc",
            color:"#a1a1aa",
            rate:13,
            reaction:"Zn + 2HCl → ZnCl₂ + H₂",
            observation:"Moderate hydrogen evolution"
        }
    ];

    function bubbles(x, rate) {

        return Array.from({length:rate}, (_,i) => {

            const duration = 2 + i%3;

            return `
                <circle
                    cx="${x-20+(i*17)%40}"
                    cy="250"
                    r="${2+i%4}"
                    fill="#bae6fd"
                    fill-opacity=".25"
                    stroke="#bae6fd"
                    stroke-width="1">

                    <animate
                        attributeName="cy"
                        from="250"
                        to="125"
                        dur="${duration}s"
                        begin="${-i*.35}s"
                        repeatCount="indefinite"/>

                    <animate
                        attributeName="opacity"
                        values="0;1;1;0"
                        dur="${duration}s"
                        begin="${-i*.35}s"
                        repeatCount="indefinite"/>

                </circle>
            `;

        }).join("");
    }

    function diagram(selected, started) {

        return `
        <svg viewBox="0 0 800 360"
            xmlns="http://www.w3.org/2000/svg"
            style="width:100%;font-family:Segoe UI,Arial">

            <defs>

                <linearGradient id="hlAcid"
                    x1="0" y1="0" x2="0" y2="1">

                    <stop stop-color="#38bdf8"
                        stop-opacity=".15"/>

                    <stop offset="1"
                        stop-color="#0284c7"
                        stop-opacity=".45"/>

                </linearGradient>

            </defs>

            <text x="400" y="22"
                text-anchor="middle"
                font-size="15"
                letter-spacing="2"
                fill="#94a3b8">

                METALS WITH DILUTE HCl

            </text>

            <!-- Test tube rack -->

            <rect x="35" y="135"
                width="730" height="17"
                rx="5" fill="#475569"/>

            <rect x="45" y="285"
                width="710" height="12"
                rx="4" fill="#334155"/>

            ${metals.map((m,i) => {

                const x = 100+i*150;

                const enabled =
                    selected.includes(m.symbol);

                const active = enabled && started;

                return `

                <g opacity="${enabled?1:.22}">

                    <!-- Metal name -->

                    <text x="${x}" y="55"
                        text-anchor="middle"
                        fill="#facc15"
                        font-size="24"
                        font-weight="bold">

                        ${m.symbol}

                    </text>

                    <!-- Test tube -->

                    <path d="
                        M${x-36} 80
                        V250
                        Q${x-36} 285 ${x} 285
                        Q${x+36} 285 ${x+36} 250
                        V80"

                        fill="#94a3b811"
                        stroke="#bae6fd"
                        stroke-width="3"/>

                    <ellipse cx="${x}" cy="80"
                        rx="36" ry="7"
                        fill="#94a3b822"
                        stroke="#bae6fd"
                        stroke-width="2"/>

                    <!-- Acid -->

                    <path d="
                        M${x-31} 145
                        V250
                        Q${x-31} 280 ${x} 280
                        Q${x+31} 280 ${x+31} 250
                        V145 Z"

                        fill="url(#hlAcid)"/>

                    <ellipse cx="${x}" cy="145"
                        rx="31" ry="6"
                        fill="#7dd3fc"
                        opacity=".2"/>

                    <!-- Metal piece -->

                    <rect x="${x-18}" y="250"
                        width="36" height="20"
                        rx="4"
                        fill="${m.color}"
                        stroke="#e2e8f0">

                        ${active && m.rate>0 ? `

                            <animate
                                attributeName="width"
                                from="36"
                                to="${m.symbol==="Pb"?34:22}"
                                dur="20s"
                                fill="freeze"/>

                        ` : ""}

                    </rect>

                    <!-- Hydrogen bubbles -->

                    ${active
                        ? bubbles(x,m.rate)
                        : ""}

                    <!-- Lead chloride coating -->

                    ${active && m.symbol==="Pb" ? `

                        <rect x="${x-18}" y="248"
                            width="36" height="23"
                            rx="4"
                            fill="#f8fafc"
                            opacity="0">

                            <animate
                                attributeName="opacity"
                                from="0" to=".8"
                                dur="5s"
                                fill="freeze"/>

                        </rect>

                    ` : ""}

                    <!-- Labels -->

                    <text x="${x}" y="315"
                        text-anchor="middle"
                        font-size="16"
                        fill="#e2e8f0">

                        ${m.name}

                    </text>

                    <text x="${x}" y="337"
                        text-anchor="middle"
                        font-size="13"
                        fill="${active
                            ? m.rate>0
                                ? "#86efac"
                                : "#fca5a5"
                            : "#94a3b8"}">

                        ${active
                            ? m.rate>0
                                ? "H₂ gas"
                                : "No reaction"
                            : enabled
                                ? "Ready"
                                : "Not selected"}

                    </text>

                </g>

                `;

            }).join("")}

        </svg>`;
    }

    function render() {

        return `
            <div id="hydrogenLab"
                style="width:100%">

                <div style="
                    display:flex;
                    justify-content:center;
                    flex-wrap:wrap;
                    gap:12px;
                    margin-bottom:12px">

                    ${metals.map(m=>`

                        <label style="
                            padding:8px 14px;
                            border:1px solid #475569;
                            border-radius:8px;
                            cursor:pointer">

                            <input type="checkbox"
                                class="hlMetal"
                                value="${m.symbol}"
                                onchange="HydrogenLab.reset()"
                                checked>

                            ${m.symbol}

                        </label>

                    `).join("")}

                </div>

                <div id="hlDiagram">

                    ${diagram(
                        metals.map(m=>m.symbol),
                        false
                    )}

                </div>

                <div style="
                    display:flex;
                    justify-content:center;
                    flex-wrap:wrap;
                    gap:12px;
                    margin:12px">

                    <button type="button"
                        onclick="HydrogenLab.start()">

                        Start Experiment

                    </button>

                    <button type="button"
                        onclick="HydrogenLab.reset()">

                        Reset Experiment

                    </button>

                </div>

                <div id="hlResult"
                    class="definition">

                    Select metals and start
                    the experiment to compare
                    hydrogen gas evolution.

                </div>

            </div>
        `;
    }

    function selectedMetals() {

        return Array.from(
            document.querySelectorAll(
                "#hydrogenLab .hlMetal:checked"
            )
        ).map(input=>input.value);

    }

    function start() {

        const selected = selectedMetals();

        if (!selected.length) {

            document.getElementById(
                "hlResult"
            ).textContent =
                "Please select at least one metal.";

            return;
        }

        document.getElementById(
            "hlDiagram"
        ).innerHTML = diagram(selected,true);

        document.getElementById(
            "hlResult"
        ).innerHTML = `

            <strong style="color:#7dd3fc">

                EXPERIMENT OBSERVATIONS

            </strong>

            <div style="
                display:grid;
                gap:10px;
                margin-top:15px">

                ${metals
                    .filter(m=>selected.includes(m.symbol))
                    .map(m=>`

                    <div style="
                        padding:12px;
                        border:1px solid #334155;
                        border-radius:9px">

                        <strong style="color:#facc15">

                            ${m.name} (${m.symbol})

                        </strong>

                        <div style="
                            height:8px;
                            background:#334155;
                            border-radius:8px;
                            overflow:hidden;
                            margin:10px 0">

                            <div style="
                                height:100%;
                                width:${m.rate/22*100}%;
                                background:#38bdf8">

                            </div>

                        </div>

                        <div style="
                            color:${m.rate
                                ?"#86efac"
                                :"#fca5a5"}">

                            ${m.observation}

                        </div>

                        <div style="margin-top:6px">

                            ${m.reaction}

                        </div>

                        ${m.symbol==="Pb" ? `

                            <small style="color:#94a3b8">

                                A lead chloride coating
                                can slow or inhibit
                                further reaction.

                            </small>

                        ` : ""}

                        ${m.symbol==="Cu" ? `

                            <small style="color:#94a3b8">

                                Copper is below hydrogen
                                in the reactivity series.

                            </small>

                        ` : ""}

                    </div>

                `).join("")}

            </div>

            <div style="
                margin-top:15px;
                padding:12px;
                background:#164e6333;
                border-radius:8px">

                <strong>Conclusion:</strong>

                Metals above hydrogen in the
                reactivity series can displace
                hydrogen from dilute acids.

                <br><br>

                Bubble rates are illustrative.
                Actual rates depend on experimental
                conditions and metal surfaces.

            </div>

        `;

        ElectrochemistryAnimations.pause();

        if (typeof playAnimations === "function") {
            playAnimations();
        }

    }

    function reset() {

        document.getElementById(
            "hlDiagram"
        ).innerHTML = diagram(
            selectedMetals(),
            false
        );

        document.getElementById(
            "hlResult"
        ).textContent =
            "Select metals and start the experiment.";

        ElectrochemistryAnimations.pause();

    }

    return {render,start,reset};

})();


/* CONNECT HYDROGEN LAB TO SCENE 20 */

(() => {

    const previousRender =
        ElectrochemistryAnimations.render;

    ElectrochemistryAnimations.render =
        function(topic) {

            if (
                topic.animation ===
                "hydrogenDisplacement"
            ) {

                return HydrogenLab.render();

            }

            return previousRender.call(this,topic);

        };

})();

/* ==========================================
   INTERACTIVE WATER ELECTROLYSIS LAB
   XYLEM NADAPURAM CHEMISTRY STUDIO
========================================== */

const WaterElectrolysisLab = (() => {

    let collectedTime = 0;
    let powered = false;
    let frameRequest = null;
    let lastTime = null;

    const MAX_TIME = 30;

    function bubbles(x, count) {

        return Array.from({length:count}, (_,i)=>`

            <circle
                cx="${x-24+(i*17)%48}"
                cy="285"
                r="${2+i%4}"
                fill="#bae6fd"
                fill-opacity=".25"
                stroke="#bae6fd">

                <animate
                    attributeName="cy"
                    from="285"
                    to="170"
                    dur="${2+i%3}s"
                    begin="${-i*.35}s"
                    repeatCount="indefinite"/>

                <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    dur="${2+i%3}s"
                    begin="${-i*.35}s"
                    repeatCount="indefinite"/>

            </circle>

        `).join("");
    }

    function diagram() {

        return `
        <svg id="waterLabSVG"
            viewBox="0 0 800 400"
            xmlns="http://www.w3.org/2000/svg"
            style="width:100%;font-family:Segoe UI,Arial">

            <defs>

                <linearGradient id="wlWater"
                    x1="0" y1="0" x2="0" y2="1">

                    <stop stop-color="#38bdf8"
                        stop-opacity=".18"/>

                    <stop offset="1"
                        stop-color="#0284c7"
                        stop-opacity=".55"/>

                </linearGradient>

                <clipPath id="wlTubeLeft">

                    <path d="
                        M175 315 V150
                        Q175 105 225 105
                        Q275 105 275 150
                        V315 Z"/>

                </clipPath>

                <clipPath id="wlTubeRight">

                    <path d="
                        M525 315 V150
                        Q525 105 575 105
                        Q625 105 625 150
                        V315 Z"/>

                </clipPath>

            </defs>

            <!-- DC power supply -->

            <rect x="310" y="12"
                width="180" height="60"
                rx="10"
                fill="#334155"
                stroke="#64748b"/>

            <text x="400" y="35"
                text-anchor="middle"
                font-size="15"
                fill="#e2e8f0">

                6 V DC SOURCE

            </text>

            <circle id="wlPowerLight"
                cx="400" cy="53" r="6"
                fill="#64748b"/>

            <text x="330" y="61"
                text-anchor="middle"
                font-size="23"
                fill="#38bdf8">−</text>

            <text x="470" y="61"
                text-anchor="middle"
                font-size="23"
                fill="#f87171">+</text>

            <!-- Connecting wires -->

            <path d="
                M330 72 V88 H225 V290
                M470 72 V88 H575 V290"

                fill="none"
                stroke="#94a3b8"
                stroke-width="4"/>

            <!-- Water container -->

            <rect x="85" y="250"
                width="630" height="95"
                rx="7"
                fill="url(#wlWater)"/>

            <path d="
                M80 230 V330
                Q80 350 100 350
                H700
                Q720 350 720 330
                V230"

                fill="none"
                stroke="#bae6fd"
                stroke-width="3"/>

            <!-- Inverted collection tubes -->

            <path d="
                M175 315 V150
                Q175 105 225 105
                Q275 105 275 150
                V315"

                fill="#38bdf844"
                stroke="#bae6fd"
                stroke-width="3"/>

            <path d="
                M525 315 V150
                Q525 105 575 105
                Q625 105 625 150
                V315"

                fill="#38bdf844"
                stroke="#bae6fd"
                stroke-width="3"/>

            <!-- Collected hydrogen -->

            <rect id="wlHydrogenGas"
                x="175" y="105"
                width="100" height="0"
                fill="#cbd5e166"
                clip-path="url(#wlTubeLeft)"/>

            <!-- Collected oxygen -->

            <rect id="wlOxygenGas"
                x="525" y="105"
                width="100" height="0"
                fill="#cbd5e166"
                clip-path="url(#wlTubeRight)"/>

            <!-- Gas-water boundaries -->

            <line id="wlHydrogenLevel"
                x1="175" x2="275"
                y1="105" y2="105"
                stroke="#bae6fd"
                stroke-width="2"
                clip-path="url(#wlTubeLeft)"/>

            <line id="wlOxygenLevel"
                x1="525" x2="625"
                y1="105" y2="105"
                stroke="#bae6fd"
                stroke-width="2"
                clip-path="url(#wlTubeRight)"/>

            <!-- Graduations -->

            ${Array.from({length:7},(_,i)=>`

                <path d="
                    M260 ${150+i*23} h14
                    M610 ${150+i*23} h14"

                    stroke="#bae6fd"
                    stroke-opacity=".65"/>

            `).join("")}

            <!-- Graphite electrodes -->

            <rect x="213" y="270"
                width="24" height="65"
                rx="3"
                fill="#475569"
                stroke="#94a3b8"/>

            <rect x="563" y="270"
                width="24" height="65"
                rx="3"
                fill="#475569"
                stroke="#94a3b8"/>

            <!-- Gas bubbles -->

            <g id="wlBubbles"></g>

            <!-- Labels -->

            <text x="225" y="100"
                text-anchor="middle"
                fill="#7dd3fc"
                font-size="19"
                font-weight="bold">

                Hydrogen (H₂)

            </text>

            <text x="575" y="100"
                text-anchor="middle"
                fill="#fca5a5"
                font-size="19"
                font-weight="bold">

                Oxygen (O₂)

            </text>

            <text id="wlHydrogenReading"
                x="225" y="190"
                text-anchor="middle"
                fill="#ffffff"
                font-size="20"
                font-weight="bold">

                0.0 mL

            </text>

            <text id="wlOxygenReading"
                x="575" y="190"
                text-anchor="middle"
                fill="#ffffff"
                font-size="20"
                font-weight="bold">

                0.0 mL

            </text>

            <text x="400" y="290"
                text-anchor="middle"
                fill="#e2e8f0"
                font-size="16">

                Acidified water

            </text>

            <text x="400" y="315"
                text-anchor="middle"
                fill="#94a3b8"
                font-size="13">

                Dilute sulphuric acid

            </text>

            <text x="225" y="375"
                text-anchor="middle"
                fill="#38bdf8"
                font-size="17">

                CATHODE (−)

            </text>

            <text x="575" y="375"
                text-anchor="middle"
                fill="#f87171"
                font-size="17">

                ANODE (+)

            </text>

            <text x="400" y="395"
                text-anchor="middle"
                fill="#94a3b8"
                font-size="12">

                Graphite electrodes

            </text>

        </svg>`;
    }

    function stopClock() {

        if (frameRequest !== null) {

            cancelAnimationFrame(frameRequest);

        }

        frameRequest = null;
        lastTime = null;
    }

    function updateReadings() {

        const progress =
            Math.min(collectedTime/MAX_TIME,1);

        const hydrogen = progress*40;
        const oxygen = progress*20;

        const hHeight = progress*180;
        const oHeight = progress*90;

        document.getElementById(
            "wlHydrogenGas"
        ).setAttribute("height",hHeight);

        document.getElementById(
            "wlOxygenGas"
        ).setAttribute("height",oHeight);

        const hLine =
            document.getElementById("wlHydrogenLevel");

        const oLine =
            document.getElementById("wlOxygenLevel");

        hLine.setAttribute("y1",105+hHeight);
        hLine.setAttribute("y2",105+hHeight);

        oLine.setAttribute("y1",105+oHeight);
        oLine.setAttribute("y2",105+oHeight);

        document.getElementById(
            "wlHydrogenReading"
        ).textContent =
            hydrogen.toFixed(1)+" mL";

        document.getElementById(
            "wlOxygenReading"
        ).textContent =
            oxygen.toFixed(1)+" mL";

        document.getElementById(
            "wlHVolume"
        ).textContent =
            hydrogen.toFixed(1)+" mL";

        document.getElementById(
            "wlOVolume"
        ).textContent =
            oxygen.toFixed(1)+" mL";

        document.getElementById(
            "wlProgress"
        ).style.width =
            progress*100+"%";
    }

    function tick(now) {

        if (
            !powered ||
            !document.getElementById("waterLabSVG")
        ) {

            stopClock();
            return;
        }

        if (lastTime === null) {

            lastTime = now;

        }

        const delta =
            Math.min((now-lastTime)/1000,.1);

        lastTime = now;

        const playing =
            typeof animationPlaying === "undefined"
                ? true
                : animationPlaying;

        const speed =
            typeof animationSpeed === "undefined"
                ? 1
                : Number(animationSpeed)||1;

        if (playing) {

            collectedTime = Math.min(
                MAX_TIME,
                collectedTime+delta*speed
            );

            updateReadings();

        }

        if (collectedTime >= MAX_TIME) {

            setPower(false);

            document.getElementById(
                "wlStatus"
            ).textContent =
                "Experiment complete. H₂ : O₂ = 2 : 1";

            return;
        }

        frameRequest =
            requestAnimationFrame(tick);
    }

    function setPower(value) {

        powered = value;

        stopClock();

        const light =
            document.getElementById("wlPowerLight");

        if (!light) return;

        light.setAttribute(
            "fill",
            powered?"#4ade80":"#64748b"
        );

        document.getElementById(
            "wlPowerButton"
        ).textContent =
            powered
                ?"Switch OFF"
                :"Switch ON";

        document.getElementById(
            "wlBubbles"
        ).innerHTML = powered
            ? bubbles(225,14)+bubbles(575,7)
            : "";

        document.getElementById(
            "wlStatus"
        ).textContent = powered
            ? "Electrolysis in progress"
            : "Power supply OFF";

        if (powered) {

            ElectrochemistryAnimations.pause();

            if (typeof playAnimations === "function") {

                playAnimations();

            }

            frameRequest =
                requestAnimationFrame(tick);
        }
    }

    function toggle() {

        if (
            !powered &&
            collectedTime >= MAX_TIME
        ) {

            reset();

        }

        setPower(!powered);
    }

    function reset() {

        setPower(false);

        collectedTime = 0;

        updateReadings();

        document.getElementById(
            "wlStatus"
        ).textContent =
            "Ready to start electrolysis";
    }

    function render() {

        stopClock();

        collectedTime = 0;
        powered = false;

        return `
            <div id="waterElectrolysisLab"
                style="width:100%">

                ${diagram()}

                <div style="
                    display:grid;
                    grid-template-columns:1fr 1fr;
                    gap:12px;
                    margin:12px 0">

                    <div style="
                        padding:15px;
                        border:1px solid #38bdf8;
                        border-radius:10px;
                        text-align:center">

                        Hydrogen collected

                        <div id="wlHVolume"
                            style="
                                font-size:28px;
                                font-weight:bold;
                                color:#38bdf8">

                            0.0 mL

                        </div>

                    </div>

                    <div style="
                        padding:15px;
                        border:1px solid #f87171;
                        border-radius:10px;
                        text-align:center">

                        Oxygen collected

                        <div id="wlOVolume"
                            style="
                                font-size:28px;
                                font-weight:bold;
                                color:#f87171">

                            0.0 mL

                        </div>

                    </div>

                </div>

                <div style="
                    height:8px;
                    background:#334155;
                    border-radius:10px;
                    overflow:hidden">

                    <div id="wlProgress"
                        style="
                            height:100%;
                            width:0%;
                            background:#38bdf8">

                    </div>

                </div>

                <div id="wlStatus"
                    style="
                        text-align:center;
                        margin:12px;
                        color:#86efac">

                    Ready to start electrolysis

                </div>

                <div style="
                    display:flex;
                    justify-content:center;
                    gap:12px;
                    flex-wrap:wrap;
                    margin:12px">

                    <button type="button"
                        id="wlPowerButton"
                        onclick="WaterElectrolysisLab.toggle()">

                        Switch ON

                    </button>

                    <button type="button"
                        onclick="WaterElectrolysisLab.reset()">

                        Reset Experiment

                    </button>

                </div>

                <div class="definition">

                    <strong style="color:#38bdf8">

                        Cathode — Reduction

                    </strong>

                    <p>

                        2H⁺ + 2e⁻ → H₂

                    </p>

                    <strong style="color:#f87171">

                        Anode — Oxidation

                    </strong>

                    <p>

                        2H₂O → O₂ + 4H⁺ + 4e⁻

                    </p>

                    <strong style="color:#86efac">

                        Overall reaction

                    </strong>

                    <p style="font-size:20px">

                        2H₂O → 2H₂ + O₂

                    </p>

                    <div style="
                        padding:15px;
                        border-radius:10px;
                        background:#164e6344;
                        text-align:center">

                        Hydrogen : Oxygen

                        <div style="
                            font-size:32px;
                            font-weight:bold;
                            color:#facc15">

                            2 : 1

                        </div>

                    </div>

                    <p style="
                        color:#94a3b8;
                        font-size:13px">

                        Gas volumes and collection time
                        are illustrative simulation values.

                    </p>

                </div>

            </div>
        `;
    }

    return {render,toggle,reset};

})();


/* CONNECT WATER ELECTROLYSIS TO SCENE 22 */

(() => {

    const previousRender =
        ElectrochemistryAnimations.render;

    ElectrochemistryAnimations.render =
        function(topic) {

            if (
                topic.animation ===
                "waterElectrolysis"
            ) {

                return WaterElectrolysisLab.render();

            }

            return previousRender.call(this,topic);

        };

    /* Synchronise global Reset with the lab */

    const previousReset =
        ElectrochemistryAnimations.reset;

    ElectrochemistryAnimations.reset =
        function() {

            previousReset.call(this);

            if (
                document.getElementById(
                    "waterElectrolysisLab"
                )
            ) {

                WaterElectrolysisLab.reset();

            }

        };

})();

/* ==========================================
   INTERACTIVE MOLTEN NaCl ELECTROLYSIS LAB
   XYLEM NADAPURAM CHEMISTRY STUDIO
========================================== */

const MoltenNaClLab = (() => {

    function particles(path,text,color,count=5) {

        return Array.from({length:count},(_,i)=>`

            <g>

                <circle r="14"
                    fill="${color}"
                    stroke="#e2e8f0"
                    stroke-width=".5"/>

                <text y="4"
                    text-anchor="middle"
                    font-size="11"
                    font-weight="bold"
                    fill="#081426">

                    ${text}

                </text>

                <animateMotion
                    path="${path}"
                    dur="5s"
                    begin="${-i*5/count}s"
                    repeatCount="indefinite"/>

            </g>

        `).join("");
    }

    function chlorineBubbles() {

        return Array.from({length:14},(_,i)=>`

            <circle
                cx="${550+(i*17)%45}"
                cy="280"
                r="${3+i%5}"
                fill="#bef264"
                fill-opacity=".35"
                stroke="#bef264">

                <animate
                    attributeName="cy"
                    from="280"
                    to="115"
                    dur="${3+i%3}s"
                    begin="${-i*.4}s"
                    repeatCount="indefinite"/>

                <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    dur="${3+i%3}s"
                    begin="${-i*.4}s"
                    repeatCount="indefinite"/>

            </circle>

        `).join("");
    }

    function diagram(molten,powered) {

        const active = molten && powered;

        return `
        <svg viewBox="0 0 800 400"
            xmlns="http://www.w3.org/2000/svg"
            style="width:100%;font-family:Segoe UI,Arial">

            <defs>

                <linearGradient id="mnLiquid"
                    x1="0" y1="0" x2="0" y2="1">

                    <stop stop-color="#f59e0b"
                        stop-opacity=".25"/>

                    <stop offset="1"
                        stop-color="#b45309"
                        stop-opacity=".65"/>

                </linearGradient>

                <linearGradient id="mnGraphite">

                    <stop stop-color="#1e293b"/>
                    <stop offset=".5" stop-color="#64748b"/>
                    <stop offset="1" stop-color="#1e293b"/>

                </linearGradient>

                <linearGradient id="mnSodium">

                    <stop stop-color="#94a3b8"/>
                    <stop offset=".5" stop-color="#f8fafc"/>
                    <stop offset="1" stop-color="#cbd5e1"/>

                </linearGradient>

            </defs>

            <!-- DC power supply -->

            <rect x="310" y="12"
                width="180" height="65"
                rx="10"
                fill="#334155"
                stroke="#64748b"/>

            <text x="400" y="35"
                text-anchor="middle"
                fill="#e2e8f0"
                font-size="15">

                DC POWER SUPPLY

            </text>

            <circle cx="400" cy="56" r="6"
                fill="${powered
                    ?"#4ade80"
                    :"#64748b"}"/>

            <text x="330" y="65"
                text-anchor="middle"
                fill="#38bdf8"
                font-size="23">−</text>

            <text x="470" y="65"
                text-anchor="middle"
                fill="#f87171"
                font-size="23">+</text>

            <!-- Connecting wires -->

            <path d="
                M330 77 V95 H225 V170
                M470 77 V95 H575 V170"

                fill="none"
                stroke="#94a3b8"
                stroke-width="4"/>

            <!-- Electrolyte -->

            <rect x="100" y="205"
                width="600" height="130"
                rx="6"
                fill="${molten
                    ?"url(#mnLiquid)"
                    :"#cbd5e133"}"/>

            <!-- Container -->

            <path d="
                M95 175 V320
                Q95 340 115 340
                H685
                Q705 340 705 320
                V175"

                fill="none"
                stroke="#bae6fd"
                stroke-width="3"/>

            <!-- Graphite cathode -->

            <rect x="208" y="155"
                width="34" height="155"
                rx="4"
                fill="url(#mnGraphite)"
                stroke="#94a3b8"/>

            <!-- Graphite anode -->

            <rect x="558" y="155"
                width="34" height="155"
                rx="4"
                fill="url(#mnGraphite)"
                stroke="#94a3b8"/>

            <text x="225" y="140"
                text-anchor="middle"
                fill="#38bdf8"
                font-size="17">

                CATHODE (−)

            </text>

            <text x="575" y="140"
                text-anchor="middle"
                fill="#f87171"
                font-size="17">

                ANODE (+)

            </text>

            ${!active ? `

                ${Array.from({length:24},(_,i)=>{

                    const row = Math.floor(i/8);
                    const col = i%8;

                    const positive =
                        (row+col)%2===0;

                    const x = 270+col*37;
                    const y = 225+row*40;

                    return `

                        <g>

                            <circle
                                cx="${x}"
                                cy="${y}"
                                r="14"
                                fill="${positive
                                    ?"#fda4af"
                                    :"#67e8f9"}"/>

                            <text
                                x="${x}"
                                y="${y+4}"
                                text-anchor="middle"
                                font-size="11"
                                fill="#081426">

                                ${positive
                                    ?"Na⁺"
                                    :"Cl⁻"}

                            </text>

                            ${molten ? `

                                <animateTransform
                                    attributeName="transform"
                                    type="translate"
                                    values="0 0;8 6;0 0;-8 -6;0 0"
                                    dur="${3+i%3}s"
                                    repeatCount="indefinite"/>

                            ` : ""}

                        </g>

                    `;

                }).join("")}

            ` : `

                <!-- Sodium ions towards cathode -->

                ${particles(
                    "M420 240 Q320 220 242 260",
                    "Na⁺",
                    "#fda4af",
                    6
                )}

                ${particles(
                    "M390 300 Q310 310 242 285",
                    "Na⁺",
                    "#fda4af",
                    4
                )}

                <!-- Chloride ions towards anode -->

                ${particles(
                    "M380 240 Q480 220 558 260",
                    "Cl⁻",
                    "#67e8f9",
                    6
                )}

                ${particles(
                    "M410 300 Q490 310 558 285",
                    "Cl⁻",
                    "#67e8f9",
                    4
                )}

                <!-- Electron supply -->

                ${particles(
                    "M330 77 V95 H225 V155",
                    "e⁻",
                    "#facc15",
                    4
                )}

                <!-- Electrons removed from anode -->

                ${particles(
                    "M575 155 V95 H470 V77",
                    "e⁻",
                    "#facc15",
                    4
                )}

                <!-- Sodium product -->

                <ellipse cx="190" cy="270"
                    rx="27" ry="12"
                    fill="url(#mnSodium)"
                    opacity="0">

                    <animate
                        attributeName="opacity"
                        from="0" to="1"
                        dur="6s"
                        fill="freeze"/>

                </ellipse>

                <ellipse cx="170" cy="225"
                    rx="22" ry="10"
                    fill="url(#mnSodium)"
                    opacity="0">

                    <animate
                        attributeName="opacity"
                        from="0" to="1"
                        begin="4s"
                        dur="5s"
                        fill="freeze"/>

                </ellipse>

                <!-- Chlorine gas -->

                ${chlorineBubbles()}

                <text x="145" y="195"
                    text-anchor="middle"
                    font-size="14"
                    fill="#e2e8f0">

                    Sodium

                </text>

                <text x="655" y="195"
                    text-anchor="middle"
                    font-size="14"
                    fill="#bef264">

                    Chlorine

                </text>

                <text x="330" y="190"
                    text-anchor="middle"
                    font-size="13"
                    fill="#fda4af">

                    ← Na⁺

                </text>

                <text x="470" y="190"
                    text-anchor="middle"
                    font-size="13"
                    fill="#67e8f9">

                    Cl⁻ →

                </text>

            `}

            <text x="400" y="365"
                text-anchor="middle"
                font-size="18"
                fill="#e2e8f0">

                ${molten
                    ?"Molten sodium chloride"
                    :"Solid sodium chloride"}

            </text>

            <text x="400" y="389"
                text-anchor="middle"
                font-size="13"
                fill="${active
                    ?"#86efac"
                    :"#94a3b8"}">

                ${active
                    ?"Electrolysis in progress"
                    :molten
                        ?"Mobile ions"
                        :"Ions fixed in lattice positions"}

            </text>

        </svg>`;
    }

    function render() {

        return `

            <div id="moltenNaClLab"
                data-molten="true"
                data-powered="false"
                style="width:100%">

                <div style="
                    display:flex;
                    justify-content:center;
                    flex-wrap:wrap;
                    gap:12px;
                    margin-bottom:12px">

                    <button type="button"
                        onclick="MoltenNaClLab.setState(false)">

                        Solid NaCl

                    </button>

                    <button type="button"
                        onclick="MoltenNaClLab.setState(true)">

                        Molten NaCl

                    </button>

                </div>

                <div id="mnDiagram">

                    ${diagram(true,false)}

                </div>

                <div style="
                    display:flex;
                    justify-content:center;
                    flex-wrap:wrap;
                    gap:12px;
                    margin:12px">

                    <button type="button"
                        id="mnPowerButton"
                        onclick="MoltenNaClLab.toggle()">

                        Switch ON

                    </button>

                    <button type="button"
                        onclick="MoltenNaClLab.reset()">

                        Reset Experiment

                    </button>

                </div>

                <div id="mnStatus"
                    class="definition">

                    Molten sodium chloride contains
                    freely moving sodium and chloride ions.

                    Switch on the DC power supply.

                </div>

                <div id="mnReactions"
                    style="display:none">

                    <div style="
                        display:grid;
                        grid-template-columns:
                            repeat(auto-fit,minmax(180px,1fr));
                        gap:12px;
                        margin-top:15px">

                        <div style="
                            padding:16px;
                            border:1px solid #38bdf8;
                            border-radius:10px">

                            <strong style="color:#38bdf8">

                                CATHODE (−)

                            </strong>

                            <p>Reduction</p>

                            <p style="font-size:20px">

                                Na⁺ + e⁻ → Na

                            </p>

                            <p>

                                Silvery molten sodium forms.

                            </p>

                        </div>

                        <div style="
                            padding:16px;
                            border:1px solid #f87171;
                            border-radius:10px">

                            <strong style="color:#f87171">

                                ANODE (+)

                            </strong>

                            <p>Oxidation</p>

                            <p style="font-size:20px">

                                2Cl⁻ → Cl₂ + 2e⁻

                            </p>

                            <p>

                                Pale green chlorine gas
                                is liberated.

                            </p>

                        </div>

                    </div>

                    <div style="
                        padding:18px;
                        margin-top:15px;
                        background:#164e6333;
                        border:1px solid #0e7490;
                        border-radius:10px;
                        text-align:center">

                        <strong>

                            OVERALL REACTION

                        </strong>

                        <p style="
                            font-size:23px;
                            color:#86efac">

                            2NaCl(l) → 2Na(l) + Cl₂(g)

                        </p>

                    </div>

                </div>

                <p style="
                    text-align:center;
                    font-size:12px;
                    color:#94a3b8">

                    Virtual demonstration only.
                    Products must remain separated
                    in real electrolysis equipment.

                </p>

            </div>

        `;
    }

    function update() {

        const lab =
            document.getElementById("moltenNaClLab");

        if (!lab) return;

        const molten =
            lab.dataset.molten==="true";

        const powered =
            lab.dataset.powered==="true";

        const active = molten && powered;

        document.getElementById(
            "mnDiagram"
        ).innerHTML = diagram(molten,powered);

        document.getElementById(
            "mnPowerButton"
        ).textContent = powered
            ?"Switch OFF"
            :"Switch ON";

        document.getElementById(
            "mnReactions"
        ).style.display = active
            ?"block"
            :"none";

        const status =
            document.getElementById("mnStatus");

        if (active) {

            status.innerHTML = `

                <strong style="color:#86efac">

                    Electrolysis in progress

                </strong>

                <br><br>

                Na⁺ ions migrate towards the
                negative electrode.

                <br>

                Cl⁻ ions migrate towards the
                positive electrode.

                <br><br>

                Sodium forms at the cathode
                and chlorine gas forms at the anode.

            `;

        } else if (powered && !molten) {

            status.innerHTML = `

                <strong style="color:#fca5a5">

                    No ionic conduction

                </strong>

                <br><br>

                In solid sodium chloride,
                ions occupy fixed lattice positions.

                Therefore, electrolysis does not occur.

            `;

        } else {

            status.textContent = molten
                ?"Molten NaCl contains mobile ions. Switch ON to begin electrolysis."
                :"Solid NaCl contains ions held in fixed lattice positions.";

        }

        ElectrochemistryAnimations.pause();

        if (active &&
            typeof playAnimations==="function") {

            playAnimations();

        }
    }

    function setState(molten) {

        const lab =
            document.getElementById("moltenNaClLab");

        if (!lab) return;

        lab.dataset.molten = String(molten);

        update();
    }

    function toggle() {

        const lab =
            document.getElementById("moltenNaClLab");

        if (!lab) return;

        lab.dataset.powered = String(
            lab.dataset.powered!=="true"
        );

        update();
    }

    function reset() {

        const lab =
            document.getElementById("moltenNaClLab");

        if (!lab) return;

        lab.dataset.molten = "true";
        lab.dataset.powered = "false";

        update();
    }

    return {render,setState,toggle,reset};

})();


/* CONNECT MOLTEN NaCl LAB TO SCENE 27 */

(() => {

    const previousRender =
        ElectrochemistryAnimations.render;

    ElectrochemistryAnimations.render =
        function(topic) {

            if (topic.animation==="moltenNaCl") {

                return MoltenNaClLab.render();

            }

            return previousRender.call(this,topic);
        };

    const previousReset =
        ElectrochemistryAnimations.reset;

    ElectrochemistryAnimations.reset =
        function() {

            previousReset.call(this);

            if (
                document.getElementById(
                    "moltenNaClLab"
                )
            ) {

                MoltenNaClLab.reset();

            }

        };

})();

/* ==========================================
   INTERACTIVE AQUEOUS NaCl ELECTROLYSIS LAB
   XYLEM NADAPURAM CHEMISTRY STUDIO
========================================== */

const AqueousNaClLab = (() => {

    function particles(
        path,text,color,count=5,duration=5
    ) {

        return Array.from({length:count},(_,i)=>`

            <g>

                <circle r="13"
                    fill="${color}"
                    stroke="#e2e8f0"
                    stroke-width=".5"/>

                <text y="4"
                    text-anchor="middle"
                    font-size="10"
                    font-weight="bold"
                    fill="#081426">

                    ${text}

                </text>

                <animateMotion
                    path="${path}"
                    dur="${duration}s"
                    begin="${-i*duration/count}s"
                    repeatCount="indefinite"/>

            </g>

        `).join("");
    }

    function bubbles(x,color,count=12) {

        return Array.from({length:count},(_,i)=>`

            <circle
                cx="${x-22+(i*17)%44}"
                cy="280"
                r="${3+i%5}"
                fill="${color}"
                fill-opacity=".25"
                stroke="${color}">

                <animate
                    attributeName="cy"
                    from="280"
                    to="145"
                    dur="${3+i%3}s"
                    begin="${-i*.4}s"
                    repeatCount="indefinite"/>

                <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    dur="${3+i%3}s"
                    begin="${-i*.4}s"
                    repeatCount="indefinite"/>

            </circle>

        `).join("");
    }

    function diagram(powered,indicator,reacted) {

        return `
        <svg viewBox="0 0 800 400"
            xmlns="http://www.w3.org/2000/svg"
            style="width:100%;font-family:Segoe UI,Arial">

            <defs>

                <linearGradient id="aqSolution"
                    x1="0" y1="0" x2="0" y2="1">

                    <stop stop-color="#38bdf8"
                        stop-opacity=".12"/>

                    <stop offset="1"
                        stop-color="#0284c7"
                        stop-opacity=".45"/>

                </linearGradient>

                <linearGradient id="aqPlatinum">

                    <stop stop-color="#64748b"/>
                    <stop offset=".5"
                        stop-color="#f8fafc"/>
                    <stop offset="1"
                        stop-color="#94a3b8"/>

                </linearGradient>

                <radialGradient id="aqPink">

                    <stop stop-color="#ec4899"
                        stop-opacity=".8"/>

                    <stop offset=".7"
                        stop-color="#ec4899"
                        stop-opacity=".45"/>

                    <stop offset="1"
                        stop-color="#ec4899"
                        stop-opacity="0"/>

                </radialGradient>

                <clipPath id="aqLiquidClip">

                    <rect x="100" y="205"
                        width="600" height="130"
                        rx="6"/>

                </clipPath>

            </defs>

            <!-- DC power supply -->

            <rect x="310" y="12"
                width="180" height="65"
                rx="10"
                fill="#334155"
                stroke="#64748b"/>

            <text x="400" y="35"
                text-anchor="middle"
                fill="#e2e8f0"
                font-size="15">

                DC POWER SUPPLY

            </text>

            <circle cx="400" cy="56" r="6"
                fill="${powered
                    ?"#4ade80"
                    :"#64748b"}"/>

            <text x="330" y="65"
                text-anchor="middle"
                fill="#38bdf8"
                font-size="23">−</text>

            <text x="470" y="65"
                text-anchor="middle"
                fill="#f87171"
                font-size="23">+</text>

            <!-- Connecting wires -->

            <path d="
                M330 77 V95 H225 V170
                M470 77 V95 H575 V170"

                fill="none"
                stroke="#94a3b8"
                stroke-width="4"/>

            <!-- Aqueous solution -->

            <rect x="100" y="205"
                width="600" height="130"
                rx="6"
                fill="url(#aqSolution)"/>

            <!-- Glass container -->

            <path d="
                M95 175 V320
                Q95 340 115 340
                H685
                Q705 340 705 320
                V175"

                fill="none"
                stroke="#bae6fd"
                stroke-width="3"/>

            <ellipse cx="400" cy="205"
                rx="300" ry="8"
                fill="#bae6fd"
                opacity=".12"/>

            <!-- Phenolphthalein colour change -->

            ${indicator && reacted ? `

                <ellipse cx="225" cy="280"
                    rx="120" ry="75"
                    fill="url(#aqPink)"
                    clip-path="url(#aqLiquidClip)"
                    opacity="${powered?0:1}">

                    ${powered ? `

                        <animate
                            attributeName="opacity"
                            from="0" to="1"
                            dur="8s"
                            fill="freeze"/>

                    ` : ""}

                </ellipse>

            ` : ""}

            <!-- Platinum electrodes -->

            <rect x="208" y="155"
                width="34" height="155"
                rx="4"
                fill="url(#aqPlatinum)"
                stroke="#e2e8f0"/>

            <rect x="558" y="155"
                width="34" height="155"
                rx="4"
                fill="url(#aqPlatinum)"
                stroke="#e2e8f0"/>

            <text x="225" y="140"
                text-anchor="middle"
                fill="#38bdf8"
                font-size="17">

                CATHODE (−)

            </text>

            <text x="575" y="140"
                text-anchor="middle"
                fill="#f87171"
                font-size="17">

                ANODE (+)

            </text>

            <!-- Dissolved ions -->

            ${Array.from({length:12},(_,i)=>{

                const x = 285+(i*37)%230;
                const y = 225+(i*23)%90;
                const positive = i%2===0;

                return `

                    <g>

                        <circle
                            cx="${x}" cy="${y}"
                            r="13"
                            fill="${positive
                                ?"#fda4af"
                                :"#67e8f9"}"/>

                        <text
                            x="${x}" y="${y+4}"
                            text-anchor="middle"
                            font-size="10"
                            fill="#081426">

                            ${positive
                                ?"Na⁺"
                                :"Cl⁻"}

                        </text>

                    </g>

                `;

            }).join("")}

            ${powered ? `

                <!-- Electron supply to cathode -->

                ${particles(
                    "M330 77 V95 H225 V155",
                    "e⁻",
                    "#facc15",
                    4,
                    4
                )}

                <!-- Electron removal from anode -->

                ${particles(
                    "M575 155 V95 H470 V77",
                    "e⁻",
                    "#facc15",
                    4,
                    4
                )}

                <!-- Sodium ion migration -->

                ${particles(
                    "M390 250 Q320 230 260 260",
                    "Na⁺",
                    "#fda4af",
                    4
                )}

                <!-- Chloride ion migration -->

                ${particles(
                    "M410 270 Q490 240 558 260",
                    "Cl⁻",
                    "#67e8f9",
                    4
                )}

                <!-- Water reduction -->

                ${particles(
                    "M300 300 L242 285",
                    "H₂O",
                    "#bae6fd",
                    3
                )}

                <!-- Hydroxide ions produced -->

                ${particles(
                    "M242 260 Q275 290 320 305",
                    "OH⁻",
                    "#f9a8d4",
                    4
                )}

                <!-- Hydrogen gas -->

                ${bubbles(
                    225,
                    "#bae6fd",
                    12
                )}

                <!-- Chlorine gas -->

                ${bubbles(
                    575,
                    "#bef264",
                    12
                )}

                <text x="145" y="170"
                    text-anchor="middle"
                    fill="#7dd3fc"
                    font-size="18">

                    H₂ ↑

                </text>

                <text x="655" y="170"
                    text-anchor="middle"
                    fill="#bef264"
                    font-size="18">

                    Cl₂ ↑

                </text>

            ` : ""}

            ${reacted ? `

                <text x="160" y="320"
                    text-anchor="middle"
                    font-size="14"
                    fill="${indicator
                        ?"#fbcfe8"
                        :"#86efac"}">

                    NaOH forms

                </text>

            ` : ""}

            <text x="400" y="365"
                text-anchor="middle"
                font-size="18"
                fill="#e2e8f0">

                Concentrated aqueous NaCl

            </text>

            <text x="400" y="388"
                text-anchor="middle"
                font-size="13"
                fill="#94a3b8">

                Platinum electrodes

            </text>

        </svg>`;
    }

    function render() {

        return `

            <div id="aqueousNaClLab"
                data-powered="false"
                data-indicator="false"
                data-reacted="false"
                style="width:100%">

                <div id="aqDiagram">

                    ${diagram(false,false,false)}

                </div>

                <!-- Experiment controls -->

                <div style="
                    display:flex;
                    justify-content:center;
                    flex-wrap:wrap;
                    gap:12px;
                    margin:12px 0">

                    <button type="button"
                        id="aqPowerButton"
                        onclick="AqueousNaClLab.toggle()">

                        Switch ON

                    </button>

                    <button type="button"
                        id="aqIndicatorButton"
                        onclick="AqueousNaClLab.indicator()">

                        Add Phenolphthalein

                    </button>

                    <button type="button"
                        onclick="AqueousNaClLab.reset()">

                        Reset Experiment

                    </button>

                </div>

                <div id="aqStatus"
                    class="definition">

                    Switch on the DC power supply
                    to begin electrolysis.

                </div>

                <!-- Product cards -->

                <div id="aqProducts"
                    style="display:none">

                    <div style="
                        display:grid;
                        grid-template-columns:
                            repeat(auto-fit,minmax(130px,1fr));
                        gap:12px;
                        margin:15px 0">

                        <div style="
                            border:1px solid #38bdf8;
                            border-radius:10px;
                            padding:15px;
                            text-align:center">

                            <div style="
                                font-size:30px;
                                color:#38bdf8;
                                font-weight:bold">

                                H₂

                            </div>

                            Hydrogen

                            <p>Cathode</p>

                        </div>

                        <div style="
                            border:1px solid #84cc16;
                            border-radius:10px;
                            padding:15px;
                            text-align:center">

                            <div style="
                                font-size:30px;
                                color:#bef264;
                                font-weight:bold">

                                Cl₂

                            </div>

                            Chlorine

                            <p>Anode</p>

                        </div>

                        <div style="
                            border:1px solid #ec4899;
                            border-radius:10px;
                            padding:15px;
                            text-align:center">

                            <div style="
                                font-size:30px;
                                color:#f9a8d4;
                                font-weight:bold">

                                NaOH

                            </div>

                            Sodium hydroxide

                            <p>Solution</p>

                        </div>

                    </div>

                    <!-- Electrode reactions -->

                    <div style="
                        display:grid;
                        grid-template-columns:
                            repeat(auto-fit,minmax(220px,1fr));
                        gap:12px">

                        <div style="
                            padding:16px;
                            border:1px solid #38bdf8;
                            border-radius:10px">

                            <strong style="color:#38bdf8">

                                CATHODE — REDUCTION

                            </strong>

                            <p style="font-size:19px">

                                2H₂O + 2e⁻ → H₂ + 2OH⁻

                            </p>

                            <p>

                                Water is reduced instead
                                of sodium ions.

                            </p>

                        </div>

                        <div style="
                            padding:16px;
                            border:1px solid #f87171;
                            border-radius:10px">

                            <strong style="color:#f87171">

                                ANODE — OXIDATION

                            </strong>

                            <p style="font-size:19px">

                                2Cl⁻ → Cl₂ + 2e⁻

                            </p>

                            <p>

                                Chloride ions are oxidised
                                to chlorine gas.

                            </p>

                        </div>

                    </div>

                    <div style="
                        padding:18px;
                        margin-top:15px;
                        border:1px solid #0e7490;
                        background:#164e6333;
                        border-radius:10px;
                        text-align:center">

                        <strong>

                            OVERALL REACTION

                        </strong>

                        <p style="
                            font-size:21px;
                            color:#86efac">

                            2NaCl + 2H₂O
                            → 2NaOH + H₂ + Cl₂

                        </p>

                    </div>

                </div>

                <div id="aqIndicatorResult"
                    style="
                        display:none;
                        padding:16px;
                        margin-top:15px;
                        border:1px solid #ec4899;
                        background:#83184333;
                        border-radius:10px">

                    <strong style="color:#f9a8d4">

                        PHENOLPHTHALEIN TEST

                    </strong>

                    <p>

                        The solution near the cathode
                        turns pink because hydroxide
                        ions make it alkaline.

                    </p>

                </div>

                <p style="
                    text-align:center;
                    font-size:12px;
                    color:#94a3b8">

                    Simplified virtual demonstration
                    of concentrated brine electrolysis.
                    Real equipment keeps the products
                    separated.

                </p>

            </div>

        `;
    }

    function update() {

        const lab =
            document.getElementById("aqueousNaClLab");

        if (!lab) return;

        const powered =
            lab.dataset.powered==="true";

        const indicator =
            lab.dataset.indicator==="true";

        const reacted =
            lab.dataset.reacted==="true";

        document.getElementById(
            "aqDiagram"
        ).innerHTML = diagram(
            powered,
            indicator,
            reacted
        );

        document.getElementById(
            "aqPowerButton"
        ).textContent = powered
            ?"Switch OFF"
            :"Switch ON";

        document.getElementById(
            "aqIndicatorButton"
        ).textContent = indicator
            ?"Remove Indicator"
            :"Add Phenolphthalein";

        document.getElementById(
            "aqProducts"
        ).style.display = reacted
            ?"block"
            :"none";

        document.getElementById(
            "aqIndicatorResult"
        ).style.display = indicator && reacted
            ?"block"
            :"none";

        const status =
            document.getElementById("aqStatus");

        if (powered) {

            status.innerHTML = `

                <strong style="color:#86efac">

                    Electrolysis in progress

                </strong>

                <br><br>

                Hydrogen is liberated at the cathode.

                <br>

                Chlorine is liberated at the anode.

                <br>

                Hydroxide ions accumulate
                near the cathode.

                ${indicator ? `

                    <br><br>

                    <strong style="color:#f9a8d4">

                        Pink colour develops near
                        the cathode.

                    </strong>

                ` : ""}

            `;

        } else if (reacted) {

            status.textContent =
                "Power OFF. Further gas evolution stops.";

        } else {

            status.textContent = indicator
                ?"Indicator added. Switch ON to observe the colour change."
                :"Switch on the power supply to begin electrolysis.";

        }

        ElectrochemistryAnimations.pause();

        if (
            powered &&
            typeof playAnimations==="function"
        ) {

            playAnimations();

        }
    }

    function toggle() {

        const lab =
            document.getElementById("aqueousNaClLab");

        if (!lab) return;

        const powered =
            lab.dataset.powered!=="true";

        lab.dataset.powered = String(powered);

        if (powered) {

            lab.dataset.reacted = "true";

        }

        update();
    }

    function indicator() {

        const lab =
            document.getElementById("aqueousNaClLab");

        if (!lab) return;

        lab.dataset.indicator = String(
            lab.dataset.indicator!=="true"
        );

        update();
    }

    function reset() {

        const lab =
            document.getElementById("aqueousNaClLab");

        if (!lab) return;

        lab.dataset.powered = "false";
        lab.dataset.indicator = "false";
        lab.dataset.reacted = "false";

        update();
    }

    return {
        render,
        toggle,
        indicator,
        reset
    };

})();


/* CONNECT AQUEOUS NaCl LAB TO SCENE 28 */

(() => {

    const previousRender =
        ElectrochemistryAnimations.render;

    ElectrochemistryAnimations.render =
        function(topic) {

            if (topic.animation==="aqueousNaCl") {

                return AqueousNaClLab.render();

            }

            return previousRender.call(this,topic);

        };

    const previousReset =
        ElectrochemistryAnimations.reset;

    ElectrochemistryAnimations.reset =
        function() {

            previousReset.call(this);

            if (
                document.getElementById(
                    "aqueousNaClLab"
                )
            ) {

                AqueousNaClLab.reset();

            }

        };

})();

/* ==========================================
   INTERACTIVE ELECTROPLATING LAB
   XYLEM NADAPURAM CHEMISTRY STUDIO
========================================== */

const ElectroplatingLab = (() => {

    const metals = {

        Cu: {
            name:"Copper",
            color:"#c87941",
            solution:"#0284c7",
            salt:"Copper sulphate (CuSO₄)",
            ion:"Cu²⁺",
            electrons:"2"
        },

        Ag: {
            name:"Silver",
            color:"#e2e8f0",
            solution:"#cbd5e1",
            salt:"Silver nitrate (AgNO₃)",
            ion:"Ag⁺",
            electrons:""
        },

        Ni: {
            name:"Nickel",
            color:"#a8a29e",
            solution:"#22c55e",
            salt:"Nickel sulphate (NiSO₄)",
            ion:"Ni²⁺",
            electrons:"2"
        }

    };

    let progress = 0;
    let powered = false;
    let frameRequest = null;
    let lastTime = null;

    const DURATION = 25;

    function particles(path,text,color,count=5) {

        return Array.from({length:count},(_,i)=>`

            <g>

                <circle r="13" fill="${color}"/>

                <text y="4"
                    text-anchor="middle"
                    font-size="10"
                    font-weight="bold"
                    fill="#081426">

                    ${text}

                </text>

                <animateMotion
                    path="${path}"
                    dur="5s"
                    begin="${-i*5/count}s"
                    repeatCount="indefinite"/>

            </g>

        `).join("");
    }

    function objectShape(object) {

        if (object==="Spoon") {

            return `

                <ellipse cx="575" cy="280"
                    rx="24" ry="32"/>

                <path d="M575 248 V170"
                    stroke-linecap="round"/>

            `;
        }

        if (object==="Key") {

            return `

                <circle cx="575" cy="205"
                    r="24"/>

                <path d="
                    M575 229 V310
                    H600
                    M575 285 H595"/>

            `;
        }

        return `

            <ellipse cx="575" cy="255"
                rx="43" ry="52"/>

        `;
    }

    function diagram(metal,object) {

        const m = metals[metal];

        return `

        <svg id="epSVG"
            viewBox="0 0 800 400"
            xmlns="http://www.w3.org/2000/svg"
            style="width:100%;font-family:Segoe UI,Arial">

            <defs>

                <linearGradient id="epMetal">

                    <stop stop-color="${m.color}"/>

                    <stop offset=".5"
                        stop-color="#f8fafc"/>

                    <stop offset="1"
                        stop-color="${m.color}"/>

                </linearGradient>

            </defs>

            <!-- DC power supply -->

            <rect x="310" y="12"
                width="180" height="65"
                rx="10"
                fill="#334155"
                stroke="#64748b"/>

            <text x="400" y="35"
                text-anchor="middle"
                fill="#e2e8f0"
                font-size="15">

                DC POWER SUPPLY

            </text>

            <circle id="epPowerLight"
                cx="400" cy="56" r="6"
                fill="#64748b"/>

            <text x="330" y="65"
                text-anchor="middle"
                fill="#f87171"
                font-size="23">+</text>

            <text x="470" y="65"
                text-anchor="middle"
                fill="#38bdf8"
                font-size="23">−</text>

            <!-- Connecting wires -->

            <path d="
                M330 77 V95 H225 V155
                M470 77 V95 H575 V170"

                stroke="#94a3b8"
                stroke-width="4"
                fill="none"/>

            <!-- Electrolyte -->

            <rect x="100" y="205"
                width="600" height="130"
                rx="6"
                fill="${m.solution}"
                opacity=".38"/>

            <!-- Glass container -->

            <path d="
                M95 175 V320
                Q95 340 115 340
                H685 Q705 340 705 320
                V175"

                stroke="#bae6fd"
                stroke-width="3"
                fill="none"/>

            <ellipse cx="400" cy="205"
                rx="300" ry="8"
                fill="#bae6fd"
                opacity=".15"/>

            <!-- Plating metal anode -->

            <rect x="200" y="155"
                width="50" height="50"
                rx="3"
                fill="url(#epMetal)"/>

            <rect id="epAnode"
                x="200" y="205"
                width="50" height="110"
                rx="3"
                fill="url(#epMetal)"
                stroke="#e2e8f0"/>

            <!-- Object support -->

            <path d="M575 170 V203"
                stroke="#94a3b8"
                stroke-width="4"/>

            <!-- Original iron object -->

            <g stroke="#64748b"
                stroke-width="15"
                fill="none">

                ${objectShape(object)}

            </g>

            <!-- Deposited metal coating -->

            <g id="epCoating"
                stroke="${m.color}"
                stroke-width="17"
                fill="none"
                opacity="0">

                ${objectShape(object)}

            </g>

            <!-- Electrode labels -->

            <text x="225" y="140"
                text-anchor="middle"
                fill="#f87171"
                font-size="17">

                ANODE (+)

            </text>

            <text x="575" y="140"
                text-anchor="middle"
                fill="#38bdf8"
                font-size="17">

                CATHODE (−)

            </text>

            <!-- Metal ions in solution -->

            ${Array.from({length:12},(_,i)=>{

                const x = 285+(i*37)%230;
                const y = 225+(i*23)%90;

                return `

                    <g>

                        <circle
                            cx="${x}" cy="${y}"
                            r="13"
                            fill="#fda4af"
                            opacity=".8"/>

                        <text
                            x="${x}" y="${y+4}"
                            text-anchor="middle"
                            font-size="10"
                            fill="#081426">

                            ${m.ion}

                        </text>

                    </g>

                `;

            }).join("")}

            <!-- Animated ion and electron streams -->

            <g id="epParticles"></g>

            <text x="225" y="365"
                text-anchor="middle"
                fill="#e2e8f0"
                font-size="16">

                ${m.name} plate

            </text>

            <text x="575" y="365"
                text-anchor="middle"
                fill="#e2e8f0"
                font-size="16">

                Iron ${object.toLowerCase()}

            </text>

            <text x="400" y="390"
                text-anchor="middle"
                fill="#7dd3fc"
                font-size="15">

                ${m.salt}

            </text>

        </svg>`;
    }

    function selectedMetal() {

        return document.getElementById(
            "epMetalSelect"
        ).value;
    }

    function selectedObject() {

        return document.getElementById(
            "epObjectSelect"
        ).value;
    }

    function stopClock() {

        if (frameRequest !== null) {

            cancelAnimationFrame(frameRequest);

        }

        frameRequest = null;
        lastTime = null;
    }

    function updateProgress() {

        const percent = Math.min(
            progress/DURATION*100,
            100
        );

        document.getElementById(
            "epCoating"
        ).setAttribute(
            "opacity",
            percent/100
        );

        const anode =
            document.getElementById("epAnode");

        anode.setAttribute(
            "width",
            50-percent*.18
        );

        anode.setAttribute(
            "x",
            200+percent*.09
        );

        document.getElementById(
            "epProgressBar"
        ).style.width = percent+"%";

        document.getElementById(
            "epProgressText"
        ).textContent =
            Math.round(percent)+"%";
    }

    function tick(now) {

        if (
            !powered ||
            !document.getElementById("epSVG")
        ) {

            stopClock();
            return;

        }

        if (lastTime===null) {

            lastTime = now;

        }

        const delta = Math.min(
            (now-lastTime)/1000,
            .1
        );

        lastTime = now;

        const playing =
            typeof animationPlaying==="undefined"
                ?true
                :animationPlaying;

        const speed =
            typeof animationSpeed==="undefined"
                ?1
                :Number(animationSpeed)||1;

        if (playing) {

            progress = Math.min(
                DURATION,
                progress+delta*speed
            );

            updateProgress();

        }

        if (progress>=DURATION) {

            setPower(false);

            document.getElementById(
                "epStatus"
            ).textContent =
                "Electroplating complete. The object has a simulated metal coating.";

            return;

        }

        frameRequest =
            requestAnimationFrame(tick);
    }

    function setPower(value) {

        powered = value;

        stopClock();

        if (!document.getElementById("epSVG")) {

            return;

        }

        const m = metals[selectedMetal()];

        document.getElementById(
            "epPowerLight"
        ).setAttribute(
            "fill",
            powered?"#4ade80":"#64748b"
        );

        document.getElementById(
            "epPowerButton"
        ).textContent = powered
            ?"Switch OFF"
            :"Switch ON";

        document.getElementById(
            "epParticles"
        ).innerHTML = powered
            ? particles(
                "M250 245 Q400 220 530 255",
                m.ion,
                "#fda4af",
                7
            )
            + particles(
                "M225 155 V95 H330 V77",
                "e⁻",
                "#facc15",
                4
            )
            + particles(
                "M470 77 V95 H575 V170",
                "e⁻",
                "#facc15",
                4
            )
            : "";

        document.getElementById(
            "epStatus"
        ).textContent = powered
            ?"Electroplating in progress. Metal ions are reduced at the cathode."
            :"Power OFF. Further deposition stops.";

        if (powered) {

            ElectrochemistryAnimations.pause();

            if (typeof playAnimations==="function") {

                playAnimations();

            }

            frameRequest =
                requestAnimationFrame(tick);
        }
    }

    function toggle() {

        if (!powered && progress>=DURATION) {

            reset();

        }

        setPower(!powered);
    }

    function updateReactions() {

        const metal = selectedMetal();
        const m = metals[metal];

        document.getElementById(
            "epReactions"
        ).innerHTML = `

            <div style="
                display:grid;
                grid-template-columns:
                    repeat(auto-fit,minmax(200px,1fr));
                gap:12px">

                <div style="
                    padding:16px;
                    border:1px solid #f87171;
                    border-radius:10px">

                    <strong style="color:#f87171">

                        ANODE — OXIDATION

                    </strong>

                    <p style="font-size:20px">

                        ${metal} → ${m.ion}
                        + ${m.electrons}e⁻

                    </p>

                    <p>

                        The coating metal dissolves
                        into the electrolyte.

                    </p>

                </div>

                <div style="
                    padding:16px;
                    border:1px solid #38bdf8;
                    border-radius:10px">

                    <strong style="color:#38bdf8">

                        CATHODE — REDUCTION

                    </strong>

                    <p style="font-size:20px">

                        ${m.ion} + ${m.electrons}e⁻
                        → ${metal}

                    </p>

                    <p>

                        Metal is deposited on
                        the selected object.

                    </p>

                </div>

            </div>

            <div class="definition"
                style="margin-top:15px">

                <strong>Electrolyte:</strong>
                ${m.salt}

                <br><br>

                <strong>Anode:</strong>
                ${m.name} plate

                <br><br>

                <strong>Cathode:</strong>
                Object to be electroplated

            </div>

        `;
    }

    function reset() {

        stopClock();

        powered = false;
        progress = 0;

        if (!document.getElementById("epDiagram")) {

            return;

        }

        document.getElementById(
            "epDiagram"
        ).innerHTML = diagram(
            selectedMetal(),
            selectedObject()
        );

        setPower(false);

        updateProgress();
        updateReactions();

        document.getElementById(
            "epStatus"
        ).textContent =
            "Ready. Switch ON to begin electroplating.";

        ElectrochemistryAnimations.pause();
    }

    function render() {

        stopClock();

        progress = 0;
        powered = false;

        return `

            <div id="electroplatingLab"
                style="width:100%">

                <!-- Material selection -->

                <div style="
                    display:flex;
                    justify-content:center;
                    flex-wrap:wrap;
                    gap:15px;
                    margin-bottom:12px">

                    <label>

                        Coating metal:

                        <select id="epMetalSelect"
                            onchange="ElectroplatingLab.reset()">

                            <option value="Cu">
                                Copper
                            </option>

                            <option value="Ag">
                                Silver
                            </option>

                            <option value="Ni">
                                Nickel
                            </option>

                        </select>

                    </label>

                    <label>

                        Object:

                        <select id="epObjectSelect"
                            onchange="ElectroplatingLab.reset()">

                            <option value="Ring">
                                Iron Ring
                            </option>

                            <option value="Spoon">
                                Iron Spoon
                            </option>

                            <option value="Key">
                                Iron Key
                            </option>

                        </select>

                    </label>

                </div>

                <div id="epDiagram">

                    ${diagram("Cu","Ring")}

                </div>

                <!-- Coating progress -->

                <div style="
                    padding:15px;
                    border:1px solid #334155;
                    border-radius:10px">

                    <div style="
                        display:flex;
                        justify-content:space-between;
                        align-items:center">

                        Coating progress

                        <strong id="epProgressText"
                            style="
                                font-size:25px;
                                color:#86efac">

                            0%

                        </strong>

                    </div>

                    <div style="
                        height:10px;
                        background:#334155;
                        border-radius:10px;
                        overflow:hidden;
                        margin-top:10px">

                        <div id="epProgressBar"
                            style="
                                height:100%;
                                width:0%;
                                background:#22c55e">

                        </div>

                    </div>

                </div>

                <div id="epStatus"
                    style="
                        text-align:center;
                        color:#86efac;
                        margin:12px">

                    Ready. Switch ON to begin
                    electroplating.

                </div>

                <!-- Experiment controls -->

                <div style="
                    display:flex;
                    justify-content:center;
                    flex-wrap:wrap;
                    gap:12px;
                    margin:12px">

                    <button type="button"
                        id="epPowerButton"
                        onclick="ElectroplatingLab.toggle()">

                        Switch ON

                    </button>

                    <button type="button"
                        onclick="ElectroplatingLab.reset()">

                        Reset Experiment

                    </button>

                </div>

                <div id="epReactions">

                    <div class="definition">

                        <strong>Anode — Oxidation</strong>

                        <p>Cu → Cu²⁺ + 2e⁻</p>

                        <strong>Cathode — Reduction</strong>

                        <p>Cu²⁺ + 2e⁻ → Cu</p>

                        Electrolyte: Copper sulphate

                    </div>

                </div>

                <div style="
                    padding:16px;
                    margin-top:15px;
                    border:1px solid #0e7490;
                    border-radius:10px;
                    background:#164e6333">

                    <strong style="color:#7dd3fc">

                        PURPOSES OF ELECTROPLATING

                    </strong>

                    <p>✓ Improve appearance</p>

                    <p>✓ Protect against corrosion</p>

                    <p>✓ Improve surface properties</p>

                </div>

                <p style="
                    color:#94a3b8;
                    text-align:center;
                    font-size:12px">

                    Idealised virtual demonstration.
                    Coating progress is illustrative,
                    not a measured coating thickness.
                    Real plating requires suitable
                    surface preparation and bath chemistry.

                </p>

            </div>

        `;
    }

    return {
        render,
        toggle,
        reset
    };

})();


/* CONNECT ELECTROPLATING TO SCENES 30 AND 31 */

(() => {

    const previousRender =
        ElectrochemistryAnimations.render;

    ElectrochemistryAnimations.render =
        function(topic) {

            if (
                topic.animation==="electroplating" ||
                topic.animation==="platingSimulator"
            ) {

                return ElectroplatingLab.render();

            }

            return previousRender.call(this,topic);
        };

    const previousReset =
        ElectrochemistryAnimations.reset;

    ElectrochemistryAnimations.reset =
        function() {

            previousReset.call(this);

            if (
                document.getElementById(
                    "electroplatingLab"
                )
            ) {

                ElectroplatingLab.reset();

            }

        };

})();

/* ==========================================
   INTERACTIVE LITHIUM-ION BATTERY LAB
   XYLEM NADAPURAM CHEMISTRY STUDIO
========================================== */

const LithiumBatteryLab = (() => {

    let mode = "discharge";
    let level = 65;
    let running = false;
    let frameRequest = null;
    let lastTime = null;

    function particles(path,text,color,count=5) {

        return Array.from({length:count},(_,i)=>`

            <g>

                <circle r="13"
                    fill="${color}"/>

                <text y="4"
                    text-anchor="middle"
                    font-size="11"
                    font-weight="bold"
                    fill="#081426">

                    ${text}

                </text>

                <animateMotion
                    path="${path}"
                    dur="5s"
                    begin="${-i*5/count}s"
                    repeatCount="indefinite"/>

            </g>

        `).join("");
    }

    function diagram() {

        return `
        <svg id="liBatterySVG"
            viewBox="0 0 800 400"
            xmlns="http://www.w3.org/2000/svg"
            style="width:100%;font-family:Segoe UI,Arial">

            <defs>

                <linearGradient id="liGraphite">

                    <stop stop-color="#334155"/>
                    <stop offset=".5"
                        stop-color="#64748b"/>
                    <stop offset="1"
                        stop-color="#334155"/>

                </linearGradient>

                <linearGradient id="liOxide">

                    <stop stop-color="#7c2d12"/>
                    <stop offset=".5"
                        stop-color="#c2410c"/>
                    <stop offset="1"
                        stop-color="#7c2d12"/>

                </linearGradient>

            </defs>

            <!-- External charger or load -->

            <rect x="305" y="12"
                width="190" height="65"
                rx="10"
                fill="#334155"
                stroke="#64748b"/>

            <text id="liExternalDevice"
                x="400" y="36"
                text-anchor="middle"
                font-size="16"
                fill="#e2e8f0">

                EXTERNAL LOAD

            </text>

            <circle id="liPowerLight"
                cx="400" cy="58"
                r="6"
                fill="#64748b"/>

            <!-- External circuit -->

            <path d="
                M180 145 V45 H305
                M495 45 H620 V145"

                stroke="#94a3b8"
                stroke-width="4"
                fill="none"/>

            <!-- Battery casing -->

            <rect x="75" y="140"
                width="650" height="205"
                rx="15"
                fill="#1e293b"
                stroke="#64748b"
                stroke-width="3"/>

            <!-- Electrolyte -->

            <rect x="100" y="155"
                width="600" height="175"
                rx="10"
                fill="#0284c7"
                opacity=".12"/>

            <!-- Negative electrode -->

            <rect x="100" y="155"
                width="160" height="175"
                rx="6"
                fill="url(#liGraphite)"/>

            <!-- Positive electrode -->

            <rect x="540" y="155"
                width="160" height="175"
                rx="6"
                fill="url(#liOxide)"/>

            <!-- Electrode layers -->

            ${Array.from({length:9},(_,i)=>`

                <path d="
                    M115 ${165+i*19} H245
                    M555 ${165+i*19} H685"

                    stroke="#cbd5e1"
                    stroke-opacity=".35"
                    stroke-width="2"/>

            `).join("")}

            <!-- Separator -->

            <rect x="382" y="150"
                width="36" height="185"
                rx="4"
                fill="#cbd5e1"
                opacity=".7"/>

            ${Array.from({length:9},(_,i)=>`

                <circle cx="400"
                    cy="${165+i*19}"
                    r="4"
                    fill="#334155"
                    opacity=".5"/>

            `).join("")}

            <!-- Lithium ions in electrodes -->

            <g id="liStoredIons"></g>

            <!-- Moving lithium ions and electrons -->

            <g id="liMovingParticles"></g>

            <!-- Electrode labels -->

            <text x="180" y="125"
                text-anchor="middle"
                font-size="16"
                fill="#38bdf8">

                NEGATIVE ELECTRODE (−)

            </text>

            <text x="620" y="125"
                text-anchor="middle"
                font-size="16"
                fill="#f87171">

                POSITIVE ELECTRODE (+)

            </text>

            <text x="180" y="370"
                text-anchor="middle"
                font-size="16"
                fill="#e2e8f0">

                Graphite

            </text>

            <text x="620" y="370"
                text-anchor="middle"
                font-size="16"
                fill="#e2e8f0">

                Lithium metal oxide

            </text>

            <text x="400" y="370"
                text-anchor="middle"
                font-size="14"
                fill="#cbd5e1">

                Separator

            </text>

            <text x="400" y="392"
                text-anchor="middle"
                font-size="12"
                fill="#94a3b8">

                Lithium-ion conducting electrolyte

            </text>

            <text id="liDirection"
                x="400" y="105"
                text-anchor="middle"
                font-size="15"
                fill="#facc15">

                Ready to discharge

            </text>

        </svg>`;
    }

    function stopClock() {

        if (frameRequest !== null) {

            cancelAnimationFrame(frameRequest);

        }

        frameRequest = null;
        lastTime = null;
    }

    function storedIons() {

        const leftCount =
            Math.round(level/100*16);

        let html = "";

        for (let i=0;i<16;i++) {

            const left = i<leftCount;

            const index = left
                ? i
                : i-leftCount;

            const x = (left?120:560)
                +(index%4)*37;

            const y = 180
                +Math.floor(index/4)*39;

            html += `

                <g>

                    <circle
                        cx="${x}"
                        cy="${y}"
                        r="12"
                        fill="#facc15"/>

                    <text
                        x="${x}"
                        y="${y+4}"
                        text-anchor="middle"
                        font-size="10"
                        fill="#422006">

                        Li⁺

                    </text>

                </g>

            `;
        }

        return html;
    }

    function updateBattery() {

        const percent =
            Math.round(level);

        const color = level>20
            ?"#22c55e"
            :"#ef4444";

        document.getElementById(
            "liPercentage"
        ).textContent = percent+"%";

        document.getElementById(
            "liBatteryFill"
        ).style.width = level+"%";

        document.getElementById(
            "liBatteryFill"
        ).style.background = color;

        const stored =
            document.getElementById("liStoredIons");

        const count = Math.round(level/100*16);

        if (stored.dataset.count!==String(count)) {

            stored.innerHTML = storedIons();

            stored.dataset.count = String(count);

        }
    }

    function updateMode() {

        const charging = mode==="charge";

        document.getElementById(
            "liExternalDevice"
        ).textContent = charging
            ?"DC CHARGER"
            :"EXTERNAL LOAD";

        document.getElementById(
            "liPowerLight"
        ).setAttribute(
            "fill",
            running?"#4ade80":"#64748b"
        );

        document.getElementById(
            "liDirection"
        ).textContent = charging
            ?"← Li⁺ and external electron flow"
            :"Li⁺ and external electron flow →";

        document.getElementById(
            "liStartButton"
        ).textContent = running
            ?"Pause Battery"
            :"Start Battery";

        document.getElementById(
            "liChargeMode"
        ).style.background = charging
            ?"#0369a1"
            :"#334155";

        document.getElementById(
            "liDischargeMode"
        ).style.background = charging
            ?"#334155"
            :"#0369a1";

        document.getElementById(
            "liMovingParticles"
        ).innerHTML = running
            ? particles(
                charging
                    ?"M540 240 H260"
                    :"M260 240 H540",
                "Li⁺",
                "#facc15",
                7
            )
            + particles(
                charging
                    ?"M620 145 V45 H495"
                    :"M495 45 H620 V145",
                "e⁻",
                "#7dd3fc",
                4
            )
            + particles(
                charging
                    ?"M305 45 H180 V145"
                    :"M180 145 V45 H305",
                "e⁻",
                "#7dd3fc",
                4
            )
            : "";

        document.getElementById(
            "liExplanation"
        ).innerHTML = charging
            ?`

                <strong style="color:#86efac">

                    CHARGING MODE

                </strong>

                <p>

                    Electrical energy is converted
                    into stored chemical energy.

                </p>

                <p>

                    Li⁺ ions move from the positive
                    electrode to the negative electrode
                    through the electrolyte.

                </p>

                <p>

                    Electrons move through the
                    external charging circuit.

                </p>

            `
            :`

                <strong style="color:#7dd3fc">

                    DISCHARGING MODE

                </strong>

                <p>

                    Chemical energy is converted
                    into electrical energy.

                </p>

                <p>

                    Li⁺ ions move from the negative
                    electrode to the positive electrode
                    through the electrolyte.

                </p>

                <p>

                    Electrons flow through the
                    external circuit and power
                    the connected device.

                </p>

            `;

        ElectrochemistryAnimations.pause();
    }

    function tick(now) {

        if (
            !running ||
            !document.getElementById("liBatterySVG")
        ) {

            stopClock();
            return;

        }

        if (lastTime===null) {

            lastTime = now;

        }

        const delta = Math.min(
            (now-lastTime)/1000,
            .1
        );

        lastTime = now;

        const playing =
            typeof animationPlaying==="undefined"
                ?true
                :animationPlaying;

        const speed =
            typeof animationSpeed==="undefined"
                ?1
                :Number(animationSpeed)||1;

        if (playing) {

            const change = delta*speed*2.5;

            level = mode==="charge"
                ?Math.min(100,level+change)
                :Math.max(0,level-change);

            updateBattery();

        }

        if (
            (mode==="charge" && level>=100) ||
            (mode==="discharge" && level<=0)
        ) {

            running = false;

            stopClock();
            updateMode();

            document.getElementById(
                "liStatus"
            ).textContent = mode==="charge"
                ?"Battery fully charged."
                :"Battery discharged. Select charging mode.";

            return;

        }

        frameRequest =
            requestAnimationFrame(tick);
    }

    function setMode(value) {

        if (!document.getElementById("liBatterySVG")) {

            return;

        }

        mode = value;

        running = false;

        stopClock();
        updateMode();

        document.getElementById(
            "liStatus"
        ).textContent =
            "Mode selected. Press Start Battery.";

    }

    function toggle() {

        if (
            (mode==="charge" && level>=100) ||
            (mode==="discharge" && level<=0)
        ) {

            document.getElementById(
                "liStatus"
            ).textContent =
                "Select the opposite operating mode.";

            return;

        }

        running = !running;

        stopClock();
        updateMode();

        document.getElementById(
            "liStatus"
        ).textContent = running
            ?mode==="charge"
                ?"Battery charging..."
                :"Battery supplying electrical energy..."
            :"Battery simulation paused.";

        if (running) {

            if (typeof playAnimations==="function") {

                playAnimations();

            }

            frameRequest =
                requestAnimationFrame(tick);

        }
    }

    function reset() {

        stopClock();

        running = false;
        level = 65;
        mode = "discharge";

        if (!document.getElementById("liBatterySVG")) {

            return;

        }

        updateBattery();
        updateMode();

        document.getElementById(
            "liStatus"
        ).textContent =
            "Ready. Select an operating mode.";

    }

    function render() {

        stopClock();

        running = false;
        level = 65;
        mode = "discharge";

        const svg = diagram().replace(
            '<g id="liStoredIons"></g>',
            `<g id="liStoredIons"
                data-count="10">
                ${storedIons()}
            </g>`
        );

        return `

            <div id="lithiumBatteryLab"
                style="width:100%">

                <!-- Battery dashboard -->

                <div style="
                    padding:16px;
                    border:1px solid #334155;
                    border-radius:12px;
                    margin-bottom:15px">

                    <div style="
                        display:flex;
                        align-items:center;
                        justify-content:space-between">

                        BATTERY CHARGE

                        <strong id="liPercentage"
                            style="
                                font-size:32px;
                                color:#86efac">

                            65%

                        </strong>

                    </div>

                    <div style="
                        height:24px;
                        border:2px solid #64748b;
                        border-radius:7px;
                        padding:3px;
                        overflow:hidden">

                        <div id="liBatteryFill"
                            style="
                                height:100%;
                                width:65%;
                                background:#22c55e;
                                border-radius:3px">

                        </div>

                    </div>

                </div>

                <!-- Mode selection -->

                <div style="
                    display:flex;
                    justify-content:center;
                    flex-wrap:wrap;
                    gap:12px;
                    margin:12px">

                    <button type="button"
                        id="liDischargeMode"
                        style="background:#0369a1"
                        onclick="LithiumBatteryLab.setMode('discharge')">

                        Discharging Mode

                    </button>

                    <button type="button"
                        id="liChargeMode"
                        style="background:#334155"
                        onclick="LithiumBatteryLab.setMode('charge')">

                        Charging Mode

                    </button>

                </div>

                ${svg}

                <!-- Legend -->

                <div style="
                    display:flex;
                    justify-content:center;
                    flex-wrap:wrap;
                    gap:20px;
                    margin:12px">

                    <span style="color:#facc15">

                        ● Lithium ions (Li⁺)

                    </span>

                    <span style="color:#7dd3fc">

                        ● Electrons (e⁻)

                    </span>

                </div>

                <div id="liStatus"
                    style="
                        color:#86efac;
                        text-align:center;
                        margin:12px">

                    Ready. Select an operating mode.

                </div>

                <!-- Controls -->

                <div style="
                    display:flex;
                    justify-content:center;
                    flex-wrap:wrap;
                    gap:12px;
                    margin:12px">

                    <button type="button"
                        id="liStartButton"
                        onclick="LithiumBatteryLab.toggle()">

                        Start Battery

                    </button>

                    <button type="button"
                        onclick="LithiumBatteryLab.reset()">

                        Reset Battery

                    </button>

                </div>

                <div id="liExplanation"
                    class="definition">

                    <strong>DISCHARGING MODE</strong>

                    <p>

                        Chemical energy is converted
                        into electrical energy.

                    </p>

                    <p>

                        Lithium ions move from the
                        negative electrode to the
                        positive electrode.

                    </p>

                </div>

                <!-- Advantages -->

                <div style="
                    padding:16px;
                    border:1px solid #0e7490;
                    background:#164e6333;
                    border-radius:10px;
                    margin-top:15px">

                    <strong style="color:#7dd3fc">

                        ADVANTAGES OF Li-ion BATTERIES

                    </strong>

                    <p>✓ High energy density</p>

                    <p>✓ Rechargeable</p>

                    <p>✓ Long service life</p>

                    <p>✓ Low self-discharge</p>

                    <strong>Applications</strong>

                    <p>

                        Mobile phones, laptops,
                        electric vehicles and satellites.

                    </p>

                </div>

                <p style="
                    color:#94a3b8;
                    font-size:12px;
                    text-align:center">

                    Simplified lithium-ion battery model.
                    Charging rates and battery percentage
                    are illustrative simulation values.

                </p>

            </div>

        `;
    }

    return {
        render,
        setMode,
        toggle,
        reset
    };

})();


/* CONNECT LITHIUM BATTERY LAB TO SCENE 36 */

(() => {

    const previousRender =
        ElectrochemistryAnimations.render;

    ElectrochemistryAnimations.render =
        function(topic) {

            if (topic.animation==="lithiumBattery") {

                return LithiumBatteryLab.render();

            }

            return previousRender.call(this,topic);
        };

    const previousReset =
        ElectrochemistryAnimations.reset;

    ElectrochemistryAnimations.reset =
        function() {

            previousReset.call(this);

            if (
                document.getElementById(
                    "lithiumBatteryLab"
                )
            ) {

                LithiumBatteryLab.reset();

            }

        };

})();

/* ==========================================
   INTERACTIVE HYDROGEN FUEL CELL LAB
   XYLEM NADAPURAM CHEMISTRY STUDIO
========================================== */

const FuelCellLab = (() => {

    function particles(
        path,text,color,count=5,duration=5
    ) {

        return Array.from({length:count},(_,i)=>`

            <g>

                <circle r="13"
                    fill="${color}"
                    stroke="#e2e8f0"
                    stroke-width=".5"/>

                <text y="4"
                    text-anchor="middle"
                    font-size="11"
                    font-weight="bold"
                    fill="#081426">

                    ${text}

                </text>

                <animateMotion
                    path="${path}"
                    dur="${duration}s"
                    begin="${-i*duration/count}s"
                    repeatCount="indefinite"/>

            </g>

        `).join("");
    }

    function diagram(hydrogen,oxygen,connected) {

        const active =
            hydrogen && oxygen && connected;

        return `
        <svg viewBox="0 0 800 420"
            xmlns="http://www.w3.org/2000/svg"
            style="width:100%;font-family:Segoe UI,Arial">

            <defs>

                <linearGradient id="fcElectrode">

                    <stop stop-color="#334155"/>
                    <stop offset=".5"
                        stop-color="#94a3b8"/>
                    <stop offset="1"
                        stop-color="#334155"/>

                </linearGradient>

                <linearGradient id="fcMembrane">

                    <stop stop-color="#0369a1"/>
                    <stop offset=".5"
                        stop-color="#7dd3fc"/>
                    <stop offset="1"
                        stop-color="#0369a1"/>

                </linearGradient>

                <radialGradient id="fcGlow">

                    <stop stop-color="#fde047"
                        stop-opacity=".7"/>

                    <stop offset="1"
                        stop-color="#fde047"
                        stop-opacity="0"/>

                </radialGradient>

            </defs>

            <!-- Electricity generation -->

            ${active ? `

                <circle cx="400" cy="65"
                    r="65"
                    fill="url(#fcGlow)">

                    <animate
                        attributeName="opacity"
                        values=".6;1;.6"
                        dur="2s"
                        repeatCount="indefinite"/>

                </circle>

            ` : ""}

            <text x="400" y="20"
                text-anchor="middle"
                fill="#e2e8f0"
                font-size="16"
                letter-spacing="2">

                ELECTRICAL ENERGY

            </text>

            <!-- External circuit -->

            <path d="
                M275 175 V65 H370
                M430 65 H525 V175"

                stroke="#94a3b8"
                stroke-width="4"
                fill="none"/>

            <!-- LED -->

            <circle cx="400" cy="65"
                r="30"
                fill="${active
                    ?"#fde047"
                    :"#334155"}"
                stroke="#94a3b8"
                stroke-width="2"/>

            <path d="
                M387 55
                L400 75
                L413 55"

                stroke="${active
                    ?"#854d0e"
                    :"#64748b"}"
                stroke-width="3"
                fill="none"/>

            <!-- Circuit switch -->

            <rect x="307" y="54"
                width="35" height="22"
                fill="#091525"/>

            <circle cx="310" cy="65"
                r="4" fill="#cbd5e1"/>

            <circle cx="340" cy="65"
                r="4" fill="#cbd5e1"/>

            <path d="${connected
                ?"M310 65 H340"
                :"M310 65 L337 45"}"

                stroke="#e2e8f0"
                stroke-width="4"
                stroke-linecap="round"/>

            <!-- Fuel cell casing -->

            <rect x="220" y="170"
                width="360" height="190"
                rx="14"
                fill="#1e293b"
                stroke="#64748b"
                stroke-width="2"/>

            <!-- Hydrogen supply channel -->

            <path d="M25 220 H245"

                stroke="#38bdf8"
                stroke-width="20"
                stroke-opacity="${hydrogen?.6:.12}"
                fill="none"/>

            <!-- Oxygen supply channel -->

            <path d="M775 220 H555"

                stroke="#f87171"
                stroke-width="20"
                stroke-opacity="${oxygen?.6:.12}"
                fill="none"/>

            <!-- Anode -->

            <rect x="255" y="180"
                width="40" height="170"
                rx="5"
                fill="url(#fcElectrode)"
                stroke="#94a3b8"/>

            <!-- Cathode -->

            <rect x="505" y="180"
                width="40" height="170"
                rx="5"
                fill="url(#fcElectrode)"
                stroke="#94a3b8"/>

            <!-- Proton exchange membrane -->

            <rect x="375" y="180"
                width="50" height="170"
                rx="5"
                fill="url(#fcMembrane)"
                opacity=".75"/>

            ${Array.from({length:8},(_,i)=>`

                <circle cx="400"
                    cy="${195+i*20}"
                    r="5"
                    fill="#082f49"
                    opacity=".6"/>

            `).join("")}

            <!-- Electrode labels -->

            <text x="275" y="155"
                text-anchor="middle"
                font-size="17"
                fill="#7dd3fc">

                ANODE (−)

            </text>

            <text x="525" y="155"
                text-anchor="middle"
                font-size="17"
                fill="#fca5a5">

                CATHODE (+)

            </text>

            <text x="110" y="190"
                text-anchor="middle"
                font-size="17"
                fill="#7dd3fc">

                Hydrogen (H₂)

            </text>

            <text x="690" y="190"
                text-anchor="middle"
                font-size="17"
                fill="#fca5a5">

                Oxygen (O₂)

            </text>

            <!-- Reactant molecules -->

            ${hydrogen ? particles(
                "M35 220 H245",
                "H₂",
                "#bae6fd",
                5
            ) : ""}

            ${oxygen ? particles(
                "M765 220 H555",
                "O₂",
                "#fca5a5",
                5
            ) : ""}

            ${active ? `

                <!-- Electrons in external circuit -->

                ${particles(
                    "M275 175 V65 H370",
                    "e⁻",
                    "#7dd3fc",
                    5,
                    4
                )}

                ${particles(
                    "M430 65 H525 V175",
                    "e⁻",
                    "#7dd3fc",
                    5,
                    4
                )}

                <!-- Proton migration -->

                ${particles(
                    "M295 250 H505",
                    "H⁺",
                    "#facc15",
                    6
                )}

                ${particles(
                    "M295 300 H505",
                    "H⁺",
                    "#facc15",
                    5
                )}

                <text x="400" y="205"
                    text-anchor="middle"
                    font-size="12"
                    fill="#facc15">

                    H⁺ movement →

                </text>

                <!-- Water outlet -->

                <path d="
                    M545 300 H675 V345"

                    stroke="#38bdf8"
                    stroke-width="16"
                    stroke-opacity=".5"
                    fill="none"/>

                ${particles(
                    "M545 300 H675 V345",
                    "H₂O",
                    "#7dd3fc",
                    5,
                    4
                )}

                <text x="680" y="280"
                    text-anchor="middle"
                    font-size="16"
                    fill="#7dd3fc">

                    Water

                </text>

                <!-- Water droplets -->

                ${Array.from({length:5},(_,i)=>`

                    <path d="
                        M675 345
                        Q663 360 675 365
                        Q687 360 675 345"

                        fill="#38bdf8">

                        <animateTransform
                            attributeName="transform"
                            type="translate"
                            from="0 0"
                            to="0 35"
                            dur="2s"
                            begin="${-i*.4}s"
                            repeatCount="indefinite"/>

                        <animate
                            attributeName="opacity"
                            values="0;1;0"
                            dur="2s"
                            begin="${-i*.4}s"
                            repeatCount="indefinite"/>

                    </path>

                `).join("")}

            ` : ""}

            <!-- Supply indicators -->

            <text x="110" y="255"
                text-anchor="middle"
                font-size="13"
                fill="${hydrogen
                    ?"#86efac"
                    :"#fca5a5"}">

                ${hydrogen
                    ?"SUPPLY ON"
                    :"SUPPLY OFF"}

            </text>

            <text x="690" y="255"
                text-anchor="middle"
                font-size="13"
                fill="${oxygen
                    ?"#86efac"
                    :"#fca5a5"}">

                ${oxygen
                    ?"SUPPLY ON"
                    :"SUPPLY OFF"}

            </text>

            <text x="400" y="385"
                text-anchor="middle"
                font-size="16"
                fill="#e2e8f0">

                Proton Exchange Membrane

            </text>

            <text x="400" y="408"
                text-anchor="middle"
                font-size="13"
                fill="#94a3b8">

                Allows H⁺ ions to pass
                but blocks electrons

            </text>

        </svg>`;
    }

    function render() {

        return `

            <div id="fuelCellLab"
                data-hydrogen="false"
                data-oxygen="false"
                data-connected="true"
                style="width:100%">

                <div id="fcDiagram">

                    ${diagram(false,false,true)}

                </div>

                <!-- Supply controls -->

                <div style="
                    display:grid;
                    grid-template-columns:
                        repeat(auto-fit,minmax(150px,1fr));
                    gap:12px;
                    margin:15px 0">

                    <div style="
                        padding:14px;
                        border:1px solid #38bdf8;
                        border-radius:10px;
                        text-align:center">

                        <strong style="color:#7dd3fc">

                            HYDROGEN SUPPLY

                        </strong>

                        <p>Fuel — H₂</p>

                        <button type="button"
                            id="fcHydrogenButton"
                            onclick="FuelCellLab.toggle('hydrogen')">

                            Switch ON

                        </button>

                    </div>

                    <div style="
                        padding:14px;
                        border:1px solid #f87171;
                        border-radius:10px;
                        text-align:center">

                        <strong style="color:#fca5a5">

                            OXYGEN SUPPLY

                        </strong>

                        <p>Oxidant — O₂</p>

                        <button type="button"
                            id="fcOxygenButton"
                            onclick="FuelCellLab.toggle('oxygen')">

                            Switch ON

                        </button>

                    </div>

                    <div style="
                        padding:14px;
                        border:1px solid #64748b;
                        border-radius:10px;
                        text-align:center">

                        <strong>

                            EXTERNAL CIRCUIT

                        </strong>

                        <p>Electrical load</p>

                        <button type="button"
                            id="fcCircuitButton"
                            onclick="FuelCellLab.toggle('connected')">

                            Disconnect

                        </button>

                    </div>

                </div>

                <!-- Output dashboard -->

                <div style="
                    padding:18px;
                    border:1px solid #334155;
                    border-radius:12px;
                    text-align:center">

                    ELECTRICITY GENERATION

                    <div id="fcOutput"
                        style="
                            font-size:28px;
                            font-weight:bold;
                            color:#94a3b8;
                            margin:10px">

                        INACTIVE

                    </div>

                    <div id="fcStatus">

                        Enable hydrogen and oxygen
                        supplies to begin.

                    </div>

                </div>

                <!-- Main controls -->

                <div style="
                    display:flex;
                    justify-content:center;
                    flex-wrap:wrap;
                    gap:12px;
                    margin:15px">

                    <button type="button"
                        onclick="FuelCellLab.start()">

                        Start Fuel Cell

                    </button>

                    <button type="button"
                        onclick="FuelCellLab.reset()">

                        Reset Experiment

                    </button>

                </div>

                <!-- Chemical reactions -->

                <div id="fcReactions"
                    style="display:none">

                    <div style="
                        display:grid;
                        grid-template-columns:
                            repeat(auto-fit,minmax(220px,1fr));
                        gap:12px">

                        <div style="
                            padding:16px;
                            border:1px solid #38bdf8;
                            border-radius:10px">

                            <strong style="color:#7dd3fc">

                                ANODE — OXIDATION

                            </strong>

                            <p style="font-size:20px">

                                2H₂ → 4H⁺ + 4e⁻

                            </p>

                            <p>

                                Hydrogen loses electrons
                                and forms hydrogen ions.

                            </p>

                        </div>

                        <div style="
                            padding:16px;
                            border:1px solid #f87171;
                            border-radius:10px">

                            <strong style="color:#fca5a5">

                                CATHODE — REDUCTION

                            </strong>

                            <p style="font-size:20px">

                                O₂ + 4H⁺ + 4e⁻ → 2H₂O

                            </p>

                            <p>

                                Oxygen combines with
                                protons and electrons
                                to form water.

                            </p>

                        </div>

                    </div>

                    <div style="
                        padding:18px;
                        margin-top:15px;
                        border:1px solid #0e7490;
                        background:#164e6333;
                        border-radius:10px;
                        text-align:center">

                        <strong>

                            OVERALL REACTION

                        </strong>

                        <p style="
                            font-size:24px;
                            color:#86efac">

                            2H₂ + O₂ → 2H₂O

                        </p>

                        Chemical energy is converted
                        into electrical energy and heat.

                    </div>

                </div>

                <!-- Advantages -->

                <div style="
                    padding:16px;
                    border:1px solid #0e7490;
                    background:#164e6333;
                    border-radius:10px;
                    margin-top:15px">

                    <strong style="color:#7dd3fc">

                        ADVANTAGES OF FUEL CELLS

                    </strong>

                    <p>✓ High energy conversion efficiency</p>

                    <p>✓ Continuous operation with fuel supply</p>

                    <p>✓ Quiet operation</p>

                    <p>✓ Water is the direct reaction product
                        of a hydrogen fuel cell</p>

                    <strong>Applications</strong>

                    <p>

                        Fuel cell vehicles,
                        spacecraft and backup
                        power generation.

                    </p>

                </div>

                <p style="
                    color:#94a3b8;
                    text-align:center;
                    font-size:12px">

                    Simplified virtual PEM fuel cell.
                    Actual performance depends on
                    operating conditions and fuel purity.

                </p>

            </div>

        `;
    }

    function update() {

        const lab =
            document.getElementById("fuelCellLab");

        if (!lab) return;

        const hydrogen =
            lab.dataset.hydrogen==="true";

        const oxygen =
            lab.dataset.oxygen==="true";

        const connected =
            lab.dataset.connected==="true";

        const active =
            hydrogen && oxygen && connected;

        document.getElementById(
            "fcDiagram"
        ).innerHTML = diagram(
            hydrogen,
            oxygen,
            connected
        );

        document.getElementById(
            "fcHydrogenButton"
        ).textContent = hydrogen
            ?"Switch OFF"
            :"Switch ON";

        document.getElementById(
            "fcOxygenButton"
        ).textContent = oxygen
            ?"Switch OFF"
            :"Switch ON";

        document.getElementById(
            "fcCircuitButton"
        ).textContent = connected
            ?"Disconnect"
            :"Connect";

        const output =
            document.getElementById("fcOutput");

        output.textContent = active
            ?"GENERATING POWER"
            :"INACTIVE";

        output.style.color = active
            ?"#86efac"
            :"#94a3b8";

        document.getElementById(
            "fcReactions"
        ).style.display = active
            ?"block"
            :"none";

        const status =
            document.getElementById("fcStatus");

        if (active) {

            status.textContent =
                "Fuel cell operating. Electricity, water and heat are produced.";

        } else if (!hydrogen) {

            status.textContent =
                "Hydrogen supply is OFF.";

        } else if (!oxygen) {

            status.textContent =
                "Oxygen supply is OFF.";

        } else {

            status.textContent =
                "External circuit is disconnected. No sustained current flows.";

        }

        ElectrochemistryAnimations.pause();

        if (
            active &&
            typeof playAnimations==="function"
        ) {

            playAnimations();

        }
    }

    function toggle(key) {

        const lab =
            document.getElementById("fuelCellLab");

        if (!lab) return;

        lab.dataset[key] = String(
            lab.dataset[key]!=="true"
        );

        update();
    }

    function start() {

        const lab =
            document.getElementById("fuelCellLab");

        if (!lab) return;

        lab.dataset.hydrogen = "true";
        lab.dataset.oxygen = "true";
        lab.dataset.connected = "true";

        update();
    }

    function reset() {

        const lab =
            document.getElementById("fuelCellLab");

        if (!lab) return;

        lab.dataset.hydrogen = "false";
        lab.dataset.oxygen = "false";
        lab.dataset.connected = "true";

        update();
    }

    return {
        render,
        toggle,
        start,
        reset
    };

})();


/* CONNECT FUEL CELL LAB TO SCENE 37 */

(() => {

    const previousRender =
        ElectrochemistryAnimations.render;

    ElectrochemistryAnimations.render =
        function(topic) {

            if (topic.animation==="fuelCell") {

                return FuelCellLab.render();

            }

            return previousRender.call(this,topic);
        };

    const previousReset =
        ElectrochemistryAnimations.reset;

    ElectrochemistryAnimations.reset =
        function() {

            previousReset.call(this);

            if (
                document.getElementById(
                    "fuelCellLab"
                )
            ) {

                FuelCellLab.reset();

            }

        };

})();

/* ==========================================
   INTERACTIVE REACTIVITY SERIES
   XYLEM NADAPURAM CHEMISTRY STUDIO
========================================== */

const ReactivitySeriesLab = (() => {

    const elements = [

        ["K",  "Potassium"],
        ["Na", "Sodium"],
        ["Ca", "Calcium"],
        ["Mg", "Magnesium"],
        ["Al", "Aluminium"],
        ["Zn", "Zinc"],
        ["Fe", "Iron"],
        ["Ni", "Nickel"],
        ["Sn", "Tin"],
        ["Pb", "Lead"],
        ["H",  "Hydrogen"],
        ["Cu", "Copper"],
        ["Hg", "Mercury"],
        ["Ag", "Silver"],
        ["Au", "Gold"]

    ];

    function color(index) {

        if (index<5) return "#f87171";
        if (index<10) return "#fbbf24";
        if (index===10) return "#facc15";

        return "#4ade80";
    }

    function options(selected) {

        return elements.map(e=>`

            <option value="${e[0]}"
                ${e[0]===selected?"selected":""}>

                ${e[1]} (${e[0]})

            </option>

        `).join("");
    }

    function series(selected="Zn") {

        return elements.map((e,i)=>`

            <button type="button"
                onclick="ReactivitySeriesLab.select('${e[0]}')"

                style="
                    width:100%;
                    display:grid;
                    grid-template-columns:
                        55px 1fr 65px;
                    align-items:center;
                    gap:10px;
                    text-align:left;
                    padding:10px 14px;
                    border-radius:8px;
                    border:1px solid
                        ${e[0]===selected
                            ?color(i)
                            :"#334155"};
                    background:
                        ${i===10
                            ?"#854d0e44"
                            :"#1e293b"};
                    cursor:pointer">

                <strong style="
                    font-size:22px;
                    color:${color(i)}">

                    ${e[0]}

                </strong>

                <span style="color:#e2e8f0">

                    ${e[1]}

                    ${i===10 ? `

                        <small style="
                            display:block;
                            color:#facc15">

                            Reference element

                        </small>

                    ` : ""}

                </span>

                <span style="
                    height:7px;
                    background:#334155;
                    border-radius:8px;
                    overflow:hidden">

                    <span style="
                        display:block;
                        height:100%;
                        width:${(15-i)/15*100}%;
                        background:${color(i)};
                        border-radius:8px">

                    </span>

                </span>

            </button>

        `).join("");
    }

    function render() {

        return `

            <div id="reactivitySeriesLab"
                style="width:100%">

                <!-- Heading -->

                <div style="
                    padding:16px;
                    border:1px solid #0e7490;
                    border-radius:12px;
                    background:#164e6333;
                    text-align:center;
                    margin-bottom:15px">

                    <strong style="
                        font-size:21px;
                        color:#7dd3fc">

                        INTERACTIVE REACTIVITY SERIES

                    </strong>

                    <p>

                        Select any element to explore
                        its relative reactivity.

                    </p>

                </div>

                <!-- Main responsive layout -->

                <div style="
                    display:grid;
                    grid-template-columns:
                        repeat(auto-fit,minmax(
                            min(100%,300px),1fr
                        ));
                    align-items:start;
                    gap:18px">

                    <!-- Reactivity series -->

                    <div>

                        <div style="
                            color:#f87171;
                            font-weight:bold;
                            text-align:center;
                            margin:10px">

                            ↑ INCREASING REACTIVITY

                        </div>

                        <div id="rsElements"
                            style="
                                display:grid;
                                gap:6px">

                            ${series("Zn")}

                        </div>

                        <div style="
                            color:#4ade80;
                            font-weight:bold;
                            text-align:center;
                            margin:10px">

                            ↓ DECREASING REACTIVITY

                        </div>

                    </div>

                    <!-- Comparison panel -->

                    <div style="
                        display:grid;
                        gap:15px">

                        <div style="
                            padding:16px;
                            border:1px solid #334155;
                            border-radius:12px">

                            <strong style="color:#7dd3fc">

                                COMPARE REACTIVITY

                            </strong>

                            <p>First element</p>

                            <select id="rsFirst"
                                style="width:100%"
                                onchange="ReactivitySeriesLab.update()">

                                ${options("Zn")}

                            </select>

                            <p>Second element</p>

                            <select id="rsSecond"
                                style="width:100%"
                                onchange="ReactivitySeriesLab.update()">

                                ${options("Cu")}

                            </select>

                            <button type="button"
                                style="
                                    width:100%;
                                    margin-top:15px"
                                onclick="ReactivitySeriesLab.update()">

                                Compare Elements

                            </button>

                        </div>

                        <!-- Prediction result -->

                        <div id="rsPrediction"
                            class="definition">

                            Zinc is more reactive
                            than copper.

                        </div>

                        <!-- Acid reaction -->

                        <div id="rsAcid"
                            class="definition">

                            Zinc can displace hydrogen
                            from dilute hydrochloric acid.

                        </div>

                        <!-- Important concepts -->

                        <div style="
                            padding:16px;
                            border:1px solid #334155;
                            border-radius:10px">

                            <strong style="color:#facc15">

                                REMEMBER

                            </strong>

                            <p>

                                A more reactive metal
                                can displace a less reactive
                                metal from its salt solution
                                under suitable conditions.

                            </p>

                            <p>

                                Metals above hydrogen
                                generally displace hydrogen
                                from dilute non-oxidising acids.

                            </p>

                            <p>

                                More reactive metals
                                generally lose electrons
                                more readily.

                            </p>

                        </div>

                        <!-- Reset -->

                        <button type="button"
                            onclick="ReactivitySeriesLab.reset()">

                            Reset Comparison

                        </button>

                    </div>

                </div>

                <p style="
                    color:#94a3b8;
                    text-align:center;
                    font-size:12px">

                    Reactivity bars represent relative
                    positions, not quantitative reaction
                    rates or electrode potentials.

                </p>

            </div>

        `;
    }

    function update() {

        const first =
            document.getElementById("rsFirst");

        const second =
            document.getElementById("rsSecond");

        if (!first || !second) return;

        const a = first.value;
        const b = second.value;

        const ai = elements.findIndex(
            e=>e[0]===a
        );

        const bi = elements.findIndex(
            e=>e[0]===b
        );

        const nameA = elements[ai][1];
        const nameB = elements[bi][1];

        document.getElementById(
            "rsElements"
        ).innerHTML = series(a);

        const result =
            document.getElementById("rsPrediction");

        const acid =
            document.getElementById("rsAcid");

        /* Reactivity comparison */

        if (ai===bi) {

            result.innerHTML = `

                <strong style="color:#facc15">

                    SAME ELEMENT

                </strong>

                <p>

                    Both selections occupy
                    the same position in
                    the reactivity series.

                </p>

            `;

        } else {

            const more = ai<bi?nameA:nameB;
            const less = ai<bi?nameB:nameA;

            let explanation = "";

            if (a==="H" || b==="H") {

                explanation = `

                    Hydrogen is the reference
                    element used to predict
                    hydrogen displacement.

                `;

            } else if (ai<bi) {

                explanation = `

                    ${nameA} can theoretically
                    displace ${nameB} from its
                    salt under suitable conditions.

                `;

            } else {

                explanation = `

                    ${nameA} cannot normally
                    displace ${nameB} from
                    its salt solution.

                `;

            }

            result.innerHTML = `

                <strong style="color:#86efac">

                    REACTIVITY COMPARISON

                </strong>

                <p style="font-size:21px">

                    ${more} > ${less}

                </p>

                <p>${explanation}</p>

            `;

            /* Special cases */

            if (["K","Na","Ca"].includes(a)
                && a!=="H" && b!=="H") {

                result.innerHTML += `

                    <p style="color:#fbbf24">

                        Important: This metal also
                        reacts with water, so ordinary
                        aqueous displacement predictions
                        have limitations.

                    </p>

                `;

            }

            if (a==="Al") {

                result.innerHTML += `

                    <p style="color:#fbbf24">

                        Aluminium's protective oxide
                        layer can inhibit reactions.

                    </p>

                `;

            }

        }

        /* Hydrogen displacement */

        if (a==="H") {

            acid.innerHTML = `

                <strong style="color:#facc15">

                    HYDROGEN — REFERENCE

                </strong>

                <p>

                    Hydrogen is a non-metal
                    included in the reactivity
                    series for comparison.

                </p>

            `;

        } else if (ai<10) {

            acid.innerHTML = `

                <strong style="color:#86efac">

                    ABOVE HYDROGEN

                </strong>

                <p>

                    ${nameA} is above hydrogen
                    in the reactivity series.

                </p>

                <p>

                    Hydrogen displacement from
                    dilute non-oxidising acids
                    is favoured.

                </p>

                ${a==="Pb" ? `

                    <p style="color:#fbbf24">

                        Lead chloride coating may
                        inhibit further reaction
                        with hydrochloric acid.

                    </p>

                ` : ""}

                ${["K","Na","Ca"].includes(a) ? `

                    <p style="color:#fbbf24">

                        Highly reactive metal.
                        Virtual comparison only.

                    </p>

                ` : ""}

            `;

        } else {

            acid.innerHTML = `

                <strong style="color:#fca5a5">

                    BELOW HYDROGEN

                </strong>

                <p>

                    ${nameA} is below hydrogen
                    in the reactivity series.

                </p>

                <p>

                    It does not normally displace
                    hydrogen from dilute
                    hydrochloric acid.

                </p>

            `;

        }

    }

    function select(symbol) {

        const first =
            document.getElementById("rsFirst");

        if (!first) return;

        first.value = symbol;

        update();
    }

    function reset() {

        const first =
            document.getElementById("rsFirst");

        const second =
            document.getElementById("rsSecond");

        if (!first || !second) return;

        first.value = "Zn";
        second.value = "Cu";

        update();
    }

    return {
        render,
        update,
        select,
        reset
    };

})();


/* REGISTER REACTIVITY SERIES LAB */

(() => {

    const previousRender =
        ElectrochemistryAnimations.render;

    ElectrochemistryAnimations.render =
        function(topic) {

            if (topic.animation==="reactivitySeries") {

                return ReactivitySeriesLab.render();

            }

            return previousRender.call(this,topic);
        };

    const previousReset =
        ElectrochemistryAnimations.reset;

    ElectrochemistryAnimations.reset =
        function() {

            previousReset.call(this);

            if (
                document.getElementById(
                    "reactivitySeriesLab"
                )
            ) {

                ReactivitySeriesLab.reset();

            }

        };

})();

/* ==========================================
   PRIMARY AND SECONDARY CELL LAB
   XYLEM NADAPURAM CHEMISTRY STUDIO
========================================== */

const BatteryComparisonLab = (() => {

    const cells = {

        dry: {
            name:"Dry Cell",
            type:"Primary",
            voltage:"1.5 V",
            rechargeable:false,
            shape:"cylinder",
            label:"DRY CELL",
            color:"#d97706",
            uses:"Wall clocks, torches and remote controls.",
            description:
                "A primary cell designed for single use. Its chemical reactants are consumed during discharge."
        },

        button: {
            name:"Button Cell",
            type:"Primary",
            voltage:"3 V (example)",
            rechargeable:false,
            shape:"button",
            label:"BUTTON CELL",
            color:"#94a3b8",
            uses:"Watches, calculators and small electronic devices.",
            description:
                "A compact primary cell suitable for small electronic devices."
        },

        lead: {
            name:"Lead-acid Battery",
            type:"Secondary",
            voltage:"12 V (6 cells)",
            rechargeable:true,
            shape:"lead",
            label:"LEAD-ACID",
            color:"#475569",
            uses:"Automobiles, UPS systems and inverters.",
            description:
                "A rechargeable battery containing lead-based electrodes and sulphuric acid electrolyte."
        },

        nicd: {
            name:"Nickel-cadmium Battery",
            type:"Secondary",
            voltage:"1.2 V",
            rechargeable:true,
            shape:"cylinder",
            label:"Ni-Cd",
            color:"#16a34a",
            uses:"Emergency lighting and rechargeable equipment.",
            description:
                "A secondary cell that can be charged and discharged repeatedly."
        },

        lithium: {
            name:"Lithium-ion Battery",
            type:"Secondary",
            voltage:"3.7 V (typical)",
            rechargeable:true,
            shape:"lithium",
            label:"Li-ion",
            color:"#0284c7",
            uses:"Mobile phones, laptops, electric vehicles and satellites.",
            description:
                "A rechargeable battery with high energy density and low self-discharge."
        }

    };

    let level = 65;
    let mode = "idle";
    let frameRequest = null;
    let lastTime = null;

    function stopClock() {

        if (frameRequest!==null) {

            cancelAnimationFrame(frameRequest);

        }

        frameRequest = null;
        lastTime = null;
    }

    function selectedCell() {

        const select =
            document.getElementById("bcSelect");

        return cells[select.value];
    }

    function batteryShape(cell) {

        if (cell.shape==="button") {

            return `

                <ellipse cx="400" cy="235"
                    rx="160" ry="65"
                    fill="#64748b"/>

                <rect x="240" y="180"
                    width="320" height="55"
                    fill="url(#bcMetal)"/>

                <ellipse cx="400" cy="180"
                    rx="160" ry="65"
                    fill="#cbd5e1"
                    stroke="#94a3b8"
                    stroke-width="4"/>

                <text x="400" y="175"
                    text-anchor="middle"
                    fill="#334155"
                    font-size="40">+</text>

                <text x="400" y="207"
                    text-anchor="middle"
                    fill="#334155"
                    font-size="20">

                    BUTTON CELL

                </text>

            `;
        }

        if (cell.shape==="lead") {

            return `

                <rect x="180" y="100"
                    width="440" height="225"
                    rx="15"
                    fill="#334155"
                    stroke="#94a3b8"
                    stroke-width="2"/>

                <rect x="180" y="100"
                    width="440" height="40"
                    rx="6"
                    fill="#64748b"/>

                <rect x="210" y="70"
                    width="50" height="30"
                    rx="5"
                    fill="#ef4444"/>

                <rect x="540" y="70"
                    width="50" height="30"
                    rx="5"
                    fill="#94a3b8"/>

                <text x="235" y="94"
                    text-anchor="middle"
                    fill="#fff"
                    font-size="23">+</text>

                <text x="565" y="94"
                    text-anchor="middle"
                    fill="#fff"
                    font-size="23">−</text>

                ${Array.from({length:6},(_,i)=>`

                    <circle
                        cx="${225+i*70}"
                        cy="120"
                        r="12"
                        fill="#1e293b"/>

                `).join("")}

                <text x="400" y="215"
                    text-anchor="middle"
                    fill="#e2e8f0"
                    font-size="32"
                    font-weight="bold">

                    LEAD-ACID

                </text>

                <text x="400" y="260"
                    text-anchor="middle"
                    fill="#facc15"
                    font-size="30">

                    12 V

                </text>

            `;
        }

        if (cell.shape==="lithium") {

            return `

                <rect x="280" y="60"
                    width="240" height="280"
                    rx="14"
                    fill="#334155"
                    stroke="#94a3b8"
                    stroke-width="2"/>

                <rect x="315" y="42"
                    width="50" height="18"
                    rx="4"
                    fill="url(#bcMetal)"/>

                <rect x="435" y="42"
                    width="50" height="18"
                    rx="4"
                    fill="url(#bcMetal)"/>

                <text x="340" y="100"
                    text-anchor="middle"
                    fill="#fca5a5"
                    font-size="25">+</text>

                <text x="460" y="100"
                    text-anchor="middle"
                    fill="#7dd3fc"
                    font-size="25">−</text>

                <text x="400" y="175"
                    text-anchor="middle"
                    fill="#e2e8f0"
                    font-size="40"
                    font-weight="bold">

                    Li-ion

                </text>

                <text x="400" y="215"
                    text-anchor="middle"
                    fill="#7dd3fc"
                    font-size="25">

                    3.7 V

                </text>

                <rect x="315" y="250"
                    width="170" height="45"
                    rx="6"
                    fill="none"
                    stroke="#94a3b8"
                    stroke-width="2"/>

                <rect id="bcInternalFill"
                    x="320" y="255"
                    width="${160*level/100}"
                    height="35"
                    rx="4"
                    fill="#22c55e"/>

            `;
        }

        return `

            <rect x="330" y="65"
                width="140" height="265"
                rx="15"
                fill="#334155"
                stroke="#94a3b8"/>

            <rect x="375" y="45"
                width="50" height="25"
                rx="5"
                fill="url(#bcMetal)"/>

            <rect x="330" y="80"
                width="140" height="85"
                fill="${cell.color}"/>

            <text x="400" y="135"
                text-anchor="middle"
                fill="#fff"
                font-size="34">+</text>

            <text x="400" y="220"
                text-anchor="middle"
                fill="#fff"
                font-size="24"
                font-weight="bold">

                ${cell.label}

            </text>

            <text x="400" y="255"
                text-anchor="middle"
                fill="#cbd5e1"
                font-size="22">

                ${cell.voltage}

            </text>

            <text x="400" y="310"
                text-anchor="middle"
                fill="#fff"
                font-size="30">−</text>

        `;
    }

    function diagram(cell) {

        return `

        <svg id="bcSVG"
            viewBox="0 0 800 400"
            xmlns="http://www.w3.org/2000/svg"
            style="width:100%;font-family:Segoe UI,Arial">

            <defs>

                <linearGradient id="bcMetal">

                    <stop stop-color="#64748b"/>
                    <stop offset=".5"
                        stop-color="#e2e8f0"/>
                    <stop offset="1"
                        stop-color="#64748b"/>

                </linearGradient>

            </defs>

            <text x="400" y="25"
                text-anchor="middle"
                fill="#7dd3fc"
                font-size="20"
                font-weight="bold">

                ${cell.name.toUpperCase()}

            </text>

            ${batteryShape(cell)}

            <text x="400" y="375"
                text-anchor="middle"
                fill="${cell.rechargeable
                    ?"#86efac"
                    :"#fbbf24"}"
                font-size="19">

                ${cell.type.toUpperCase()} CELL

            </text>

        </svg>

        `;
    }

    function options(type) {

        return Object.entries(cells)
            .filter(([key,cell])=>
                cell.type===type
            )
            .map(([key,cell])=>`

                <option value="${key}">

                    ${cell.name}

                </option>

            `).join("");
    }

    function information(cell) {

        return `

            <div style="
                display:grid;
                grid-template-columns:
                    repeat(auto-fit,minmax(140px,1fr));
                gap:12px">

                <div style="
                    padding:14px;
                    border:1px solid #334155;
                    border-radius:10px">

                    <small>CLASSIFICATION</small>

                    <h3 style="color:#7dd3fc">

                        ${cell.type} Cell

                    </h3>

                </div>

                <div style="
                    padding:14px;
                    border:1px solid #334155;
                    border-radius:10px">

                    <small>RECHARGEABLE</small>

                    <h3 style="
                        color:${cell.rechargeable
                            ?"#86efac"
                            :"#fca5a5"}">

                        ${cell.rechargeable?"YES":"NO"}

                    </h3>

                </div>

                <div style="
                    padding:14px;
                    border:1px solid #334155;
                    border-radius:10px">

                    <small>NOMINAL VOLTAGE</small>

                    <h3 style="color:#facc15">

                        ${cell.voltage}

                    </h3>

                </div>

            </div>

            <div class="definition"
                style="margin-top:15px">

                ${cell.description}

                <p>

                    <strong>Applications:</strong>
                    ${cell.uses}

                </p>

            </div>

        `;
    }

    function updateLevel() {

        const percentage =
            document.getElementById("bcPercentage");

        const value = Math.round(level)+"%";

        if (percentage.textContent!==value) {

            percentage.textContent = value;

        }

        const color = level>20
            ?"#22c55e"
            :"#ef4444";

        const bar =
            document.getElementById("bcFill");

        bar.style.width = level+"%";
        bar.style.background = color;

        const internal =
            document.getElementById("bcInternalFill");

        if (internal) {

            internal.setAttribute(
                "width",
                160*level/100
            );

            internal.setAttribute("fill",color);

        }
    }

    function status(message,color="#86efac") {

        const element =
            document.getElementById("bcStatus");

        if (!element) return;

        element.textContent = message;
        element.style.color = color;
    }

    function tick(now) {

        if (
            mode==="idle" ||
            !document.getElementById("bcSVG")
        ) {

            stopClock();
            return;

        }

        if (lastTime===null) {

            lastTime = now;

        }

        const delta = Math.min(
            (now-lastTime)/1000,
            .1
        );

        lastTime = now;

        const playing =
            typeof animationPlaying==="undefined"
                ?true
                :animationPlaying;

        const speed =
            typeof animationSpeed==="undefined"
                ?1
                :Number(animationSpeed)||1;

        if (playing) {

            const change = delta*speed*3;

            level = mode==="charge"
                ?Math.min(100,level+change)
                :Math.max(0,level-change);

            updateLevel();

        }

        if (level<=0 && mode==="discharge") {

            mode = "idle";

            stopClock();

            status(
                selectedCell().rechargeable
                    ?"Battery discharged. Recharge to use again."
                    :"Primary cell exhausted. Replace the cell.",
                "#fca5a5"
            );

            return;

        }

        if (level>=100 && mode==="charge") {

            mode = "idle";

            stopClock();

            status("Battery fully charged.");

            return;

        }

        frameRequest =
            requestAnimationFrame(tick);
    }

    function start(action) {

        if (!document.getElementById("bcSVG")) {

            return;

        }

        const cell = selectedCell();

        if (
            action==="charge" &&
            !cell.rechargeable
        ) {

            mode = "idle";
            stopClock();

            status(
                "Primary cells are not designed to be recharged. Replace the exhausted cell.",
                "#fca5a5"
            );

            return;

        }

        if (action==="discharge" && level<=0) {

            status(
                "Battery is discharged.",
                "#fca5a5"
            );

            return;

        }

        if (action==="charge" && level>=100) {

            status("Battery is already fully charged.");

            return;

        }

        stopClock();

        mode = action;

        status(
            action==="charge"
                ?"Charging: Electrical energy → Chemical energy"
                :"Discharging: Chemical energy → Electrical energy"
        );

        if (typeof playAnimations==="function") {

            playAnimations();

        }

        frameRequest =
            requestAnimationFrame(tick);
    }

    function pause() {

        mode = "idle";

        stopClock();

        status("Battery simulation paused.");
    }

    function reset() {

        stopClock();

        mode = "idle";
        level = 65;

        if (!document.getElementById("bcSelect")) {

            return;

        }

        const cell = selectedCell();

        document.getElementById(
            "bcDiagram"
        ).innerHTML = diagram(cell);

        document.getElementById(
            "bcInformation"
        ).innerHTML = information(cell);

        updateLevel();

        status("Ready. Select an operation.");

        ElectrochemistryAnimations.pause();
    }

    function render(type) {

        stopClock();

        mode = "idle";
        level = 65;

        const cell = type==="Primary"
            ?cells.dry
            :cells.lead;

        return `

            <div id="batteryComparisonLab"
                style="width:100%">

                <div style="
                    text-align:center;
                    margin-bottom:15px">

                    <strong style="
                        color:#7dd3fc;
                        font-size:22px">

                        ${type.toUpperCase()} CELLS

                    </strong>

                    <p>

                        Select a battery to explore
                        its properties.

                    </p>

                    <select id="bcSelect"
                        onchange="BatteryComparisonLab.reset()"
                        style="
                            min-width:200px;
                            max-width:100%">

                        ${options(type)}

                    </select>

                </div>

                <div id="bcDiagram">

                    ${diagram(cell)}

                </div>

                <!-- Battery information -->

                <div id="bcInformation">

                    ${information(cell)}

                </div>

                <!-- Battery charge dashboard -->

                <div style="
                    padding:18px;
                    border:1px solid #334155;
                    border-radius:12px;
                    margin-top:15px">

                    <div style="
                        display:flex;
                        justify-content:space-between;
                        align-items:center">

                        BATTERY CHARGE

                        <strong id="bcPercentage"
                            style="
                                font-size:30px;
                                color:#86efac">

                            65%

                        </strong>

                    </div>

                    <div style="
                        height:20px;
                        background:#334155;
                        border-radius:6px;
                        overflow:hidden;
                        margin-top:12px">

                        <div id="bcFill"
                            style="
                                width:65%;
                                height:100%;
                                background:#22c55e">

                        </div>

                    </div>

                </div>

                <!-- Interactive controls -->

                <div style="
                    display:flex;
                    justify-content:center;
                    flex-wrap:wrap;
                    gap:12px;
                    margin:15px">

                    <button type="button"
                        onclick="BatteryComparisonLab.start('discharge')">

                        Use Battery

                    </button>

                    <button type="button"
                        onclick="BatteryComparisonLab.start('charge')">

                        Recharge Battery

                    </button>

                    <button type="button"
                        onclick="BatteryComparisonLab.pause()">

                        Pause

                    </button>

                    <button type="button"
                        onclick="BatteryComparisonLab.reset()">

                        Reset

                    </button>

                </div>

                <div id="bcStatus"
                    class="definition"
                    style="
                        text-align:center;
                        color:#86efac">

                    Ready. Select an operation.

                </div>

                <!-- Comparison table -->

                <div style="
                    overflow-x:auto;
                    margin-top:20px">

                    <table style="
                        width:100%;
                        border-collapse:collapse">

                        <thead>

                            <tr>

                                <th style="padding:12px">

                                    Property

                                </th>

                                <th style="
                                    padding:12px;
                                    color:#fbbf24">

                                    Primary

                                </th>

                                <th style="
                                    padding:12px;
                                    color:#86efac">

                                    Secondary

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            ${[
                                [
                                    "Rechargeable",
                                    "No",
                                    "Yes"
                                ],
                                [
                                    "Usage",
                                    "Single service life",
                                    "Repeated cycles"
                                ],
                                [
                                    "Chemical reactions",
                                    "Not practically reversible",
                                    "Practically reversible"
                                ],
                                [
                                    "After discharge",
                                    "Replace",
                                    "Recharge"
                                ],
                                [
                                    "Examples",
                                    "Dry cell, primary button cell",
                                    "Lead-acid, Ni-Cd, Li-ion"
                                ]
                            ].map(row=>`

                                <tr style="
                                    border-bottom:
                                        1px solid #334155">

                                    ${row.map(value=>`

                                        <td style="
                                            padding:12px">

                                            ${value}

                                        </td>

                                    `).join("")}

                                </tr>

                            `).join("")}

                        </tbody>

                    </table>

                </div>

                <p style="
                    font-size:12px;
                    color:#94a3b8;
                    text-align:center">

                    Virtual demonstration.
                    Battery voltages are representative
                    examples. Charge percentages and
                    charging rates are illustrative.
                    Never attempt to recharge a
                    non-rechargeable battery.

                </p>

            </div>

        `;
    }

    return {
        render,
        start,
        pause,
        reset
    };

})();


/* CONNECT PRIMARY AND SECONDARY CELL SCENES */

(() => {

    const previousRender =
        ElectrochemistryAnimations.render;

    ElectrochemistryAnimations.render =
        function(topic) {

            if (topic.animation==="primaryCell") {

                return BatteryComparisonLab.render(
                    "Primary"
                );

            }

            if (topic.animation==="secondaryCell") {

                return BatteryComparisonLab.render(
                    "Secondary"
                );

            }

            return previousRender.call(this,topic);
        };

    const previousReset =
        ElectrochemistryAnimations.reset;

    ElectrochemistryAnimations.reset =
        function() {

            previousReset.call(this);

            if (
                document.getElementById(
                    "batteryComparisonLab"
                )
            ) {

                BatteryComparisonLab.reset();

            }

        };

})();

/* ==========================================
   INTERACTIVE CHAPTER ASSESSMENT
   XYLEM NADAPURAM CHEMISTRY STUDIO
   CHAPTER 05 - ELECTROCHEMISTRY
========================================== */

const ElectroAssessmentLab = (() => {

    const questions = [

        {
            q:"The mass of the zinc electrode decreases during the operation of a Daniel cell.",
            options:["True","False"],
            answer:0,
            explanation:"Zinc undergoes oxidation and enters the solution as Zn²⁺ ions."
        },

        {
            q:"Copper is the anode in a Daniel cell.",
            options:["True","False"],
            answer:1,
            explanation:"Copper is the cathode. Zinc is the anode."
        },

        {
            q:"Electrons flow from zinc to copper through the external circuit of a Daniel cell.",
            options:["True","False"],
            answer:0,
            explanation:"Zinc loses electrons, which travel through the external circuit towards copper."
        },

        {
            q:"Reduction occurs at the copper electrode in a Daniel cell.",
            options:["True","False"],
            answer:0,
            explanation:"Cu²⁺ ions gain electrons and form copper metal."
        },

        {
            q:"The concentration of Cu²⁺ ions decreases during Daniel cell operation.",
            options:["True","False"],
            answer:0,
            explanation:"Copper ions are consumed during reduction at the cathode."
        },

        {
            q:"Which energy conversion occurs in a galvanic cell?",
            options:[
                "Electrical to chemical",
                "Chemical to electrical",
                "Electrical to mechanical",
                "Light to chemical"
            ],
            answer:1,
            explanation:"A spontaneous chemical reaction produces electrical energy."
        },

        {
            q:"What is the main function of the salt bridge?",
            options:[
                "Transfer electrons",
                "Increase temperature",
                "Maintain electrical neutrality",
                "Prevent oxidation"
            ],
            answer:2,
            explanation:"The salt bridge permits ion migration and maintains electrical neutrality."
        },

        {
            q:"Which electrode is negative in a zinc-silver galvanic cell?",
            options:[
                "Silver",
                "Zinc",
                "Both electrodes",
                "Neither electrode"
            ],
            answer:1,
            explanation:"Zinc undergoes oxidation and acts as the negative anode."
        },

        {
            q:"In a magnesium-nickel galvanic cell, which metal acts as the anode?",
            options:[
                "Nickel",
                "Copper",
                "Magnesium",
                "Silver"
            ],
            answer:2,
            explanation:"Magnesium is more reactive and undergoes oxidation."
        },

        {
            q:"Which metal can displace copper from copper sulphate solution?",
            options:[
                "Silver",
                "Gold",
                "Copper",
                "Zinc"
            ],
            answer:3,
            explanation:"Zinc is more reactive than copper."
        },

        {
            q:"In the reaction Zn + Cu²⁺ → Zn²⁺ + Cu, which is the reducing agent?",
            options:[
                "Zn",
                "Cu²⁺",
                "Zn²⁺",
                "Cu"
            ],
            answer:0,
            explanation:"Zinc loses electrons and causes the reduction of copper ions."
        },

        {
            q:"Which is the oxidising agent in the reaction between magnesium and copper sulphate?",
            options:[
                "Mg",
                "Cu²⁺",
                "Mg²⁺",
                "Cu"
            ],
            answer:1,
            explanation:"Copper ions accept electrons and undergo reduction."
        },

        {
            q:"Which metal does not normally liberate hydrogen from dilute hydrochloric acid?",
            options:[
                "Magnesium",
                "Zinc",
                "Iron",
                "Copper"
            ],
            answer:3,
            explanation:"Copper is below hydrogen in the reactivity series."
        },

        {
            q:"Which energy conversion occurs during electrolysis?",
            options:[
                "Chemical to electrical",
                "Electrical to chemical",
                "Heat to electrical",
                "Mechanical to chemical"
            ],
            answer:1,
            explanation:"Electrical energy brings about a chemical reaction."
        },

        {
            q:"What is the hydrogen-to-oxygen volume ratio during electrolysis of acidified water?",
            options:[
                "1 : 1",
                "1 : 2",
                "2 : 1",
                "3 : 1"
            ],
            answer:2,
            explanation:"Two molecules of hydrogen are formed for every molecule of oxygen."
        },

        {
            q:"Why does solid sodium chloride not conduct electricity?",
            options:[
                "It contains no ions",
                "Its ions occupy fixed positions",
                "It contains free electrons",
                "It contains water"
            ],
            answer:1,
            explanation:"The ions cannot move freely through the solid ionic lattice."
        },

        {
            q:"Which reaction occurs at the anode during electrolysis of concentrated aqueous NaCl?",
            options:[
                "Na⁺ + e⁻ → Na",
                "2H₂O → 4H⁺ + O₂ + 4e⁻",
                "H⁺ + e⁻ → ½H₂",
                "Cl⁻ → ½Cl₂ + e⁻"
            ],
            answer:3,
            explanation:"Chloride ions are oxidised to chlorine gas under the textbook brine conditions."
        },

        {
            q:"What is produced at the cathode during electrolysis of molten sodium chloride?",
            options:[
                "Hydrogen",
                "Oxygen",
                "Sodium",
                "Chlorine"
            ],
            answer:2,
            explanation:"Na⁺ ions gain electrons and form sodium metal."
        },

        {
            q:"Which are the products of electrolysis of concentrated aqueous sodium chloride?",
            options:[
                "Na, O₂ and H₂",
                "H₂, Cl₂ and NaOH",
                "Na and Cl₂ only",
                "H₂ and O₂ only"
            ],
            answer:1,
            explanation:"Hydrogen forms at the cathode, chlorine at the anode and hydroxide ions remain in solution."
        },

        {
            q:"Why does phenolphthalein turn pink near the cathode during brine electrolysis?",
            options:[
                "Chlorine formation",
                "Acid formation",
                "Hydroxide ion formation",
                "Sodium metal formation"
            ],
            answer:2,
            explanation:"Hydroxide ions make the solution alkaline."
        },

        {
            q:"The object to be electroplated is connected as the:",
            options:[
                "Anode",
                "Cathode",
                "Salt bridge",
                "Electrolyte"
            ],
            answer:1,
            explanation:"Metal ions gain electrons and deposit on the object at the cathode."
        },

        {
            q:"Why does zinc dissolve preferentially when brass comes into contact with saline water?",
            options:[
                "Zinc is less reactive than copper",
                "Copper is more reactive",
                "Zinc is more reactive than copper",
                "Zinc cannot undergo oxidation"
            ],
            answer:2,
            explanation:"Zinc undergoes oxidation more readily than copper."
        },

        {
            q:"Which is an example of a secondary cell?",
            options:[
                "Ordinary dry cell",
                "Primary button cell",
                "Lead-acid battery",
                "None of these"
            ],
            answer:2,
            explanation:"Lead-acid batteries are rechargeable."
        },

        {
            q:"During charging of a lithium-ion battery, lithium ions move:",
            options:[
                "Negative to positive electrode",
                "Positive to negative electrode",
                "Through the external wire",
                "Outside the battery"
            ],
            answer:1,
            explanation:"Charging drives lithium ions towards the negative electrode through the electrolyte."
        },

        {
            q:"What is the direct chemical product of a hydrogen-oxygen fuel cell?",
            options:[
                "Carbon dioxide",
                "Sodium hydroxide",
                "Chlorine",
                "Water"
            ],
            answer:3,
            explanation:"Hydrogen and oxygen combine electrochemically to form water."
        }

    ];


    /* TEXTBOOK DESCRIPTIVE QUESTIONS */

    const descriptive = [

        {
            title:"Daniel Cell — True or False",
            question:
                "Evaluate the five statements about the zinc-copper galvanic cell in textbook Question 1.",
            answer:`
                <p>a) True — Zinc electrode mass decreases.</p>
                <p>b) False — Copper is the cathode.</p>
                <p>c) True — Electrons flow from zinc to copper.</p>
                <p>d) True — Reduction occurs at copper.</p>
                <p>e) True — Cu²⁺ concentration decreases.</p>
            `
        },

        {
            title:"Zinc-Silver Galvanic Cell",
            question:
                "Represent the zinc-silver galvanic cell, identify the negative electrode and write the electrode reactions.",
            answer:`

                <p><strong>Cell representation:</strong></p>

                ${cellDiagram("Zn","Ag","Zn²⁺","Ag⁺")}

                <p>Negative electrode: Zinc</p>

                <p>Anode: Zn → Zn²⁺ + 2e⁻</p>

                <p>Cathode: 2Ag⁺ + 2e⁻ → 2Ag</p>

                <p>Overall: Zn + 2Ag⁺ → Zn²⁺ + 2Ag</p>

            `
        },

        {
            title:"Magnesium-Nickel Galvanic Cell",
            question:
                "Draw the magnesium-nickel galvanic cell and identify the anode, cathode and direction of electron flow.",
            answer:`

                ${cellDiagram("Mg","Ni","Mg²⁺","Ni²⁺")}

                <p>Anode: Magnesium</p>

                <p>Cathode: Nickel</p>

                <p>Electron flow: Mg → Ni</p>

                <p>Oxidation: Mg → Mg²⁺ + 2e⁻</p>

                <p>Reduction: Ni²⁺ + 2e⁻ → Ni</p>

                <p>Overall: Mg + Ni²⁺ → Mg²⁺ + Ni</p>

            `
        },

        {
            title:"Electrolysis of Aqueous NaCl",
            question:
                "Write the reaction occurring at the anode during electrolysis of concentrated aqueous sodium chloride.",
            answer:`

                <p>Correct textbook option: (iv)</p>

                <p>Cl⁻ → ½Cl₂ + e⁻</p>

                <p>Alternatively:</p>

                <p>2Cl⁻ → Cl₂ + 2e⁻</p>

                <p>Chloride ions undergo oxidation.</p>

            `
        },

        {
            title:"Products of Electrolysis",
            question:
                "Identify the products of electrolysis of aqueous NaCl and aqueous CuSO₄ using copper electrodes for the latter.",
            answer:`

                <p><strong>Concentrated aqueous NaCl:</strong></p>

                <p>Cathode: Hydrogen</p>
                <p>Anode: Chlorine</p>
                <p>Solution: Sodium hydroxide</p>

                <hr>

                <p><strong>CuSO₄ with copper electrodes:</strong></p>

                <p>Cathode: Copper deposition</p>
                <p>Anode: Copper dissolves as Cu²⁺</p>

                <p>Cu²⁺ + 2e⁻ → Cu</p>

                <p>Cu → Cu²⁺ + 2e⁻</p>

                <p>Ideally, there is no net change in
                the amount of dissolved copper sulphate.</p>

            `
        },

        {
            title:"Corrosion of Brass",
            question:
                "Explain why zinc gradually dissolves when brass comes into contact with saline water.",
            answer:`

                <p>Brass contains zinc and copper.</p>

                <p>Zinc is more reactive than copper.</p>

                <p>Zinc undergoes oxidation more readily.</p>

                <p>Zn → Zn²⁺ + 2e⁻</p>

                <p>Zinc dissolves preferentially,
                leaving a copper-rich material behind.</p>

            `
        },

        {
            title:"Classification of Cells",
            question:
                "Classify the cells used in daily life into primary and secondary cells.",
            answer:`

                <p><strong>Primary cells:</strong></p>

                <p>Ordinary dry cells and
                non-rechargeable button cells.</p>

                <p><strong>Secondary cells:</strong></p>

                <p>Lead-acid batteries, nickel-cadmium
                batteries and lithium-ion batteries.</p>

                <p>Primary cells are not designed
                to be recharged.</p>

                <p>Secondary cells can be recharged.</p>

            `
        },

        {
            title:"Fuel Cells",
            question:
                "Define fuel cells and state their advantages.",
            answer:`

                <p>Fuel cells are galvanic cells
                that convert the chemical energy
                of continuously supplied reactants
                into electrical energy.</p>

                <p><strong>Advantages:</strong></p>

                <p>High energy conversion efficiency.</p>

                <p>Continuous operation as long
                as reactants are supplied.</p>

                <p>A hydrogen fuel cell produces
                water as its direct chemical product.</p>

            `
        }

    ];


    /* GALVANIC CELL ANSWER DIAGRAM */

    function cellDiagram(
        anode,cathode,anion,cation
    ) {

        return `

        <svg viewBox="0 0 700 300"
            xmlns="http://www.w3.org/2000/svg"
            style="width:100%;max-width:700px">

            <rect x="65" y="155"
                width="245" height="100"
                fill="#38bdf844"/>

            <rect x="390" y="155"
                width="245" height="100"
                fill="#38bdf844"/>

            <path d="
                M60 125 V255 H315 V125
                M385 125 V255 H640 V125"

                stroke="#bae6fd"
                stroke-width="3"
                fill="none"/>

            <rect x="165" y="110"
                width="35" height="125"
                rx="3"
                fill="#94a3b8"/>

            <rect x="500" y="110"
                width="35" height="125"
                rx="3"
                fill="#c87941"/>

            <path d="
                M182 110 V45
                H517 V110"

                stroke="#94a3b8"
                stroke-width="4"
                fill="none"/>

            <path d="
                M260 195 V100
                Q350 60 440 100
                V195"

                stroke="#cbd5e1"
                stroke-width="18"
                fill="none"/>

            <path d="
                M260 195 V100
                Q350 60 440 100
                V195"

                stroke="#64748b"
                stroke-width="10"
                fill="none"/>

            <text x="350" y="30"
                text-anchor="middle"
                fill="#facc15"
                font-size="17">

                Electron flow →

            </text>

            <text x="350" y="125"
                text-anchor="middle"
                fill="#e2e8f0"
                font-size="13">

                Salt bridge

            </text>

            <text x="182" y="100"
                text-anchor="middle"
                fill="#7dd3fc"
                font-size="16">

                ${anode} (−)

            </text>

            <text x="517" y="100"
                text-anchor="middle"
                fill="#fca5a5"
                font-size="16">

                ${cathode} (+)

            </text>

            <text x="125" y="205"
                text-anchor="middle"
                fill="#e2e8f0"
                font-size="16">

                ${anion}

            </text>

            <text x="580" y="205"
                text-anchor="middle"
                fill="#e2e8f0"
                font-size="16">

                ${cation}

            </text>

            <text x="182" y="280"
                text-anchor="middle"
                fill="#7dd3fc"
                font-size="16">

                ANODE

            </text>

            <text x="517" y="280"
                text-anchor="middle"
                fill="#fca5a5"
                font-size="16">

                CATHODE

            </text>

        </svg>

        `;
    }


    /* ASSESSMENT STATE */

    let current = 0;
    let answers = {};
    let revealed = {};
    let mode = "practice";
    let finished = false;


    function score() {

        return questions.reduce(
            (total,q,i)=>
                total+(answers[i]===q.answer?1:0),
            0
        );
    }


    function render() {

        current = 0;
        answers = {};
        revealed = {};
        mode = "practice";
        finished = false;

        return `

            <div id="electroAssessmentLab"
                style="width:100%">

                <div style="
                    padding:18px;
                    border:1px solid #0e7490;
                    border-radius:12px;
                    background:#164e6333;
                    text-align:center">

                    <small>

                        XYLEM NADAPURAM

                    </small>

                    <h2 style="color:#7dd3fc">

                        CHAPTER ASSESSMENT

                    </h2>

                    <p>

                        Electrochemistry — Standard X

                    </p>

                </div>

                <div style="
                    display:flex;
                    flex-wrap:wrap;
                    justify-content:center;
                    gap:10px;
                    margin:15px">

                    <button type="button"
                        onclick="ElectroAssessmentLab.setMode('practice')">

                        Practice Mode

                    </button>

                    <button type="button"
                        onclick="ElectroAssessmentLab.setMode('exam')">

                        Exam Mode

                    </button>

                    <button type="button"
                        onclick="ElectroAssessmentLab.setMode('descriptive')">

                        Textbook Answers

                    </button>

                </div>

                <div id="eaContent">

                    ${questionHTML()}

                </div>

            </div>

        `;
    }


    function questionHTML() {

        const q = questions[current];

        const answered =
            answers[current]!==undefined;

        const showAnswer =
            mode==="practice" &&
            (answered || revealed[current]);

        return `

            <div style="
                padding:16px;
                border:1px solid #334155;
                border-radius:12px">

                <div style="
                    display:flex;
                    justify-content:space-between;
                    flex-wrap:wrap;
                    gap:10px">

                    <strong style="color:#7dd3fc">

                        ${mode==="exam"
                            ?"EXAM MODE"
                            :"PRACTICE MODE"}

                    </strong>

                    <strong>

                        ${mode==="exam"
                            ?Object.keys(answers).length
                                +" / "+questions.length+" answered"
                            :"Score: "+score()+" / "+questions.length}

                    </strong>

                </div>

                <div style="
                    height:8px;
                    background:#334155;
                    border-radius:8px;
                    margin:15px 0;
                    overflow:hidden">

                    <div style="
                        height:100%;
                        width:${Object.keys(answers).length/questions.length*100}%;
                        background:#22c55e">

                    </div>

                </div>

                <p style="color:#94a3b8">

                    QUESTION ${current+1}
                    OF ${questions.length}

                </p>

                <h3 style="
                    font-size:22px;
                    line-height:1.5">

                    ${q.q}

                </h3>

                <div style="
                    display:grid;
                    gap:10px;
                    margin:18px 0">

                    ${q.options.map((option,i)=>{

                        let border = "#334155";
                        let bg = "#1e293b";
                        let symbol = "";

                        if (showAnswer &&
                            i===q.answer) {

                            border = "#22c55e";
                            bg = "#14532d55";
                            symbol = " ✓";

                        } else if (
                            showAnswer &&
                            answers[current]===i
                        ) {

                            border = "#ef4444";
                            bg = "#7f1d1d55";
                            symbol = " ✗";

                        } else if (
                            answers[current]===i
                        ) {

                            border = "#38bdf8";
                            bg = "#164e6355";

                        }

                        return `

                            <button type="button"

                                ${mode==="practice" &&
                                  showAnswer
                                    ?"disabled":""}

                                onclick="ElectroAssessmentLab.choose(${i})"

                                style="
                                    padding:16px;
                                    text-align:left;
                                    white-space:normal;
                                    color:#e2e8f0;
                                    border:1px solid ${border};
                                    background:${bg};
                                    border-radius:10px;
                                    font-size:16px;
                                    opacity:1">

                                ${String.fromCharCode(65+i)}.
                                ${option}${symbol}

                            </button>

                        `;

                    }).join("")}

                </div>

                ${showAnswer ? `

                    <div style="
                        padding:16px;
                        border:1px solid #0e7490;
                        border-radius:10px;
                        background:#164e6333">

                        <strong style="
                            color:${!answered
                                ?"#7dd3fc"
                                :answers[current]===q.answer
                                    ?"#86efac"
                                    :"#fca5a5"}">

                            ${!answered
                                ?"ANSWER REVEALED"
                                :answers[current]===q.answer
                                    ?"CORRECT ANSWER"
                                    :"INCORRECT ANSWER"}

                        </strong>

                        <p>${q.explanation}</p>

                    </div>

                ` : ""}

                ${mode==="practice" && !showAnswer
                    ?`

                        <button type="button"
                            onclick="ElectroAssessmentLab.reveal()">

                            Reveal Answer

                        </button>

                    `
                    :""}

                <div style="
                    display:flex;
                    justify-content:space-between;
                    gap:10px;
                    margin-top:20px">

                    <button type="button"
                        ${current===0?"disabled":""}
                        onclick="ElectroAssessmentLab.go(${current-1})">

                        ← Previous

                    </button>

                    <button type="button"
                        onclick="${current===questions.length-1
                            ?"ElectroAssessmentLab.finish()"
                            :`ElectroAssessmentLab.go(${current+1})`}">

                        ${current===questions.length-1
                            ?"Finish Assessment"
                            :"Next →"}

                    </button>

                </div>

            </div>

            <!-- Question navigator -->

            <div style="
                display:grid;
                grid-template-columns:
                    repeat(auto-fit,minmax(38px,1fr));
                gap:6px;
                margin:15px 0">

                ${questions.map((q,i)=>`

                    <button type="button"
                        onclick="ElectroAssessmentLab.go(${i})"

                        style="
                            padding:10px 5px;
                            color:#e2e8f0;
                            border:2px solid
                                ${i===current
                                    ?"#38bdf8"
                                    :"transparent"};
                            background:
                                ${answers[i]===undefined
                                    ?revealed[i]
                                        ?"#854d0e"
                                        :"#334155"
                                    :mode==="exam"
                                        ?"#0369a1"
                                        :answers[i]===q.answer
                                            ?"#15803d"
                                            :"#b91c1c"}">

                        ${i+1}

                    </button>

                `).join("")}

            </div>

            <div style="
                display:flex;
                justify-content:center;
                flex-wrap:wrap;
                gap:10px">

                <button type="button"
                    onclick="ElectroAssessmentLab.finish()">

                    View Final Score

                </button>

                <button type="button"
                    onclick="ElectroAssessmentLab.reset()">

                    Restart Assessment

                </button>

            </div>

        `;
    }


    /* DESCRIPTIVE QUESTION MODE */

    function descriptiveHTML() {

        return `

            <div style="
                display:grid;
                gap:15px">

                <h3 style="color:#7dd3fc">

                    TEXTBOOK QUESTIONS AND ANSWERS

                </h3>

                <p>

                    Let us assess — Pages 119–120

                </p>

                ${descriptive.map((item,i)=>`

                    <div style="
                        padding:18px;
                        border:1px solid #334155;
                        border-radius:12px">

                        <small style="color:#7dd3fc">

                            QUESTION ${i+1}

                        </small>

                        <h3>${item.title}</h3>

                        <p>${item.question}</p>

                        <button type="button"
                            id="eaDescButton${i}"
                            onclick="ElectroAssessmentLab.toggleDescriptive(${i})">

                            Reveal Answer

                        </button>

                        <div id="eaDesc${i}"
                            style="
                                display:none;
                                margin-top:15px;
                                padding:16px;
                                border-left:4px solid #22c55e;
                                background:#14532d22;
                                border-radius:8px;
                                line-height:1.7">

                            ${item.answer}

                        </div>

                    </div>

                `).join("")}

            </div>

        `;
    }


    /* RESULT SCREEN */

    function resultHTML() {

        const total = questions.length;
        const correct = score();
        const attempted =
            Object.keys(answers).length;

        const incorrect =
            attempted-correct;

        const unanswered =
            total-attempted;

        const percent =
            Math.round(correct/total*100);

        let remark = "";

        if (percent>=90) {

            remark = "Excellent understanding!";

        } else if (percent>=75) {

            remark = "Very good performance.";

        } else if (percent>=50) {

            remark = "Good effort. Revise difficult topics.";

        } else {

            remark = "More revision and practice are recommended.";

        }

        return `

            <div style="
                padding:22px;
                border:1px solid #334155;
                border-radius:14px;
                text-align:center">

                <h2 style="color:#7dd3fc">

                    ASSESSMENT RESULT

                </h2>

                <div style="
                    width:145px;
                    height:145px;
                    margin:20px auto;
                    border-radius:50%;
                    display:grid;
                    place-items:center;
                    border:8px solid
                        ${percent>=75
                            ?"#22c55e"
                            :percent>=50
                                ?"#f59e0b"
                                :"#ef4444"}">

                    <div>

                        <strong style="font-size:38px">

                            ${percent}%

                        </strong>

                        <p>${correct}/${total}</p>

                    </div>

                </div>

                <h3>${remark}</h3>

                <div style="
                    display:grid;
                    grid-template-columns:
                        repeat(auto-fit,minmax(100px,1fr));
                    gap:12px;
                    margin:20px 0">

                    ${[
                        ["Correct",correct,"#86efac"],
                        ["Incorrect",incorrect,"#fca5a5"],
                        ["Unanswered",unanswered,"#fbbf24"]
                    ].map(item=>`

                        <div style="
                            border:1px solid #334155;
                            border-radius:10px;
                            padding:15px">

                            <strong style="
                                font-size:28px;
                                color:${item[2]}">

                                ${item[1]}

                            </strong>

                            <p>${item[0]}</p>

                        </div>

                    `).join("")}

                </div>

                <button type="button"
                    onclick="ElectroAssessmentLab.reset()">

                    Try Again

                </button>

            </div>

            <h3 style="
                color:#7dd3fc;
                margin-top:25px">

                ANSWER REVIEW

            </h3>

            ${questions.map((q,i)=>`

                <div style="
                    padding:16px;
                    margin:10px 0;
                    border:1px solid #334155;
                    border-radius:10px">

                    <strong style="
                        color:${answers[i]===q.answer
                            ?"#86efac"
                            :answers[i]===undefined
                                ?"#fbbf24"
                                :"#fca5a5"}">

                        ${i+1}.
                        ${answers[i]===q.answer
                            ?"CORRECT"
                            :answers[i]===undefined
                                ?"UNANSWERED"
                                :"INCORRECT"}

                    </strong>

                    <p>${q.q}</p>

                    <p>

                        Your answer:
                        ${answers[i]===undefined
                            ?"Not attempted"
                            :q.options[answers[i]]}

                    </p>

                    <p style="color:#86efac">

                        Correct answer:
                        ${q.options[q.answer]}

                    </p>

                    <p>${q.explanation}</p>

                </div>

            `).join("")}

        `;
    }


    /* CONTROL FUNCTIONS */

    function update() {

        const content =
            document.getElementById("eaContent");

        if (!content) return;

        if (mode==="descriptive") {

            content.innerHTML =
                descriptiveHTML();

        } else if (finished) {

            content.innerHTML =
                resultHTML();

        } else {

            content.innerHTML =
                questionHTML();

        }

        ElectrochemistryAnimations.pause();
    }

    function choose(index) {

        if (finished) return;

        if (
            mode==="practice" &&
            (
                answers[current]!==undefined ||
                revealed[current]
            )
        ) {

            return;

        }

        answers[current] = index;

        update();
    }

    function reveal() {

        if (mode!=="practice") return;

        revealed[current] = true;

        update();
    }

    function go(index) {

        if (
            index<0 ||
            index>=questions.length
        ) return;

        current = index;

        update();
    }

    function finish() {

        finished = true;

        update();
    }

    function setMode(value) {

        if (value!==mode) {

            current = 0;
            answers = {};
            revealed = {};
            finished = false;

        }

        mode = value;

        update();
    }

    function toggleDescriptive(index) {

        const answer =
            document.getElementById(
                "eaDesc"+index
            );

        const button =
            document.getElementById(
                "eaDescButton"+index
            );

        if (!answer || !button) return;

        const visible =
            answer.style.display==="block";

        answer.style.display = visible
            ?"none"
            :"block";

        button.textContent = visible
            ?"Reveal Answer"
            :"Hide Answer";
    }

    function reset() {

        current = 0;
        answers = {};
        revealed = {};
        finished = false;

        update();
    }

    return {
        render,
        choose,
        reveal,
        go,
        finish,
        setMode,
        toggleDescriptive,
        reset
    };

})();


/* CONNECT ASSESSMENT TO SCENE 39 */

(() => {

    const previousRender =
        ElectrochemistryAnimations.render;

    ElectrochemistryAnimations.render =
        function(topic) {

            if (
                topic.animation==="chapterAssessment"
            ) {

                return ElectroAssessmentLab.render();

            }

            return previousRender.call(this,topic);
        };

    const previousReset =
        ElectrochemistryAnimations.reset;

    ElectrochemistryAnimations.reset =
        function() {

            previousReset.call(this);

            if (
                document.getElementById(
                    "electroAssessmentLab"
                )
            ) {

                ElectroAssessmentLab.reset();

            }

        };

})();

/* ==========================================
   INTERACTIVE EXTENDED ACTIVITIES
   XYLEM NADAPURAM CHEMISTRY STUDIO
   CHAPTER 05 - ELECTROCHEMISTRY
========================================== */

const ExtendedActivitiesLab = (() => {

    const initialOrder = [
        "A⁺","B²⁺","C⁺","D²⁺"
    ];

    const correctOrder = [
        "B²⁺","D²⁺","C⁺","A⁺"
    ];

    let order = [...initialOrder];

    let connected = true;

    /* ACTIVITY 1: UNKNOWN METALS */

    function orderHTML() {

        return order.map((ion,i)=>`

            <div style="
                display:flex;
                align-items:center;
                gap:10px;
                padding:12px;
                border:1px solid #334155;
                border-radius:9px;
                background:#1e293b">

                <span style="color:#94a3b8">

                    ${i+1}

                </span>

                <strong style="
                    flex:1;
                    font-size:23px;
                    color:#7dd3fc">

                    ${ion}

                </strong>

                <button type="button"
                    ${i===0?"disabled":""}
                    onclick="ExtendedActivitiesLab.move(${i},-1)">

                    ↑

                </button>

                <button type="button"
                    ${i===3?"disabled":""}
                    onclick="ExtendedActivitiesLab.move(${i},1)">

                    ↓

                </button>

            </div>

        `).join("");
    }

    function move(index,direction) {

        const next = index+direction;

        if (next<0 || next>=order.length) {

            return;

        }

        [order[index],order[next]] =
            [order[next],order[index]];

        document.getElementById(
            "exOrder"
        ).innerHTML = orderHTML();

        document.getElementById(
            "exOrderResult"
        ).textContent = "";

    }

    function checkOrder() {

        const correct =
            order.every((ion,i)=>
                ion===correctOrder[i]
            );

        const result =
            document.getElementById(
                "exOrderResult"
            );

        result.style.color = correct
            ?"#86efac"
            :"#fca5a5";

        result.textContent = correct
            ?"Correct! All four ions are arranged correctly."
            :"Incorrect order. Examine the observations and try again.";

    }

    function revealOrder() {

        const answer =
            document.getElementById(
                "exOrderAnswer"
            );

        const button =
            document.getElementById(
                "exOrderReveal"
            );

        const visible =
            answer.style.display==="block";

        answer.style.display =
            visible?"none":"block";

        button.textContent =
            visible?"Reveal Answer":"Hide Answer";

    }

    function resetOrder() {

        order = [...initialOrder];

        document.getElementById(
            "exOrder"
        ).innerHTML = orderHTML();

        document.getElementById(
            "exOrderResult"
        ).textContent = "";

        document.getElementById(
            "exOrderAnswer"
        ).style.display = "none";

        document.getElementById(
            "exOrderReveal"
        ).textContent = "Reveal Answer";

    }

    /* ACTIVITY 2: LEAD-SILVER CELL */

    function diagram() {

        return `

        <svg viewBox="0 0 800 390"
            xmlns="http://www.w3.org/2000/svg"
            style="width:100%;font-family:Segoe UI,Arial">

            <defs>

                <linearGradient id="exLead">

                    <stop stop-color="#475569"/>
                    <stop offset=".5"
                        stop-color="#94a3b8"/>
                    <stop offset="1"
                        stop-color="#475569"/>

                </linearGradient>

                <linearGradient id="exSilver">

                    <stop stop-color="#94a3b8"/>
                    <stop offset=".5"
                        stop-color="#f8fafc"/>
                    <stop offset="1"
                        stop-color="#94a3b8"/>

                </linearGradient>

            </defs>

            <!-- Voltmeter -->

            <rect x="305" y="10"
                width="190" height="80"
                rx="10"
                fill="#334155"
                stroke="#64748b"/>

            <text x="400" y="30"
                text-anchor="middle"
                fill="#e2e8f0"
                font-size="13">

                IDEAL CELL VOLTAGE

            </text>

            <rect x="325" y="40"
                width="150" height="35"
                rx="5"
                fill="#052e16"/>

            <text id="exVoltage"
                x="400" y="65"
                text-anchor="middle"
                font-size="25"
                fill="#86efac">

                0.925 V

            </text>

            <!-- External copper wire -->

            <path d="
                M180 165 V55 H305
                M495 55 H620 V165"

                stroke="#94a3b8"
                stroke-width="4"
                fill="none"/>

            <!-- Circuit switch -->

            <rect x="225" y="44"
                width="35" height="22"
                fill="#091525"/>

            <circle cx="228" cy="55"
                r="4" fill="#cbd5e1"/>

            <circle cx="258" cy="55"
                r="4" fill="#cbd5e1"/>

            <path id="exSwitch"
                d="M228 55 H258"
                stroke="#e2e8f0"
                stroke-width="4"
                stroke-linecap="round"/>

            <!-- Lead nitrate solution -->

            <rect id="exPbSolution"
                x="70" y="210"
                width="240" height="120"
                rx="5"
                fill="#bae6fd"
                opacity=".35"/>

            <!-- Silver nitrate solution -->

            <rect id="exAgSolution"
                x="490" y="210"
                width="240" height="120"
                rx="5"
                fill="#cbd5e1"
                opacity=".35"/>

            <!-- Glass beakers -->

            <path d="
                M65 180 V315
                Q65 335 85 335
                H295 Q315 335 315 315
                V180

                M485 180 V315
                Q485 335 505 335
                H715 Q735 335 735 315
                V180"

                stroke="#bae6fd"
                stroke-width="3"
                fill="none"/>

            <!-- Lead electrode -->

            <rect x="160" y="165"
                width="40" height="145"
                rx="4"
                fill="url(#exLead)"/>

            <!-- Silver electrode -->

            <rect x="600" y="165"
                width="40" height="145"
                rx="4"
                fill="url(#exSilver)"/>

            <!-- Salt bridge -->

            <path d="
                M270 265 V165
                Q400 95 530 165
                V265"

                stroke="#cbd5e1"
                stroke-width="23"
                stroke-linecap="round"
                fill="none"/>

            <path d="
                M270 265 V165
                Q400 95 530 165
                V265"

                stroke="#64748b"
                stroke-width="14"
                stroke-linecap="round"
                fill="none"/>

            <text x="400" y="180"
                text-anchor="middle"
                fill="#e2e8f0"
                font-size="15">

                KNO₃ Salt Bridge

            </text>

            <!-- Electrode labels -->

            <text x="180" y="145"
                text-anchor="middle"
                fill="#7dd3fc"
                font-size="18">

                Pb (−)

            </text>

            <text x="620" y="145"
                text-anchor="middle"
                fill="#fca5a5"
                font-size="18">

                Ag (+)

            </text>

            <text x="180" y="360"
                text-anchor="middle"
                fill="#e2e8f0"
                font-size="16">

                Lead nitrate

            </text>

            <text x="180" y="382"
                text-anchor="middle"
                fill="#94a3b8"
                font-size="14">

                Pb(NO₃)₂

            </text>

            <text x="620" y="360"
                text-anchor="middle"
                fill="#e2e8f0"
                font-size="16">

                Silver nitrate

            </text>

            <text x="620" y="382"
                text-anchor="middle"
                fill="#94a3b8"
                font-size="14">

                AgNO₃

            </text>

            <!-- Dissolved ions -->

            <g id="exPbIons"></g>

            <g id="exAgIons"></g>

            <text x="400" y="105"
                text-anchor="middle"
                fill="#facc15"
                font-size="13">

                Electron flow under load: Pb → Ag

            </text>

        </svg>

        `;
    }

    function ionSymbols(
        concentration,metal
    ) {

        const count = Math.max(
            1,
            Math.round(concentration*8)
        );

        return Array.from(
            {length:count},
            (_,i)=>{

                const x =
                    (metal==="Pb"?95:515)
                    +(i%4)*55;

                const y =
                    235+Math.floor(i/4)*65;

                return `

                    <g>

                        <circle cx="${x}"
                            cy="${y}"
                            r="15"
                            fill="${metal==="Pb"
                                ?"#7dd3fc"
                                :"#e2e8f0"}"
                            opacity=".9"/>

                        <text x="${x}"
                            y="${y+4}"
                            text-anchor="middle"
                            font-size="11"
                            fill="#081426">

                            ${metal==="Pb"
                                ?"Pb²⁺"
                                :"Ag⁺"}

                        </text>

                    </g>

                `;

            }
        ).join("");

    }

    /* IDEAL VOLTAGE CALCULATION */

    function updateVoltage() {

        const pbInput =
            document.getElementById("exPb");

        const agInput =
            document.getElementById("exAg");

        if (!pbInput || !agInput) return;

        const pb = Number(pbInput.value);
        const ag = Number(agInput.value);

        /*
           Overall reaction:

           Pb + 2Ag⁺ → Pb²⁺ + 2Ag

           E = E° - (0.05916 / 2) log Q

           Q = [Pb²⁺] / [Ag⁺]²

           Temperature: 25°C
           Ideal solution approximation
        */

        const E0 = 0.925;

        const Q = pb/(ag*ag);

        const voltage =
            E0-(0.05916/2)*Math.log10(Q);

        document.getElementById(
            "exPbValue"
        ).textContent = pb.toFixed(2)+" M";

        document.getElementById(
            "exAgValue"
        ).textContent = ag.toFixed(2)+" M";

        document.getElementById(
            "exVoltage"
        ).textContent = connected
            ?voltage.toFixed(3)+" V"
            :"—";

        document.getElementById(
            "exVoltageLarge"
        ).textContent = connected
            ?voltage.toFixed(3)+" V"
            :"Disconnected";

        document.getElementById(
            "exPbSolution"
        ).setAttribute(
            "opacity",
            .1+pb*.25
        );

        document.getElementById(
            "exAgSolution"
        ).setAttribute(
            "opacity",
            .1+ag*.25
        );

        document.getElementById(
            "exPbIons"
        ).innerHTML =
            ionSymbols(pb,"Pb");

        document.getElementById(
            "exAgIons"
        ).innerHTML =
            ionSymbols(ag,"Ag");

        document.getElementById(
            "exSwitch"
        ).setAttribute(
            "d",
            connected
                ?"M228 55 H258"
                :"M228 55 L255 35"
        );

        document.getElementById(
            "exCircuitButton"
        ).textContent = connected
            ?"Disconnect Voltmeter"
            :"Connect Voltmeter";

        const status =
            document.getElementById(
                "exVoltageStatus"
            );

        if (!connected) {

            status.textContent =
                "Voltmeter disconnected. No voltage reading.";

        } else if (voltage>E0+.0005) {

            status.textContent =
                "Predicted voltage is higher than the standard cell voltage.";

        } else if (voltage<E0-.0005) {

            status.textContent =
                "Predicted voltage is lower than the standard cell voltage.";

        } else {

            status.textContent =
                "Predicted voltage is approximately equal to the standard cell voltage.";

        }

    }

    function toggleCircuit() {

        connected = !connected;

        updateVoltage();

    }

    function dilute(metal) {

        const input =
            document.getElementById(
                metal==="Pb"
                    ?"exPb"
                    :"exAg"
            );

        input.value = Math.max(
            .01,
            Number(input.value)/10
        );

        updateVoltage();

    }

    function resetCell() {

        connected = true;

        document.getElementById(
            "exPb"
        ).value = 1;

        document.getElementById(
            "exAg"
        ).value = 1;

        updateVoltage();

        document.querySelectorAll(
            ".exCellAnswer"
        ).forEach(element=>{

            element.style.display = "none";

        });

        document.querySelectorAll(
            ".exAnswerButton"
        ).forEach(button=>{

            button.textContent = "Reveal Answer";

        });

    }

    function revealCell(index) {

        const answer =
            document.getElementById(
                "exCellAnswer"+index
            );

        const button =
            document.getElementById(
                "exCellButton"+index
            );

        const visible =
            answer.style.display==="block";

        answer.style.display =
            visible?"none":"block";

        button.textContent =
            visible?"Reveal Answer":"Hide Answer";

    }

    const cellQuestions = [

        [
            "What is the anode?",
            "Lead electrode (Pb)."
        ],

        [
            "What is the cathode?",
            "Silver electrode (Ag)."
        ],

        [
            "Where does oxidation occur?",
            "At the lead electrode.<p>Pb → Pb²⁺ + 2e⁻</p>"
        ],

        [
            "Where does reduction occur?",
            "At the silver electrode.<p>2Ag⁺ + 2e⁻ → 2Ag</p>"
        ],

        [
            "In which direction do electrons flow?",
            "From lead to silver through the external circuit when a load is connected."
        ],

        [
            "What will be the cell voltage?",
            "It depends on concentration and temperature. The approximate standard cell voltage is 0.925 V. The actual value must be measured experimentally."
        ],

        [
            "Will voltage vary when the solutions are diluted alternately?",
            "Yes. In the ideal model, diluting lead nitrate increases cell voltage, while diluting silver nitrate decreases cell voltage, with other conditions unchanged."
        ]

    ];

    function render() {

        order = [...initialOrder];

        connected = true;

        return `

        <div id="extendedActivitiesLab"
            style="width:100%">

            <div style="
                padding:18px;
                text-align:center;
                border:1px solid #0e7490;
                border-radius:12px;
                background:#164e6333">

                <small>XYLEM NADAPURAM</small>

                <h2 style="color:#7dd3fc">

                    EXTENDED ACTIVITIES

                </h2>

                <p>

                    Electrochemistry — Page 120

                </p>

            </div>

            <!-- ACTIVITY 1 -->

            <div style="
                padding:18px;
                margin-top:18px;
                border:1px solid #334155;
                border-radius:12px">

                <h3 style="color:#7dd3fc">

                    ACTIVITY 1

                </h3>

                <h2>Unknown Metals Challenge</h2>

                <p>

                    Study the following observations.

                </p>

                <div style="overflow-x:auto">

                    <table style="
                        width:100%;
                        border-collapse:collapse">

                        <thead>

                            <tr>

                                <th style="padding:12px">
                                    Metal
                                </th>

                                <th style="padding:12px">
                                    Solution
                                </th>

                                <th style="padding:12px">
                                    Observation
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            ${[
                                [
                                    "A",
                                    "B²⁺",
                                    "No reaction"
                                ],
                                [
                                    "A",
                                    "C⁺",
                                    "No change"
                                ],
                                [
                                    "D",
                                    "C⁺",
                                    "Black deposit of C; D²⁺ forms"
                                ],
                                [
                                    "B",
                                    "D²⁺",
                                    "D deposits; B²⁺ forms"
                                ]
                            ].map(row=>`

                                <tr style="
                                    border-bottom:
                                        1px solid #334155">

                                    ${row.map(value=>`

                                        <td style="
                                            padding:12px">

                                            ${value}

                                        </td>

                                    `).join("")}

                                </tr>

                            `).join("")}

                        </tbody>

                    </table>

                </div>

                <p style="
                    margin-top:20px;
                    font-size:18px">

                    Arrange A⁺, B²⁺, C⁺ and D²⁺
                    in ascending order of their
                    ability to attract electrons.

                </p>

                <p style="color:#94a3b8">

                    Lowest electron attraction

                </p>

                <div id="exOrder"
                    style="display:grid;gap:8px">

                    ${orderHTML()}

                </div>

                <p style="color:#94a3b8">

                    Highest electron attraction

                </p>

                <div style="
                    display:flex;
                    flex-wrap:wrap;
                    gap:10px;
                    margin:15px 0">

                    <button type="button"
                        onclick="ExtendedActivitiesLab.checkOrder()">

                        Check Answer

                    </button>

                    <button type="button"
                        id="exOrderReveal"
                        onclick="ExtendedActivitiesLab.revealOrder()">

                        Reveal Answer

                    </button>

                    <button type="button"
                        onclick="ExtendedActivitiesLab.resetOrder()">

                        Reset

                    </button>

                </div>

                <p id="exOrderResult"></p>

                <div id="exOrderAnswer"
                    style="
                        display:none;
                        padding:18px;
                        background:#14532d33;
                        border:1px solid #22c55e;
                        border-radius:10px">

                    <strong style="color:#86efac">

                        CORRECT ORDER

                    </strong>

                    <p style="
                        font-size:25px;
                        text-align:center">

                        B²⁺ &lt; D²⁺ &lt; C⁺ &lt; A⁺

                    </p>

                    <h3>Explanation</h3>

                    <p>

                        D displaces C from its solution.
                        Therefore, D is more reactive
                        than C.

                    </p>

                    <p>

                        B displaces D from its solution.
                        Therefore, B is more reactive
                        than D.

                    </p>

                    <p>

                        A does not displace B or C.
                        In the textbook model,
                        A is less reactive than both.

                    </p>

                    <p>

                        Reactivity of metals:

                        <strong>

                            B &gt; D &gt; C &gt; A

                        </strong>

                    </p>

                    <p>

                        The electron-attracting ability
                        of the corresponding ions
                        follows the reverse order.

                    </p>

                </div>

            </div>

            <!-- ACTIVITY 2 -->

            <div style="
                padding:18px;
                margin-top:20px;
                border:1px solid #334155;
                border-radius:12px">

                <h3 style="color:#7dd3fc">

                    ACTIVITY 2

                </h3>

                <h2>Lead-Silver Galvanic Cell</h2>

                <p>

                    Explore how electrolyte
                    concentration affects
                    cell voltage.

                </p>

                ${diagram()}

                <!-- Concentration controls -->

                <div style="
                    display:grid;
                    grid-template-columns:
                        repeat(auto-fit,minmax(
                            min(100%,220px),1fr
                        ));
                    gap:15px">

                    <div style="
                        padding:16px;
                        border:1px solid #38bdf8;
                        border-radius:10px">

                        <strong style="color:#7dd3fc">

                            LEAD NITRATE

                        </strong>

                        <p id="exPbValue"
                            style="font-size:24px">

                            1.00 M

                        </p>

                        <input type="range"
                            id="exPb"
                            min="0.01"
                            max="1"
                            step="0.01"
                            value="1"
                            style="width:100%"
                            oninput="ExtendedActivitiesLab.updateVoltage()">

                        <button type="button"
                            style="margin-top:10px"
                            onclick="ExtendedActivitiesLab.dilute('Pb')">

                            Dilute Lead Nitrate

                        </button>

                    </div>

                    <div style="
                        padding:16px;
                        border:1px solid #94a3b8;
                        border-radius:10px">

                        <strong>

                            SILVER NITRATE

                        </strong>

                        <p id="exAgValue"
                            style="font-size:24px">

                            1.00 M

                        </p>

                        <input type="range"
                            id="exAg"
                            min="0.01"
                            max="1"
                            step="0.01"
                            value="1"
                            style="width:100%"
                            oninput="ExtendedActivitiesLab.updateVoltage()">

                        <button type="button"
                            style="margin-top:10px"
                            onclick="ExtendedActivitiesLab.dilute('Ag')">

                            Dilute Silver Nitrate

                        </button>

                    </div>

                </div>

                <!-- Voltage dashboard -->

                <div style="
                    padding:20px;
                    margin-top:15px;
                    border:1px solid #0e7490;
                    border-radius:12px;
                    text-align:center;
                    background:#164e6333">

                    <small>

                        CALCULATED CELL VOLTAGE

                    </small>

                    <div id="exVoltageLarge"
                        style="
                            font-size:38px;
                            font-weight:bold;
                            color:#86efac">

                        0.925 V

                    </div>

                    <p id="exVoltageStatus">

                        Standard concentration model.

                    </p>

                </div>

                <div style="
                    display:flex;
                    justify-content:center;
                    flex-wrap:wrap;
                    gap:12px;
                    margin:15px">

                    <button type="button"
                        id="exCircuitButton"
                        onclick="ExtendedActivitiesLab.toggleCircuit()">

                        Disconnect Voltmeter

                    </button>

                    <button type="button"
                        onclick="ExtendedActivitiesLab.resetCell()">

                        Reset Experiment

                    </button>

                </div>

                <!-- Electrode reactions -->

                <div class="definition">

                    <strong>

                        OVERALL CELL REACTION

                    </strong>

                    <p style="font-size:22px">

                        Pb + 2Ag⁺ → Pb²⁺ + 2Ag

                    </p>

                </div>

                <!-- Textbook questions -->

                <h3 style="
                    color:#7dd3fc;
                    margin-top:20px">

                    OBSERVATION QUESTIONS

                </h3>

                ${cellQuestions.map((item,i)=>`

                    <div style="
                        padding:15px;
                        margin:10px 0;
                        border:1px solid #334155;
                        border-radius:10px">

                        <strong>

                            ${String.fromCharCode(97+i)})
                            ${item[0]}

                        </strong>

                        <div style="margin-top:12px">

                            <button type="button"
                                class="exAnswerButton"
                                id="exCellButton${i}"
                                onclick="ExtendedActivitiesLab.revealCell(${i})">

                                Reveal Answer

                            </button>

                        </div>

                        <div
                            class="exCellAnswer"
                            id="exCellAnswer${i}"
                            style="
                                display:none;
                                margin-top:12px;
                                padding:14px;
                                border-left:
                                    4px solid #22c55e;
                                background:#14532d22">

                            ${item[1]}

                        </div>

                    </div>

                `).join("")}

                <p style="
                    color:#94a3b8;
                    font-size:12px;
                    text-align:center">

                    Virtual experiment only.
                    Voltage is calculated using an
                    ideal Nernst equation model
                    at 25°C. Solution shading and
                    ion counts are illustrative.
                    Actual voltage must be measured.

                </p>

            </div>

            <!-- CHAPTER COMPLETION -->

            <div style="
                margin-top:20px;
                padding:25px;
                text-align:center;
                border:1px solid #0e7490;
                border-radius:14px;
                background:#164e6333">

                <div style="font-size:45px">

                    ✓

                </div>

                <h2 style="color:#86efac">

                    CHAPTER COMPLETE

                </h2>

                <h3>ELECTROCHEMISTRY</h3>

                <p>

                    XYLEM NADAPURAM CHEMISTRY STUDIO

                </p>

                <p>

                    Learn • Explore • Experiment

                </p>

                <button type="button"
                    onclick="goToScene(38)">

                    Return to Chapter Assessment

                </button>

            </div>

        </div>

        `;
    }

    function reset() {

        if (!document.getElementById(
            "extendedActivitiesLab"
        )) return;

        resetOrder();
        resetCell();

    }

    return {

        render,
        move,
        checkOrder,
        revealOrder,
        resetOrder,
        updateVoltage,
        toggleCircuit,
        dilute,
        resetCell,
        revealCell,
        reset

    };

})();

/* CONNECT EXTENDED ACTIVITIES TO SCENE 40 */

(() => {

    const previousRender =
        ElectrochemistryAnimations.render;

    ElectrochemistryAnimations.render =
        function(topic) {

            if (
                topic.animation==="extendedActivities"
            ) {

                return ExtendedActivitiesLab.render();

            }

            return previousRender.call(this,topic);

        };

    const previousReset =
        ElectrochemistryAnimations.reset;

    ElectrochemistryAnimations.reset =
        function() {

            previousReset.call(this);

            if (
                document.getElementById(
                    "extendedActivitiesLab"
                )
            ) {

                ExtendedActivitiesLab.reset();

            }

        };

})();

/* INITIALISE LEAD-SILVER CELL AFTER RENDERING */

(() => {

    const sceneElement =
        document.getElementById("scene");

    if (!sceneElement) return;

    const observer = new MutationObserver(()=>{

        const lab =
            document.getElementById(
                "extendedActivitiesLab"
            );

        if (
            lab &&
            lab.dataset.initialised!=="true"
        ) {

            lab.dataset.initialised = "true";

            ExtendedActivitiesLab.updateVoltage();

        }

    });

    observer.observe(sceneElement,{
        childList:true,
        subtree:true
    });

})();