import React, {Component} from 'react';
import { Dialog } from 'material-ui';
import renderPending from '../decorators/renderPending';
import Videos from './Videos';

export default class ReleaseDialog extends Component {
  render() {
    const { release, pending } = this.props;
    const standardActions = [
      { text: 'Close' }
    ];        
    
    if (!release) {
      return null;
    }
    
    return (
      <Dialog
        title={ `Watch ${release.title}: ${release.subtitle}` }
        actions={ standardActions }
        modal={ true }
        defaultOpen={ true }
        onRequestClose = { ::this.props.onRequestClose }
        actionFocus="submit">
        <Videos urls={ release.videoUrls } pending={ pending } />
      </Dialog>      
    );  
  }

}