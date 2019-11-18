import Layout from '../../components/MyLayout';
import {withRouter} from 'next/router'
import Router from 'next/router'
import Link from 'next/link';
import 'jquery'
import {FormattedMessage} from 'react-intl';
class Index extends React.Component {
  constructor(props){
    super(props)
    this.navigate = this.navigate.bind(this);
    this.state = {post: {},categories:[]}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange  = this.handleChange.bind(this)
  }
  handleChange(e){
    const post = this.state.post;
    post[e.target.name] = e.target.value;
    this.setState({post:post});
  }
  componentDidMount(){
    const axios = require('../../utils/axios')

    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    axios.get('https://localhost:8080/cats/').then(e=>{

      this.setState({categories:e.data})
      if(id){
        axios.get('https://localhost:8080/posts/'+id).then(e=>{
          console.log(e)
          this.setState({post:e.data})
          console.log(this.state.post)
        })
      }

      var newPost = localStorage.getItem('post');
      console.log(newPost)
      if(newPost){
        localStorage.removeItem('post')
        newPost = JSON.parse(newPost);
        newPost.category = newPost.possibleBadges[0][0];
        newPost.text = newPost.message;
        this.setState({post:newPost})
      }


    })

  }
  navigate(e){
    const path = $(e.target).attr('path');
    return Router.push(path);
  }
  handleSubmit(e){
    const axios = require('../../utils/axios')

    e.preventDefault();

    var data = {};

    for(let input of e.target.elements){
      let name = input.getAttribute('name')
      let value = input.value
      if(name)
        data[name] = value
 }
 console.log(data)
 this.setState({disabled:true})
 axios.post('https://localhost:8080/posts/save',data).then(e=>{
   console.log(e)
   alert("Post saved successfully !")
   Router.push('/posts')
   this.setState({disabled:false})
 }).catch(e=>{
   alert(e)
   this.setState({disabled:false})
 })

  }
  render(){
    console.log(this.state.post)
    const cats = this.state.categories;
    return (
      <Layout>

      <div className="container">
      <form onSubmit={this.handleSubmit}>
      {this.state.post._id && <input dir="auto" type="hidden" name="id" value={this.state.post._id}/>}
      <div className="form-group">
        <label for="title">title</label>
        <input dir="auto" onChange={this.handleChange} type="text" name="title" value={this.state.post.title} className="form-control" id="title" placeholder="title" />
      </div>

      <div className="form-group">
        <label for="name">text*</label>
        <textarea dir="auto" onChange={this.handleChange} required type="text"
        name="text" value={this.state.post.text} className="form-control" id="name" placeholder="text" />
      </div>
      <div className="form-group">
        <label for="link">link*</label>
        <input dir="auto" onChange={this.handleChange} required type="text" name="link" value={this.state.post.link} className="form-control" id="link" placeholder="link" />
      </div>
      <div className="form-group">
        <label for="assignees">assignees</label>
        <input dir="auto" onChange={this.handleChange} type="text" name="assignees" value={this.state.post.assignees} className="form-control" id="assignees" placeholder="assignees" />
      </div>
  <div className="form-group">
    <label for="notes">notes</label>
    <textarea dir="auto" onChange={this.handleChange} type="text"
    name="notes" value={this.state.post.notes} className="form-control" id="notes" placeholder="Notes" />
</div>
  <div className="form-group">
    <label for="exampleFormControlSelect1">category</label>
    <select onChange={this.handleChange} required name="category" value={this.state.post.category } className="form-control" id="exampleFormControlSelect1">
    {cats.length && cats.map(cat=> <option  value={cat._id} className={`badge-${cat.color}`}>{cat.name}</option>) }
    </select>
  </div>

  <div className="form-group float-right px-2">
    <button type="submit" disabled={this.state.disabled} className="btn btn-lg btn-primary">save</button>
  </div>
</form>


  </div>
      </Layout>
    );
  }
}

export default withRouter(Index)
