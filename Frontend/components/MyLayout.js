import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/custom.css'
import Header from './header'
import Footer from './footer'
import React from 'react'
class Layout extends React.Component {

  constructor(props){
    super(props)
    this.state = {user:{}}
  }
  async componentDidMount(){
    const axios = require('../utils/axios')
    await axios.get('https://localhost:8080/user').then(e=>{
      if(e.data){
        console.log(e.data)
        this.setState({user:e.data.data})
      }
    }).catch(e=>{console.log(e)});
  }
  render(){


  return (
[

    <Header user={this.state.user} key={0}/>,
    <div className="container"  key={1}>
      {this.props.children}
      {/*<Footer />*/}
    </div>,
      <script  key={2} src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
 integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
 crossOrigin="anonymous"></script>,

 <script  key={3} src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"
 integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ"
 crossOrigin="anonymous"></script>,

 <script  key={4} src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"
 integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm"
 crossOrigin="anonymous"></script>
]

  );
}
}

export default Layout
