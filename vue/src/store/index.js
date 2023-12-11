import { createStore as _createStore } from 'vuex';
import axios from 'axios';

export function createStore(currentToken, currentUser) {
  let store = _createStore({
    state: {
      token: currentToken || '',
      user: currentUser || {},
      followingBands: [],
      createBandHeroUrl: "",
      createBandGallery: [],

    },
    mutations: {
      SET_AUTH_TOKEN(state, token) {
        state.token = token;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      },
      SET_USER(state, user) {
        state.user = user;
        localStorage.setItem('user', JSON.stringify(user));
      },
      LOGOUT(state) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        state.token = '';
        state.user = {};
        axios.defaults.headers.common = {};
      },
      RANDOMBANDIMG(state, images) {
        state.images = images;

      },
      FOLLOW_BAND(state, bandId) {
        if (!state.followingBands.includes(bandId)) {
          state.followingBands.push(bandId);
        }
        console.log("Following bands after mutation:", state.followingBands);
      },

      UNFOLLOW_BAND(state, bandId) {
        state.followingBands = state.followingBands.filter(id => id !== bandId);
      },
      CREATE_BAND(state, band) {
        state.band = band;
        
      },
      SET_CREATE_BAND_HERO_URL(state, url) {
        state.createBandHeroUrl = url;
      },
      ADD_BAND_GALLERY(state, url) {
        state.createBandGallery.push(url);
      },
    },

    getters: {
      isBandFollowed: (state) => (bandId) => {
        return state.followingBands.includes(bandId);
      }
    },

  });
  return store;
}

