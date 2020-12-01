// const express = require('express')
// const lastName= require('./src/app')
// const app = express()
// const port = 8000

// var requestTime = function (req, res, next) {
//     console.log("hey")
//     next()
//   }




// app.post('/hello/:userId', (req, res) => {
//    console.log(req, "hey") 
//   res.sendStatus(201)
// })
// app.get('/hello/:userId', requestTime, (req, res) => {
//  //   console.log(req, "hey");
//    var requestor_id= parseInt(req.params.userId) 
//    var responseText = 'Hello! '+ lastName +'<br>'
//    responseText += '<small>Requested at: ' + requestor_id+  '</small>'
//    res.send(responseText)
//    res.sendStatus(200)
//  })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })


const path= require('path')
const hbs=require('hbs')
const express=require('express')
const app=express()



const pathvar=path.join(__dirname,'/home/nineleaps/Desktop/express-learning/public')
console.log(pathvar)
const templatesPath=path.join(__dirname, '/templates/views')
const partialPath=path.join(__dirname, '/templates/partials')

app.use(express.static(pathvar))
app.set('view engine', 'hbs')
app.set('views', templatesPath)
hbs.registerPartials(partialPath)

app.get('/about',(req, res)=>{
    res.render('about', {
        heading:'harsha'
    })
})
app.get('/weather', (req, res)=>{
    res.render('index', {
        
        heading:'Weather'
    })
})

app.get('*', (req,res)=>{
    res.render('404', {
        title:'page not found'
    })
})
const name='harsha'
module.exports=name;

app.listen(8000, ()=>{
    console.log('Server is up on port 8000')
})