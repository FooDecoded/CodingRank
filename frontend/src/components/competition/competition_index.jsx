import React from 'react';
import './competition.css';
import { withRouter } from 'react-router-dom';





class Competition extends React.Component{
    constructor(props){
        super(props)
    }



  
render(){
    return(
        <div id="competition-container">
            <div className="background">
                <p id="trophee-competition">🏆</p>
                <p id="coderank-contest">CodeRank Contest</p>
                <p id="compete-and-see-your-ranking">Compete and see your ranking</p>
                <p id="global-ranking">Global Ranking</p>
                <div id="username-1">Username</div>
                    <p id="ranked-first">🥇</p>
                
                <div id="second-line-ranking">
                    <div id="username-2">Username</div>
                    <p id="ranked-second">🥈</p>
                    <p id="ranked-third">🥉</p>
                    <div id="username-3">Username</div>
                </div>
            </div>
            <div>
                <button id="there-is-a-contest-coming-in">
                    <p id="join-competition">Join this 1 hour contest</p>
                    <div id="time-countdown">
                        <p id="contest-number">Weekly Contest 20</p>
                        <p id="starts-in"><i id="clock" class="material-icons">access_time</i>Starts in #countdown</p>
                    </div>
                </button>

                <div id="ranking-table">
                    
                </div>
            </div>
        </div>
    )
    }
}






export default withRouter(Competition);
