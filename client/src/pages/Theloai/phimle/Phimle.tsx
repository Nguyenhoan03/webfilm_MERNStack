import React, { Suspense } from "react";

import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../../compoment/Homepagebodyright/Homepagebodyright";
import { useFilteredData } from "../../../hook/FilterData/useFilteredData";
import { Productdanhmucphimle } from "../../../services/Productservices";
import { Helmet } from "react-helmet";

const FilterfilmCompoment = React.lazy(()=>import("../../../compoment/FilterfilmCompoment/FilterfilmCompoment"));
export default function Phimle() {
    const { data, filters, setFilters, appliedFilters, setAppliedFilters } = useFilteredData(Productdanhmucphimle);

  
    return (
        <div className="">
            <Helmet>
  <title>Phim Lẻ Hot Nhất | nghienphim - Xem Phim Online Chất Lượng Cao</title>
  <meta name="description" content="Xem phim lẻ hot nhất, cập nhật phim lẻ mới nhất thuộc nhiều thể loại: hành động, kinh dị, tình cảm, hài hước. Xem phim lẻ HD, miễn phí và có phụ đề tiếng Việt tại nghienphim" />
  <meta name="keywords" content="phim lẻ, phim lẻ hay, phim lẻ hành động, phim lẻ kinh dị, phim lẻ tình cảm, phim lẻ hài hước, phim lẻ lãng mạn, phim lẻ viễn tưởng, phim lẻ 2024, xem phim lẻ, phim lẻ HD, phim lẻ mới nhất, phim lẻ chiếu rạp, xem phim lẻ miễn phí" />
</Helmet>

            <div className="container">
                <div className="caption mt-3 d-flex align-items-center gap-2">
                    <p><IoIosHome /> nghienphim</p>
                    <p> &gt; </p>
                    <p> Phim lẻ</p>
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
                    Phim lẻ
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
