function handleFormSubmit(event) {
    // Stop the default action.
    event.preventDefault();

    const data = new FormData(event.target);

    const conData = Object.fromEntries(data.entries());


    const emailData = {
        from: 'CodeX Bot <bot@codexeg.net>', // replace with your sending email address
        to: 'Kerolos Gad <kerolosxgad@gmail.com>', // replace with the email address you want to send to
        subject: 'Contact Form Submission',
        html: `<b>Full Name:</b> ${conData.fullname} <br> <b>E-mail:</b> ${conData.email} <br> <b>Message:</b><br>${conData.message}`
    };
    $.ajax({
        url: `https://api.eu.mailgun.net/v3/${domain}/messages`,
        type: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa('api:' + apiKey)
        },
        data: emailData,
        success: function () {
            $(".conForm").trigger("reset");
            document.querySelector('.conAlert').style.display = 'block';
            setTimeout(function () {
                document.querySelector('.conAlert').style.display = 'none';
            }, 5000);
        },
        error: function () {
            console.error("There was an error sending the email.");
        }
    });
}

const conForm = document.querySelector('.conForm');
conForm.addEventListener('submit', handleFormSubmit);
