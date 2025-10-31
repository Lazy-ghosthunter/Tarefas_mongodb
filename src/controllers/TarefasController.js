const express = require('express');
const router = express.Router;
const mongoose = require('mongoose');

//carregando o model

require("../models/tarefas");
const Tarefas = mongoose.model("tarefas");

//abre e carrega as informaçoes de tarefas no formulario tarefas
router.get('/tarefas', (req, res) =>{
    Tarefas.find().lean()
})