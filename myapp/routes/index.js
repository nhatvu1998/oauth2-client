var express = require("express");
var router = express.Router();
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});


router.post("/get_app_info", function(req, res, next) {
  let redirect_uri = process.env.redirect_uri;
  let scope = process.env.scope;
  let client_id = process.env.client_id;
  let client_secret = process.env.client_secret;
  let data = []
  data ={redirect_uri, scope, client_id, client_secret};
  res.send(data);
});

module.exports = router;
