// Modules
import { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField, Container, Grid, makeStyles } from '@material-ui/core';

// Hooks
import useAdminContext from '../../../../../hooks/useAdmin/useAdminContext';

// Styles
import './styles.scss';

// Api
import api from '../../../../../api';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    marginTop: '100px',
    marginBottom: '120px',
  },
  buttonSpacing: {
    marginLeft: '100px',
    marginTop: '30px',
  },
  createBtn: {
    marginTop: '30px',
    marginRight: '40px',
    width: '100%',
    height: '50px',
  },
  input: {
    marginTop: '30px',
  },
}));

function CreateNewComplex() {
  const { setHouseComplex, setHasUserComplex } = useAdminContext();
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const requiredRules= { required: true };

  const onSubmit = useCallback(async (data) => {
    console.log(data);
    try {
      setIsLoading(true);
      const response = await api.houseComplex.registerComplex(data);
      setHouseComplex(response.data);
      setHasUserComplex(true);

    } catch (error) {
      console.log('Error, ', error.message);
      setHasUserComplex(false);
      setHouseComplex({});
    } finally {
      setIsLoading(false);
    }
  }, [setHasUserComplex, setHouseComplex]);

  return (
    <Container maxWidth="xs" className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors.houseComplex)}
                  type="text"
                  label="House complex name"
                  fullWidth
                  variant="filled"
                  {...register("name", { required: "House complex name is a required field.", minLength: 3 })}
                  helperText={errors.houseComplex?.message}
                />
              )}
              rules={requiredRules}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.createBtn}
          disabled={isLoading}
        >
          Create new house complex
        </Button>
      </form>
    </Container>
  );
}

// CreateNewComplex.propTypes = {
//   setHouseComplex: PropTypes.func.isRequired,
//   setHasUserComplex: PropTypes.func.isRequired,
// };

export default CreateNewComplex;
