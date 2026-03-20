/* ====================================
   Techknowldge Main JavaScript
   Landing Page Functionality
   ==================================== */

// ====================================
// Dark Mode Toggle
// ====================================
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("theme-toggle");
  const toggleBtnMobile = document.getElementById("theme-toggle-mobile");
  const body = document.body;

  // Load saved theme preference
  const savedTheme = localStorage.getItem("codeseekho_theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    updateThemeIcons(true);
  }

  // Function to update both theme toggle icons
  function updateThemeIcons(isDark) {
    const buttons = [toggleBtn, toggleBtnMobile].filter((btn) => btn !== null);
    buttons.forEach((btn) => {
      const icon = btn.querySelector("i");
      if (icon) {
        if (isDark) {
          icon.classList.remove("fa-moon");
          icon.classList.add("fa-sun");
        } else {
          icon.classList.remove("fa-sun");
          icon.classList.add("fa-moon");
        }
      }
    });
  }

  // Function to toggle theme
  function toggleTheme() {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");
    updateThemeIcons(isDark);
    localStorage.setItem("codeseekho_theme", isDark ? "dark" : "light");
  }

  // Add event listeners to both buttons
  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleTheme);
  }

  if (toggleBtnMobile) {
    toggleBtnMobile.addEventListener("click", toggleTheme);
  }

  // Initialize other features
  initializeSearch();
  initializeScrollAnimations();
  initializeUserAuth();
  initializeHamburgerMenu();
});

// ====================================
// Hamburger Menu
// ====================================
function initializeHamburgerMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      mobileMenu.classList.toggle("active");

      // Prevent body scroll when menu is open
      if (mobileMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });

    // Close menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "";
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !hamburger.contains(e.target) &&
        !mobileMenu.contains(e.target) &&
        mobileMenu.classList.contains("active")
      ) {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }
}

// ====================================
// Search Functionality
// ====================================
function initializeSearch() {
  const mainSearch = document.getElementById("mainSearch");
  const navSearch = document.getElementById("navSearch");

  if (mainSearch) {
    mainSearch.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        performSearch(this.value);
      }
    });

    // Add search button click handler
    const searchButton = document.querySelector(".search-box-large button");
    if (searchButton) {
      searchButton.addEventListener("click", function () {
        performSearch(mainSearch.value);
      });
    }
  }

  if (navSearch) {
    navSearch.addEventListener("input", function () {
      performNavSearch(this.value);
    });
  }
}

function performSearch(query) {
  if (!query.trim()) return;

  const lowerQuery = query.toLowerCase();

  // Simple search routing
  if (lowerQuery.includes("html")) {
    window.location.href = "courses/html-course/html-course.html";
  } else if (lowerQuery.includes("css")) {
    window.location.href = "courses/css-course/css-course.html";
  } else if (lowerQuery.includes("javascript") || lowerQuery.includes("js")) {
    window.location.href = "courses/js-course/js-course.html";
  } else {
    alert(`Search results for "${query}" - Feature coming soon!`);
  }
}

function performNavSearch(query) {
  // Filter courses based on search
  const courseCards = document.querySelectorAll(".course-card");
  const lowerQuery = query.toLowerCase();

  courseCards.forEach((card) => {
    const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
    const description =
      card.querySelector("p")?.textContent.toLowerCase() || "";

    if (title.includes(lowerQuery) || description.includes(lowerQuery)) {
      card.style.display = "";
    } else {
      card.style.display = lowerQuery ? "none" : "";
    }
  });
}

// ====================================
// Scroll Animations
// ====================================
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll(".course-card, .feature-card").forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });
}

// ====================================
// User Authentication
// ====================================
function initializeUserAuth() {
  const isLoggedIn = localStorage.getItem("codeseekho_user");
  const userProfile = document.getElementById("userProfile");
  const loginBtn = document.querySelector(".login-btn");
  const signupBtn = document.querySelector(".signup-btn");
  const logoutBtn = document.getElementById("logoutBtn");

  if (isLoggedIn) {
    // Show user profile, hide login/signup
    if (userProfile) {
      userProfile.style.display = "block";

      // Add click functionality for mobile
      const profileImg = userProfile.querySelector(".profile-img");
      if (profileImg) {
        profileImg.addEventListener("click", function (e) {
          e.stopPropagation();
          userProfile.classList.toggle("active");
        });
      }

      // Close dropdown when clicking outside
      document.addEventListener("click", function (e) {
        if (!userProfile.contains(e.target)) {
          userProfile.classList.remove("active");
        }
      });

      // Close dropdown when clicking on a link
      const dropdownLinks = userProfile.querySelectorAll(".profile-dropdown a");
      dropdownLinks.forEach((link) => {
        link.addEventListener("click", function () {
          if (!this.id.includes("logout")) {
            userProfile.classList.remove("active");
          }
        });
      });
    }
    if (loginBtn) loginBtn.style.display = "none";
    if (signupBtn) signupBtn.style.display = "none";
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("codeseekho_user");
      localStorage.removeItem("codeseekho_username");
      window.location.reload();
    });
  }
}

// ====================================
// Smooth Scrolling for Anchor Links
// ====================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ====================================
// Course Card Click Handlers
// ====================================
document.querySelectorAll(".course-card").forEach((card) => {
  card.style.cursor = "pointer";

  // Prevent default if card already has onclick
  if (!card.hasAttribute("onclick")) {
    card.addEventListener("click", function () {
      if (this.classList.contains("html")) {
        window.location.href = "courses/html-course/html-course.html";
      } else if (this.classList.contains("css")) {
        window.location.href = "courses/css-course/css-course.html";
      } else if (this.classList.contains("js")) {
        window.location.href = "courses/js-course/js-course.html";
      }
    });
  }
});

// ====================================
// Utility Functions
// ====================================
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === "success" ? "#04AA6D" : "#282A35"};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

console.log("Techknowldge loaded successfully! 🚀");
