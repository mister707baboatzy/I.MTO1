function runCustomCode() {
  const code = document.getElementById("customCode").value;
  const consoleOutput = document.getElementById("consoleOutput");
  const uiFrame = document.getElementById("uiFrame");

  // Clear previous output
  consoleOutput.innerHTML = "";
  uiFrame.srcdoc = "";

  const lines = code.split("\n");

  lines.forEach((line, index) => {
    const originalLine = line;
    line = line.trim();

    try {
      if (line === "") return; // skip empty lines

      // Terminal.printout("Hello")
      if (/^Terminal\.printout\((.+)\)$/.test(line)) {
        const match = line.match(/^Terminal\.printout\((.+)\)$/);
        const content = safeEval(match[1]);
        addConsoleLine(content, 'lime');

      } else if (/^Terminal\.warnsys\((.+)\)$/.test(line)) {
        const match = line.match(/^Terminal\.warnsys\((.+)\)$/);
        const content = safeEval(match[1]);
        addConsoleLine(content, 'orange');

      } else if (/^Terminal\.errorin\((.+)\)$/.test(line)) {
        const match = line.match(/^Terminal\.errorin\((.+)\)$/);
        const content = safeEval(match[1]);
        addConsoleLine(content, 'red');

      } else {
        // Invalid command or bad format
        throw new Error(`Invalid or unknown command on line ${index + 1}: "${originalLine}"`);
      }

    } catch (err) {
      addConsoleLine(`Error on line ${index + 1}: ${err.message}`, 'red');
    }
  });
}

// Safely evaluate string/number
function safeEval(value) {
  try {
    // Allow only string or number values
    const evaluated = eval(value);
    if (typeof evaluated === 'string' || typeof evaluated === 'number') {
      return evaluated;
    } else {
      throw new Error("Only string or number values allowed");
    }
  } catch {
    throw new Error("Failed to parse value, check your quotes or commas");
  }
}

// Add colored console output
function addConsoleLine(text, color) {
  const consoleOutput = document.getElementById("consoleOutput");
  const line = document.createElement("div");
  line.textContent = text;
  line.style.color = color;
  consoleOutput.appendChild(line);
}
