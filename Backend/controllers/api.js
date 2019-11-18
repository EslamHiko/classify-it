const graph = require('fbgraph');
const getScore = require('../utils/scoreCalc');
const User = require('../models/User')
const config = require('../config/config')
/**
 * GET /api/facebook
 * Facebook API example.
 */
exports.getFacebook = async (req, res, next) => {



  let token;
  if(req.user && req.user.data.tokens){
  token = req.user.data.tokens.find((token) => token.kind === 'facebook');
}
  else {
    const user = await User.findOne().sort({created_at: -1});

    token = user.tokens.find((token) => token.kind === 'facebook');

  }
  // console.log(token)
  graph.extendAccessToken({
      "access_token":    token,
        "client_id":      config.FACEBOOK_ID,
        "client_secret":  config.FACEBOOK_SECRET,
    }, function (err, facebookRes) {
       console.log(facebookRes);
    });

  graph.setAccessToken(token.accessToken);
  group = config.GROUP_ID
  path = `/${group}/feed?limit=${config.PER_PAGE}`
  // console.log(req.query)
  if(req.query.next){
    path = req.query.next.replace("https://graph.facebook.com/v4.0","")
  }
  // console.log(path)
  graph.get(path, async (err, result) => {
    if (err) { return res.json(err); }
    posts = result.data;
    nextLink = result.paging.next;
    var finalResults = await Promise.all(posts.map(async (post)=>{
      ids = post.id.split("_")
      post.link = `https://www.facebook.com/groups/${ids[0]}/permalink/${ids[1]}/`
      scores = await getScore(post.message);
      scores = Object.keys(scores).map((key) => {
        const obj = {};
        obj[key] = scores[key];
        return obj;
      });
      scores.sort((a,b)=>{
        return b[Object.keys(b)[0]] - a[Object.keys(a)[0]];
      })
      post.scores = scores;
      // console.log(post.scores)
      return post;
    }));

    return res.json({posts:finalResults,next:nextLink});
  });
};
