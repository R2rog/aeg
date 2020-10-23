express = require('express');

let configViewEngine = (app) =>{
    app.use(express.static("./src/public"));
    app.set("view engine", "hanldebars");
    app.set("views", "./src/views");
};

module.exports = configViewEngine;
