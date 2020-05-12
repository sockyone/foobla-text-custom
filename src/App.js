import React from 'react';
import './App.css';
import axios from 'axios';
import TextRenderer from './TextRenderer.js';
import TemplateRenderer from './TemplateRenderer';

class App extends React.Component {

  constructor(props) {
    super(props);
    // this.baseImgCanvas = React.createRef();
    // this.textCanvas = React.createRef();
    // this.fullSizeTextCanvas = React.createRef();
    // this.printer = React.createRef();
    this.state = {
      template: null
    }
    // this.hiddenImage = React.createRef();
  }

  componentDidMount() {
    //load image to canvas
    //load templates: 
    axios.get("http://localhost:3333/get-template")
    .then((res)=>{
      this.setState({
        template: res.data
      })
    })
    // let canvas = this.canvasRef.current;
    // let ctx = canvas.getContext("2d");

    // this.value1 = "";
    // this.value2 = "";

    // this.hiddenImage.current.onload = () => {
    //   let imgWidth = this.hiddenImage.current.width;
    //   let imgHeight = this.hiddenImage.current.height;

    //   console.log({imgHeight, imgWidth});
    //   let imgScaleWidth = imgWidth / 300;
    //   let imageScaleHeight = imgHeight / 300;
    //   ctx.drawImage(this.hiddenImage.current, 0, 0, 600, 600);
    //   ctx.fillStyle = "white";
    //   let amaticBold = new FontFace('Amatic-Bold', `url(${AmaticBold})`);
    //   let wreathHalftone = new FontFace('Wreath_Haftone', `url(${WreathHalftone})`)
    //   ctx.imageSmoothingEnabled = true;
    //   amaticBold.load().then((loaded_face)=>{
    //     document.fonts.add(loaded_face);
    //   });
    //   wreathHalftone.load().then((loaded_face)=>{
    //     document.fonts.add(loaded_face);
    //   });
    // }
  }

  // repaint() {
  //   let ctx = this.canvasRef3.current.getContext("2d");
  //   ctx.clearRect(0,0,1500,1500)
  //   ctx.fillStyle = "white";
  //   ctx.textBaseline = "top";
  //   ctx.font = `bold 225px Amatic-Bold`;
  //   ctx.textAlign = 'center';
  //   ctx.fillText(this.value1, 730, 280);
  //   ctx.font = `bold 362px Wreath_Haftone`;
  //   ctx.fillText(this.value2, 750, 400);
  //   let ctx2 = this.canvasRef2.current.getContext("2d");
  //   ctx2.clearRect(0,0,600,600);
  //   ctx2.drawImage(this.canvasRef3.current, 0, 0, 600, 600);
  // }

  // save() {
  //   let printer = this.printer.current;
  //   let ctx = printer.getContext("2d");
  //   ctx.drawImage(this.hiddenImage.current, 0, 0, 1500, 1500);
  //   ctx.drawImage(this.canvasRef3.current, 0, 0, 1500, 1500);
  //   let newImage = printer.toDataURL("image/png").replace("image/png", "image/octet-stream");
  //   let link = document.createElement('a');
  //   link.href = newImage;
  //   link.download = "mynew.png";
  //   link.click();
  //   link.remove();
  // }

  // makeTextChange(value) {
  //   this.value1 = value;
  //   this.repaint();
  // }

  // makeTextChange2(value) {
  //   this.value2 = value;
  //   this.repaint();
  // }

  render() {
    return (
      <div className="App" style={{ display: "relative" }}>
        <TemplateRenderer template = {(this.state.template || [null, null])[1]} />
      </div>
    );
  }

}

export default App;
