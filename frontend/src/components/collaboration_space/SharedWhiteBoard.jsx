import React from 'react'
// var io = openSocket('http://localhost:5000');
// var socket = io.connect();


export default class SharedWhiteBoard extends React.Component {
    constructor(props){
        super(props);

        this.start = {};
        this.drawing = false;
        this.color = '#777777';
        this.drawingMode = "line"
        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.handleMouseMove = this.throttle(this.handleMouseMove.bind(this), 10)
        this.eraseWhiteBoard = this.eraseWhiteBoard.bind(this);
        this.changeDrawingColor = this.changeDrawingColor.bind(this);
    }

    draw(start, end, emit){
        switch(this.drawingMode){
            case 'line':
                this.drawLine(start, end, emit);
                return
            case 'circle':
                this.drawCircle(start, end, emit)
                return
            case 'rectangle':
                this.drawRectangle(start, end, emit)
                return
            case 'text':
                this.drawText(start, end, emit)
                return
            default:
                return;
        }
    }

    eraseWhiteBoard(){
        this.context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
        this.props.socket.emit('eraseWhiteBoard', {spaceId: this.props.sharedSpace._id})
    }

    changeDrawingColor(color, emit){
        this.color = color;
        if(emit){
            this.props.socket.emit('changeColor', {color, spaceId: this.props.sharedSpace._id})
        }
    }

    offset(element) {
        var rect = element.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    drawLine(start, end, emit){
        this.context.beginPath();
        this.context.moveTo(start.x, start.y)
        this.context.lineTo(end.x, end.y)
        this.context.strokeStyle = this.color;
        this.context.lineWidth = 2;
        this.context.stroke()
        this.context.closePath()
// emit is boolean . if i am the emitter, the line is drawn in the other side
        if(emit){
            this.props.socket.emit('drawLine', {start, end, spaceId: this.props.sharedSpace._id})
        }
    }
    
    drawRectangle(start, end, emit){
        if(!this.rectRoot){
            this.rectRoot = start;
            this.prevState = document.createElement('canvas');
            const prevStateContext = this.prevState.getContext('2d');
            this.prevState.width = 600;
            this.prevState.height = 600;
            prevStateContext.drawImage(this.refs.canvas,0, 0)
        }
        if(!this.prevEnd){
            this.prevEnd = {...end}
        }
        const width = Math.abs(this.rectRoot.x - this.prevEnd.x ) + 2
        const height = Math.abs(this.rectRoot.y - this.prevEnd.y ) + 2
        const clearRoot = {
            x: this.rectRoot.x < this.prevEnd.x ? this.rectRoot.x : this.prevEnd.x,
            y: this.rectRoot.y < this.prevEnd.y ? this.rectRoot.y : this.prevEnd.y
        }

        this.context.clearRect(clearRoot.x - 1 , clearRoot.y - 1, width , height )
        this.context.drawImage(this.prevState, 0, 0, 600, 600)
        this.context.beginPath();
        this.context.moveTo(this.rectRoot.x, this.rectRoot.y)
        this.context.lineTo(end.x, this.rectRoot.y)
        this.context.lineTo(end.x, end.y)
        this.context.lineTo(this.rectRoot.x, end.y)
        this.context.strokeStyle = this.color;
        this.context.lineWidth = 1;
        this.context.closePath();
        this.context.stroke();
        this.prevEnd = {...end}

        if(emit){
            this.props.socket.emit('drawRect', {start, end, spaceId: this.props.sharedSpace._id})
        }

        if(!this.drawing && emit){
            this.resetRect()
            this.props.socket.emit('endRect', {flag: true, spaceId: this.props.sharedSpace._id})
        }   
    }
    
    resetRect(){
        this.prevEnd = false;
        this.rectRoot = false;
        this.prevState = false;
    }

    drawText(){

    }

    // Does not keep track continuously
    throttle (callback, delay) {
        var previousCall = new Date().getTime();
        return function() {
          var time = new Date().getTime();
    
          if ((time - previousCall) >= delay) {
            previousCall = time;
            callback.apply(null, arguments);
          }
        };
    }

    handleMouseDown(e){
        this.drawing =  true;
        const offset = this.offset(e.target); 
        this.start = {
            x: e.clientX - offset.left,
            y: e.clientY - offset.top
        }
        this.mouseUp = false;
    }

    handleMouseUp(e){
        if(!this.drawing) { return }
        this.drawing = false;
        const offset = this.offset(e.target); 
        const end = {
            x: e.clientX - offset.left,
            y: e.clientY - offset.top
        }
        this.mouseUp = true;
        this.draw(this.start, end, true)
    }

    handleMouseMove(e){
        if (!this.drawing) { return; }
        const offset = this.offset(e.target); 
        const end = {
            x: e.clientX - offset.left,
            y: e.clientY - offset.top
        }
        this.mouseUp = false;
        this.draw(this.start, end, true);
        this.start = {...end}
    }


    componentDidMount(){
        this.context = this.refs.canvas.getContext("2d");
        this.context.strokeStyle = "#bada55"		
        this.context.fillStyle = "solid" 		
        this.context.lineWidth = 2				
        this.context.lineCap = "round"
        this.props.socket.on('drawLine', (data) => { 
            // console.log(data)
            this.draw(data.start, data.end, false)
        });
        this.props.socket.on('eraseWhiteBoard', (data) => { 
            this.eraseWhiteBoard()
        });
        this.props.socket.on('drawRect', (data) => {
            console.log('in sockeweeeeeeeeeeeeeeeeeeeeeet')
            this.drawRectangle(data.start, data.end, false)
        })

        this.props.socket.on('endRect', () => {
            this.resetRect()
        })

        this.props.socket.on('changeColor', (data) => {
            console.log('change color')
            debugger
            this.color = data.color
        })
    }

    render(){
        return <div>
                <canvas 
                    ref="canvas" 
                    id= "canvas"
                    width="458" 
                    height="600" 
                    onMouseDown={this.handleMouseDown}
                    onMouseUp={this.handleMouseUp}
                    onMouseMove={this.handleMouseMove}
                    style={{border: '1px solid red'}}
                />
                <div className="whiteb-buttons">
                <button onClick={this.eraseWhiteBoard}>erase</button>
                <button onClick={ () => this.changeDrawingColor('red', true) }>red</button>
                <button onClick={ () => this.changeDrawingColor('green', true)}>green</button>
                <button onClick={ () => this.changeDrawingColor('purple', true)}>purple</button>
                <button onClick={ () => this.changeDrawingColor('black', true)}>black</button>
                <button onClick={ () => this.drawingMode = 'rectangle' }>rect</button>
                
                <button onClick={ () => this.drawingMode = 'line' }>line</button>
                </div>
            </div>
    }
}