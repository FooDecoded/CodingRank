import React from 'react';
import openSocket from 'socket.io-client';
import {connect} from 'react-redux';
import {UnControlled as CodeMirror2} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/moxer.css';
require('codemirror/mode/javascript/javascript');

var io = openSocket('http://localhost:5000');
var socket = io.connect();
var ot = window.ot;

class SharedSpace extends React.Component {
    constructor(props){
        super(props);

    }

    componentDidMount(){
        let EditorClient = ot.EditorClient;
        let SocketIOAdapter = ot.SocketIOAdapter;
        let CodeMirrorAdapter = ot.CodeMirrorAdapter;
        let codeMirrorInstance = this.codeMirrorInstance;
        // socket event
        socket.on('connection', () => { 
            console.log("connected") 
        })
        // custoem event
        
        // socket.join(this.props.sharedSpace._id);
        // ot event
        // socket.
        socket.emit('joinSpace', {spaceId: this.props.sharedSpace._id, userId: this.props.userId});
        socket.on('doc', (obj) => {
            codeMirrorInstance.getDoc().setValue(obj.str);
            this.otInstance =  new EditorClient(
                obj.revision, 
                obj.clients, 
                new SocketIOAdapter(socket),
                new CodeMirrorAdapter(codeMirrorInstance)
            )
    })
}

    render(){
        return (
            <div>
            <CodeMirror2 id="editor"

                value=""

                options={{
                mode: 'javascript',
                theme: 'moxer',
                lineNumbers: true
                }}

                editorDidMount={editor => { this.codeMirrorInstance = editor }}
            />
            </div>
        )
    }
}

function msp(state){
    return {
        userId: state.session.user.id
    }
}

export default connect(msp, null)(SharedSpace)

