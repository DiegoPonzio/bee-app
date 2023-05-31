import emailjs from '@emailjs/browser';

const sendEmailDeny = async (email, name, to, message, solName, date, pubImagen) => {
    // send email
    const response = await emailjs.send(process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID, process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_DENY_ID, {
        sol_name: solName,
        from_name: name,
        email_user: email,
        to_name: to,
        message: message,
        date: date,
        pub_imagen: pubImagen
    }, process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY)

    return response;
}

const sendEmailAccept = async (email, name, to, solName, date) => {
    // send email
    const response = await emailjs.send(process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID, process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_APPROVE_ID, {
        sol_name: solName,
        event_name: name,
        email_user: email,
        to_name: to,
        date: date,
    }, process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY)

    return response;
}

export { sendEmailDeny, sendEmailAccept };