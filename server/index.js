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