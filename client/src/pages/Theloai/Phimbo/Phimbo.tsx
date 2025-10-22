import React, { Suspense } from "react";

import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../../compoment/Homepagebodyright/Homepagebodyright";
import { useFilteredData } from "../../../hook/FilterData/useFilteredData";
import { Productdanhmucphimbo } from "../../../services/Productservices";
import { Helmet } from "react-helmet";

import './Style.scss'
const FilterfilmCompoment = React.lazy(()=>import("../../../compoment/FilterfilmCompoment/FilterfilmCompoment"));
export default function Phimbo() {
    const { data, filters, setFilters, appliedFilters, setAppliedFilters } = useFilteredData(Productdanhmucphimbo);

  
    return (
        <div className="">
            <Helmet>
  <title>Phim Bộ Hay Nhất | mephim - Xem Phim Online Miễn Phí</title>
  <meta name="description" content="Xem phim bộ hay nhất, tuyển chọn các bộ phim nhiều tập đặc sắc từ Hàn Quốc, Trung Quốc, Mỹ và nhiều quốc gia khác. Trải nghiệm xem phim bộ HD, miễn phí, với phụ đề tiếng Việt tại mephim" />
  <meta name="keywords" content="phim bộ, phim bộ Hàn Quốc, phim bộ Trung Quốc, phim bộ Mỹ, phim bộ Thái Lan, phim bộ Nhật Bản, phim dài tập, phim bộ tâm lý tình cảm, phim bộ hành động, phim bộ hài hước, phim bộ mới, xem phim bộ online, phim bộ 2024" />
</Helmet>

            <div className="container">
                <div className="caption mt-3 d-flex">
                    <p><IoIosHome /> mephim</p>
                    <p> &gt; </p>
                    <p> Phim bộ</p>
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
                    Phim bộ
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
