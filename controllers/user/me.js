const User = require("../../model/User")

module.exports = async function (req, res) {
  try {
    //   request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id).select('-password')
    if (user == null) {
      res.status(401).json({ message: "Error in Fetching user" });
    } else {
      res.json(user);
    }
  } catch (e) {
    res.status(401).json({ message: "Error in Fetching user" });
  }
}