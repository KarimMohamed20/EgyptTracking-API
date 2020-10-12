const jwt = require("jsonwebtoken");

module.exports = function (token) {
    return new Promise(function (resolve, reject) {
        if (!token) return resolve('error');
        try {
            const decoded = jwt.verify(token, process.env.PASSPORT_SECRET_KEY);
            resolve(decoded.user.id)
        } catch (e) {
            resolve('error')
            console.log({ message: "Invalid Token" });
        }
    })
};
