import React from 'react';
import MovieCard from './MovieCard';

interface Movie {
  id: string;
  title: string;
  poster: string;
  duration?: string;
  views?: number;
  rating?: number;
  category?: string;
  year?: number;
}

interface MovieGridProps {
  movies: Movie[];
  viewMode: 'grid' | 'list';
  loading?: boolean;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, viewMode, loading = false }) => {
  if (loading) {
    return (
      <div className="movie-grid-loading">
        <div className="loading-spinner"></div>
        <p>Đang tải phim...</p>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="movie-grid-empty">
        <div className="empty-icon">🎬</div>
        <h3>Không tìm thấy phim nào</h3>
        <p>Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
      </div>
    );
  }

  return (
    <div className={`movie-grid ${viewMode}`}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
};

export default MovieGrid;
