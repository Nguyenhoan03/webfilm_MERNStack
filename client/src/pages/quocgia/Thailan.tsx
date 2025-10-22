import React, { Suspense } from "react";

import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../compoment/Homepagebodyright/Homepagebodyright";
import { useFilteredData } from "../../hook/FilterData/useFilteredData";
import { Productquocgia_thailan } from "../../services/Productservices";

import { Helmet } from "react-helmet";
const FilterfilmCompoment = React.lazy(()=>import("../../compoment/FilterfilmCompoment/FilterfilmCompoment"));

export default function Thailan() {
    const { data, filters, setFilters, appliedFilters, setAppliedFilters } = useFilteredData(Productquocgia_thailan);

  
    return (
        <div className="">
            <Helmet>
  <title>Xem Phim Thái Lan Hay Nhất 2024 | Mê Phim</title>
  <meta name="description" content="Tuyển tập phim Thái Lan mới nhất, đầy đủ thể loại từ hành động, tình cảm đến hài hước. Xem phim Thái Lan chất lượng cao tại Mê Phim." />
  <meta name="keywords" content="phim Thái Lan, xem phim Thái Lan, phim tình cảm Thái Lan, phim hài Thái Lan, phim hay 2024, phim lẻ Thái Lan" />
  <meta property="og:title" content="Xem Phim Thái Lan Hay Nhất 2024 | Mê Phim" />
  <meta property="og:description" content="Thưởng thức những bộ phim Thái Lan hấp dẫn nhất với đa dạng thể loại. Xem phim chất lượng cao tại Mê Phim." />
  <meta property="og:image" content="URL_ảnh_đại_diện_trang_Thái_Lan" />
  <meta property="og:url" content="https://www.mephim.com/thai-lan" />
  <meta property="og:type" content="website" />
  <link rel="canonical" href="https://www.mephim.com/thai-lan" />
  <meta name="robots" content="index, follow" />
</Helmet>

            <div className="container">
                <div className="caption mt-3 d-flex">
                    <p><IoIosHome /> mephim</p>
                    <p> &gt; </p>
                    <p>Thái Lan</p>
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
                    Phim Thái Lan
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
