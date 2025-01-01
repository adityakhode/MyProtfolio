document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// Toggle menu for mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

const form = document.getElementById('myForm');

form.onsubmit = async function(event) {
    event.preventDefault();

    // Get the reCAPTCHA token
    const recaptchaResponse = grecaptcha.getResponse();

    if (recaptchaResponse === "") {
        alert("Please complete the reCAPTCHA");
        return;
    }

    // Create a new FormData object to include the reCAPTCHA token
    const formData = new FormData(form);

    // Append the reCAPTCHA token to the form data
    formData.append('recaptcha_token', recaptchaResponse);

    // Send the form data to the backend
    const submitResponse = await fetch(form.action, {
        method: 'POST',
        body: formData,
    });

    const submitData = await submitResponse.json();

    if (submitData.message === "Form submitted successfully!") {
        alert("Form submitted successfully!");
    } else {
        alert("There was an issue with form submission.");
    }
};
