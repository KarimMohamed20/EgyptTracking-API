const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs")
const User = require("../../model/User")
const jwt = require("jsonwebtoken")
module.exports = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const { fullName, email, password, accountType } = req.body;
    try {
        let user = await User.findOne({
            email
        });
        if (user) {
            return res.status(400).json({
                msg: "User Already Exists"
            });
        }

        if (accountType != "Student" && accountType != 'Driver') {
            return res.status(500).json({
                msg: "Please type a valid accountType"
            })
        }

        user = new User({
            fullName,
            email,
            password,
            accountType
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.PASSPORT_SECRET_KEY,
            {
                expiresIn: 31536000
            },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    token,user
                });
            }
        );
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving");
    }
}