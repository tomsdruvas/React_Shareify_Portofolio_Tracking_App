const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const createRouter = require('./helpers/create_router.js')
const cors = require('cors');



app.use(express.json());
app.use(cors());

MongoClient.connect('mongodb://127.0.0.1:27017', { useUnifiedTopology: true })
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