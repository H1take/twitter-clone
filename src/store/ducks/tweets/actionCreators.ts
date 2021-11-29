import { Action } from "redux";
import { LoadingState, Tweet, TweetsState } from "./contracts/state";

export enum TweetsActionTypes {
    SET_TWEETS = "tweets/SET_TWEETS",
    FETCH_TWEETS = "tweets/FETCH_TWEETS",
    FETCH_ADD_TWEET = "tweets/FETCH_ADD_TWEET",
    ADD_TWEET = "tweets/ADD_TWEET",
    SET_LOADING_STATE = "tweets/SET_LOADING_STATE"
};

export interface SetTweetsActionInterface extends Action<TweetsActionTypes> {
    type: TweetsActionTypes.SET_TWEETS,
    payload: TweetsState["items"]
};

export interface FetchAddTweetActionInterface extends Action<TweetsActionTypes> {
    type: TweetsActionTypes.FETCH_ADD_TWEET,
    payload: string
};

export interface SetTweetsLoadingStateActionInterface extends Action<TweetsActionTypes> {
    type: TweetsActionTypes.SET_LOADING_STATE,
    payload: LoadingState
};

export interface FetchTweetsActionInterface extends Action<TweetsActionTypes> {
    type: TweetsActionTypes.FETCH_TWEETS,
};

export interface addTweetActionInterface extends Action<TweetsActionTypes> {
    type: TweetsActionTypes.ADD_TWEET,
    payload: Tweet
};

export const setTweets = (payload: TweetsState["items"]): SetTweetsActionInterface => ({
    type: TweetsActionTypes.SET_TWEETS,
    payload
});

export const fetchAddTweet = (payload: string): FetchAddTweetActionInterface => ({
    type: TweetsActionTypes.FETCH_ADD_TWEET,
    payload
});

export const addTweet = (payload: Tweet): addTweetActionInterface => ({
    type: TweetsActionTypes.ADD_TWEET,
    payload
});

export const setTweetsLoadingState = (payload: LoadingState): SetTweetsLoadingStateActionInterface => ({
    type: TweetsActionTypes.SET_LOADING_STATE,
    payload
});

export const fetchTweets = (): FetchTweetsActionInterface => ({
    type: TweetsActionTypes.FETCH_TWEETS,
});

export type TweetsActions = 
    SetTweetsActionInterface |
    FetchTweetsActionInterface |
    SetTweetsLoadingStateActionInterface