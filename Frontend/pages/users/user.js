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
    this.state = {user: {},newAccount:true}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange  = this.handleChange.bind(this)
  }
  handleChange(e){
    const user = this.state.user;
    user[e.target.name] = e.target.value;
    this.setState({user:user});
  }
  componentDidMount(){
    const axios = require('../../utils/axios')

    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");

    if(id){
      axios.get('https://localhost:8080/users/'+id).then(e=>{
        console.log(e)
        const user = e.data;
        const profile = user.profile;
        Object.keys(profile).forEach(key=>{
          user[key] = profile[key];
        });
        user.password = '';
        this.setState({user:user,newAccount:false})
        console.log(this.state.user)
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

    var data = {};

    for(let input of e.target.elements){
      let name = input.getAttribute('name')
      let value = input.value
      if(name)
        data[name] = value
 }
 if(data['password'] != data['password2']){
   alert('Passwords don\'t match !');
   return false;
 }
 console.log(data)
 this.setState({disabled:true})
 axios.post('https://localhost:8080/users/save',data).then(e=>{
   console.log(e)
   alert("User saved successfully !")
   Router.push('/users')
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
      {this.state.user._id && <input type="hidden" name="id" value={this.state.user._id}/>}
      <div className="form-group">
        <label for="title">name</label>
        <input onChange={this.handleChange} required type="text" name="name" value={this.state.user.name} className="form-control" id="title" placeholder="name" />
      </div>
      <div className="form-group">
        <label for="email">email</label>
        <input onChange={this.handleChange} required type="email" name="email" value={this.state.user.email} className="form-control" id="email" placeholder="email" />
      </div>
      <div className="form-group">
        <label for="password">password</label>
        <input onChange={this.handleChange} required={this.state.newAccount} type="password" name="password" value={this.state.user.password} className="form-control" id="password" placeholder="password" />
      </div>
      <div className="form-group">
        <label for="password2">password</label>
        <input onChange={this.handleChange} required={this.state.newAccount} type="password" name="password2" value={this.state.user.password2} className="form-control" id="password2" placeholder="password confirmation" />
      </div>
      <div className="form-group">
        <label for="location">location</label>
        <input onChange={this.handleChange} type="text" name="location" value={this.state.user.location} className="form-control" id="location" placeholder="location" />
      </div>

          <div className="form-group">
            <label for="exampleFormControlSelect2">gender</label>
            <select onChange={this.handleChange} required name="role" value={this.state.user.gender } className="form-control" id="exampleFormControlSelect2">
            <option  value={`male`}>{`male`}</option>
            <option  value={`female`}>{`female`}</option>
            </select>
          </div>


  <div className="form-group">
    <label for="exampleFormControlSelect1">role</label>
    <select onChange={this.handleChange} required name="role" value={this.state.user.role } className="form-control" id="exampleFormControlSelect1">
    <option  value={`user`}>{`user`}</option>
    <option  value={`admin`}>{`admin`}</option>
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
