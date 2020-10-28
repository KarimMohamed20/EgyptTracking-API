const axios = require('axios').default;

exports.sendMultipleNotifications = function (emails, data) {
    for (let i = 0; i < emails.length; i++) {
        var email = emails[i]
        await axios.post(
            "https://onesignal.com/api/v1/notifications",
            {
                app_id: env.ONESIGNAL_APP_ID,
                filters: [{ field: "email", key: email, value: email }],
                headings: { en: data.headers },
                contents: { en: data.body },
            },
            {
                headers: { Authorization: `Basic ${env.ONESIGNAL_API_KEY}` },
            }
        );
    }
}
exports.sendNotification = function (email, data) {
    await axios.post(
        "https://onesignal.com/api/v1/notifications",
        {
            app_id: env.ONESIGNAL_APP_ID,
            filters: [{ field: "email", key: email, value: email }],
            headings: { en: data.headers },
            contents: { en: data.body },
        },
        {
            headers: { Authorization: `Basic ${env.ONESIGNAL_API_KEY}` },
        }
    );

}