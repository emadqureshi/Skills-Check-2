require('dotenv').config()
const express = require('express'),
    massive = require('massive'),
    ctrl = require('./controller'),
    app = express()

const { SERVER_PORT, CONNECTION_STRING } = process.env


app.use(express.json())

app.get('/api/inventory', ctrl.getInventorys)
app.get('/api/inventory/:id', ctrl.getInventory)
app.post('/api/inventory', ctrl.addInventory)
app.put('/api/inventory/:id', ctrl.updateInventory)
app.delete('/api/inventory/:id', ctrl.deleteInventory)


massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(dbObj => {
    app.set('db', dbObj)
    
})
    app.listen(SERVER_PORT, () => console.log(`Server running on port: ${SERVER_PORT}`))