import React, { Suspense, useState } from "react";

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
import { usePageProduct } from "../../../hook/admin/usePageProduct";
import StatusCard from "../../../compoment/StatusCard";
interface ItemsProps {
  currentItems: FilmData[];
  selectedRow: number | null;
  handleEditClick: (index: number) => void;
}
export default function Product() {
  const { dataphim, selectedRow, currentPage, searchQuery, setSearchQuery, handleEditClick, handlesaveedit, handleCheckboxChange, handledeleteproduct, handlePageClick } = usePageProduct();

  const itemsPerPage = 50;
  const offset = currentPage * itemsPerPage;
  const currentItems = Array.isArray(dataphim)
    ? dataphim.slice(offset, offset + itemsPerPage)
    : [];
  const pageCount = Math.ceil(dataphim.length / itemsPerPage);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const handleCheckbox = (title: string): void => {
    setSelectedIds(prev =>
      prev.includes(title) ? prev.filter(i => i !== title) : [...prev, title]
    );
  };
 


  console.log(selectedIds, "selectedIdsselectedIds")
  const Items: React.FC<ItemsProps> = ({ currentItems, selectedRow, handleEditClick }) => {
    return (
      <tbody>
        {currentItems &&
          currentItems.map((data, index: number) => (
            <Suspense fallback={
              <tr>
                <td colSpan={19}>Loading...</td>
              </tr>
            }
            >
              <tr>
                <th>{data.id}</th>
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
                <td className="">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(data.title)}
                    onChange={() => handleCheckbox(data.title)}
                  />
                </td>
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
                      <MdDeleteForever onClick={() => handledeleteproduct([data.title])} style={{ fontSize: 25, color: "red" }} />
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
              {selectedIds.length > 0 && (
                <div className="flex position-fixed bottom-0 end-0 mx-4">
                  <button className="btn btn-danger" onClick={()=>handledeleteproduct(selectedIds)}>
                    Xóa các film đã chọn
                  </button>
                </div>
              )}

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
