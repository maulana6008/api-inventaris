const dbConfig = require('../config/db-config')

// constructor
const Peminjam = function(data){
    this.kode = data.kode,
    this.nama_barang = data.nama_barang,
    this.nama_peminjam = data.nama_peminjam,
    this.kelas = data.kelas,
    this.type = data.type,
    this.tgl_pinjam = data.tgl_pinjam,
    this.tgl_kembali = data.tgl_kembali,
    this.status = data.status
}

// insert data peminjam
Peminjam.create = (newPeminjam, result) => {
    dbConfig.query("INSERT INTO peminjam SET ?", newPeminjam, (err, res) => {
        if(err){
            result(err,null)
            return
        }
        result(null,{id : res.insertId, ...newPeminjam})
    })
}

Peminjam.getAll = (result) => {
    dbConfig.query("SELECT * FROM peminjam", (err, res) => {
        if(err){
            result(err,null)
            return
        }
        result(null,res)
    })
}

Peminjam.findById = (id, result) => {
    dbConfig.query(`SELECT * FROM peminjam WHERE id = ${id}`, (err, res) => {
        if(err){
            result(err, null)
            return
        }
        if(res.length){
            result(null, res[0])
        }
        result({kind: 'not_found'},null)
    })
}

Peminjam.updateById = (id, Preq, result) => {
    dbConfig.query(
        "UPDATE peminjam SET kode = ?, nama_barang = ?, nama_peminjam = ?, kelas = ?, type = ?, status = ? WHERE id = ?", 
        [Preq.kode, Preq.nama_barang, Preq.nama_peminjam, Preq.kelas, Preq.type, Preq.status, id],
        (err, res) => {
            if(err){
                result(err, null)
                return
            }
            if(res.affectedRows == 0){
                result({kind:'not_found'},null)
                return
            }
            result(null, {id:id, ...Preq})
        }
    )
}

Peminjam.returnGoods = (id,dateNow, result) => {
    dbConfig.query(`UPDATE peminjam SET status = ?, tgl_kembali = ? WHERE id = ?`,
    ['kembali',dateNow, id],
    (err, res) => {
        if(err){
            result(err, null)
            return
        }
        if(res.affectedRows == 0){
            result({kind: 'not_found'}, null)
            return
        }
        result(null, {id:id,...res})
    })
}

Peminjam.removeBydId = (id, result) => {
    dbConfig.query(`DELETE FROM peminjam WHERE id=${id}`, (err, res) => {
        if(err){
            result(err, null)
            return
        }
        if(res.affectedRows == 0){
            result({kind:'not_found'}, null)
            return
        }
        result(null, res)
    })
}


module.exports = Peminjam;
