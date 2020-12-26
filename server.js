const express=require('express')
const bodyparser=require('body-parser')
require('./config/mongodb')
const cors=require('cors')
const helmet=require('helmet')
const app=express()
const cookieparser=require('cookie-parser')

// requiring all routes
const SubAdmin_Router=require('./app/routes/sub_admin')
const adminRouter=require('./app/routes/admin')


//  detting port value for the project 

app.set('port',process.env.PORT||3000)

app.use(express.json())  // for parsing the data from postman 
// for parsing the incoming body 
app.use(bodyparser.urlencoded({extended:true}))
app.use(cors())
app.use(helmet())
app.use(cookieparser())

// using all routes
app.use('/',SubAdmin_Router)
app.use('/',adminRouter)


app.listen(app.get('port'),(req,res)=>{
    console.log(`server is up !!` )
})






//  

