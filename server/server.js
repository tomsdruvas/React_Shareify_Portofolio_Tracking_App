const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const createRouter = require('./helpers/create_router.js')
const cors = require('cors');
const path = require("path")
const dotenv = require("dotenv")

dotenv.config()

const URI = process.env.MONGODB_URI

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {res.send("Hello from the server side")})

MongoClient.connect(URI, { useUnifiedTopology: true })
  .then((client) => {
    const db = client.db('SharesApp');
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


app.use(express.static(path.join(__dirname, "client", "build")))


// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

app.listen(process.env.PORT || 5000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});