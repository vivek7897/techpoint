// Techknowldge Registration JavaScript
// Handles user registration, validation, and account creation

function closeModal() {
  window.location.href = "../index.html";
}

function togglePassword(id, icon) {
  const input = document.getElementById(id);

  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  }
}

// Show notification message
function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.className = `notification ${type} show`;

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

// Validate email format
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate password strength
function validatePassword(password) {
  // At least 6 characters, contains letter and number
  if (password.length < 6) {
    return {
      valid: false,
      message: "Password must be at least 6 characters long",
    };
  }
  if (!/[a-zA-Z]/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one letter",
    };
  }
  if (!/[0-9]/.test(password)) {
    return {
      valid: false,
      message: "Password must contain at least one number",
    };
  }
  return { valid: true, message: "" };
}

// Check if user already exists
function checkUserExists(email) {
  const users = JSON.parse(localStorage.getItem("codeseekho_users") || "[]");
  return users.some((user) => user.email.toLowerCase() === email.toLowerCase());
}

// Handle registration form submission
function handleRegister(event) {
  event.preventDefault();

  // Get form values
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const termsAccepted = document.getElementById("termsCheckbox").checked;

  // Validation
  if (!fullName) {
    showNotification("Please enter your full name", "error");
    return;
  }

  if (!validateEmail(email)) {
    showNotification("Please enter a valid email address", "error");
    return;
  }

  if (checkUserExists(email)) {
    showNotification(
      "An account with this email already exists. Please login.",
      "error",
    );
    return;
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.valid) {
    showNotification(passwordValidation.message, "error");
    return;
  }

  if (password !== confirmPassword) {
    showNotification("Passwords do not match", "error");
    return;
  }

  if (!termsAccepted) {
    showNotification("Please accept the Terms & Conditions", "error");
    return;
  }

  // Create user account
  const username = fullName.split(" ")[0]; // Use first name as username
  const userData = {
    fullName: fullName,
    username: username,
    email: email,
    password: password, // In production, this should be hashed
    registrationDate: new Date().toISOString(),
    completedCourses: [],
    progress: {},
    certificates: [],
  };

  // Save to users list
  const users = JSON.parse(localStorage.getItem("codeseekho_users") || "[]");
  users.push(userData);
  localStorage.setItem("codeseekho_users", JSON.stringify(users));

  // Auto-login the user
  const loginData = {
    email: email,
    username: username,
    fullName: fullName,
    loginTime: new Date().toISOString(),
  };
  localStorage.setItem("codeseekho_user", JSON.stringify(loginData));

  // Show success message
  showNotification(`Welcome to Techknowldge, ${username}! 🎉`, "success");

  // Redirect to home page
  setTimeout(() => {
    window.location.href = "../index.html";
  }, 2000);
}

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
  // Check if user is already logged in
  const currentUser = localStorage.getItem("codeseekho_user");
  if (currentUser) {
    const userData = JSON.parse(currentUser);
    showNotification(
      `You're already logged in as ${userData.username}`,
      "info",
    );
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 1500);
  }

  // Focus on first input
  const firstInput = document.getElementById("fullName");
  if (firstInput) {
    firstInput.focus();
  }
});
