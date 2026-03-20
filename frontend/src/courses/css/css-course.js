/* ====================================
   Techknowldge CSS Course - JavaScript
   Interactive Learning Features & CSS Compiler
   ==================================== */

// ====================================
// Global State Management
// ====================================
let currentLesson = "intro";
let completedLessons = new Set();
let totalLessons = 22;

let quizScores = {};

// Load saved progress from localStorage
function loadProgress() {
  const saved = localStorage.getItem("css_course_progress");

  if (saved) {
    const data = JSON.parse(saved);
    completedLessons = new Set(data.completed || []);

    quizScores = data.scores || {};
    updateProgress();
  }
}

// Save progress to localStorage
function saveProgress() {
  localStorage.setItem(
    "css_course_progress",
    JSON.stringify({
      completed: Array.from(completedLessons),
      scores: quizScores,
    }),
  );
}

// ====================================
// Initialization
// ====================================
document.addEventListener("DOMContentLoaded", function () {
  console.log("========================================");
  console.log("CSS COURSE - DOM LOADED");
  console.log("========================================");

  loadProgress();
  console.log("✓ Progress loaded");

  initializeTabs();
  console.log("✓ Tabs initialized");

  initializeLessonNavigation();
  console.log("✓ Lesson navigation initialized");

  initializeSidebar();
  console.log("✓ Sidebar initialized");

  initializeDarkMode();
  console.log("✓ Dark mode initialized");

  initializeCSSPlayground();
  console.log("✓ CSS Playground initialized");

  initializeSearch();
  console.log("✓ Search initialized");

  initializeCertificate();
  console.log("✓ Certificate initialized");

  updateProgress();
  console.log("✓ Progress updated");

  // Make functions globally accessible for onclick handlers
  window.showLesson = showLesson;
  window.markLessonComplete = markLessonComplete;
  window.nextLesson = nextLesson;
  window.prevLesson = prevLesson;
  window.switchToPlayground = switchToPlayground;
  window.runCSSCode = runCSSCode;
  window.clearCSSCode = clearCSSCode;
  window.loadExample = loadExample;
  window.downloadCertificate = downloadCertificate;
  console.log("✓ Global functions registered");

  // Show first lesson after a brief delay
  setTimeout(() => {
    console.log("Showing initial lesson...");
    showLesson("intro");
  }, 100);

  console.log("========================================");
  console.log("INITIALIZATION COMPLETE!");
  console.log("========================================");
});

// ====================================
// Tab Navigation
// ====================================
function initializeTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabName = button.dataset.tab;

      // Remove active class from all tabs
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked tab
      button.classList.add("active");
      document.getElementById(tabName).classList.add("active");

      // Re-run CSS code when playground tab is clicked
      if (tabName === "playground") {
        setTimeout(() => runCSSCode(), 100);
      }
    });
  });
}

// ====================================
// Lesson Navigation
// ====================================
function initializeLessonNavigation() {
  const lessonItems = document.querySelectorAll(".lesson-item");

  console.log("=== INITIALIZING LESSON NAVIGATION ===");
  console.log("Found lesson items:", lessonItems.length);

  lessonItems.forEach((item, index) => {
    console.log(`Attaching listener to item ${index}:`, item.dataset.lesson);

    item.addEventListener("click", function (e) {
      console.log("=== LESSON CLICKED ===");
      const lessonId = this.dataset.lesson;
      console.log("Lesson ID:", lessonId);

      if (lessonId) {
        showLesson(lessonId);
      } else {
        console.error("No lesson ID found!");
      }
    });

    // Make sure it has cursor pointer
    item.style.cursor = "pointer";
  });

  console.log("Lesson navigation initialized successfully");
}

function showLesson(lessonId) {
  console.log("=== SHOW LESSON CALLED ===");
  console.log("Lesson ID:", lessonId);

  // Update current lesson
  currentLesson = lessonId;

  // First, switch to tutorial tab if not already active
  const tutorialTab = document.querySelector('[data-tab="tutorial"]');
  const tutorialContent = document.getElementById("tutorial");

  console.log("Tutorial tab found:", !!tutorialTab);
  console.log("Tutorial content found:", !!tutorialContent);

  if (
    tutorialTab &&
    tutorialContent &&
    !tutorialTab.classList.contains("active")
  ) {
    console.log("Switching to tutorial tab...");
    // Remove active from all tabs
    document
      .querySelectorAll(".tab-btn")
      .forEach((btn) => btn.classList.remove("active"));
    document
      .querySelectorAll(".tab-content")
      .forEach((content) => content.classList.remove("active"));

    // Activate tutorial tab
    tutorialTab.classList.add("active");
    tutorialContent.classList.add("active");
  }

  // Small delay to ensure tab switch is complete
  setTimeout(() => {
    console.log("Processing lesson display...");

    // Hide all lessons
    const allLessons = document.querySelectorAll(".lesson-section");
    console.log("Total lesson sections found:", allLessons.length);

    allLessons.forEach((lesson) => {
      lesson.style.display = "none";
      lesson.classList.remove("active");
    });

    // Show selected lesson
    const selectedLesson = document.getElementById(lessonId + "-content");
    console.log(
      "Selected lesson element:",
      selectedLesson ? "FOUND" : "NOT FOUND",
    );
    console.log("Looking for ID:", lessonId + "-content");

    if (selectedLesson) {
      selectedLesson.style.display = "block";
      selectedLesson.classList.add("active");
      console.log("✅ Lesson displayed successfully");
    } else {
      console.error("❌ Lesson element not found:", lessonId + "-content");
    }

    // Update sidebar active state
    document.querySelectorAll(".lesson-item").forEach((item) => {
      item.classList.remove("active");

      if (item.dataset.lesson === lessonId) {
        item.classList.add("active");
      }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 50);
}

function navigateLesson(lessonId) {
  // Switch to tutorial tab
  const tutorialTab = document.querySelector('[data-tab="tutorial"]');
  if (tutorialTab) {
    tutorialTab.click();
  }
  // Show the lesson
  showLesson(lessonId);
}

// ====================================
// Progress Tracking
// ====================================
function updateProgress() {
  const completed = completedLessons.size;
  const percentage = Math.round((completed / totalLessons) * 100);

  // Update progress bar safely
  const progressBar = document.getElementById("progressBar");
  const miniProgressBar = document.getElementById("miniProgressBar");
  const progressText = document.getElementById("progressText");
  const completedText = document.getElementById("completedLessons");

  if (progressBar) progressBar.style.width = percentage + "%";
  if (miniProgressBar) miniProgressBar.style.width = percentage + "%";
  if (progressText) progressText.textContent = percentage + "%";
  if (completedText) completedText.textContent = completed;

  // Update lesson items with completion status
  document.querySelectorAll(".lesson-item").forEach((item) => {
    const lessonId = item.dataset.lesson;
    const statusIcon = item.querySelector(".lesson-status i");

    if (completedLessons.has(lessonId)) {
      item.classList.add("completed");
      if (statusIcon) {
        statusIcon.className = "fas fa-check-circle";
      }
    } else {
      item.classList.remove("completed");
      if (statusIcon) {
        statusIcon.className = "far fa-circle";
      }
    }
  });

  // Show certificate button if all lessons completed
  if (completed === totalLessons) {
    const certBtn = document.getElementById("generateCertificate");

    if (certBtn) {
      certBtn.style.display = "block";
    }
  }
}

function markComplete(lessonId) {
  completedLessons.add(lessonId);
  saveProgress();
  updateProgress();

  // Show success notification
  showNotification("✓ Lesson marked as complete!", "success");
}

// ====================================
// Quiz System
// ====================================
function submitQuiz(quizId, correctAnswers) {
  const questions =
    document.querySelectorAll(`#result-${quizId}`).length > 0
      ? document.querySelectorAll(`input[name^="q"][name*="${quizId}"]`)
      : document.querySelectorAll(`input[name^="q"]`);

  // Get all question groups
  const questionGroups = {};

  questions.forEach((input) => {
    const name = input.name;

    if (!questionGroups[name]) {
      questionGroups[name] = [];
    }

    questionGroups[name].push(input);
  });

  let score = 0;
  const questionNames = Object.keys(questionGroups);

  // Check answers
  questionNames.forEach((name, index) => {
    const selected = document.querySelector(`input[name="${name}"]:checked`);

    if (selected && selected.value === correctAnswers[index]) {
      score++;

      // Mark as correct
      selected.closest(".quiz-option").classList.add("correct");
    } else if (selected) {
      // Mark as wrong
      selected.closest(".quiz-option").classList.add("wrong");

      // Show correct answer
      const correctOption = document.querySelector(
        `input[name="${name}"][value="${correctAnswers[index]}"]`,
      );

      if (correctOption) {
        correctOption.closest(".quiz-option").classList.add("correct");
      }
    }
  });

  // Calculate percentage
  const percentage = Math.round((score / correctAnswers.length) * 100);

  // Save score
  quizScores[quizId] = percentage;
  saveProgress();

  // Show result
  const resultDiv = document.getElementById(`result-${quizId}`);

  if (resultDiv) {
    resultDiv.classList.add("show");

    if (percentage === 100) {
      resultDiv.className = "quiz-result show success";

      resultDiv.innerHTML = `<i class="fas fa-check-circle"></i>Perfect! You got ${score}/${correctAnswers.length} correct (${percentage}%)`;
    } else if (percentage >= 60) {
      resultDiv.className = "quiz-result show partial";

      resultDiv.innerHTML = `<i class="fas fa-star"></i>Good job! You got ${score}/${correctAnswers.length} correct (${percentage}%)`;
    } else {
      resultDiv.className = "quiz-result show fail";

      resultDiv.innerHTML = `<i class="fas fa-times-circle"></i>You got ${score}/${correctAnswers.length} correct (${percentage}%). Try again!`;
    }
  }
}

// ====================================
// Code Copy Functionality
// ====================================
function copyCode(button) {
  const codeBlock = button.closest(".code-example").querySelector("code");
  const text = codeBlock.textContent;

  navigator.clipboard.writeText(text).then(() => {
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
    button.style.background = "#28a745";

    setTimeout(
      () => {
        button.innerHTML = originalHTML;
        button.style.background = "";
      },

      2000,
    );
  });
}

// ====================================
// Dark Mode
// ====================================
function initializeDarkMode() {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const isDark = localStorage.getItem("darkMode") === "true";

  if (isDark) {
    document.body.classList.add("dark-mode");
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);

    darkModeToggle.innerHTML = isDarkMode
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  });
}

// ====================================
// Sidebar Toggle (Mobile)
// ====================================
function initializeSidebar() {
  const toggle = document.getElementById("sidebarToggle");
  const sidebar = document.getElementById("sidebar");

  if (toggle && sidebar) {
    // Toggle sidebar on button click
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      sidebar.classList.toggle("show");

      // Prevent body scroll when sidebar is open on mobile
      if (window.innerWidth <= 768) {
        if (sidebar.classList.contains("show")) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }
      }
    });

    // Close sidebar when clicking on a lesson (mobile only)
    const lessonItems = document.querySelectorAll(".lesson-item");

    lessonItems.forEach((item) => {
      item.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          sidebar.classList.remove("show");
          document.body.style.overflow = "";
        }
      });
    });

    // Close sidebar when clicking outside (mobile only)
    document.addEventListener("click", (e) => {
      if (
        window.innerWidth <= 768 &&
        !sidebar.contains(e.target) &&
        !toggle.contains(e.target) &&
        sidebar.classList.contains("show")
      ) {
        sidebar.classList.remove("show");
        document.body.style.overflow = "";
      }
    });

    // Reset body scroll on resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        document.body.style.overflow = "";
        sidebar.classList.remove("show");
      }
    });
  }
}

// ====================================
// CSS Live Playground
// ====================================
function initializeCSSPlayground() {
  const htmlEditor = document.getElementById("htmlEditor");
  const cssEditor = document.getElementById("cssEditor");

  if (htmlEditor && cssEditor) {
    // Auto-run on first load
    setTimeout(() => runCSSCode(), 500);

    // Auto-run on editor changes (with debounce)
    let timeout;
    const autoRun = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => runCSSCode(), 1000);
    };

    htmlEditor.addEventListener("input", autoRun);
    cssEditor.addEventListener("input", autoRun);
  }
}

// Run CSS code in preview iframe
function runCSSCode() {
  const htmlCode = document.getElementById("htmlEditor")?.value || "";
  const cssCode = document.getElementById("cssEditor")?.value || "";
  const iframe = document.getElementById("preview");

  if (!iframe) return;

  // Combine HTML and CSS
  const fullHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { box-sizing: border-box; }
    ${cssCode}
  </style>
</head>
<body>
  ${htmlCode}
</body>
</html>`;

  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  iframeDoc.open();
  iframeDoc.write(fullHTML);
  iframeDoc.close();
}

// Clear CSS code editors
function clearCSSCode() {
  document.getElementById("htmlEditor").value = `<!DOCTYPE html>
<html>
<body>
    <h1>Hello CSS!</h1>
    <p class="intro">Start styling here!</p>
    <div class="box">Box Element</div>
</body>
</html>`;

  document.getElementById("cssEditor").value = `/* Write your CSS here */
body {
    font-family: Arial, sans-serif;
    padding: 20px;
    background: #f0f0f0;
}

h1 {
    color: #333;
}

.intro {
    font-size: 1.2em;
    color: #666;
}

.box {
    width: 200px;
    height: 200px;
    background: #04AA6D;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
}`;

  runCSSCode();
  showNotification("Code cleared and reset!", "success");
}

// Load CSS examples
function loadExample(exampleType) {
  const examples = {
    gradient: {
      html: `<!DOCTYPE html>
<html>
<body>
    <div class="gradient-box">
        <h2>Beautiful Gradient</h2>
        <p>CSS gradients are amazing!</p>
    </div>
</body>
</html>`,
      css: `body {
    padding: 20px;
    background: #f0f0f0;
}

.gradient-box {
    width: 400px;
    height: 300px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.gradient-box h2 {
    font-size: 2.5em;
    margin: 0;
}

.gradient-box p {
    font-size: 1.2em;
    margin-top: 10px;
}`,
    },
    animation: {
      html: `<!DOCTYPE html>
<html>
<body>
    <div class="animated-box">
        Hover Me!
    </div>
</body>
</html>`,
      css: `body {
    padding: 50px;
    background: #2c3e50;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.animated-box {
    width: 200px;
    height: 200px;
    background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
    font-weight: bold;
    border-radius: 20px;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
    animation: float 3s ease-in-out infinite;
}

.animated-box:hover {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 25px 50px rgba(245, 87, 108, 0.4);
}

@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}`,
    },
    flexbox: {
      html: `<!DOCTYPE html>
<html>
<body>
    <div class="flex-container">
        <div class="flex-item">Item 1</div>
        <div class="flex-item">Item 2</div>
        <div class="flex-item">Item 3</div>
    </div>
</body>
</html>`,
      css: `body {
    padding: 20px;
    background: #ecf0f1;
}

.flex-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 20px;
    padding: 40px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.flex-item {
    flex: 1;
    padding: 40px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    text-align: center;
    border-radius: 10px;
    font-size: 1.2em;
    transition: transform 0.3s;
}

.flex-item:hover {
    transform: translateY(-10px);
}`,
    },
    grid: {
      html: `<!DOCTYPE html>
<html>
<body>
    <div class="grid-container">
        <div class="grid-item">1</div>
        <div class="grid-item">2</div>
        <div class="grid-item">3</div>
        <div class="grid-item">4</div>
        <div class="grid-item">5</div>
        <div class="grid-item">6</div>
    </div>
</body>
</html>`,
      css: `body {
    padding: 20px;
    background: #2c3e50;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 20px;
}

.grid-item {
    background: linear-gradient(135deg, #f093fb, #f5576c);
    color: white;
    padding: 60px;
    text-align: center;
    font-size: 2em;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    transition: transform 0.3s;
}

.grid-item:hover {
    transform: scale(1.05);
}`,
    },
    card: {
      html: `<!DOCTYPE html>
<html>
<body>
    <div class="card">
        <div class="card-header">
            <h2>Profile Card</h2>
        </div>
        <div class="card-body">
            <img src="https://via.placeholder.com/150" alt="Avatar">
            <h3>John Doe</h3>
            <p>Web Developer</p>
            <button class="card-btn">Connect</button>
        </div>
    </div>
</body>
</html>`,
      css: `body {
    padding: 50px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.card {
    width: 350px;
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.card-header {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 30px;
    text-align: center;
}

.card-body {
    padding: 30px;
    text-align: center;
}

.card-body img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 5px solid #667eea;
    margin-bottom: 20px;
}

.card-body h3 {
    margin: 10px 0;
    color: #333;
}

.card-body p {
    color: #666;
    margin-bottom: 20px;
}

.card-btn {
    padding: 12px 40px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 25px;
    font-size: 1em;
    cursor: pointer;
    transition: all 0.3s;
}

.card-btn:hover {
    background: #764ba2;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}`,
    },
  };

  if (examples[exampleType]) {
    document.getElementById("htmlEditor").value = examples[exampleType].html;
    document.getElementById("cssEditor").value = examples[exampleType].css;
    runCSSCode();
    showNotification(`Loaded ${exampleType} example!`, "success");
  }
}

// Switch to playground tab
function switchToPlayground() {
  const playgroundTab = document.querySelector('[data-tab="playground"]');
  if (playgroundTab) {
    playgroundTab.click();
  }
}

// ====================================
// Lesson Navigation Helper Functions
// ====================================
function markLessonComplete(lessonId) {
  completedLessons.add(lessonId);
  saveProgress();
  updateProgress();
  showNotification("✓ Lesson marked as complete!", "success");
}

function nextLesson(currentId) {
  const lessons = [
    "intro",
    "syntax",
    "selectors",
    "colors",
    "backgrounds",
    "borders",
    "margins",
    "boxmodel",
    "text",
    "fonts",
    "links",
    "lists",
    "display",
    "position",
    "flexbox",
    "grid",
    "transitions",
    "animations",
    "transform",
    "responsive",
    "variables",
    "advanced",
  ];

  const currentIndex = lessons.indexOf(currentId);
  if (currentIndex < lessons.length - 1) {
    showLesson(lessons[currentIndex + 1]);
  }
}

function prevLesson(currentId) {
  const lessons = [
    "intro",
    "syntax",
    "selectors",
    "colors",
    "backgrounds",
    "borders",
    "margins",
    "boxmodel",
    "text",
    "fonts",
    "links",
    "lists",
    "display",
    "position",
    "flexbox",
    "grid",
    "transitions",
    "animations",
    "transform",
    "responsive",
    "variables",
    "advanced",
  ];

  const currentIndex = lessons.indexOf(currentId);
  if (currentIndex > 0) {
    showLesson(lessons[currentIndex - 1]);
  }
}

// ====================================
// Search Functionality
// ====================================
function initializeSearch() {
  const searchInput = document.getElementById("lessonSearch");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const query = this.value.toLowerCase();
      const lessonItems = document.querySelectorAll(".lesson-item");

      lessonItems.forEach((item) => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
      });
    });
  }
}

// ====================================
// Multi-File Playground
// ====================================
function initializeFileTabs() {
  const fileTabs = document.querySelectorAll(".file-tab");
  const editors = document.querySelectorAll(".code-editor");

  if (fileTabs.length === 0) {
    console.log("File tabs not found");
    return;
  }

  fileTabs.forEach((tab) => {
    // Remove existing listeners by cloning the element
    const newTab = tab.cloneNode(true);
    tab.parentNode.replaceChild(newTab, tab);
  });

  // Re-query after cloning
  const newFileTabs = document.querySelectorAll(".file-tab");

  newFileTabs.forEach((tab) => {
    tab.addEventListener("click", function (e) {
      // Don't trigger if clicking close button
      if (e.target.classList.contains("close-tab")) {
        return;
      }

      const fileType = this.dataset.file;
      console.log("Switching to:", fileType);

      // Update active tab
      newFileTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      // Update active editor
      editors.forEach((e) => e.classList.remove("active"));

      const targetEditor = document.getElementById(`${fileType}Editor`);

      if (targetEditor) {
        targetEditor.classList.add("active");
      }
    });

    // Close tab functionality (optional)
    const closeBtn = tab.querySelector(".close-tab");

    if (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        console.log("Close button clicked");
        // Optional: Add close tab logic
      });
    }
  });

  console.log("File tabs initialized:", newFileTabs.length);
}

function runPlaygroundCode(showNotif = true) {
  const htmlCode = document.getElementById("htmlEditor").value;
  const cssCode = document.getElementById("cssEditor").value;
  const jsCode = document.getElementById("jsEditor").value;
  const iframe = document.getElementById("playgroundFrame");

  // Combine HTML, CSS, and JavaScript
  const combinedCode = htmlCode
    .replace("</head>", `<style>${cssCode}</style></head>`)
    .replace("</body>", `<script>${jsCode}<\/script></body>`);

  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  iframeDoc.open();
  iframeDoc.write(combinedCode);
  iframeDoc.close();

  // Show iframe after loading
  iframe.classList.add("loaded");

  if (showNotif) {
    showNotification("Code executed successfully!", "success");
  }
}

function resetPlaygroundCode() {
  const defaultHTML = `< !DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport"content="width=device-width, initial-scale=1.0"><title>My Playground</title></head><body><h1>Hello,
    World !</h1><p>Start coding here...</p><button id="myButton">Click Me !</button></body></html>`;

  const defaultCSS = `body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        padding: 2rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }

    button {
        padding: 12px 30px;
        font-size: 1rem;
        background: white;
        color: #667eea;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 1rem;
    }

    button:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }

    `;

  const defaultJS = ` // Your JavaScript code
    const button=document.getElementById('myButton');

    if (button) {
        button.addEventListener('click', function() {
                alert('Hello from Techknowldge!');
            }

        );
    }

    `;

  document.getElementById("htmlEditor").value = defaultHTML;
  document.getElementById("cssEditor").value = defaultCSS;
  document.getElementById("jsEditor").value = defaultJS;

  runPlaygroundCode();
  showNotification("Code reset to default!", "success");
}

function copyPlaygroundCode() {
  const activeEditor = document.querySelector(".code-editor.active");
  const code = activeEditor.value;
  const fileName = document
    .querySelector(".file-tab.active")
    .textContent.trim();

  navigator.clipboard.writeText(code).then(() => {
    showNotification(`${fileName} copied to clipboard!`, "success");
  });
}

function downloadCode() {
  const htmlCode = document.getElementById("htmlEditor").value;
  const cssCode = document.getElementById("cssEditor").value;
  const jsCode = document.getElementById("jsEditor").value;

  // Create a zip-like structure (downloading each file)
  const files = [
    {
      name: "index.html",
      content: htmlCode,
    },
    {
      name: "style.css",
      content: cssCode,
    },
    {
      name: "script.js",
      content: jsCode,
    },
  ];

  // For simplicity, download all as one HTML file with embedded CSS and JS
  const combinedCode = htmlCode
    .replace("</head>", `\n <link rel="stylesheet"href="style.css">\n</head>`)
    .replace("</body>", `\n <script src="script.js"><\/script>\n</body>`);

  const blob = new Blob([combinedCode], {
    type: "text/html",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "index.html";
  a.click();
  URL.revokeObjectURL(url);

  showNotification("Code downloaded successfully!", "success");
}

// Legacy function names for compatibility
function runPlayground(showNotif = true) {
  runPlaygroundCode(showNotif);
}

function resetPlayground() {
  resetPlaygroundCode();
}

// ====================================
// Drag & Drop HTML Builder
// ====================================
function initializeDragDrop() {
  const components = document.querySelectorAll(".component-item");
  const dropArea = document.getElementById("dropArea");

  if (!dropArea) return;

  // Make components draggable
  components.forEach((component) => {
    component.addEventListener("dragstart", handleDragStart);
  });

  // Drop area events
  dropArea.addEventListener("dragover", handleDragOver);
  dropArea.addEventListener("drop", handleDrop);
  dropArea.addEventListener("dragleave", handleDragLeave);
}

let draggedType = null;

function handleDragStart(e) {
  draggedType = this.dataset.type;
  e.dataTransfer.effectAllowed = "copy";
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "copy";
  this.classList.add("drag-over");
}

function handleDragLeave(e) {
  this.classList.remove("drag-over");
}

function handleDrop(e) {
  e.preventDefault();
  this.classList.remove("drag-over");

  if (draggedType) {
    addComponent(draggedType);
  }
}

function addComponent(type) {
  const dropArea = document.getElementById("dropArea");
  const placeholder = dropArea.querySelector(".drop-placeholder");

  if (placeholder) {
    placeholder.remove();
  }

  const element = document.createElement("div");
  element.className = "dropped-element";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

  deleteBtn.onclick = () => {
    element.remove();
    updateGeneratedCode();
  };

  const componentHTML = getComponentHTML(type);
  element.innerHTML = componentHTML;
  element.appendChild(deleteBtn);

  dropArea.appendChild(element);
  updateGeneratedCode();
}

function getComponentHTML(type) {
  const templates = {
    heading: '<h2 contenteditable="true">Your Heading Here</h2>',
    paragraph: '<p contenteditable="true">Your paragraph text goes here...</p>',
    button: "<button>Click Me</button>",
    image: '<img src="https://via.placeholder.com/300x200" alt="Placeholder">',
    link: '<a href="#" contenteditable="true">Link Text</a>',
    input: '<input type="text" placeholder="Enter text...">',
    container:
      '<div style="border: 2px dashed #ccc; padding: 20px;">Container</div>',
    list: '<ul><li contenteditable="true">List item 1</li><li contenteditable="true">List item 2</li></ul>',
  };

  return templates[type] || "<div>Unknown component</div>";
}

function updateGeneratedCode() {
  const dropArea = document.getElementById("dropArea");
  const elements = dropArea.querySelectorAll(".dropped-element");

  let html =
    "<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page</title>\n</head>\n<body>\n\n";

  elements.forEach((el) => {
    const content = el.innerHTML.replace(
      /<button class="delete-btn">.*?<\/button>/g,
      "",
    );
    html += "  " + content + "\n";
  });

  html += "\n</body>\n</html>";

  document.getElementById("generatedCode").textContent = html;
}

function clearBuilder() {
  const dropArea = document.getElementById("dropArea");
  dropArea.innerHTML =
    '<p class="drop-placeholder">Drag components here to build your HTML page</p>';
  updateGeneratedCode();
}

function copyGeneratedCode() {
  const code = document.getElementById("generatedCode").textContent;

  navigator.clipboard.writeText(code).then(() => {
    showNotification("Generated code copied!", "success");
  });
}

// ====================================
// AI Assistant
// ====================================
function initializeAI() {
  const aiInput = document.getElementById("aiInput");

  if (aiInput) {
    aiInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendAIMessage();
      }
    });
  }
}

function askAI(question) {
  document.getElementById("aiInput").value = question;
  sendAIMessage();
}

function sendAIMessage() {
  const input = document.getElementById("aiInput");
  const message = input.value.trim();

  if (!message) return;

  // Add user message
  addAIMessage(message, "user");
  input.value = "";

  // Simulate AI response
  setTimeout(
    () => {
      const response = generateAIResponse(message);
      addAIMessage(response, "bot");
    },

    1000,
  );
}

function addAIMessage(text, sender) {
  const chatArea = document.getElementById("aiChatArea");
  const messageDiv = document.createElement("div");

  messageDiv.className = `ai-message ai-message-${sender}`;

  const avatar = document.createElement("div");
  avatar.className = "ai-avatar";
  avatar.innerHTML =
    sender === "bot"
      ? '<i class="fas fa-robot"></i>'
      : '<i class="fas fa-user"></i>';

  const content = document.createElement("div");
  content.className = "ai-content";

  // Parse markdown-style code blocks
  const formattedText = text.replace(
    /```(.*?)```/gs,
    "<pre><code>$1</code></pre>",
  );

  content.innerHTML = `<p>${formattedText}</p>`;

  messageDiv.appendChild(avatar);
  messageDiv.appendChild(content);
  chatArea.appendChild(messageDiv);

  // Scroll to bottom
  chatArea.scrollTop = chatArea.scrollHeight;
}

function generateAIResponse(question) {
  const q = question.toLowerCase();

  // Simple keyword-based responses
  if (q.includes("link") || q.includes("<a")) {
    return `To create a link in HTML,
        use the &lt;
        a&gt;
        tag with the href attribute: \n\n\`\`\`&lt;
        a href="https://example.com"&gt;
        Click here&lt;/a&gt;
        \`\`\`\n\nThe href attribute specifies the URL destination.`;
  }

  if (q.includes("form")) {
    return `HTML forms collect user input using the &lt;
        form&gt;
        tag: \n\n\`\`\`&lt;
        form action="/submit"method="POST"&gt;
        \n &lt;
        input type="text"name="username"&gt;
        \n &lt;
        button type="submit"&gt;
        Submit&lt;/button&gt;
        \n&lt;/form&gt;
        \`\`\`\n\nCommon input types: text, email, password, checkbox, radio, submit.`;
  }

  if (q.includes("table")) {
    return `Create tables using &lt;
        table&gt;
        ,
        &lt;
        tr&gt;
        (row),
        &lt;
        th&gt;
        (header),
        &lt;
        td&gt;
        (cell): \n\n\`\`\`&lt;
        table&gt;
        \n &lt;
        tr&gt;
        \n &lt;
        th&gt;
        Name&lt;/th&gt;
        \n &lt;
        th&gt;
        Age&lt;/th&gt;
        \n &lt;/tr&gt;
        \n &lt;
        tr&gt;
        \n &lt;
        td&gt;
        John&lt;/td&gt;
        \n &lt;
        td&gt;
        25&lt;/td&gt;
        \n &lt;/tr&gt;
        \n&lt;/table&gt;
        \`\`\``;
  }

  if (q.includes("image") || q.includes("<img")) {
    return `Add images using the &lt;
        img&gt;
        tag: \n\n\`\`\`&lt;
        img src="image.jpg"alt="Description"&gt;
        \`\`\`\n\nThe src attribute specifies the image URL,
        and alt provides alternative text for accessibility.`;
  }

  if (q.includes("list")) {
    return `HTML supports ordered (&lt; ol&gt; ) and unordered (&lt; ul&gt; ) lists: \n\n\`\`\`&lt;
        ul&gt;
        \n &lt;
        li&gt;
        Item 1&lt;/li&gt;
        \n &lt;
        li&gt;
        Item 2&lt;/li&gt;
        \n&lt;/ul&gt;
        \`\`\`\n\nUse &lt;
        ol&gt;
        for numbered lists.`;
  }

  if (q.includes("error") || q.includes("fix")) {
    return `Common HTML errors: \n\n1. Unclosed tags - Always close tags: &lt;
        p&gt;
        text&lt;/p&gt;
        \n2. Missing quotes - Use quotes: href="url"\n3. Nested tags incorrectly - Close in reverse order\n4. Missing DOCTYPE - Start with &lt;
         !DOCTYPE html&gt;
        \n\nShare your code and I'll help fix it!`;
  }

  // Default response
  return `Great question about HTML ! Here's what you need to know:\n\nHTML uses tags to structure content. Most tags come in pairs (opening and closing). Check out the tutorial lessons for detailed explanations and examples.\n\nNeed help with something specific? Ask me about links, forms, tables, images, or any HTML topic!`;
}

// ====================================
// Certificate System
// ====================================
function initializeCertificate() {
  const certBtn = document.getElementById("generateCertificate");
  if (certBtn) {
    certBtn.addEventListener("click", showCertificate);
  }
}

function showCertificate() {
  const modal = document.getElementById("certificateModal");
  modal.classList.add("show");

  // Get user name
  let userName = localStorage.getItem("css_course_username");

  if (!userName) {
    userName = prompt("Enter your name for the certificate:") || "Student";
    localStorage.setItem("css_course_username", userName);
  }

  // Generate certificate
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  document.getElementById("certName").textContent = userName;
  document.getElementById("certDate").textContent = date;

  // Close modal when clicking the X
  document.querySelector(".close-cert").addEventListener("click", () => {
    modal.classList.remove("show");
  });

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });
}

function closeModal() {
  document.getElementById("certificateModal").classList.remove("show");
}

function downloadCertificate() {
  // Use browser's print functionality to save as PDF
  window.print();
  showNotification("Use Print dialog to save as PDF!", "success");
}

function generateAndDownloadCertificate() {
  // First, show the certificate modal
  showCertificate();

  // Show a notification about downloading
  setTimeout(
    () => {
      showNotification(
        "Certificate generated! You can download it from the modal.",
        "success",
      );
    },

    500,
  );
}

// ====================================
// Notification System
// ====================================
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed;
    top: 120px;
    right: 30px;
    background: ${type === "success" ? "#04AA6D" : "#282A35"};
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 10001;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(
    () => {
      notification.style.animation = "slideOut 0.3s ease";
      setTimeout(() => notification.remove(), 300);
    },

    3000,
  );
}

// Add CSS animations
const style = document.createElement("style");

style.textContent = ` @keyframes slideIn {
    from {
        transform: translateX(400px);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }

    to {
        transform: translateX(400px);
        opacity: 0;
    }
}

`;
document.head.appendChild(style);

// ====================================
// Search Functionality
// ====================================
document
  .getElementById("lessonSearch")
  ?.addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const lessonItems = document.querySelectorAll(".lesson-item");

    lessonItems.forEach((item) => {
      const text = item.textContent.toLowerCase();

      if (text.includes(searchTerm)) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  });

// ====================================
// Expose functions to global scope for onclick handlers
// ====================================
window.navigateLesson = navigateLesson;
window.markComplete = markComplete;
window.submitQuiz = submitQuiz;
window.copyCode = copyCode;
window.downloadCode = downloadCode;
window.clearBuilder = clearBuilder;
window.copyGeneratedCode = copyGeneratedCode;
window.sendAIMessage = sendAIMessage;

console.log("Techknowldge HTML Course loaded successfully! 🚀");
