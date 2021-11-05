const dbConfig = require('../config/db-config')

// constructor
const Inventaris = function(inventaris) {
    this.kode = inventaris.kode,
    this.name = inventaris.name,
    this.type = inventaris.type
}

// insert
Inventaris.create = (newInven, result) => {
  dbConfig.query("INSERT INTO inventaris SET ?", newInven, (err, res) => {
    if (err) {
      result(err, null)
      return
    }
    result(null, { id: res.insertId, ...newInven })
  })
}

// find by id
Inventaris.findById = (inventarisId, result) => {
  dbConfig.query(`SELECT * FROM inventaris WHERE id = ${inventarisId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

// select all
Inventaris.getAll = (result) => {
  dbConfig.query("SELECT * FROM inventaris", (err, res) => {
    if(err){
      result(err, null)
    }
    result(null, res)
  })
}

Inventaris.updateById = (id, inventarisReq, result) => {
  dbConfig.query(
    "UPDATE inventaris SET kode = ?, name = ? type = ? WHERE id = ?", 
    [inventarisReq.kode, inventarisReq.name,inventarisReq.type, id], 
    (err, res) => {
      if(err){
        result(err, null)
        return
      }
      
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null)
        return
      }

      result(null, { id: id, ...inventarisReq })

    }
  )
}

Inventaris.removeById = (id,result) => {
  dbConfig.query(`DELETE FROM inventaris WHERE id = ${id}`, (err, res) => {
    if(err){
      result(err, null)
      return
    }
    if (res.affectedRows == 0) {
      // not found inventaris with the id
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res)

  })
}

Inventaris.selectKode = (kode, result) => {
  dbConfig.query('SELECT * FROM inventaris WHERE kode = ?', [kode], (err, res) => {
    if(err){
      result(err,null)
      return;
    }
    if (res.affectedRows == 0) {
      // not found inventaris with the id
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res)
  })
}

module.exports = Inventaris
