import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import React from 'react';
import Slider, { Settings } from "react-slick";
import { FaRegHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import './Style.scss';


interface SliderItem {
  title: string;
  hinhanh: string;
  trangthai: string;
  ngonngu: string;
  sotap: number | string; 
}

interface SlicksliderProps {
  settings: Settings; 
  data: SliderItem[]; 
}

const Slickslider: React.FC<SlicksliderProps> = ({ settings, data = [] }) => {
  return (
    <Slider {...settings}>
      {data.map((dt, index) => (
        <div key={index} className="mt-3 d-flex wd_slickslideer">
          <Link to={`/${dt.title}`} style={{ textDecoration: 'none' }}>
            <div className="news_outstanding_card border-radius-3" style={{ marginLeft: 0, marginRight: 20, borderRadius: 7, border: '1px solid gray' }}>
              <div className="image-container" style={{ position: 'relative', textAlign: 'center' }}>
                <picture>
                  <source srcSet={dt.hinhanh.replace(/\.(jpeg|png)$/, ".webp")} type="image/webp" />
                  <img src={dt.hinhanh} alt={dt.title} loading="lazy" style={{ display: 'inline-block', height: 235, borderRadius: '7px 7px 0 0' }} />
                </picture>
                <p className="title-badge" style={{ position: 'absolute', top: 5, left: 10, backgroundColor: '#BF1D28', color: 'white', fontWeight: 650, fontSize: 12, borderRadius: 4, width: 107, textAlign: 'center' }}>
                  {dt.trangthai}-{dt.ngonngu}
                </p>
                <p className="description-badge" style={{ marginLeft: 0 }}>
                  {typeof dt.sotap === 'string' && dt.sotap.includes('Tập') ? dt.sotap : `${dt.sotap || '0'} Tập`}
                </p>
                <p style={{ position: 'absolute', top: 5, right: 10, color: 'white' }}>
                  <FaRegHeart />
                </p>
              </div>
              <div className="information" style={{ padding: '10px' }}>
                <p className='line-clamp' style={{ fontSize: 14, fontWeight: 500, margin: 0 }}>{dt.title}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </Slider>
  );
};

export default Slickslider;