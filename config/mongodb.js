


// CRUD create read update delete

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://Manu:QZ5bsCkNGawvCOVa@cluster0-shard-00-00.sme1p.mongodb.net:27017,cluster0-shard-00-01.sme1p.mongodb.net:27017,cluster0-shard-00-02.sme1p.mongodb.net:27017/?ssl=true&replicaSet=atlas-og82nz-shard-0&authSource=admin&retryWrites=true&w=majority'
const databaseName = 'Humaps'
let db
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        console.log('hvhg',error)
        return console.log('Unable to connect to database!')
    }

	db = client.db(databaseName)
    module.exports.db=db
})

