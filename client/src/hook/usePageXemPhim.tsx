import { useState, useEffect } from 'react';
import { Dataxemphim } from '../services/Xemfilmservices';
import { ProductDetail } from '../services/Productservices';
import { CommentComponentProps } from '../compoment/CommentCompoment/CommentCompoment';
interface FilmData {
    title: string;
    episode: string;
    linkfilm: string;
}

interface DetailData {
    title: string;
    nameenglish: string;
    chatluong: string;
    ngonngu: string;
    descripts: string;
    theloai: string;
    linkfilms: { episode: number }[];
}
interface UsePageXemphimResult {
    datafilm: FilmData | null;
    datadetail: DetailData | null;
    loading: boolean;
    error: Error | null;
    ktranextepisode: boolean;
    parent_id: string | null;
    comment: CommentComponentProps[] | null;
    handlenextepisode: () => void;
    numbertapfilmcurent: number;
  }
export const usePageXemPhim = (title: string | undefined, episode: string | any): UsePageXemphimResult => {
    const [datafilm, setDataFilm] = useState<FilmData | null>(null);
    const [datadetail, setDataDetail] = useState<DetailData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [ktranextepisode, setKtraNextEpisode] = useState<boolean>(false);
    const [parent_id, setParentId] = useState<string | null>(null);
    const [comment, setComment] = useState<CommentComponentProps[] | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (title && episode) {
                    const response = await Dataxemphim({ title, episode });
                    setDataFilm(response.data);
                }
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [title, episode]);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                if (title) {
                    const data = await ProductDetail({ title });
                    setDataDetail(data.datafilm);
                    setComment(data.comments);
                    setParentId(data.parent_id);
                }
            } catch (error) {
                setError(error as Error);
            }
        };

        fetchDetail();
    }, [title]);

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error.message}</div>;
    // if (!datafilm) return null;

    const tongsotapfilm = datadetail?.linkfilms.length ?? 0;
    const numbertapfilmcurent = parseInt(episode?.replace('tap-', '') ?? '0', 10);
    const tapTiepTheo = numbertapfilmcurent + 1;

    const handlenextepisode = () => {
        if (numbertapfilmcurent < tongsotapfilm) {
            window.location.href = `/xem-phim/${datadetail?.title}/tap-${tapTiepTheo}`;
        } else {
            setKtraNextEpisode(true);
        }
    };

    return {
        datafilm,
        datadetail,
        ktranextepisode,
        parent_id,
        comment,
        numbertapfilmcurent,
        handlenextepisode,
        loading,
        error,
    }
}
