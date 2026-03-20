let generatedOTP = "";

function sendOTP() {
  const email = document.getElementById("email").value;

  if (email === "") {
    alert("Enter email");
    return;
  }

  generatedOTP = Math.floor(1000 + Math.random() * 9000);

  alert("Your OTP is: " + generatedOTP);

  document.getElementById("emailStep").style.display = "none";
  document.getElementById("otpStep").style.display = "block";
}

function verifyOTP() {
  const userOTP = document.getElementById("otp").value;

  if (userOTP == generatedOTP) {
    alert("OTP Verified");

    document.getElementById("otpStep").style.display = "none";
    document.getElementById("resetStep").style.display = "block";
  } else {
    alert("Wrong OTP");
  }
}

function resetPassword() {
  const newPass = document.getElementById("newPassword").value;
  const confirmPass = document.getElementById("confirmPassword").value;

  if (newPass.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  if (newPass !== confirmPass) {
    alert("Passwords do not match");
    return;
  }

  alert("Password reset successful! Please login with your new password.");

  window.location.href = "login.html";
}

// Toggle password visibility
function togglePassword(inputId, icon) {
  const input = document.getElementById(inputId);

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
