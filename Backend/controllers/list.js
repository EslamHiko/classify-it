const brain = require('brain.js');
const Setting =  require('../models/Setting')
const getScore = require('../utils/scoreCalc')
const List = require('../models/List')

exports.getLists = async (req,res) => {
  const lists = await List.find({});

  const map = [];
  lists.forEach((list) => {
      map.push(list);
  });
  res.json(map);
}
exports.getList = async (req,res) => {
  const list = await List.findById(req.params.id);


  res.json(list);
}
exports.save = (req,res)=>{

  List.findById(req.body.id, (err, list) => {
    if(!list)
      list = new List();
    list.text = req.body.text;
    list.category = req.body.category;
    list.save((err) => {
      if (err) {
        return res.json(err);
      }
      res.json({success:true,list})
    });
  });
}

exports.delete = (req,res)=>{
  List.deleteOne({_id:req.body.id}, (err, list) => {
    if (err) {
      return res.json(err);
    }
    res.json({success:true})
  });
}
