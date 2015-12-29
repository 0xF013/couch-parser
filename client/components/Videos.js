import React, {Component} from 'react';
import renderPending from '../decorators/renderPending';

@renderPending
export default class Videos extends Component {
  render() {
    const { urls } = this.props;
    return (
      <div>{ urls[0] }</div>  
    );
  }

}