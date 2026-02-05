// Contact Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Form elements
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const serviceInput = document.getElementById('service');
        const messageInput = document.getElementById('message');
        
        // Error display elements
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');
        
        // Validation functions
        function validateName() {
            const name = nameInput.value.trim();
            if (name === '') {
                showError(nameInput, nameError, 'Name is required');
                return false;
            } else if (name.length < 2) {
                showError(nameInput, nameError, 'Name must be at least 2 characters');
                return false;
            } else {
                showSuccess(nameInput, nameError);
                return true;
            }
        }
        
        function validateEmail() {
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email === '') {
                showError(emailInput, emailError, 'Email is required');
                return false;
            } else if (!emailRegex.test(email)) {
                showError(emailInput, emailError, 'Please enter a valid email address');
                return false;
            } else {
                showSuccess(emailInput, emailError);
                return true;
            }
        }
        
        function validateMessage() {
            const message = messageInput.value.trim();
            if (message === '') {
                showError(messageInput, messageError, 'Message is required');
                return false;
            } else if (message.length < 10) {
                showError(messageInput, messageError, 'Message must be at least 10 characters');
                return false;
            } else {
                showSuccess(messageInput, messageError);
                return true;
            }
        }
        
        function validatePhone() {
            const phone = phoneInput.value.trim();
            if (phone === '') return true; // Phone is optional
            
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(phone)) {
                showError(phoneInput, null, 'Please enter a valid phone number');
                return false;
            } else {
                showSuccess(phoneInput, null);
                return true;
            }
        }
        
        // Helper functions
        function showError(input, errorElement, message) {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
            
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.style.display = 'block';
            }
        }
        
        function showSuccess(input, errorElement) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        }
        
        // Real-time validation
        nameInput.addEventListener('blur', validateName);
        emailInput.addEventListener('blur', validateEmail);
        phoneInput.addEventListener('blur', validatePhone);
        messageInput.addEventListener('blur', validateMessage);
        
        // Form submission
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isPhoneValid = validatePhone();
            const isMessageValid = validateMessage();
            
            if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
                submitBtn.disabled = true;
                
                // Simulate API call (replace with actual API call)
                setTimeout(() => {
                    // Show success message
                    const successAlert = document.createElement('div');
                    successAlert.className = 'alert alert-success alert-dismissible fade show mt-3';
                    successAlert.innerHTML = `
                        <strong>Success!</strong> Your message has been sent. We'll get back to you soon.
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    `;
                    
                    contactForm.prepend(successAlert);
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Remove validation classes
                    const formInputs = contactForm.querySelectorAll('.form-control');
                    formInputs.forEach(input => {
                        input.classList.remove('is-valid');
                    });
                    
                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Scroll to success message
                    successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Auto-remove success message after 5 seconds
                    setTimeout(() => {
                        if (successAlert.parentNode) {
                            successAlert.remove();
                        }
                    }, 5000);
                    
                }, 1500);
            } else {
                // Scroll to first error
                const firstError = contactForm.querySelector('.is-invalid');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
            }
        });
    }
});