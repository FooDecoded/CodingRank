import React from 'react';
import SignupContainer from '../session/signup_form_container'
import './splash.css'
import leftImage1 from './../../purple-green.jpg'
import backgroundImage from './../../green.jpg'
// var ReactRotatingText = require('react-rotating-text');
import Typing from 'react-typing-animation';

class Splash extends React.Component {
 


  render() {
    return (
      <div className="splash">
       
        <img id="background-image" src={backgroundImage} ></img>
        
          
          {/* <ReactRotatingText style={{color:"white", position: "relative", bottom: 700, fontFamily: "Fira Code", left: 50, fontSize: 25, maxWidth: 400}} items={['Welcome to CodeRank.', 'Practice coding, prepare for interviews, and get hired!']} /> */}
        <Typing>
          <span id="react"> Welcome to CodeRank. Practice coding, prepare for interviews, and get hired!</span>
        </Typing>
        <div className="platform-links">
          <a target="_blank" href="https://www.linkedin.com/in/aleatlinked/" id="platform-link-boxes">
            <i className="fas fa-user-alt"></i>
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/asem-noufal-24576988/" id="platform-link-boxes">
            <i className="fas fa-user-alt"></i>
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/lina-kherchi-44a43699/" id="platform-link-boxes">
            <i className="fas fa-user-alt"></i>
          </a>
          <a target="_blank" href="https://www.linkedin.com/in/sam-kalash-7a1bb681/" id="platform-link-boxes">
            <i className="fas fa-user-alt"></i>
          </a>

        </div>

      {/* //   <div className="splash-hero-message">  
      //     <h1 className="splash-hero-h1">
      //       Welcome to CodeRank. <br/> 
      //       Join over 4 developers. 
      //       <br/>
      //       <br/>
      //       Practice coding, 
      //       prepare for interviews, 
      //       and get hired!
      //     </h1>
      //   </div>*/}
          <SignupContainer/>
      </div> 
    );
  }
}

export default Splash;