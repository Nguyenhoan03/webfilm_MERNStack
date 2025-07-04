import React, { Suspense } from "react";
import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../compoment/Homepagebodyright/Homepagebodyright";
import { useFilteredData } from "../../hook/FilterData/useFilteredData";
import { Productquocgia_trungquoc } from "../../services/Productservices";
import { Helmet } from "react-helmet";
import FilterfilmCompoment from "../../compoment/FilterfilmCompoment/FilterfilmCompoment";

export default function Trungquoc() {
    const { data, filters, setFilters, appliedFilters, setAppliedFilters } = useFilteredData(Productquocgia_trungquoc);

    return (
        <div>
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
                <div className="caption mt-3 d-flex align-items-center gap-2">
                    <span><IoIosHome /> nghienphim</span>
                    <span>&gt;</span>
                    <span>Trung Quốc</span>
                </div>
                <p
                    style={{
                        textTransform: "uppercase",
                        fontSize: 23,
                        color: "white",
                        textAlign: "center",
                        borderBottom: "1px solid gray",
                        paddingBottom: 10,
                        marginTop: 10,
                        marginBottom: 20,
                        letterSpacing: 1,
                        fontWeight: 600,
                    }}
                >
                    Phim Trung Quốc
                </p>
                <div className="row">
                    <div className="col-12 col-lg-9 mb-4">
                        <div className="category_phim">
                            <Suspense fallback={<div>Loading...</div>}>
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
                    <div className="col-12 col-lg-3">
                        <Homepagebodyright />
                    </div>
                </div>
            </div>
        </div>
    );
}