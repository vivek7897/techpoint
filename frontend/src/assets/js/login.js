function togglePassword() {
  const pass = document.getElementById("password");
  const icon = document.querySelector(".toggle");

  if (pass.type === "password") {
    pass.type = "text";
    icon.textContent = "🙈";
  } else {
    pass.type = "password";
    icon.textContent = "👁";
  }
}
