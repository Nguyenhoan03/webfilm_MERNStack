import { useState } from "react";
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
  const { currentItems, pageCount, handlePageClick } = useLayoutItems({ data, itemsPerPage: 25 });
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});
  const [errorImages, setErrorImages] = useState<{ [key: number]: boolean }>({});

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  const handleImageError = (id: number) => {
    setErrorImages(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {currentItems.map((pbm: any, index: number) => (
          <div
            key={pbm.id || index}
            className="col-6 col-md-4 col-lg-3 mb-4 d-flex align-items-stretch"
          >
            <div className="category_phim_card_itemdanhmuc card w-100" style={{ position: 'relative', height: '100%' }}>
              <Link to={`/${pbm.title}`} style={{ color: 'white', textDecoration: 'none' }}>
                {/* Badge trạng thái */}
                <span
                  className="badge position-absolute"
                  style={{
                    top: 0,
                    left: 0,
                    backgroundColor: '#BF1D28',
                    color: 'white',
                    fontWeight: 650,
                    fontSize: 12,
                    
                    width: '100%',
                    textAlign: 'center',
                    zIndex: 2
                  }}
                >
                  {pbm.trangthai}-{pbm.ngonngu}
                </span>

                {/* Ảnh phim */}
                <div className="position-relative" style={{ width: '100%', height: 245 }}>
                  {/* Loading placeholder */}
                  {!loadedImages[pbm.id] && !errorImages[pbm.id] && (
                    <div className="loading-placeholder d-flex justify-content-center align-items-center position-absolute w-100 h-100" style={{ background: '#f0f0f0', zIndex: 1 }}>
                      <img src="/progress-loading-bar-buffering-download-upload-and-loading-icon-vector.jpg" alt="Loading..." style={{ width: 50, height: 50 }} />
                    </div>
                  )}

                  {/* Error placeholder */}
                  {errorImages[pbm.id] ? (
                    <img
                      src="/error-icon-24.png"
                      alt="Error loading image"
                      className="card-img-top"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <picture>
                      <source
                        srcSet={pbm.hinhanh.replace(/\.(jpeg|png)$/, ".webp")}
                        type="image/webp"
                        className="lazyload"
                      />
                      <img
                        className={`card-img-top img-fluid lazyload ${loadedImages[pbm.id] ? 'loaded' : ''}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        src={pbm.hinhanh}
                        alt={pbm.title}
                        onLoad={() => handleImageLoad(pbm.id)}
                        onError={() => handleImageError(pbm.id)}
                      />
                    </picture>
                  )}

                  {/* Badge số tập */}
                  <span
                    className="badge position-absolute"
                    style={{
                      left: 12,
                      bottom: 40,
                      width: 100,
                      height: 30,
                      borderRadius: 10,
                      backgroundColor: '#522e75',
                      color: 'white',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {pbm.sotap && pbm.sotap.includes('Tập') ? pbm.sotap : `${pbm.sotap} Tập`}
                  </span>
                </div>

                {/* Tiêu đề phim */}
                <div className="card-body p-2">
                  <p
                    className="card-title mb-0"
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      backgroundColor: '#181818',
                      color: 'white',
                      fontSize: 17,
                      fontWeight: 550,
                      borderRadius: 5,
                      marginLeft: 12
                    }}
                  >
                    {pbm.title}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Phân trang */}
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
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
      </div>
    </div>
  );
}