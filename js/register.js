
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const successMessage = document.getElementById("successMessage");
    const errorMessage = document.getElementById("errorMessage");

    function checkPasswords() {
        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity("Passwords do not match.");
        } else {
            confirmPassword.setCustomValidity("");
        }
    }

    password.addEventListener("input", checkPasswords);
    confirmPassword.addEventListener("input", checkPasswords);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        checkPasswords();

        successMessage.classList.add("d-none");
        errorMessage.classList.add("d-none");

        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            errorMessage.classList.remove("d-none");
            return;
        }

        form.classList.remove("was-validated");
        errorMessage.classList.add("d-none");
        successMessage.classList.remove("d-none");
        successMessage.textContent =
            "Registration successful! Welcome to Moon & Movies!";
    });

    form.addEventListener("reset", function () {
        setTimeout(function () {
            form.classList.remove("was-validated");
            successMessage.classList.add("d-none");
            errorMessage.classList.add("d-none");
            confirmPassword.setCustomValidity("");
        }, 0);
    });
});
