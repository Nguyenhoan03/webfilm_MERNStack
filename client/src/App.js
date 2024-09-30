import React, { Fragment, Suspense, memo, useEffect,useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Defaultcomponent from './compoment/Defaultcompoment/Defaultcompoment'; // Corrected import path
import { HomeProvider } from './store/HomeContext';
import { routes } from './routers/index';
import './App.scss';

function App() {
  // Component Loading Spinner
  const LoadingSpinner = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  // Component render các route
  const renderRoutes = useMemo(() => {
    return (
      <Routes>
        {routes.map((route) => {
          const Page = route.page;
          const Layout = route.isShowHeader ? Defaultcomponent : Fragment;

          // If there's no valid Page, skip this route
          if (!Page) {
            console.warn(`Route at ${route.path} does not have a valid page component.`);
            return null;
          }

          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Layout>
                    <Page />
                  </Layout>
                </Suspense>
              }
            />
          );
        })}
      </Routes>
    );
  }, [routes]);
  // useEffect để thêm Google Analytics
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-SCBG4YH65W';
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', 'G-SCBG4YH65W');
    };
  }, []);

  return (
    <div className="App" style={{ backgroundColor: 'black' }}>
      <Router>
        <HomeProvider>
          {renderRoutes} 
        </HomeProvider>
      </Router>
    </div>
  );
}

export default App;
