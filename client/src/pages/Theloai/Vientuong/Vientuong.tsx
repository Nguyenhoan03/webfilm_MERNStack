import React, { Suspense } from "react";

import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../../compoment/Homepagebodyright/Homepagebodyright";
import { useFilteredData } from "../../../hook/FilterData/useFilteredData";
import { Productdanhmucphimvientuong } from "../../../services/Productservices";
import { Helmet } from "react-helmet";

const FilterfilmCompoment = React.lazy(() => import("../../../compoment/FilterfilmCompoment/FilterfilmCompoment"));
export default function Vientuong() {
    const { data, filters, setFilters, appliedFilters, setAppliedFilters } = useFilteredData(Productdanhmucphimvientuong);

    return (
        <div className="">
            <Helmet>
                <title>Phim Viễn Tưởng | nghienphim - Xem phim online</title>
                <meta name="description" content="Khám phá thế giới viễn tưởng qua các bộ phim khoa học, huyền bí và siêu nhiên tại nghienphim" />
                <meta name="keywords" content="phim viễn tưởng, phim khoa học viễn tưởng, phim huyền bí, xem phim viễn tưởng, phim khoa học, phim viễn tưởng hay" />
            </Helmet>

            <div className="container">
                <div className="caption mt-3 d-flex align-items-center gap-2">
                    <p><IoIosHome /> nghienphim</p>
                    <p> &gt; </p>
                    <p> Viễn tưởng</p>
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
                    Phim viễn tưởng
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
