import React from "react";
import "./Style.scss";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useLayoutItems } from "../../hook/useLayoutItems";

interface Item {
  id: number;
  title: string;
  hinhanh: string;
  trangthai: string;
  ngonngu: string;
  sotap: string;
}

interface ItemsdanhmucfilmProps {
  data: Item[];
}

export default function Itemsdanhmucfilm({ data }: ItemsdanhmucfilmProps) {
  const { currentItems, pageCount, handlePageClick } = useLayoutItems({data, itemsPerPage:25});

  return (
    <div>
      <div className="row">
        {currentItems.map((pbm:any, index:number) => (
          <div key={pbm.id || index} className="category_phim_card_itemdanhmuc col-md-3" style={{ position: 'relative', height: '100%' }}>
            <p
              className="title-badge"
              style={{
                position: 'absolute',
                top: 5,
                left: 15,
                backgroundColor: '#BF1D28',
                color: 'white',
                fontWeight: 650,
                fontSize: 12,
                borderRadius: 4,
                width: 117,
                textAlign: 'center'
              }}
            >
              {pbm.trangthai}-{pbm.ngonngu}
            </p>
            <picture>
              <source srcSet={pbm.hinhanh.replace(/\.(jpeg|png)$/, ".webp")} type="image/webp" className="lazyload" style={{ width: 175, height: 245 }}/>
              <img style={{ width: 175, height: 245 }} className="img-fluid lazyload" src={pbm.hinhanh} alt={pbm.title} loading="lazy"/>
              <p className="description-badge2" style={{ marginLeft: 12 , color: 'white',position:'absolute',bottom:40,width:100,height: 30,borderRadius:10,alignContent:'center',textAlign:'center',backgroundColor:'#522e75'}}>
                {pbm.sotap && pbm.sotap.includes('Tập') ? pbm.sotap : `${pbm.sotap} Tập`}
              </p>
            </picture>
            <p className="description-badge" style={{ marginLeft: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',backgroundColor:'#181818',color:'white',fontSize:17,fontWeight:550,borderRadius:5 }}>
              <Link to={`/${pbm.title}`} style={{ color: 'white' }}>
                {pbm.title}
              </Link>
            </p>
          </div>
        ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        activeClassName="active"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
      />
    </div>
  );
}