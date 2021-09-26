const router = require('express').Router();

const apiRoutes = require('./api');
const homepageRoutes = require('./hompageRoutes')

router.use('/api', apiRoutes);
router.use('/', homepageRoutes)

module.exports = router;