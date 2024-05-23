import { React, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as yup from "yup";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password  is required"),
});

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/"></Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const [errorAlert, setErrorAlert] = useState({});

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      await loginSchema.validate(
        {
          email: data.get("email"),
          password: data.get("password"),
        },
        { abortEarly: false }
      );
    } catch (error) {
      if (error.name === "ValidationError") {
        error.inner.forEach((error) => {
          setErrorAlert((prevState) => ({
            ...prevState,
            [error.path]: error.message,
          }));
        });

        setTimeout(() => {
          setErrorAlert({});
        }, 3000);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            POS Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={
                errorAlert.hasOwnProperty("email")
                  ? errorAlert["email"]
                  : "Email"
              }
              name="email"
              autoComplete="email"
              autoFocus
              sx={{
                "& label": {
                  color: errorAlert.hasOwnProperty("email") ? "red" : "inherit",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errorAlert.hasOwnProperty("email")
                      ? "red"
                      : "inherit",
                  },
                  "&:hover fieldset": {
                    borderColor: errorAlert.hasOwnProperty("email")
                      ? "red"
                      : "inherit",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errorAlert.hasOwnProperty("email")
                      ? "red"
                      : "inherit",
                  },
                },
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={
                errorAlert.hasOwnProperty("password")
                  ? errorAlert["password"]
                  : "Password"
              }
              type="password"
              id="password"
              autoComplete="current-password"
              sx={{
                "& label": {
                  color: errorAlert.hasOwnProperty("password")
                    ? "red"
                    : "inherit",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errorAlert.hasOwnProperty("password")
                      ? "red"
                      : "inherit",
                  },
                  "&:hover fieldset": {
                    borderColor: errorAlert.hasOwnProperty("password")
                      ? "red"
                      : "inherit",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errorAlert.hasOwnProperty("password")
                      ? "red"
                      : "inherit",
                  },
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2"></Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2"></Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
