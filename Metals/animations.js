
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

    const stars = Array.from({length:75},(_,i)=>
        `<circle cx="${(i*137.31)%800}"
                 cy="${(i*71.73)%340}"
                 r="${i%7===0?1.3:.55}"
                 fill="#dbeafe"
                 opacity="${.2+(i%5)*.12}"/>`
    ).join('');

    const rocks = Array.from({length:180},(_,i)=>
        `<path d="M${425+(i*37.7)%337}
                   ${105+(i*23.9)%155}
                   l${3+i%9} -${2+i%4} 5 4 -8 4Z"
               fill="${['#d0aa80','#33251f',
                        '#98775b','#e0c3a0'][i%4]}"
               opacity=".27"/>`
    ).join('');

    return frame(`

        <defs>

            <radialGradient id="v3Ocean"
                cx="35%" cy="28%" r="75%">

                <stop stop-color="#429fce"/>
                <stop offset=".5" stop-color="#145e99"/>
                <stop offset="1" stop-color="#061c39"/>

            </radialGradient>

            <radialGradient id="v3Shade"
                cx="28%" cy="25%" r="78%">

                <stop stop-color="#fff"
                      stop-opacity=".12"/>

                <stop offset=".65"
                      stop-color="#001127"
                      stop-opacity="0"/>

                <stop offset="1"
                      stop-color="#000817"
                      stop-opacity=".85"/>

            </radialGradient>

            <linearGradient id="v3Land"
                x2=".8" y2="1">

                <stop stop-color="#b4b77c"/>
                <stop offset=".45" stop-color="#527c45"/>
                <stop offset="1" stop-color="#234c37"/>

            </linearGradient>

            <linearGradient id="v3Soil"
                x2="0" y2="1">

                <stop stop-color="#9e7650"/>
                <stop offset="1" stop-color="#392b28"/>

            </linearGradient>

            <linearGradient id="v3Ore">

                <stop stop-color="#7d4930"/>
                <stop offset=".45" stop-color="#e8ad63"/>
                <stop offset="1" stop-color="#69442f"/>

            </linearGradient>

            <clipPath id="v3Globe">

                <circle cx="205" cy="156" r="119"/>

            </clipPath>

            <clipPath id="v3Crust">

                <rect x="420" y="75"
                      width="350" height="195"
                      rx="9"/>

            </clipPath>

            <filter id="v3Glow">

                <feGaussianBlur stdDeviation="4"/>

            </filter>

        </defs>

        <!-- SPACE BACKGROUND -->

        <rect width="800" height="340"
              rx="14" fill="#06111f"/>

        ${stars}

        <!-- PLANET EARTH -->

        <g>

            <circle cx="205" cy="156" r="124"
                    fill="none"
                    stroke="#4acbff"
                    stroke-width="7"
                    opacity=".6"
                    filter="url(#v3Glow)"/>

            <circle cx="205" cy="156" r="119"
                    fill="url(#v3Ocean)"
                    stroke="#75d5ff"
                    stroke-width="1.5"/>

            <g clip-path="url(#v3Globe)">

                <!-- MOVING CONTINENTS -->

                <g fill="url(#v3Land)"
                   stroke="#86a477"
                   stroke-width=".7">

                    <path d="
                        M83 77 L104 61 122 65
                        135 48 161 51 173 65
                        191 68 186 84 166 94
                        156 111 142 119 150 133
                        137 142 123 125 109 119
                        98 100 81 94Z

                        M144 142 L164 137 181 148
                        202 155 213 172 199 191
                        191 215 176 239 165 248
                        160 224 151 203 153 180
                        140 159Z"/>

                    <path d="
                        M229 72 L248 56 264 64
                        283 48 311 59 338 52
                        366 77 350 97 330 101
                        320 125 300 117 286 134
                        270 118 255 122 248 106
                        231 104 219 88Z

                        M236 116 L259 122 278 143
                        271 166 255 190 243 209
                        230 188 226 166 215 149
                        218 129Z

                        M307 201 L328 185 349 195
                        363 215 345 229 319 225Z"/>

                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="-18 0;18 0;-18 0"
                        dur="18s"
                        repeatCount="indefinite"/>

                </g>

                <!-- CLOUD MOVEMENT -->

                <g fill="none"
                   stroke="#f1f8ff"
                   stroke-linecap="round"
                   opacity=".32">

                    <path d="
                        M75 95 Q140 60 200 100
                        T330 100

                        M100 185 Q150 150 215 184
                        T345 170

                        M95 235 Q170 210 230 237
                        T340 230"

                        stroke-width="8"/>

                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="-12 0;12 0;-12 0"
                        dur="12s"
                        repeatCount="indefinite"/>

                </g>

                <!-- EARTH SHADOW -->

                <circle cx="205" cy="156" r="119"
                        fill="url(#v3Shade)"/>

            </g>

            ${label(205,310,'Earth','#dbeafe',19)}

        </g>

        <!-- SURFACE SELECTION -->

        <g opacity="0">

            <animate attributeName="opacity"
                     from="0" to="1"
                     begin="1s"
                     dur="1s"
                     fill="freeze"/>

            <circle cx="290" cy="110" r="13"
                    fill="none"
                    stroke="#facc15"
                    stroke-width="2">

                <animate attributeName="r"
                         values="10;17;10"
                         dur="2s"
                         repeatCount="indefinite"/>

            </circle>

            <path d="
                M303 102 L420 75
                M303 120 L420 270"

                stroke="#67d5ff"
                stroke-width="1.5"
                stroke-dasharray="6 5"
                fill="none"/>

        </g>

        <!-- EARTH CRUST REVEAL -->

        <g opacity="0">

            <animate attributeName="opacity"
                     from="0" to="1"
                     begin="2s"
                     dur="1.4s"
                     fill="freeze"/>

            ${label(
                595,43,
                "Earth's crust — enlarged section",
                '#dbeafe',17
            )}

            <g clip-path="url(#v3Crust)">

                <rect x="420" y="75"
                      width="350" height="195"
                      fill="url(#v3Soil)"/>

                <!-- SURFACE VEGETATION -->

                <path d="
                    M420 90 Q460 50 500 82
                    T580 82 T660 78 T770 83
                    V110 Q700 98 650 111
                    T540 108 T420 118Z"

                    fill="#567c3c"/>

                <!-- FIRST ROCK LAYER -->

                <path d="
                    M420 120 Q500 90 570 135
                    T770 118 V145
                    Q670 178 580 153
                    T420 151Z"

                    fill="#c29a70"/>

                <!-- SECOND ROCK LAYER -->

                <path d="
                    M420 180 Q490 145 560 178
                    T770 175 V211
                    Q690 230 600 208
                    T420 215Z"

                    fill="#665044"/>

                <!-- DEEP ROCK LAYER -->

                <path d="
                    M420 235 Q510 210 590 242
                    T770 226 V270 H420Z"

                    fill="#44332e"/>

                ${rocks}

                <!-- MINERAL DEPOSITS -->

                <path d="
                    M460 151 L485 135
                    516 144 539 158
                    512 176 479 169Z"

                    fill="url(#v3Ore)"
                    stroke="#f4bf75"/>

                <path d="
                    M601 218 L625 191
                    657 196 690 213
                    667 229 630 235Z"

                    fill="#a4b1bd"
                    stroke="#e0e7ee"/>

            </g>

            <rect x="420" y="75"
                  width="350" height="195"
                  rx="9"
                  fill="none"
                  stroke="#64748b"/>

        </g>

        <!-- HIGHLIGHT MINERAL DEPOSITS -->

        <g opacity="0">

            <animate attributeName="opacity"
                     from="0" to="1"
                     begin="4s"
                     dur="1s"
                     fill="freeze"/>

            <ellipse cx="500" cy="155"
                     rx="46" ry="27"
                     fill="none"
                     stroke="#facc15"
                     stroke-width="2"
                     stroke-dasharray="5 3"/>

            <ellipse cx="646" cy="214"
                     rx="52" ry="30"
                     fill="none"
                     stroke="#facc15"
                     stroke-width="2"
                     stroke-dasharray="5 3"/>

            <path d="
                M500 182 L550 289
                M646 244 L630 289"

                stroke="#facc15"
                fill="none"/>

            ${label(
                595,310,
                'Mineral deposits',
                '#facc15',19
            )}

        </g>

    `);

}


    
function hydraulic() {

    const grains = (heavy) =>
        Array.from({length: 18}, (_, i) => `
            <circle r="${heavy ? 4 : 3}"
                fill="${heavy ? '#64748b' : '#d6b98c'}"
                stroke="${heavy ? '#cbd5e1' : '#92734d'}"
                stroke-width=".7">

                <animateMotion
                    path="${heavy
                        ? `M${220+i%5*8} 92
                           L${240+i%5*8} 145
                           Q${280+i*7} 190 ${290+i*9} 235`
                        : `M${220+i%5*8} 92
                           L${240+i%5*8} 145
                           Q420 150 610 158
                           L680 205 L710 250`}"
                    dur="${heavy ? 4 : 3}s"
                    begin="${i*.23}s"
                    repeatCount="indefinite"/>

            </circle>
        `).join('');

    return frame(`

        <defs>

            <linearGradient id="hwTank" x2="0" y2="1">
                <stop stop-color="#64748b"/>
                <stop offset="1" stop-color="#1e293b"/>
            </linearGradient>

            <clipPath id="hwClip">
                <path d="M110 130 H610 V170
                         L570 245 H155Z"/>
            </clipPath>

        </defs>

        <!-- BACKGROUND -->

        <rect width="800" height="340"
              rx="14" fill="#0b1726"/>

        <!-- ORE HOPPER -->

        ${label(240,25,'Powdered ore','#e2e8f0',17)}

        <path d="M185 40 H295
                 L260 83 V105 H220 V83Z"
              fill="url(#steel)"
              stroke="#94a3b8"
              stroke-width="2"/>

        <path d="M195 48 H285
                 L257 78 H223Z"
              fill="#a58b69"/>

        <!-- WATER INLET -->

        ${label(80,82,'Water','#7dd3fc',16)}

        <path d="M30 100 H95 V145 H140"
              fill="none"
              stroke="#64748b"
              stroke-width="22"
              stroke-linejoin="round"/>

        <path d="M30 100 H95 V145 H140"
              fill="none"
              stroke="#38bdf8"
              stroke-width="10"
              stroke-linejoin="round"/>

        <!-- SEPARATION TANK -->

        <path d="M100 120 H620 V170
                 L580 255 H145Z"
              fill="url(#hwTank)"
              stroke="#94a3b8"
              stroke-width="3"/>

        <path d="M110 140 H610 V170
                 L570 245 H155Z"
              fill="#075985"
              opacity=".8"/>

        <!-- FLOWING WATER -->

        <g clip-path="url(#hwClip)">

            ${Array.from({length: 6}, (_, i) => `

                <path d="M110 ${150+i*13} H610"
                      stroke="#7dd3fc"
                      stroke-width="2"
                      stroke-dasharray="22 36"
                      opacity=".5">

                    <animate
                        attributeName="stroke-dashoffset"
                        from="58"
                        to="0"
                        dur="1.3s"
                        repeatCount="indefinite"/>

                </path>

            `).join('')}

            <!-- SETTLED HEAVY ORE -->

            ${Array.from({length: 36}, (_, i) => `

                <circle
                    cx="${275+(i*37)%245}"
                    cy="${229+(i*7)%13}"
                    r="${3+i%3}"
                    fill="#64748b"
                    stroke="#94a3b8"
                    stroke-width=".6"/>

            `).join('')}

        </g>

        <!-- GANGUE OUTLET -->

        <path d="M610 158 H650 L710 235"
              fill="none"
              stroke="#64748b"
              stroke-width="25"/>

        <path d="M610 158 H650 L710 235"
              fill="none"
              stroke="#38bdf8"
              stroke-width="13"/>

        <!-- WASTE COLLECTION -->

        <path d="M660 230 L675 280
                 H755 L770 230"
              fill="#334155"
              stroke="#94a3b8"
              stroke-width="3"/>

        <!-- MOVING PARTICLES -->

        ${grains(true)}
        ${grains(false)}

        <!-- LABELS -->

        ${label(420,110,'Water flow →','#7dd3fc',17)}

        ${label(710,303,'Gangue','#e7c69b',16)}

        <path d="M400 245 V275"
              stroke="#cbd5e1"
              stroke-width="1.5"/>

        ${label(400,294,'Heavy ore settles','#e2e8f0',18)}

        ${label(
            400,324,
            'Separation based on difference in density',
            '#94a3b8',15
        )}

    `);
}


    // ======================================
    // FROTH FLOATATION
    // ======================================

    
function froth() {

    const bubbles = Array.from(
        {length: 26}, (_, i) => {

        const x = 200 + (i * 47) % 340;
        const r = 5 + i % 7;

        return `
            <g>

                <circle r="${r}"
                    fill="#bae6fd"
                    fill-opacity=".22"
                    stroke="#e0f2fe"
                    stroke-width="1.2"/>

                <circle cx="${r-2}" cy="2"
                    r="3.5"
                    fill="#d4a94e"
                    stroke="#facc15"
                    stroke-width=".7"/>

                <animateMotion
                    path="M${x} 250
                          Q${x-25} 190
                          ${x+10} 115"
                    dur="${3+i%3}s"
                    begin="${i*.18}s"
                    repeatCount="indefinite"/>

            </g>
        `;

    }).join("");

    const gangue = Array.from(
        {length: 28}, (_, i) => `

        <circle
            cx="${195+(i*53)%350}"
            cy="${165+(i*17)%55}"
            r="${3+i%3}"
            fill="#92785c">

            <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0;8 20;0 48"
                dur="${3+i%3}s"
                begin="${i*.15}s"
                repeatCount="indefinite"/>

        </circle>

    `).join("");

    return frame(`

        <defs>

            <linearGradient id="ffLiquid"
                x2="0" y2="1">

                <stop stop-color="#267fa2"
                      stop-opacity=".65"/>

                <stop offset="1"
                      stop-color="#123b59"/>

            </linearGradient>

            <clipPath id="ffTank">

                <rect x="155" y="115"
                      width="430" height="160"
                      rx="8"/>

            </clipPath>

        </defs>

        <!-- BACKGROUND -->

        <rect width="800" height="340"
              rx="14" fill="#0b1726"/>

        <!-- MOTOR -->

        <rect x="320" y="15"
              width="100" height="42"
              rx="7"
              fill="url(#steel)"
              stroke="#94a3b8"/>

        ${label(370,42,"Motor","#0f172a",15)}

        <!-- TANK -->

        <rect x="145" y="90"
              width="450" height="195"
              rx="12"
              fill="#334155"
              stroke="#94a3b8"
              stroke-width="3"/>

        <rect x="155" y="120"
              width="430" height="155"
              rx="7"
              fill="url(#ffLiquid)"/>

        <!-- ROTATING SHAFT -->

        <rect x="363" y="57"
              width="14" height="175"
              fill="url(#steel)"/>

        <!-- IMPELLER -->

        <g>

            <ellipse cx="370" cy="233"
                     rx="65" ry="10"
                     fill="#94a3b8"/>

            <ellipse cx="370" cy="233"
                     rx="15" ry="7"
                     fill="#e2e8f0"/>

            <animateTransform
                attributeName="transform"
                type="translate"
                values="-8 0;8 0;-8 0"
                dur=".5s"
                repeatCount="indefinite"/>

        </g>

        <!-- AIR SUPPLY PIPE -->

        <path d="M35 220 H100
                 V265 H370 V248"
              fill="none"
              stroke="#64748b"
              stroke-width="17"
              stroke-linejoin="round"/>

        <path d="M35 220 H100
                 V265 H370 V248"
              fill="none"
              stroke="#38bdf8"
              stroke-width="7"
              stroke-dasharray="12 9">

            <animate
                attributeName="stroke-dashoffset"
                from="21" to="0"
                dur=".6s"
                repeatCount="indefinite"/>

        </path>

        ${label(75,200,"Air inlet","#7dd3fc",16)}

        <!-- ORE AND GANGUE -->

        <g clip-path="url(#ffTank)">

            ${gangue}
            ${bubbles}

            ${Array.from(
                {length:45},(_,i)=>`

                <circle
                    cx="${175+(i*43)%390}"
                    cy="${260+(i*7)%11}"
                    r="${3+i%3}"
                    fill="#92785c"
                    opacity=".85"/>

            `).join("")}

        </g>

        <!-- FROTH LAYER -->

        ${Array.from(
            {length:32},(_,i)=>`

            <g>

                <circle
                    cx="${165+(i*31)%415}"
                    cy="${105+(i*13)%19}"
                    r="${9+i%6}"
                    fill="#e0f2fe"
                    fill-opacity=".85"
                    stroke="#ffffff"
                    stroke-width=".7"/>

                <circle
                    cx="${165+(i*31)%415}"
                    cy="${105+(i*13)%19}"
                    r="3"
                    fill="#d4a94e"/>

                <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="0 0;0 -4;0 0"
                    dur="${1+i%3*.3}s"
                    repeatCount="indefinite"/>

            </g>

        `).join("")}

        <!-- FROTH OVERFLOW -->

        <path d="M590 110 L685 170"
              fill="none"
              stroke="#64748b"
              stroke-width="26"/>

        <path d="M590 110 L685 170"
              fill="none"
              stroke="#dbeafe"
              stroke-width="14"/>

        ${Array.from(
            {length:12},(_,i)=>`

            <g>

                <circle r="8"
                        fill="#e0f2fe"
                        stroke="#ffffff"/>

                <circle r="3"
                        fill="#d4a94e"/>

                <animateMotion
                    path="M565 108
                          L590 110
                          L685 170
                          L700 230"
                    dur="2.5s"
                    begin="${i*.23}s"
                    repeatCount="indefinite"/>

            </g>

        `).join("")}

        <!-- ORE COLLECTOR -->

        <path d="M635 195 L650 270
                 H755 L770 195"
              fill="#334155"
              stroke="#94a3b8"
              stroke-width="3"/>

        ${Array.from(
            {length:24},(_,i)=>`

            <circle
                cx="${660+(i*19)%85}"
                cy="${240+(i*7)%20}"
                r="5"
                fill="#d4a94e"
                stroke="#facc15"
                stroke-width=".5"/>

        `).join("")}

        <!-- LABELS -->

        ${label(190,75,
            "Ore-rich froth","#e0f2fe",16)}

        ${label(700,290,
            "Concentrated ore","#facc15",15)}

        ${label(370,305,
            "Gangue settles","#d6b98c",16)}

        ${label(400,329,
            "Separation based on preferential wetting",
            "#94a3b8",15)}

        ${label(510,175,
            "Air bubbles","#bae6fd",14)}

        ${label(245,150,
            "Ore + Water + Pine oil",
            "#ffffff",13)}

    `);
}


    // ======================================
    // MAGNETIC SEPARATION
    // ======================================

    
function magnetic() {

    const magneticParticles = Array.from(
        {length:18}, (_,i) => `

        <circle r="${4+i%3}"
                fill="#64748b"
                stroke="#cbd5e1"
                stroke-width=".8">

            <animateMotion
                path="M160 72
                      L555 72
                      Q605 72 610 115
                      Q610 155 565 170
                      L510 255"
                dur="5s"
                begin="${i*.28}s"
                repeatCount="indefinite"/>

        </circle>

    `).join("");

    const nonMagneticParticles = Array.from(
        {length:18}, (_,i) => `

        <circle r="${4+i%3}"
                fill="#d6b98c"
                stroke="#a78b65"
                stroke-width=".8">

            <animateMotion
                path="M160 72
                      L570 72
                      Q630 80 655 145
                      L710 255"
                dur="4.5s"
                begin="${i*.26}s"
                repeatCount="indefinite"/>

        </circle>

    `).join("");

    return frame(`

        <defs>

            <linearGradient id="msBelt"
                x2="0" y2="1">

                <stop stop-color="#475569"/>
                <stop offset="1"
                      stop-color="#111827"/>

            </linearGradient>

            <linearGradient id="msMagnet">

                <stop stop-color="#dc2626"/>
                <stop offset=".49"
                      stop-color="#dc2626"/>
                <stop offset=".5"
                      stop-color="#2563eb"/>
                <stop offset="1"
                      stop-color="#2563eb"/>

            </linearGradient>

        </defs>

        <!-- BACKGROUND -->

        <rect width="800" height="340"
              rx="14" fill="#0b1726"/>

        <!-- SUPPORTING FRAME -->

        <path d="M150 145 V275
                 M540 145 V275
                 M150 260 H540
                 M150 260 L540 150
                 M150 150 L540 260"
              stroke="#475569"
              stroke-width="8"
              fill="none"/>

        <!-- CONVEYOR BELT -->

        <rect x="110" y="80"
              width="510" height="78"
              rx="39"
              fill="url(#msBelt)"
              stroke="#94a3b8"
              stroke-width="3"/>

        <!-- MOVING BELT SURFACE -->

        <path d="M150 82 H580"
              stroke="#cbd5e1"
              stroke-width="4"
              stroke-dasharray="15 18">

            <animate
                attributeName="stroke-dashoffset"
                from="33"
                to="0"
                dur=".45s"
                repeatCount="indefinite"/>

        </path>

        <path d="M150 155 H580"
              stroke="#64748b"
              stroke-width="4"
              stroke-dasharray="15 18">

            <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="33"
                dur=".45s"
                repeatCount="indefinite"/>

        </path>

        <!-- NORMAL ROLLER -->

        <g>

            <circle cx="150" cy="119"
                    r="32"
                    fill="url(#steel)"
                    stroke="#64748b"
                    stroke-width="3"/>

            <path d="M150 91 V147
                     M122 119 H178
                     M130 99 L170 139
                     M130 139 L170 99"
                  stroke="#475569"
                  stroke-width="3"/>

            <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 150 119"
                to="360 150 119"
                dur="2s"
                repeatCount="indefinite"/>

        </g>

        <!-- MAGNETIC ROLLER -->

        <g>

            <circle cx="580" cy="119"
                    r="36"
                    fill="url(#msMagnet)"
                    stroke="#cbd5e1"
                    stroke-width="3"/>

            ${label(562,125,"N","#ffffff",18)}
            ${label(598,125,"S","#ffffff",18)}

            <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 580 119"
                to="360 580 119"
                dur="2s"
                repeatCount="indefinite"/>

        </g>

        <!-- MAGNETIC FIELD LINES -->

        <g fill="none"
           stroke="#60a5fa"
           stroke-width="1.5"
           stroke-dasharray="5 5">

            <ellipse cx="580" cy="119"
                     rx="49" ry="48"/>

            <ellipse cx="580" cy="119"
                     rx="61" ry="60"/>

            <ellipse cx="580" cy="119"
                     rx="73" ry="72"/>

            <animate
                attributeName="opacity"
                values=".2;.8;.2"
                dur="2s"
                repeatCount="indefinite"/>

        </g>

        <!-- ORE FEED HOPPER -->

        <path d="M105 15 H215
                 L180 50 V65
                 H140 V50Z"
              fill="url(#steel)"
              stroke="#94a3b8"
              stroke-width="2"/>

        ${Array.from(
            {length:20},(_,i)=>`

            <circle
                cx="${125+(i*13)%70}"
                cy="${25+(i*7)%18}"
                r="${3+i%3}"
                fill="${i%2===0
                    ? '#64748b'
                    : '#d6b98c'}"/>

        `).join("")}

        <!-- FALLING MIXED ORE -->

        ${Array.from(
            {length:8},(_,i)=>`

            <circle cx="${145+i%4*9}"
                    cy="55"
                    r="4"
                    fill="${i%2===0
                        ? '#64748b'
                        : '#d6b98c'}">

                <animate
                    attributeName="cy"
                    from="55"
                    to="74"
                    dur=".65s"
                    begin="${i*.1}s"
                    repeatCount="indefinite"/>

            </circle>

        `).join("")}

        <!-- MOVING ORE PARTICLES -->

        ${magneticParticles}
        ${nonMagneticParticles}

        <!-- SEPARATOR DIVIDER -->

        <path d="M625 185 V290"
              stroke="#94a3b8"
              stroke-width="5"/>

        <!-- MAGNETIC COLLECTION BIN -->

        <path d="M430 235 L450 290
                 H580 L600 235"
              fill="#334155"
              stroke="#94a3b8"
              stroke-width="3"/>

        ${Array.from(
            {length:30},(_,i)=>`

            <circle
                cx="${465+(i*17)%100}"
                cy="${267+(i*7)%17}"
                r="${4+i%3}"
                fill="#64748b"
                stroke="#94a3b8"
                stroke-width=".6"/>

        `).join("")}

        <!-- NON-MAGNETIC COLLECTION BIN -->

        <path d="M640 235 L655 290
                 H755 L775 235"
              fill="#334155"
              stroke="#94a3b8"
              stroke-width="3"/>

        ${Array.from(
            {length:25},(_,i)=>`

            <circle
                cx="${670+(i*19)%70}"
                cy="${267+(i*7)%17}"
                r="${4+i%3}"
                fill="#d6b98c"
                stroke="#a78b65"
                stroke-width=".6"/>

        `).join("")}

        <!-- DIRECTION INDICATOR -->

        <path d="M270 48 H435"
              stroke="#38bdf8"
              stroke-width="2"/>

        <path d="M435 48 L423 42
                 V54Z"
              fill="#38bdf8"/>

        ${label(350,35,
            "Conveyor movement",
            "#7dd3fc",15)}

        <!-- LABELS -->

        ${label(65,35,
            "Mixed ore","#e2e8f0",14)}

        ${label(580,25,
            "Magnetic roller",
            "#e2e8f0",17)}

        ${label(715,110,
            "Magnetic field",
            "#60a5fa",14)}

        ${label(515,310,
            "Magnetic particles",
            "#cbd5e1",15)}

        ${label(705,310,
            "Non-magnetic",
            "#d6b98c",15)}

        ${label(400,333,
            "Separation based on magnetic properties",
            "#94a3b8",15)}

    `);
}


    // ======================================
    // LEACHING
    // ======================================

    
function leaching() {

    const dissolvingOre = Array.from(
        {length:24}, (_,i)=>`

        <circle
            cx="${100+(i*31)%145}"
            cy="${145+(i*17)%85}"
            r="${4+i%3}"
            fill="#d4a94e">

            <animate
                attributeName="r"
                values="${4+i%3};2;0"
                dur="${3+i%4}s"
                begin="${i*.2}s"
                repeatCount="indefinite"/>

        </circle>

    `).join("");

    const dissolvedParticles = Array.from(
        {length:22},(_,i)=>`

        <circle
            cx="${95+(i*37)%155}"
            cy="${150+(i*23)%90}"
            r="2.5"
            fill="#7dd3fc">

            <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0;12 -10;-8 8;0 0"
                dur="${2+i%3}s"
                repeatCount="indefinite"/>

        </circle>

    `).join("");

    return frame(`

        <defs>

            <linearGradient id="lcSolution"
                x2="0" y2="1">

                <stop stop-color="#38bdf8"
                      stop-opacity=".35"/>

                <stop offset="1"
                      stop-color="#0369a1"
                      stop-opacity=".85"/>

            </linearGradient>

            <linearGradient id="lcGlass">

                <stop stop-color="#bae6fd"
                      stop-opacity=".2"/>

                <stop offset=".5"
                      stop-color="#ffffff"
                      stop-opacity=".03"/>

                <stop offset="1"
                      stop-color="#bae6fd"
                      stop-opacity=".2"/>

            </linearGradient>

            <clipPath id="lcBeaker">

                <path d="M70 95 V245
                         Q70 260 85 260
                         H255 Q270 260 270 245
                         V95Z"/>

            </clipPath>

        </defs>

        <!-- BACKGROUND -->

        <rect width="800" height="340"
              rx="14" fill="#0b1726"/>

        <!-- STAGE HEADINGS -->

        ${label(170,28,
            "01. Dissolution","#7dd3fc",19)}

        ${label(415,28,
            "02. Filtration","#7dd3fc",19)}

        ${label(665,28,
            "03. Collection","#7dd3fc",19)}

        <!-- DISSOLUTION BEAKER -->

        <path d="M70 95 V245
                 Q70 260 85 260
                 H255 Q270 260 270 245
                 V95"
              fill="url(#lcGlass)"
              stroke="#cbd5e1"
              stroke-width="3"/>

        <g clip-path="url(#lcBeaker)">

            <rect x="73" y="135"
                  width="194" height="125"
                  fill="url(#lcSolution)"/>

            <!-- LIQUID SURFACE -->

            <path d="M73 135
                     Q120 129 170 135
                     T267 135"
                  fill="none"
                  stroke="#7dd3fc"
                  stroke-width="2">

                <animate
                    attributeName="d"
                    values="M73 135 Q120 129 170 135 T267 135;
                            M73 135 Q120 141 170 135 T267 135;
                            M73 135 Q120 129 170 135 T267 135"
                    dur="2s"
                    repeatCount="indefinite"/>

            </path>

            ${dissolvingOre}
            ${dissolvedParticles}

            <!-- INSOLUBLE GANGUE -->

            ${Array.from(
                {length:22},(_,i)=>`

                <circle
                    cx="${85+(i*23)%170}"
                    cy="${238+(i*7)%15}"
                    r="${4+i%3}"
                    fill="#92785c"/>

            `).join("")}

        </g>

        <!-- STIRRING ROD -->

        <rect x="165" y="65"
              width="8" height="165"
              rx="4"
              fill="#cbd5e1">

            <animateTransform
                attributeName="transform"
                type="rotate"
                values="-12 169 65;
                         12 169 65;
                        -12 169 65"
                dur="1.5s"
                repeatCount="indefinite"/>

        </rect>

        ${label(170,52,
            "Powdered ore + Solvent",
            "#e2e8f0",14)}

        ${label(170,282,
            "Selective dissolution",
            "#e2e8f0",15)}

        <!-- TRANSFER ARROW -->

        <path d="M285 160 H330"
              stroke="#38bdf8"
              stroke-width="3"/>

        <path d="M330 160 L318 153
                 V167Z"
              fill="#38bdf8"/>

        <!-- FILTER FUNNEL -->

        <path d="M340 80 H490
                 L425 180
                 V220 H405
                 V180Z"
              fill="url(#lcGlass)"
              stroke="#cbd5e1"
              stroke-width="3"/>

        <!-- FILTER PAPER -->

        <path d="M350 95 H480
                 L415 178Z"
              fill="#f1f5f9"
              fill-opacity=".85"/>

        <!-- MIXTURE -->

        <path d="M360 110 H470
                 L415 165Z"
              fill="#38bdf8"
              fill-opacity=".45"/>

        <!-- GANGUE RESIDUE -->

        ${Array.from(
            {length:24},(_,i)=>`

            <circle
                cx="${385+(i*17)%60}"
                cy="${119+(i*7)%20}"
                r="${3+i%3}"
                fill="#92785c"
                stroke="#6b4f38"
                stroke-width=".5"/>

        `).join("")}

        ${label(415,65,
            "Filter paper","#e2e8f0",15)}

        ${label(415,105,
            "Gangue","#92400e",14)}

        <!-- FALLING FILTRATE -->

        ${Array.from(
            {length:8},(_,i)=>`

            <ellipse cx="415"
                     cy="220"
                     rx="3.5" ry="6"
                     fill="#38bdf8">

                <animate
                    attributeName="cy"
                    from="220" to="265"
                    dur="1s"
                    begin="${i*.14}s"
                    repeatCount="indefinite"/>

            </ellipse>

        `).join("")}

        <!-- FILTRATE RECEIVER -->

        <path d="M365 230 V280
                 H465 V230"
              fill="url(#lcGlass)"
              stroke="#cbd5e1"
              stroke-width="2"/>

        <rect x="368" y="260"
              width="94" height="17"
              fill="url(#lcSolution)"/>

        ${label(415,300,
            "Filtrate","#7dd3fc",15)}

        <!-- SECOND TRANSFER ARROW -->

        <path d="M500 160 H555"
              stroke="#38bdf8"
              stroke-width="3"/>

        <path d="M555 160 L543 153
                 V167Z"
              fill="#38bdf8"/>

        <!-- COLLECTION BEAKER -->

        <path d="M580 95 V245
                 Q580 260 595 260
                 H735 Q750 260 750 245
                 V95"
              fill="url(#lcGlass)"
              stroke="#cbd5e1"
              stroke-width="3"/>

        <rect x="583" y="150"
              width="164" height="107"
              rx="4"
              fill="url(#lcSolution)"/>

        <!-- DISSOLVED ORE COMPONENT -->

        ${Array.from(
            {length:36},(_,i)=>`

            <circle
                cx="${595+(i*31)%140}"
                cy="${160+(i*17)%85}"
                r="2.8"
                fill="#bae6fd">

                <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="0 0;5 -7;0 0"
                    dur="${2+i%3}s"
                    repeatCount="indefinite"/>

            </circle>

        `).join("")}

        ${label(665,135,
            "Filtered solution",
            "#e2e8f0",16)}

        ${label(665,190,
            "Dissolved ore",
            "#ffffff",16)}

        ${label(665,211,
            "component",
            "#ffffff",16)}

        ${label(665,282,
            "Further processing",
            "#4ade80",16)}

        <!-- PRINCIPLE -->

        <rect x="135" y="310"
              width="530" height="25"
              rx="8"
              fill="#17283d"
              stroke="#334155"/>

        ${label(400,328,
            "Separation based on selective solubility",
            "#7dd3fc",15)}

    `);
}


    // ======================================
    // HEATING: CALCINATION AND ROASTING
    // ======================================

    
function heating(roasting = false) {

    const oreName = roasting
        ? "Sulphide ore"
        : "Carbonate ore";

    const gasName = roasting
        ? "SO₂"
        : "CO₂";

    const reaction = roasting
        ? "2ZnS + 3O₂ → 2ZnO + 2SO₂"
        : "ZnCO₃ → ZnO + CO₂";

    const flames = Array.from(
        {length:9},(_,i)=>`

        <g transform="translate(${245+i*39} 267)">

            <path d="M-15 0
                     Q-30 -25 -8 -45
                     Q-5 -22 4 -62
                     Q30 -25 15 0Z"
                  fill="url(#htFlame)">

                <animateTransform
                    attributeName="transform"
                    type="scale"
                    values="1 .7;1 1;1 .8;1 .7"
                    dur="${.6+i%3*.2}s"
                    repeatCount="indefinite"/>

            </path>

            <path d="M-6 0
                     Q-12 -15 2 -32
                     Q15 -12 6 0Z"
                  fill="#fef08a"/>

        </g>

    `).join("");

    const gases = Array.from(
        {length:12},(_,i)=>`

        <g opacity="0">

            <circle r="12"
                    fill="#cbd5e1"
                    fill-opacity=".2"
                    stroke="#e2e8f0"
                    stroke-width=".7"/>

            <text y="4"
                  fill="#ffffff"
                  font-size="10"
                  text-anchor="middle">
                ${gasName}
            </text>

            <animateMotion
                path="M${285+i%6*40} 180
                      Q400 130 400 85
                      L400 22"
                dur="${3+i%3}s"
                begin="${i*.35}s"
                repeatCount="indefinite"/>

            <animate
                attributeName="opacity"
                values="0;.9;.9;0"
                dur="${3+i%3}s"
                begin="${i*.35}s"
                repeatCount="indefinite"/>

        </g>

    `).join("");

    const ore = Array.from(
        {length:48},(_,i)=>`

        <circle
            cx="${265+(i*37)%270}"
            cy="${185+(i*13)%22}"
            r="${4+i%4}"
            fill="${roasting
                ? '#b5a05c'
                : '#a8a29e'}"
            stroke="#78716c"
            stroke-width=".6">

            <animate
                attributeName="fill"
                values="${roasting
                    ? '#b5a05c'
                    : '#a8a29e'};
                    #e7e5e4;#f1f5f9"
                dur="6s"
                begin="${i*.05}s"
                fill="freeze"/>

        </circle>

    `).join("");

    return frame(`

        <defs>

            <linearGradient id="htWall"
                x2="0" y2="1">

                <stop stop-color="#64748b"/>
                <stop offset=".5"
                      stop-color="#334155"/>
                <stop offset="1"
                      stop-color="#1e293b"/>

            </linearGradient>

            <radialGradient id="htChamber">

                <stop stop-color="#9a3412"/>
                <stop offset=".6"
                      stop-color="#431407"/>
                <stop offset="1"
                      stop-color="#1c0a05"/>

            </radialGradient>

            <linearGradient id="htFlame"
                x1="0" y1="1"
                x2="0" y2="0">

                <stop stop-color="#fef08a"/>
                <stop offset=".35"
                      stop-color="#facc15"/>
                <stop offset=".7"
                      stop-color="#f97316"/>
                <stop offset="1"
                      stop-color="#dc2626"/>

            </linearGradient>

            <clipPath id="htInside">

                <rect x="220" y="100"
                      width="360" height="170"
                      rx="10"/>

            </clipPath>

        </defs>

        <!-- BACKGROUND -->

        <rect width="800" height="340"
              rx="14" fill="#0b1726"/>

        <!-- PROCESS TITLE -->

        ${label(
            120,35,
            roasting ? "ROASTING" : "CALCINATION",
            "#facc15",19
        )}

        <!-- CHIMNEY -->

        <path d="M370 100 V35
                 H430 V100Z"
              fill="url(#htWall)"
              stroke="#94a3b8"
              stroke-width="3"/>

        <rect x="360" y="25"
              width="80" height="12"
              rx="3"
              fill="#64748b"/>

        ${label(500,30,
            gasName + " released",
            "#e2e8f0",17)}

        <!-- FURNACE BODY -->

        <rect x="190" y="75"
              width="420" height="215"
              rx="16"
              fill="url(#htWall)"
              stroke="#94a3b8"
              stroke-width="3"/>

        <!-- REFRACTORY BRICKS -->

        ${Array.from(
            {length:5},(_,row)=>

            Array.from(
                {length:9},(_,col)=>`

                <rect
                    x="${200+col*44}"
                    y="${85+row*40}"
                    width="41"
                    height="37"
                    rx="2"
                    fill="none"
                    stroke="#94a3b8"
                    stroke-opacity=".25"/>

            `).join("")

        ).join("")}

        <!-- HEATING CHAMBER -->

        <rect x="220" y="100"
              width="360" height="170"
              rx="10"
              fill="url(#htChamber)"
              stroke="#f97316"
              stroke-width="2"/>

        <!-- FLAMES -->

        <g clip-path="url(#htInside)">

            ${flames}

        </g>

        <!-- ORE TRAY -->

        <path d="M245 200
                 H555 L540 225
                 H260Z"
              fill="url(#steel)"
              stroke="#94a3b8"
              stroke-width="2"/>

        <!-- ORE PARTICLES -->

        ${ore}

        <!-- GAS RELEASE -->

        ${gases}

        <!-- HEAT WAVES -->

        ${Array.from(
            {length:5},(_,i)=>`

            <path
                d="M${270+i*65} 245
                   q-12 -10 0 -20
                   q12 -10 0 -20"
                stroke="#fb923c"
                stroke-width="2"
                fill="none"
                opacity=".5">

                <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="0 0;0 -25"
                    dur="1.5s"
                    begin="${i*.2}s"
                    repeatCount="indefinite"/>

                <animate
                    attributeName="opacity"
                    values=".2;.8;0"
                    dur="1.5s"
                    repeatCount="indefinite"/>

            </path>

        `).join("")}

        <!-- AIR SUPPLY -->

        ${roasting ? `

            <path d="M30 145 H220"
                  stroke="#64748b"
                  stroke-width="25"/>

            <path d="M30 145 H220"
                  stroke="#38bdf8"
                  stroke-width="10"
                  stroke-dasharray="14 12">

                <animate
                    attributeName="stroke-dashoffset"
                    from="26" to="0"
                    dur=".6s"
                    repeatCount="indefinite"/>

            </path>

            ${Array.from(
                {length:9},(_,i)=>`

                <g>

                    <circle r="9"
                            fill="#0284c7"
                            stroke="#7dd3fc"/>

                    <text y="4"
                          text-anchor="middle"
                          font-size="10"
                          fill="#ffffff">O₂</text>

                    <animateMotion
                        path="M35 145 L220 145
                              Q270 145 300 180"
                        dur="2.8s"
                        begin="${i*.3}s"
                        repeatCount="indefinite"/>

                </g>

            `).join("")}

            ${label(105,115,
                "Excess air",
                "#7dd3fc",17)}

        ` : `

            <path d="M35 145 H185"
                  stroke="#64748b"
                  stroke-width="20"/>

            <rect x="170" y="126"
                  width="18" height="38"
                  rx="3"
                  fill="#ef4444"/>

            <path d="M75 125 L110 165
                     M110 125 L75 165"
                  stroke="#ef4444"
                  stroke-width="5"/>

            ${label(105,110,
                "Limited / No air",
                "#f87171",16)}

        `}

        <!-- ORE LABEL -->

        ${label(400,165,
            oreName,"#ffffff",17)}

        <!-- PRODUCT INDICATOR -->

        <path d="M550 210 L650 210"
              stroke="#4ade80"
              stroke-width="2"
              stroke-dasharray="5 4"/>

        <rect x="630" y="165"
              width="150" height="80"
              rx="10"
              fill="#123126"
              stroke="#4ade80"/>

        ${label(705,195,
            "Product","#86efac",15)}

        ${label(705,220,
            "Metal oxide","#ffffff",17)}

        <!-- HEAT LABEL -->

        ${label(400,285,
            "Strong heating",
            "#facc15",16)}

        <!-- CHEMICAL EQUATION -->

        <rect x="145" y="302"
              width="510" height="32"
              rx="8"
              fill="#17283d"
              stroke="#475569"/>

        ${label(400,324,
            reaction,"#e2e8f0",19)}

    `);
}


    // ======================================
    // BLAST FURNACE
    // ======================================

    
function blastFurnace() {

    const charge = Array.from(
        {length:32},(_,i)=>`

        <circle
            r="${4+i%3}"
            fill="${[
                '#a94d35',
                '#292524',
                '#d6d3d1'
            ][i%3]}"
            stroke="#94a3b8"
            stroke-width=".5">

            <animateMotion
                path="M${365+i%5*16} 45
                      L${350+i%7*16} 100
                      L${325+i%9*18} 165
                      L${340+i%7*18} 235"
                dur="${7+i%3}s"
                begin="${i*.25}s"
                repeatCount="indefinite"/>

        </circle>

    `).join("");

    const gases = Array.from(
        {length:18},(_,i)=>`

        <g opacity="0">

            <circle r="10"
                    fill="#facc15"
                    fill-opacity=".18"
                    stroke="#facc15"
                    stroke-width=".7"/>

            <text y="4"
                  font-size="10"
                  fill="#fef08a"
                  text-anchor="middle">
                CO
            </text>

            <animateMotion
                path="M${330+i%8*20} 235
                      Q${320+i%8*20} 150
                      ${365+i%5*15} 65"
                dur="${4+i%3}s"
                begin="${i*.3}s"
                repeatCount="indefinite"/>

            <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur="${4+i%3}s"
                begin="${i*.3}s"
                repeatCount="indefinite"/>

        </g>

    `).join("");

    return frame(`

        <defs>

            <linearGradient id="bfWall">

                <stop stop-color="#475569"/>
                <stop offset=".25"
                      stop-color="#cbd5e1"/>
                <stop offset=".5"
                      stop-color="#64748b"/>
                <stop offset=".8"
                      stop-color="#94a3b8"/>
                <stop offset="1"
                      stop-color="#334155"/>

            </linearGradient>

            <linearGradient id="bfTemperature"
                x2="0" y2="1">

                <stop stop-color="#334155"/>
                <stop offset=".25"
                      stop-color="#713f12"/>
                <stop offset=".55"
                      stop-color="#9a3412"/>
                <stop offset=".8"
                      stop-color="#ea580c"/>
                <stop offset="1"
                      stop-color="#facc15"/>

            </linearGradient>

            <linearGradient id="bfIron"
                x2="0" y2="1">

                <stop stop-color="#fef08a"/>
                <stop offset=".4"
                      stop-color="#fb923c"/>
                <stop offset="1"
                      stop-color="#dc2626"/>

            </linearGradient>

            <linearGradient id="bfSlag"
                x2="0" y2="1">

                <stop stop-color="#fde68a"/>
                <stop offset="1"
                      stop-color="#a16207"/>

            </linearGradient>

            <clipPath id="bfInterior">

                <path d="M355 48 H445
                         L455 90
                         L510 185
                         L475 245
                         V295 H325
                         V245 L290 185
                         L345 90Z"/>

            </clipPath>

        </defs>

        <!-- BACKGROUND -->

        <rect width="800" height="340"
              rx="14" fill="#0b1726"/>

        <!-- RAW MATERIAL HOPPER -->

        <path d="M340 10 H460
                 L435 40 H365Z"
              fill="url(#bfWall)"
              stroke="#94a3b8"
              stroke-width="2"/>

        ${Array.from(
            {length:24},(_,i)=>`

            <circle
                cx="${355+(i*19)%90}"
                cy="${18+(i*7)%14}"
                r="4"
                fill="${[
                    '#a94d35',
                    '#292524',
                    '#d6d3d1'
                ][i%3]}"/>

        `).join("")}

        <!-- RAW MATERIAL LABELS -->

        ${label(170,25,
            "Raw materials","#7dd3fc",17)}

        <circle cx="85" cy="45"
                r="5" fill="#a94d35"/>

        ${label(160,50,
            "Iron ore","#e2e8f0",15)}

        <circle cx="85" cy="66"
                r="5" fill="#292524"
                stroke="#94a3b8"/>

        ${label(160,71,
            "Coke","#e2e8f0",15)}

        <circle cx="85" cy="87"
                r="5" fill="#d6d3d1"/>

        ${label(160,92,
            "Limestone","#e2e8f0",15)}

        <!-- FURNACE OUTER WALL -->

        <path d="M340 35 H460
                 L470 85
                 L535 185
                 L495 250
                 V310 H305
                 V250 L265 185
                 L330 85Z"
              fill="url(#bfWall)"
              stroke="#94a3b8"
              stroke-width="3"/>

        <!-- REFRACTORY LINING -->

        <path d="M350 43 H450
                 L463 88
                 L520 185
                 L485 247
                 V300 H315
                 V247 L280 185
                 L337 88Z"
              fill="#a16207"
              stroke="#d6b98c"
              stroke-width="2"/>

        <!-- FURNACE INTERIOR -->

        <path d="M355 48 H445
                 L455 90
                 L510 185
                 L475 245
                 V295 H325
                 V245 L290 185
                 L345 90Z"
              fill="url(#bfTemperature)"/>

        <g clip-path="url(#bfInterior)">

            <!-- TEMPERATURE ZONES -->

            <path d="M290 105 H510
                     M290 165 H510
                     M290 225 H510"
                  stroke="#f8fafc"
                  stroke-opacity=".3"
                  stroke-dasharray="6 5"/>

            <!-- DESCENDING CHARGE -->

            ${charge}

            <!-- ASCENDING CARBON MONOXIDE -->

            ${gases}

            <!-- COMBUSTION ZONE -->

            ${Array.from(
                {length:7},(_,i)=>`

                <path
                    d="M${310+i*27} 245
                       q-15 -20 0 -45
                       q18 20 0 45Z"
                    fill="#facc15"
                    opacity=".8">

                    <animate
                        attributeName="opacity"
                        values=".3;1;.5;.3"
                        dur="${.7+i%3*.2}s"
                        repeatCount="indefinite"/>

                </path>

            `).join("")}

            <!-- MOLTEN SLAG LAYER -->

            <rect x="315" y="255"
                  width="180" height="17"
                  fill="url(#bfSlag)"/>

            <!-- MOLTEN IRON LAYER -->

            <rect x="315" y="272"
                  width="180" height="28"
                  fill="url(#bfIron)"/>

            <!-- MOVING LIQUID SURFACE -->

            <path d="M320 272
                     Q360 267 400 272
                     T480 272"
                  stroke="#fef08a"
                  stroke-width="2"
                  fill="none">

                <animate
                    attributeName="d"
                    values="M320 272 Q360 267 400 272 T480 272;
                            M320 272 Q360 277 400 272 T480 272;
                            M320 272 Q360 267 400 272 T480 272"
                    dur="2s"
                    repeatCount="indefinite"/>

            </path>

        </g>

        <!-- HOT AIR INLET LEFT -->

        <path d="M55 230 H290"
              stroke="#64748b"
              stroke-width="23"/>

        <path d="M55 230 H290"
              stroke="#f97316"
              stroke-width="10"
              stroke-dasharray="15 12">

            <animate
                attributeName="stroke-dashoffset"
                from="27" to="0"
                dur=".5s"
                repeatCount="indefinite"/>

        </path>

        <!-- HOT AIR INLET RIGHT -->

        <path d="M745 230 H510"
              stroke="#64748b"
              stroke-width="23"/>

        <path d="M745 230 H510"
              stroke="#f97316"
              stroke-width="10"
              stroke-dasharray="15 12">

            <animate
                attributeName="stroke-dashoffset"
                from="27" to="0"
                dur=".5s"
                repeatCount="indefinite"/>

        </path>

        ${label(140,210,
            "Hot air →","#fb923c",17)}

        ${label(660,210,
            "← Hot air","#fb923c",17)}

        <!-- WASTE GAS OUTLET -->

        <path d="M455 55 H560 V18"
              fill="none"
              stroke="#64748b"
              stroke-width="16"
              stroke-linejoin="round"/>

        <path d="M455 55 H560 V18"
              fill="none"
              stroke="#cbd5e1"
              stroke-width="5"
              stroke-dasharray="8 9">

            <animate
                attributeName="stroke-dashoffset"
                from="17" to="0"
                dur=".8s"
                repeatCount="indefinite"/>

        </path>

        ${label(655,25,
            "Waste gases","#cbd5e1",15)}

        <!-- TEMPERATURE LABELS -->

        ${label(600,90,
            "Upper zone","#e2e8f0",15)}

        ${label(600,108,
            "≈ 400°C","#94a3b8",14)}

        ${label(630,145,
            "Reduction zone","#facc15",15)}

        ${label(630,163,
            "≈ 700–1000°C","#facc15",14)}

        ${label(165,165,
            "High-temperature zone",
            "#fb923c",14)}

        ${label(165,184,
            "≈ 1500–2000°C",
            "#fb923c",15)}

        <!-- REDUCTION REACTION -->

        <rect x="15" y="110"
              width="235" height="37"
              rx="7"
              fill="#17283d"
              stroke="#475569"/>

        ${label(132,134,
            "Fe₂O₃ + 3CO → 2Fe + 3CO₂",
            "#e2e8f0",14)}

        <!-- SLAG OUTLET -->

        <path d="M475 263 H590 L635 280"
              stroke="#64748b"
              stroke-width="17"
              fill="none"/>

        <path d="M475 263 H590 L635 280"
              stroke="#eab308"
              stroke-width="9"
              fill="none"
              stroke-dasharray="18 5">

            <animate
                attributeName="stroke-dashoffset"
                from="23" to="0"
                dur=".7s"
                repeatCount="indefinite"/>

        </path>

        <!-- SLAG COLLECTION -->

        <path d="M590 280 L605 310
                 H710 L725 280"
              fill="#334155"
              stroke="#94a3b8"
              stroke-width="2"/>

        <path d="M603 293 H712
                 L705 307 H610Z"
              fill="url(#bfSlag)"/>

        ${label(660,329,
            "Slag (CaSiO₃)",
            "#fde68a",15)}

        <!-- MOLTEN IRON OUTLET -->

        <path d="M325 286 H220 L175 300"
              stroke="#64748b"
              stroke-width="18"
              fill="none"/>

        <path d="M325 286 H220 L175 300"
              stroke="#fb923c"
              stroke-width="10"
              stroke-dasharray="15 5"
              fill="none">

            <animate
                attributeName="stroke-dashoffset"
                from="20" to="0"
                dur=".6s"
                repeatCount="indefinite"/>

        </path>

        <!-- MOLTEN IRON COLLECTION -->

        <path d="M65 285 L80 315
                 H185 L200 285"
              fill="#334155"
              stroke="#94a3b8"
              stroke-width="2"/>

        <path d="M77 298 H188
                 L180 312 H85Z"
              fill="url(#bfIron)"/>

        ${label(132,333,
            "Molten iron",
            "#fb923c",16)}

        <!-- FURNACE BASE LABEL -->

        ${label(400,330,
            "BLAST FURNACE",
            "#e2e8f0",17)}

    `);
}


    // ======================================
    // ELECTROLYTIC REFINING
    // ======================================

    
function electrolysis(copper = false) {

    const metal = copper ? "Cu" : "M";
    const ion = copper ? "Cu²⁺" : "Mⁿ⁺";

    const anodeReaction = copper
        ? "Cu → Cu²⁺ + 2e⁻"
        : "M → Mⁿ⁺ + ne⁻";

    const cathodeReaction = copper
        ? "Cu²⁺ + 2e⁻ → Cu"
        : "Mⁿ⁺ + ne⁻ → M";

    const metalColor = copper
        ? "#d97745"
        : "#94a3b8";

    const ions = Array.from(
        {length:22},(_,i)=>`

        <g opacity="0">

            <circle r="12"
                    fill="#0284c7"
                    fill-opacity=".8"
                    stroke="#7dd3fc"
                    stroke-width="1"/>

            <text y="4"
                  fill="#ffffff"
                  font-size="10"
                  text-anchor="middle">
                ${ion}
            </text>

            <animateMotion
                path="M245 ${155+i%6*16}
                      Q400 ${140+i%7*18}
                      555 ${155+i%6*16}"
                dur="${4+i%3}s"
                begin="${i*.28}s"
                repeatCount="indefinite"/>

            <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur="${4+i%3}s"
                begin="${i*.28}s"
                repeatCount="indefinite"/>

        </g>

    `).join("");

    const impurities = Array.from(
        {length:16},(_,i)=>`

        <circle r="${3+i%3}"
                fill="#44403c"
                stroke="#78716c"
                stroke-width=".6"
                opacity="0">

            <animateMotion
                path="M${210+i%4*9}
                      ${165+i%5*14}
                      Q${200+i%5*12} 240
                      ${190+i%7*13} 270"
                dur="${3+i%3}s"
                begin="${i*.45}s"
                repeatCount="indefinite"/>

            <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur="${3+i%3}s"
                begin="${i*.45}s"
                repeatCount="indefinite"/>

        </circle>

    `).join("");

    return frame(`

        <defs>

            <linearGradient id="erSolution"
                x2="0" y2="1">

                <stop stop-color="#38bdf8"
                      stop-opacity=".35"/>

                <stop offset="1"
                      stop-color="#075985"
                      stop-opacity=".85"/>

            </linearGradient>

            <linearGradient id="erMetal">

                <stop stop-color="${metalColor}"/>
                <stop offset=".45"
                      stop-color="${copper
                          ? '#fdba74'
                          : '#e2e8f0'}"/>
                <stop offset="1"
                      stop-color="${metalColor}"/>

            </linearGradient>

            <linearGradient id="erGlass">

                <stop stop-color="#bae6fd"
                      stop-opacity=".15"/>

                <stop offset=".5"
                      stop-color="#ffffff"
                      stop-opacity=".02"/>

                <stop offset="1"
                      stop-color="#bae6fd"
                      stop-opacity=".15"/>

            </linearGradient>

            <clipPath id="erTank">

                <rect x="155" y="135"
                      width="490" height="145"
                      rx="5"/>

            </clipPath>

        </defs>

        <!-- BACKGROUND -->

        <rect width="800" height="340"
              rx="14" fill="#0b1726"/>

        <!-- DC POWER SUPPLY -->

        <rect x="315" y="12"
              width="170" height="65"
              rx="10"
              fill="#334155"
              stroke="#94a3b8"
              stroke-width="2"/>

        <rect x="345" y="22"
              width="110" height="25"
              rx="4"
              fill="#071c14"/>

        ${label(400,40,
            "DC SUPPLY","#4ade80",15)}

        <circle cx="340" cy="62"
                r="9" fill="#ef4444"/>

        <circle cx="460" cy="62"
                r="9" fill="#38bdf8"/>

        ${label(340,66,"+","#ffffff",15)}
        ${label(460,66,"−","#ffffff",15)}

        <!-- POSITIVE WIRE -->

        <path d="M340 62 H220 V110"
              fill="none"
              stroke="#ef4444"
              stroke-width="4"
              stroke-linejoin="round"/>

        <!-- NEGATIVE WIRE -->

        <path d="M460 62 H580 V110"
              fill="none"
              stroke="#38bdf8"
              stroke-width="4"
              stroke-linejoin="round"/>

        <!-- ELECTRON MOVEMENT -->

        ${Array.from(
            {length:5},(_,i)=>`

            <g>

                <circle r="7"
                        fill="#facc15"/>

                <text y="3"
                      font-size="9"
                      text-anchor="middle"
                      fill="#111827">e⁻</text>

                <animateMotion
                    path="M220 110
                          V62 H340"
                    dur="2s"
                    begin="${i*.4}s"
                    repeatCount="indefinite"/>

            </g>

            <g>

                <circle r="7"
                        fill="#facc15"/>

                <text y="3"
                      font-size="9"
                      text-anchor="middle"
                      fill="#111827">e⁻</text>

                <animateMotion
                    path="M460 62
                          H580 V110"
                    dur="2s"
                    begin="${i*.4}s"
                    repeatCount="indefinite"/>

            </g>

        `).join("")}

        <!-- ELECTROLYTIC TANK -->

        <rect x="145" y="115"
              width="510" height="175"
              rx="12"
              fill="url(#erGlass)"
              stroke="#cbd5e1"
              stroke-width="3"/>

        <rect x="155" y="140"
              width="490" height="140"
              rx="5"
              fill="url(#erSolution)"/>

        <!-- LIQUID SURFACE -->

        <path d="M155 140
                 Q220 135 285 140
                 T415 140
                 T545 140
                 T645 140"
              fill="none"
              stroke="#7dd3fc"
              stroke-width="2"/>

        <!-- IMPURE ANODE -->

        <rect x="190" y="105"
              width="60" height="145"
              rx="3"
              fill="url(#erMetal)"
              stroke="#cbd5e1"
              stroke-width="1.5">

            <animate
                attributeName="width"
                values="60;30"
                dur="18s"
                fill="freeze"/>

            <animate
                attributeName="x"
                values="190;205"
                dur="18s"
                fill="freeze"/>

        </rect>

        <!-- IMPURITIES IN ANODE -->

        ${Array.from(
            {length:14},(_,i)=>`

            <circle
                cx="${210+(i*13)%20}"
                cy="${120+(i*19)%120}"
                r="${2+i%2}"
                fill="#44403c">

                <animate
                    attributeName="opacity"
                    values="1;0"
                    dur="${5+i*.7}s"
                    fill="freeze"/>

            </circle>

        `).join("")}

        <!-- PURE METAL CATHODE -->

        <rect x="572" y="105"
              width="16" height="145"
              rx="3"
              fill="url(#erMetal)"
              stroke="#e2e8f0"
              stroke-width="1.5">

            <animate
                attributeName="width"
                values="16;46"
                dur="18s"
                fill="freeze"/>

            <animate
                attributeName="x"
                values="572;557"
                dur="18s"
                fill="freeze"/>

        </rect>

        <!-- MOVING METAL IONS -->

        <g clip-path="url(#erTank)">

            ${ions}
            ${impurities}

            <!-- ANODE MUD -->

            ${Array.from(
                {length:35},(_,i)=>`

                <circle
                    cx="${175+(i*19)%105}"
                    cy="${268+(i*7)%9}"
                    r="${2+i%3}"
                    fill="#44403c"
                    opacity="0">

                    <animate
                        attributeName="opacity"
                        from="0" to="1"
                        dur=".8s"
                        begin="${2+i*.35}s"
                        fill="freeze"/>

                </circle>

            `).join("")}

        </g>

        <!-- ION MOVEMENT INDICATOR -->

        <path d="M310 215 H490"
              stroke="#7dd3fc"
              stroke-width="2"
              stroke-dasharray="7 5">

            <animate
                attributeName="stroke-dashoffset"
                from="12" to="0"
                dur=".7s"
                repeatCount="indefinite"/>

        </path>

        <path d="M490 215 L478 209
                 V221Z"
              fill="#7dd3fc"/>

        ${label(400,200,
            "Metal ion movement",
            "#e0f2fe",15)}

        <!-- ANODE LABEL -->

        ${label(105,95,
            "ANODE (+)",
            "#f87171",17)}

        ${label(100,120,
            "Impure metal",
            "#e2e8f0",14)}

        ${label(100,140,
            "Oxidation",
            "#f87171",14)}

        <path d="M110 150 L190 170"
              stroke="#94a3b8"
              stroke-width="1.3"
              fill="none"/>

        <!-- CATHODE LABEL -->

        ${label(695,95,
            "CATHODE (−)",
            "#7dd3fc",17)}

        ${label(700,120,
            "Pure metal",
            "#e2e8f0",14)}

        ${label(700,140,
            "Reduction",
            "#4ade80",14)}

        <path d="M690 150 L590 170"
              stroke="#94a3b8"
              stroke-width="1.3"
              fill="none"/>

        <!-- ANODE MUD LABEL -->

        <path d="M220 273 L110 260"
              stroke="#cbd5e1"
              stroke-width="1.3"/>

        ${label(80,250,
            "Anode mud",
            "#d6d3d1",14)}

        <!-- ELECTROLYTE LABEL -->

        ${label(425,267,
            copper
                ? "Acidified copper sulphate solution"
                : "Suitable metal salt solution",
            "#e0f2fe",14)}

        <!-- ANODE REACTION -->

        <rect x="15" y="302"
              width="370" height="32"
              rx="7"
              fill="#351b24"
              stroke="#ef4444"
              stroke-opacity=".5"/>

        ${label(200,324,
            anodeReaction,
            "#fca5a5",18)}

        <!-- CATHODE REACTION -->

        <rect x="415" y="302"
              width="370" height="32"
              rx="7"
              fill="#123126"
              stroke="#4ade80"
              stroke-opacity=".5"/>

        ${label(600,324,
            cathodeReaction,
            "#86efac",18)}

    `);
}


    // ======================================
    // HALL–HEROULT PROCESS
    // ======================================

    
function aluminium() {

    const aluminiumIons = Array.from(
        {length:18},(_,i)=>`

        <g opacity="0">

            <circle r="12"
                    fill="#0284c7"
                    stroke="#7dd3fc"/>

            <text y="4"
                  font-size="10"
                  text-anchor="middle"
                  fill="#ffffff">Al³⁺</text>

            <animateMotion
                path="M${230+i%9*42} 150
                      Q${240+i%8*42} 205
                      ${230+i%9*42} 260"
                dur="${3+i%3}s"
                begin="${i*.3}s"
                repeatCount="indefinite"/>

            <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur="${3+i%3}s"
                begin="${i*.3}s"
                repeatCount="indefinite"/>

        </g>

    `).join("");

    const oxideIons = Array.from(
        {length:12},(_,i)=>`

        <g opacity="0">

            <circle r="11"
                    fill="#be123c"
                    stroke="#fda4af"/>

            <text y="4"
                  font-size="10"
                  text-anchor="middle"
                  fill="#ffffff">O²⁻</text>

            <animateMotion
                path="M${230+i%8*45} 225
                      Q${280+i%3*120} 190
                      ${280+i%3*120} 160"
                dur="${3+i%2}s"
                begin="${i*.4}s"
                repeatCount="indefinite"/>

            <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur="${3+i%2}s"
                begin="${i*.4}s"
                repeatCount="indefinite"/>

        </g>

    `).join("");

    const gasBubbles = Array.from(
        {length:18},(_,i)=>`

        <g opacity="0">

            <circle r="${8+i%4}"
                    fill="#e2e8f0"
                    fill-opacity=".15"
                    stroke="#cbd5e1"/>

            <text y="3"
                  font-size="9"
                  text-anchor="middle"
                  fill="#ffffff">CO₂</text>

            <animateMotion
                path="M${255+i%3*120} 160
                      Q${235+i%3*120} 105
                      ${245+i%3*120} 65"
                dur="${2+i%3}s"
                begin="${i*.35}s"
                repeatCount="indefinite"/>

            <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur="${2+i%3}s"
                begin="${i*.35}s"
                repeatCount="indefinite"/>

        </g>

    `).join("");

    return frame(`

        <defs>

            <linearGradient id="alSteel">

                <stop stop-color="#475569"/>
                <stop offset=".5"
                      stop-color="#94a3b8"/>
                <stop offset="1"
                      stop-color="#334155"/>

            </linearGradient>

            <linearGradient id="alBath"
                x1="0" y1="0"
                x2="0" y2="1">

                <stop stop-color="#fde68a"/>
                <stop offset=".4"
                      stop-color="#d97706"/>
                <stop offset="1"
                      stop-color="#92400e"/>

            </linearGradient>

            <linearGradient id="alMetal"
                x1="0" y1="0"
                x2="0" y2="1">

                <stop stop-color="#ffffff"/>
                <stop offset=".35"
                      stop-color="#e2e8f0"/>
                <stop offset="1"
                      stop-color="#64748b"/>

            </linearGradient>

            <linearGradient id="alCarbon">

                <stop stop-color="#111827"/>
                <stop offset=".5"
                      stop-color="#475569"/>
                <stop offset="1"
                      stop-color="#111827"/>

            </linearGradient>

            <clipPath id="alInterior">

                <rect x="195" y="125"
                      width="410" height="150"
                      rx="5"/>

            </clipPath>

        </defs>

        <!-- BACKGROUND -->

        <rect width="800" height="340"
              rx="14" fill="#0b1726"/>

        <!-- DC POWER SUPPLY -->

        <rect x="335" y="8"
              width="130" height="48"
              rx="8"
              fill="#334155"
              stroke="#94a3b8"
              stroke-width="2"/>

        ${label(400,29,
            "DC SUPPLY","#4ade80",15)}

        <circle cx="355" cy="45"
                r="8" fill="#ef4444"/>

        <circle cx="445" cy="45"
                r="8" fill="#38bdf8"/>

        ${label(355,49,"+","#ffffff",14)}
        ${label(445,49,"−","#ffffff",14)}

        <!-- POSITIVE CONNECTION -->

        <path d="M355 45 V65
                 H280 V85
                 M355 65 H520 V85
                 M400 65 V85"
              stroke="#ef4444"
              stroke-width="4"
              fill="none"/>

        <!-- NEGATIVE CONNECTION -->

        <path d="M445 45 H650
                 V290 H600"
              stroke="#38bdf8"
              stroke-width="4"
              fill="none"/>

        <!-- STEEL TANK -->

        <path d="M165 110 V285
                 Q165 300 180 300
                 H620
                 Q635 300 635 285
                 V110"
              fill="url(#alSteel)"
              stroke="#94a3b8"
              stroke-width="3"/>

        <!-- CARBON LINING -->

        <path d="M180 115 V285
                 H620 V115"
              fill="#111827"
              stroke="#64748b"
              stroke-width="2"/>

        <!-- MOLTEN ELECTROLYTE -->

        <rect x="195" y="135"
              width="410" height="140"
              fill="url(#alBath)"/>

        <!-- ELECTROLYTE SURFACE -->

        <path d="M195 135
                 Q245 129 295 135
                 T395 135
                 T495 135
                 T605 135"
              fill="none"
              stroke="#fde68a"
              stroke-width="3">

            <animate
                attributeName="d"
                values="M195 135 Q245 129 295 135 T395 135 T495 135 T605 135;
                        M195 135 Q245 141 295 135 T395 135 T495 135 T605 135;
                        M195 135 Q245 129 295 135 T395 135 T495 135 T605 135"
                dur="2s"
                repeatCount="indefinite"/>

        </path>

        <!-- GRAPHITE ANODES -->

        ${[280,400,520].map(x=>`

            <rect x="${x-21}"
                  y="82"
                  width="42"
                  height="98"
                  rx="3"
                  fill="url(#alCarbon)"
                  stroke="#64748b"
                  stroke-width="2">

                <animate
                    attributeName="height"
                    from="98"
                    to="78"
                    dur="25s"
                    fill="freeze"/>

            </rect>

            <rect x="${x-9}"
                  y="70"
                  width="18"
                  height="20"
                  fill="#94a3b8"/>

            ${label(x,110,
                "+","#f87171",18)}

        `).join("")}

        <!-- ALUMINA FEED -->

        <path d="M80 45 H150
                 L130 75 V95
                 H100 V75Z"
              fill="url(#alSteel)"
              stroke="#94a3b8"
              stroke-width="2"/>

        ${Array.from(
            {length:18},(_,i)=>`

            <circle
                cx="${90+(i*13)%50}"
                cy="${50+(i*7)%15}"
                r="3"
                fill="#f8fafc"/>

        `).join("")}

        ${Array.from(
            {length:10},(_,i)=>`

            <circle r="3"
                    fill="#ffffff">

                <animateMotion
                    path="M115 90
                          Q150 100 205 140"
                    dur="1.8s"
                    begin="${i*.18}s"
                    repeatCount="indefinite"/>

            </circle>

        `).join("")}

        ${label(115,30,
            "Alumina","#e2e8f0",16)}

        ${label(115,115,
            "Al₂O₃","#e2e8f0",15)}

        <!-- MOVING IONS -->

        <g clip-path="url(#alInterior)">

            ${aluminiumIons}
            ${oxideIons}

        </g>

        <!-- GAS RELEASE -->

        ${gasBubbles}

        <!-- MOLTEN ALUMINIUM -->

        <rect x="195" y="260"
              width="410" height="15"
              fill="url(#alMetal)">

            <animate
                attributeName="y"
                from="260"
                to="245"
                dur="25s"
                fill="freeze"/>

            <animate
                attributeName="height"
                from="15"
                to="30"
                dur="25s"
                fill="freeze"/>

        </rect>

        ${label(400,270,
            "Molten aluminium",
            "#0f172a",15)}

        <!-- ELECTROLYTE LABEL -->

        <rect x="295" y="192"
              width="210" height="43"
              rx="8"
              fill="#431407"
              fill-opacity=".85"/>

        ${label(400,209,
            "Alumina + Molten cryolite",
            "#fef3c7",14)}

        ${label(400,226,
            "Al₂O₃ + Na₃AlF₆",
            "#ffffff",14)}

        <!-- ANODE LABEL -->

        ${label(105,165,
            "Graphite anodes",
            "#e2e8f0",14)}

        ${label(105,183,
            "Positive (+)",
            "#f87171",14)}

        <path d="M145 155 L260 110"
              stroke="#94a3b8"
              stroke-width="1.3"
              fill="none"/>

        <!-- CATHODE LABEL -->

        ${label(85,240,
            "Carbon lining",
            "#e2e8f0",14)}

        ${label(85,258,
            "Cathode (−)",
            "#7dd3fc",14)}

        <path d="M135 250 L180 265"
              stroke="#94a3b8"
              stroke-width="1.3"/>

        <!-- TEMPERATURE -->

        <rect x="655" y="95"
              width="130" height="50"
              rx="8"
              fill="#431407"
              stroke="#fb923c"/>

        ${label(720,114,
            "Temperature",
            "#fed7aa",13)}

        ${label(720,134,
            "≈ 950°C",
            "#facc15",19)}

        <!-- GAS LABEL -->

        ${label(720,175,
            "CO₂ released",
            "#e2e8f0",15)}

        ${label(720,194,
            "Anodes consumed",
            "#fca5a5",13)}

        <!-- TAPPING OUTLET -->

        <path d="M605 265
                 H675 L705 285"
              stroke="#64748b"
              stroke-width="18"
              fill="none"/>

        <path d="M605 265
                 H675 L705 285"
              stroke="#e2e8f0"
              stroke-width="9"
              stroke-dasharray="15 5"
              fill="none">

            <animate
                attributeName="stroke-dashoffset"
                from="20" to="0"
                dur=".7s"
                repeatCount="indefinite"/>

        </path>

        <!-- COLLECTION CONTAINER -->

        <path d="M660 280
                 L675 305 H760
                 L775 280"
              fill="#334155"
              stroke="#94a3b8"
              stroke-width="2"/>

        <path d="M672 290 H763
                 L755 302 H680Z"
              fill="url(#alMetal)"/>

        ${label(720,323,
            "Aluminium",
            "#e2e8f0",15)}

        <!-- CATHODE REACTION -->

        <rect x="15" y="310"
              width="280" height="25"
              rx="6"
              fill="#123126"
              stroke="#4ade80"/>

        ${label(155,328,
            "Al³⁺ + 3e⁻ → Al",
            "#86efac",16)}

        <!-- OVERALL REACTION -->

        <rect x="310" y="310"
              width="335" height="25"
              rx="6"
              fill="#17283d"
              stroke="#475569"/>

        ${label(477,328,
            "2Al₂O₃ + 3C → 4Al + 3CO₂",
            "#e2e8f0",15)}

    `);
}


    // ======================================
    // CORROSION AND CATHODIC PROTECTION
    // ======================================

    
function corrosion() {

    const rust = Array.from(
        {length:45},(_,i)=>`

        <circle
            cx="${105+(i*13)%37}"
            cy="${135+(i*19)%110}"
            r="${3+i%5}"
            fill="${[
                '#92400e',
                '#b45309',
                '#c2410c',
                '#78350f'
            ][i%4]}"
            opacity="0">

            <animate
                attributeName="opacity"
                from="0" to=".95"
                dur="1.5s"
                begin="${2+i*.35}s"
                fill="freeze"/>

        </circle>

    `).join("");

    const electrons = (path) =>
        Array.from({length:7},(_,i)=>`

        <g opacity="0">

            <circle r="9"
                    fill="#facc15"
                    stroke="#fef08a"/>

            <text y="3.5"
                  font-size="10"
                  font-weight="bold"
                  text-anchor="middle"
                  fill="#111827">e⁻</text>

            <animateMotion
                path="${path}"
                dur="2.5s"
                begin="${i*.35}s"
                repeatCount="indefinite"/>

            <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur="2.5s"
                begin="${i*.35}s"
                repeatCount="indefinite"/>

        </g>

    `).join("");

    const metalIons = (
        x, symbol, color
    ) => Array.from(
        {length:12},(_,i)=>`

        <g opacity="0">

            <circle r="12"
                    fill="${color}"
                    fill-opacity=".65"
                    stroke="#cbd5e1"
                    stroke-width=".7"/>

            <text y="3.5"
                  font-size="10"
                  text-anchor="middle"
                  fill="#ffffff">
                ${symbol}
            </text>

            <animateMotion
                path="M${x} ${150+i%5*18}
                      Q${x+25} ${165+i%5*18}
                      ${x+55} ${180+i%4*15}"
                dur="${3+i%3}s"
                begin="${i*.4}s"
                repeatCount="indefinite"/>

            <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur="${3+i%3}s"
                begin="${i*.4}s"
                repeatCount="indefinite"/>

        </g>

    `).join("");

    return frame(`

        <defs>

            <linearGradient id="crWater"
                x1="0" y1="0"
                x2="0" y2="1">

                <stop stop-color="#38bdf8"
                      stop-opacity=".25"/>

                <stop offset="1"
                      stop-color="#075985"
                      stop-opacity=".8"/>

            </linearGradient>

            <linearGradient id="crIron">

                <stop stop-color="#475569"/>
                <stop offset=".45"
                      stop-color="#e2e8f0"/>
                <stop offset="1"
                      stop-color="#64748b"/>

            </linearGradient>

            <linearGradient id="crCopper">

                <stop stop-color="#92400e"/>
                <stop offset=".45"
                      stop-color="#fdba74"/>
                <stop offset="1"
                      stop-color="#b45309"/>

            </linearGradient>

            <linearGradient id="crMagnesium">

                <stop stop-color="#94a3b8"/>
                <stop offset=".5"
                      stop-color="#ffffff"/>
                <stop offset="1"
                      stop-color="#cbd5e1"/>

            </linearGradient>

            <clipPath id="crLeftTank">

                <rect x="47" y="135"
                      width="306" height="130"
                      rx="5"/>

            </clipPath>

            <clipPath id="crRightTank">

                <rect x="447" y="135"
                      width="306" height="130"
                      rx="5"/>

            </clipPath>

        </defs>

        <!-- BACKGROUND -->

        <rect width="800" height="340"
              rx="14" fill="#0b1726"/>

        <!-- LEFT EXPERIMENT PANEL -->

        <rect x="10" y="5"
              width="380" height="330"
              rx="12"
              fill="#17202f"
              stroke="#ef4444"
              stroke-opacity=".65"/>

        <!-- RIGHT EXPERIMENT PANEL -->

        <rect x="410" y="5"
              width="380" height="330"
              rx="12"
              fill="#132b25"
              stroke="#4ade80"
              stroke-opacity=".65"/>

        <!-- HEADINGS -->

        ${label(200,28,
            "IRON + COPPER",
            "#fca5a5",19)}

        ${label(600,28,
            "IRON + MAGNESIUM",
            "#86efac",19)}

        <!-- LEFT CONNECTING WIRE -->

        <path d="M120 110
                 V65 H280 V110"
              fill="none"
              stroke="#94a3b8"
              stroke-width="4"
              stroke-linejoin="round"/>

        ${electrons(
            "M120 110 V65 H280 V110"
        )}

        <!-- RIGHT CONNECTING WIRE -->

        <path d="M520 110
                 V65 H680 V110"
              fill="none"
              stroke="#94a3b8"
              stroke-width="4"
              stroke-linejoin="round"/>

        ${electrons(
            "M520 110 V65 H680 V110"
        )}

        ${label(200,51,
            "Electron transfer",
            "#facc15",13)}

        ${label(600,51,
            "Electron transfer",
            "#facc15",13)}

        <!-- LEFT BEAKER -->

        <path d="M40 110 V255
                 Q40 270 55 270
                 H345 Q360 270 360 255
                 V110"
              fill="#bae6fd"
              fill-opacity=".06"
              stroke="#cbd5e1"
              stroke-width="3"/>

        <rect x="47" y="135"
              width="306" height="130"
              rx="5"
              fill="url(#crWater)"/>

        <!-- RIGHT BEAKER -->

        <path d="M440 110 V255
                 Q440 270 455 270
                 H745 Q760 270 760 255
                 V110"
              fill="#bae6fd"
              fill-opacity=".06"
              stroke="#cbd5e1"
              stroke-width="3"/>

        <rect x="447" y="135"
              width="306" height="130"
              rx="5"
              fill="url(#crWater)"/>

        <!-- WATER SURFACES -->

        <path d="M47 135
                 Q100 130 150 135
                 T250 135 T353 135"
              fill="none"
              stroke="#7dd3fc"
              stroke-width="2"/>

        <path d="M447 135
                 Q500 130 550 135
                 T650 135 T753 135"
              fill="none"
              stroke="#7dd3fc"
              stroke-width="2"/>

        <!-- LEFT IRON ELECTRODE -->

        <rect x="100" y="105"
              width="40" height="145"
              rx="4"
              fill="url(#crIron)"
              stroke="#cbd5e1"/>

        <!-- LEFT COPPER ELECTRODE -->

        <rect x="260" y="105"
              width="40" height="145"
              rx="4"
              fill="url(#crCopper)"
              stroke="#fdba74"/>

        <!-- RIGHT MAGNESIUM ELECTRODE -->

        <rect x="500" y="105"
              width="40" height="145"
              rx="4"
              fill="url(#crMagnesium)"
              stroke="#ffffff">

            <animate
                attributeName="width"
                from="40" to="18"
                dur="20s"
                fill="freeze"/>

            <animate
                attributeName="x"
                from="500" to="511"
                dur="20s"
                fill="freeze"/>

        </rect>

        <!-- PROTECTED IRON ELECTRODE -->

        <rect x="660" y="105"
              width="40" height="145"
              rx="4"
              fill="url(#crIron)"
              stroke="#86efac"
              stroke-width="2"/>

        <!-- METAL LABELS -->

        ${label(120,98,
            "Fe","#e2e8f0",17)}

        ${label(280,98,
            "Cu","#fdba74",17)}

        ${label(520,98,
            "Mg","#ffffff",17)}

        ${label(680,98,
            "Fe","#e2e8f0",17)}

        <!-- RUST FORMATION -->

        <g clip-path="url(#crLeftTank)">

            ${rust}

            ${metalIons(
                140,
                "Fe²⁺",
                "#b45309"
            )}

        </g>

        <!-- MAGNESIUM OXIDATION -->

        <g clip-path="url(#crRightTank)">

            ${metalIons(
                540,
                "Mg²⁺",
                "#64748b"
            )}

        </g>

        <!-- ELECTROLYTE LABELS -->

        ${label(200,255,
            "Salt water",
            "#bae6fd",13)}

        ${label(600,255,
            "Salt water",
            "#bae6fd",13)}

        <!-- CORROSION LABEL -->

        <rect x="150" y="150"
              width="100" height="42"
              rx="6"
              fill="#431407"
              fill-opacity=".9"/>

        ${label(200,167,
            "Iron oxidises",
            "#fca5a5",12)}

        ${label(200,183,
            "Rust forms",
            "#fdba74",12)}

        <!-- PROTECTION LABEL -->

        <rect x="550" y="150"
              width="100" height="42"
              rx="6"
              fill="#123126"
              fill-opacity=".95"/>

        ${label(600,167,
            "Mg oxidises",
            "#e2e8f0",12)}

        ${label(600,183,
            "Fe protected",
            "#86efac",12)}

        <!-- PROTECTION INDICATOR -->

        <g transform="translate(680 215)">

            <path d="M0 -17
                     L15 -11 V2
                     Q15 14 0 21
                     Q-15 14 -15 2
                     V-11Z"
                  fill="#15803d"
                  stroke="#86efac"
                  stroke-width="2"/>

            <path d="M-7 1 L-2 7 L8 -5"
                  fill="none"
                  stroke="#ffffff"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"/>

        </g>

        <!-- LEFT RESULT -->

        <rect x="25" y="280"
              width="350" height="23"
              rx="6"
              fill="#451a1a"/>

        ${label(200,297,
            "Fe → Fe²⁺ + 2e⁻",
            "#fca5a5",16)}

        ${label(200,324,
            "ACCELERATED CORROSION",
            "#f87171",16)}

        <!-- RIGHT RESULT -->

        <rect x="425" y="280"
              width="350" height="23"
              rx="6"
              fill="#14532d"/>

        ${label(600,297,
            "Mg → Mg²⁺ + 2e⁻",
            "#86efac",16)}

        ${label(600,324,
            "SACRIFICIAL PROTECTION",
            "#4ade80",16)}

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
