import React from 'react';
import { withRouter } from 'react-router-dom';
import './editor.css';

import Countdown from '../timer/timer'
import {UnControlled as CodeMirror2} from 'react-codemirror2'

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/moxer.css';

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/ruby/ruby');


// import cd from '../../codemirror/lib/codemirror';


class JSEditor extends React.Component {
  constructor(props) {
    super(props)
    // debugger
    this.state = {

      isWhiteBoardVisible: false
    }
    this.handleSkip = this.handleSkip.bind(this);
    this.handleSubmitSolution = this.handleSubmitSolution.bind(this);
    this.displayFailures = this.displayFailures.bind(this);
    this.displaySuccessMessage = this.displaySuccessMessage.bind(this);
    this.displayRunTimeErrors = this.displayRunTimeErrors.bind(this);
  }
  
  
  componentWillMount() {
    
  }
  componentDidMount() {
    // debugger;
    this.props.fetchJSProblem(this.props.JSProblem);
    // this.handleSubmitSolution();
  }

  toggleWhiteBoard = () => {
    this.setState(prevState => ({ isWhiteBoardVisible: !prevState.isWhiteBoardVisible}))
  }

  retrieveProblemDescription(){
    this.setState({ description: this.props.problems.description })
  }

  handleSkip(){
    this.props.skipJSProblem(this.props.JSProblem[0].orderNumber)
    .then(this.props.fetchJSProblem(this.props.JSProblem))
  }

  handleSubmitSolution(){
    let solutionText = document.getElementsByClassName("CodeMirror")[0].CodeMirror.getValue();
    // debugger;
    this.props.createJSSolution(solutionText, this.props.JSProblem[0]._id )
  }

  displayFailures(){
    if ( this.props.JSSolutionResult.result && this.props.JSSolutionResult.result.failures.length > 0) 
    
    {
      // debugger
      return (
        <ul  className="failure-messages"> 
        <p> You have {this.props.JSSolutionResult.result.failures.length} errors: </p>
          { this.props.JSSolutionResult.result.failures.map(failure => (
            <li> - It should {failure} </li>
          ))}
        </ul>
      )
    }
  }

  displaySuccessMessage(){
    if (this.props.JSSolutionResult.result) 
    
    {
      // debugger
      if ( (this.props.JSSolutionResult.result.passes.length > 0) && (this.props.JSSolutionResult.result.failures.length === 0)  )
      return (
        <div>
        <p> You Got it!! You passed all {this.props.JSSolutionResult.result.passes.length} test cases below: </p>
        <ul className="success-messages"> 
          { this.props.JSSolutionResult.result.passes.map(failure => (
            <li> It should {failure} </li>
          ))}
        </ul>
        </div>
      )
    }
  }


  displayRunTimeErrors(){
    if (this.props.JSSolutionResult.runresults ) {
      return (
        <div>
           <ul className="runtime-messages"> 
          { this.props.JSSolutionResult.runresults.map(runresult => (
            <li> {runresult} </li>
          ))}
        </ul>
        </div>
      )
    }
  }


  render() {
    const { isWhiteBoardVisible } = this.state;
    if (Object.values(this.props.JSProblem).length === 0){
      return null
    }
            
    return (
       <div className="supermain-container">
      <div id="editorpage-container">
                        {/* <span className="training-type"> javascript</span> */}
            
          <div className="sidebar">
              <div className="question">
                <p> DO NOT DELETE ANYTHING FROM EXISTING SKELETON </p>
                <br/>
                <p>  Question {this.props.JSProblem[0].orderNumber} </p>

                 <p>  Level {this.props.JSProblem[0].level} </p>
              </div>
              <br/>
              <div className="description">
                 <p>{this.props.JSProblem[0].description}</p>
                 <br/>
                 <p> Examples: </p>   
                 <ul> {this.props.JSProblem[0].inputOutput.map(
                   example => (
                     <li> {example} </li>
                   )
                 )} </ul>
                 <br/>  
                 
              </div>

              <div id="inner-sidebar">  
                  {/* <button id="button-question-text">Previous</button> */}
                      {/* This button should be available only starting the second question */}
                  <button onClick={this.handleSubmitSolution} id="button-question-text" > Submit</button>
                      {/* This button should be showing up after the user clicks Run and passes everything */}
                  <button onClick={this.handleSkip} id="button-question-skip-text" >Skip question </button>
                      {/* This button can either make the user move to the next level if he is in the last question or move to next question */}
              </div>
                    <br/> 
                  
                    
                    <div className="skip-container"> 
                      <p id="skip-all-questions"> Skip all questions and proceed to next level </p>  
                      <button id="button-skip-all"> Skip All </button>    
                    </div>
                   

                    <div> { this.displayFailures()}
                        {this.displaySuccessMessage()} 
                        {this.displayRunTimeErrors()}
                    
                    </div>
            </div>
             


         
              <div className="timer-container">
                <Countdown/>
              </div>
          
               {/* {  document.getElementsByClassName("CodeMirror")[0].CodeMirror.getValue()} */}

            <CodeMirror2 id="editor"

              value={this.props.JSProblem[0].initialCode}
                    
              options={{
              mode: 'javascript',
              theme: 'moxer',
              lineNumbers: true
                }}

              onChange={(editor, data, value) => {
            }}/>


              <div id="buttons-below-editor">
                  <div id="button-run-question">
                      <button id="run-text">Run
                      <i class="material-icons" id="play-icon">play_arrow</i></button>
                  </div>
                 
                  <div id="button-see-solution">
                    <button id="solution-text">Solution</button>
                    {/* <button id="solution-text">Submit all</button> */}
                  </div>
              </div>
            

        
      </div>

      <div className="Whiteboard-container"> 
        <i className="icon ion-md-create board-button" id="board-button" onClick={this.toggleWhiteBoard}></i>
            <div  className={`whiteboard${isWhiteBoardVisible ? "" : "hidden"}`} >     
             <textarea id="whiteboard" className="text-area" cols="23" rows="14"> </textarea>                          
            </div>  
      </div>


      </div>


    )
  }
}

export default withRouter(JSEditor);