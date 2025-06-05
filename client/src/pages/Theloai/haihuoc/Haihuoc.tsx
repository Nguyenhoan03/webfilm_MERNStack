import React, { Suspense } from "react";

import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../../compoment/Homepagebodyright/Homepagebodyright";
import { useFilteredData } from "../../../hook/FilterData/useFilteredData";
import { Productdanhmucphimhaihuoc } from "../../../services/Productservices";
import { Helmet } from "react-helmet";

const FilterfilmCompoment = React.lazy(()=>import("../../../compoment/FilterfilmCompoment/FilterfilmCompoment"));
export default function Haihuoc() {
    const { data, filters, setFilters, appliedFilters, setAppliedFilters } = useFilteredData(Productdanhmucphimhaihuoc);
    return (
        <div className="">
            <Helmet>
  <title>Phim Hài Hước | nghienphim - Xem phim online</title>
  <meta name="description" content="Tuyển tập phim hài hước, cười thả ga với các bộ phim hài từ khắp nơi trên thế giới tại nghienphim" />
  <meta name="keywords" content="phim hài, phim hài Việt Nam, phim hài quốc tế, xem phim hài, phim hài mới, phim hài 2024" />
</Helmet>

            <div className="container">
                <div className="caption mt-3 d-flex align-items-center gap-2">
                    <p><IoIosHome /> nghienphim</p>
                    <p> &gt; </p>
                    <p> Hài hước</p>
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
                    Phim hài hước
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
