const router = require('express').Router();
const { celebrate } = require('celebrate');

const { getUserData, updUserData } = require('../controllers/users');
const { updUserSchema } = require('../celebrateValidation/celebrateSchems');

router.get('/me', getUserData);
router.patch('/me', celebrate(updUserSchema), updUserData);

module.exports = router;
