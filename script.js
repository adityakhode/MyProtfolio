// Smooth scrolling
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

            const recaptchaResponse = grecaptcha.getResponse();

            if (recaptchaResponse === "") {
                alert("Please complete the reCAPTCHA");
                return;
            }

            // Send the reCAPTCHA token to the backend for verification
            const response = await fetch('/verify-recaptcha/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: recaptchaResponse })
            });

            const data = await response.json();

            if (data.message === "reCAPTCHA verified successfully!") {
                alert("reCAPTCHA verification successful!");
                // Submit the form or proceed with further actions
            } else {
                alert("reCAPTCHA verification failed");
            }
        };
