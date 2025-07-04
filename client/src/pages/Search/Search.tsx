import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import Homepagebodyright from "../../compoment/Homepagebodyright/Homepagebodyright";
import FilterfilmCompoment from "../../compoment/FilterfilmCompoment/FilterfilmCompoment";

export default function Search() {
  const location = useLocation();
  const data_tk = location.state?.data_tk || []; // Accessing the passed state
  const params = useParams();
  const [data, setData] = useState(data_tk); // Initialize state with passed data
  const [filters, setFilters] = useState({});
  const [appliedFilters, setAppliedFilters] = useState({});

  console.log("Data received in Search:", data_tk);

  return (
    <div className="">
      <div className="container">
        <div className="caption mt-3 d-flex align-items-center gap-2">
          <p><IoIosHome /> nghienphim</p>
          <p> &gt; </p>
          <p>Kết quả tìm kiếm : {params.content_search}</p>
        </div>
    
        <div className="row">
          <div className="col-12 col-lg-9 mb-4">
            <div className="">
              <div className="category_phim">
                <FilterfilmCompoment
                  data={data}
                  filters={filters}
                  setFilters={setFilters}
                  appliedFilters={appliedFilters}
                  setAppliedFilters={setAppliedFilters}
                />
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
