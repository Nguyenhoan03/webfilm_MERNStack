import Leftadmincompoment from '../../../../compoment/AdminCompoment/Leftadmincompoment/Leftadmincompoment';
import Right_navbarcompoment from '../../../../compoment/AdminCompoment/Right_navbarcompoment/Right_navbarcompoment';
import { MdShoppingCart, MdAttachMoney, MdOutlineShoppingBag } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import "./Addepisode.scss";
import StatusCard from '../../../../compoment/StatusCard';
import {usePageAddEpisode, Film} from "../../../../hook/admin/usePageAddEpisode";


export default function Addepisode() {
  const { detailfilm, handleSearchChange, handleTitleSelect, handleSubmit, filteredTitles, handleEdit, handleDelete,setEpisode, setLinkFilm, searchTerm, episode, linkfilm} = usePageAddEpisode();

    return (
        <div className="dashboard-container">
            <div className="row">
                <div className="col-md-2">
                    <Leftadmincompoment />
                </div>
                <div className="col-md-10">
                    <Right_navbarcompoment />
                    <div className="row mt-4">
                        <div className="col-12 col-md-6 col-lg-3 mb-3">
                            <StatusCard icon={<MdShoppingCart />} count="1,995" title="Tổng số phim" />
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 mb-3">
                            <StatusCard icon={<MdAttachMoney />} count="$2,632" title="" />
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 mb-3">
                            <StatusCard icon={<FaUserFriends />} count="1,711" title="Tổng số người dùng" />
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 mb-3">
                            <StatusCard icon={<MdOutlineShoppingBag />} count="2,001" title="Daily Visits" />
                        </div>
                    </div>
                    <div className="col-12">
                        <form className="movie-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="quocgia">Thể loại phim</label>
                                <div style={{ position: 'relative', width: '100%' }}>
                                    <input
                                        type="text"
                                        style={{
                                            width: '100%',
                                            height: 40,
                                            borderRadius: 7,
                                            backgroundColor: '#E8F0FE',
                                            paddingLeft: 10,
                                        }}
                                        placeholder="Nhập phim cần tìm ..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                    {filteredTitles.length > 0 && (
                                        <ul
                                            style={{
                                                position: 'absolute',
                                                top: 40,
                                                width: '100%',
                                                maxHeight: 200,
                                                overflowY: 'auto',
                                                backgroundColor: 'white',
                                                border: '1px solid #ccc',
                                                borderRadius: 7,
                                                listStyleType: 'none',
                                                padding: 0,
                                                margin: 0,
                                                zIndex: 1000,
                                            }}
                                        >
                                            {filteredTitles.map((dt, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => handleTitleSelect(dt.title)}
                                                    style={{
                                                        padding: '10px 15px',
                                                        cursor: 'pointer',
                                                        borderBottom: '1px solid #eee',
                                                    }}
                                                >
                                                    {dt.title}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>

                            <div className="form-group" style={{ marginTop: filteredTitles.length > 0 ? '220px' : '20px' }}>
                                <label htmlFor="episode">Tập số</label>
                                <input
                                    type="text"
                                    id="episode"
                                    name="episode"
                                    placeholder="Nhập số tập"
                                    value={episode}
                                    onChange={(e) => setEpisode(e.target.value)}
                                />
                            </div>

                            <div className="form-group" style={{ marginTop: '0px' }}>
                                <label htmlFor="linkfilm">Link phim</label>
                                <input
                                    type="text"
                                    id="linkfilm"
                                    name="linkfilm"
                                    placeholder="Nhập link phim"
                                    value={linkfilm}
                                    onChange={(e) => setLinkFilm(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="submit-btn">Submit</button>
                        </form>

                        <div className="movie-details-container">
    <h3 className="details-header mt-3">Chi tiết phim đã chọn</h3>
    {
    detailfilm.map((dt:Film, index:number) => (
        <div key={index} className="detail-card">
            <div className="detail-info">
                <p><strong>Thể loại:</strong> {dt.title}</p>
                <p><strong>Tập số:</strong> {dt.episode}</p>
                <p><strong>Link phim:</strong> <a href={dt.linkfilm} target="_blank" rel="noopener noreferrer">{dt.linkfilm}</a></p>
            </div>
            <div className="detail-actions">
                <button className="edit-btn" onClick={() => handleEdit(dt)}>Sửa</button>
                <button className="delete-btn" onClick={() => handleDelete(dt.id)}>Xóa</button>
            </div>
        </div>
    ))
}
</div>

                    </div>
                </div>
            </div>
        </div>
    );
}
