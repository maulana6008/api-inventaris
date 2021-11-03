const { response } = require('express')
const jwt = require('jsonwebtoken')
const dbConfig = require('./db-config')
const hashMd5 = require('md5')


exports.logins = (req, res) => {
    
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        })
    }
    let username = req.body.username
    let password = hashMd5(req.body.password)
    dbConfig.query("SELECT * FROM user WHERE username= ? and password = ?",
    [username, password],
    (err, data) => {
        if(err)
            res.status(500).send({
                message: err
            })
        else
          if(data.length){
            delete data[0].password
            
            const saveData = {
                id:data[0].id,
                username:data[0].username,
                foto_profil:data[0].foto_profil,
                nama:data[0].nama
            }

            let token = jwt.sign(saveData, 'jwtsecret', { // melakukan generate token di jwt
                algorithm: 'HS256'
            });

            res.json({token:token, data:saveData})
          }else{
            res.json({kind:'not_found'})
          }
          
    })

}

exports.isAuthenticated = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers.authorization; // mengambil token di antara request
    if(token){ //jika ada token
      jwt.verify(token, 'jwtsecret', function(err, decoded){ //jwt melakukan verify
        if (err) { // apa bila ada error
          res.json({message: 'Failed to authenticate token'}); // jwt melakukan respon
        }else { // apa bila tidak error
          req.decoded = decoded; // menyimpan decoded ke req.decoded
          next(); //melajutkan proses
        }
      });
    }else { // apa bila tidak ada token
      return res.status(403).send({message: 'No token provided.'}); // melkukan respon kalau token tidak ada
    }
}

