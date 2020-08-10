module.exports = {
    getInventorys: async (req, res) => {
        const db = req.app.get('db')
        db.get_inventorys().then(list => {
            res.status(200).send(list)
        }).catch(err => {
            res.status(500).send(err)
        })
    },
    getInventory: async (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        db.get_inventory(id).then(list => {
            res.status(200).send(list)
        }).catch(err => {
            res.status(500).send(err)
        })
    },
    addInventory: async (req, res) => {
        const db = req.app.get('db')
        const { name, price, img } = req.body
        db.add_inventory([name, price, img]).then(list => {
            res.status(200).send(list)
        }).catch(err => {
            res.status(500).send(err)
        })
    },
    updateInventory: async (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params
        const { name, price, img } = req.body
        db.update_inventory([id, name, price, img]).then(list => {
            res.status(200).send(list)
        }).catch(err => {
            res.status(500).send(err)
        })
    },
    deleteInventory: (req, res) => {
        const db = req.app.get('db')
        const { id } = req.params

        db.delete_inventory(id).then(list => {
            res.status(200).send(list)
        }).catch(err => {
            res.status(500).send(err)
        })

    }
}