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
  const { currentItems, pageCount, handlePageClick } = useLayoutItems({data, itemsPerPage:25});
  const [loadedImages, setLoadedImages] = useState<{[key: number]: boolean}>({});
  const [errorImages, setErrorImages] = useState<{[key: number]: boolean}>({});

  const handleImageLoad = (id: number) => {
    setLoadedImages(prev => ({...prev, [id]: true}));
  };

  const handleImageError = (id: number) => {
    setErrorImages(prev => ({...prev, [id]: true}));
  };

  return (
    <div>
      <div className="row movie-grid-container">
        {currentItems.map((pbm:any, index:number) => (
          <div key={pbm.id || index} className="category_phim_card_itemdanhmuc">
            <Link to={`/${pbm.title}`} className="movie-link">
              <div className="movie-card-wrapper">
                {/* Status Badge */}
                <div className="status-badge">
                  {pbm.trangthai}-{pbm.ngonngu}
                </div>
                
                {/* Image Container */}
                <div className="image-container">
                  {/* Loading placeholder */}
                  {!loadedImages[pbm.id] && !errorImages[pbm.id] && (
                    <div className="loading-placeholder">
                      <img src="/progress-loading-bar-buffering-download-upload-and-loading-icon-vector.jpg" alt="Loading..." style={{ width: 50, height: 50 }}/>
                    </div>
                  )}

                  {/* Error placeholder */}
                  {errorImages[pbm.id] ? (
                    <img 
                      src="/error-icon-24.png" 
                      alt="Error loading image"
                      className="movie-image error-image"
                    />
                  ) : (
                    <img 
                      className={`movie-image ${loadedImages[pbm.id] ? 'loaded' : ''}`}
                      src={pbm.hinhanh} 
                      alt={pbm.title}
                      onLoad={() => handleImageLoad(pbm.id)}
                      onError={() => handleImageError(pbm.id)}
                    />
                  )}

                  {/* Episode Badge */}
                  <div className="episode-badge">
                    {pbm.sotap && pbm.sotap.includes('Tập') ? pbm.sotap : `${pbm.sotap} Tập`}
                  </div>
                </div>

                {/* Title */}
                <div className="movie-title">
                  {pbm.title}
                </div>
              </div>
            </Link>
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