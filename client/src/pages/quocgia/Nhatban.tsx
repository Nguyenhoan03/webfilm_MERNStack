import React, { Suspense } from "react";

import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../compoment/Homepagebodyright/Homepagebodyright";
import { useFilteredData } from "../../hook/FilterData/useFilteredData";
import { Productquocgia_nhatban } from "../../services/Productservices";

import { Helmet } from "react-helmet";
const FilterfilmCompoment = React.lazy(()=>import("../../compoment/FilterfilmCompoment/FilterfilmCompoment"));

export default function Nhatban() {
    const { data, filters, setFilters, appliedFilters, setAppliedFilters } = useFilteredData(Productquocgia_nhatban);

  
    return (
        <div className="">
            <Helmet>
  <title>Xem Phim Nhật Bản Hay Nhất 2024 | Nghiện Phim</title>
  <meta name="description" content="Tổng hợp phim Nhật Bản hay nhất, mới nhất với đầy đủ thể loại: hoạt hình, tình cảm, kinh dị và nhiều hơn nữa. Xem phim Nhật Bản tại Nghiện Phim." />
  <meta name="keywords" content="phim Nhật Bản, xem phim Nhật Bản, phim hoạt hình Nhật Bản, phim tình cảm Nhật Bản, phim kinh dị Nhật Bản, phim hay 2024" />
  <meta property="og:title" content="Xem Phim Nhật Bản Hay Nhất 2024 | Nghiện Phim" />
  <meta property="og:description" content="Khám phá những bộ phim Nhật Bản đặc sắc nhất với nhiều thể loại phong phú. Xem phim chất lượng cao tại Nghiện Phim." />
  <meta property="og:image" content="URL_ảnh_đại_diện_trang_Nhật_Bản" />
  <meta property="og:url" content="https://www.nghienphim.com/nhat-ban" />
  <meta property="og:type" content="website" />
  <link rel="canonical" href="https://www.nghienphim.com/nhat-ban" />
  <meta name="robots" content="index, follow" />
</Helmet>

            <div className="container">
                <div className="caption mt-3 d-flex">
                    <p><IoIosHome /> nghienphim</p>
                    <p> &gt; </p>
                    <p>Nhật Bản</p>
                </div>
                <p
                    style={{
                        textTransform: "uppercase",
                        fontSize: 23,
                        color: "white",
                        justifyContent: "center",
                        alignContent: "center",
                        textAlign: "center",
                        borderBottom: "1px solid gray",
                        paddingBottom: 10,
                    }}
                >
                    Phim Nhật Bản
                </p>
                <div className="row">
                    <div className="hanhdongleft col-md-9">
                        <div className="">
                            <div className="category_phim">
<Suspense fallback={<div>Loadding...</div>}>

                            <FilterfilmCompoment
                            data={data}
                            filters={filters}
                            setFilters={setFilters}
                            appliedFilters={appliedFilters}
                            setAppliedFilters={setAppliedFilters}
                        />
</Suspense>

                            </div>


                        </div>
                    </div>
                    <div className="hanhdongright col-md-3">
                        <Homepagebodyright />
                    </div>
                </div>
            </div>
        </div>
    );
}
