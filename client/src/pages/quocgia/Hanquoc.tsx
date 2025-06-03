import React, { Suspense } from "react";

import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../compoment/Homepagebodyright/Homepagebodyright";
import { useFilteredData } from "../../hook/FilterData/useFilteredData";
import { Productquocgia_hanquoc } from "../../services/Productservices";
import { Helmet } from "react-helmet";
const FilterfilmCompoment = React.lazy(() => import("../../compoment/FilterfilmCompoment/FilterfilmCompoment"));

export default function Hanquoc() {
    const { data, filters, setFilters, appliedFilters, setAppliedFilters } = useFilteredData(Productquocgia_hanquoc);

    return (
        <div className="">
            <Helmet>
                <title>Xem Phim Hàn Quốc Hay Nhất 2024 | Nghiện Phim</title>
                <meta name="description" content="Xem phim Hàn Quốc mới nhất, hấp dẫn với đầy đủ các thể loại: tình cảm, hành động, hài hước và nhiều hơn nữa tại Nghiện Phim." />
                <meta name="keywords" content="phim Hàn Quốc, xem phim Hàn Quốc, phim tình cảm Hàn Quốc, phim hành động Hàn Quốc, phim lẻ Hàn Quốc, phim bộ Hàn Quốc" />
                <meta property="og:title" content="Xem Phim Hàn Quốc Hay Nhất 2024 | Nghiện Phim" />
                <meta property="og:description" content="Thưởng thức những bộ phim Hàn Quốc đình đám nhất với chất lượng cao. Xem phim tình cảm, hài hước, hành động và nhiều thể loại khác tại Nghiện Phim." />
                <meta property="og:image" content="URL_ảnh_đại_diện_trang_Hàn_Quốc" />
                <meta property="og:url" content="https://www.nghienphim.com/han-quoc" />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://www.nghienphim.com/han-quoc" />
                <meta name="robots" content="index, follow" />
            </Helmet>

            <div className="container">
                <div className="caption mt-3 d-flex">
                    <p><IoIosHome /> nghienphim</p>
                    <p> &gt; </p>
                    <p>Hàn Quốc</p>
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
                    Phim Hàn Quốc
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
