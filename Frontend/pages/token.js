import Layout from '../components/MyLayout';
import Router from 'next/router'
import Link from 'next/link';
import 'jquery'

class Index extends React.Component {
  constructor(props){
    super(props)

  }
  async componentDidMount(){
    var token = localStorage.getItem('token')
    if(token){
      console.log(token)
      return Router.push('/error', '/');
    }
    var url = new URL(window.location.href);

    token = url.searchParams.get("token");
    await localStorage.setItem('token',token)
    return Router.push('/error', '/');
  }
  render(){
    return (
      <Layout>
        <main role="main" className="container">
            <div className="container">
              <div className="text-center">
                <a href="#"  className="btn btn-md btn-grey">Signing In</a>
              </div>
            </div>
        </main>
      </Layout>
    );
  }
}

export default Index
