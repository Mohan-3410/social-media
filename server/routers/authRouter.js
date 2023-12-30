const { loginController, signupController, refreshAccessTokenController } = require("../controllers/authController");


const router = require("express").Router();

router.post('/login', loginController)
router.post('/signup', signupController)
router.get('/refresh', refreshAccessTokenController)

module.exports = router