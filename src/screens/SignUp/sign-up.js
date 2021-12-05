// Modules
import { useCallback, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField } from '@material-ui/core';
import isEqual from 'lodash/isEqual';
// Styles
import './styles.scss';
// TODO Change it for endpoints methods
const signUp = () => console.log('Hello world');
const logIn = () => console.log('User successfuly loged in');
const defaultValues = Object.freeze({
  username: "",
  password: "",
});
function SignUp() {
  const [logInData, setLoginData] = useState({});
  const [isSignUpSucceed, setSignUpSucceed] = useState(false);
  const { reset, register, handleSubmit, control, formState: { errors } } = useForm({ defaultValues });
  const requiredRules = { required: true };
  const onSubmit = (data) => console.log(data);

  const handleSignUp = useCallback(async (data) => {
    try {
      const response = await signUp(data);
      if (response.status === 200 || response.status === 201) {
        setSignUpSucceed(true);
        const { username, password } = data;
        // ! here we set log in data for new user setLogInData({ username, password });
      } else {
        setSignUpSucceed(false);
      }
    } catch (error) {
      setSignUpSucceed(false);
    }
  }, []);

  const handleLogIn = useCallback(async () => {
    try {
      const response = await logIn(logInData);
      // TODO Add one more condition to check
      if (isEqual(response.status, 200)) {
        // TODO setLoggedIn(response.data.token);
      }
    } catch (error) {
      setSignUpSucceed(false);
    }
  }, [logInData]);

  return (
    <div className='sign-up-outer-container'>
      <h1 className='header-text'>Sign up</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name='username'
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField label='Username' variant='filled' error={!!error} {...field} />
              );
            }}
            rules={requiredRules}
          />
          <Controller
            control={control}
            name='password'
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField label='Password'  variant='filled' type='password' error={!!error} {...field} />
              );
            }}
            rules={requiredRules}
          />
          <button type='submit'>
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
