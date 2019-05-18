import React,{Component} from 'react';
import '../../App.css';

//create the Navbar Component
class Navbar3 extends Component {
    render(){

        return(
            
<nav
class="navbar navbar-light"
style={{ backgroundColor: "transparent" }}
>
<div class="container-fluid">
<div class="navbar-header">
<a class="navbar-brand" href="/home">
<img src="images/homeAway.svg" />
</a>
</div>

<ul class="nav navbar-nav navbar-right">
<li>
<div className="homecontact">
<span class="glyphicon glyphicon-headphones" />
&nbsp; Need help? &nbsp;
<a class="link" href="mailto:HA_Sales@homeaway.com">
Email us &nbsp;
</a>
or call
<a class="link" href="tel:1-877-226-3657">
&nbsp;1-877-226-3657
</a>
</div>
</li>
<li>
<a class="logoimage" href="">
<img src="images/iconmain.svg" />
</a>
</li>
</ul>
</div>
</nav>
);       
        
    }
}

export default Navbar3;