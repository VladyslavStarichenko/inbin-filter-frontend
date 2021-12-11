// Modules
import { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField, Container, Grid, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

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
    marginBottom: '120px',
  },
  buttonSpacing: {
    marginLeft: '100px',
    marginTop: '30px',
  },
  addBtn: {
    marginTop: '30px',
    marginRight: '40px',
    width: '100%',
    height: '50px',
  },
  input: {
    marginTop: '30px',
  },
}));

function CreateNewFlat() {
  const { setAddNewFlat, setHasUserFlats, setHouseComplex } = useAdminContext();
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const navigate = useNavigate();

  const onBackHandler = useCallback(() => {
    setAddNewFlat(false);
    navigate('/admin');
  }, [navigate, setAddNewFlat]);

  const requiredRules= { required: true };

  const onSubmit = useCallback(async (data) => {
    try {
      setIsLoading(true);
      await api.flat.addNewFlat(data);
      const { data: houseComplex } = await api.houseComplex.getHouseComplex();
      setHasUserFlats(true);
      setAddNewFlat(false);
      setHouseComplex(houseComplex);
    } catch (error) {
      console.log('Error, ', error.message);
    } finally {
      setIsLoading(false);
    }
  }, [setAddNewFlat, setHasUserFlats, setHouseComplex]);

  return (
    <Container maxWidth="xs" className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors.houseComplex)}
                  type="text"
                  label="Flat address"
                  fullWidth
                  variant="filled"
                  {...register("address", { required: "Flat address is a required field.", minLength: 3 })}
                  helperText={errors.flat?.message}
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
          className={classes.addBtn}
          disabled={isLoading}
        >
          Add new flat
        </Button>

        <Button
          onClick={onBackHandler}
          className="back-btn-flat-page"
          variant="contained"
          color="secondary"
        >
          ← Back
        </Button>
      </form>
    </Container>
  );
}

export default CreateNewFlat;
