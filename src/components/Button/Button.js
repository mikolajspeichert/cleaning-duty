import React from 'react';
import styles from './Button.sass';


class Button extends React.Component {
  clicked = () => {
    console.log(this.props.value + " clicked!");
  }

  render() {
    return (
      <div className="button-root" onClick={this.clicked}>
        <p>{this.props.value}</p>
      </div>
    );
  }
}

export default Button;
