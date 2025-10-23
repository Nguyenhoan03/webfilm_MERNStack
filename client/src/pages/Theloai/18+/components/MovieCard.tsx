import React from 'react';
import { FaPlay, FaHeart, FaEye, FaStar } from 'react-icons/fa';

interface MovieCardProps {
  movie: {
    id: string;
    title: string;
    poster: string;
    duration?: string;
    views?: number;
    rating?: number;
    category?: string;
    year?: number;
  };
  viewMode?: 'grid' | 'list';
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, viewMode = 'grid' }) => {
  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const formatDuration = (duration: string) => {
    if (!duration) return '';
    const parts = duration.split(':');
    if (parts.length === 2) {
      return `${parts[0]}m ${parts[1]}s`;
    }
    return duration;
  };

  if (viewMode === 'list') {
    return (
      <div className="movie-card list-view">
        <div className="movie-poster">
          <img src={movie.poster} alt={movie.title} />
          <div className="play-overlay">
            <FaPlay />
          </div>
          <div className="movie-duration">
            {formatDuration(movie.duration || '')}
          </div>
        </div>
        
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <div className="movie-meta">
            <span className="movie-category">{movie.category}</span>
            {movie.year && <span className="movie-year">{movie.year}</span>}
          </div>
          <div className="movie-stats">
            <span className="stat">
              <FaEye /> {formatViews(movie.views || 0)}
            </span>
            <span className="stat">
              <FaStar /> {movie.rating?.toFixed(1) || 'N/A'}
            </span>
            <span className="stat">
              <FaHeart /> {Math.floor(Math.random() * 1000)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-card grid-view">
      <div className="movie-poster">
        <img src={movie.poster} alt={movie.title} />
        <div className="play-overlay">
          <FaPlay />
        </div>
        <div className="movie-duration">
          {formatDuration(movie.duration || '')}
        </div>
        <div className="movie-category-badge">
          {movie.category}
        </div>
      </div>
      
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          {movie.year && <span className="movie-year">{movie.year}</span>}
        </div>
        <div className="movie-stats">
          <span className="stat">
            <FaEye /> {formatViews(movie.views || 0)}
          </span>
          <span className="stat">
            <FaStar /> {movie.rating?.toFixed(1) || 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
