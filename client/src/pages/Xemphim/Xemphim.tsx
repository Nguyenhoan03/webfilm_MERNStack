import React, { Suspense, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { BsArrowsFullscreen } from "react-icons/bs";
import { FaRegLightbulb } from "react-icons/fa";
import { IoIosHome } from 'react-icons/io';
import { MdError } from "react-icons/md";
import { TbPlayerTrackNext } from "react-icons/tb";
import { Link, useParams } from 'react-router-dom';
import { usePageXemPhim } from '../../hook/usePageXemPhim';
import './Style.scss';
import { SlickSettings, SampleNextArrow, SamplePrevArrow } from '../../utils/SlickSettings';
import Homepagebodyright from '../../compoment/Homepagebodyright/Homepagebodyright';
import CommentCompoment from '../../compoment/CommentCompoment/CommentCompoment';
import Slickslider from '../../compoment/Slickslider/Slickslider';
import { useLocation } from 'react-router-dom';
import { CiStar } from "react-icons/ci";
interface FilmData {
  title: string;
  episode: string;
  linkfilm: string;
}

interface DetailData {
  title: string;
  nameenglish: string;
  chatluong: string;
  ngonngu: string;
  descripts: string;
  theloai: string;
  linkfilms: { episode: number }[];
}



const Xemphim: React.FC = () => {
  const settings = useMemo(() => ({
    ...SlickSettings,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  }), []);
  const location = useLocation();
  const { data_phimhot } = location.state || {};
  const { title, episode } = useParams<{ title: string; episode: string }>();
  const { datafilm, datadetail, ktranextepisode, parent_id, comment, handlenextepisode, loading, error, numbertapfilmcurent } = usePageXemPhim(title, episode);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!datafilm) return null;

  return (
    <div className=''>
      <Helmet>
        <title>Xem phim {`${datafilm.title} - Tập ${datafilm.episode}`}</title>
        <meta name='description' content={`${datafilm.title} - Tập ${datafilm.episode}`} />
        <meta name='keywords' content={`${datafilm.title}, Xem phim ${datafilm.title}, tập ${datafilm.episode}`} />
        <meta property='og:title' content={`Xem phim ${datafilm.title} - Tập ${datafilm.episode}`} />
        <meta property='og:description' content={`${datafilm.title} - Tập ${datafilm.episode}`} />
        <meta property='og:type' content='video.episode' />
      </Helmet>

      <div className="container">
        <Breadcrumb datadetail={datadetail} datafilm={datafilm} />

        <div className="row pagexemphim">
          <div className="xemphim_left col-md-9">
            <VideoPlayer linkfilm={datafilm.linkfilm} />
            <VideoControls
              handlenextepisode={handlenextepisode}
              ktranextepisode={ktranextepisode}
            />
            <EpisodeList
              datadetail={datadetail}
              numbertapfilmcurent={numbertapfilmcurent}
            />
            <Description
              datadetail={datadetail}
              datafilm={datafilm}
            />
            <Suspense fallback={<div>Loading...</div>}>
              <CommentCompoment
                titlefilm={title ?? ''}
                comments={comment}
                parent_id={parent_id}
              />
            </Suspense>


            <div className="mt-3 detail_page__slider">
              <div className="" style={{ paddingLeft: 10 }}>
                <div className="d-flex">
                  <p><CiStar style={{ color: 'tomato' }} /></p>
                  <h2 style={{ fontSize: 18, fontFamily: 'roboto', fontWeight: 600, textTransform: 'uppercase', color: 'white', marginLeft: 10, paddingTop: 5 }}>PHIM ĐỀ CỬ</h2>
                </div>
                <div className="detail_page__slider">
                  <Suspense fallback={<div>Loadding...</div>}>
                    <Slickslider settings={settings} data={data_phimhot} />
                  </Suspense>
                </div>
              </div>
            </div>


          </div>

          <div className="xemphim_right col-md-3">
            <Suspense fallback={<div>Loading...</div>}>
              <Homepagebodyright />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

interface BreadcrumbProps {
  datadetail: DetailData | null;
  datafilm: FilmData;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ datadetail, datafilm }) => (
  <div className="caption mt-3 d-flex">
    <p><IoIosHome /> nghienphim</p>
    <p> &gt; </p>
    <p> {datadetail?.theloai}</p>
    <p> &gt; </p>
    <p style={{ color: 'white' }}> {datafilm.title} - Tập {datafilm.episode}</p>
  </div>
);

interface VideoPlayerProps {
  linkfilm: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ linkfilm }) => (
  <div className="xemphim" style={{ paddingLeft: 15, position: 'relative' }}>
    <iframe
      id="videoFrame"
      src={linkfilm}
      frameBorder="0"
      allowFullScreen
      style={{ display: 'block', width: '100%', height: 400, border: 'none' }}
    />
  </div>
);

interface VideoControlsProps {
  handlenextepisode: () => void;
  ktranextepisode: boolean;
}

const VideoControls: React.FC<VideoControlsProps> = ({ handlenextepisode, ktranextepisode }) => (
  <div className="container mt-2 px-0">
    <div className="row gy-2">
      <div className="col-12 col-md-4 d-flex flex-column gap-2">
        <button className='btn text-white w-100' style={{ backgroundColor: '#27272A', fontWeight: 550, fontSize: 13 }}>
          <BsArrowsFullscreen /> Phóng to
        </button>
        <button className='btn text-white w-100' style={{ backgroundColor: '#27272A', fontWeight: 550, fontSize: 13 }}>
          <MdError /> Báo lỗi
        </button>
      </div>
      <div className="col-12 col-md-4 d-flex align-items-center justify-content-center">
        <ServerSwitch />
      </div>
      <div className="col-12 col-md-4 d-flex flex-column gap-2">
        <button className='btn text-white w-100' style={{ backgroundColor: '#27272A', fontWeight: 550, fontSize: 13 }}>
          <FaRegLightbulb /> Tắt đèn
        </button>
        <button
          onClick={handlenextepisode}
          className='btn w-100'
          style={{
            backgroundColor: '#27272A',
            fontWeight: 550,
            fontSize: 13,
            color: ktranextepisode ? 'gray' : 'white'
          }}
          disabled={ktranextepisode}
        >
          <TbPlayerTrackNext /> Tập tiếp
        </button>
      </div>
    </div>
  </div>
);

const ServerSwitch: React.FC = () => (
  <div className="xemphim_btnserver text-center col-md-4">
    <p style={{ textTransform: 'uppercase', fontWeight: 500, color: 'white' }}>Đổi Server (Nếu Lag)</p>
    <div className="d-flex justify-content-center">
      <button className='btn mx-2' style={{ backgroundColor: '#27272A', color: 'white' }}>Server 1</button>
      <button className='btn mx-2' style={{ backgroundColor: '#27272A', color: 'white' }}>Server 2</button>
      <button className='btn mx-2' style={{ backgroundColor: '#27272A', color: 'white' }}>Server 3</button>
    </div>
  </div>
);

interface EpisodeListProps {
  datadetail: DetailData | null;
  numbertapfilmcurent: number;
}

const EpisodeList: React.FC<EpisodeListProps> = ({ datadetail, numbertapfilmcurent }) => (
  <div className="danhsachtap mt-5 px-3" style={{ borderBottom: '2px solid gray' }}>
    <p style={{ color: 'tomato', paddingTop: 5 }}>Nếu không xem được vui lòng đổi server hoặc tải lại trang !</p>
    <p style={{ textTransform: 'uppercase', color: 'white', fontWeight: 550 }}>Danh sách tập</p>
    <div className="list_episodexemphim pb-3">
      {datadetail?.linkfilms.map((episodelist, key) => (
        <button key={key} style={{ backgroundColor: numbertapfilmcurent === episodelist.episode ? '#A3765D' : '' }}>
          <Link to={`/xem-phim/${datadetail.title}/tap-${episodelist.episode}`}>Tập {episodelist.episode}</Link>
        </button>
      ))}
    </div>
  </div>
);

interface DescriptionProps {
  datadetail: DetailData | null;
  datafilm: FilmData;
}

const Description: React.FC<DescriptionProps> = ({ datadetail, datafilm }) => (
  <div className="descriptsxemphim pt-3">
    <h1 style={{ color: 'rgb(229 231 235)', fontWeight: 700, textTransform: 'uppercase', fontSize: 20 }}>
      {datadetail?.title} TẬP {datafilm.episode}
    </h1>
    <h2 style={{ fontSize: '19px', color: 'rgb(229, 231, 235)', fontWeight: 400 }}>
      {datadetail?.title} - {datadetail?.nameenglish} ({datadetail?.chatluong} - {datadetail?.ngonngu})
    </h2>
    <p style={{ color: 'grey' }}>(7.5 điểm/55 lượt đánh giá)</p>
    <div className="motafilm">
      <p style={{ color: 'rgb(156 163 175)' }}>
        <span style={{ fontWeight: 'bold' }}>{datadetail?.title}</span> {datadetail?.descripts}
      </p>
    </div>
  </div>
);

export default Xemphim;