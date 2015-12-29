import { LOAD_RELEASES, LOAD_RELEASES_COMPLETED, OPEN_RELEASE, CLOSE_RELEASE, OPEN_RELEASE_COMPLETED } from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';

export function fetchReleases() {
  return dispatch => {
    dispatch(loadReleases());
    
    return fetch('https://couch-parser-0xf013.c9users.io:8081/releases')
      .then(response => response.json())
      .then(json => dispatch(loadReleasesComplete(json)));
  }
}

export function openRelease(release) {
  return dispatch => {
    dispatch(beginOpenRelease(release));
    
    return fetch('https://couch-parser-0xf013.c9users.io:8081/releases?id=' + release.id)
      .then(response => response.json())
      .then(json => dispatch(openReleaseComplete(json)));
  };
}

export function closeRelease() {
  return { type: CLOSE_RELEASE };
}

function loadReleases() {
  return { type: LOAD_RELEASES };
}

function loadReleasesComplete(json) {
  return { type: LOAD_RELEASES_COMPLETED, items: json };
}

function beginOpenRelease(release) {
  return { type: OPEN_RELEASE, release: release };
}

function openReleaseComplete(json) {
  return { type: OPEN_RELEASE_COMPLETED, urls: json };
}