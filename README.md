### Project Description:
This project is a simple node server that serves up a portfolio of sorts.

It has a short description of myself, some of my projects at [@SanDiegoCodeSchool](https://github.com/SanDiegoCodeSchool), and a contact page for getting in touch with me.

This project is deployed to [Heroku](https://of-portfolio.herokuapp.com/).

#### Setup:
If you'd like to use this as a template for your own portfolio, you can clone this project to your machine with:
`git clone git@github.com:Z4rkal/portfolio.git`

The project needs a [SendGrid](https://sendgrid.com/) API key, which you should store in a simple sendKey.js file in the server folder which exports the key as a string. You'll also need to either hardcode in your email or add an email.js in the server folder that exports your email address as a string.

To run the project, you'll need to run `npm install` to download the dependencies and then `npm start` to launch the server, which listens on port 3000.