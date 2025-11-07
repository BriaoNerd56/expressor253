import dotenv from 'dotenv'

dotenv.config({ path: '/custom/path/to/.env' })
import express from 'express'

const app = express()

const port = process.env.PORT || 3000
app.use(express.json())

let meatData = []
let nextId = 1

//Add a new meat
app.post('/meats', (req, res) => {

    const {name, price} = req.body
    const newMeat = {id: nextId++, name, price}
    meatData.push(newMeat)
    res.status(201).send(newMeat)
})

//Get all meat
app.get('/meats', (req, res) => {
    res.status(200).send(meatData)
})

//Get meat with id
app.get('/meats/:id', (req, res) => {
    const meat = meatData.find(t => t.id === parseInt(req.params.id))
    if (!meat) {
        return res.status(404).send('Meat not found')
    }
    res.status(200).send(meat)
})

//Update meat
app.put('/meats/:id', (req, res) => {
    const meat = meatData.find(t => t.id === parseInt(req.params.id)) 

    if (!meat) {
        return res.status(404).send('Meat not found')
    }
    const {name, price} = req.body
    meat.name = name
    meat.price = price
    res.send(200).send(meat)
})

//Delete meat
app.delete('/meats/:id', (req, res) => {
    const index = meatData.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1) {
        return res.status(404).send('meat not found')
    }
    meatData.splice(index, 1)
    return res.status(204).send('Deleted')
})

app.listen(port, () => {
    console.log(`Server listening and running at port ${port}...`);
    
})
