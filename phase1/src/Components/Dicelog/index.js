import React from 'react';
import './styles.css';

class Dicelog extends React.Component {
  render() {
    return (
      <div className="Dicelog log">
        <p>
          {this.props.outputText}
        </p>
      </div>
    );
  }
}

export default Dicelog;