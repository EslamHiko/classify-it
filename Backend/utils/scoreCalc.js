const List = require('../models/List')

const  getPosts = async () => {

  const posts = await List.find({});

  return posts;
}

const getScore = async (text) =>{
  var score = {};
  console.log(text)
  if(text){
    posts = await getPosts();
    // console.log(posts)
    posts.forEach(post => {

      wordList = post.text.replace(/\s\s+/g, ' ').trim().split(" ");
      // console.log(wordList)
      // console.log(post)
      score[post.category] = score[post.category] ? score[post.category] : 0;
      // console.log(score)
      wordList.forEach(word => {

        var regExp = new RegExp(word.toUpperCase(), "gi");
        var count = (text.toUpperCase().match(regExp) || []).length;
        score[post.category] += count;
      });
    })
  }
  // console.log(score)
  return score;
}

module.exports = getScore;
