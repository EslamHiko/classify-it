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
    this.state = {cat: {}}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange  = this.handleChange.bind(this)
  }
  handleChange(e){
    const cat = this.state.cat;
    cat[e.target.name] = e.target.value;
    this.setState({cat:cat});
  }
  componentDidMount(){
    const axios = require('../../utils/axios')

    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    if(id){
      axios.get('https://localhost:8080/cats/'+id).then(e=>{
        console.log(e)
        this.setState({cat:e.data})
        console.log(this.state.cat)
      })
    }
  }
  navigate(e){
    const path = $(e.target).attr('path');
    return Router.push(path);
  }
  handleSubmit(e){
    const axios = require('../../utils/axios')

    e.preventDefault();
    console.log(e.target)
    console.log(e.target.elements)
    var data = {};

    for(let input of e.target.elements){
      let name = input.getAttribute('name')
      let value = input.value
      data[name] = value
 }
 console.log(data)
 this.setState({disabled:true})
 axios.post('https://localhost:8080/cats/save',data).then(e=>{
   console.log(e)
   alert("category saved successfully !")
   Router.push('/categories')
   this.setState({disabled:false})
 }).catch(e=>{
   alert(e)
   this.setState({disabled:false})
 })

  }
  render(){
    console.log(this.state.cat)
    return (
      <Layout>

      <div class="container">
      <form onSubmit={this.handleSubmit}>
      {this.state.cat._id && <input type="hidden" name="id" value={this.state.cat._id}/>}
  <div class="form-group">
    <label for="name">Name</label>
    <input dir="auto" onChange={this.handleChange} required type="text" name="name" value={this.state.cat.name} class="form-control" id="name" placeholder="Category name" />
  </div>
  <div class="form-group">
    <label for="exampleFormControlSelect1">Color</label>
    <select onChange={this.handleChange} required name="color"value={this.state.cat.color } class="form-control" id="exampleFormControlSelect1">
    <option value="white">  White</option>

    <option  value="primary" className="badge-primary">  Blue</option>
    <option  value="secondary" className="badge-secondary">  Grey</option>
    <option  value="success" className="badge-success">  Green</option>
    <option  value="danger"  className="badge-danger">  Red</option>
    <option  value="warning" className="badge-warning">  Yellow</option>
    <option  value="info" className="badge-info">  Light Blue</option>
    <option  value="light" className="badge-light">  Milky</option>
    <option  value="dark" className="badge-dark">  Black</option>

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
