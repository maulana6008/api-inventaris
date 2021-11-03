module.exports = app => {

    const Auth = require("../config/auth");

    app.post('/login', Auth.logins)

  }
  