const { contactUs } = require('../controller/form.controller');

const router = require('express').Router();

router.route("/send")
    .post(contactUs);

module.exports = router;    