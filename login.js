document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('authForm');
    const logoutBtn = document.getElementById('logoutBtn');

    // Authentication & Decision Logic
    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const u = document.getElementById('user').value;
            const p = document.getElementById('pass').value;

            // Decision Logic: Identify user and grant access
            if(u === "sreya" && p === "Aurora123") {
                sessionStorage.setItem("pivoted", "true");
                window.location.href = "landing.html";
            } else {
                alert("Login Error: Please use 'sreya' and 'Aurora123'");
            }
        });
    }

    // Logout handling
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem("pivoted");
            window.location.href = "login.html";
        });
    }

    // Security Gate for Dashboard access
    if (window.location.pathname.includes('index.html')) {
        if (sessionStorage.getItem("pivoted") !== "true") {
            window.location.href = "login.html";
        }
    }
});