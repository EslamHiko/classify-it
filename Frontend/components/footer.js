import Link from 'next/link';


const Footer = () => (
  <footer id="footer">
        <div className="row">
          <div className="col-lg-12">

            <ul className="list-unstyled">
              <li className="float-lg-right"><a href="#top">Back to top</a></li>
              <li><a href="https://blog.bootswatch.com" onclick="pageTracker._link(this.href); return false;">Blog</a></li>
              <li><a href="https://blog.bootswatch.com/rss/">RSS</a></li>
              <li><a href="https://twitter.com/bootswatch">Twitter</a></li>
              <li><a href="https://github.com/thomaspark/bootswatch/">GitHub</a></li>
              <li><a href="../help/#api">API</a></li>
              <li><a href="../help/#donate">Donate</a></li>
            </ul>
            <p>Made by <a href="https://thomaspark.co">Thomas Park</a>.</p>
            <p>Code released under the <a href="https://github.com/thomaspark/bootswatch/blob/master/LICENSE">MIT License</a>.</p>
            <p>Based on <a href="https://getbootstrap.com" rel="nofollow">Bootstrap</a>. Icons from <a href="https://fontawesome.com/" rel="nofollow">Font Awesome</a>. Web fonts from <a href="https://fonts.google.com/" rel="nofollow">Google</a>.</p>

          </div>
        </div>

      </footer>
);

export default Footer;
