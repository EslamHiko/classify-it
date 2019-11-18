# ClassifyIt
Facebook Group posts Classifier using category based words occurrences count algorithm built with [React.js](https://reactjs.org/) 
[Next.js](https://nextjs.org/),[Bootstrap](https://getbootstrap.com/) mainly for the Front-End and
 [Node.js](https://nodejs.org/en/) [Express](https://expressjs.com/) mainly for the Back-End.

![Demo](https://raw.githubusercontent.com/EslamHiko/classify-it/master/pics/after2.gif)

> Note: This project was built in 2 days [Facebook : For Social Good Hackathon](https://hackathon-devc-cairo.splashthat.com/).

> I didn't win 😔 but the project still a good portfolio item 😁.

### The Algorithm Used for Classification
`backend/utils/scoreCalc.js`
```javascript
const getScore = async (text) =>{
  var score = {};
  if(text){
    posts = await getPosts();
    posts.forEach(post => {
      wordList = post.text.replace(/\s\s+/g, ' ').trim().split(" ");
      score[post.category] = score[post.category] ? score[post.category] : 0;
      wordList.forEach(word => {
        var regExp = new RegExp(word.toUpperCase(), "gi");
        var count = (text.toUpperCase().match(regExp) || []).length;
        score[post.category] += count;
      });
    })
  }
  return score;
}
```
> Note: If you want more accurate results you can use [BrainJS](https://github.com/BrainJS/brain.js) 
I came up with this algorithm because I was in a hurry and my machine wasn't really helping 😅, 
but the results would be 80%+ the same I think.

This returns the score array we can see in the final object here

<img src="https://github.com/EslamHiko/classify-it/raw/master/pics/API%20Object.PNG" width="750">

This object is equal to this 

<img src="https://github.com/EslamHiko/classify-it/raw/master/pics/HTML%20Object.PNG">

Here we see that this post has 1 word occurence in each of the 3 categories `prayer, help request, medical inquery`

If the post has more words that are in a single category wordlist it'll show only this category.

### What can the user do ?
- CRUD operations for Categories
<img src="https://github.com/EslamHiko/classify-it/raw/master/pics/cats.PNG">

- CRUD operations for Category Wordlists
<img src="https://github.com/EslamHiko/classify-it/raw/master/pics/Word%20Lists.PNG">

- CRUD operations for Posts in case you wanted to take notes,follow up on a particular post
<img src="https://github.com/EslamHiko/classify-it/raw/master/pics/notes.PNG">

### What you can learn from the code : 

- CRUD Operations
- Social Login with React, Next.js and Express
- Including Bootstrap in your Next.js project
- Using SSL HTTPS for local development
- Working With FB Groups API or External APIs.

### How to run the project
`git clone https://github.com/EslamHiko/classify-it.git`

#### Set Your Settings
`backend/config/config.js`
```javascript
const config = {
  MongoURI : "YOUR_FB_MONGODB_URL",
  port: 8080,
  BASE_URL:"https://localhost:8080",
  FACEBOOK_ID: "YOUR_FB_APP_ID",
  FACEBOOK_SECRET: "YOUR_FB_APP_SECRET",
  SESSION_SECRET: 'top_secret',
  GROUP_ID: 'YOUR_GROUP_ID',
  PER_PAGE:12
};

module.exports = config;

```

#### Run the Back-End Server (https://localhost:8080)
- `cd backend`
- `npm install`
- `npm run dev`

#### Run the Front-End Server (https://localhost:3000)
- `cd frontend`
- `npm install`
- `npm run dev`
- Open (https://localhost:3000/login) in the browser.
- Login with your FB account So The App can fetch the posts.
- Add the categories with preferred tag colors.
- Add WordLists (words seperated by spaces) for each category ex: `condolence` category can have : `died sad my grandpa car accident`.
- Browse the main page and filter the posts based on category words occurrences count 😁.




