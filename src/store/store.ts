import Vue from 'vue';
import Vuex from 'vuex';
import { IUserState } from './module/user';

Vue.use(Vuex);

export interface IRootState {
  user: IUserState;
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({});

