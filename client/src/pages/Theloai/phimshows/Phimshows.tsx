import React, { Suspense } from "react";

import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../../compoment/Homepagebodyright/Homepagebodyright";
import { useFilteredData } from "../../../hook/FilterData/useFilteredData";
import { Productdanhmucphimshows } from "../../../services/Productservices";
import { Helmet } from "react-helmet";

const FilterfilmCompoment = React.lazy(()=>import("../../../compoment/FilterfilmCompoment/FilterfilmCompoment"));
export default function Phimshows() {
    const { data, filters, setFilters, appliedFilters, setAppliedFilters } = useFilteredData(Productdanhmucphimshows);

  
    return (
        <div className="">
            <Helmet>
  <title>Phim Shows Truyền Hình Hay | nghienphim - Xem Gameshow Trực Tuyến</title>
  <meta name="description" content="Xem các chương trình truyền hình, gameshow hot nhất từ Việt Nam và thế giới. Cập nhật nhanh các show giải trí, thực tế, hài hước, ca nhạc, thể thao và nhiều thể loại hấp dẫn tại nghienphim" />
  <meta name="keywords" content="phim shows, chương trình truyền hình, gameshow, show truyền hình Việt Nam, show quốc tế, show thực tế, show giải trí, xem gameshow, gameshow Việt Nam, show ca nhạc, show thể thao, show hài hước, xem show truyền hình miễn phí, phim shows mới nhất" />
</Helmet>

            <div className="container">
                <div className="caption mt-3 d-flex align-items-center gap-2">
                    <p><IoIosHome /> nghienphim</p>
                    <p> &gt; </p>
                    <p> TV Shows</p>
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
                    tv shows
                </p>
                <div className="row">
                    <div className="col-12 col-lg-9 mb-4">
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
                    <div className="col-12 col-lg-3">
                        <Homepagebodyright />
                    </div>
                </div>
            </div>
        </div>
    );
}
