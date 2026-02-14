const USER_CREDENTIALS = { username:"sreya", password:"Aurora123" };

// LOGIN LOGIC
const loginForm = document.getElementById("loginForm");
const loginContainer = document.getElementById("loginContainer");
const dashboardContainer = document.getElementById("dashboardContainer");
const logoutBtn = document.getElementById("logoutBtn");

if(loginForm) {
  loginForm.addEventListener("submit", function(e){
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if(username === USER_CREDENTIALS.username && password === USER_CREDENTIALS.password){
      // Save login in session storage
      sessionStorage.setItem("loggedIn", "true");
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid username or password");
    }
  });
}

// DASHBOARD LOGIC
if(logoutBtn) {
  logoutBtn.addEventListener("click", function(){
    sessionStorage.removeItem("loggedIn");
    window.location.href = "login.html";
  });
}

// Prevent dashboard access without login
if(dashboardContainer){
  if(sessionStorage.getItem("loggedIn") !== "true"){
    window.location.href = "login.html";
  }
}
