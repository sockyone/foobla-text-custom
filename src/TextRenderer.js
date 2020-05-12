import React from 'react';
import axios from 'axios';

export default class TextRenderer extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // load font
        // load every fonts we have
        let fonts = this.props.texts.map(e => {
            return {
                name: e.font.name,
                path: e.font.path
            }
        })

        //console.log({fonts})
        let promises = []
        for (let font of fonts) {
            //load font
            promises.push(new FontFace(font.name, `url(${"http://localhost:3333" + font.path})`).load().then((loaded_face)=>{
                document.fonts.add(loaded_face)
            }))
        }
        Promise.all(promises).then(()=>this.props.renderFn())
    }
    
    render() {

        return (
            <div style={{position: "absolute", top: "0px", "left": "0px"}}>
                <canvas style={{position: "absolute", top: "0px", left:"0px", width: "300px", height:"300px"}} ref={this.props.textCanvas} width={600} height={600} />
                <canvas style={{position: "absolute", top: "0px", left:"0px", display: "none"}} ref={this.props.fullSizeTextCanvas} width={1500} height={1500} />
                <canvas style={{position: "absolute", top: "0px", left:"0px", display: "none"}} ref={this.props.printer} width={1500} height={1500}/>
            </div>
        )
        
    }

}