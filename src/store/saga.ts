import { all } from "@redux-saga/core/effects";

import { tagsSaga } from "./ducks/tags/sagas";
import { tweetsSaga } from "./ducks/tweets/sagas";
import { tweetSaga } from "./ducks/tweet/sagas";

export default function* rootSaga() {
  yield all([
    tweetsSaga(),
    tweetSaga(),
    tagsSaga()
  ])
}
