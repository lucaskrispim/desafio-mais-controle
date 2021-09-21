express = require('express');

const router = express.Router();

const startedAt = Date.now();

router.get('/status', (req, res) => res.json({
  env: 'Estamos no ar!',
  uptime: Date.now() - startedAt,
}));
/*
router.use('/user', require('./user'));
router.use('/position', require('./position'));
router.use('/truck', require('./truck'));
*/
router.use('/obra',require('./obra'));
router.use('/despesa',require('./despesa'));

module.exports = router;