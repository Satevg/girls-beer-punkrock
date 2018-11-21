import { createStore } from 'redux';

import rootReducer from '../../modules/home/reducers/rootReducer';

const ReduxStore = createStore(rootReducer);
export default ReduxStore;
