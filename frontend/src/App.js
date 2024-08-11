import './App.css';
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route
} from "react-router-dom";
import Landing from './resources/routes/landing';
import Footer from './resources/components/main/Footer';
import NavBar from './resources/components/main/NavBar';
import Splash from './resources/components/main/Splash';
import { useEffect } from 'react';
import { useState } from 'react';
import About from './resources/routes/about';
import Login from './resources/routes/auth/login';
import CustomLayout from './resources/routes/layout';
import Register from './resources/routes/auth/register';

function App() {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000); // Duration of the splash screen in milliseconds

  //   return () => clearTimeout(timer);
  // }, []);

  // if (isLoading) {
  //   return <Splash />;
  // }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CustomLayout />}>
            <Route index element={<Landing />} />
            <Route path="about" element={<About />} />
            
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
