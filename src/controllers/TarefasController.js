const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//carregando o model

require("../models/tarefas");
const Tarefas = mongoose.model("tarefas");

//abre e carrega as informaçoes de tarefas no formulario tarefas
router.get('/tarefas', (req, res) =>{
    Tarefas.find().lean().then((tarefas) => {
        res.render("admin/tarefas/tarefas", {tarefas: tarefas});
    });
});


router.get('/tarefas/add', (req,res) => {
    res.render("admin/tarefas/addtarefas");
});


router.post('/tarefas/nova', (req,res) => {
    var tarefas = new Tarefas();
    tarefas.nome = req.body.nome;
    tarefas.descricao = req.body.descricao;
    tarefas.save().then(() => {
        res.redirect("/rota_tarefas/tarefas");
    }).catch((erro) => {
        res.send('Houve um erro: '+ erro);
    });
});

router.get('/editar_tarefa/:id', (req,res) => {
    Tarefas.findOne({_id:req.params.id}).lean().then((tarefas) => {
        res.render("admin/tarefas/edittarefas", {tarefa: tarefas});
    });
});

router.post('/tarefas/editar_tarefas', (req,res) => {
    Tarefas.updateOne({_id:req.body._id},
        {$set:{nome:req.body.nome, descricao:req.body.descricao}}
    ).then(() => {
        res.redirect("/rota_tarefas/tarefas");
    });
});


router.get('/deletar_tarefas/:id',(req,res) => {
    Tarefas.deleteMany({_id:req.params.id}).then(() => {
        res.redirect("/rota_tarefas/tarefas");
    });
});

module.exports = router;