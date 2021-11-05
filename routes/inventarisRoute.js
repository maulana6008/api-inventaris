module.exports = app => {

    const Inventaris = require("../controllers/inventarisController.js")

    const Auth = require('../config/auth')

    app.use('/inventaris', Auth.isAuthenticated)

    app.post("/inventaris", Inventaris.create)

    app.get("/inventaris/:inventarisId", Inventaris.findOne)

    app.get("/inventaris", Inventaris.findAll)

    app.put("/inventaris/:inventarisId", Inventaris.update)

    app.delete("/inventaris/:inventarisId", Inventaris.delete)

    app.get("/inventaris/kode", Inventaris.invenKode)
    
  };
  