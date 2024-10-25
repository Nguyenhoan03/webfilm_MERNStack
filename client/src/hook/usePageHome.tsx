import React, { useContext, useEffect, useState, Suspense } from 'react';
import { HomeContext, HomeContextType } from '../store/HomeContext';
import MovieCard from '../compoment/MovieCard/MovieCard';
import { Producthome } from '../services/Productservices';

export default function usePageHome() {
    const { settings,phimhot } = useContext(HomeContext) as HomeContextType;
 
  const [phimbomoi, setphimbomoi] = useState([]);
  const [phimlemoi, setphimlemoi] = useState([]);
  const [phimhoanthanh, setphimhoanthanh] = useState([]);
 
  const [phimhoathinh, setphimhoathinh] = useState<string[]>([]);
  const [phimtamlytinhcam, setphimtamlytinhcam] = useState<string[]>([]);
  const [phimvientuong, setphimvientuong] = useState<string[]>([]);
  const [dataphim, setDataphim] = useState<string[]|any>([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Producthome();
      setphimbomoi(data.phimbomoicapnhat);
      setphimlemoi(data.phimlemoicapnhat);
      setphimhoanthanh(data.phimdahoanthanh);
      setphimhoathinh(data.phimhoathinh);
      setphimtamlytinhcam(data.phimtamlytimcam);
      setphimvientuong(data.phimvientuong);
      setDataphim(data.phimbomoicapnhat); 
      console.log(data,"dataaaaa");
      console.log(settings,"dataaaaacontext");
      console.log(phimhot,"dataaaaa");
    };
    fetchData();
  }, []);

  const handleClickpb = (key:number) => {
    setActiveTab(key);    
    const newData = [phimbomoi, phimlemoi, phimhoanthanh][key];
    setDataphim(newData);
  };
  
  const rendercategorycontent = (title:string, data:string[]|any) => (
    <Suspense fallback={<div>Loadding...</div>}>
      <div className="phimhanquoc mt-4">
        <h2 style={{ fontSize: 25, fontFamily: 'roboto', fontWeight: 300, textTransform: 'uppercase', color: '#ff9601' }}>{title}</h2>
        <MovieCard data={data} />
      </div>
    </Suspense>
  );
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Đợi cho trang load xong
    window.onload = () => {
      setContentVisible(true);
    };
  }, []);

  return {
    rendercategorycontent,
    handleClickpb,
    contentVisible,
    phimbomoi,
    phimlemoi,
    phimhoanthanh,
    phimhoathinh,
    phimtamlytinhcam,
    phimvientuong,
    dataphim,
    activeTab,
    settings,
    phimhot
  }
}
