const router = require('express').Router();

const apiRoutes = require('./api');
const homepageRoutes = require('./hompageRoutes');
const dashboardRoutes = require('./dashboard');

router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/', homepageRoutes);

module.exports = router;