import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import demouser from '../../demo-user.png'
import graph from '../../gray-bar-chart.png'
import './profile.css';


class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentLanguage: ""
    }
    this.handleRedirectRuby = this.handleRedirectRuby.bind(this);
    this.handleRedirectJS = this.handleRedirectJS.bind(this);

  }

  // componentDidMount(){
  // }
  
  //handleRedirect takes us to editor component and sets currentLanguage in our local state.
  handleRedirectRuby(e) {
    e.preventDefault();
    // id === "001" ? this.setState({ currentLanguage: "ruby " }) : this.setState({ currentLanguage: "javascript" });
    this.props.history.push('/editor/ruby');
  }

   handleRedirectJS(e) {
    e.preventDefault();
    // id === "001" ? this.setState({ currentLanguage: "ruby " }) : this.setState({ currentLanguage: "javascript" });
    this.props.history.push('/editor/JS');
  }

  render() {
   return (
    <div className="profile-main-div"> 
      
      <div className="background-image">
        {/* <img id="profile-presentation-profile-picture" src={demouser} /> */}
        <div className="profile-picture-parent-container"> 
          <div className="profile-presentation-profile-picture">
            <i className="fas fa-user-alt" id="profile-image-icon"></i>
            </div>
        </div>  
      </div>

      <div className="profile-container"> 
        <div className="profile-left-bar">
          <div id="profile-presentation">
            <div className="username-container">
              <h2 id="username">Demo User</h2>
            </div>
    
            <div id="levels">
              <div><h1 id="levels-title">Level</h1></div>
              
              <div className="level-numbers">
              <h3 id="level-x-target">1</h3>
              <h3 id="level-x">2</h3>
              <h3 id="level-x">3</h3>
              <h3 id="level-x">4</h3>
              <h3 id="level-x">5</h3>
              </div>

            </div>
            <div id="progress">
              <progress id="user-progress" value="80" max="100"></progress>
              <h3 id="exercises-completed">80/100</h3>
              {/* <!-- The value will be updated based on each user --> */}
            </div>

            <div className="minutes-practiced-container">
              <dl>
                <dt id="minutes-practiced-title">Minutes practiced this week</dt>
                <div id="progress-chart-container">
                  <img id="chart" src={graph}/>
                    {/* <!-- WHERE THE CHART WILL BE LIVING - look for cool animations when the page refreshes--> */}
                      </div>
                    </dl>
                  </div>
                </div>
          </div>
              
              {/* Profile left bar ends here */}
              
          <div className="progress-items-container"> 

            <div className="learning-contest-buttons-container">
              <div className="learning-contest-buttons">
                <div className="continue-learning-buttons">
                  <button type="button" id="001" className="continue-learning-js" onClick={this.handleRedirectJS}>Train in Javascript</button>
                  <button type="button" id="002" className="continue-learning-ruby" onClick={this.handleRedirectRuby}>Train in Ruby</button>
                </div>
              </div>
            </div>

            <div id="top-right-container">
              <div className="top-left-cluster">
                <div id="points-earned-container">
                  <div id="plus-points">✛</div>
                  <h3 id="points-earned">10 points earned</h3>
                </div>
              </div>
              <div>
                <button id="join-contest">Join contest <div id="star">⭐</div></button>
              </div>
              <div className="top-right-cluster">
                <div id="contest-container">
                    <div id="trophee">🏆</div>
                    <h3 id="number-of-wins">0 wins</h3>
                </div>
              </div> 
            </div>

            <div id="bottom-right-container">
              <table id="table">
                <tr id="headers-row">
                  <th id="header-table-text">Problem</th>
                  <th id="header-table-text">Date</th>
                  <th id="header-table-text">Time completed</th>
                  <th id="header-table-text">Thumbs up</th>
                </tr>
                <tr id="row-number">
                  <td>1</td>
                  <td>00-00-0000</td>
                  <td>2:03</td>
                  <td>3</td>
                </tr>

                <tr id="row-number">
                  <td>2</td>
                  <td>00-00-0000</td>
                  <td>2:03</td>
                  <td>3</td>
                </tr>

                <tr id="row-number">
                  <td>3</td>
                  <td>00-00-0000</td>
                  <td>2:03</td>
                  <td>3</td>
                </tr>

                <tr id="row-number">
                  <td>4</td>
                  <td>00-00-0000</td>
                  <td>2:03</td>
                  <td>3</td>
                </tr>

                <tr id="row-number">
                  <td>5</td>
                  <td>00-00-0000</td>
                  <td>2:03</td>
                  <td>3</td>
                </tr>

              </table>
            </div>
            </div>
          </div>


      </div>
   )
  }
}

export default withRouter(Profile);