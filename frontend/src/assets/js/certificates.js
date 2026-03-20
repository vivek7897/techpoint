/* ====================================
   TechKnowledge - Certificates JavaScript
   Certificate Management & Download
   ==================================== */

// Sample certificate data (in production, this would come from backend)
const certificatesData = [
  {
    id: "TK-2026-0001",
    courseName: "HTML Fundamentals",
    studentName: "Student Name",
    completionDate: "March 10, 2026",
    category: "Web Development",
    level: "Beginner",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: "TK-2026-0002",
    courseName: "CSS Mastery",
    studentName: "Student Name",
    completionDate: "March 5, 2026",
    category: "Web Development",
    level: "Intermediate",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: "TK-2026-0003",
    courseName: "JavaScript Essentials",
    studentName: "Student Name",
    completionDate: "February 28, 2026",
    category: "Programming",
    level: "Intermediate",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
];

let currentCertificate = null;

// ====================================
// Initialize Page
// ====================================
document.addEventListener("DOMContentLoaded", function () {
  initializeTheme();
  initializeAuth();
  loadCertificates();
  initializeFilters();
  initializeSearch();
  updateStats();
});

// ====================================
// Theme Management
// ====================================
function initializeTheme() {
  const toggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  const savedTheme = localStorage.getItem("codeseekho_theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    updateThemeIcon(true);
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      body.classList.toggle("dark-mode");
      const isDark = body.classList.contains("dark-mode");
      updateThemeIcon(isDark);
      localStorage.setItem("codeseekho_theme", isDark ? "dark" : "light");
    });
  }
}

function updateThemeIcon(isDark) {
  const icon = document.querySelector("#theme-toggle i");
  if (icon) {
    icon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }
}

// ====================================
// User Authentication
// ====================================
function initializeAuth() {
  const isLoggedIn = localStorage.getItem("codeseekho_user");
  const userProfile = document.getElementById("userProfile");
  const logoutBtn = document.getElementById("logoutBtn");

  //   if (!isLoggedIn) {
  //     // Redirect to login if not authenticated
  //     window.location.href = "login.html";
  //     return;
  //   }

  if (userProfile) {
    userProfile.style.display = "block";

    // Profile dropdown functionality
    const profileImg = userProfile.querySelector(".profile-img");
    if (profileImg) {
      profileImg.addEventListener("click", function (e) {
        e.stopPropagation();
        userProfile.classList.toggle("active");
      });
    }

    document.addEventListener("click", function (e) {
      if (!userProfile.contains(e.target)) {
        userProfile.classList.remove("active");
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("codeseekho_user");
      localStorage.removeItem("codeseekho_username");
      window.location.href = "../index.html";
    });
  }

  // Get student name from localStorage
  const username = localStorage.getItem("codeseekho_username") || "Student";
  certificatesData.forEach((cert) => {
    cert.studentName = username;
  });
}

// ====================================
// Load Certificates
// ====================================
function loadCertificates(filter = "all") {
  const grid = document.getElementById("certificatesGrid");
  const emptyState = document.getElementById("emptyState");

  let filteredCerts = [...certificatesData];

  // Apply filter
  if (filter === "recent") {
    filteredCerts.sort(
      (a, b) => new Date(b.completionDate) - new Date(a.completionDate),
    );
    filteredCerts = filteredCerts.slice(0, 3);
  } else if (filter === "popular") {
    filteredCerts = filteredCerts.filter((c) => c.level === "Beginner");
  }

  if (filteredCerts.length === 0) {
    grid.innerHTML = "";
    emptyState.classList.add("show");
    return;
  }

  emptyState.classList.remove("show");

  grid.innerHTML = filteredCerts
    .map(
      (cert) => `
        <div class="certificate-card" data-cert-id="${cert.id}">
            <div class="cert-card-preview" style="background: ${cert.gradient};">
                <div class="cert-card-icon">
                    <i class="fas fa-award"></i>
                </div>
            </div>
            <div class="cert-card-body">
                <h3 class="cert-card-title">${cert.courseName}</h3>
                <p class="cert-card-course">${cert.category}</p>
                <div class="cert-card-meta">
                    <div class="cert-meta-item">
                        <i class="fas fa-calendar"></i>
                        <span>${cert.completionDate}</span>
                    </div>
                    <div class="cert-meta-item">
                        <i class="fas fa-signal"></i>
                        <span>${cert.level}</span>
                    </div>
                </div>
                <div class="cert-card-actions">
                    <button class="cert-action-btn primary btn-view" data-cert-id="${cert.id}">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="cert-action-btn btn-download" data-cert-id="${cert.id}">
                        <i class="fas fa-download"></i> Download
                    </button>
                    <button class="cert-action-btn btn-share" data-cert-id="${cert.id}">
                        <i class="fas fa-share"></i> Share
                    </button>
                </div>
            </div>
        </div>
    `,
    )
    .join("");

  // Add event listeners to all certificate cards and buttons
  setupCertificateEventListeners();
}

// ====================================
// Update Statistics
// ====================================
function updateStats() {
  const totalCerts = certificatesData.length;
  const totalCourses = new Set(certificatesData.map((c) => c.courseName)).size;

  document.getElementById("totalCerts").textContent = totalCerts;
  document.getElementById("completedCourses").textContent = totalCourses;
}

// ====================================
// Setup Event Listeners for Certificate Cards
// ====================================
function setupCertificateEventListeners() {
  // View buttons
  document.querySelectorAll(".btn-view").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const certId = this.getAttribute("data-cert-id");
      openCertificateModal(certId);
    });
  });

  // Download buttons
  document.querySelectorAll(".btn-download").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const certId = this.getAttribute("data-cert-id");
      downloadCertificateById(certId);
    });
  });

  // Share buttons
  document.querySelectorAll(".btn-share").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const certId = this.getAttribute("data-cert-id");
      shareCertificateById(certId);
    });
  });

  // Certificate cards (click anywhere to view)
  document.querySelectorAll(".certificate-card").forEach((card) => {
    card.addEventListener("click", function () {
      const certId = this.getAttribute("data-cert-id");
      openCertificateModal(certId);
    });
  });
}

// ====================================
// Filter Functionality
// ====================================
function initializeFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const filter = this.dataset.filter;
      loadCertificates(filter);
    });
  });
}

// ====================================
// Search Functionality
// ====================================
function initializeSearch() {
  const searchInput = document.getElementById("certSearch");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const query = this.value.toLowerCase();
      const cards = document.querySelectorAll(".certificate-card");

      cards.forEach((card) => {
        const title = card
          .querySelector(".cert-card-title")
          .textContent.toLowerCase();
        const course = card
          .querySelector(".cert-card-course")
          .textContent.toLowerCase();

        if (title.includes(query) || course.includes(query)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  }
}

// ====================================
// Certificate Modal
// ====================================
function openCertificateModal(certId) {
  const cert = certificatesData.find((c) => c.id === certId);
  if (!cert) return;

  currentCertificate = cert;

  // Update certificate content
  const certNameEl = document.getElementById("certName");
  const certCourseEl = document.getElementById("certCourse");
  const certDateEl = document.getElementById("certDate");
  const certIdEl = document.getElementById("certId");

  if (certNameEl) certNameEl.textContent = cert.studentName;
  if (certCourseEl) certCourseEl.textContent = `"${cert.courseName}"`;
  if (certDateEl) certDateEl.textContent = cert.completionDate;
  if (certIdEl) certIdEl.textContent = cert.id;

  // Update gradient - not needed for new design
  // const certPreview = document.querySelector(".certificate-border");
  // if (certPreview) {
  //   certPreview.style.borderImage = `${cert.gradient} 1`;
  // }

  // Show modal
  const modal = document.getElementById("certificateModal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeCertificateModal() {
  const modal = document.getElementById("certificateModal");
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
  currentCertificate = null;
}

// ====================================
// Download Certificate as PDF
// ====================================
function downloadCertificate() {
  if (!currentCertificate) return;

  const certificateContainer = document.getElementById("certificateContainer");

  // Show notification immediately
  showNotification("Generating PDF...", "info");

  // Use html2canvas to capture the certificate
  html2canvas(certificateContainer, {
    scale: 2,
    backgroundColor: "#0f2847",
    logging: false,
  })
    .then((canvas) => {
      // Convert canvas to PDF using jsPDF
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jspdf.jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`Certificate-${currentCertificate.id}.pdf`);

      showNotification("Certificate downloaded successfully!", "success");
    })
    .catch((error) => {
      console.error("Error generating PDF:", error);
      showNotification("Error generating PDF. Please try again.", "error");
    });
}

function downloadCertificateById(certId) {
  openCertificateModal(certId);
  setTimeout(() => downloadCertificate(), 500);
}

// ====================================
// Share Certificate
// ====================================
function shareCertificate() {
  const modal = document.getElementById("shareModal");
  modal.classList.add("active");
}

function shareCertificateById(certId) {
  openCertificateModal(certId);
  setTimeout(() => shareCertificate(), 300);
}

function closeShareModal() {
  const modal = document.getElementById("shareModal");
  modal.classList.remove("active");
}

function shareOn(platform) {
  if (!currentCertificate) return;

  const text = `I just completed "${currentCertificate.courseName}" on TechKnowledge!`;
  const url = window.location.origin + "/verify/" + currentCertificate.id;

  let shareUrl;

  switch (platform) {
    case "linkedin":
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`;
      break;
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      break;
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      break;
  }

  if (shareUrl) {
    window.open(shareUrl, "_blank", "width=600,height=400");
    closeShareModal();
  }
}

function copyLink() {
  if (!currentCertificate) return;

  const url = window.location.origin + "/verify/" + currentCertificate.id;

  navigator.clipboard
    .writeText(url)
    .then(() => {
      showNotification("Certificate link copied to clipboard!", "success");
      closeShareModal();
    })
    .catch(() => {
      showNotification("Failed to copy link", "error");
    });
}

// ====================================
// Verify Certificate
// ====================================
function verifyCertificate() {
  if (!currentCertificate) return;

  showNotification(
    `Certificate ${currentCertificate.id} is verified and authentic!`,
    "success",
  );
}

// ====================================
// Notification System
// ====================================
function showNotification(message, type = "info") {
  // Remove existing notification
  const existing = document.querySelector(".notification");
  if (existing) existing.remove();

  // Create notification
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
        <span>${message}</span>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === "success" ? "#04AA6D" : type === "error" ? "#ff4444" : "#4299e1"};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;

  document.body.appendChild(notification);

  // Auto remove
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add animation styles
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
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
// Keyboard Shortcuts
// ====================================
document.addEventListener("keydown", function (e) {
  // ESC to close modals
  if (e.key === "Escape") {
    closeCertificateModal();
    closeShareModal();
  }

  // Ctrl/Cmd + D to download (when modal is open)
  if ((e.ctrlKey || e.metaKey) && e.key === "d" && currentCertificate) {
    e.preventDefault();
    downloadCertificate();
  }
});
