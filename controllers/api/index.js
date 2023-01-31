const router = require('express').Router();
const userRoutes = require('./userRoutes');
const petRoutes = require('./petRoutes');
const recordRoutes = require('./recordRoutes');

router.use('/user', userRoutes);
router.use('/pets', petRoutes);
router.use('/record', recordRoutes);

module.exports = router;
