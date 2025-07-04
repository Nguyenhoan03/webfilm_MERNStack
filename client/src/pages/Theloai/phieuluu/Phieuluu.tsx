import React, { Suspense } from "react";

import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../../compoment/Homepagebodyright/Homepagebodyright";
import { useFilteredData } from "../../../hook/FilterData/useFilteredData";
import { Productdanhmucphimphieuluu } from "../../../services/Productservices";
import { Helmet } from "react-helmet";

const FilterfilmCompoment = React.lazy(()=>import("../../../compoment/FilterfilmCompoment/FilterfilmCompoment"));
export default function Phieuluu() {
    const { data, filters, setFilters, appliedFilters, setAppliedFilters } = useFilteredData(Productdanhmucphimphieuluu);

  
    return (
        <div className="">
            <Helmet>
  <title>Phim Phiêu Lưu | nghienphim - Xem phim online</title>
  <meta name="description" content="Khám phá thế giới qua các bộ phim phiêu lưu hấp dẫn tại nghienphim Xem phim phiêu lưu miễn phí, chất lượng cao." />
  <meta name="keywords" content="phim phiêu lưu, phim thám hiểm, phim phiêu lưu kỳ thú, xem phim phiêu lưu, phim phiêu lưu 2024" />
</Helmet>

            <div className="container">
                <div className="caption mt-3 d-flex align-items-center gap-2">
                    <p><IoIosHome /> nghienphim</p>
                    <p> &gt; </p>
                    <p> Phiêu lưu</p>
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
                    Phim phiêu lưu
                </p>
                <div className="row">
                    <div className="col-12 col-lg-9 mb-4">
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
                    <div className="col-12 col-lg-3">
                        <Homepagebodyright />
                    </div>
                </div>
            </div>
        </div>
    );
}
