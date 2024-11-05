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
  CircularProgress,
  Container,
  IconButton
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm } from "react-hook-form";
import Icon from "@mui/material/Icon";
import { styled } from '@mui/material/styles';

// Définir les styles avec styled
const Paper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
}));

const FormStyled = styled(FormControl)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
}));

const FormHide = styled(FormControl)({
  display: "none",
});

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <Link color="inherit" href="/">
      Levi's CineList
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Contact() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onBlur",
  });
  const [data, setData] = useState({});
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper>
        <AvatarStyled>
          <LockOutlinedIcon />
        </AvatarStyled>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <FormStyled
          component="form"
          noValidate
          onSubmit={handleSubmit(() => {
            setResult("Your form is successfully sent");
            setLoading(false);
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
                {...register("name", {
                  required: "First name is required!",
                  pattern: {
                    value: /^[^\d]+$/,
                    message: "You must provide a valid name!",
                  },
                  maxLength: {
                    value: 12,
                    message: "Your name must be less than 12 characters",
                  },
                })}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
              />
            </Grid>
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
                {...register("email", {
                  required: "You must provide an email address!",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "You must provide a valid email address!",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password", {
                  required: "You must provide a password.",
                  minLength: {
                    value: 6,
                    message: "Your password must be at least 6 characters long",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
              />
            </Grid>
          </Grid>
          <FormControlLabel
            control={
              <Checkbox
                {...register("remember")}
                color="primary"
                defaultValue={false}
              />
            }
            label="Remember me"
          />
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleClick}
            endIcon={<Icon>send</Icon>}
          >
            Send
          </SubmitButton>
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
          <Box mt={2}>{loading && <CircularProgress />}</Box>
        </FormStyled>
      </Paper>
      <Box mt={8}>
        <Typography variant="h6" align="center">
          {result}
        </Typography>
        <Copyright />
      </Box>
    </Container>
  );
}
