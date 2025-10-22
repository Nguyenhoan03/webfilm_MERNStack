import React, { Suspense } from "react";

import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../compoment/Homepagebodyright/Homepagebodyright";
import { useFilteredData } from "../../hook/FilterData/useFilteredData";
import { Productquocgia_quocgiakhac } from "../../services/Productservices";

import { Helmet } from "react-helmet";
const FilterfilmCompoment = React.lazy(()=>import("../../compoment/FilterfilmCompoment/FilterfilmCompoment"));

export default function Quocgiakhac() {
    const { data, filters, setFilters, appliedFilters, setAppliedFilters } = useFilteredData(Productquocgia_quocgiakhac);

  
    return (
        <div className="">
            <Helmet>
  <title>Xem Phim Quốc Gia Khác Hay Nhất 2024 | Mê Phim</title>
  <meta name="description" content="Khám phá bộ sưu tập phim từ nhiều quốc gia khác nhau trên thế giới, đa dạng thể loại tại Mê Phim." />
  <meta name="keywords" content="phim quốc tế, xem phim quốc tế, phim từ các quốc gia khác, phim hay 2024" />
  <meta property="og:title" content="Xem Phim Quốc Gia Khác Hay Nhất 2024 | Mê Phim" />
  <meta property="og:description" content="Xem phim từ nhiều quốc gia khác nhau với đa dạng thể loại và chất lượng cao tại Mê Phim." />
  <meta property="og:image" content="URL_ảnh_đại_diện_trang_Quốc_Gia_Khác" />
  <meta property="og:url" content="https://www.mephim.com/quoc-gia-khac" />
  <meta property="og:type" content="website" />
  <link rel="canonical" href="https://www.mephim.com/quoc-gia-khac" />
  <meta name="robots" content="index, follow" />
</Helmet>

            <div className="container">
                <div className="caption mt-3 d-flex">
                    <p><IoIosHome /> mephim</p>
                    <p> &gt; </p>
                    <p>Các quốc gia khác</p>
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
                    Các quốc gia khác
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
