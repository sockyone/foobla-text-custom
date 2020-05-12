import React, {useRef, useState, useEffect} from 'react';
import axios from 'axios';
import TextRenderer from './TextRenderer'


function render(inputValues, textSettings, textCanvas, fullSizeTextCanvas, template) {
    if (!(fullSizeTextCanvas.current)) return
    if (!(textCanvas.current)) return
    fullSizeTextCanvas.current.width = template.baseWidth
    fullSizeTextCanvas.current.width = template.baseHeight
    let rawTextCtx = fullSizeTextCanvas.current.getContext("2d")
    let textCanvasWidth = textCanvas.current.width
    let textCanvasHeight = textCanvas.current.height
    let fullSizeTextCanvasWidth = fullSizeTextCanvas.current.width
    let fullSizeTextCanvasHeight = fullSizeTextCanvas.current.height
    rawTextCtx.clearRect(0, 0, fullSizeTextCanvasWidth, fullSizeTextCanvasHeight)
    for (let i = 0; i < textSettings.length; i++) {
        let textSetting = textSettings[i]
        let currentText = inputValues[i]
        rawTextCtx.fillStyle = textSetting.font.color
        rawTextCtx.textBaseline = textSetting.font.position.textBaseline
        rawTextCtx.textAlign = textSetting.font.position.textAlign
        rawTextCtx.font = `${textSetting.font.size}px ${textSetting.font.name}`
        rawTextCtx.fillText(currentText, textSetting.font.position.x, textSetting.font.position.y)
    }
    // ctx.fillStyle = "white";
    // ctx.textBaseline = "top";
    // ctx.font = `bold 225px Amatic-Bold`;
    // ctx.textAlign = 'center';
    // ctx.fillText(this.value1, 730, 280);
    // ctx.font = `bold 362px Wreath_Haftone`;
    // ctx.fillText(this.value2, 750, 400);
    let textCtx = textCanvas.current.getContext("2d")
    textCtx.clearRect(0, 0, textCanvasWidth, textCanvasWidth)
    textCtx.drawImage(fullSizeTextCanvas.current, 0, 0, textCanvasWidth, textCanvasHeight)
}

function print() {

}


export default function TemplateRenderer(props) {
    const [state, setState] = useState({ inputValues: ((props.template || {texts: []}).texts).map(e=>e.default) });
    let baseImgRef = useRef(null);
    let textCanvas = useRef(null);
    let fullSizeTextCanvas = useRef(null);
    let printer = useRef(null);

    useEffect(()=>{
        if (state.inputValues.length == 0) {
            //try to update from props
            setState({ inputValues: ((props.template || {texts: []}).texts).map(e=>e.default) })
        }
        render(state.inputValues, (props.template || {texts: []}).texts, textCanvas, fullSizeTextCanvas, props.template)
    }, [state])

    let myRender = () => {
        return render(state.inputValues, (props.template || {texts: []}).texts, textCanvas, fullSizeTextCanvas, props.template)
    }

    return (
        <div>
            <div>
                {
                    props.template ? 
                    <div>
                        {
                            props.template.texts.map((el, idx)=>{
                                return (
                                    <input key={idx} value={state.inputValues[idx]} onChange={(event) => setState({
                                        inputValues: [...state.inputValues].map((e, index)=>{
                                            if (idx == index) {
                                                console.log(el.maxChars)
                                                if (event.target.value.length > el.maxChars) return e
                                                else return event.target.value
                                            }
                                            else return e
                                        })
                                    })}/>
                                )
                            })
                        }
                        <div style={{position: "relative"}}>
                            <img src={"http://localhost:3333" + props.template.baseImg} style={{width: "300px", height: "300px"}} />
                            <TextRenderer texts={props.template.texts} baseImgRef={baseImgRef} textCanvas = {textCanvas} fullSizeTextCanvas = {fullSizeTextCanvas} renderFn = {myRender}/>
                        </div>
                    </div>

                    :
                    null
                }
            </div>
        </div>
    )
}