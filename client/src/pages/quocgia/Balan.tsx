import React, { Suspense } from "react";

import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../compoment/Homepagebodyright/Homepagebodyright";
import { useFilteredData } from "../../hook/FilterData/useFilteredData";
import { Productquocgia_balan } from "../../services/Productservices";

import { Helmet } from "react-helmet";
const FilterfilmCompoment = React.lazy(() => import("../../compoment/FilterfilmCompoment/FilterfilmCompoment"));

export default function Balan() {
    const { data, filters, setFilters, appliedFilters, setAppliedFilters } = useFilteredData(Productquocgia_balan);


    return (
        <div className="">
            <Helmet>
                <title>Xem Phim Ba Lan Hay Nhất 2024 | Nghiện Phim</title>
                <meta name="description" content="Xem phim Ba Lan mới nhất, đa dạng thể loại: tình cảm, hành động, hài hước và nhiều hơn nữa tại Nghiện Phim." />
                <meta name="keywords" content="phim Ba Lan, xem phim Ba Lan, phim tình cảm Ba Lan, phim hành động Ba Lan, phim hay 2024" />
                <meta property="og:title" content="Xem Phim Ba Lan Hay Nhất 2024 | Nghiện Phim" />
                <meta property="og:description" content="Khám phá những bộ phim Ba Lan đặc sắc và hấp dẫn với chất lượng cao tại Nghiện Phim." />
                <meta property="og:image" content="URL_ảnh_đại_diện_trang_Ba_Lan" />
                <meta property="og:url" content="https://www.nghienphim.com/ba-lan" />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://www.nghienphim.com/ba-lan" />
                <meta name="robots" content="index, follow" />
            </Helmet>

            <div className="container">
                <div className="caption mt-3 d-flex align-items-center gap-2">
                    <p><IoIosHome /> nghienphim</p>
                    <p> &gt; </p>
                    <p>Ba lan</p>
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
                    Phim Ba lan
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
