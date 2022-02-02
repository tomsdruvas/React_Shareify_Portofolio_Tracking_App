const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const createRouter = require('./helpers/create_router.js')
const cors = require('cors');
const dotenv = require("dotenv")

dotenv.config()



app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {res.send("Hello from the server side")})

MongoClient.connect(process.env.MONGODB_URI, { useUnifiedTopology: true })
  .then((client) => {
    const db = client.db('sharesApp');
    const sharesCollection = db.collection('shares');
    const sharesRouter = createRouter(sharesCollection);
    app.use('/api/shares', sharesRouter);
    //second route
    const sharesDataCollection = db.collection('sharesData');
    const sharesDataRouter = createRouter(sharesDataCollection);
    app.use('/api/sharesData', sharesDataRouter);
  })
  .catch(console.err);

// app.listen(5000, function () {
//   console.log(`Listening on port ${ this.address().port }`);
// });

app.listen(process.env.PORT || 3000);