import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { AiFillLike } from "react-icons/ai";
import { IoIosHome } from "react-icons/io";
import { IoBookmark } from "react-icons/io5";
import { Link } from 'react-router-dom';
import './Style.scss';

import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

import { Helmet } from 'react-helmet';
import { useDetailPage } from '../../hook/usePagedetail';
const Slickslider = React.lazy(()=>import('../../compoment/Slickslider/Slickslider'));
const Homepagebodyright = React.lazy(()=>import('../../compoment/Homepagebodyright/Homepagebodyright'))
const CommentCompoment = React.lazy(()=>import('../../compoment/CommentCompoment/CommentCompoment'))
export interface DataDetail {
  title: string;
  nameenglish: string;
  hinhanh: string;
  theloai: string;
  trangthai: string;
  thoiluong: string;
  daodien: string;
  sotap: number;
  chatluong: string;
  ngonngu: string;
  namphathanh: string;
  quocgia: string;
  dienvien: string;
  descripts: string;
  linkfilms: Array<{ episode: number }>; 
  rating_star?: { rating: number };
  general_assessment?: {
    totalRatings: number;
    averageRating: number;
  };
  comments?: string; 
}
export default function Detailpage() {
 const {
    loading,
    error,
    hoveredStar,
    setHoveredStar,
    selectedStar,
    checkbutton,
    datadetail,
    comment,
    parent_id,
    ratingtotal,
    averageRating,
    memophimhot,
    handlecheckbutton,
    handlebuttonxemfilm,
    handleFormSubmit,
    title
  } = useDetailPage();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 991);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const settings = useMemo(() => ({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5 ,
          slidesToScroll: 3,
          infinite: true
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        }
      },
      {
        breakpoint: 765,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 340,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  }), []);
  function SampleNextArrow(props: any) {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>; 


  return (
    <div className='detailpage'>
 <Helmet>
  <title>{datadetail ? `${datadetail.title} | Xem Phim Online - Mê Phim` : 'Mê Phim | Xem Phim Online Miễn Phí'}</title>
  <meta
    name="description"
    content={datadetail 
      ? `Xem phim ${datadetail.title} online miễn phí, thể loại ${datadetail.theloai}, chất lượng cao với phụ đề tiếng Việt tại Mê Phim.` 
      : "Xem phim online miễn phí với tuyển tập đầy đủ các thể loại: hành động, tình cảm, hài hước, kinh dị, cổ trang, khoa học viễn tưởng, phim bộ, phim lẻ, và nhiều hơn nữa. Trải nghiệm phim chất lượng cao với phụ đề tiếng Việt tại Mê Phim."}
  />

  <meta
    name="keywords"
    content={datadetail 
      ? `xem phim ${datadetail.title}, ${datadetail.theloai}, ${datadetail.namphathanh}, phim chất lượng cao, xem phim miễn phí, ${datadetail.theloai}, phim phụ đề tiếng Việt`
      : "xem phim online, phim hành động, phim tình cảm, phim hài, phim kinh dị, phim cổ trang, phim khoa học viễn tưởng, phim bộ, phim lẻ, phim 2024, xem phim miễn phí, xem phim chất lượng cao, phim phụ đề tiếng Việt"}
  />
  
  <meta property="og:title" content={datadetail ? `${datadetail.title} | Xem Phim Online - Mê Phim` : "Mê Phim | Xem Phim Online Miễn Phí"} />
  <meta property="og:description" content={datadetail ? `Xem phim ${datadetail.title} thể loại ${datadetail.theloai}, phụ đề tiếng Việt, chất lượng cao tại Mê Phim.` : "Khám phá kho phim online miễn phí với đầy đủ các thể loại: hành động, tình cảm, hài hước, kinh dị, cổ trang, khoa học viễn tưởng, phim bộ, phim lẻ, và nhiều hơn nữa. Trải nghiệm phim chất lượng cao tại Mê Phim."} />
  <meta property="og:image" content={datadetail ? datadetail.hinhanh : "https://motchillj.net/motchill.png?v1.0.2"} />
  <meta property="og:url" content={datadetail ? `https://mephim.com/phim/${datadetail.title}` : "https://mephim.com/"} />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={datadetail ? `${datadetail.title} | Xem Phim Online - Mê Phim` : "Mê Phim | Xem Phim Online Miễn Phí"} />
  <meta name="twitter:description" content={datadetail ? `Xem phim ${datadetail.title}, thể loại ${datadetail.theloai}, phụ đề tiếng Việt tại Mê Phim.` : "Xem phim online miễn phí với nhiều thể loại: hành động, tình cảm, hài hước, kinh dị, cổ trang, khoa học viễn tưởng, và nhiều thể loại khác tại Mê Phim."} />
  <meta name="twitter:image" content={datadetail ? datadetail.hinhanh : "https://motchillj.net/motchill.png?v1.0.2"} />
  <link rel="canonical" href={datadetail ? `https://mephim.com/phim/${datadetail.title}` : "https://mephim.com/"} />
  <meta name="robots" content="index, follow" />
</Helmet>

      <div className={isSmallScreen ? "caption-container" : "container caption-container"}>
      <div className="caption caption_title mt-1 d-flex">
                <p><IoIosHome /> Motchill</p>
                <p>{'>'}</p>
                <p> {datadetail?.theloai.split(',')[0] || ''}</p>
                <p>{'>'}</p>
                <p style={{color:'white'}}> {datadetail?.title}</p>
            </div>
            <div className="content_detailpage">
        <div className="row content_detailpage_child">
        <div className="detailpage_left col-md-9 ">
            <div className="content_detailpage_card ">
            <div className="d-flex flex-column flex-md-row content_detail_card_child">
  <div className="col-md-4 image_card_detailpage" style={{display:'inline-block',position:'relative',width:290}}>
    <img style={{width: 290,height: 400}} src={datadetail?.hinhanh ? datadetail.hinhanh : ''} alt="" />
    <div className="content_detailpage_card_button" style={{position:'absolute',bottom: 0, left:0,height:75,width:'100%',backgroundColor:'rgba(0,0,0,0.8)'}}>
      <button className='btn btn-primary'><Link to="">Tải phim</Link></button>
      <button className='btn btn-tomato' onClick={handlebuttonxemfilm}>
        Xem phim
      </button>
    </div>
  </div>
  <div className='col-md-8 card_detailpage_film' style={{marginLeft:15}}>
                  <div className="">
                <h1 className="movie-title">{datadetail?.title}</h1>
          <h2 className="movie-subtitle text-light">{datadetail?.nameenglish}</h2>
          <ul className="movie-details">
            <li><strong>Trạng thái:</strong> {datadetail?.trangthai}</li>
            <li><strong>Thời luọng:</strong> {datadetail?.thoiluong}</li>
            <li><strong>Đạo diễn:</strong> {datadetail?.daodien}</li>
            <li><strong>Thời lượng:</strong> {datadetail?.thoiluong}</li>
            <li><strong>Số tập:</strong> {datadetail?.sotap}</li>
            <li><strong>Chất lượng:</strong>{datadetail?.chatluong} </li>
            <li><strong>Ngôn ngữ:</strong> {datadetail?.ngonngu}</li>
            <li><strong>Năm phát hành:</strong> {datadetail?.namphathanh}</li>
            <li><strong>Quốc gia:</strong> {datadetail?.quocgia}</li>
            <li><strong>Thể loại:</strong> {datadetail?.theloai}</li>
            <li><strong>Diễn viên:</strong> {datadetail?.dienvien}</li>
          </ul>
          </div>
          <div className="mt-1">
              <div className="movie-details-button">
                  <button style={{width:100}}><AiFillLike /> Thích 3</button>
                  <button style={{width:60}}> Chia sẻ</button>
                  <button><IoBookmark /> Lưu vào facebook</button>
              </div>
              <div className="d-flex align-items-center movie-details-evaluate mt-2">
              <div>
  
  </div>
  
    <form action="" className="d-flex align-items-center">
      {[...Array(10)].map((_, index) => (
        <FaStar
          key={index}
          style={{
            color: index < (hoveredStar || selectedStar) ? "#1876f2" : "#555555",
            fontSize: 22,
            marginRight: 4,
            cursor: 'pointer',
          }}
          onMouseEnter={() => setHoveredStar(index + 1)}
          onMouseLeave={() => setHoveredStar(0)}
          onClick={(e: React.MouseEvent<SVGElement>) => handleFormSubmit(e as any, index + 1)}
        />
      ))}
    </form>
  
  <div className='evaluatestar_detail_page'>  
    <p className="text-white pl-2 mb-0" style={{ fontSize: '16px', color: 'white !important' }}>
      {typeof averageRating === 'number' && !isNaN(averageRating) 
        ? averageRating.toFixed(1) 
        : 'N/A'} 
      <span className="text-primary">★</span> ({ratingtotal} đánh giá)
    </p>
  </div>



  </div>

          </div>
      
                </div>
                  
                </div>
              <div className="mt-3">
                <div className="movie-details-episode">
              <button style={{backgroundColor: checkbutton ===1 ? '#A3765D':''}} onClick={()=>handlecheckbutton(1)}>DANH SÁCH TẬP</button>
              <button onClick={()=>handlecheckbutton(2)} style={{marginLeft:12,backgroundColor: checkbutton ===2 ? '#A3765D':''}}>THÔNG TIN PHIM</button>
              </div>
              <div className="info mt-2" style={{backgroundColor:'#161515',borderRadius:10}}>
                 <div className="py-3 px-2">
                  {
                    checkbutton === 1 ? (<div className="">
                    <p style={{fontSize:22,fontWeight:550,color:'rgb(182, 179, 179)'}}>DANH SÁCH TẬP</p>
                    <div className="list_episode">
                      {datadetail?.linkfilms.map((episodelist: {episode:number},key:number)=>(
                        <button key={key}><Link to={`/xem-phim/${datadetail?.title}/tap-${episodelist.episode}`}>Tập {episodelist.episode}</Link></button>

                      ))}
                        
                    </div>
                    </div>
                    ) : (
                      <div className="">
                      <p style={{fontSize:22,fontWeight:550,color:'rgb(182, 179, 179)'}}>Tóm tắt</p>
                      <p style={{color:'rgb(182, 179, 179)'}}>{datadetail?.descripts}</p>
                      </div>
                    )
                  }
                
                

                 </div>
              </div>
              </div>  

             <div className="">
             <Suspense fallback={<div>Loadding...</div>}>
            <CommentCompoment titlefilm = {title} comments={comment} parent_id={parent_id}/>
            </Suspense>
            </div>
           

              </div>
              <div className="mt-3">
                <div className="" style={{paddingLeft:10}}>
                  <div className="d-flex">
                  <p><CiStar style={{color:'tomato'}}/></p>
              <h2 style={{ fontSize: 18, fontFamily: 'roboto', fontWeight: 600, textTransform: 'uppercase', color: 'white',marginLeft:10,paddingTop:5 }}>PHIM ĐỀ CỬ</h2>
              </div>
              <div className="">
                 <Suspense fallback={<div>Loadding...</div>}>
              <Slickslider settings={settings} data={memophimhot || []} />
              </Suspense>
              </div>
              </div>
              </div>
        </div>
        <div className="detailpage_right col-md-3">
        <Suspense fallback={<div>Loadding...</div>}>
            <Homepagebodyright/>
            </Suspense>
        </div>
        </div>
        </div>
        </div>
      
    </div>
  )
}
