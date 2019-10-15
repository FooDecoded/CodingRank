import React from 'react'
import {connect} from 'react-redux';
import VideoBar from './VideoBar'
import SharedEditor from './SharedEditor'
import SharedWhiteBoard from './SharedWhiteBoard'
import editor1 from './../../editor2.jpg'
import { createCollobrationSpace, joinCollobrationSpace } from '../../util/collobration_space_api_util'
import openSocket from 'socket.io-client';
var io = openSocket('http://localhost:5000');
var socket = io.connect();

class CollaborationSpace extends React.Component {
    constructor(props){
        super(props);
        this.createCollobrationSpace = this.createCollobrationSpace.bind(this)
        this.state = {
            sharedSpace: null
        }
    }

    componentDidMount(){
        // console.log(this.props.match.params.id)
        // console.log("adsdasdasdas", this.props.match.params.id )
        if(this.props.match.params.id){
            // debugger
            socket.emit('join', {spaceId: this.props.match.params.id, userId: this.props.userId});
            joinCollobrationSpace(this.props.match.params.id).then(({data}) => {
                // debugger
            this.setState({sharedSpace: data})
        })}
    }

    createCollobrationSpace(){
        createCollobrationSpace()
        .then(
            ({data}) => {
                // debugger
                this.props.history.push(`/collab-space/${data._id}`)
            }
        )
    }

    render (props){

    // console.log(this.state.sharedSpace)
    
    return (
        this.state.sharedSpace && <div>
            <button onClick={this.createCollobrationSpace}>Create Collobration Space</button>
            <div className="editor-video-cont"> 
            
            <SharedWhiteBoard sharedSpace={this.state.sharedSpace} socket={socket}/>


            <div className="room-info" > 
            <p> Your Room Number: {this.state.sharedSpace._id}</p>
            <p> Profile </p>
            </div>
            <SharedEditor sharedSpace={this.state.sharedSpace} socket={socket}/>
          
            <VideoBar sharedSpace={this.state.sharedSpace} socket={socket} userId={this.props.userId}/>
            sharedSpace
            </div>
            <img id="background-image" src={editor1} ></img>

        </div>
    )
}
}

function msp(state){
    return {
        userId: state.session.user.id
    }
}

export default connect(msp, null)(CollaborationSpace)