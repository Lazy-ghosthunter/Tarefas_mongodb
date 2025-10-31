const mongoose = require('mongoose');
mongoose.promise = global.Promise;
const url = "mongodb://127.0.1/tarefa";
mongoose.connect(url).then(() => {

    console.log("Mongo conectado..");
}).catch((err)=> {
    console.log("Erro ao conectar: "+err);
});