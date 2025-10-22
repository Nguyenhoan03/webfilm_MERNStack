import React, { Suspense } from "react";

import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../compoment/Homepagebodyright/Homepagebodyright";
import { useFilteredData } from "../../hook/FilterData/useFilteredData";
import { Productquocgia_mexico } from "../../services/Productservices";

import { Helmet } from "react-helmet";
const FilterfilmCompoment = React.lazy(()=>import("../../compoment/FilterfilmCompoment/FilterfilmCompoment"));

export default function Mexico() {
    const { data, filters, setFilters, appliedFilters, setAppliedFilters } = useFilteredData(Productquocgia_mexico);

  
    return (
        <div className="">
            <Helmet>
  <title>Xem Phim Mexico Hay Nhất 2024 | Mê Phim</title>
  <meta name="description" content="Xem phim Mexico mới nhất với đa dạng thể loại: tình cảm, kinh dị, hài hước, hành động tại Mê Phim." />
  <meta name="keywords" content="phim Mexico, xem phim Mexico, phim tình cảm Mexico, phim kinh dị Mexico, phim hay 2024" />
  <meta property="og:title" content="Xem Phim Mexico Hay Nhất 2024 | Mê Phim" />
  <meta property="og:description" content="Thưởng thức bộ sưu tập phim Mexico hấp dẫn và chất lượng cao tại Mê Phim." />
  <meta property="og:image" content="URL_ảnh_đại_diện_trang_Mexico" />
  <meta property="og:url" content="https://www.mephim.com/mexico" />
  <meta property="og:type" content="website" />
  <link rel="canonical" href="https://www.mephim.com/mexico" />
  <meta name="robots" content="index, follow" />
</Helmet>

            <div className="container">
                <div className="caption mt-3 d-flex">
                    <p><IoIosHome /> mephim</p>
                    <p> &gt; </p>
                    <p>Mexico</p>
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
                    Phim Mexico
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
