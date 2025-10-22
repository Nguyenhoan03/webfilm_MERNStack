import React, { Suspense } from "react";

import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../compoment/Homepagebodyright/Homepagebodyright";
import { useFilteredData } from "../../hook/FilterData/useFilteredData";
import { Productquocgia_nauy } from "../../services/Productservices";

import { Helmet } from "react-helmet";
const FilterfilmCompoment = React.lazy(()=>import("../../compoment/FilterfilmCompoment/FilterfilmCompoment"));

export default function Nauy() {
    const { data, filters, setFilters, appliedFilters, setAppliedFilters } = useFilteredData(Productquocgia_nauy);

  
    return (
        <div className="">
            <Helmet>
            <title>Phim Nauy | mephim - Xem phim online</title>
<meta name="description" content="Thưởng thức những bộ phim đặc sắc từ Nauy tại mephim. Xem phim Nauy miễn phí, chất lượng cao với phụ đề tiếng Việt." />
<meta name="keywords" content="phim Nauy, phim Nauy hay, xem phim Nauy, phim Nauy 2024, phim châu Âu, phim Nauy phụ đề tiếng Việt" />

            </Helmet>
            <div className="container">
                <div className="caption mt-3 d-flex">
                    <p><IoIosHome /> mephim</p>
                    <p> &gt; </p>
                    <p>Nauy</p>
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
                    Phim Nauy
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
