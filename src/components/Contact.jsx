import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  makeStyles,
  CircularProgress,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useForm } from "react-hook-form";
import Icon from "@material-ui/core/Icon";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit" href="/">
        Levi-Site
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
    marginTop: theme.spacing(3),
  },
  formHide: {
    display: "none",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Contact() {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
  });
  const [data, setData] = useState({});
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);
  }
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <FormControl
          className={!result ? classes.form : classes.formHide}
          noValidate
          onSubmit={handleSubmit(() => {
            setResult("your formulaire is successefuly send");
          })}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                margin="normal"
                fullWidth
                id="name"
                label="Enter your name"
                name="name"
                type="text"
                autoFocus
                onChange={handleChange}
                inputRef={register({
                  required: "First name is required!",
                  pattern: {
                    value: /^[^\d]+$/,
                    message: "you must provide a valid name!",
                  },
                  maxLength: {
                    value: 12,
                    message: "Your name must be greater than 12 characters",
                  },
                })}
              />
            </Grid>
            {errors["name"] && <Container>{errors["name"].message}</Container>}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                inputRef={register({
                  required: "You must provide the email address!",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "You must provide a valid email address!",
                  },
                })}
              />
            </Grid>
            {errors.email && <Container>{errors.email.message}</Container>}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                inputRef={register({
                  required: "You must provide a password.",
                  minLength: {
                    value: 6,
                    message: "Your password must be greater than 6 characters",
                  },
                })}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            {errors.password && <Container>{errors.password.message}</Container>}
          </Grid>
          <FormControlLabel
            control={
              <Checkbox
                inputRef={register}
                color="primary"
                defaultValue={false}
                name="remember"
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClick}
            endIcon={<Icon>send</Icon>}
          >
            Send
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Box>{loading && <CircularProgress />}</Box>
        </FormControl>
      </Box>
      <Box mt={8}>
        <h2>{result}</h2>
        <Copyright />
      </Box>
    </Container>
  );
}
