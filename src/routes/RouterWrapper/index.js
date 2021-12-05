// Modules
import { Routes, Route } from "react-router-dom";
import useAuth from "../../hooks/useAuth/useAuth";
import {
  CircularProgress,
  makeStyles,
  Container,
  Grid,
} from "@material-ui/core";

// Components
import WelcomePage from "../../screens/WelcomePage";
import LogIn from "../../screens/LogIn";
import Mission from "../../screens/Mission";
import SignUp from "../../screens/SignUp";
import HowItWorks from "../../screens/HowItWorks";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

const Profile = () => <div><h1>Profile page of user.</h1></div>;
const LogedMainPage = () => <div><h1>Main page of logged user</h1></div>;

function RouterWrapper() {
  const classes = useStyles();
  const auth = useAuth();

  return auth.isLoaded ? (
    <Routes>
      {!(localStorage.getItem('token') || auth.token) ? (
        <>
          <Route exact path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/howitworks" element={<HowItWorks />} />
          <Route path="*" element={<WelcomePage />} />
        </>
      ) : (
        <>
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<LogedMainPage />} />
        </>
      )}
    </Routes>
  ) : (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={3} alignItems="center" justify="center">
        <Grid item>
          <CircularProgress color="inherit" />
        </Grid>
      </Grid>
    </Container>
  );
}

export default RouterWrapper;
