import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReleasesActions from '../actions/releases';
import { GridList } from 'material-ui';
import Release from '../components/Release';
import ReleaseDialog from '../components/ReleaseDialog';
import renderPending from '../decorators/renderPending';

@connect(
  state => state.releases,
  dispatch => ({ actions: bindActionCreators(ReleasesActions, dispatch) })
)
@renderPending
export default class Releases extends Component {
  componentDidMount() {
    this.props.actions.fetchReleases();
  }
  
  render() {
    const { items, activeReleasePending, activeRelease } = this.props;

    return (
      <div>
        <GridList cols={ 8 } cellHeight={ 160 } style={{ padding: 15 }} padding={ 15 }>
          { items.map(release => <Release key={ release.id } release={ release } onClick={ ::this.onClickRelease } />) }
        </GridList>
        <ReleaseDialog onRequestClose={ ::this.onCloseRelease } release={ activeRelease } pending={ activeReleasePending } />
      </div>
    );
  }
  
  onClickRelease(release) {
    this.props.actions.openRelease(release);
  }
  
  onCloseRelease() {
    this.props.actions.closeRelease();
  }
}