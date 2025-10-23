import React, { Suspense, useState } from "react";
import { IoIosHome, IoIosSearch, IoIosGrid, IoIosList } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { FaFire, FaStar, FaPlay, FaHeart, FaEye } from "react-icons/fa";
import Homepagebodyright from "../../../compoment/Homepagebodyright/Homepagebodyright";
import { useFilteredData } from "../../../hook/FilterData/useFilteredData";
import { Productdanhmucphim18plus } from "../../../services/Productservices";
import { Helmet } from "react-helmet";
import "./Plus18.scss";
import Itemsdanhmucfilm from "../../../compoment/Itemsdanhmucfilm/Itemsdanhmucfilm";

const FilterfilmCompoment = React.lazy(() => import("../../../compoment/FilterfilmCompoment/FilterfilmCompoment"));

export default function Plus18() {
    const { data, filters, setFilters, appliedFilters, setAppliedFilters } = useFilteredData(Productdanhmucphim18plus);
    const [viewMode, setViewMode] = useState('list');
    const [sortBy, setSortBy] = useState('latest');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentFilters, setCurrentFilters] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        // Implement search logic here
    };

    const handleFilterChange = (filters: any) => {
        setCurrentFilters(filters);
        // Implement filter logic here
    };

    const handleSortChange = (sort: string) => {
        setSortBy(sort);
        // Implement sort logic here
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Implement pagination logic here
    };

    return (
        <div className="plus18-page">
            <Helmet>
                <title>Phim 18+ | mephim - Xem phim online</title>
                <meta name="description" content="Tuyển tập phim sex, xnxx, sex viet, jav, hentaiz. Khám phá hàng loạt các bộ phim 18+ hấp dẫn và chất lượng cao tại mephim" />
                <meta name="keywords" content="phim sex, xnxx, sex viet, jav, hentaiz, phim 18+, phim người lớn, phim nóng, xem phim online" />
            </Helmet>
            
            {/* Header Section */}
            <div className="plus18-header">
                <div className="container">
                    <div className="breadcrumb">
                        <span className="breadcrumb-item">
                            <IoIosHome className="icon" />
                            mephim
                        </span>
                        <span className="breadcrumb-separator">›</span>
                        <span className="breadcrumb-item active">Phim 18+</span>
                    </div>
                    
                    <div className="page-title">
                        <h1>
                            <FaFire className="title-icon" />
                            Phim 18+ Hot
                        </h1>
                        <p className="subtitle">Khám phá những bộ phim 18+ hấp dẫn nhất</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container">
                <div className="plus18-content">
                    {/* Sidebar */}
                    <div className="plus18-sidebar">
                        <div className="sidebar-section">
                            <h3 className="sidebar-title">
                                <IoFilter className="icon" />
                                Bộ lọc
                            </h3>
                            <div className="filter-group">
                                <label>Sắp xếp theo:</label>
                                <select 
                                    value={sortBy} 
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="latest">Mới nhất</option>
                                    <option value="popular">Phổ biến</option>
                                    <option value="rating">Đánh giá cao</option>
                                    <option value="views">Xem nhiều</option>
                                </select>
                            </div>
                            
                            <div className="filter-group">
                                <label>Thể loại:</label>
                                <div className="category-tags">
                                    <span className="tag active">Tất cả</span>
                                    <span className="tag">JAV</span>
                                    <span className="tag">Hentai</span>
                                    <span className="tag">Sex Viet</span>
                                    <span className="tag">XNXX</span>
                                </div>
                            </div>
                        </div>

                        <div className="sidebar-section">
                            <h3 className="sidebar-title">
                                <FaStar className="icon" />
                                Phim hot
                            </h3>
                            <div className="hot-movies">
                                {[1,2,3,4,5].map((item) => (
                                    <div key={item} className="hot-movie-item">
                                        <div className="hot-movie-poster">
                                            <img src="/api/placeholder/60/80" alt="Hot movie" />
                                            <div className="play-overlay">
                                                <FaPlay />
                                            </div>
                                        </div>
                                        <div className="hot-movie-info">
                                            <h4>Phim hot {item}</h4>
                                            <div className="movie-stats">
                                                <span><FaEye /> 1.2M</span>
                                                <span><FaHeart /> 5.6K</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="plus18-main">
                        {/* Toolbar */}
                        <div className="content-toolbar">
                            <div className="toolbar-left">
                                <div className="search-box">
                                    <IoIosSearch className="search-icon" />
                                    <input 
                                        type="text" 
                                        placeholder="Tìm kiếm phim 18+..." 
                                        className="search-input"
                                    />
                                </div>
                            </div>
                            
                            <div className="toolbar-right">
                                <div className="view-controls">
                                   
                                    <button 
                                        className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                                        onClick={() => setViewMode('list')}
                                    >
                                        <IoIosList />
                                    </button>
                                </div>
                            </div>
                        </div>

                       
                        {/* Movies Grid/List */}
                        <div className={`movies-container ${viewMode}`}>
                            <Suspense fallback={
                                <div className="loading-container">
                                    <div className="loading-spinner"></div>
                                    <p>Đang tải phim...</p>
                                </div>
                            }>
                                <Itemsdanhmucfilm data={data} />
                            </Suspense>
                        </div>

                        
                    </div>
                </div>
            </div>
        </div>
    );
}
