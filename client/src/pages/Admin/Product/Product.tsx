import React, { useEffect, useState,Suspense } from "react";

import Leftadmincompoment from "../../../compoment/AdminCompoment/Leftadmincompoment/Leftadmincompoment";
import Right_navbarcompoment from "../../../compoment/AdminCompoment/Right_navbarcompoment/Right_navbarcompoment";
import { FilmData } from "../../../services/Productservices";
import {
  MdShoppingCart,
  MdAttachMoney,
  MdOutlineShoppingBag,
} from "react-icons/md";
import { FaUserFriends, FaEdit, FaSearch } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { services_edit_productphim } from "../../../services/Productservices";
import { services_delete_productphim } from "../../../services/Productservices";
import {UpdateVIP} from '../../../services/Admin/Adminservices'
import StatusCard from "../../../compoment/StatusCard";
interface ItemsProps {
  currentItems: FilmData[];
  selectedRow: number | null;
  handleEditClick: (index: number) => void;
}
export default function Product() {
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
  

  const itemsPerPage = 50;
  const offset = currentPage * itemsPerPage;
  const currentItems = Array.isArray(dataphim)
    ? dataphim.slice(offset, offset + itemsPerPage)
    : [];
  const pageCount = Math.ceil(dataphim.length / itemsPerPage);

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
  
  const Items: React.FC<ItemsProps> = ({ currentItems, selectedRow, handleEditClick }) => {
    return (
      <tbody>
        {currentItems &&
          currentItems.map((data, index:number) => (
            <Suspense fallback={
                <tr>
                  <td colSpan={19}>Loading...</td>
                </tr>
              }
            >
              <tr>
                <th>Title</th>
                <th>Image</th>
                <th>Name (English)</th>
                <th>Status</th>
                <th>Episodes</th>
                <th>Duration</th>
                <th>Year</th>
                <th>Quality</th>
                <th>Language</th>
                <th>Director</th>
                <th>Actors</th>
                <th>Genre</th>
                <th>Country</th>
                <th>Description</th>
                <th>Views</th>
                <th>Likes</th>
                <th>Category</th>
                <th>VIP1</th>
              </tr>
              <tr>
                <td>{data.title}</td>
                <td>
                  <img
                    src={data.hinhanh}
                    alt={data.title}
                    style={{ width: "100px" }}
                  />
                </td>
                <td>{data.nameenglish}</td>
                <td>{data.trangthai}</td>
                <td>{data.sotap}</td>
                <td>{data.thoiluong}</td>
                <td>{data.namphathanh}</td>
                <td>{data.chatluong}</td>
                <td>{data.ngonngu}</td>
                <td>{data.daodien}</td>
                <td>{data.dienvien}</td>
                <td>{data.theloai}</td>
                <td>{data.quocgia}</td>
                <td>{data.descripts}</td>
                <td>{data.views}</td>
                <td>{data.likes}</td>
                <td>{data.category_id}</td>
                <td>
                <input
                  type="checkbox"
                  checked={data.VIP1 === 1}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>

                {selectedRow !== index ? (
                  <>
                    <td>
                      <FaEdit
                        onClick={() => handleEditClick(index)}
                        style={{ fontSize: 25, color: "green" }}
                      />
                    </td>
                    <td>
                      <MdDeleteForever onClick={()=>handledeleteproduct(data.title)} style={{ fontSize: 25, color: "red" }} />
                    </td>
                  </>
                ) : (
                  <></>
                )}
              </tr>
              {selectedRow === index && (
                <tr id={`row-${index}`}>
                  <td>
                    <input
                      type="text"
                      defaultValue={data.id?.toString() || ""}
                      name="id"
                      style={{ display: "none" }}
                    />
                  </td>
                  <td>
                    <input type="text" defaultValue={data.title} name="title" />
                  </td>
                  <td>
                    <img
                      src={data.hinhanh}
                      alt={data.title}
                      style={{ width: "100px" }}
                    />
                    <input
                      type="text"
                      defaultValue={data.hinhanh}
                      name="hinhanh"
                      style={{ display: "none" }} 
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      defaultValue={data.nameenglish}
                      name="nameenglish"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      defaultValue={data.trangthai}
                      name="trangthai"
                    />
                  </td>
                  <td>
                    <input type="text" defaultValue={data.sotap} name="sotap" />
                  </td>
                  <td>
                    <input
                      type="text"
                      defaultValue={data.thoiluong}
                      name="thoiluong"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      defaultValue={data.namphathanh}
                      name="namphathanh"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      defaultValue={data.chatluong}
                      name="chatluong"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      defaultValue={data.ngonngu}
                      name="ngonngu"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      defaultValue={data.daodien}
                      name="daodien"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      defaultValue={data.dienvien}
                      name="dienvien"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      defaultValue={data.theloai}
                      name="theloai"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      defaultValue={data.quocgia}
                      name="quocgia"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      defaultValue={data.descripts}
                      name="descripts"
                    />
                  </td>
                  <td>
                    <input type="text" defaultValue={data.views} name="views" />
                  </td>
                  <td>
                    <input type="text" defaultValue={data.likes} name="likes" />
                  </td>
                  <td>
                    <input
                      type="text"
                      defaultValue={data.category_id}
                      name="category_id"
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handlesaveedit(index)}
                    >
                      Lưu
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleEditClick(index)}
                    >
                      Hủy
                    </button>
                  </td>
                </tr>
              )}
            </Suspense>
          ))}
      </tbody>
    );
  };

  return (
    <div className="dashboard-container">
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
                count={dataphim.length}
                title="Tổng số phim"
              />
            </div>
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <StatusCard
                icon={<MdAttachMoney />}
                count="$2,632"
                title="Doanh thu"
              />
            </div>
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <StatusCard
                icon={<FaUserFriends />}
                count="1,711"
                title="Tổng số người dùng"
              />
            </div>
            <div className="col-12 col-md-6 col-lg-3 mb-3">
              <StatusCard
                icon={<MdOutlineShoppingBag />}
                count="2,001"
                title="Lượt truy cập hằng ngày"
              />
            </div>
          </div>
          <div className="">
            <div className="">
              <button className="btn btn-primary">
                <Link
                  to="./add_phim"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Thêm phim mới
                </Link>
              </button>
            </div>
            <div className="">
              <div
                className=""
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div className="">
                  <h2>Danh sách phim</h2>
                </div>
                <div
                  className=""
                  style={{ display: "inline-block", position: "relative" }}
                >
                <input
                type="text"
                placeholder="Nhập phim cần tìm ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  paddingLeft: "10px",
                  position: "relative",
                  width: "400px",
                  height: "40px",
                  borderRadius: "10px",
                }}
              />

                  <FaSearch
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "40%",
                      transform: "translateY(-50%)",
                      color: "#888",
                    }}
                  />
                </div>
              </div>

              <table className="tableadminproduct">
                <Items
                  currentItems={currentItems}
                  selectedRow={selectedRow}
                  handleEditClick={handleEditClick}
                />
              </table>
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                activeClassName="active"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
