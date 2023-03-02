const express = require('express');
const bodyParser = require('body-parser');
const cors =  require('cors');
const morgan = require('morgan');

// instanciando o prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// aqui vai ser importado as rotas

// instanciando o express
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (res, req) => {
    res.send('Hello World!')
})

// rotas aqui

const port =  process.env.PORT || 3002;

app.listen(port, () => {
    console.log('Prisma API server listening on port 3002');
});