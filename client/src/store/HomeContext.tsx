import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Producthome } from '../services/Productservices';
export interface HomeContextType {
  phimhanhdong: any[];
  trendingData: any[];
  phimsapchieu: any[];
  phimhot: any[];
  roles?: string[] |any;
  permissions?: string[] | any;
  token: string | null;
  name: string | null;
  id: string | null;
  email: string | null;
  settings: Settings;
}
type Settings = {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  autoplay: boolean;
  autoplaySpeed: number;
  nextArrow: JSX.Element;
  prevArrow: JSX.Element;
  responsive: Array<{
    breakpoint: number;
    settings: {
      slidesToShow: number;
      slidesToScroll: number;
      infinite?: boolean;
    };
  }>;
};
export const HomeContext = createContext<HomeContextType | undefined>(undefined);
export const HomeProvider = ({children}: {children: ReactNode}) =>{
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
    function SampleNextArrow(props:any) {
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
  
    function SamplePrevArrow(props:any) {
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
    const settings:Settings = useMemo(() => ({
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
      console.log(data,"dataaaaaa")
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