import React from 'react'
import Peer from 'peerjs';

export default class VideoBar extends React.Component {
    constructor(props){
        super(props);

        this.setupPeerJS() 
        this.createCall = this.createCall.bind(this);

        this.props.socket.on('userJoined', (data) => {
            this.createCall(data)
        })
    }

    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
    }

    setupPeerJS(){
        this.id = this.props.userId
        // debugger
        this.peerInstance = new Peer(this.id);
        console.log(this.id)
        this.peerInstance.on('open', () => {
            console.log('connection opened')
        })
        this.peerInstance.on('error', function (err) {
            console.log(err);
            alert(err);
        });
        // Recieve a call
        this.peerInstance.on('call', (call) => {
            // Answer the call automatically (instead of prompting user) for demo purposes     
            console.log("incommming callllllllllllllllllllll")       
            call.answer(window.localStream);
            this.handleCall(call);
            this.currentCall = call
        });
    }

    handleCall(call) {
        if (this.currentCall) {
            this.currentCall.close();
        }
        // console.log('remoteeeeee stream')
        call.on('stream', (remoteStream) => {
            // debugger
            console.log('set thier');
            this.refs.other.srcObject = remoteStream;
        });

        this.currentCall = call
    }

    componentDidMount(){
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        navigator.mediaDevices.getUserMedia({audio: true, video: true})
        .then((stream) => {
            window.localStream = stream
            this.refs.mine.srcObject =  stream;
            this.peerInstance.on('call', (call) => {
                call.answer(stream); 
                this.handleCall(call);
            });
        })
    }

    createCall(data) {
        // this.props.socket.on('userJoined', (data) => {
            // console.log("callllllllllllllllllllllll", data)
            const call = this.peerInstance.call(data.userId, window.localStream);
            call && this.handleCall(call);
        // })
    }

    render(){
        // debugger
        return(
            <div>
                {/* <h1>Video Bar</h1> */}
                <video autoplay="true" ref="mine"></video>
                <video autoplay="true" ref="other"></video>
                <button onClick={this.createCall}>Make a Call Happen</button>
            </div>
        )
    }
}