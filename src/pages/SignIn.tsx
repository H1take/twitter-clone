import React from "react";

import { ModalBlock } from "../components/ModalBlock";

import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import TwitterIcon from "@material-ui/icons/Twitter";
import SearchIcon from "@material-ui/icons/Search";
import PeopleIcon from "@material-ui/icons/PeopleOutline";
import MessageIcon from "@material-ui/icons/ModeCommentOutlined";
import { Button, makeStyles, Typography } from "@material-ui/core";

export const useStylesSignIn = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    height: "100vh"
  },
  buttons: {
    borderRadius: 20,
    marginBottom: 14,
    fontWeight: 600
  },
  blueSide: {
    display: "flex",
      alignItems: "center",
      justifyContent: "center",
    backgroundColor: "#71C9F8",
    flex: "0 0 50%",
    overflow: "hidden",
    position: "relative"
  },
  blueSideListInfo: {
    position: "relative",
    width: 380,
    listStyle: "none",
    padding: 0,
    margin: 0,
    "& h6": {
      display: "flex",
      alignItems: "center",
      color: "white",
      fontWeight: 700,
      fontSize: "20px"
    }
  },
  blueSideListInfoItem: {
    marginBottom: 40
  },
  blueSideBigIcon: {
    width: "320%",
    height: "320%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    left: "70%",
    top: "70%",
  },
  blueSideListInfoIcon: {
    fontSize: 32,
    marginRight: 15
  },
  loginSide: {
    display: "flex",
      alignItems: "center",
      justifyContent: "center",
    flex: "0 0 50%",
  },
  loginSideTwitterIcon: {
    fontSize: 45
  },
  loginSideWrapper: {
    width: "380px"
  },
  loginSideTitle: {
    fontWeight: 700,
    fontSize: 32,
    marginBottom: 45,
    marginTop: 20
  },
  loginSideField: {
    marginBottom: 18,
  },
  registerField: {
    marginBottom: theme.spacing(5),
  },
  loginFormControl: {
    marginBottom: theme.spacing(2),
  }
}));

export const SignIn: React.FC = (): React.ReactElement => {

    const classes = useStylesSignIn();

    const [visibleModal, setVisibleModal] = React.useState<"signIn" | "signUp">();

    const handleClickOpenSignIn = (): void => {
      setVisibleModal("signIn");
    };

    const handleClickOpenSignUp = (): void => {
      setVisibleModal("signUp");
    };

    const handleCloseModal = (): void => {
      setVisibleModal(undefined);
    };


    return(
        <div className={classes.wrapper}>
           <section className={classes.blueSide}>
           <TwitterIcon className={classes.blueSideBigIcon} color="primary" />
             <ul className={classes.blueSideListInfo}>
               <li className={classes.blueSideListInfoItem}><Typography variant="h6"><SearchIcon className={classes.blueSideListInfoIcon}/>Читайте о том, что вам интересно.</Typography></li>
               <li className={classes.blueSideListInfoItem}><Typography variant="h6"><PeopleIcon className={classes.blueSideListInfoIcon}/>Узнайте, о чем говорят в мире.</Typography></li>
               <li className={classes.blueSideListInfoItem}><Typography variant="h6"><MessageIcon className={classes.blueSideListInfoIcon}/>Присоединяйтесь к общению.</Typography></li>
             </ul>
           </section>
           <section className={classes.loginSide}>
             <div className={classes.loginSideWrapper}>
              <TwitterIcon className={classes.loginSideTwitterIcon} color="primary" />
              <Typography className={classes.loginSideTitle} variant="h4">Узнайте, что происходит в мире прямо сейчас</Typography>
              <Typography><b>Присоединяйтесь к Твиттеру прямо сейчас!</b></Typography>
              <br />
              <Button
                className={classes.buttons}
                onClick={handleClickOpenSignUp}
                style={{ marginBottom: 20 }}
                variant="contained"
                color="primary"
                fullWidth
              >
                Зарегистрироваться
              </Button>
              <Button 
                className={classes.buttons} 
                onClick={handleClickOpenSignIn} 
                variant="outlined" 
                color="primary" 
                fullWidth
              >
                Войти
              </Button>
              <ModalBlock
                visible={visibleModal === 'signIn'}
                onClose={handleCloseModal}
                classes={classes}
                title="Войти в аккаунт">
                <FormControl className={classes.loginFormControl} component="fieldset" fullWidth>
                  <FormGroup aria-label="position" row>
                    <TextField
                      className={classes.loginSideField}
                      autoFocus
                      id="email"
                      label="E-Mail"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                      type="email"
                      fullWidth
                    />
                    <TextField
                      className={classes.loginSideField}
                      autoFocus
                      id="password"
                      label="Пароль"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                      type="password"
                      fullWidth
                    />
                    <Button onClick={handleCloseModal} variant="contained" color="primary" fullWidth>
                      Войти
                    </Button>
                      </FormGroup>
                  </FormControl>
                </ModalBlock>
                <ModalBlock
                  visible={visibleModal === 'signUp'}
                  onClose={handleCloseModal}
                  classes={classes}
                  title="Создайте учетную запись">
                <FormControl className={classes.loginFormControl} component="fieldset" fullWidth>
                  <FormGroup aria-label="position" row>
                    <TextField
                      className={classes.registerField}
                      autoFocus
                      id="name"
                      label="Имя"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                      type="name"
                      fullWidth
                    />
                    <TextField
                      className={classes.registerField}
                      autoFocus
                      id="email"
                      label="E-Mail"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                      type="email"
                      fullWidth
                    />
                    <TextField
                      className={classes.registerField}
                      autoFocus
                      id="password"
                      label="Пароль"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                      type="password"
                      fullWidth
                    />
                    <Button variant="contained" color="primary" fullWidth>
                      Далее
                    </Button>
                  </FormGroup>
                </FormControl>
              </ModalBlock>
             </div>
           </section>
        </div>
    );
};