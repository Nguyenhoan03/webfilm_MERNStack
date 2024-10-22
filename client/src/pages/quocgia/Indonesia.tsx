import React, { useEffect, useState,Suspense } from "react";

import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../compoment/Homepagebodyright/Homepagebodyright";
import { useFilteredData } from "../../hook/FilterData/useFilteredData";
import { Productquocgia_indonesia } from "../../services/Productservices";

import { Helmet } from "react-helmet";
const FilterfilmCompoment = React.lazy(()=>import("../../compoment/FilterfilmCompoment/FilterfilmCompoment"));

export default function Indonesia() {
    const { data, filters, setFilters, appliedFilters, setAppliedFilters } = useFilteredData(Productquocgia_indonesia);

  
    return (
        <div className="">
            <Helmet>
  <title>Xem Phim Indonesia Hay Nhất 2024 | Nghiện Phim</title>
  <meta name="description" content="Xem phim Indonesia mới nhất, đa dạng thể loại: tình cảm, kinh dị, hành động và nhiều hơn nữa tại Nghiện Phim." />
  <meta name="keywords" content="phim Indonesia, xem phim Indonesia, phim tình cảm Indonesia, phim kinh dị Indonesia, phim hay 2024" />
  <meta property="og:title" content="Xem Phim Indonesia Hay Nhất 2024 | Nghiện Phim" />
  <meta property="og:description" content="Thưởng thức bộ sưu tập phim Indonesia đa dạng với chất lượng cao tại Nghiện Phim." />
  <meta property="og:image" content="URL_ảnh_đại_diện_trang_Indonesia" />
  <meta property="og:url" content="https://www.nghienphim.com/indonesia" />
  <meta property="og:type" content="website" />
  <link rel="canonical" href="https://www.nghienphim.com/indonesia" />
  <meta name="robots" content="index, follow" />
</Helmet>

            <div className="container">
                <div className="caption mt-3 d-flex">
                    <p><IoIosHome /> nghienphim</p>
                    <p> &gt; </p>
                    <p>Indonesia</p>
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
                    Phim Indonesia
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
