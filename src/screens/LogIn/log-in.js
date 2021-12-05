// Modules
import { Button, TextField, Container, Typography, Grid, makeStyles } from '@material-ui/core';
import { useCallback, useState } from 'react';
import { useForm , Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

// Context
import useAuth from '../../hooks/useAuth/useAuth';

// Api
import api from '../../api';

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

function LogIn() {
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

  const requiredRules= { required: true };

  const onSubmit = useCallback(async (data) => {
    try {
      setIsLoading(true);
      const { data: loginData } = await api.auth.login(data);

      auth.setToken(loginData.token);
      auth.setUser(loginData.username);
      localStorage.setItem('token', loginData.token);
      navigate('/profile');
    } catch (e) {
      setIsHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [auth, navigate]);

  return (
    <Container maxWidth="xs" className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">
            Login
          </Typography>
        </Grid>
      </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} className="what">
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
                rules={requiredRules}
              />
              {errors.username?.message === "required" && <div>Zalupa</div>}
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
              rules={requiredRules}
            />
          </Grid>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.loginBtn}
            disabled={isLoading}
          >
            Login
          </Button>
          <Button
            className={classes.buttonSpacing}
            color="inherit"
            type="submit"
            component={Link}
            to="/signup"
          >
            Create an account
          </Button>
        </form>
        <div className={classes.errorBlock}>
          {hasError && <div>
            There is no such user. Please, check data you passed.
          </div>}
        </div>
    </Container>
  );
}

export default LogIn;
