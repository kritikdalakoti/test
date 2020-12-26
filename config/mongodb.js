


// CRUD create read update delete

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
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

