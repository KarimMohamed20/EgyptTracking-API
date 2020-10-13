const { check } = require("express-validator");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const login = require('../controllers/user/login')
const register = require('../controllers/user/register')
const me = require('../controllers/user/me')

/**
 * @method - POST
 * @param - /register
 * @description - User Register
 */
router.post(
  "/register",
  [
    check("fullName", "Please enter a valid name").isLength({
      min: 2
    }),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    }),
  ],
  register
);


/**
 * @method - POST
 * @param - /login
 * @description - User Login
 */
router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  login
);

/**
 * @method - GET
 * @description - Get LoggedIn User
 * @param - /user/me
 */
router.get("/me", auth, me);


module.exports = router;
