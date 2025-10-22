import React, { Suspense } from "react";

import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../../compoment/Homepagebodyright/Homepagebodyright";
import { useFilteredData } from "../../../hook/FilterData/useFilteredData";
import { Productdanhmucphimhanhdong } from "../../../services/Productservices";
import { Helmet } from "react-helmet";
import FilterfilmCompoment from "../../../compoment/FilterfilmCompoment/FilterfilmCompoment";
export default function Hanhdong() {
    const { data, filters, setFilters, appliedFilters, setAppliedFilters } = useFilteredData(Productdanhmucphimhanhdong);
    return (
        <div className="">
            <Helmet>
  <title>Phim Hành Động | nghienphim - Xem phim online</title>
  <meta name="description" content="Xem phim hành động gay cấn, những pha rượt đuổi, đánh nhau kịch tính tại nghienphim Phim hành động chất lượng cao, miễn phí." />
  <meta name="keywords" content="phim hành động, phim võ thuật, phim hành động Mỹ, phim hành động Hàn Quốc, phim hành động mới" />
</Helmet>

            <div className="container">
                <div className="caption mt-3 d-flex">
                    <p><IoIosHome /> nghienphim</p>
                    <p> &gt; </p>
                    <p> Hành động</p>
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
                    Phim hành động
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
