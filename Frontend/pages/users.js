import Layout from '../components/MyLayout';
import Router from 'next/router'
import Link from 'next/link';
import 'jquery'

class Index extends React.Component {
  constructor(props){
    super(props)
    this.navigate = this.navigate.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.state = {users:[]}
  }
  navigate(e){
    const path = $(e.target).attr('path');
    return Router.push(path);
  }
  componentDidMount(){
    const token = localStorage.getItem('token')
    if(!token){
      return Router.push('/error','/');
    }
    const axios = require('../utils/axios')
    axios.get('https://localhost:8080/users/').then(e=>{
      this.setState({users:e.data})
    });
  }
  removeUser(e){
    if (confirm('Are you sure you want to delete this user ('+e.target.name+')?')) {
      const axios = require('../utils/axios')
      axios.post("https://localhost:8080/users/delete",{id:e.target.getAttribute('user')}).then(e=>{
        if(e.data.success){
          alert('user deleted successfully !')
          location.reload();
        }
      });
    }
  }
  render(){
    const getColor = (name) =>{
      const cats = this.state.cats.filter(cat=>cat.name == name);
      return cats[0].color;
    }
    return (
      <Layout>
          <main role="main" className="mb-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
                  <h1 className="h2">Users</h1>
                  <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group mr-2">
                      <button type="button" onClick={this.navigate} path="/users/user" className="btn btn-sm btn-outline-secondary">+ New User</button>
                    </div>
                  </div>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">name</th>
                    <th scope="col">email</th>
                    <th scope="col">role</th>
                    <th scope="col">Manage</th>
                  </tr>
                </thead>
                <tbody>
                {this.state.users.map(user => <tr>
                  <td>{user.profile.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td><Link href={'/users/user?id='+user._id}  user={user}><a className="btn btn-sm btn-warning">edit</a></Link>
                  <a className="btn btn-sm btn-danger" onClick={this.removeUser} href="#" name={user.name} user={user._id}>remove</a>
                  </td>
                </tr>)}

                </tbody>
              </table>
          </main>
      </Layout>
    );
  }
}

export default Index
