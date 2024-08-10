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
        <NavBar />
        <Routes>
          <Route index element={<Landing />}/>
          <Route path={'/about'} element={<About />}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
