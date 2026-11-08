
// Registration Functionality
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("registerName").value;
        const email = document.getElementById("registerEmail").value;
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const message = document.getElementById("registerMessage");

        if (password !== confirmPassword) {
            message.textContent = "Passwords do not match!";
            message.style.color = "red";
            return;
        }

        let users = JSON.parse(localStorage.getItem("ecoUsers")) || [];

        const existingUser = users.find(function(user) {
            return user.email === email;
        });

        if (existingUser) {
            message.textContent = "Email already registered!";
            message.style.color = "red";
            return;
        }

        const newUser = {
            name: name,
            email: email,
            password: password
        };

        users.push(newUser);

        localStorage.setItem("ecoUsers", JSON.stringify(users));

        message.textContent = "Registration successful! Please login.";
        message.style.color = "green";

        registerForm.reset();
    });
}





// Login Functionality
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;
        const message = document.getElementById("loginMessage");

        let users = JSON.parse(localStorage.getItem("ecoUsers")) || [];

        const loggedInUser = users.find(function(user) {
            return user.email === email && user.password === password;
        });

        if (loggedInUser) {
            localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

            message.textContent = "Login successful! Welcome " + loggedInUser.name;
            message.style.color = "green";

            setTimeout(function() {
                window.location.href = "role-selection.html";
            }, 1000);

        } else {
            message.textContent = "Invalid email or password!";
            message.style.color = "red";
        }
    });
}





// Show Logged-in Username
const authLinks = document.getElementById("authLinks");
const userInfo = document.getElementById("userInfo");
const userName = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");

const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (currentUser && authLinks && userInfo) {
    authLinks.style.display = "none";
    userInfo.style.display = "flex";
    userName.textContent = "Welcome, " + currentUser.name;
}

// Logout Functionality
if (logoutBtn) {
    logoutBtn.addEventListener("click", function() {
        localStorage.removeItem("loggedInUser");
        window.location.href = "index.html";
    });
}




// Protect My Requests Page
const protectedPages = ["my-requests.html"];

const currentPage = window.location.pathname.split("/").pop();

if (protectedPages.includes(currentPage)) {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        alert("Please login first to access this page!");
        window.location.href = "login.html";
    }
}
