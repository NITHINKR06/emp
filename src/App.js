import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import URoute from '../src/modules/user/router/uroute'
// import ERoute from '../src/modules/employees/router/ERoute'
// import ARoute from '../src/modules/admin/router/ARoute'
import Home from './Modules/Home';
import Error from './Modules/Error';
import NavbarWrapper from './Components/Navbar/WrappedNav';
import Footer from './Components/Footer/Footer';
import AboutUs from './Components/about/page';
import ContactForm from './Components/contacts/page';
import LoginPage from './auth/login/page';
import ResetPassword from './auth/resetpassword/page';
import SignupPage from './auth/signup/page';
import URoute from './Modules/User/router/uroute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarWrapper />
          <Routes>
              <Route exact path='/' element={<Home/>}/>
              <Route exact path='/about' element={<AboutUs/>}/>
              <Route exact path='/contacts' element={<ContactForm/>}/>
              <Route exact path='/*' element={<Error/>}/>
              <Route exact path='/auth/login' element={<LoginPage/>}/>
              <Route exact path='/auth/resetpassword' element={<ResetPassword/>}/>
              <Route exact path='/auth/signup' element={<SignupPage/>}/>
              <Route exact path='/user/*' element={<URoute/>}/>
              {/* <Route exact path='/employee/*' element={<ERoute/>}/> */}
              {/* <Route exact path='/admin/*' element={<ARoute/>}/> */}
          </Routes>
          <footer style={{ width: '100%', bottom: 0 }}>
            <Footer />
          </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
