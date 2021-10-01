const express = require('express');
const router = express.Router();

const configs = require('../util/config')
const redis = require('../redis')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (req, res) => {
  let result = await redis.getAsync('added_todos')
  if (result == null) result = 0
  const endresult = {"added_todos": result}
  res.json(endresult)
})

module.exports = router;
