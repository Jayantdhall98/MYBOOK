var mongoose = require("mongoose");

var ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);


var mymodel=new mongoose .model('Conversation',ConversationSchema)
module.exports=mymodel
