import React, { useEffect, useState,Suspense } from "react";

import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../compoment/Homepagebodyright/Homepagebodyright";
import { useFilteredData } from "../../hook/FilterData/useFilteredData";
import { Productquocgia_trungquoc } from "../../services/Productservices";
import { Helmet } from "react-helmet";
import FilterfilmCompoment from "\.\./\.\./compoment/FilterfilmCompoment/FilterfilmCompoment";

export default function Trungquoc() {
    const { data, filters, setFilters, appliedFilters, setAppliedFilters } = useFilteredData(Productquocgia_trungquoc);

  
    return (
        <div className="">
            <Helmet>
  <title>Xem Phim Trung Quốc Hay Nhất 2024 | Nghiện Phim</title>
  <meta name="description" content="Tổng hợp phim Trung Quốc mới nhất, chất lượng cao. Xem phim hành động, tình cảm, cổ trang, và nhiều thể loại khác từ Trung Quốc tại Nghiện Phim." />
  <meta name="keywords" content="phim Trung Quốc, xem phim Trung Quốc, phim hành động Trung Quốc, phim tình cảm Trung Quốc, phim cổ trang Trung Quốc, phim hay 2024" />
  <meta property="og:title" content="Xem Phim Trung Quốc Hay Nhất 2024 | Nghiện Phim" />
  <meta property="og:description" content="Khám phá bộ sưu tập phim Trung Quốc đặc sắc với đa dạng thể loại như hành động, tình cảm, cổ trang, và nhiều hơn nữa. Trải nghiệm xem phim chất lượng cao tại Nghiện Phim." />
  <meta property="og:image" content="URL_ảnh_đại_diện_trang_Trung_Quốc" />
  <meta property="og:url" content="https://www.nghienphim.com/trung-quoc" />
  <meta property="og:type" content="website" />
  <link rel="canonical" href="https://www.nghienphim.com/trung-quoc" />
  <meta name="robots" content="index, follow" />
</Helmet>

            <div className="container">
                <div className="caption mt-3 d-flex">
                    <p><IoIosHome /> nghienphim</p>
                    <p> &gt; </p>
                    <p>Trung Quốc</p>
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
                    Phim Trung Quốc
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
