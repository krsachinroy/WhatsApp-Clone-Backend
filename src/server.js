const express = require('express');
require('../db/conn')


const loginRouter = require('../routes/Login');
const messageRouter = require('../routes/Messages');
const addContactRoter = require('../routes/addContact');

const app = express();
const port = process.env.PORT || 8000;


app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
})
app.use('/login', loginRouter);
app.use('/messages', messageRouter);
app.use('/addContact', addContactRoter);

app.get('/', (req, res) => {
    res.send('Welcome');
})

app.listen(port, () => {
    console.log('Listining on port ' + port);
})