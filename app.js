const express = require('express')
const app = express()
const port = 3000
const https = require('node:https');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/signup.html")
})


app.post("/", function(req,res){
  console.log(req.body);
  var firstName= req.body.fName;
  var lastName= req.body.lName;
  var email= req.body.email;

  var data = {
    members:[
    {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
}
  var jsonData= JSON.stringify(data);

  var url = "https://us11.api.mailchimp.com/3.0/lists/3ea661a0fb" ;
  var options = {
    method: "POST",
    auth:"gaurav1:ad5f40466f1a1c44e3fc04d0e88c9743d-us11"

  }

  const request= https.request(url, options, function(response){
    if (response.statusCode ===200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
})

app.listen(port, function() {
  console.log(`Example app listening on port: `+port)
})


// apiKey = d5f40466f1a1c44e3fc04d0e88c9743d-us11
// listid = 3ea661a0fb
