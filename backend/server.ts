import dotenv from "dotenv";
import { passport } from "./core/passport";

dotenv.config();

import express from "express";
import "./core/db";

import { UserCtrl } from "./controllers/UserController";
import { registerValidations } from "./validations/register";
import { TweetCtrl } from "./controllers/TweetsController";
import { createTweetValidations } from "./validations/createTweet";

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.get("/users", UserCtrl.index);
app.get("/users/me", passport.authenticate("jwt"), UserCtrl.getUserInfo);
app.get("/users/:id", UserCtrl.show);

app.get("/tweets", TweetCtrl.index);
app.get("/tweets/:id", TweetCtrl.show);
app.delete("/tweets/:id", passport.authenticate("jwt"), TweetCtrl.delete);
app.post("/tweets", passport.authenticate("jwt"), createTweetValidations, TweetCtrl.create);

app.post("/auth/register", registerValidations, UserCtrl.create);
app.post("/auth/register", registerValidations, UserCtrl.verify);
app.post("/auth/login", passport.authenticate("local"), UserCtrl.afterLogin);

app.listen(process.env.PORT || 8888, (): void => {
    console.log("SERVER RUNNING!")
});