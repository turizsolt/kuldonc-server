const gcm = require("node-gcm");
const gcmApiKey = require("./config");

const sender = new gcm.Sender(gcmApiKey);

const sendNotification = (regTokens, message) => {
    var message = new gcm.Message();
    message.addNotification({
        "title": "Zsiri say's",
        "body": message,
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

exports = sendNotification;
