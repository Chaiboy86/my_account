import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// TODO:説明記載
import { Provider } from "react-redux";
// TODO:説明記載
import { ConnectedRouter } from "connected-react-router";
// TODO:説明記載
import { createHashHistory } from "history";
// createStore.jsで定義した関数を呼び出すためにインポート
import createStore from "./createStore";

// historyのインスタンスを生成
// ルーティングするための履歴情報を保持するインスタンス
const history = createHashHistory();

// Storeの生成
// アプリ全体の状態(state)を管理するストア(store)を生成する
// storeには履歴情報(history)インスタンスを引数として渡す
const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
