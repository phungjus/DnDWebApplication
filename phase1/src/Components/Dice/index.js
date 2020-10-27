import React from 'react';
import './styles.css';

class Dice extends React.Component {
  render() {
    const { gridClass } = this.props;
    return (
      <button className={gridClass} onClick={this.props.onClick}>
        {gridClass}
      </button>
    );
  }
}

export default Dice;