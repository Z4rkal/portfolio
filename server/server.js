const express = require('express');
const morgan = require('morgan');
const { json, urlencoded } = require('body-parser');
const mail = require('@sendgrid/mail');

if (process.env.SNAPGRID_API_KEY != undefined)
    mail.setApiKey(process.env.SNAPGRID_API_KEY);
else
    mail.setApiKey(require('./sendKey'));


const myEmail = process.env.MY_EMAIL != undefined ? process.env.MY_EMAIL : require('./email');

const app = express();

app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('./public'));

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

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.post('/thanks', (req, res) => {
    handleEmail(req.body);

    res.render('thanks', { contact: req.body })
});

app.get('*', (req, res) => {
    const data = {
        person: {
            firstName: 'Olivia',
            lastName: 'Fischer',
        }
    }

    res.render('index', data);
});

module.exports = app;