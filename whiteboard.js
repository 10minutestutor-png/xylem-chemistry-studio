
/* ==========================================
   XYLEM NADAPURAM
   CHEMISTRY STUDIO V2.0
   ADVANCED WHITEBOARD ENGINE
========================================== */

window.Whiteboard = (() => {

    const canvas = document.getElementById("inkCanvas");
    const container = document.getElementById("sceneContainer");
    const ctx = canvas.getContext("2d");
    const laser = document.getElementById("laserPointer");

    const colorInput = document.getElementById("penColor");
    const widthInput = document.getElementById("penWidth");

    const storageKey = "xylem_metals_v2_ink";

    let tool = "pointer";
    let drawing = false;
    let activePointer = null;

    let currentKey = "0";
    let strokes = [];
    let redoStack = [];
    let activeStroke = null;

    let savedScenes = {};

    try {
        savedScenes = JSON.parse(
            localStorage.getItem(storageKey) || "{}"
        );
    } catch (error) {
        savedScenes = {};
    }

    function clone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    // ======================================
    // CANVAS RESIZE
    // ======================================

    function resizeCanvas() {

        const rect = container.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        canvas.width = Math.max(
            1, Math.round(rect.width * dpr)
        );

        canvas.height = Math.max(
            1, Math.round(rect.height * dpr)
        );

        redraw();
    }

    const resizeObserver = new ResizeObserver(
        resizeCanvas
    );

    resizeObserver.observe(container);

    // ======================================
    // DRAW INDIVIDUAL STROKES
    // ======================================

    function drawStroke(stroke) {

        if (!stroke.points.length) return;

        ctx.save();

        const scale = canvas.width /
            Math.max(1, canvas.clientWidth);

        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.lineWidth = stroke.width * scale;
        ctx.strokeStyle = stroke.color;
        ctx.fillStyle = stroke.color;

        ctx.globalAlpha = 1;

        ctx.globalCompositeOperation =
            "source-over";

        if (stroke.tool === "eraser") {

            ctx.globalCompositeOperation =
                "destination-out";

            ctx.lineWidth =
                Math.max(18, stroke.width * 4) * scale;

        }

        if (stroke.tool === "highlight") {

            ctx.globalAlpha = 0.28;

            ctx.lineWidth =
                Math.max(14, stroke.width * 4) * scale;

        }

        const first = stroke.points[0];

        ctx.beginPath();

        ctx.moveTo(
            first.x * canvas.width,
            first.y * canvas.height
        );

        if (stroke.points.length === 1) {

            ctx.lineTo(
                first.x * canvas.width + 0.1,
                first.y * canvas.height + 0.1
            );

        } else {

            stroke.points.slice(1).forEach(point => {

                ctx.lineTo(
                    point.x * canvas.width,
                    point.y * canvas.height
                );

            });

        }

        ctx.stroke();

        ctx.restore();
    }

    function redraw() {

        ctx.clearRect(
            0, 0, canvas.width, canvas.height
        );

        strokes.forEach(drawStroke);

        if (activeStroke) {
            drawStroke(activeStroke);
        }

    }

    // ======================================
    // TOOL SELECTION
    // ======================================

    function setTool(nextTool) {

        if (![
            "pointer",
            "pen",
            "highlight",
            "eraser",
            "laser"
        ].includes(nextTool)) return;

        if (drawing) {
            finishStroke();
        }

        tool = nextTool;

        document.querySelectorAll(".tool-btn")
            .forEach(button => {

                button.classList.toggle(
                    "active",
                    button.dataset.tool === tool
                );

            });

        canvas.classList.toggle(
            "drawing",
            tool !== "pointer"
        );

        canvas.style.cursor =
            tool === "eraser" ? "cell" :
            tool === "laser" ? "none" :
            tool === "pointer" ? "default" :
            "crosshair";

        laser.style.display = "none";
    }

    document.querySelectorAll(".tool-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                setTool(button.dataset.tool);

            });

        });

    // ======================================
    // COLOUR PALETTE
    // ======================================

    document.querySelectorAll(".colour-dot")
        .forEach(button => {

            button.addEventListener("click", () => {

                colorInput.value = button.dataset.color;

                if (tool !== "highlight") {
                    setTool("pen");
                }

            });

        });

    // ======================================
    // POINTER POSITION
    // ======================================

    function getPosition(event) {

        const rect = canvas.getBoundingClientRect();

        return {

            x: Math.max(0, Math.min(
                1,
                (event.clientX - rect.left) /
                Math.max(1, rect.width)
            )),

            y: Math.max(0, Math.min(
                1,
                (event.clientY - rect.top) /
                Math.max(1, rect.height)
            ))

        };
    }

    // ======================================
    // LASER POINTER
    // ======================================

    function moveLaser(event) {

        const rect = container.getBoundingClientRect();

        laser.style.display = "block";

        laser.style.left =
            (event.clientX - rect.left) + "px";

        laser.style.top =
            (event.clientY - rect.top) + "px";
    }

    // ======================================
    // START DRAWING
    // ======================================

    canvas.addEventListener("pointerdown", event => {

        if (tool === "pointer") return;

        if (event.button !== 0 &&
            event.pointerType === "mouse") return;

        event.preventDefault();

        if (tool === "laser") {

            moveLaser(event);

            return;
        }

        if (drawing) return;

        drawing = true;

        activePointer = event.pointerId;

        canvas.setPointerCapture(event.pointerId);

        activeStroke = {

            tool: tool,

            color: colorInput.value,

            width: Number(widthInput.value),

            points: [getPosition(event)]

        };

        redraw();

    });

    // ======================================
    // CONTINUE DRAWING
    // ======================================

    canvas.addEventListener("pointermove", event => {

        if (tool === "laser") {
            moveLaser(event);

            return;
        }

        if (!drawing || !activeStroke ||
            event.pointerId !== activePointer) return;

        event.preventDefault();

        const events = event.getCoalescedEvents?.();

        const samples = events?.length
            ? events
            : [event];

        samples.forEach(sample => {

            activeStroke.points.push(
                getPosition(sample)
            );

        });

        redraw();

    });

    // ======================================
    // FINISH DRAWING
    // ======================================

    function finishStroke() {

        if (!drawing) return;

        drawing = false;

        if (activeStroke) {

            strokes.push(activeStroke);

            activeStroke = null;

            redoStack = [];

        }

        if (activePointer !== null &&
            canvas.hasPointerCapture(activePointer)) {

            canvas.releasePointerCapture(
                activePointer
            );

        }

        activePointer = null;

        redraw();

        saveScene(currentKey);
    }

    canvas.addEventListener("pointerup", event => {

        if (event.pointerId === activePointer) {
            finishStroke();
        }

    });

    canvas.addEventListener("pointercancel", event => {

        if (event.pointerId === activePointer) {
            finishStroke();
        }

    });

    canvas.addEventListener(
        "lostpointercapture",
        finishStroke
    );

    canvas.addEventListener("pointerleave", () => {

        laser.style.display = "none";

    });

    // ======================================
    // UNDO
    // ======================================

    function undo() {

        if (drawing) finishStroke();

        if (!strokes.length) return;

        redoStack.push(strokes.pop());

        redraw();

        saveScene(currentKey);
    }

    // ======================================
    // REDO
    // ======================================

    function redo() {

        if (drawing) finishStroke();

        if (!redoStack.length) return;

        strokes.push(redoStack.pop());

        redraw();

        saveScene(currentKey);
    }

    // ======================================
    // CLEAR HANDWRITING
    // ======================================

    function clear() {

        if (drawing) finishStroke();

        strokes = [];

        redoStack = [];

        activeStroke = null;

        redraw();

        saveScene(currentKey);
    }

    document.getElementById("clearBtn")
        .addEventListener("click", () => {

            if (!strokes.length) return;

            if (confirm(
                "Clear handwriting on this board?"
            )) {

                clear();

            }

        });

    document.getElementById("undoBtn")
        .addEventListener("click", undo);

    document.getElementById("redoBtn")
        .addEventListener("click", redo);

    // ======================================
    // SAVE HANDWRITING BY SCENE
    // ======================================

    function saveScene(key = currentKey) {

        savedScenes[String(key)] = clone(strokes);

        try {

            localStorage.setItem(
                storageKey,
                JSON.stringify(savedScenes)
            );

        } catch (error) {

            console.warn(
                "Unable to save handwriting locally.",
                error
            );

        }
    }

    // ======================================
    // RESTORE HANDWRITING
    // ======================================

    function loadScene(key) {

        if (drawing) finishStroke();

        currentKey = String(key);

        strokes = clone(
            savedScenes[currentKey] || []
        );

        redoStack = [];

        activeStroke = null;

        redraw();
    }

    // ======================================
    // EXPORT HANDWRITTEN NOTES
    // ======================================

    function exportInk() {

        const output = document.createElement("canvas");

        output.width = canvas.width;

        output.height = canvas.height;

        const outputContext = output.getContext("2d");

        outputContext.fillStyle = "#101820";

        outputContext.fillRect(
            0, 0, output.width, output.height
        );

        outputContext.drawImage(canvas, 0, 0);

        output.toBlob(blob => {

            if (!blob) return;

            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;

            link.download =
                "Xylem-Metals-Notes-"
                + currentKey + "-"
                + Date.now() + ".png";

            link.click();

            setTimeout(() => {

                URL.revokeObjectURL(url);

            }, 1000);

        }, "image/png");

    }

    document.getElementById("saveBtn")
        .addEventListener("click", exportInk);

    // ======================================
    // KEYBOARD SHORTCUTS
    // ======================================

    document.addEventListener("keydown", event => {

        if (["INPUT", "TEXTAREA", "SELECT"]
            .includes(event.target.tagName)) return;

        if (event.target.isContentEditable) return;

        const key = event.key.toLowerCase();

        if (event.ctrlKey || event.metaKey) {

            if (key === "z") {

                event.preventDefault();

                if (event.shiftKey) {
                    redo();
                } else {
                    undo();
                }

            }

            if (key === "y") {

                event.preventDefault();

                redo();

            }

            return;
        }

        if (event.altKey) return;

        switch (key) {

            case "p":
                setTool("pen");
                break;

            case "h":
                setTool("highlight");
                break;

            case "r":
                setTool("eraser");
                break;

            case "l":
                setTool("laser");
                break;

            case "v":
            case "escape":
                setTool("pointer");
                break;

        }

    });

    window.addEventListener("beforeunload", () => {

        saveScene(currentKey);

    });

    // ======================================
    // INITIALISATION
    // ======================================

    resizeCanvas();

    setTool("pointer");

    loadScene("0");

    console.log("Xylem Whiteboard V2.0 Ready");

    return {

        setTool,
        saveScene,
        loadScene,
        clear,
        undo,
        redo,
        exportInk

    };

})();

// Compatibility with main application

window.setTool = function(tool) {

    window.Whiteboard.setTool(tool);

};

window.clearInk = function() {

    window.Whiteboard.clear();

};
