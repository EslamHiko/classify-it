import Layout from '../components/MyLayout';
import Router from 'next/router'
import Link from 'next/link';
import 'jquery'

class Index extends React.Component {
  constructor(props){
    super(props)
    this.navigate = this.navigate.bind(this);
    this.removeCat = this.removeCat.bind(this);

    this.state = {cats:[]}
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
    axios.get("https://localhost:8080/cats").then(e=>{
      this.setState({cats:e.data});
    })
  }
  removeCat(e){
    if (confirm('Are you sure you want to delete '+e.target.name+' category and all it\'s word lists?')) {
      const axios = require('../utils/axios')
      axios.post("https://localhost:8080/cats/delete",{id:e.target.getAttribute('cat')}).then(e=>{
        if(e.data.success){
          alert('category deleted successfully !')
          location.reload();
        }
      })
}
  }
  render(){
    const colorMap = {
      'primary':'Blue',
  'secondary':'Grey',
  'success':'Green',
  'danger':'Red',
  'warning':'Yellow',
  'info':'Light Blue',
  'light':'Milky',
  'dark':'Black'
};
console.log(colorMap)
    return (
      <Layout>

      <main role="main" className="mb-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
              <h1 className="h2">Categories</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group mr-2">
              <button type="button" onClick={this.navigate} path="/categories/cat" className="btn btn-sm btn-outline-secondary">+ New Category</button>
            </div>

          </div>
            </div>
      <table className="table">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Color</th>
        <th scope="col">Manage</th>
      </tr>
    </thead>
    <tbody>
    {this.state.cats.map((cat,i) => <tr key={i}>
      <td>{cat.name}</td>
      <td><a href="#" className={`badge badge-${cat.color}`}>{colorMap[cat.color] || 'White'}</a></td>
      <td><Link href={'/categories/cat?id='+cat._id}  cat={cat}><a className="btn btn-sm btn-warning">edit</a></Link><a className="btn btn-sm btn-danger" onClick={this.removeCat} href="#" name={cat.name} cat={cat._id}>remove</a></td>
    </tr>)}

    </tbody>
  </table>

</main>

      </Layout>
    );
  }
}

export default Index
