import React, { Suspense } from "react";

import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../../compoment/Homepagebodyright/Homepagebodyright";
import { useFilteredData } from "../../../hook/FilterData/useFilteredData";
import { Productdanhmucphimchientranh } from "../../../services/Productservices";
import { Helmet } from "react-helmet";

const FilterfilmCompoment = React.lazy(() => import("../../../compoment/FilterfilmCompoment/FilterfilmCompoment"));
export default function Chientranh() {
    const { data, filters, setFilters, appliedFilters, setAppliedFilters } = useFilteredData(Productdanhmucphimchientranh);


    return (
        <div className="">
            <Helmet>
                <title>Phim Chiến Tranh | nghienphim - Xem phim online</title>
                <meta name="description" content="Tuyển tập phim chiến tranh từ các cuộc chiến lịch sử đến hiện đại. Xem phim chiến tranh chất lượng cao tại nghienphim" />
                <meta name="keywords" content="phim chiến tranh, phim quân đội, phim lịch sử, xem phim chiến tranh, phim chiến tranh Việt Nam, phim chiến tranh thế giới" />
            </Helmet>

            <div className="container">
                <div className="caption mt-3 d-flex">
                    <p><IoIosHome /> nghienphim</p>
                    <p> &gt; </p>
                    <p> Chiến tranh</p>
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
                    Phim chiến tranh
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
