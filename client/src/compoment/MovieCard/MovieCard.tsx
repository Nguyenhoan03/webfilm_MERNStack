import React, { useState } from "react";
import { Link } from "react-router-dom";
import './MovieCard.scss'
import 'react-lazy-load-image-component/src/effects/blur.css';
interface ItemData {
  title: string;
  trangthai: string;
  ngonngu: string;
  hinhanh: string;
  theloai: string;
  namphathanh: number;
  views: number;
  sotap: string;
  descripts: string;
}
interface MovieCardProps {
  data: ItemData[];
}
const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="category_phim">
      <div className="row">
        {data &&
          data.map((pbm, index) => (
            <div
              key={index}
              className="category_phim_card"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link to={`/${pbm.title}`}>
                <p className="title-badge">
                  {pbm.trangthai}-{pbm.ngonngu}
                </p>
                <picture>
                  <source
                    srcSet={pbm.hinhanh.replace(/\.(jpeg|png)$/, ".webp")}
                    className="lazyload"
                    type="image/webp"
                  />
                  <img
                    src={pbm.hinhanh}
                    alt={pbm.title}
                    className="lazyload"
                  />
                </picture>

                <p className="description-badge2">
                  {pbm.sotap && pbm.sotap.includes("Tập")
                    ? pbm.sotap
                    : `${pbm.sotap} Tập`}
                </p>
                <p className="description-badge">
                  {pbm.title}
                </p>

                {hoveredIndex === index && (
                  <div className="hover-info">
                    <h5>{pbm.title}</h5>
                    <p><span>Thể loại:</span> {pbm.theloai}</p>
                    <p><span>Năm phát hành:</span> {pbm.namphathanh}</p>
                    <p><span>Viewer:</span> {pbm.views}</p>
                    <p className="description"><span>Descripts:</span> {pbm.descripts}</p>
                    <p>
                      <Link to={`/${pbm.title}`}>
                        Xem thêm
                      </Link>
                    </p>
                  </div>
                )}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MovieCard;
