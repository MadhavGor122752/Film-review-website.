// Function to toggle password visibility
function togglePassword(fieldId) {
    let passwordInput = document.getElementById(fieldId);
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

// Password validation function
function validatePassword(password) {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}$/;
    return passwordPattern.test(password);
}

// Email validation function
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Form validation for sign-up page
function validateSignupForm(event) {
    event.preventDefault(); // Prevent form submission for validation

    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    // Check if username, email, password, and confirm password fields are not empty
    if (username === "" || email === "" || password === "" || confirmPassword === "") {
        alert("Please fill in all the fields.");
        return false;
    }

    // Validate email format
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Validate password strength
    if (!validatePassword(password)) {
        alert("Password must be at least 8 characters long, contain at least one special character, one uppercase letter, and one lowercase letter.");
        return false;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match. Please ensure both passwords are the same.");
        return false;
    }

    // Store the credentials in localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    // If all validations pass, submit the form
    alert("Sign up successful!");
    document.getElementById('signupForm').submit();
}

// Form validation for login page
function validateLoginForm(event) {
    event.preventDefault(); // Prevent form submission for validation

    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Check if username and email match what was stored during sign-up
    let storedUsername = localStorage.getItem('username');
    let storedEmail = localStorage.getItem('email');
    let storedPassword = localStorage.getItem('password');

    if (username === "" || email === "" || password === "") {
        alert("Please fill in your username, email, and password.");
        return false;
    }

    // Validate email format
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Check if entered credentials match the stored ones
    if (username !== storedUsername || email !== storedEmail || password !== storedPassword) {
        alert("Incorrect username, email, or password. Please check your credentials.");
        return false;
    }

    alert("Login successful!");
    document.getElementById('loginForm').submit();
}

// Review form validation to ensure the review is not empty
function validateReviewForm(event) {
    event.preventDefault(); // Prevent form submission for validation

    let review = document.querySelector('textarea').value;

    if (review.trim() === "") {
        alert("Review cannot be empty.");
        return false;
    }

    alert("Review submitted successfully!");
    event.target.submit();  // Submit the review form
}

// Attach form validation to the sign-up form
let signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', validateSignupForm);
}

// Attach form validation to the login form
let loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', validateLoginForm);
}

// Attach review validation to review form if present
let reviewForm = document.querySelector('form[action="#"]');  // Adjust the selector if your form is different
if (reviewForm) {
    reviewForm.addEventListener('submit', validateReviewForm);
}
