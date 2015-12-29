import React, {Component} from 'react';
import { Tabs, Tab } from 'material-ui';
import Releases from './containers/Releases'

export default class Application extends Component {
  render() {
    return (
      <Tabs>
        <Tab label="New Releases" style={{ textAlign: 'center' }} >
          <Releases />
        </Tab>
        <Tab label="All shows" >
          (Tab content...)
        </Tab>
      </Tabs>
    );
  }
}