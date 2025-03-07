import React, { Fragment, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Defaultcomponent from './compoment/Defaultcompoment/Defaultcompoment'; 
import { HomeProvider } from './store/HomeContext';
import { routes } from './routers/index';
import './App.scss';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-SCBG4YH65W';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() { window.dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', 'G-SCBG4YH65W');
    };

    return () => document.body.removeChild(script);
  }, []);

  return (
    <div className="App" style={{ backgroundColor: 'black' }}>
      <Router>
        <HomeProvider>
          <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
            <Routes>
              {routes.map(({ path, page: Page, isShowHeader }) => 
                Page && (
                  <Route 
                    key={path} 
                    path={path} 
                    element={
                      <Suspense fallback={<div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                        <div className="spinner-border text-light" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>}>
                        {isShowHeader ? <Defaultcomponent><Page /></Defaultcomponent> : <Page />}
                      </Suspense>
                    } 
                  />
                )
              )}
            </Routes>
          </GoogleOAuthProvider>
        </HomeProvider>
      </Router>
    </div>
  );
}

export default App;
