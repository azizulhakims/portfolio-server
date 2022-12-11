const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gyop3ad.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const portfolioCollection = client.db('portfolio').collection('portfolioData');

        app.get('/portfolio', async (req, res) => {
            const query = {}
            const cursor = portfolioCollection.find(query)
            const portfolio = await cursor.toArray();
            res.send(portfolio);
        })

    }

    finally {

    }


}

run().catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send('server running');
});




app.listen(port, () => {
    console.log(`Server running PORT no ${port}`);
})

