/* ====================================
   Techknowldge React Course - JavaScript
   Interactive Learning Features & React Playground
   ==================================== */

// ====================================
// Global State Management
// ====================================
let currentLesson = "intro";
let completedLessons = new Set();
let totalLessons = 49;
let quizScores = {};

// Lesson order
const lessonOrder = [
  "intro",
  "setup",
  "jsx",
  "components",
  "props",
  "state",
  "events",
  "conditional",
  "lists",
  "forms",
  "controlled",
  "uncontrolled",
  "validation",
  "usestate",
  "useeffect",
  "useref",
  "usecontext",
  "usememo",
  "usecallback",
  "customhooks",
  "lifecycle",
  "routing",
  "dynamicrouting",
  "nestedrouting",
  "contextapi",
  "redux",
  "reduxtoolkit",
  "apicalls",
  "errorhandling",
  "loadingstates",
  "styling",
  "tailwind",
  "auth",
  "protectedroutes",
  "optimization",
  "lazyloading",
  "codesplitting",
  "reactmemo",
  "hoc",
  "renderprops",
  "portals",
  "errorboundaries",
  "jest",
  "rtl",
  "typescript",
  "envvars",
  "deployment",
  "seo",
  "exam",
];

// ====================================
// Local Storage Functions
// ====================================
function loadProgress() {
  const saved = localStorage.getItem("react_course_progress");
  if (saved) {
    const data = JSON.parse(saved);
    completedLessons = new Set(data.completed || []);
    quizScores = data.scores || {};
    updateProgress();
  }
}

function saveProgress() {
  localStorage.setItem(
    "react_course_progress",
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
  console.log("REACT COURSE - DOM LOADED");
  console.log("========================================");

  loadProgress();
  console.log("✓ Progress loaded");

  initializeTabs();
  initializeCopyButtons();
  console.log("✓ Copy buttons initialized");
  console.log("✓ Tabs initialized");

  initializeLessonNavigation();
  console.log("✓ Lesson navigation initialized");

  initializeSidebar();
  console.log("✓ Sidebar initialized");

  initializeDarkMode();
  console.log("✓ Dark mode initialized");

  initializeReactPlayground();
  console.log("✓ React Playground initialized");

  initializeSearch();
  console.log("✓ Search initialized");

  initializeCertificate();
  console.log("✓ Certificate initialized");

  initializeExam();
  console.log("✓ Exam initialized");

  updateProgress();
  console.log("✓ Progress updated");

  // Make functions globally accessible
  window.showLesson = showLesson;
  window.markLessonComplete = markLessonComplete;
  window.nextLesson = nextLesson;
  window.prevLesson = prevLesson;
  window.submitExam = submitExam;
  window.retakeExam = retakeExam;
  window.runReactCode = runReactCode;
  window.clearReactCode = clearReactCode;
  window.downloadCertificate = downloadCertificate;
  console.log("✓ Global functions registered");

  // Show first lesson
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

      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      button.classList.add("active");
      document.getElementById(tabName).classList.add("active");

      if (tabName === "playground") {
        setTimeout(() => runReactCode(), 100);
      }
    });
  });
}

// ====================================
// Lesson Navigation
// ====================================
function initializeLessonNavigation() {
  const lessonItems = document.querySelectorAll(".lesson-item");

  lessonItems.forEach((item, index) => {
    item.addEventListener("click", function (e) {
      const lessonId = this.dataset.lesson;
      if (lessonId) {
        showLesson(lessonId);
      }
    });
    item.style.cursor = "pointer";
  });
}

function showLesson(lessonId) {
  console.log("=== SHOW LESSON:", lessonId, "===");
  currentLesson = lessonId;

  // Switch to tutorial tab
  const tutorialTab = document.querySelector('[data-tab="tutorial"]');
  const tutorialContent = document.getElementById("tutorial");

  if (
    tutorialTab &&
    tutorialContent &&
    !tutorialTab.classList.contains("active")
  ) {
    document
      .querySelectorAll(".tab-btn")
      .forEach((btn) => btn.classList.remove("active"));
    document
      .querySelectorAll(".tab-content")
      .forEach((content) => content.classList.remove("active"));
    tutorialTab.classList.add("active");
    tutorialContent.classList.add("active");
  }

  setTimeout(() => {
    // Hide all lessons
    const allLessons = document.querySelectorAll(".lesson-section");
    allLessons.forEach((lesson) => {
      lesson.style.display = "none";
      lesson.classList.remove("active");
    });

    // Show selected lesson
    const selectedLesson = document.getElementById(lessonId + "-content");
    if (selectedLesson) {
      selectedLesson.style.display = "block";
      selectedLesson.classList.add("active");
      console.log("✅ Lesson displayed successfully");
    } else {
      console.error("❌ Lesson not found:", lessonId);
    }

    // Update sidebar active state
    document.querySelectorAll(".lesson-item").forEach((item) => {
      item.classList.remove("active");
      if (item.dataset.lesson === lessonId) {
        item.classList.add("active");
      }
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 50);
}

function nextLesson(currentLessonId) {
  const currentIndex = lessonOrder.indexOf(currentLessonId);
  if (currentIndex < lessonOrder.length - 1) {
    const nextLessonId = lessonOrder[currentIndex + 1];
    showLesson(nextLessonId);
  }
}

function prevLesson(currentLessonId) {
  const currentIndex = lessonOrder.indexOf(currentLessonId);
  if (currentIndex > 0) {
    const prevLessonId = lessonOrder[currentIndex - 1];
    showLesson(prevLessonId);
  }
}

// ====================================
// Progress Tracking
// ====================================
function updateProgress() {
  const completed = completedLessons.size;
  const percentage = Math.round((completed / totalLessons) * 100);

  const progressBar = document.getElementById("progressBar");
  const miniProgressBar = document.getElementById("miniProgressBar");
  const progressText = document.getElementById("progressText");
  const completedText = document.getElementById("completedLessons");

  if (progressBar) progressBar.style.width = percentage + "%";
  if (miniProgressBar) miniProgressBar.style.width = percentage + "%";
  if (progressText) progressText.textContent = percentage + "%";
  if (completedText) completedText.textContent = completed;

  // Update lesson items
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

  // Show certificate button
  if (completed === totalLessons) {
    const certBtn = document.getElementById("generateCertificate");
    if (certBtn) {
      certBtn.style.display = "block";
    }
  }
}

function markLessonComplete(lessonId) {
  completedLessons.add(lessonId);
  saveProgress();
  updateProgress();
  showNotification("✓ Lesson marked as complete!", "success");
}

// ====================================
// Sidebar Toggle
// ====================================
function initializeSidebar() {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("sidebarToggle");
  const overlay = document.getElementById("sidebarOverlay");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("show");
      if (overlay) {
        overlay.classList.toggle("show");
      }
      document.body.style.overflow = sidebar.classList.contains("show")
        ? "hidden"
        : "";
    });
  }

  // Close sidebar when clicking overlay
  if (overlay) {
    overlay.addEventListener("click", () => {
      sidebar.classList.remove("show");
      overlay.classList.remove("show");
      document.body.style.overflow = "";
    });
  }

  // Close sidebar when clicking a lesson on mobile
  const lessonItems = document.querySelectorAll(".lesson-item");
  lessonItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("show");
        if (overlay) {
          overlay.classList.remove("show");
        }
        document.body.style.overflow = "";
      }
    });
  });
}

// ====================================
// Dark Mode
// ====================================
function initializeDarkMode() {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const savedMode = localStorage.getItem("react_dark_mode");

  if (savedMode === "dark") {
    document.body.classList.add("dark-mode");
    if (darkModeToggle) {
      darkModeToggle.querySelector("i").className = "fas fa-sun";
    }
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("react_dark_mode", isDark ? "dark" : "light");
      darkModeToggle.querySelector("i").className = isDark
        ? "fas fa-sun"
        : "fas fa-moon";
    });
  }
}

// ====================================
// React Playground
// ====================================
function initializeReactPlayground() {
  const codeEditor = document.getElementById("reactCode");
  if (codeEditor) {
    // Auto-resize textarea
    codeEditor.addEventListener("input", function () {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    });
  }
}

function runReactCode() {
  const code = document.getElementById("reactCode").value;
  const preview = document.getElementById("reactPreview");

  // Create HTML with React setup
  const html = `
<!DOCTYPE html>
<html>
<head>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      margin: 0;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    ${code}
    
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>
  `;

  // Update iframe
  preview.srcdoc = html;
}

function clearReactCode() {
  document.getElementById("reactCode").value = `// Write your React code here
function App() {
  return (
    <div className="container">
      <h1>Hello React!</h1>
      <p>Start coding...</p>
    </div>
  );
}

export default App;`;
  runReactCode();
}

// ====================================
// Copy Button Functionality
// ====================================
function initializeCopyButtons() {
  // Add copy button to all code blocks
  const codeBlocks = document.querySelectorAll(".example-box pre");

  codeBlocks.forEach((pre) => {
    // Create copy button
    const copyButton = document.createElement("button");
    copyButton.className = "copy-btn";
    copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
    copyButton.title = "Copy code";

    // Add click event
    copyButton.addEventListener("click", function () {
      const code = pre.querySelector("code");
      if (code) {
        const textToCopy = code.textContent;

        // Copy to clipboard
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            // Change button text temporarily
            copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyButton.classList.add("copied");

            setTimeout(() => {
              copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
              copyButton.classList.remove("copied");
            }, 2000);
          })
          .catch((err) => {
            console.error("Failed to copy: ", err);
            copyButton.innerHTML = '<i class="fas fa-times"></i> Failed';
            setTimeout(() => {
              copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
            }, 2000);
          });
      }
    });

    // Add button to pre element
    pre.style.position = "relative";
    pre.appendChild(copyButton);
  });
}

// ====================================
// Search Functionality
// ====================================
function initializeSearch() {
  const searchInput = document.getElementById("lessonSearch");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const lessonItems = document.querySelectorAll(".lesson-item");

      lessonItems.forEach((item) => {
        const lessonText = item.textContent.toLowerCase();
        if (lessonText.includes(searchTerm)) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
      });
    });
  }
}

// ====================================
// Certificate Generation
// ====================================
function initializeCertificate() {
  const certBtn = document.getElementById("generateCertificate");
  if (certBtn) {
    certBtn.addEventListener("click", downloadCertificate);
  }
}

function downloadCertificate() {
  const userName = prompt("Enter your name for the certificate:", "Student");
  if (!userName) return;

  showNotification("🎉 Congratulations! Certificate generated!", "success");

  // Redirect to certificate page
  setTimeout(() => {
    window.location.href = `../../pages/certificates/certificates.html?course=React&name=${encodeURIComponent(userName)}`;
  }, 1500);
}

// ====================================
// Notification System
// ====================================
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background: ${type === "success" ? "#04AA6D" : "#2196F3"};
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add animations
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
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

console.log("React Course JavaScript Loaded Successfully!");

// ====================================
// Final Exam - 50 MCQ Questions
// ====================================

const examQuestions = [
  {
    question: "What is React?",
    options: [
      "A JavaScript framework",
      "A JavaScript library for building UIs",
      "A database management system",
      "A CSS framework",
    ],
    correct: 1,
  },
  {
    question: "Who developed and maintains React?",
    options: ["Google", "Microsoft", "Facebook (Meta)", "Amazon"],
    correct: 2,
  },
  {
    question: "What does JSX stand for?",
    options: [
      "JavaScript XML",
      "JavaScript Extension",
      "Java Syntax Extension",
      "JavaScript Extra",
    ],
    correct: 0,
  },
  {
    question: "Which method is used to create a React component?",
    options: [
      "React.createComponent()",
      "React.component()",
      "function or class",
      "React.makeComponent()",
    ],
    correct: 2,
  },
  {
    question: "What is the virtual DOM in React?",
    options: [
      "A real DOM element",
      "A lightweight copy of the real DOM",
      "A database",
      "A styling technique",
    ],
    correct: 1,
  },
  {
    question: "How do you pass data from parent to child component?",
    options: ["State", "Props", "Context", "Redux"],
    correct: 1,
  },
  {
    question: "What Hook is used to add state to functional components?",
    options: ["useEffect", "useState", "useContext", "useReducer"],
    correct: 1,
  },
  {
    question: "What is the purpose of useEffect Hook?",
    options: [
      "To add state",
      "To perform side effects",
      "To create context",
      "To optimize performance",
    ],
    correct: 1,
  },
  {
    question: "Which attribute is used instead of 'class' in JSX?",
    options: ["class", "className", "classList", "cssClass"],
    correct: 1,
  },
  {
    question: "What does the key prop help React do?",
    options: [
      "Style elements",
      "Identify which items have changed",
      "Add event listeners",
      "Create components",
    ],
    correct: 1,
  },
  {
    question: "How do you handle events in React?",
    options: ["onclick", "addEventListener", "onClick", "on-click"],
    correct: 2,
  },
  {
    question: "What is a controlled component?",
    options: [
      "A component controlled by Redux",
      "A form element controlled by React state",
      "A component with no state",
      "A component controlled by props only",
    ],
    correct: 1,
  },
  {
    question: "What Hook would you use to access DOM elements directly?",
    options: ["useState", "useEffect", "useRef", "useMemo"],
    correct: 2,
  },
  {
    question: "What is the purpose of useContext Hook?",
    options: [
      "To add state",
      "To consume context values",
      "To create refs",
      "To handle side effects",
    ],
    correct: 1,
  },
  {
    question: "What does useMemo Hook do?",
    options: [
      "Creates state",
      "Memoizes expensive calculations",
      "Handles side effects",
      "Creates context",
    ],
    correct: 1,
  },
  {
    question: "What is the difference between useMemo and useCallback?",
    options: [
      "No difference",
      "useMemo memoizes values, useCallback memoizes functions",
      "useCallback is faster",
      "useMemo is deprecated",
    ],
    correct: 1,
  },
  {
    question: "What must custom Hook names start with?",
    options: ["hook", "custom", "use", "my"],
    correct: 2,
  },
  {
    question: "What are the three phases of component lifecycle?",
    options: [
      "Start, Middle, End",
      "Mounting, Updating, Unmounting",
      "Create, Update, Delete",
      "Init, Render, Destroy",
    ],
    correct: 1,
  },
  {
    question: "Which library is commonly used for routing in React?",
    options: ["React Router", "React Path", "React Navigate", "React Links"],
    correct: 0,
  },
  {
    question: "What component do you use to define routes in React Router?",
    options: ["<Path>", "<Route>", "<Router>", "<Link>"],
    correct: 1,
  },
  {
    question: "How do you navigate programmatically in React Router v6?",
    options: ["history.push()", "useNavigate()", "navigate()", "useRouter()"],
    correct: 1,
  },
  {
    question: "What is Context API used for?",
    options: ["Routing", "State management", "Styling", "Testing"],
    correct: 1,
  },
  {
    question: "What does Redux help with?",
    options: ["Routing", "State management", "Styling", "Form validation"],
    correct: 1,
  },
  {
    question: "What is Redux Toolkit?",
    options: [
      "A testing library",
      "Official recommended way to write Redux",
      "A routing library",
      "A styling solution",
    ],
    correct: 1,
  },
  {
    question: "What method do you use to fetch data from an API?",
    options: ["fetch() or axios", "getData()", "apiCall()", "request()"],
    correct: 0,
  },
  {
    question: "Where should you make API calls in a React component?",
    options: [
      "In render method",
      "In constructor",
      "In useEffect Hook",
      "In return statement",
    ],
    correct: 2,
  },
  {
    question: "What is the purpose of error boundaries?",
    options: [
      "To style errors",
      "To catch JavaScript errors in component tree",
      "To log errors",
      "To prevent errors",
    ],
    correct: 1,
  },
  {
    question: "How do you prevent unnecessary re-renders?",
    options: [
      "Use React.memo",
      "Use inline styles",
      "Use more props",
      "Use global variables",
    ],
    correct: 0,
  },
  {
    question: "What is lazy loading in React?",
    options: [
      "Loading data slowly",
      "Loading components only when needed",
      "Delaying state updates",
      "Slow rendering",
    ],
    correct: 1,
  },
  {
    question: "What function do you use for lazy loading?",
    options: ["React.load()", "React.lazy()", "import.lazy()", "lazyLoad()"],
    correct: 1,
  },
  {
    question: "What must wrap a lazy-loaded component?",
    options: ["<Lazy>", "<Suspense>", "<Loader>", "<Async>"],
    correct: 1,
  },
  {
    question: "What is code splitting?",
    options: [
      "Splitting components",
      "Breaking code into smaller bundles",
      "Dividing code by folders",
      "Separating CSS and JS",
    ],
    correct: 1,
  },
  {
    question: "What is a Higher Order Component (HOC)?",
    options: [
      "A component at top of tree",
      "A function that takes a component and returns a new component",
      "A component with more props",
      "A class component",
    ],
    correct: 1,
  },
  {
    question: "What are render props?",
    options: [
      "Props for rendering",
      "A technique for sharing code using a prop whose value is a function",
      "Props that render components",
      "Special props",
    ],
    correct: 1,
  },
  {
    question: "What are React Portals used for?",
    options: [
      "Creating routes",
      "Rendering children outside parent DOM hierarchy",
      "Managing state",
      "Fetching data",
    ],
    correct: 1,
  },
  {
    question: "Which testing library is specifically made for React?",
    options: ["Jest", "React Testing Library", "Mocha", "Jasmine"],
    correct: 1,
  },
  {
    question: "What does TypeScript add to React?",
    options: [
      "Better styling",
      "Static typing",
      "Faster rendering",
      "More components",
    ],
    correct: 1,
  },
  {
    question: "How do you access environment variables in React?",
    options: [
      "env.VARIABLE",
      "process.env.REACT_APP_VARIABLE",
      "window.env.VARIABLE",
      "ENV.VARIABLE",
    ],
    correct: 1,
  },
  {
    question: "What command builds a React app for production?",
    options: ["npm start", "npm build", "npm run build", "npm production"],
    correct: 2,
  },
  {
    question: "What is the default port for React development server?",
    options: ["8080", "3000", "5000", "4200"],
    correct: 1,
  },
  {
    question: "Can you modify props inside a component?",
    options: [
      "Yes, always",
      "No, props are read-only",
      "Only in class components",
      "Only in functional components",
    ],
    correct: 1,
  },
  {
    question: "What is the purpose of the dependency array in useEffect?",
    options: [
      "To store dependencies",
      "To control when effect runs",
      "To add dependencies",
      "No purpose",
    ],
    correct: 1,
  },
  {
    question: "What happens when you call setState?",
    options: [
      "State updates immediately",
      "Component re-renders with new state",
      "Nothing happens",
      "State is deleted",
    ],
    correct: 1,
  },
  {
    question: "What is React Strict Mode used for?",
    options: [
      "Production builds",
      "Highlighting potential problems in development",
      "Strict typing",
      "Performance optimization",
    ],
    correct: 1,
  },
  {
    question: "Can functional components have state?",
    options: [
      "No, never",
      "Yes, with Hooks",
      "Only with Redux",
      "Only when converted to class",
    ],
    correct: 1,
  },
  {
    question: "What is prop drilling?",
    options: [
      "Drilling holes in props",
      "Passing props through multiple levels",
      "Deleting props",
      "Copying props",
    ],
    correct: 1,
  },
  {
    question: "Which Hook would you use for complex state logic?",
    options: ["useState", "useReducer", "useEffect", "useMemo"],
    correct: 1,
  },
  {
    question: "What does React.Fragment do?",
    options: [
      "Creates fragments",
      "Groups children without adding extra DOM nodes",
      "Breaks components",
      "Splits components",
    ],
    correct: 1,
  },
  {
    question: "What is the shorthand for React.Fragment?",
    options: ["<>...</>", "<Fragment>", "<Frag>", "<F>"],
    correct: 0,
  },
  {
    question: "What does the 'children' prop represent?",
    options: [
      "Child components",
      "Content between opening and closing tags",
      "Array of components",
      "Props for children",
    ],
    correct: 1,
  },
];

// ====================================
// Exam Functions
// ====================================

function initializeExam() {
  // Check if exam container exists
  const container = document.getElementById("quizContainer");
  if (!container) return;

  // Generate quiz questions
  renderQuizQuestions();
}

function renderQuizQuestions() {
  const container = document.getElementById("quizContainer");
  if (!container) return;

  container.innerHTML = "";

  examQuestions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "quiz-question";

    questionDiv.innerHTML = `
      <span class="question-number">Question ${index + 1}</span>
      <div class="question-text">${q.question}</div>
      <div class="quiz-options">
        ${q.options
          .map(
            (option, optIndex) => `
          <label class="option-label">
            <input type="radio" name="question${index}" value="${optIndex}">
            <span class="option-text">${option}</span>
          </label>
        `,
          )
          .join("")}
      </div>
    `;

    container.appendChild(questionDiv);
  });
}

function submitExam() {
  let correctCount = 0;
  let answeredCount = 0;

  examQuestions.forEach((q, index) => {
    const selected = document.querySelector(
      `input[name="question${index}"]:checked`
    );
    if (selected) {
      answeredCount++;
      if (parseInt(selected.value) === q.correct) {
        correctCount++;
      }
    }
  });

  // Check if all questions are answered
  if (answeredCount < examQuestions.length) {
    alert(
      `Please answer all questions! You have answered ${answeredCount} out of ${examQuestions.length} questions.`
    );
    return;
  }

  // Calculate percentage
  const percentage = (correctCount / examQuestions.length) * 100;
  const passed = percentage >= 60;

  // Show result
  showExamResult(correctCount, examQuestions.length, percentage, passed);

  // Save to localStorage
  localStorage.setItem(
    "react_exam_score",
    JSON.stringify({
      score: correctCount,
      total: examQuestions.length,
      percentage: percentage,
      passed: passed,
      date: new Date().toISOString(),
    }),
  );

  // Scroll to result
  document.getElementById("examResult").scrollIntoView({ behavior: "smooth" });
}

function showExamResult(correct, total, percentage, passed) {
  const resultDiv = document.getElementById("examResult");
  if (!resultDiv) return;

  resultDiv.style.display = "block";
  resultDiv.className = `exam-result ${passed ? "result-pass" : "result-fail"}`;

  if (passed) {
    resultDiv.innerHTML = `
      <div class="result-icon">
        <i class="fas fa-trophy"></i>
      </div>
      <h2 class="result-title">Congratulations! You Passed!</h2>
      <div class="result-score">
        <span class="score-number">${correct}/${total}</span>
        <p>${percentage.toFixed(1)}% Score</p>
      </div>
      <div class="result-message">
        <p>Excellent work! You have successfully completed the React Certification Exam.</p>
        <p>You have demonstrated strong understanding of React concepts and are ready to build amazing applications!</p>
      </div>
      <div class="result-actions">
        <button class="btn-certificate" onclick="downloadCertificate()">
          <i class="fas fa-certificate"></i>
          Download Certificate
        </button>
        <button class="btn-retake" onclick="retakeExam()">
          <i class="fas fa-redo"></i>
          Retake Exam
        </button>
      </div>
    `;
  } else {
    resultDiv.innerHTML = `
      <div class="result-icon">
        <i class="fas fa-times-circle"></i>
      </div>
      <h2 class="result-title">You Failed</h2>
      <div class="result-score">
        <span class="score-number">${correct}/${total}</span>
        <p>${percentage.toFixed(1)}% Score</p>
      </div>
      <div class="result-message">
        <p>Unfortunately, you need at least 60% (30 out of 50 questions) to pass the exam.</p>
        <p>Don't give up! Review the course material and try again. You can do it!</p>
        <p><strong>Tip:</strong> Focus on the topics you found difficult and practice more.</p>
      </div>
      <div class="result-actions">
        <button class="btn-retake" onclick="retakeExam()">
          <i class="fas fa-redo"></i>
          Retake Exam
        </button>
        <button class="btn-prev" onclick="showLesson('intro')">
          <i class="fas fa-book"></i>
          Review Course
        </button>
      </div>
    `;
  }
}

function retakeExam() {
  // Clear all selections
  examQuestions.forEach((q, index) => {
    const radios = document.querySelectorAll(`input[name="question${index}"]`);
    radios.forEach((radio) => (radio.checked = false));
  });

  // Hide result
  const resultDiv = document.getElementById("examResult");
  if (resultDiv) {
    resultDiv.style.display = "none";
  }

  // Scroll to top of exam
  document
    .getElementById("exam-content")
    .scrollIntoView({ behavior: "smooth" });

  showNotification("Exam reset! Good luck! ", "info");
}