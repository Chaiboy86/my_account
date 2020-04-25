import {
  // 新たにcreateStoreメソッドを作るため、本来のcreateStoreが被らないように別名でインポート
  createStore as reduxCreateStore,
  // 複数のReducerをまとめるためのライブラリ
  combineReducers,
  // ミドルウェアを適用できるためのライブラリ
  applyMiddleware,
} from "redux";
// デバッグを容易にするためのライブラリ
import logger from "redux-logger";
// 非同期処理のためのライブラリ
import thunk from "redux-thunk";
//　ルーティングを可能にするためのライブラリ
import { connectRouter, routerMiddleware } from "connected-react-router";
// 複数のReducerを全てインポート
import * as reducers from "./reducers";

// TODO: historyが何を含んでいるかを確認
export default function createStore(history) {
  // 実際のReduxのcreateStore処理
  return reduxCreateStore(
    // 複数のReducerをまとめる処理
    combineReducers({
      // スプレッド構文で全てのReducerを展開
      ...reducers,
      // TODO: なぜここでrouterを設定しているかを確認
      router: connectRouter(history),
    }),
    // ミドルウェアを適用するための処理
    applyMiddleware(logger, thunk, routerMiddleware(history))
  );
}
