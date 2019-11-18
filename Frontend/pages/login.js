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
    const axios = require('../utils/axios')

    e.preventDefault();
    axios.post('https://localhost:8080/login',{email:this.state.user.email,password:this.state.user.password}).then(e=>{
      if(!e.data.success)
        return alert("Wrong Credentials !")
      else {
        localStorage.setItem('token',e.data.token)
        location.reload()
      }
    })
  }
  async componentDidMount(){
    const token = localStorage.getItem('token')
    if(token)
      return Router.push('/')
  }
  render(){
    return (
    <Layout>
      <main role="main" className="container">
        <div className="container">
            <form onSubmit={this.handleSubmit}>
          
                <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email"onChange={this.handleChange} value={this.state.user.email} name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" onChange={this.handleChange} value={this.state.user.password} name="password" class="form-control" id="exampleInputPassword1" placeholder="Password"  />
              </div>

              <button type="submit" class="btn btn-primary">login</button>

              <a href="https://localhost:8080/auth/facebook" class="btn btn-primary">Log in with Facebook</a>
            </form>
        </div>
      </main>
    </Layout>
  );}
}


export default Index
