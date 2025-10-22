import React, { Suspense } from "react";

import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../compoment/Homepagebodyright/Homepagebodyright";
import { useFilteredData } from "../../hook/FilterData/useFilteredData";
import { Productquocgia_aumy } from "../../services/Productservices";

import { Helmet } from "react-helmet";
const FilterfilmCompoment = React.lazy(()=>import("../../compoment/FilterfilmCompoment/FilterfilmCompoment"));

export default function Aumy() {
    const { data, filters, setFilters, appliedFilters, setAppliedFilters } = useFilteredData(Productquocgia_aumy);

  
    return (
        <div className="">
            <Helmet>
  <title>Xem Phim Âu Mỹ Hay Nhất 2024 | Nghiện Phim</title>
  <meta name="description" content="Xem phim Âu Mỹ mới nhất, chất lượng cao với các thể loại: hành động, phiêu lưu, tình cảm, kinh dị và nhiều thể loại khác tại Nghiện Phim." />
  <meta name="keywords" content="phim Âu Mỹ, xem phim Âu Mỹ, phim hành động Âu Mỹ, phim tình cảm Âu Mỹ, phim kinh dị Âu Mỹ, phim mới 2024" />
  <meta property="og:title" content="Xem Phim Âu Mỹ Hay Nhất 2024 | Nghiện Phim" />
  <meta property="og:description" content="Khám phá bộ sưu tập phim Âu Mỹ mới nhất, đa dạng thể loại với chất lượng cao tại Nghiện Phim." />
  <meta property="og:image" content="URL_ảnh_đại_diện_trang_Âu_Mỹ" />
  <meta property="og:url" content="https://www.nghienphim.com/au-my" />
  <meta property="og:type" content="website" />
  <link rel="canonical" href="https://www.nghienphim.com/au-my" />
  <meta name="robots" content="index, follow" />
</Helmet>

            <div className="container">
                <div className="caption mt-3 d-flex">
                    <p><IoIosHome /> nghienphim</p>
                    <p> &gt; </p>
                    <p>Âu mỹ</p>
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
                    Phim Âu mỹ
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
