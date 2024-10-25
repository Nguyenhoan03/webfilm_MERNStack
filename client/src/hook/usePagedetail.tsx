import { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HomeContext } from '../store/HomeContext';
import { ProductDetail, HandleRating, ProductServiceUpdateView } from '../services/Productservices';
import { DataDetail } from '../pages/Detailpage/Detailpage';
import { HandleRatingParams } from '../services/Productservices';
export const useDetailPage = () => {
  const { token, id, email, phimhot, permissions, roles } = useContext(HomeContext) || {};
  const memophimhot = useMemo(() => phimhot, [phimhot]);
  const navigate = useNavigate();
  const { title } = useParams<{ title: string }>();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const [selectedStar, setSelectedStar] = useState<number>(0);
  const [checkbutton, setCheckbutton] = useState(1);
  const [datadetail, setDatadetail] = useState<DataDetail | null>(null);
  const [comment, setComment] = useState(null);
  const [parent_id, setParent_id] = useState(null);
  const [ratingtotal, setRatingtotal] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  const fetchData = useCallback(async () => {
    if (!title) return;
    
    try {
      setLoading(true);
      const data = await ProductDetail({ title, id, permissions, roles });
      if (data.error1 || data.error) {
        const errorMessage = data.error1
          ? "Bạn cần đăng nhập và mua gói xem VIP để có thể xem được phim này!"
          : "Bạn cần mua gói xem VIP để có thể xem được phim này!";
        alert(errorMessage);
        navigate(-1);
        return;
      }

      await ProductServiceUpdateView(title);
      setDatadetail(data.datafilm);
      setComment(data.comments);
      setParent_id(data.parent_id);
      setSelectedStar(data.rating_star?.rating || 0);
      setRatingtotal(Number(data.general_assessment.totalRatings) || 0);
      setAverageRating(Number(data.general_assessment.averageRating) || 0);
    } catch (error: any) {
      setError(error);
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [title, id, permissions, roles, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlecheckbutton = useCallback((key: number) => {
    setCheckbutton(key);
  }, []);

  const handlebuttonxemfilm = useCallback((): void => {
    if (datadetail?.linkfilms && datadetail.linkfilms.length > 0) {
      window.location.href = `/xem-phim/${datadetail.title}/tap-1`;
    } else {
      alert('Hiện tại phim này chưa cập nhật để xem !');
    }
  }, [datadetail]);

  const handleFormSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>, starselect: number): Promise<void> => {
    event.preventDefault();
    if (!token) {
      alert("Bạn cần đăng nhập để có thể đánh giá");
      return;
    }
    
    try {
      const ratingParams: HandleRatingParams = {
        token,
        titlefilm: title || '',
        id: id || '',
        email: email || '',
        starselect
      };
      await HandleRating(ratingParams);
      // Optionally, you could refresh the rating data here
      // await fetchData();
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Có lỗi xảy ra khi đánh giá. Vui lòng thử lại sau.');
    }
  }, [token, title, id, email]);

  return {
    loading,
    error,
    hoveredStar,
    setHoveredStar,
    selectedStar,
    setSelectedStar,
    checkbutton,
    datadetail,
    comment,
    parent_id,
    ratingtotal,
    averageRating,
    memophimhot,
    handlecheckbutton,
    handlebuttonxemfilm,
    handleFormSubmit,
    title
  };
};