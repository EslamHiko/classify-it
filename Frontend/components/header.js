import Link from 'next/link';
import Head from 'next/head'


const Header = (props) => (

  <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
    <Head>
      <title>ClassifyIt</title>
    </Head>
     <div className="container">
       <Link href="/"><a className="navbar-brand">ClassifyIt</a></Link>
       <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"></span>
       </button>
       <div className="collapse navbar-collapse" id="navbarResponsive">
         <ul className="nav navbar-nav ml-auto">
           <li className="nav-item dropdown">
             <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" id="download">Manage <span className="caret"></span></a>
             <div className="dropdown-menu" aria-labelledby="download">
             {!props.user._id &&  <Link href="/login"><a className="dropdown-item">Login</a></Link>}
             {!props.user._id &&  <Link href="/register"><a className="dropdown-item">Register</a></Link>}
             {props.user._id &&  <Link href="/edit"><a className="dropdown-item">Edit</a></Link>}

             {props.user._id && props.user.sadmin && <Link  href="/users"><a className="dropdown-item">Users / Admins</a></Link>}
             {props.user._id && props.user.role == 'admin' &&
             [
              <Link  key={0} href="/categories"><a className="dropdown-item">Categories</a></Link>,
             <Link  key={1} href="/lists"><a className="dropdown-item">Word Lists</a></Link>,
             <Link  key={3} href="/posts"><a className="dropdown-item">Saved Posts</a></Link>
              ]}
              {props.user._id && <Link href="/logout"><a className="dropdown-item">Log out</a></Link>}
             </div>
           </li>
         </ul>
       </div>
     </div>
   </nav>
 );

export default Header;
