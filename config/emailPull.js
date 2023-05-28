import emailjs from '@emailjs/browser';

const sendEmail = async (email, name, to, message) => {
    // send email
    const response = await emailjs.send(process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID, process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID, {
        from_name: name,
        email_user: email,
        to_name: to,
        message: message
    }, process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY)

    return response;
}

export { sendEmail };