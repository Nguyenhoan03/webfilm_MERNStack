import React, { Suspense } from "react";

import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../compoment/Homepagebodyright/Homepagebodyright";
import { useFilteredData } from "../../hook/FilterData/useFilteredData";
import { Productquocgia_bodaonha } from "../../services/Productservices";

import { Helmet } from "react-helmet";
const FilterfilmCompoment = React.lazy(()=>import("../../compoment/FilterfilmCompoment/FilterfilmCompoment"));

export default function Bodaonha() {
    const { data, filters, setFilters, appliedFilters, setAppliedFilters } = useFilteredData(Productquocgia_bodaonha);
  
    return (
        <div className="">
            <Helmet>
            <title>Phim Bồ Đào Nha | nghienphim - Xem phim online</title>
<meta name="description" content="Thưởng thức những bộ phim đặc sắc từ Bồ Đào Nha tại nghienphim. Xem phim Bồ Đào Nha miễn phí, chất lượng cao với phụ đề tiếng Việt." />
<meta name="keywords" content="phim Bồ Đào Nha, phim Bồ Đào Nha hay, xem phim Bồ Đào Nha, phim Bồ Đào Nha 2024, phim châu Âu, phim Bồ Đào Nha phụ đề tiếng Việt" />

            </Helmet>
            <div className="container">
                <div className="caption mt-3 d-flex">
                    <p><IoIosHome /> nghienphim</p>
                    <p> &gt; </p>
                    <p>Bồ Đào Nha</p>
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
                    Phim Bồ Đào Nha
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
