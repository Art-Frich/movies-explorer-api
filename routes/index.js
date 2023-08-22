const router = require('express').Router();
const { celebrate } = require('celebrate');

const auth = require('../middlewares/auth');
const { createUser, login, logout } = require('../controllers/users');
const { handleOtherRouts } = require('../helpers/utils');
const { signinSchema, signupSchema } = require('../celebrateValidation/celebrateSchems');

router.post('/signin', celebrate(signinSchema), login);
router.post('/signup', celebrate(signupSchema), createUser);
router.post('/signout', auth, logout);
router.use('/users', auth, require('./users'));
router.use('/movies', auth, require('./movies'));

router.use(auth, handleOtherRouts);

module.exports = router;
