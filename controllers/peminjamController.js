const Peminjam = require('../models/peminjamModel');

let dateNow = new Date();

const months = [
    "Januari", 
    "Februari", 
    "Maret", 
    "April", 
    "Mei", 
    "Juni", 
    "Juli", 
    "Agustus", 
    "September", 
    "Oktober", 
    "November", 
    "Desember"
];

dateNow = `${dateNow.getDate()} ${months[dateNow.getMonth()]} ${dateNow.getFullYear()}`

exports.create = (req, res) => {

    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        })
    }
    const peminjam = new Peminjam({
        kode: req.body.kode,
        nama_barang: req.body.nama_barang,
        nama_peminjam: req.body.nama_peminjam,
        kelas: req.body.kelas,
        type: req.body.type,
        tgl_pinjam: dateNow,
        tgl_kembali: '',
        status: 'pinjam'
    })
    Peminjam.create(peminjam, (err, data) => {
        if(err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Peminjam."
            })
        else res.json(data)
    })

}

exports.findAll = (req, res) => {
    Peminjam.getAll((err, data) => {
        if(err)
            res.status(500).send({
                message: err.message || "Some error occurred while select the Peminjam."
            })
        else res.json(data)
    })
}

exports.findOne = (req, res) => {
    let id = req.params.peminjamId
    Peminjam.findById(id, (err, data) => {
        if(err)
            if(err.kind == 'not_found')
                res.send({
                    message: 'table peminjam with id='+id+' not found'
                })
            else 
                res.status(500).send({
                    message: err.message || "Some error occurred while select table peminjam by id = "+id
                })
        else res.json(data)
    })
}

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        })
    }
    let id = req.params.peminjamId
    Peminjam.updateById(id, req.body, (err, data) => {
        if(err)
            if(err.kind == 'not_found')
                res.send({
                    message: 'table peminjam with id='+id+' not found'
                })
            else
                res.status(500).send({
                    message: err.message || 'Some error occurred while update table peminjam with id = '+id
                })
        else res.json(data)
    })
}

exports.kembali = (req, res) => {
    let id = req.params.peminjamId
    Peminjam.returnGoods(id,dateNow, (err, data) => {
        if(err)
            if(err.kind == 'not_found')
                res.send({
                    message: 'table peminjam with id='+id+' not found'
                })
            else
                res.status(500).send({
                    message: err.message || 'Some error occurred while update table peminjam with id = '+id
                })
        else res.json({id:data.id, message:'Barang berhasil di kembalikan'})
    })
}

exports.delete = (req, res) => {
    let id = req.params.peminjamId
    Peminjam.removeBydId(id, (err,data) => {
        if(err)
            if(err.kind == 'not_found')
                res.send({
                    message: 'table peminjam with id='+id+' not found'
                })
            else
                res.status(500).send({
                    message: err.message || 'Some error occurred while delete table peminjam with id = '+id
                })
        else res.json({message:'Data berhasil di hapus'})
    })
}


exports.typeSelect = (req, res) => {

    let type = req.params.type;
    Peminjam.peminjamByType(type, (err,data) => {
        if(err){
            res.send({
                message:err
            })
        }
        res.json(data)
    })

}

exports.typeSelectOne = (req, res) => {

    let type = req.params.type
    let id = req.params.peminjamId

    Peminjam.peminjamSelectOne(id, type, (err, data) => {
        if(err){
            res.send({
                message:err
            })
        }
        res.json(data)
    })

}