var User = require("../../model/User")
module.exports = function(req,res){
    User.find({accountType:"Student"}).then((students)=>{
        res.json(students)
    })
}