import { takeLatest, call, put } from "redux-saga/effects";

import { TweetsApi } from "../../../services/api/tweetsApi";
import { FetchAddTweetActionInterface, setTweets, setTweetsLoadingState, TweetsActionTypes } from "./actionCreators";
import { LoadingState, Tweet } from "./contracts/state";

export function* fetchTweetsRequest(): any {
  try {
    const items = yield call(TweetsApi.fetchTweets);
    yield put(setTweets(items))
  } catch(error) {
    yield put(setTweetsLoadingState(LoadingState.ERROR))
  }
};

export function* fetchAddTweetRequest({ payload }: FetchAddTweetActionInterface): any {
  try{
    const data: Tweet = {
      _id: Math.random().toString(36).substr(2),
      text: payload,
      user: {
        fullname: "test",
        username: "user",
        avatarUrl: "https://source.unsplash.com/random/100x100?4"
      }
    };
    const item = yield call(TweetsApi.addTweet, data);
    yield put(setTweets(item))
  } catch(error) {

  }
}

export function* tweetsSaga() {
  yield takeLatest(TweetsActionTypes.FETCH_TWEETS, fetchTweetsRequest);
  yield takeLatest(TweetsActionTypes.FETCH_ADD_TWEET, fetchAddTweetRequest);
};