/**
 * Initializes the DOMContentLoaded event listener to execute the code when the document is fully loaded.
 */
document.addEventListener("DOMContentLoaded", () => {
    const codeWrapper = document.getElementById("codeWrapper");
    const colors = ['#88C0D0', '#81A1C1', '#5E81AC', '#4C566A'];
    const lineHeight = 18; // Spacing for code line blocks
    const containerHeight = document.querySelector('.code-container').clientHeight;
    let currentTransform = 0;
    let indentLevel = 0;
    const keywords = ['AI', 'DATA', 'MACHINE LEARNING', 'NLP', 'OCR', 'MIR', 'PYTHON'];
  
    /**
     * Adds a new line to the code wrapper with random indentation and random words/keywords.
     */
    function addLine() {
        const lineWrapper = document.createElement('div');
        lineWrapper.className = 'code-line-wrapper';
  
        const lineNumber = document.createElement('div');
        lineNumber.className = 'line-number';
  
        const lineContainer = document.createElement('div');
        lineContainer.className = 'line-container';
  
        // Randomly adjust indentation with a maximum of 2 steps (40px)
        if (Math.random() > 0.5) {
            indentLevel += Math.random() > 0.5 ? 20 : -20;
            indentLevel = Math.max(0, Math.min(indentLevel, 40)); // Ensure indent level is between 0 and 40 pixels
        }
        lineContainer.style.marginLeft = `${30 + indentLevel}px`; // Adjust marginLeft based on indent level
  
        // Create "words" for the line
        const numberOfWords = Math.floor(Math.random() * 5) + 3;  // Random number of words
        const longerLineProbability = 0.2;                        // 20% probability for a longer line
        const isLongerLine = Math.random() < longerLineProbability;
        const keywordProbability = 0.1;                           // 10% probability to replace a block with a keyword
  
        for (let i = 0; i < numberOfWords; i++) {
            if (Math.random() < keywordProbability) {
                const keyword = document.createElement('div');
                keyword.className = 'code-line';
                keyword.textContent = keywords[Math.floor(Math.random() * keywords.length)];
                keyword.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                lineContainer.appendChild(keyword);
            } else {
                const word = document.createElement('div');
                word.className = 'code-line';
                word.style.width = isLongerLine ? `${Math.random() * 60 + 50}px` : `${Math.random() * 20 + 30}px`; // Random width for each word, longer lines more probable
                word.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                lineContainer.appendChild(word);
            }
        }
  
        lineWrapper.appendChild(lineNumber);
        lineWrapper.appendChild(lineContainer);
        codeWrapper.appendChild(lineWrapper);
  
        // Start the scroll effect when lines hit the lowest 10% of the canvas
        if (codeWrapper.clientHeight > containerHeight * 0.9) {
            currentTransform -= lineHeight;
            codeWrapper.style.transform = `translateY(${currentTransform}px)`;
        }
  
        // Remove the first line if there are too many lines (to keep the scrolling effect)
        if (codeWrapper.children.length > 50) {
            codeWrapper.removeChild(codeWrapper.firstChild);
            currentTransform += lineHeight;
        }
    }
  
    /**
     * Simulates typing code by adding lines at a specified interval.
     *
     * @param {number} lines - The number of lines to add.
     * @param {number} delay - The delay between adding each line in milliseconds.
     */
    function typeCode(lines, delay) {
        let count = 0;
        const interval = setInterval(() => {
            addLine();
            count++;
            if (count === lines) clearInterval(interval);
        }, delay);
    }
  
    typeCode(50, 200); // number of lines & delay
  });
  