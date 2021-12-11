// Modules
import { Routes, Route } from 'react-router-dom';
import useAuth from '../../hooks/useAuth/useAuth';
import {
  CircularProgress,
  makeStyles,
  Container,
  Grid,
} from '@material-ui/core';
import isEqual from 'lodash/isEqual';
import { useMemo } from 'react';

// Components
import WelcomePage from '../../screens/WelcomePage';
import LogIn from '../../screens/LogIn';
import Mission from '../../screens/Mission';
import SignUp from '../../screens/SignUp';
import HowItWorks from '../../screens/HowItWorks';

import AddNewResident from '../../screens/Authenticated/Admin/Pages/AddNewResidentPage/add-new-resident';
import AdminMainPage from '../../screens/Authenticated/Admin/MainPage';
import GetAllBinsByFlat from '../../screens/Authenticated/Admin/Pages/GetAllBinsByFlat';
import GetAllResidentsByFlat from '../../screens/Authenticated/Admin/Pages/GetAllResidentsByFlat';
import GetWastesByResident from '../../screens/Authenticated/Admin/Pages/GetWastesByResident';

// Constants
import { USER_ROLE } from '../../constants/users';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

const Admin = () => <div><h1>Admin main page.</h1></div>;
const AdminStatistics = () => <div><h1>Admin statistics page.</h1></div>;
const AdminFlats = () => <div><h1>Admin Flats.</h1></div>;

const Resident = () => <div><h1>Resident main page.</h1></div>;
const ResidentBin = () => <div><h1>Resident bin</h1></div>;
const ResidentStatistics = () => <div>Resident statistic.</div>;

const Cleaner = () => <div><h1>Cleaner main page.</h1></div>;
const CleanerBin = () => <div><h1>Cleaner bin.</h1></div>;
const CleanerStatistics = () => <div><h1>Cleaner statistics.</h1></div>;

function RouterWrapper() {
  const auth = useAuth();
  const classes = useStyles();
  const userRole = auth?.user?.role || localStorage.getItem('user-role');

  const routesByUserType = useMemo(() => {
    let routes;

    if (isEqual(userRole, USER_ROLE['ROLE_ADMIN'])) {
      routes = (
        <>
          <Route path="/admin" element={<AdminMainPage />} />
          <Route path="/admin/flats" element={<AdminFlats />} />
          <Route path="/admin/addnewresident" element={<AddNewResident />} />
          <Route path="/admin/getallbins" element={<GetAllBinsByFlat />} />
          <Route path="/admin/getallresidents" element={<GetAllResidentsByFlat />} />
          <Route path="/admin/getallresidents/getwastesbyres" element={<GetWastesByResident />} />
          <Route path="/admin/statistics" element={<AdminStatistics />} />
          <Route path="*" element={<Admin />} />
        </>
      );
    }

    if (isEqual(userRole, USER_ROLE['ROLE_RESIDENT'])) {
      routes = (
        <>
          <Route path="/resident" element={<Resident />} />
          <Route path="/resident/bin" element={<ResidentBin />} />
          <Route path="/resident/statistics" element={<ResidentStatistics />} />
        </>
      );
    }

    if (isEqual(userRole, USER_ROLE['ROLE_CLEANER'])) {
      routes = (
        <>
          <Route path="/cleaner" element={<Cleaner />} />
          <Route path="/cleaner/bin" element={<CleanerBin />} />
          <Route path="/cleaner/statistics" element={<CleanerStatistics />} />
        </>
      );
    }

    return routes;
  }, [userRole]);

  return auth.isLoaded ? (
    <Routes>
      {!(localStorage.getItem('token') || auth.token || localStorage.getItem('user-role')) ? (
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
          {routesByUserType}
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
