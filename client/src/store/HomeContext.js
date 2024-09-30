import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Producthome } from '../services/Productservices';
export const HomeContext = createContext();
export const HomeProvider = ({children}) =>{
    const [phimhanhdong, setphimhanhdong] = useState([]);
    const [trendingData, settrendingData] = useState([]);
    const [phimsapchieu, setphimsapchieu] = useState([]);
    const [phimhot, setPhimhot] = useState([]);
    const token = useMemo(() => sessionStorage.getItem('token'), []);
    const id = useMemo(() => sessionStorage.getItem('id'), []);
    const name = useMemo(() => sessionStorage.getItem('name'), []);
    const email = useMemo(() => sessionStorage.getItem('email'), []);
    const roles = useMemo(() => sessionStorage.getItem('roles'), []);
    const permissions = useMemo(() => sessionStorage.getItem('permissions'), []);
    function SampleNextArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div
          className={`next-arrow custom-arrow ${className}`}
          style={style} 
          onClick={onClick}
        >
          <i className="fas fa-chevron-right"></i>
        </div>
      );
    }
  
    function SamplePrevArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div
          className={`prev-arrow custom-arrow ${className}`}
          style={style}
          onClick={onClick}
        >
          <i className="fas fa-chevron-left"></i>
        </div>
      );
    }
    const settings = useMemo(() => ({
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 2,
      autoplay: true,
      autoplaySpeed: 3000,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        { breakpoint: 1400, settings: { slidesToShow: 5, slidesToScroll: 3, infinite: true }},
        { breakpoint: 1200, settings: { slidesToShow: 4, slidesToScroll: 2, infinite: true }},
        { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 }},
        { breakpoint: 765, settings: { slidesToShow: 2, slidesToScroll: 1 }},
        { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 }},
        { breakpoint: 470, settings: { slidesToShow: 2, slidesToScroll: 1 }},
        { breakpoint: 330, settings: { slidesToShow: 1, slidesToScroll: 1 }},
      ],
    }), []);
    
    

    const fetchData = useCallback(async () => {
      const data = await Producthome();
      setphimhanhdong(data.phimhanhdong);
      settrendingData(data.phimtrending);
      setphimsapchieu(data.phimsapchieu);
      setPhimhot(data.phimhot);
    }, []);
  
   
    useEffect(() => {
      fetchData();
    }, [fetchData]);
     return (
        <HomeContext.Provider value={{ phimhanhdong, trendingData, phimsapchieu,phimhot,settings,token,name ,id,email,roles,permissions}}>
             {children}
       </HomeContext.Provider>
     )
}