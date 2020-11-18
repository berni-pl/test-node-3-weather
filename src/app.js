const express=require('express')
const path = require('path')
const hbs=require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const partialsPath = path.join(__dirname,'../templates/partials')
app.set('view engine', 'hbs')
app.set('views',path.join(__dirname,'../templates/views'))
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Berni'
    })
})


// app.get('/help',(req,res)=>{
//     res.send([{
//         name:'Andrew',
//         age:27
//     }])
// })

// app.get('/about',(req,res)=>{
//     res.send('ABOUT')
// })

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'Weather app',
        name:'Berni'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Weather app2',
        name:'Berni'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('nf',{
        message:'Help article not found',
        title:'Weather app2',
        name:'Berni'
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error:"You must provide an address"
        })
    }

    geocode(req.query.address,(error, {latitude,longitude,location} = {} )=> {
        if (error){
            return res.send({
                error:"Error with geocoding"
            })
        }
        forecast(latitude,longitude, (error,forecastData) => {
            if (error){
                return res.send({
                    error:"Error with forecast"
                })
            }
            res.send({
                address: req.query.address,
                location,
                forecast: forecastData
            })
        })
    })

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error:"You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        "products":[]
    })
})

app.get('*',(req,res)=>{
    res.render('nf',{
        message:'Page not found',
        title:'Weather app2',
        name:'Berni'
    })
})


app.listen(3000,()=> { 
    console.log('Server is up on 3000')
})