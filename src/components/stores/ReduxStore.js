import { createStore } from "redux";
import rootReducer from "../reducers/index";

const ReduxStore = createStore(rootReducer);
export default ReduxStore;
