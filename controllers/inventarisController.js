const Inventaris = require("../models/inventarisModel")

// Create and Save a new Customer
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        })
    }
    
    const invetaris1 = new Inventaris({
        kode: req.body.kode,
        name: req.body.name,
        type: req.body.type
    })
    
    Inventaris.create(invetaris1, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Inventaris."
            })
        else res.json(data)
    })
}

exports.findOne = (req, res) => {
    let id = req.params.inventarisId

    Inventaris.findById(id, (err,data) => {
        if(err)
            res.status(500).send({
                message:
                err.message || `Some error occurred while select the Inventaris By id ${id}`
            })
        else res.json(data)
    })
}

exports.findAll = (req, res) => {
    Inventaris.getAll((err, data) => {
        if(err){
            res.status(500).send({
                message:
                err.message || "Some error occurred while select the Inventaris."
            })
        }else{
            res.json(data)
        }
    })
}

exports.update = (req, res) => {

    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    let id = req.params.inventarisId

    Inventaris.updateById(id, req.body, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found inventaris with id ${id}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating inventaris with id " + id
              });
            }
        } 
        else res.json(data)

    })
}


exports.delete = (req, res) => {

    let id = req.params.inventarisId
    Inventaris.removeById(id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found inventaris with id ${id}.`
              })
            } else {
              res.status(500).send({
                message: "Could not delete inventaris with id " + id
              })
            }
        } else res.json({ message: `inventaris was deleted successfully!` })
    })

}

exports.invenType = (req, res) => {
    let type = req.params.type
    Inventaris.selectType(type, (err,data) => {
        if(err)
            res.send({
                message:err
            })
        else
            res.json(data)
    })
}