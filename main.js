
 const fast2sms = require('fast-two-sms')
var express = require('express')
const bodyparser = require('body-parser')

const app = express()

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:false}))

app.use(bodyparser.json())

app.get('/index.html', (req,res)=>
{
  res.sendFile(__dirname + "/index.html")
})
app.get('/payment.html', (req,res)=>
{
  res.sendFile(__dirname + "/payment.html")
})
app.get('/popup.html', (req,res)=>
{
  res.sendFile(__dirname + "/popup.html")
})

app.post('/sendmessage', (req,res)=>
{
  console.log(req.body.number);
  console.log(req.body.name);
  console.log(req.body.email);
  console.log(req.body.auto)

  sendMessage(req.body.number,req.body.auto,res)
})

function sendMessage(auto,number,res){
  // const response = await fast2sms.sendMessage(options)
  // console.log(response)
  var options = 
{
  authorization: "0czLWGXr9TtvNkIOU99mJ6v2bzc0bT0LzwlQhVEtTvo0reVaG8uEWirNzbz6",
  message:auto,
  numbers: [number]
};


fast2sms.sendMessage(options)
  .then(response=>
  {
    res.send("Thank you for booking, Your Ride is confirm");
  })
  .catch((error)=>
  {
    res.send("Some error taken place ");
  })
}
app.listen(5000, ()=>
{
  console.log("App is running on port 5000 ");
})