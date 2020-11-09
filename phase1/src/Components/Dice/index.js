import React from 'react';
import './styles.css';
import d4 from './static/d4.png'
import d6 from './static/d6.png'
import d8 from './static/d8.png'
import d10 from './static/d10.png'
import d12 from './static/d12.png'
import d20 from './static/d20.png'

class Dice extends React.Component {

  image = (dice) => {
    switch(dice) {
      case "d4" :
        return d4
      case "d6" :
        return d6
      case "d8" :
        return d8
      case "d10" :
        return d10
      case "d12" :
        return d12
      default :
        return d20
    }
  }
  render() {
    const { gridClass } = this.props;
    return (
      <input type="image" alt={gridClass} className={gridClass} onClick={this.props.onClick} src={this.image(gridClass)} />
    );
  }
}

export default Dice;