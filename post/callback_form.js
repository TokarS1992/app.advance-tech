
// Обработчик обратной связи
const express = require('express');
const router = express.Router();

const db = require('../lib/mongoose');
const callbackModel = require('../models/callback_form');

// WHO send message?
var API_SEND = 'rKuXQNUOQ6-FeAyqqTSt9g';
var MAIL_ADRESS = 'st.serega1992@mail.ru';
var MAIL_PASS = 'poloserg135';

const nodemailer  = require('nodemailer');

router.post('/',function(req,res,next){

    var form = req.body;

    var newCallback = new callbackModel({
        name: form.name,
        mail: form.email,
        number: form.phone
    })

    var transport = nodemailer.createTransport({
        service: "Mail.ru",
        port: 25,
        auth: {
            user: MAIL_ADRESS,
            pass: MAIL_PASS
        },
        debug: true
    });

    var params = {
        from: MAIL_ADRESS,
        to: "aybolitdoc@gmail.com",
        subject: "Сообщение от сайта advance-tech.herokuapp.com",
        text: 'Сообщение от сайта advance-tech.herokuapp.com',
        html: `
            <p>Контактные данные нового клиента</p>
            <ul>
                <li><span>Имя клиента: </span><span>` + newCallback.name + `</span></li>
                <li><span>E-mail клиента: </span><span>` + newCallback.email + `</span></li>
                <li><span>Телефон клиента: </span><span>` + newCallback.phone + `</span></li>
            </ul>
        `
    }

    transport.sendMail(params, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            db.collection('callback').insert(newCallback);
            console.log(data.messageId);
        }
    });

    res.redirect('/');
    res.end();
});

module.exports = router;

