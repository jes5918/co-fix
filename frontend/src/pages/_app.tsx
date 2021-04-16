import React from "react";
import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import reducer from "../common/_reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";

const App = ({ Component, store }) => {
	return (
		<Provider store={store}>
			<Component />
		</Provider>
	);
};

const configureStore = (initialState: any, options: any) => {
	const middlewares = []; // 미들웨어들을 넣으면 된다.
	const enhancer =
		process.env.NODE_ENV === "production"
			? compose(applyMiddleware(...middlewares))
			: composeWithDevTools(applyMiddleware(...middlewares));
	const store = createStore(reducer, initialState, enhancer);
	return store;
};

export default withRedux(configureStore)(App);
