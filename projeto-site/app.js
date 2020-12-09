process.env.NODE_ENV = 'production';

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var DadosRouter = require('./routes/Dados');
var empresaRouter = require('./routes/empresa');
var enderecoRouter = require('./routes/endereco');
var filialRouter = require('./routes/filial');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/Dados', DadosRouter);
app.use('/empresa', empresaRouter);
app.use('/endereco', enderecoRouter);
app.use('/filial', filialRouter);

module.exports = app;
