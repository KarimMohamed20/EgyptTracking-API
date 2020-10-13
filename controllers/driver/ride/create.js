const Ride = require("../../../model/Ride")
const User = require("../../../model/User")
const { validationResult } = require("express-validator");

module.exports = async function (req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id).select('-password')
    console.log(user)
    if (user != null) {
        var ride = req.body;
        ride.driver = {
            id: user.id,
            fullName: user.fullName
        };
        console.log(ride)
        /** Save Ride */
        await Ride(ride).save();

        // Send Respone
        res.json(ride);
    } else if (user.accountType == 'Student') {
        res.status(401).json({ message: "You can't create ride with a student account" });
    } else {
        res.status(401).json({ message: "Error in Fetching user" });
    }

}