import React, { useEffect, useState,Suspense } from "react";

import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../../compoment/Homepagebodyright/Homepagebodyright";
import { useFilteredData } from "../../../hook/FilterData/useFilteredData";
import { Productdanhmucphimsapchieu } from "../../../services/Productservices";
import { Helmet } from "react-helmet";

const FilterfilmCompoment = React.lazy(()=>import("../../../compoment/FilterfilmCompoment/FilterfilmCompoment"));
export default function Phimsapchieu() {
    const { data, filters, setFilters, appliedFilters, setAppliedFilters } = useFilteredData(Productdanhmucphimsapchieu);

  
    return (
        <div className="">
            <Helmet>
  <title>Phim Sắp Chiếu | nghienphim - Xem Trailer và Thông Tin Phim Mới</title>
  <meta name="description" content="Cập nhật thông tin phim sắp chiếu hot nhất, xem trailer và thông tin chi tiết về các bộ phim sắp ra mắt tại nghienphim Khám phá lịch chiếu và những bộ phim bom tấn sắp đổ bộ rạp chiếu phim." />
  <meta name="keywords" content="phim sắp chiếu, phim mới, trailer phim, phim sắp ra mắt, phim bom tấn 2024, phim sắp chiếu rạp, lịch chiếu phim mới, phim sắp ra mắt 2024, phim sắp chiếu Netflix, phim sắp chiếu HBO, xem phim sắp chiếu, tin tức phim mới" />
</Helmet>

            <div className="container">
                <div className="caption mt-3 d-flex">
                    <p><IoIosHome /> nghienphim</p>
                    <p> &gt; </p>
                    <p> Phim sắp chiếu</p>
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
                    Phim sắp chiếu
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
