
const togglePasswordIcons = document.querySelectorAll('.toggle-password');
togglePasswordIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const passwordField = icon.previousElementSibling;
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordField.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.querySelector('.login-btn');
    const loginForm = document.querySelector('.Login-form');
    const registerForm = document.querySelector('.Register-form');

    loginButton.addEventListener('click', function() {
        loginForm.classList.add('show'); // Move the login form into view
        registerForm.classList.add('hide');
        setTimeout(() => {
            registerForm.classList.add('hidden');
        }, 1000); // Adjust the delay time as needed
    });
});