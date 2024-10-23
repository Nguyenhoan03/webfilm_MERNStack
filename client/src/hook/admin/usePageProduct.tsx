import { useState, useEffect } from 'react';
import axios from 'axios';
import { FilmData } from '../../services/Productservices';
import { services_edit_productphim, services_delete_productphim } from '../../services/Productservices';
import { UpdateVIP } from '../../services/Admin/Adminservices';

export const usePageProduct = () => {
    const [dataphim, setDataphim] = useState<FilmData[]>([]);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>("");
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get<FilmData[]>(`${process.env.REACT_APP_API_URL}/product`);
          let dataAllPhim: FilmData[] = response.data; 
      
          // Lọc dữ liệu theo từ khóa tìm kiếm
          if (searchQuery) {
            dataAllPhim = dataAllPhim.filter(item =>
              item.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
          }
          setDataphim(dataAllPhim); 
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [searchQuery]); 

    const handlePageClick = (event: { selected: number }) => {
        setCurrentPage(event.selected);
      };
    
      const handleEditClick = (index: number) => {
        setSelectedRow(index === selectedRow ? null : index);
      };
      const handlesaveedit = async (index: number) => {
        try {
          // Lấy dữ liệu từ các ô input
          const row = document.getElementById(`row-${index}`);
          if(!row) return;
          const updatedData: FilmData = {
            id: (row.querySelector('input[name="id"]') as HTMLInputElement)?.value || "",
            title: (row.querySelector('input[name="title"]') as HTMLInputElement)?.value || "",
            hinhanh: (row.querySelector('input[name="hinhanh"]') as HTMLInputElement)?.value || "",
            nameenglish: (row.querySelector('input[name="nameenglish"]') as HTMLInputElement)?.value || "",
            trangthai: (row.querySelector('input[name="trangthai"]') as HTMLInputElement)?.value || "",
            sotap: (row.querySelector('input[name="sotap"]') as HTMLInputElement)?.value || "",
            thoiluong: (row.querySelector('input[name="thoiluong"]') as HTMLInputElement)?.value || "",
            namphathanh: (row.querySelector('input[name="namphathanh"]') as HTMLInputElement)?.value || "",
            chatluong: (row.querySelector('input[name="chatluong"]') as HTMLInputElement)?.value || "",
            ngonngu: (row.querySelector('input[name="ngonngu"]') as HTMLInputElement)?.value || "",
            daodien: (row.querySelector('input[name="daodien"]') as HTMLInputElement)?.value || "",
            dienvien: (row.querySelector('input[name="dienvien"]') as HTMLInputElement)?.value || "",
            theloai: (row.querySelector('input[name="theloai"]') as HTMLInputElement)?.value || "",
            quocgia: (row.querySelector('input[name="quocgia"]') as HTMLInputElement)?.value || "",
            descripts: (row.querySelector('input[name="descripts"]') as HTMLInputElement)?.value || "",
            views: (row.querySelector('input[name="views"]') as HTMLInputElement)?.value || "",
            likes: (row.querySelector('input[name="likes"]') as HTMLInputElement)?.value || "",
            category_id: (row.querySelector('input[name="category_id"]') as HTMLInputElement)?.value || "",
          };
    
          const response = await services_edit_productphim(updatedData);
          if (response.success) {
            alert("Cập nhật phim thành công");
            window.location.reload();
          }
        } catch (error) {
          console.error("Error saving edit:", error);
        }
      };
      const handleCheckboxChange = async (index:number) => {
        // Cập nhật giá trị VIP1 trong state
        setDataphim((prevData) =>
          prevData.map((item, i) =>
            i === index ? { ...item, VIP1: item.VIP1 === 1 ? 0 : 1 } : item
          )
        );
      
        // Lấy thông tin phần tử cần cập nhật
        const updatedItem = dataphim[index];
        const newVIP1Value = updatedItem.VIP1 === 1 ? 0 : 1;
        try {
          // Gửi yêu cầu cập nhật đến API
          const response = await UpdateVIP({ updatedItem: updatedItem.title, newVIP1Value }); 
      
          if (response.success) {
            alert("Cập nhật trạng thái phim" +updatedItem.title + "thành công");
          } else {
            console.error("Cập nhật VIP1 thất bại");
          }
        } catch (error) {
          console.error("Error updating VIP1:", error);
        }
      };
      const handledeleteproduct =async (title:string)=>{
          try {
            const data = await services_delete_productphim(title);
            if(data.success){
              alert("Bạn đã xóa thành công phim: " + title);
              window.location.reload();
            }
          } catch (error) {
              console.log(error)
          }
      }    

  return {
    dataphim,
    selectedRow,
    currentPage,
    searchQuery,
    setSearchQuery,
    handleEditClick,
    handlesaveedit,
    handleCheckboxChange,
    handledeleteproduct,
    handlePageClick,
  };
};