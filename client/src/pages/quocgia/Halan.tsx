import React, { Suspense } from "react";

import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../compoment/Homepagebodyright/Homepagebodyright";
import { useFilteredData } from "../../hook/FilterData/useFilteredData";
import { Productquocgia_halan } from "../../services/Productservices";

import { Helmet } from "react-helmet";
const FilterfilmCompoment = React.lazy(()=>import("../../compoment/FilterfilmCompoment/FilterfilmCompoment"));

export default function Halan() {
    const { data, filters, setFilters, appliedFilters, setAppliedFilters } = useFilteredData(Productquocgia_halan);
  
    return (
        <div className="">
            <Helmet>
  <title>Xem Phim Hà Lan Hay Nhất 2024 | Mê Phim</title>
  <meta name="description" content="Khám phá bộ sưu tập phim Hà Lan mới nhất với đa dạng thể loại: hài hước, tình cảm, hành động và nhiều hơn nữa tại Mê Phim." />
  <meta name="keywords" content="phim Hà Lan, xem phim Hà Lan, phim tình cảm Hà Lan, phim hành động Hà Lan, phim hay 2024" />
  <meta property="og:title" content="Xem Phim Hà Lan Hay Nhất 2024 | Mê Phim" />
  <meta property="og:description" content="Xem phim Hà Lan đặc sắc, chất lượng cao với nhiều thể loại hấp dẫn tại Mê Phim." />
  <meta property="og:image" content="URL_ảnh_đại_diện_trang_Hà_Lan" />
  <meta property="og:url" content="https://www.mephim.com/ha-lan" />
  <meta property="og:type" content="website" />
  <link rel="canonical" href="https://www.mephim.com/ha-lan" />
  <meta name="robots" content="index, follow" />
</Helmet>

            <div className="container">
                <div className="caption mt-3 d-flex">
                    <p><IoIosHome /> mephim</p>
                    <p> &gt; </p>
                    <p>Hà Lan</p>
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
                    Phim Hà Lan
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
