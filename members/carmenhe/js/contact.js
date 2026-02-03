// LogRocket analytics set up
import LogRocket from 'logrocket';
LogRocket.init('ukfmeg/literallycreatessite');

let user = document.getElementById("name");
let email = document.getElementById("email");
let comment = document.getElementById("message");
let errorMsg = document.getElementById("errormsg");
let infoMsg = document.getElementById("infomsg");
let contactForm = document.getElementById("contact");
let submitBtn = document.getElementById("submit");
let form_errors = [];
let error_field = document.getElementById("field-errors");

// override default validation messages on invalid message
user.addEventListener("invalid", () => {
    if (user.validity.valueMissing) {
        user.setCustomValidity("A name is required.");
    } else if (user.validity.patternMismatch) {
        user.setCustomValidity("Name contains illegal characters");
    } else {
        user.setCustomValidity("");
        errorMsg.textContent = "None";
        errorMsg.style.visibility = 'hidden';
    }
});
user.addEventListener("input", ()=> {
    // currently, error message is flashed as long as there is an illegal character for every change to the input, regardless of what the user actually put
    // what I want: only to flash error message when 
    if (user.validity.patternMismatch) {
        flashWarning();
    } else if (user.validity.valid && errorMsg.style.visibility == 'visible') {
        errorMsg.textContent = "None";
        errorMsg.style.visibility = 'hidden';
    } else {
        user.setCustomValidity("");
    }
});

email.addEventListener("invalid", () => {
    if (email.validity.valueMissing) {
        email.setCustomValidity("An email address is required.");
    } else if (email.validity.typeMismatch) {
        email.setCustomValidity("Please enter a valid email address.");
    } else if (email.validity.patternMismatch) {
        email.setCustomValidity("Email address contains illegal characters.");
    } else {
        email.setCustomValidity("");
    }
});
// extend with custom constraint & illegal char warning
email.addEventListener("input", () => {
    // if (!(email.value.endsWith(".com")||email.value.endsWith(".net")||email.value.endsWith(".edu")||email.value.endsWith(".org")||email.value.endsWith(".io"))) {
    //     email.setCustomValidity("Please enter an email address from a valid domain (ie. com, net, org, edu, io).");
    // }
    if (email.validity.patternMismatch) {
        flashWarning();
    } else if (email.validity.valid && errorMsg.style.visibility == 'visible') {
        errorMsg.textContent = "None";
        errorMsg.style.visibility = 'hidden';
    } else {
        email.setCustomValidity("");
    }
});

// countdown textarea -- appear on page load
comment.addEventListener("invalid", () => {
    if (comment.validity.valueMissing) {
        comment.setCustomValidity("A comment is required.")
    } else if (comment.validity.tooLong) {
        comment.setCustomValidity("Comment content should not exceed 300 characters.");
    } else if (comment.validity.tooShort) {
        comment.setCustomValidity("Comment content should be a minimum of 10 characters.");
    } else {
        comment.setCustomValidity("");
    }
});
// update character counter
let charCounter = document.getElementById("charcounter");
let maxChar = comment.getAttribute('maxLength');

comment.addEventListener("input", function () {
    let currChars = this.value.length;
    charCounter.textContent = `${currChars}/${maxChar}`;
    if (maxChar - currChars <= 0) {
        charCounter.style.color = "red";
        charCounter.style.fontWeight = "600";
    } else if (maxChar - currChars <= 50) {
        charCounter.style.color = "orange";
        charCounter.style.fontWeight = "600";
    } else {
        charCounter.style.fontColor = "darkgray";
        charCounter.style.fontWeight = "300";
        comment.setCustomValidity("");
    }
});

// illegal character masking
function flashWarning() {
    errorMsg.style.visibility = 'visible';
    errorMsg.textContent = "Input contains illegal characters!";

    setTimeout(function() {
        errorMsg.style.visibility = 'hidden';
    }, 3000);
}

function showInfo() {
    infoMsg.style.visibility = 'visible';
    infoMsg.textContent = "Successfully sent!";

    setTimeout(function() {
        infoMsg.style.visibility = 'hidden';
        infoMsg.textContent = "None";
    }, 5000);
}

// capturing form field errors
class FieldError {
    static allowedFieldIds = new Set(["name","email", "message"]);
    static possibleErrors = new Set(["illegal character","missing value","insufficient input length","excessive input length","invalid input"])

    constructor(field, value, reason) {
        this.field = field;
        this.value = value;
        this.reason = reason;
    }
}

function validateForm() {
    let reason = "";
    if (!user.validity.valid) {
        if (user.validity.valueMissing) {
            reason = "Missing input";
        } else if (user.validity.patternMismatch) {
            reason = "Illegal character used"
        } else {
            reason = "Invalid name.";
        }
        form_errors.push(new FieldError(user.id, user.value, reason));
    }
    
    if (!email.validity.valid) {
        if (email.validity.valueMissing) {
            reason = "Missing input";
        } else if (email.validity.patternMismatch) {
            reason = "Illegal characters used."
        } else {
            reason = "Invalid email.";
        }
        form_errors.push(new FieldError(email.id, email.value, reason));
    }

    if (!comment.checkValidity()) {
        if (comment.validity.valueMissing) {
            reason = "Missing input";
        } else if (comment.validity.tooShort) {
            reason = "Insufficient content length."
        } else if (comment.validity.tooLong) {
            reason = "Content length exceeds limit."
        }
        form_errors.push(new FieldError(comment.id, comment.value.substring(15)+"...", reason));
    }
}
submit.addEventListener("click", () => {
    validateForm();
});

contactForm.addEventListener("submit", event => {
    event.preventDefault();
    error_field.value = JSON.stringify(form_errors);
    showInfo();
    // create user identification for LogRocket
    LogRocket.identify(user.value || 'ANONYMOUS_USER', {
        name: user.value || 'Anonymous',
        email: email.value || 'No email provided',
    });
    contactForm.submit();
    return;
})

