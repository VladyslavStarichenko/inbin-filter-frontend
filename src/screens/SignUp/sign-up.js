import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Grid,
  makeStyles,
  Container,
  Button,
  Typography,
} from '@material-ui/core';
import api from '../../api';
import useAuth from '../../hooks/useAuth/useAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    marginTop: '100px',
  },
  buttonSpacing: {
    marginLeft: '100px',
    marginTop: '30px',
  },
  loginBtn: {
    marginTop: '30px',
    marginRight: '40px',
    width: '100%',
    height: '60px',
  },
  input: {
    marginTop: '30px',
  }
}));

function SignUp() {
  const auth = useAuth();
  const classes = useStyles();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setIsLoading(true);
      await api.auth.signup(data);
      const { data: loginData } = await api.auth.login(data);

      auth.setToken(loginData.token);
      auth.setUser(loginData.username);
      localStorage.setItem('token', loginData.token);
      navigate('/profile');
    } catch (e) {
      if (e.response.status === 422) {
        Object.keys(e.response.data.errors).forEach((key) => {
          setError(key, {
            type: "manual",
            message: e.response.data.errors[key],
          });
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">
            Sign up
          </Typography>
        </Grid>
      </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={Boolean(errors.username?.message)}
                    type="username"
                    label="Username"
                    fullWidth
                    variant="filled"
                    helperText={errors.username?.message}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors.password?.message)}
                  type="password"
                  fullWidth
                  className={classes.input}
                  label="Password"
                  variant="filled"
                  helperText={errors.password?.message}
                />
              )}
            />
          </Grid>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.loginBtn}
            disabled={isLoading}
          >
            Sign up
          </Button>
        </form>
    </Container>
  );
}

export default SignUp;
