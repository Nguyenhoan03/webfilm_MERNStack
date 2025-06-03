import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Defaultcomponent from './compoment/Defaultcompoment/Defaultcompoment'; 
import { HomeProvider } from './store/HomeContext';
import { routes } from './routers/index';
import './App.scss';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
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
