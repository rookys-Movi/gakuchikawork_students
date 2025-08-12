function scrollToId(id) {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    document.addEventListener('DOMContentLoaded', function () {
        const form = document.getElementById('inquiryForm');
        const submitButton = document.getElementById('submitButton');
        
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            submitButton.disabled = true;
            submitButton.textContent = '送信中...';

            const formData = new FormData(form);
            const dataObject = {};
            formData.forEach((value, key) => { dataObject[key] = value; });

            // Add the secret token for validation
            dataObject.secret = '8qZ$p#vT2@nK*wG7hB5!sF8aU';

            const SCRIPT_URL = "<?= ScriptApp.getService().getUrl() ?>";

            fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(dataObject)
            })
            .then(() => {
                 // Redirect to the specific thank you page for students
                 window.top.location.href = SCRIPT_URL + '?page=thankyou_gakuchika_st';
            })
            .catch(error => {
                console.error('Error:', error);
                alert('送信に失敗しました。時間をおいて再度お試しください。');
                submitButton.disabled = false;
                submitButton.textContent = '登録してはじめる';
            });
        });
    });