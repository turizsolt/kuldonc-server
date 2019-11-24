const gcm = require("node-gcm");
const gcmApiKey = require("./config");

const sender = new gcm.Sender(gcmApiKey);

const sendNotification = (regTokens, data) => {
    var message = new gcm.Message();
    message.addNotification({
        "title": data.name+" says",
        "body": data.text,
        "requireInteraction": "true",
        "icon": "logo192.png",
        "click_action": "https://zsirim-e75c6.firebaseapp.com/",
        "content-available": 1,
    });

    sender.send(message, { registrationTokens: regTokens }, function (err, response) {
        if (err) console.error("err:", err);
        else console.log(response);
    });
};

module.exports = sendNotification;
