// Modules
import isEqual from 'lodash/isEqual';
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

// Constants
import { USER_ROLE } from '../../constants/users';

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
  },
  errorBlock: {
    position: 'relative',
    top: '20px',
    color: '#cc0000',
  },
}));

function SignUp() {
  const auth = useAuth();
  const classes = useStyles();
  const navigate = useNavigate();
  const [hasError, setIsHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setIsLoading(true);
      await api.auth.signup(data);
      const { data: loginData } = await api.auth.login(data);

      auth.setToken(loginData.token);
      auth.setUser(loginData);
      localStorage.setItem('token', loginData.token);
      localStorage.setItem('user-role', loginData.role);
      localStorage.setItem('username', loginData.username);

      if (isEqual(loginData.role, USER_ROLE['ROLE_COMPLEX_ADMIN'])) {
        navigate('/admin');
      } else if (isEqual(loginData.role, USER_ROLE['ROLE_RESIDENT'])) {
        navigate('/resident');
      } else if (isEqual(loginData.role, USER_ROLE['ROLE_CLEANER'])) {
        navigate('/cleaner');
      } else {
        console.error('User role is undefined. It is impossible.');
      }

    } catch (e) {
      setIsHasError(true);
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
                    error={Boolean(errors.username)}
                    type="username"
                    label="Username"
                    fullWidth
                    variant="filled"
                    {...register("username", { required: "Username is a required field.", minLength: 3 })}
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
                  error={Boolean(errors.password)}
                  type="password"
                  fullWidth
                  className={classes.input}
                  label="Password"
                  variant="filled"
                  {...register("password", { required: "Password is a required field.", minLength: 8 })}
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
        <div className={classes.errorBlock}>
          {hasError && <div>
            Something went wrong.
          </div>}
        </div>
    </Container>
  );
}

export default SignUp;
