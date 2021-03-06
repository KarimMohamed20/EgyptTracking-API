const { check } = require("express-validator");
const router = require("express").Router();
const auth = require("../middleware/auth");
const create = require('../controllers/driver/ride/create')
const start = require('../controllers/driver/ride/start')
const get = require('../controllers/driver/ride/get')
const studentGet = require('../controllers/user/ride/get')
const addStudent = require('../controllers/driver/ride/addStudent')
const arrive = require('../controllers/driver/ride/arrive')

/**
 * @method - POST
 * @description - Create Ride
 * @param - /ride/create
 */

router.post("/create", [
  check("rideName", 'Please enter your ride name').exists(),
  check("started", 'Please enter is your ride started or not').isBoolean(),
  check("helperName", 'Please enter your helper name').exists(),
], auth, create);


/**
 * @method - PUT
 * @description - Start Ride
 * @param - /ride/start?rideId=123
 */
router.put("/start", auth, start);


/**
 * @method - PUT
 * @description - Add Student
 * @param - /ride/addStudent?rideId=123&studentId=321
 */
router.put("/addStudent", auth, addStudent);


/**
 * @method - GET
 * @description - Get Rides
 * @param - /ride/get
 */
router.get("/get", auth, get);

router.get("/student/get", auth, studentGet);


router.put("/arrive", auth, arrive);
module.exports = router;
