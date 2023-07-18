var mongoose =require('mongoose')
var postschema=new mongoose.Schema({

userId:{

    type:String,
    required:true

},
desc:{

    type:String,
  max:500
},
img:{

    type:String

},
likes:{
type:Array,
default:[]

},
dislikes:{

    type:Array,
    default:[]
}








 } ,{timestamps:true})

var mymodel=new mongoose .model('Post',postschema)
module.exports=mymodel