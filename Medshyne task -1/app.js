const express=require('express');
// const bodyparser=require('body-parser');
const bodyParser = require('body-parser');


const app = express();

const port = 3001;

app.use(bodyParser.json());

// app.use('/postdetails',userRoutes);

require('./routes/userRoutes')(app);

app.listen(port,()=> {
    console.log(`port is listening....http://localhost:${port}`);
});