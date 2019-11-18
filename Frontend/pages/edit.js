import Layout from '../components/MyLayout';
import Post from '../components/post'
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import React from 'react'
import Router from 'next/router'


class Index extends React.Component {
  constructor(props){
    super(props)
    this.state = {user:{}}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }


  handleChange(e){
    const user = this.state.user;
    user[e.target.name] = e.target.value;
    this.setState({user:user});
  }
  handleSubmit(e){
    e.preventDefault();

    const axios = require('../utils/axios')
    var data = {};

    for(let input of e.target.elements){
      let name = input.getAttribute('name')
      let value = input.value
      if(name)
        data[name] = value
      }
      console.log(data)
      if(data['password'] != data['password2']){
        alert('Passwords don\'t match !');
        return false;
      }
    axios.post('https://localhost:8080/edit',data).then(e=>{
      if(e.data.success){
        alert('You\'ve updated your info Successfully !')
        localStorage.setItem('token',e.data.token)
      } else {
        alert((e.data.msg ?  e.data.msg : "something wrong happened please try again !"))
      }


    })
  }
  async componentDidMount(){
    const axios = require('../utils/axios')
    await axios.get('https://localhost:8080/user').then(e=>{
      if(e.data){
        console.log(e.data)
        const user = e.data.data;
        Object.keys(user.profile).forEach(key=>{
          user[key]=user.profile[key];
        })
        user.password = '';
        this.setState({user:user})
      }
    }).catch(e=>console.log(e));
  }
  render(){
    return (
    <Layout>
      <main role="main" className="container">
        <div className="container">
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label for="title">name</label>
              <input onChange={this.handleChange} required type="text" name="name" value={this.state.user.name} className="form-control" id="title" placeholder="name" />
            </div>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" required onChange={this.handleChange} value={this.state.user.email} name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" onChange={this.handleChange} value={this.state.user.password} name="password" class="form-control" id="exampleInputPassword1" placeholder="Password"  />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword2">Password Confirmation</label>
                <input type="password" onChange={this.handleChange} value={this.state.user.password2} name="password2" class="form-control" id="exampleInputPassword2" placeholder="Password"  />
              </div>
              <div className="form-group">
                <label for="location">location</label>
                <input onChange={this.handleChange} required type="text" name="location" value={this.state.user.location} className="form-control" id="location" placeholder="location" />
              </div>

                  <div className="form-group">
                    <label for="exampleFormControlSelect2">gender</label>
                    <select onChange={this.handleChange} required name="gender" value={this.state.user.gender } className="form-control" id="exampleFormControlSelect2">
                    <option  value={`male`}>{`male`}</option>
                    <option  value={`female`}>{`female`}</option>
                    </select>
                  </div>

              <button type="submit" class="btn btn-primary">Save</button>
              <a href="https://localhost:8080/auth/facebook" class="btn btn-primary">Link with Facebook</a>
            </form>
        </div>
      </main>
    </Layout>
  );}
}


export default Index
