import React, { Suspense } from "react";

import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../compoment/Homepagebodyright/Homepagebodyright";
import { useFilteredData } from "../../hook/FilterData/useFilteredData";
import { Productquocgia_phap } from "../../services/Productservices";

import { Helmet } from "react-helmet";
const FilterfilmCompoment = React.lazy(()=>import("../../compoment/FilterfilmCompoment/FilterfilmCompoment"));

export default function Phap() {
    const { data, filters, setFilters, appliedFilters, setAppliedFilters } = useFilteredData(Productquocgia_phap);

  
    return (
        <div className="">
            <Helmet>
  <title>Xem Phim Pháp Hay Nhất 2024 | Mê Phim</title>
  <meta name="description" content="Xem phim Pháp mới nhất, chất lượng cao với đa dạng thể loại: tình cảm, hài hước, tâm lý và nhiều thể loại khác tại Mê Phim." />
  <meta name="keywords" content="phim Pháp, xem phim Pháp, phim tình cảm Pháp, phim hài Pháp, phim hay 2024" />
  <meta property="og:title" content="Xem Phim Pháp Hay Nhất 2024 | Mê Phim" />
  <meta property="og:description" content="Thưởng thức những bộ phim Pháp đặc sắc với đa dạng thể loại. Xem phim chất lượng cao tại Mê Phim." />
  <meta property="og:image" content="URL_ảnh_đại_diện_trang_Pháp" />
  <meta property="og:url" content="https://www.mephim.com/phap" />
  <meta property="og:type" content="website" />
  <link rel="canonical" href="https://www.mephim.com/phap" />
  <meta name="robots" content="index, follow" />
</Helmet>
        
            <div className="container">
                <div className="caption mt-3 d-flex">
                    <p><IoIosHome /> mephim</p>
                    <p> &gt; </p>
                    <p>Pháp</p>
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
                    Phim Pháp
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
