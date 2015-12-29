import { LOAD_RELEASES, LOAD_RELEASES_COMPLETED, OPEN_RELEASE, CLOSE_RELEASE, OPEN_RELEASE_COMPLETED } from '../constants/ActionTypes';

const initialState = { 
  items: [],
  pending: false,
  activeRelease: null
};

export default function releases(state = initialState, action) {
  switch (action.type) {
    case LOAD_RELEASES:
      return {
        ...state,
        pending: true,
        items: []
      };
    case LOAD_RELEASES_COMPLETED:
      return {
        ...state,
        pending: false,
        items: action.items
      };
    case OPEN_RELEASE:
      return {
        ...state,
        activeReleasePending: true,
        activeRelease: action.release
      };
    case OPEN_RELEASE_COMPLETED:
      return {
        ...state,
        activeReleasePending: false,
        activeRelease: {
          ...state.activeRelease,
          videoUrls: action.urls
        }
      };
    case CLOSE_RELEASE:
      return {
        ...state,
        activeRelease: null
      };
    default:
      return state;
  }
}