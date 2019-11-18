import Layout from '../components/MyLayout';
import Router from 'next/router'
import Link from 'next/link';
import 'jquery'

class Index extends React.Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
    localStorage.removeItem('token')
    var token = localStorage.getItem('token');
    if(!token){
      window.location.href = '/';
    }
  }
  render(){
    return (
      <Layout>
        <main role="main" className="container">
              <div className="container">
                <div className="text-center">
                  <a href="#"  className="btn btn-md btn-grey">Logging Out</a>
                </div>
              </div>
        </main>
      </Layout>
    );
  }
}

export default Index
