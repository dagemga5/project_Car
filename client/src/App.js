import './App.css';
import {Route,BrowserRouter,Routes, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingCar from './pages/BookingCar';
import  UserBookings from "./pages/UserBookings";
import AddCar from './pages/AddCar';
import 'antd/dist/antd.css';
import Profile from './pages/Profile';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';
import ShowDetails from './pages/ShowDetail';



function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<protectedRoute><Home /> </protectedRoute>}/>
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register />} />
    <Route path='/booking/:carid' element={<protectedRoute><BookingCar /> </protectedRoute>} />
    <Route path='/userbookings' element={<protectedRoute><UserBookings /> </protectedRoute>} />
    <Route path='/addcar' element={<protectedRoute><AddCar /> </protectedRoute>} />
    <Route path='/profile' element={<protectedRoute><Profile /> </protectedRoute>} />
    <Route path='/admin' element={<protectedRoute><AdminHome /> </protectedRoute>} />
    <Route path='/editcar/:carid' element={<protectedRoute><EditCar /> </protectedRoute>} />
    <Route path='/details/:carid' element={<protectedRoute><ShowDetails /> </protectedRoute>} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}


export default App;

export function protectedRoute(props)
{
  if(localStorage.getItem('user')){
    return <Route {...props} />
  }
  else{
    return <Navigate replace to='/login'/>
  }
}