require("dotenv").config();
express = require('express');
bodyParser = require('body-parser');
viewEngine = require('./config/viewEngine');
initWebRoutes = require('./routes/web');

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const path = require('path');
let app = express();

//config the view engine
viewEngine(app);

//config body-parser
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Creating an static folder
app.use(express.static(path.join(__dirname,'public')));
//int web Routes
initWebRoutes(app);

//Settingt the listening port
let port = process.env.PORT || 8080;

app.listen(port,() =>{
    console.log("App is running at port: "+port);
});
