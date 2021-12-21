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


// Admin pages
import AddNewResident from '../../screens/Authenticated/Admin/Pages/AddNewResidentPage/add-new-resident';
import AdminMainPage from '../../screens/Authenticated/Admin/MainPage';
import GetAllBinsByFlat from '../../screens/Authenticated/Admin/Pages/GetAllBinsByFlat';
import GetAllResidentsByFlat from '../../screens/Authenticated/Admin/Pages/GetAllResidentsByFlat';
import GetWastesByResident from '../../screens/Authenticated/Admin/Pages/GetWastesByResident';
import StatisticsPage from '../../screens/Authenticated/Admin/Pages/StatisticsPage';
import GetAllFlatDebtors from '../../screens/Authenticated/Admin/Pages/GetAllFlatDebtors';
import GetAllWastesStatisticByResident from '../../screens/Authenticated/Admin/Pages/GetAllWastesStatisticByResident';
import GetWasteStatisticByFlat from '../../screens/Authenticated/Admin/Pages/GetWasteStatisticByFlat';

// Resident pages
import Profile from '../../screens/Authenticated/Resident/Pages/Profile';
import ResidentStatistics from '../../screens/Authenticated/Resident/Pages/Statistics';
import ResidentWaste from '../../screens/Authenticated/Resident/Pages/MyWaste/my-waste';
import ResidentBin from '../../screens/Authenticated/Resident/Pages/MyBins/my-bins';

// Cleaner
import CleanerBins from '../../screens/Authenticated/Cleaner/Pages/Bins';
import CleanerMainPage from '../../screens/Authenticated/Cleaner/Pages/MyPage';

// Constants
import { USER_ROLE } from '../../constants/users';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

const NotFound = () => <div>
  Page not found.
</div>;

const AdminFlats = () => <div><h1>Admin Flats.</h1></div>;

function RouterWrapper() {
  const auth = useAuth();
  const classes = useStyles();
  const userRole = auth?.user?.role || localStorage.getItem('user-role');

  const routesByUserType = useMemo(() => {
    let routes;

    if (isEqual(userRole, USER_ROLE['ROLE_COMPLEX_ADMIN'])) {
      routes = (
        <>
          <Route path="/admin" element={<AdminMainPage />} />
          <Route path="/admin/flats" element={<AdminFlats />} />
          <Route path="/admin/addnewresident" element={<AddNewResident />} />
          <Route path="/admin/getallbins" element={<GetAllBinsByFlat />} />
          <Route path="/admin/getallresidents" element={<GetAllResidentsByFlat />} />
          <Route path="/admin/getallresidents/getwastesbyres" element={<GetWastesByResident />} />
          <Route path="/admin/statistics" element={<StatisticsPage />} />
          <Route path="/admin/statistics/get-waste-statistic-by-flat" element={<GetWasteStatisticByFlat />} />
          <Route path="/admin/statistics/get-all-wastes-statistic-by-resident" element={<GetAllWastesStatisticByResident />} />
          <Route path="/admin/statistics/get-all-flat-debtors" element={<GetAllFlatDebtors />} />
          <Route path="*" element={<NotFound />} />
        </>
      );
    }

    if (isEqual(userRole, USER_ROLE['ROLE_RESIDENT'])) {
      routes = (
        <>
          <Route path="/resident" element={<Profile />} />
          <Route path="/resident/bin" element={<ResidentBin />} />
          <Route path="/resident/waste" element={<ResidentWaste />} />
          <Route path="/resident/statistics" element={<ResidentStatistics />} />
        </>
      );
    }

    if (isEqual(userRole, USER_ROLE['ROLE_CLEANER'])) {
      routes = (
        <>
          <Route path="/cleaner" element={<CleanerMainPage />} />
          <Route path="/cleaner/bins" element={<CleanerBins />} />
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
