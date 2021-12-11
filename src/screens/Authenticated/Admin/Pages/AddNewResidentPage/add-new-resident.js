// Modules
import { Button, TextField, Container, Typography, Grid, makeStyles } from '@material-ui/core';
import { useCallback, useState } from 'react';
import { useForm , Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

// Styles
import './styles.scss';

// Hooks
import useAdminContext from '../../../../../hooks/useAdmin/useAdminContext';

// Api
import api from '../../../../../api';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    marginTop: '100px',
  },
  goBackToMain: {
    marginTop: '20px',
    width: '100%',
    height: '50px',
  },
  createBtn: {
    marginTop: '30px',
    height: '50px',
    width: '100%',
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

function AddNewResident() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { flatId } = useAdminContext();
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
      const response = await api.auth.registerResident(flatId, data);
      console.log(response);
      navigate('/admin');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [navigate, flatId]);

  return (
    <Container maxWidth="xs" className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">
            Add New Resident
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
                  {...register("password", { required: "Password is a required field.", minLength: 7 })}
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
            className={classes.createBtn}
            disabled={isLoading}
          >
            Register new resident
          </Button>
          <Button
            className={classes.goBackToMain}
            variant="contained"
            color="secondary"
            type="submit"
            component={Link}
            to="/admin"
          >
            Go back to main
          </Button>
        </form>
    </Container>
  );
}

export default AddNewResident;
