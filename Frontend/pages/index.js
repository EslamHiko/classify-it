import Layout from '../components/MyLayout';
import Post from '../components/post'
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import React from 'react'


class Index extends React.Component {
  constructor(props){
    super(props)
    this.state = {cats:[{_id:"All Posts",name:"All Posts"}],posts:[],postsToShow:[],loading:'Loading'}
    this.filterPosts = this.filterPosts.bind(this)
    this.loadPosts = this.loadPosts.bind(this)
  }
  filterPosts(e){
    const posts = this.state.posts;

    const postsToShow = posts.filter(post=>{
      console.log(post.possibleBadges);
      console.log(e.target.name)
      console.log(post.possibleBadges.includes(e.target.name));
      return e.target.name == 'All Posts' ? true : post.possibleBadges.some(badge => badge == e.target.name);
    });
    this.setState({postsToShow:postsToShow});
  }
  async loadPosts(){
    const axios = require('../utils/axios')

    await axios.get('https://localhost:8080/'+(this.state.next?'?next='+encodeURIComponent(this.state.next):'')).then(res=>{

        var posts = res.data.posts;
        posts = posts.map(post=>{
          console.log(post)
          const possibleBadges = [];
          if(post.scores.length && Object.keys(post.scores[0]).length && post.scores[0][Object.keys(post.scores[0])[0]]){
            possibleBadges.push([Object.keys(post.scores[0])[0]]);
          } else {
            possibleBadges.push("unknown");
          }

          for(let i = 1; i < post.scores.length;i++){
            let val = post.scores[i-1][Object.keys(post.scores[i-1])[0]];
            let curr = post.scores[i][Object.keys(post.scores[i])[0]];
            if((curr == val || curr == val - 1) && curr){
              possibleBadges.push(Object.keys(post.scores[i])[0]);
            } else {
              break;
            }
          }
          post.possibleBadges = possibleBadges;
          return post;
        });
        const allPosts = [...this.state.posts,...posts];
        if(this.state.next){
          window.scrollTo(0,document.body.scrollHeight);
        }
        this.setState({posts:allPosts,postsToShow:allPosts,next:res.data.next,loading:"No Posts"});

      }).catch(e=>{
        console.log(e)
      });
  }
  async componentDidMount(){

    const axios = require('../utils/axios')
    if(localStorage.getItem('token')){
    await axios.get('https://localhost:8080/user').then(e=>{
      if(e.data){
        console.log(e.data)
        this.setState({user:e.data.data})
      }
    }).catch(e=>console.log(e));
  }

await axios.get('https://localhost:8080/cats').then(async res=>{

    const cats = [...this.state.cats,...res.data];
    this.setState({cats:cats});
    await this.loadPosts()
  }).catch(e=>{
    console.log(e)
  });

  }
  render(){

    return (
    <Layout>
      <main role="main" className="container">
            <div className="bg-light rounded-pill">
            <div className="container">
            {(this.state.cats.length &&
              this.state.cats.map((cat,i) => <a href="#" key={i} onClick={this.filterPosts} name={cat._id} className={`badge badge-${cat.color}`}>{cat.name}</a>)) || <div className="text-center">{this.state.loading}</div>}
              </div>
            </div>
            <div className="container">
            <div className="row margin-top">
              {(this.state.postsToShow.length && this.state.postsToShow.map((post,i)=> post.message && <Post key={i} post={post} user={this.state.user} cats={this.state.cats} />)) || <div className="text-center">{this.state.loading}</div>}
            </div>
            <div className="text-center">
              {(this.state.next && this.state.loading != 'Loading' && <a href="javascript:void(0)" onClick={this.loadPosts} className="btn btn-md btn-success">Load More</a>)}
            </div>
        </div>
      </main>
    </Layout>
  );}
}


export default Index
