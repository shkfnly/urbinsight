var express = require('express');

var router = express.Router();


router.post('/', function (req, res)  {
  //UNNECESSARY
  console.log(req.body);
  res.json({
    'msg': 'success!'
  });
});


module.exports = router;