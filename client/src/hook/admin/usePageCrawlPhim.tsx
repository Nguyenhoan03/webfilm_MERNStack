import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
export const usePageCrawlPhim = () => {
    const categories = [
        "Hành Động",
        "Cổ Trang",
        "Chiến Tranh",
        "Viễn Tưởng",
        "Kinh Dị",
        "Tài Liệu",
        "Bí Ẩn",
        "Phim 18+",
        "Tình Cảm",
        "Tâm Lý",
        "Thể Thao",
        "Phiêu Lưu",
        "Âm Nhạc",
        "Gia Đình",
        "Học Đường",
        "Hài Hước",
        "Hình Sự",
        "Võ Thuật",
        "Khoa học",
        "Thần Thoại",
        "Chính Kịch",
        "Kinh Điển",
        "Hoạt Hình",
        "Phim Bộ",
        "Phim Lẻ",
        "Phim Shows",
        "Phim Sắp Chiếu",
      ];
    
      const handleLinkClick = async (category:string) => {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/crawl`,
            { category }
          );
    
          if (response.status === 200) {
            alert("Bạn đã crawl xong dữ liệu phim " + category);
            window.location.reload();
          } else {
            console.error("Failed to trigger crawl:", response.status);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      const date_curent = new Date();
    const formattedDate = date_curent.toISOString().split('T')[0];
      const [choosecrawl, setchoosecrawl] = useState<string[]>([]);
      const [selectedDate, setSelectedDate] = useState(formattedDate);
      const [selectedTime, setSelectedTime] = useState("");
      const [data_crawl, setdata_crawl] = useState([]); 
    
      const handleclickchoose = (cate: string) => {
        if (cate === "chooseall") {
          setchoosecrawl(categories);
        } else {
          setchoosecrawl((prev) => {
            if (!prev.includes(cate)) {
              return [...prev, cate];
            }
            return prev;
          });
        }
      };
      const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
      };
    
      const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedTime(e.target.value);
      };
    
      const handleScheduleCrawl = async () => {
        if (choosecrawl.length > 0 && selectedDate && selectedTime) {
          const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);
      
          const currentDateTime = new Date();
      
          if (selectedDateTime <= currentDateTime) {
            alert("Thời gian đã chọn không hợp lệ. Vui lòng chọn thời gian trong tương lai.");
            return;
          }
      
          try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/create_scheduled_crawls`, {
              categories: choosecrawl,
              date: selectedDate,
              time: selectedTime,
            });
      
            if (response.data.status === 200) {
              toast.success("Bạn đã đặt lịch hẹn thành công!");
              window.location.reload();
            } else {
              toast.error("Có lỗi xảy ra, vui lòng thử lại.");
            }
          } catch (error) {
            console.error("Error scheduling crawl:", error);
            toast.error("Có lỗi xảy ra, vui lòng thử lại.");
          }
        } else {
          alert("Vui lòng chọn thể loại, ngày, và thời gian để đặt lịch.");
        }
      };
      
      
      useEffect(()=>{
        try {
          const fetch_datacrawl = async ()=>{
            const data = await axios.get(`${process.env.REACT_APP_API_URL}/schedule_crawl`);
            if(data){
                 setdata_crawl(data.data);
            }
         }
         fetch_datacrawl();  
        } catch (error) {
          console.log(error)
        }
        
      },[])
      const handleDelete_listcrawl = async(id:number)=>{
        try {
          const data_delete = await axios.delete(`${process.env.REACT_APP_API_URL}/delete_scheduled_crawls`,{params: { id }})
          if (data_delete.status === 200) {
            alert("Bạn đã xóa thành công");
            window.location.reload();
          }
        } catch (error) {
          console.error("Error deleting crawl:", error);
        }
      }

  return {
    categories,
    choosecrawl,
    selectedDate,
    selectedTime,
    data_crawl,
    handleLinkClick,
    handleclickchoose,
    handleDateChange,
    handleTimeChange,
    handleScheduleCrawl,
    handleDelete_listcrawl,
    setchoosecrawl
  };
};