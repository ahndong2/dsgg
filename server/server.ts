import express, { Express } from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
// import {riotRoute, usersRouter} from './routes/index.js';
import {riotRoute} from './routes/riot.js'
import {usersRouter} from './routes/users.js';
const __dirname = path.resolve();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/api/riot', riotRoute);
app.use('/api/users',usersRouter);
app.listen(port);

// CONNECT TO MONGODB SERVER
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log("Connected to mongod server");
});
// 몽구스 연결
mongoose
  .connect(
    'mongodb+srv://ahndongjun2:password123!@dsgg.t74fhq6.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => console.log('MongoDB conected'))
  .catch((err:Error) => {
    console.log(err);
  });
  
// app.use( express.static( path.join(__dirname, 'build') ) );

// app.get('/', function(request, response){
//     response.sendFile( path.join(__dirname, 'build/index.html') )
// });
// app.get('*', function(request, response){
//     response.sendFile( path.join(__dirname, 'build/index.html') )
// });