
import Leftadmincompoment from "../../../compoment/AdminCompoment/Leftadmincompoment/Leftadmincompoment";
import Right_navbarcompoment from "../../../compoment/AdminCompoment/Right_navbarcompoment/Right_navbarcompoment";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StatusCard from "../../../compoment/StatusCard";
import {usePageCrawlPhim} from "../../../hook/admin/usePageCrawlPhim";
import {
  MdShoppingCart,
  MdAttachMoney,
  MdOutlineShoppingBag,
} from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import "./Autocrawlphim.scss";

interface CrawlData {
  id: number;
  crawl_date: string;
  crawl_time: string;
  category: string[];
  status: number;
}
export default function Authcrawlphim() {
   const {categories, choosecrawl, selectedDate, selectedTime, data_crawl, handleLinkClick, handleclickchoose, handleDateChange, handleTimeChange, handleScheduleCrawl, handleDelete_listcrawl, setchoosecrawl} = usePageCrawlPhim();
  
  return (
    <div className="dashboard-container container-fluid">
      <div className="row">
        <div className="col-md-2">
          <Leftadmincompoment />
        </div>
        <div className="col-md-10">
          <Right_navbarcompoment />
          <div className="row mt-4">
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <StatusCard
                icon={<MdShoppingCart />}
                count="1,995"
                title="Total Sales"
              />
            </div>
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <StatusCard
                icon={<MdAttachMoney />}
                count="$2,632"
                title="Total Income"
              />
            </div>
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <StatusCard
                icon={<FaUserFriends />}
                count="1,711"
                title="Total Orders"
              />
            </div>
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <StatusCard
                icon={<MdOutlineShoppingBag />}
                count="2,001"
                title="Daily Visits"
              />
            </div>
          </div>
          <h3 className="text-danger">Crawl Phim</h3>
          <div className="category-buttons mb-4">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleLinkClick(category)}
                className="category-button btn btn-outline-primary me-2 mb-2"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Schedule Section */}
          <div className="schedule-crawl">
            <h3 className="text-danger mb-4">Đặt lịch hẹn cào phim</h3>
            <div className="mb-3">
              <label htmlFor="category-select" className="form-label">
                Chọn thể loại muốn cào
              </label>
              <select
                id="category-select"
                className="form-select"
                onChange={(e) => handleclickchoose(e.target.value)}
              >
                <option value="">Chọn thể loại...</option>
                <option value="chooseall" style={{color:'red'}}>Chọn tất cả thể loại *</option>
                {categories.map((cate, index) => (
                  <option key={index} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <p>Thể loại phim đã chọn để cào tự động:</p>
            <div className="selected-categories">
              {choosecrawl.length > 0 ? (
                choosecrawl.map((item, index) => (
                  <span
                    key={index}
                    className="badge bg-primary me-1 py-1 mt-2"
                  >
                    {item}
                    <button
                      type="button"
                      className="btn-close btn-close-white ms-2"
                      aria-label="Close"
                      onClick={() => {
                        setchoosecrawl(choosecrawl.filter((_, i) => i !== index));
                      }}
                    ></button>
                  </span>
                ))
              ) : (
                <p className="text-muted">Chưa có thể loại nào được chọn</p>
              )}
            </div>

            <div className="mt-3">
              <label htmlFor="crawl-date" className="form-label">
                Chọn ngày cào
              </label>
              <input
                type="date"
                id="crawl-date"
                className="form-control mb-3"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>
            <div>
              <label htmlFor="crawl-time" className="form-label">
                Chọn thời gian cào
              </label>
              <input
                type="time"
                id="crawl-time"
                className="form-control"
                value={selectedTime}
                onChange={handleTimeChange}
              />
            </div>

            <div className="mt-4 text-center">
              <button
                className="btn btn-success"
                onClick={()=>handleScheduleCrawl()}
              >
                Đặt lịch bắt đầu cào
              </button>
            </div>
          </div>

      
          <div className="scheduled-info mt-4">
  <h4 className="text-success">Danh sách đặt lịch cào phim</h4>
  {data_crawl && data_crawl.map((dt: CrawlData , index:number) => (
    <div className="scheduled-item" key={index}>
      <p>
        <strong>Ngày cào: </strong> {dt.crawl_date}
      </p>
      <p>
        <strong>Thời gian cào: </strong> {dt.crawl_time}
      </p>
      <p>
        <strong>Thể loại đã chọn: </strong> 
        { dt.category.length > 0 ? dt.category  : "Không có thể loại nào được chọn"}
      </p>
      <p><strong> Trạng thái: </strong>   {dt.status === 1 ? "chưa thực hiện" : "đã hoàn thành"}</p>
      <button 
        className="btn btn-danger"
        onClick={() => handleDelete_listcrawl(dt.id)}
      >
        Xóa
      </button>
    </div>
  ))}
</div>

          
          {/* )} */}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
