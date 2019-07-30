const express = require('express');
const morgan = require('morgan');
const { json, urlencoded } = require('body-parser');
const mail = require('@sendgrid/mail');

const app = express();

//Try to set up our mail function
try {
    mail.setApiKey(process.env.SENDGRID_API_KEY || JSON.stringify(process.env.SENDGRID_API_KEY) || require('./sendKey'));
    const myEmail = process.env.MY_EMAIL || JSON.stringify(process.env.SENDGRID_API_KEY) || require('./email');

    function handleEmail(body) {
        const msg = {
            to: myEmail,
            from: body.email,
            subject: 'Contact Request',
            text: `${body.firstName} ${body.lastName} submitted a contact form.\n\nTheir email is ${body.email}`,
            html: `<strong>${body.firstName} ${body.lastName} submitted a contact form.\n\nTheir email is ${body.email}</strong>`,
        };

        mail.send(msg, false, (err, res) => {
            if (err) {
                console.log(err);
                console.log(`\n\n${JSON.stringify(err.response.body.errors)}`)
            }
        });
    }
    app.locals.noMail = false;
}
catch (error) {
    console.log(error);
    app.locals.noMail = true;
}

app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('./public'));

//Anything stored in the app.locals object gets passed to views as local variables when they're rendered
app.locals.author =
    {
        firstName: 'Olivia',
        lastName: 'Fischer',
        pronoun: ['she', 'her', 'hers'],
        gitLink: 'https://github.com/Z4rkal'
    };

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.post('/thanks', (req, res) => {
    if (!app.locals.noMail)
        handleEmail(req.body);

    res.render('thanks', { contact: req.body })
});

app.get('*', (req, res) => {
    res.render('index');
});

module.exports = app;