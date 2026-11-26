
/* XYLEM NADAPURAM
   CHEMISTRY STUDIO V2.0
   STANDARD X - UNIT 6: METALS
*/

const METALS_CHAPTER = {

    title: "METALS",
    chapter: 6,
    standard: 10,

    topics: [

        {
            title: "METALS",
            type: "intro",
            page: 121,
            subtitle: "Exploring the world of metals"
        },

        {
            title: "Uses of Metals",
            type: "uses",
            page: 122,
            points: [
                "Transport sector",
                "Agricultural sector",
                "Construction sector",
                "Technology sector",
                "Consumer goods"
            ]
        },

        {
            title: "Occurrence of Metals",
            type: "earth",
            page: 122,
            points: [
                "Earth's crust is the major source of metals.",
                "Most metals occur in combined states.",
                "A few metals occur in free states.",
                "Metal compounds are also found in seawater."
            ]
        },

        {
            title: "Minerals",
            type: "minerals",
            page: 123,
            definition:
                "Naturally occurring metals or compounds are generally called minerals.",
            examples: [
                ["Clay", "Al₂O₃·2SiO₂·2H₂O"],
                ["Bauxite", "Al₂O₃·2H₂O"],
                ["Cryolite", "Na₃AlF₆"]
            ]
        },

        {
            title: "Ores",
            type: "oreSelection",
            page: 123,
            definition:
                "Any mineral from which a metal can be extracted easily and economically is called an ore of that metal.",
            answer: "Bauxite"
        },

        {
            title: "Characteristics of Ores",
            type: "reveal",
            page: 123,
            points: [
                "Abundance",
                "Ease of extraction",
                "High metal content",
                "Low production cost"
            ]
        },

        {
            title: "Metals and Their Ores",
            type: "table",
            page: 123,
            headers: ["Metal", "Ore", "Formula"],
            rows: [
                ["Aluminium", "Bauxite", "Al₂O₃·2H₂O"],
                ["Iron", "Haematite", "Fe₂O₃"],
                ["Iron", "Magnetite", "Fe₃O₄"],
                ["Copper", "Copper pyrites", "CuFeS₂"],
                ["Copper", "Copper glance", "Cu₂S"],
                ["Copper", "Cuprite", "Cu₂O"],
                ["Zinc", "Zinc blende", "ZnS"],
                ["Zinc", "Calamine", "ZnCO₃"],
                ["Tin", "Cassiterite / Tinstone", "SnO₂"]
            ]
        },

        {
            title: "Metallurgy",
            type: "flowchart",
            page: 124,
            points: [
                "Concentration of ores",
                "Extraction of metal from concentrated ore",
                "Refining of metal"
            ]
        },

        {
            title: "Hydraulic Washing",
            type: "hydraulic",
            page: 124,
            points: [
                "Ore is denser than gangue.",
                "Powdered ore is washed in flowing water.",
                "Lighter impurities are removed.",
                "Denser ore remains at the bottom.",
                "Generally suitable for oxide ores."
            ]
        },

        {
            title: "Froth Floatation",
            type: "froth",
            page: 124,
            points: [
                "Powdered ore is mixed with water and pine oil.",
                "Air is introduced while stirring.",
                "Ore particles attach to the froth.",
                "Froth is collected and the ore is dried.",
                "Generally suitable for sulphide ores."
            ]
        },

        {
            title: "Magnetic Separation",
            type: "magnetic",
            page: 125,
            points: [
                "Powdered ore passes over a magnetic roller.",
                "Magnetic and non-magnetic materials separate.",
                "Magnetite is magnetic.",
                "Tinstone is non-magnetic.",
                "Iron tungstate impurity is magnetic."
            ]
        },

        {
            title: "Leaching",
            type: "leaching",
            page: 125,
            points: [
                "Powdered ore is treated with a suitable solvent.",
                "Ore dissolves or forms a solution.",
                "Insoluble gangue is filtered out.",
                "Bauxite is concentrated by leaching."
            ]
        },

        {
            title: "Reactivity Series",
            type: "reactivity",
            page: 126,
            groups: [
                {
                    name: "Highly Reactive",
                    metals: ["K", "Na", "Ca", "Mg", "Al"],
                    method: "Electrolysis"
                },
                {
                    name: "Moderately Reactive",
                    metals: ["Zn", "Fe", "Sn", "Pb"],
                    method: "Reduction using coke or carbon monoxide"
                },
                {
                    name: "Less Reactive",
                    metals: ["Cu", "Hg", "Ag", "Au"],
                    method: "Methods depend on the metal and its ore"
                }
            ]
        },

        {
            title: "Calcination",
            type: "heating",
            page: 127,
            definition:
                "Heating concentrated ore below its melting point in limited quantities or absence of air.",
            equations: [
                "CaCO₃ → CaO + CO₂",
                "ZnCO₃ → ZnO + CO₂"
            ]
        },

        {
            title: "Roasting",
            type: "heating",
            page: 127,
            definition:
                "Heating concentrated ore below its melting point in the presence of air.",
            equations: [
                "2ZnS + 3O₂ → 2ZnO + 2SO₂",
                "2PbS + 3O₂ → 2PbO + 2SO₂"
            ]
        },

        {
            title: "Reduction of Oxide Ore",
            type: "reduction",
            page: 127,
            equations: [
                "ZnO + C → Zn + CO",
                "Fe₂O₃ + 3CO → 2Fe + 3CO₂"
            ],
            points: [
                "Coke and carbon monoxide are reducing agents.",
                "Moderately reactive metals can be extracted by chemical reduction.",
                "Highly reactive metals are extracted by electrolysis."
            ]
        },

        {
            title: "Liquation",
            type: "liquation",
            page: 128,
            points: [
                "Suitable for metals with low melting points.",
                "Impure metal is heated on an inclined surface.",
                "Molten metal flows down.",
                "Higher melting impurities remain behind.",
                "Examples: Tin and lead."
            ]
        },

        {
            title: "Distillation",
            type: "distillation",
            page: 128,
            points: [
                "Suitable for metals with relatively low boiling points.",
                "Metal is converted into vapour.",
                "Vapour is cooled and condensed.",
                "Examples: Zinc, cadmium and mercury."
            ]
        },

        {
            title: "Electrolytic Refining",
            type: "electrolysis",
            page: 129,
            points: [
                "Anode: Impure metal",
                "Cathode: Pure metal",
                "Electrolyte: Suitable salt solution of the metal"
            ],
            equations: [
                "Anode: M → Mⁿ⁺ + ne⁻",
                "Cathode: Mⁿ⁺ + ne⁻ → M"
            ]
        },

        {
            title: "Extraction of Iron",
            type: "blastFurnace",
            page: 129,
            points: [
                "Ore: Haematite or magnetite",
                "Charge: Concentrated ore, coke and limestone",
                "Hot air is introduced from the bottom.",
                "Carbon monoxide reduces iron oxide.",
                "Molten iron collects at the bottom."
            ],
            equations: [
                "C + O₂ → CO₂ + Heat",
                "CO₂ + C + Heat → 2CO",
                "Fe₂O₃ + 3CO → 2Fe + 3CO₂"
            ]
        },

        {
            title: "Flux and Slag",
            type: "slag",
            page: 130,
            equations: [
                "Gangue + Flux → Slag",
                "CaCO₃ → CaO + CO₂",
                "CaO + SiO₂ → CaSiO₃"
            ],
            points: [
                "Calcium oxide acts as a basic flux.",
                "Silica is an acidic impurity.",
                "Calcium silicate forms molten slag.",
                "Slag floats above molten iron."
            ]
        },

        {
            title: "Types of Iron and Steel",
            type: "table",
            page: 131,
            headers: ["Type", "Carbon content"],
            rows: [
                ["Pig iron", "About 4%"],
                ["Cast iron", "More than 2%"],
                ["Wrought iron", "0.02–0.05%"],
                ["Mild steel", "0.05–0.2%"],
                ["Medium steel", "0.2–0.6%"],
                ["High carbon steel", "0.6–1.5%"]
            ]
        },

        {
            title: "Extraction of Zinc",
            type: "zinc",
            page: 132,
            points: [
                "Zinc blende is converted into zinc oxide by roasting.",
                "Calamine is converted into zinc oxide by calcination.",
                "Zinc oxide is reduced using coke.",
                "Zinc vapour is cooled and condensed.",
                "Zinc can be purified by distillation."
            ],
            equations: [
                "2ZnS + 3O₂ → 2ZnO + 2SO₂",
                "ZnCO₃ → ZnO + CO₂",
                "ZnO + C → Zn + CO"
            ]
        },

        {
            title: "Extraction of Copper",
            type: "copper",
            page: 133,
            points: [
                "Principal ores: Copper pyrites and copper glance.",
                "Concentration by froth floatation.",
                "Silica is used as an acidic flux.",
                "Cuprous sulphide is partially oxidised.",
                "Self-reduction produces copper.",
                "The product is called blister copper."
            ],
            equations: [
                "2Cu₂O + Cu₂S → 6Cu + SO₂"
            ]
        },

        {
            title: "Purification of Copper",
            type: "copperRefining",
            page: 134,
            points: [
                "Anode: Impure copper",
                "Cathode: Pure copper",
                "Electrolyte: Copper sulphate with dilute sulphuric acid"
            ],
            equations: [
                "Anode: Cu → Cu²⁺ + 2e⁻",
                "Cathode: Cu²⁺ + 2e⁻ → Cu"
            ]
        },

        {
            title: "Concentration of Bauxite",
            type: "bauxite",
            page: 134,
            points: [
                "Bauxite is treated with hot sodium hydroxide.",
                "Sodium aluminate solution is formed.",
                "Insoluble impurities are filtered out.",
                "Aluminium hydroxide is precipitated.",
                "Heating produces pure alumina."
            ],
            equations: [
                "Al₂O₃·2H₂O + 2NaOH → 2NaAlO₂ + 3H₂O",
                "NaAlO₂ + 2H₂O → Al(OH)₃ + NaOH",
                "2Al(OH)₃ → Al₂O₃ + 3H₂O"
            ]
        },

        {
            title: "Hall–Heroult Process",
            type: "aluminium",
            page: 135,
            points: [
                "Anode: Carbon rods",
                "Cathode: Carbon lining",
                "Electrolyte: Alumina dissolved in molten cryolite",
                "Cryolite lowers the operating melting temperature.",
                "Cryolite increases electrical conductivity.",
                "Aluminium collects at the cathode.",
                "Carbon anodes are gradually consumed."
            ],
            equations: [
                "Al₂O₃ → 2Al³⁺ + 3O²⁻",
                "Al³⁺ + 3e⁻ → Al",
                "2O²⁻ → O₂ + 4e⁻"
            ]
        },

        {
            title: "Alloys",
            type: "table",
            page: 136,
            headers: ["Alloy", "Constituents", "Uses"],
            rows: [
                ["Brass", "Cu, Zn", "Articles and fittings"],
                ["Bronze", "Cu, Sn", "Statues and medals"],
                ["Stainless steel", "Fe, Cr, Ni, C", "Utensils"],
                ["Duralumin", "Al, Cu, Mg, Mn", "Aircraft"],
                ["Alnico", "Al, Ni, Co, Fe", "Permanent magnets"],
                ["Silicon steel", "Fe, Si, C", "Electrical applications"]
            ]
        },

        {
            title: "Corrosion of Metals",
            type: "corrosion",
            page: 137,
            points: [
                "Metals react with their surrounding medium.",
                "Moisture and dissolved salts influence corrosion.",
                "Contact with other metals affects corrosion.",
                "Aluminium forms a protective oxide coating.",
                "Iron forms porous and powdery rust."
            ]
        },

        {
            title: "Cathodic Protection",
            type: "protection",
            page: 138,
            points: [
                "Iron in contact with copper corrodes faster.",
                "Iron in contact with magnesium is protected.",
                "The more reactive metal acts as anode.",
                "The cathode is protected from corrosion.",
                "Used to protect ships and sea bridges."
            ]
        },

        {
            title: "Thermite Process",
            type: "thermite",
            page: 140,
            points: [
                "Aluminium acts as the reducing agent.",
                "Iron oxide is reduced to iron.",
                "The reaction releases a large amount of heat."
            ],
            equations: [
                "Fe₂O₃ + 2Al → Al₂O₃ + 2Fe"
            ]
        },

        {
            title: "Chapter Assessment",
            type: "quiz",
            page: 139
        }

    ]
};
