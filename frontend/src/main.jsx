import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './store';
import { Provider } from 'react-redux';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import CreatehcpScreen from './screens/CreatehcpScreen.jsx';
import AdmindashboardScreen from './screens/AdmindashboardScreen.jsx';
import CreatePatientScreen from './screens/CreatepatientScreen.jsx';
import DeleteScreen from './screens/DeleteScreen.jsx';
import SearchScreen from './screens/SearchScreen.jsx';
import PatientDashboardScreen from './screens/PatientdashboardScreen.jsx';
import HcpDashboardScreen from './screens/HcpdashboardScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/createhcp' element={<CreatehcpScreen />} />
      <Route path='/admindashboard' element={<AdmindashboardScreen />} />
      <Route path='/createpatient' element={<CreatePatientScreen />} />
      <Route path='/delete' element={<DeleteScreen />} />
      <Route path='/search' element={<SearchScreen />} />
      <Route path='/patientdashboard' element={<PatientDashboardScreen />} />
      <Route path='/hcpdashboard' element={<HcpDashboardScreen />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
