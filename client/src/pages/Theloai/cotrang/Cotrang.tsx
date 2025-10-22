import React, { Suspense } from "react";

import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../../compoment/Homepagebodyright/Homepagebodyright";
import { useFilteredData } from "../../../hook/FilterData/useFilteredData";
import { Productdanhmucphimcotrang } from "../../../services/Productservices";
import { Helmet } from "react-helmet";

const FilterfilmCompoment = React.lazy(()=>import("../../../compoment/FilterfilmCompoment/FilterfilmCompoment"));
export default function Cotrang() {
    const { data, filters, setFilters, appliedFilters, setAppliedFilters } = useFilteredData(Productdanhmucphimcotrang);

  
    return (
        <div className="">
            <Helmet>
  <title>Phim Cổ Trang | mephim - Xem phim online</title>
  <meta name="description" content="Tuyển tập phim cổ trang đặc sắc từ nhiều nền văn hóa, bao gồm Trung Quốc, Hàn Quốc, và nhiều quốc gia khác. Xem phim cổ trang chất lượng cao tại mephim" />
  <meta name="keywords" content="phim cổ trang, phim cổ trang Trung Quốc, phim cổ trang Hàn Quốc, phim cổ trang Việt Nam, xem phim cổ trang, phim cổ trang mới" />
</Helmet>

            <div className="container">
                <div className="caption mt-3 d-flex">
                    <p><IoIosHome /> mephim</p>
                    <p> &gt; </p>
                    <p> Cổ trang</p>
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
                    Phim cổ trang
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
