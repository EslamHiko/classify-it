const brain = require('brain.js');
const Setting =  require('../models/Setting')
const getScore = require('../utils/scoreCalc')
const Post = require('../models/Post')
exports.getPosts = async (req,res) => {
  const posts = await Post.find({});

  const map = [];
  posts.forEach((post) => {
      map.push(post);
  });
  res.json(map);
}
exports.getPost = async (req,res) => {
  const post = await Post.findById(req.params.id);


  res.json(post);
}
exports.save = (req,res)=>{

  Post.findById(req.body.id, (err, post) => {
    if(!post)
      post = new Post();
    post.title = req.body.title;
    post.text = req.body.text;
    post.category = req.body.category;
    post.notes = req.body.notes;
    post.assignees = req.body.assignees;
    post.link = req.body.link;
    post.save((err) => {
      if (err) {
        return res.json(err);
      }
      res.json({success:true,post})
    });
  });
}



exports.delete = (req,res)=>{
  Post.deleteOne({_id:req.body.id}, (err, post) => {
    if (err) {
      return res.json(err);
    }
    res.json({success:true})
  });
}
