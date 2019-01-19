import React, { Component } from 'react';
import styled from 'styled-components';
import InputText from '../../atoms/InputText';
import Color from '../../atoms/Color';
import Sticker from '../../atoms/Sticker';
import CopyButton from "../../atoms/CopyButton";
import './ColorConverter.css';

// const gradient = (direction, from, to) => `background-image: linear-gradient(${direction}, ${from} , ${to});`;

class ColorConverter extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.getInputColor = this.getInputColor.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  defaultColor = 'rgb(152,204,211)';
  isColor = value => !!value.match(/(#([\da-f]{3}){1,2}|(rgb|hsl)a\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb|hsl)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/i);
  isHex = value => !!value.match(/#([\da-f]{3}){1,2}/i);
  isRgbOrRgba = value => !!value.match(/((rgb)a\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/i);

  getInitialState() {
    return {
      colors: {
        inputColor: '#AE0000',
        outputColor: ''
      }
    }
  }

  getInputColor(color) {
    this.setState({
      colors: {
        inputColor: color,
        outputColor: this.parseColor(color)
      }
    });
  }

  removeTrans(str){
    const [c] = str.split('+');
    return c;
  }

  decToHex(num){
    const n = parseInt(num).toString(16).toUpperCase();
    return n.length === 1 ? '0' + n : n;
  }

  parseColor(value){
    const [color, trans] = value.split('+');

    if (this.isColor(color))
      return this.isHex(color)
        ? this.hexToRgb(`${color}${!!trans ? '+' + trans : ''}`)
        : this.isRgbOrRgba(color)
          ? this.rgbToHex(color)
          : this.defaultColor;

    return 'grey';
  }

  rgbToHex(rgb){
    const color = rgb.match(/(\d{1,3},\d{1,3},\d{1,3}){1}/i);

    if(!!color) {
      const [c] = color;
      const [r, g, b] = c.split(',');
      const setLimit = n => +n > 255 ? '255' : n;
      const toHex = (r, g, b) => [r, g, b].map(c => this.decToHex(setLimit(c))).join('');

      return !!r && !!g && !!b
        ? `#${toHex(r,g,b)}`
        : this.defaultColor;
    }

    return this.defaultColor;
  }

  hexToRgb(hexColor){
    const col = hexColor.match(/\w{3,6}/i);

    if(!!col) {
      const [h] = col;
      const elements = h.split('').length;

      if(elements % 2 !== 0 || elements === 6) {
        const hex = elements === 3 ? [...h].map(e => e + e).join('') : h;
        const rgb = hex.match(/[\s\S]{1,2}/g).map(n => parseInt(n, 16).toString(10)).join(',');
        const [color, ...trans] = hexColor.split('+');
        return !!color && !!(trans.join(''))
          ? `rgba(${rgb},${trans})`
          : `rgb(${rgb})`;
      }
    }

    return this.defaultColor;
  }

  copyToClipboard() {
    const text = this.state.colors.outputColor;
    const event = 'copy';

    const handler = e => {
      e.clipboardData.setData('text/plain', text);
      e.preventDefault();
      document.removeEventListener(event, handler, true);
    };

    document.addEventListener(event, handler, true);
    document.execCommand(event);
  }


  render() {
    const {inputColor, outputColor} = this.state.colors;

    return (
      <div className={ 'wrapper-color-converter' }>
        <div className={'color-converter-shadows'}>
          <div><div/></div>
          <div><div/></div>
          <div><div/></div>
        </div>
        <div className={ 'color-converter' }>

          <div className={'color-input-container'}>
            <InputText
              placeholder={'Type #FFF+0.5 or rgba(255,255,255,0.5)'}
              valueHandler={ this.getInputColor }
            />
          </div>
          <div className={'color-output-label-container'}>
            <label>{ outputColor }</label>
          </div>

          <div className={'color-output-container'}>
            <div>
              <Color
                backgroundColor={
                  this.isColor(inputColor)
                    ? this.removeTrans(inputColor)
                    : '#AE0000'
                }
              />
            </div>
            <div>
              <Sticker backgroundColor={'#D89F00'}/>
            </div>
            <div>
              <Color
                backgroundColor={!!outputColor ? outputColor : '#008072'}
              />
            </div>
          </div>

          <CopyButton
            text={'Copy to clipboard'}
            handler={this.copyToClipboard}
          />
        </div>
      </div>
    );
  }
}

export default ColorConverter;