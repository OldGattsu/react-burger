import React from 'react';
import styles from './container.module.css';

class Container extends React.Component {
  render() {
    return (
			<div className={styles.container}>
        {this.props.children}
      </div>
    )
  }
}

export default Container;
