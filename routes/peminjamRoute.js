module.exports = app => {

    const Peminjam = require("../controllers/peminjamController.js");
    const Auth = require('../config/auth')

    app.use('/peminjam', Auth.isAuthenticated)

    app.post('/peminjam', Peminjam.create)
    
    app.get('/peminjam', Peminjam.findAll)

    app.get('/peminjam/:peminjamId', Peminjam.findOne)

    app.put('/peminjam/:peminjamId', Peminjam.update)
    
    app.delete('/peminjam/:peminjamId', Peminjam.delete)
    
    app.get('/peminjam/type/:type', Peminjam.typeSelect)
    app.get('/peminjam/type/:type/:peminjamId', Peminjam.typeSelectOne)
    
    app.use('/kembali', Auth.isAuthenticated)
    app.get('/kembali/:peminjamId', Peminjam.kembali)
    
  };
  
