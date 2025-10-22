import React, { Suspense } from "react";

import { Helmet } from "react-helmet";
import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../../compoment/Homepagebodyright/Homepagebodyright";
import { useFilteredData } from "../../../hook/FilterData/useFilteredData";
import { Productdanhmucphimamnhac } from "../../../services/Productservices";
const FilterfilmCompoment = React.lazy(()=>import("../../../compoment/FilterfilmCompoment/FilterfilmCompoment"));
export default function Amnhac() {
    const { data, filters, setFilters, appliedFilters, setAppliedFilters } = useFilteredData(Productdanhmucphimamnhac);
  
    return (
        <div className="">
            <Helmet>
  <title>Phim Âm Nhạc | nghienphim - Xem phim online</title>
  <meta name="description" content="Tuyển tập phim âm nhạc hay nhất, từ các bộ phim ca nhạc quốc tế đến phim ca nhạc Việt Nam. Khám phá thế giới âm nhạc qua điện ảnh tại nghienphim" />
  <meta name="keywords" content="phim âm nhạc, phim ca nhạc, phim ca nhạc quốc tế, phim ca nhạc Việt Nam, xem phim âm nhạc, phim về âm nhạc" />
</Helmet>

            <div className="container">
                <div className="caption mt-3 d-flex">
                    <p><IoIosHome /> nghienphim</p>
                    <p> &gt; </p>
                    <p> Âm nhạc</p>
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
                    Phim về âm nhạc
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
