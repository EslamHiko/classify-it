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
        axios.get('https://localhost:8080/lists/'+id).then(e=>{
          console.log(e)
          this.setState({post:e.data})
          console.log(this.state.post)
        })
      }
      var newPost = localStorage.getItem('list');

      if(newPost){
        localStorage.removeItem('list')
        newPost = JSON.parse(newPost);
        newPost.category = newPost.possibleBadges[0][0];
        console.log(newPost.possibleBadges)
        newPost.text = newPost.message;
        console.log(newPost)
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
 // console.log(data)
 this.setState({disabled:true})
 axios.post('https://localhost:8080/lists/save',data).then(e=>{
   // console.log(e)
   alert("Word List saved successfully !")
   Router.push('/lists')
   this.setState({disabled:false})
 }).catch(e=>{
   alert(e)
   this.setState({disabled:false})
 })

  }
  render(){
    // console.log(this.state.post)
    const cats = this.state.categories;
    return (
      <Layout>

      <div class="container">
      <form onSubmit={this.handleSubmit}>
      {this.state.post._id && <input type="hidden" name="id" value={this.state.post._id}/>}

      <div class="form-group">
        <label for="name">text*</label>
        <textarea dir="auto" onChange={this.handleChange} required type="text"
        name="text" value={this.state.post.text} class="form-control" id="name" placeholder="text" />
      </div>

  <div class="form-group">
    <label for="exampleFormControlSelect1">category</label>
    <select onChange={this.handleChange} required name="category" value={this.state.post.category } class="form-control" id="exampleFormControlSelect1">
    {cats.length && cats.map(cat=> <option  value={cat._id} className={`badge-${cat.color}`}>{cat.name}</option>) }
    </select>
  </div>

  <div class="form-group float-right px-2">
    <button type="submit" disabled={this.state.disabled} className="btn btn-lg btn-primary">save</button>
  </div>
</form>


  </div>
      </Layout>
    );
  }
}

export default withRouter(Index)
