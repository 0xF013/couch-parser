import React from 'react';
import { CircularProgress } from 'material-ui';

export default function renderPending(target, key, descriptor) {
  var oldRender = target.prototype.render;
  
  target.prototype.render = function() {
    const { pending } = this.props;
    if (pending) {
      return (
        <div style={{ textAlign: 'center' }}>
          <CircularProgress mode="indeterminate" color={"red"} size={2} />
        </div>      
      );
    }
    
    return oldRender.apply(this, arguments);
  };
}