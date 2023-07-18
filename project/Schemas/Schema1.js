var mongoose =require('mongoose')
var myschema=new mongoose.Schema({

Username:{

type:String,
required:true,
min:3,
max:20,
unique:true


} ,
E_mail:{
  type:String,
  unique:true  
},
Password: {
    
    type:String,
    required:true,
    min:4,
    max:8,
    unique:true
},
profilePicture: {
  type: String,
  default: "",
},
coverPicture: {
  type: String,
  default: "",
},
followers:{
type:Array,
default:[]

},
followings:{
type:Array,
default:[]

},
desc: {
  type: String,
  max: 50,
},
city: {
  type: String,
  max: 50,
},
from: {
  type: String,
  max: 50,
},
relationship: {
  type:String
},

},{timestamps:true})

var mymodel=new mongoose .model('Auther',myschema)
module.exports=mymodel