/* global Backend */
import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleUsername(e) {
    setUsername(e.target.value);
  }
  
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  async function handleLogin(e) {
    const BASE_URL = "http://localhost:7001";

    console.log(username);
    e.preventDefault();
    const backend = new Backend(BASE_URL);
    try {
      const result = await backend.post("/user/login", { username, password });
      if (result.success) {
        console.log(result)
        window.sessionStorage.setItem("isAuthorized", "yes");
        window.location.href = "/";
      } else {
        window.alert(result.error.message);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleLogin} noValidate>
          <TextField
            onChange={handleUsername}
            value={username}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoComplete='username'
            autoFocus
          />
          <TextField
            onChange={handlePassword}
            value={password}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onSubmit={handleLogin}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}
// async function handleLogin(e) {
//   const BASE_URL = "http://localhost:7001";

//   console.log(username);
//   e.preventDefault();
//   var myHeaders = new Headers();
//   myHeaders.append("Accept", "application/json");
//   myHeaders.append("Content-Type", "application/json");

//   var requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: JSON.stringify({
//       username,
//       password,
//       key: "d88b8076-3c3f-41cf-9fc3-ca3e923c009a",
//     }),
//     redirect: "follow",
//   };
//   fetch(BASE_URL + "/user/login", requestOptions)
//     .then((response) => response.text())
//     .then((result) => {
//       if (result.status === "OK") {
//         sessionStorage.setItem("isAuthorized", "yes");
//         window.location.reload(false);
//       }

//       console.log(result);
//     })
//     .catch((error) => console.log("Unable to sign in", error));
// }
