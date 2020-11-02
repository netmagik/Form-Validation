const usernameEl = document.querySelector('#username');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#confirm-password');

const form = document.querySelector('#signup')

// Utility Functions

// Is USERNAME valid?
const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;

// Is the email valid?
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
// Is the password strong?
const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
}

// Display ERROR message function
const showError = (input, message) => {
    // get the form field parent element (div)
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
}

// Display SUCCESS message function
const showSuccess = (input) => {
    // get the form field parent element (div)
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}

// Input validating functions

// Validate USERNAME
const checkUsername = () => {
    let valid = false;
    const min = 3,
        max = 25;
    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'Username cannot be blank');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Uername must be between ${min} and ${max} characters.`);
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
}

// Validate EMAIL
const checkEmail = () => {

    const email = emailEl.value.trim();
    let valid = false;

    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank')
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
}

// VAlidate PASSWORD
const checkPassword = () => {
    const password = passwordEl.value.trim();
    let valid = false;

    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank')
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Password must have at least 8 characters that include at least 1 lowercase character, 1 uppercase character, 1 number and 1 special character in (!#@$%^&*)');
    } else {
        showSuccess(passwordEl)
        valid = true;
    }
    return valid;
}

// Validate Confirm PASSWORD

const checkConfirmPassword = () => {
    const confirmPassword = confirmPasswordEl.value.trim();
    let valid = false;
    const password = passwordEl.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordEl, 'Confirm Password cannot be blank')
    } else if (confirmPassword !== password) {
        showError(confirmPasswordEl, 'Passwords don\'t match');
    } else {
        showSuccess(confirmPasswordEl)
        valid = true;
    }
    return valid;
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate forms

    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isUsernameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid;

    // submit to the server if the form is valid

    if (isFormValid) {
    }
});

// Debounce function
const debounce = (fn, delay = 500) => {
    let timeoutID;
    return (...args) => {
        // cancel previous timer
        if (timeoutID) {
            clearTimeout(timeoutID);
        }
    // setup a new timer
    timeoutID = setTimeout(() => {
        fn.apply(null, args)
        }, delay);
    }
}

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;
    }
}));