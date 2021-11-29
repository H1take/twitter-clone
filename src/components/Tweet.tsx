import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import { Paper, Typography, IconButton, Avatar } from "@material-ui/core";
import CommentIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import RepostIcon from "@material-ui/icons/RepeatOutlined";
import LikeIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ShareIcon from "@material-ui/icons/ReplyOutlined";
import { useHomeStyles } from "../pages/Home/theme";

interface TweetProps {
  _id: string;
  text: string;
  user: {
    fullname: string;
    username: string;
    avatarUrl: string;
  };
  classes: ReturnType<typeof useHomeStyles>;
}

export const Tweet: React.FC<TweetProps> = ({
  _id,
  classes,
  text,
  user,
}: TweetProps): React.ReactElement => {
  return (
    <Link className={classes.tweetWrapper} to={`/home/tweet/${_id}`}>
      <Paper
        className={classNames(classes.tweet, classes.tweetsHeader)}
        variant="outlined"
      >
        <Avatar
          className={classes.tweetAvatar}
          alt={`Аватарка пользователя ${user.fullname}`}
          src={user.avatarUrl}
        />
        <div>
          <Typography>
            <b>{user.fullname}</b> &nbsp;
            <span className={classes.tweetUserName}>@{user.username}</span>
            &nbsp;
            <span className={classes.tweetUserName}>·</span>&nbsp;
            <span className={classes.tweetUserName}>1ч</span>
          </Typography>
          <Typography variant="body1" gutterBottom>
            {text}
          </Typography>
          <div className={classes.tweetFooter}>
            <div>
              <IconButton color="primary">
                <CommentIcon style={{ fontSize: 20 }} />
              </IconButton>
              <span>1</span>
            </div>
            <div>
              <IconButton color="primary">
                <RepostIcon style={{ fontSize: 16 }} />
              </IconButton>
            </div>
            <div>
              <IconButton color="primary">
                <LikeIcon style={{ fontSize: 16 }} />
              </IconButton>
            </div>
            <div>
              <IconButton color="primary">
                <ShareIcon style={{ fontSize: 16 }} />
              </IconButton>
            </div>
          </div>
        </div>
      </Paper>
    </Link>
  );
};
