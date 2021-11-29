import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";

import {
  Grid,
  Paper,
  Container,
  Typography,
  Button,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Avatar,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import PersonAddIcon from "@material-ui/icons/PersonAddOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHomeStyles } from "./theme";

import { fetchTweets } from "../../store/ducks/tweets/actionCreators";
import { fetchTags } from "../../store/ducks/tags/actionCreators";
import { fetchTweetData } from "../../store/ducks/tweet/actionCreators";
import {
  selectTweetsItems,
  selectIsTweetsLoading,
} from "../../store/ducks/tweets/selectors";

import { Tweet } from "../../components/Tweet";
import { SideMenu } from "../../components/SideMenu";
import { AddTweetForm } from "../../components/AddTweetForm";
import { SearchTextField } from "../../components/SearchTextField";
import { Tags } from "../../components/Tags";
import { BackButton } from "../../components/BackButton";
import { FullTweet } from "./components/FullTweet";

// 619962c026cfdea0aafed319


// не отображается кнопка назад на вкладке твитнуть


export const Home = (): React.ReactElement => {
  const classes = useHomeStyles();
  const dispatch = useDispatch();
  const tweets = useSelector(selectTweetsItems);
  const isLoading = useSelector(selectIsTweetsLoading);

  React.useEffect(() => {
    dispatch(fetchTweets());
    dispatch(fetchTweetData("619962c026cfdea0aafed319"));
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <Container className={classes.wrapper} maxWidth="lg">
      <Grid container spacing={3}>
        <Grid sm={1} md={3} item>
          <SideMenu classes={classes} />
        </Grid>
        <Grid sm={8} md={6} item>
          <Paper className={classes.tweetsWrapper} variant="outlined">
            <Paper className={classes.tweetsHeader} variant="outlined">
              <Route path="/home/:any">
                <BackButton />
              </Route>

              <Route path={["/home", "/home/search"]} exact>
                <Typography variant="h6">Твиты</Typography>
              </Route>

              <Route path="/home/tweet">
                <Typography variant="h6">Твитнуть</Typography>
              </Route>
            </Paper>

            <Route path={["/home", "/home/search"]} exact>
              <Paper>
                <div className={classes.addForm}>
                  <AddTweetForm classes={classes} />
                </div>
                <div className={classes.addFormBottomLine} />
              </Paper>
            </Route>

            <Route path="/home" exact>
              {isLoading ? (
                <div className={classes.tweetsCentred}>
                  <CircularProgress />
                </div>
              ) : (
                tweets.map((tweet) => (
                  <Tweet key={tweet._id} classes={classes} {...tweet} />
                ))
              )}
            </Route>

            <Route path="/home/tweet/:id" component={FullTweet} exact />
          </Paper>
        </Grid>
        <Grid sm={3} md={3} item>
          <div className={classes.rightSide}>
            <SearchTextField
              variant="outlined"
              placeholder="Поиск по Твиттеру"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <Tags classes={classes} />
            <Paper className={classes.rightSideBlock}>
              <Paper
                className={classes.rightSideBlockHeader}
                variant="outlined"
              >
                <b>Кого читать</b>
              </Paper>
              <List>
                <ListItem className={classes.rightSideBlockItem}>
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src="https://i.pinimg.com/originals/bd/6c/2a/bd6c2a2146f9e368abda6b28f7b3f2be.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Dock Of Shame"
                    secondary={
                      <Typography
                        component="span"
                        variant="body2"
                        color="textSecondary"
                      >
                        @FavDockOfShame
                      </Typography>
                    }
                  />
                  <Button color="primary">
                    <PersonAddIcon />
                  </Button>
                </ListItem>
                <Divider component="li" />
              </List>
            </Paper>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};
