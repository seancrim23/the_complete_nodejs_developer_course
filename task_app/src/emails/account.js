//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
const sgMail = require('@sendgrid/mail');
 
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'sean.g.crim@gmail.com',
        subject: 'Welcome!',
        text: `Welcome to the page ${name}!`
    });
};

const sendGoodbyeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'sean.g.crim@gmail.com',
        subject: 'Goodbye!',
        text: `Goodbye ${name}! Hope your time on this site was enjoyable, may I ask why it was that you canceled your account? Thank you!`
    });
};

module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
};

/**
 * goal: pull jwt secret and db url into env
 * 
 * 1. create JWT_SECRET and MONGODB_URL
 * 2. setup values for each in dev env file
 * 3. swap out hardcoded values
 * 4. test
 */