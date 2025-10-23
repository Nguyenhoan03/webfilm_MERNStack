import React, { useState } from 'react';
import { IoIosSearch, IoIosClose } from 'react-icons/io';
import { FaFilter } from 'react-icons/fa';

interface FilterBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: any) => void;
  onSortChange: (sortBy: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onSearch, onFilterChange, onSortChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    year: 'all',
    rating: 'all',
    duration: 'all'
  });

  const categories = [
    { value: 'all', label: 'Tất cả' },
    { value: 'jav', label: 'JAV' },
    { value: 'hentai', label: 'Hentai' },
    { value: 'sex-viet', label: 'Sex Viet' },
    { value: 'xnxx', label: 'XNXX' },
    { value: 'porn', label: 'Porn' }
  ];

  const years = [
    { value: 'all', label: 'Tất cả năm' },
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' }
  ];

  const ratings = [
    { value: 'all', label: 'Tất cả đánh giá' },
    { value: '4.5', label: '4.5+ sao' },
    { value: '4.0', label: '4.0+ sao' },
    { value: '3.5', label: '3.5+ sao' },
    { value: '3.0', label: '3.0+ sao' }
  ];

  const durations = [
    { value: 'all', label: 'Tất cả thời lượng' },
    { value: 'short', label: 'Dưới 10 phút' },
    { value: 'medium', label: '10-30 phút' },
    { value: 'long', label: 'Trên 30 phút' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: 'all',
      year: 'all',
      rating: 'all',
      duration: 'all'
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== 'all');

  return (
    <div className="filter-bar">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="search-section">
        <div className="search-input-group">
          <IoIosSearch className="search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm phim 18+..."
            className="search-input"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="clear-search"
            >
              <IoIosClose />
            </button>
          )}
        </div>
        <button type="submit" className="search-btn">
          Tìm kiếm
        </button>
      </form>

      {/* Filter Toggle */}
      <div className="filter-toggle">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`filter-toggle-btn ${showFilters ? 'active' : ''}`}
        >
          <FaFilter className="icon" />
          Bộ lọc
          {hasActiveFilters && <span className="filter-count">!</span>}
        </button>
        
        {hasActiveFilters && (
          <button onClick={clearFilters} className="clear-filters-btn">
            <IoIosClose className="icon" />
            Xóa bộ lọc
          </button>
        )}
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="filter-options">
          <div className="filter-row">
            <div className="filter-group">
              <label>Thể loại:</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="filter-select"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Năm:</label>
              <select
                value={filters.year}
                onChange={(e) => handleFilterChange('year', e.target.value)}
                className="filter-select"
              >
                {years.map(year => (
                  <option key={year.value} value={year.value}>
                    {year.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Đánh giá:</label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
                className="filter-select"
              >
                {ratings.map(rating => (
                  <option key={rating.value} value={rating.value}>
                    {rating.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Thời lượng:</label>
              <select
                value={filters.duration}
                onChange={(e) => handleFilterChange('duration', e.target.value)}
                className="filter-select"
              >
                {durations.map(duration => (
                  <option key={duration.value} value={duration.value}>
                    {duration.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
