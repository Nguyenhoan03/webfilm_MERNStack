import React, { Suspense } from "react";

import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../compoment/Homepagebodyright/Homepagebodyright";
import { useFilteredData } from "../../hook/FilterData/useFilteredData";
import { Productquocgia_duc } from "../../services/Productservices";

import { Helmet } from "react-helmet";
const FilterfilmCompoment = React.lazy(() => import("../../compoment/FilterfilmCompoment/FilterfilmCompoment"));

export default function Duc() {
    const { data, filters, setFilters, appliedFilters, setAppliedFilters } = useFilteredData(Productquocgia_duc);

    return (
        <div className="">
            <Helmet>
                <title>Xem Phim Đức Hay Nhất 2024 | Nghiện Phim</title>
                <meta name="description" content="Tổng hợp phim Đức mới nhất, đa dạng thể loại như hành động, tình cảm, hài hước và nhiều thể loại khác tại Nghiện Phim." />
                <meta name="keywords" content="phim Đức, xem phim Đức, phim tình cảm Đức, phim hành động Đức, phim hay 2024" />
                <meta property="og:title" content="Xem Phim Đức Hay Nhất 2024 | Nghiện Phim" />
                <meta property="og:description" content="Thưởng thức những bộ phim Đức đặc sắc với chất lượng cao và nội dung hấp dẫn tại Nghiện Phim." />
                <meta property="og:image" content="URL_ảnh_đại_diện_trang_Đức" />
                <meta property="og:url" content="https://www.nghienphim.com/duc" />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://www.nghienphim.com/duc" />
                <meta name="robots" content="index, follow" />
            </Helmet>

            <div className="container">
                <div className="caption mt-3 d-flex align-items-center gap-2">
                    <p><IoIosHome /> nghienphim</p>
                    <p> &gt; </p>
                    <p>Đức</p>
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
                    Phim Đức
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
