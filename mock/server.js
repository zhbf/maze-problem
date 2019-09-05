const Mock = require('mockjs');

module.exports = function (app) {
  app.get('/api/index', function (rep, res) {
    res.json(Mock.mock({
      "error": 0,
      "data": {
        'list|1-10': [{
          "userId": "@id()",
          "userName": "@cname()",
          "date": "@date()",
          "avatar": "@image('200x200','red','#fff','avatar')",
          "description": "@paragraph()",
          "ip": "@ip()",
          "email": "@email()"
        }]
      }
    }))
  })
}
