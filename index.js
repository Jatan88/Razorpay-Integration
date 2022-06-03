const express = require("express");
const app = express();
const Razorpay=require("razorpay");
const bodyParser = require('body-parser')

let instance = new Razorpay({
  key_id: 'rzp_test_mXNM0sioFCW8Yj', 
  key_secret: 'PNb88tztZiTkORSQfyUjyTRR' 
})


app.use('/web', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.post("/api/payment/order",(req,res)=>{
params=req.body;
instance.orders.create(params).then((data) => {
       res.send({"sub":data,"status":"success"});
}).catch((error) => {
       res.send({"sub":error,"status":"failed"});
})
});




app.post("/api/payment/verify",(req,res)=>{
body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
var crypto = require("crypto");
var expectedSignature = crypto.createHmac('sha256', '<your secret>')
                                .update(body.toString())
                                .digest('hex');
                                console.log("sig"+req.body.razorpay_signature);
                                console.log("sig"+expectedSignature);
var response = {"status":"failure"}
if(expectedSignature === req.body.razorpay_signature)
 response={"status":"success"}
    res.send(response);
});


app.listen("3500",()=>{
    console.log("server running at port 3500");
})