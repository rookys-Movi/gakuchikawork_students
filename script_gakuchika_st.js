// Initialize Animate On Scroll (AOS)
AOS.init({
    duration: 800, // animation duration in milliseconds
    once: true,    // whether animation should happen only once - while scrolling down
});

// Smooth scroll to an element by its ID
function scrollToId(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
}

// Header Scroll function for logo
function scrollToTop(id){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('inquiryForm');
    const submitButton = document.getElementById('submitButton');
    
    // Handle the form submission process
    form.addEventListener('submit', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();
        
        // Disable the button and show a "sending" message
        submitButton.disabled = true;
        submitButton.textContent = '送信中...';

        const formData = new FormData(form);
        const dataObject = {};
        formData.forEach((value, key) => {
            dataObject[key] = value;
        });

        // This payload is simplified for student registration.
        // It matches the hidden fields in the new student form.
        const payload = {
            landingPageID: dataObject.landingPageID,
            inquiryType: dataObject.inquiryType,
            fullName: dataObject.fullName,
            email: dataObject.email,
            message: dataObject.message || "", // Notes about skills
            // Empty fields to match the unified sheet structure
            furigana: "",
            companyName: "",
            departmentName: "",
            phoneNumber: "",
            detailType: "",
            secret: '8qZ$p#vT2@nK*wG7hB5!sF8aU'
        };

        const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbynCIIXhK10kfrJFbUMt7AAlVpQp5P0t8k34CgoHKJX_dKtxqorBliAlOKy5Hyjxmbz/exec";
        
        // Send the data using the Fetch API
        fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(payload)
        })
        .then(() => {
            // On success, redirect to the thank you page
            window.top.location.href = 'thankyou_gakuchika_st.html';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('送信に失敗しました。時間をおいて再度お試しください。');
            
            // Re-enable the submit button
            submitButton.disabled = false;
            submitButton.textContent = '登録してはじめる';
        });
    });
});
