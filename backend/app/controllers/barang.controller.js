const { barangs } = require('../models');
const db = require('../models');
const Barang = db.barangs;
const Op = db.Sequelize.Op;

// Create and Save a new Barang
exports.create = (req, res) => {
    if (!req.body.nama || !req.body.stok || !req.body.harga) {
        res.status(500).send({
            message: 'Please fill all forms'
        });
        return;
    }

    const barangs = {
        nama: req.body.nama,
        harga: req.body.harga,
        stok: req.body.stok
    };

    Barang.create(barangs)
        .then(data => {
            res.send({ status: 'success', data: data });
        })
        .catch(error => {
            res.status(500).send({ status: error.message });
        });
};

// Retrieve all barang from the database.
exports.findAll = (req, res) => {
    const nama = req.query.nama;
    const condition = nama ? {
        nama: {
            [Op.like]: `%${nama}%`
        }
    } : null;

    Barang.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({ status: error.message });
        });
};

// Find a single Barang with an id
exports.findOne = (req, res) => {
    const id = req.params.id_barang;

    Barang.findOne({ where: { id: id } })
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.status(404).send({ status: error.message || 'Note not found' });
        })
};

// Update a Barang by the id in the request
exports.update = (req, res) => {
    const id = req.params.id_barang;

    Barang.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Barang was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Barang with id=${id}. Maybe Barang was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Barang with id=" + id
            });
        });
};

// Delete a Barang with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id_barang;

    Barang.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Barang was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Barang with id=${id}. Maybe Barang was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Barang with id=" + id
            });
        });
};