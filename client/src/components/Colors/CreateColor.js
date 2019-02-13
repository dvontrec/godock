import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createColor } from '../../actions';

class CreateColor extends Component {
  constructor() {
    super();
    this.state = {
      color: '',
      textColor: '',
      r: 0,
      g: 0,
      b: 0,
      a: 100
    };
  }

  getRandomNum(max) {
    const num = Math.floor(Math.random() * max);
    return num;
  }
  randomizeColor = () => {
    const rR = this.getRandomNum(255);
    const rG = this.getRandomNum(255);
    const rB = this.getRandomNum(255);
    this.setState({ r: rR, g: rG, b: rB });
    this.updateColorState();
  };

  updateSlider = e => {
    const Skey = String(e.target.name);
    this.setState({ [Skey]: e.target.value });
    this.updateColorState();
  };

  updateColorState() {
    const r = parseInt(this.state.r);
    const g = parseInt(this.state.g);
    const b = parseInt(this.state.b);
    const a = this.state.a / 100;
    const avgColor = (r + g + b) / 3;
    if (a > 0.55) {
      if (avgColor < 140) {
        this.setState({ textColor: 'white' });
      } else {
        this.setState({ textColor: 'black' });
      }
    }
  }
  componentDidMount() {
    this.randomizeColor();
  }

  submitColorForm = e => {
    e.preventDefault();
    const queryString = `color=${this.state.color}&r=${this.state.r}&g=${
      this.state.g
    }&b=${this.state.b}&a=${this.state.a}`;
    this.props.createColor(queryString);
  };

  render() {
    const colorCode = `rgba(${this.state.r},${this.state.g},${
      this.state.b
    },${this.state.a / 100})`;
    return (
      <div
        className="colorCreator"
        style={{
          backgroundColor: colorCode,
          height: '100vh',
          color: this.state.textColor
        }}
      >
        <div className="container">
          <form action="" onSubmit={this.submitColorForm}>
            <div>
              <label htmlFor="colorName">Color Name</label>
              <input
                type="text"
                name="color"
                value={this.state.color}
                onChange={this.updateSlider}
                required
              />
            </div>
            <div className="color-group">
              <div className="input-group">
                <label>Red </label>
                <input
                  type="number"
                  onChange={this.updateSlider}
                  value={this.state.r}
                  name="r"
                />
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={this.state.r}
                  onChange={this.updateSlider}
                  name="r"
                />
              </div>

              <div className="input-group">
                <label>Green </label>
                <input
                  type="number"
                  onChange={this.updateSlider}
                  value={this.state.g}
                  name="g"
                />
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={this.state.g}
                  onChange={this.updateSlider}
                  name="g"
                />
              </div>
              <div className="input-group">
                <label>Blue </label>
                <input
                  type="number"
                  onChange={this.updateSlider}
                  value={this.state.b}
                  name="b"
                />
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={this.state.b}
                  onChange={this.updateSlider}
                  name="b"
                />
              </div>
              <div className="input-group">
                <label>Alpha/Opacity </label>
                <input
                  type="number"
                  onChange={this.updateSlider}
                  value={this.state.a}
                  name="a"
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={this.state.a}
                  onChange={this.updateSlider}
                  name="a"
                />
              </div>
              <input type="submit" />
            </div>
          </form>
          <button onClick={this.randomizeColor}>Randomize</button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { createColor }
)(CreateColor);
