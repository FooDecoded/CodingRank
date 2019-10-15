import React from 'react';
import { withRouter } from 'react-router-dom';
import './editor.css';
import editor1 from './../../editor2.jpg'
import Countdown from '../timer/timer'
import {UnControlled as CodeMirror2} from 'react-codemirror2'
// import Dropdown from './../dropdown/dropdown'
import DropdownContainer from './../dropdown/dropdown_container'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/moxer.css';

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/ruby/ruby');


// import cd from '../../codemirror/lib/codemirror';


class RubyEditor extends React.Component {
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
    this.props.fetchRubyProblem(this.props.rubyProblem);
    // this.handleSubmitSolution();
  }

  toggleWhiteBoard = () => {
    this.setState(prevState => ({ isWhiteBoardVisible: !prevState.isWhiteBoardVisible}))
  }

  retrieveProblemDescription(){
    this.setState({ description: this.props.problems.description })
  }

  handleSkip(){
    this.props.skipRubyProblem(this.props.rubyProblem[0].orderNumber)
    .then(this.props.fetchRubyProblem(this.props.rubyProblem))
    this.closeResult()

  }

  closeResult(){
    let result = document.getElementsByClassName('result')[0]
    if (result){

      result.className = 'result-hidden'
    }
  }

  handleSubmitSolution(){
    let result = document.getElementsByClassName('result-hidden')[0]
    if (result){
      result.className = 'result'
    }
    let solutionText = document.getElementsByClassName("CodeMirror")[0].CodeMirror.getValue();
    // debugger;
    this.props.createRubySolution(solutionText, this.props.rubyProblem[0]._id )
    // .then(this.displayFailures())

  }

  displayFailures(){
    if (this.props.rubySolutionResult.result && this.props.rubySolutionResult.result.failures.length > 0) 
    
    {
      // debugger
      return (
        <ul  className="messages">
            <p> You have {this.props.rubySolutionResult.result.failures.length} errors: </p> 
          { this.props.rubySolutionResult.result.failures.map(failure => (
            <li> - It should {failure} </li>
          ))}
        </ul>
      )
    }
  }

  displaySuccessMessage(){
    if (this.props.rubySolutionResult.result) 
    
    {
      // debugger
      if ( (this.props.rubySolutionResult.result.passes.length > 0) && (this.props.rubySolutionResult.result.failures.length === 0)  )
      return (
        <div>
        <p> You Got it!! You passed all {this.props.rubySolutionResult.result.passes.length} test cases below: </p>
        <ul className="messages"> 
          { this.props.rubySolutionResult.result.passes.map(failure => (
            <li id="pass-fail"> {failure} </li>
          ))}
        </ul>
        </div>
      )
    }
  }


  displayRunTimeErrors(){
    if ( this.props.rubySolutionResult.runresults ) {
      return (
        <div>
           <ul className="messages"> 
          { this.props.rubySolutionResult.runresults.map(runresult => (
            <li id="pass-fail"> {runresult} </li>
          ))}
        </ul>
        </div>
      )
    }
  }


  render() {
    const { isWhiteBoardVisible } = this.state;
    if (Object.values(this.props.rubyProblem).length === 0){
      return null
    }
            
    return (
       <div >
         <DropdownContainer></DropdownContainer>
        <CodeMirror2 id="editor"

          value={this.props.rubyProblem[0].initialCode}

          options={{
            mode: 'ruby',
            theme: 'moxer',
            lineNumbers: true
          }}

          onChange={(editor, data, value) => {
          }} />
        <img id="background-image" src={editor1} ></img>

      {/* <div id="editorpage-container"> */}
      {/* <span className="training-type"> Ruby </span> */}
            
          <div id="sidebar">
              {/* {/* <div className="question"> */}
                {/* <p> DO NOT DELETE ANYTHING FROM EXISTING SKELETON </p> */}
                {/* <br/> */}
                <p id="question-number">  Question {this.props.rubyProblem[0].orderNumber} </p>

                 <p id="level-number"> Level {this.props.rubyProblem[0].level}</p>
              {/* </div> */}
              <br/> 
              {/* <div id="description"> */}
                 <p id="problem-description">{this.props.rubyProblem[0].description.slice(2)}</p>
                 <br/>
                 <p id="examples"> Examples: </p>
                  {this.props.rubyProblem[0].inputOutput.map(
                   (example, i) => (
                     <li id="example" key={i}> {example} </li>
                   )
                 )} 
                 <br/>  
                 
              </div>

              <div id="inner-sidebar">  
                  {/* <button id="button-question-text">Previous</button>
                      {/* This button should be available only starting the second question */}
                  <button onClick={this.handleSubmitSolution} id="submit-button" > Submit</button>
                      {/* This button should be showing up after the user clicks Run and passes everything */}
                    <br/>
                  <button onClick={this.handleSkip} id="skip-button" >Skip question </button>
                      {/* This button can either make the user move to the next level if he is in the last question or move to next question */}
              </div>
                    {/* <br/>  */}
                   
                    <div className="skip-container" > 
                      {/* <p id="skip-all-questions"> Skip all questions and proceed to next level </p>   */}
                      {/* THIS BUTTON SHOULD BE RESPONSIVE, OR WE SHOULD GET RID OF IT */}
                      {/* <button id="go-next-level"> Go to next level </button>     */}
                    </div>

                    <div className="result-hidden">
                        <p>{this.displayFailures()}</p>
                        <p>{this.displaySuccessMessage()} </p>
                        <p>{this.displayRunTimeErrors()}</p>
                    </div>
            {/* </div>  */}
             
          
            {/* <div className="timer-container">
              <Countdown/>
            </div> */}


         
              {/* <div className="timer-container">
                <Countdown/>
              </div> */}
          
               {/* {  document.getElementsByClassName("CodeMirror")[0].CodeMirror.getValue()} */}




              {/* <div id="buttons-below-editor"> */}
                  <div id="button-run-question"> 
                      <button onClick={this.handleSubmitSolution} id="run-text">Run <i class="material-icons" >play_arrow</i></button>
                  </div>
                 
                  <div id="see-solution">
                    {/* THIS BUTTON SHOULD BE RESPONSIVE, OR WE SHOULD GET RID OF IT */}
                    <button id="solution">Solution</button>
                    {/* <button id="solution-text">Submit all</button> */}
                </div>
              {/* </div>  */}
            

        
      {/* </div> */}

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

export default withRouter(RubyEditor);