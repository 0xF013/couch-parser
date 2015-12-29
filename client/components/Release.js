import React, {Component} from 'react';
import { GridTile } from 'material-ui';

export default class Release extends Component {
  render() {
    const { release, onClick } = this.props;
    return (
      <GridTile
        onClick={ () => onClick(release) }
        title={ release.title }
        subtitle={ release.subtitle }
        titleBackground={ 'rgba(0, 0, 0, 0.7)' }
        style={{ backgroundColor: 'black', textAlign: 'center', cursor: 'pointer' }}>
        <div>
          <img src={ release.imageUrl } style={{ width: '100%' }} />
        </div>
      </GridTile>         
    );    
  }
}