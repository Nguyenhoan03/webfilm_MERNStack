import { useState, useEffect } from 'react';
import { Getallproduct } from '../../services/Productservices';
import { Getdetailfilm } from '../../services/Productservices';
import axios from 'axios';
export interface Film {
    title: string;
    episode: string;
    linkfilm: string;
    id?: number;
}
export const usePageAddEpisode = () => {
const [titlefilm, setTitlefilm] = useState<Film[]>([]);
const [episode, setEpisode] = useState<string>('');
const [linkfilm, setLinkFilm] = useState<string>('');
const [selectedTitle, setSelectedTitle] = useState<string>('');
const [searchTerm, setSearchTerm] = useState<string>('');
const [detailfilm, setDetailfilm] = useState<Film[]>([]);
useEffect(() => {
    const fetchData = async () => {
        const data = await Getallproduct();
        if(!data) return
        setTitlefilm(data.data);
    };
    fetchData();
}, []);

useEffect(() => {
    if (selectedTitle) {
        const fetchDetailFilm = async () => {
            try {
                const dataxemphim = await Getdetailfilm(selectedTitle);
                setDetailfilm(dataxemphim.data);
            } catch (error) {
                console.error("Error fetching detail film:", error);
            }
        };
        fetchDetailFilm();
    }
}, [selectedTitle]);

const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
};

const handleTitleSelect = (title:string) => {
    setSelectedTitle(title);
    setSearchTerm(title);
};


const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/product/create_xemphim`,
            { selectedTitle, episode, linkfilm }
        );

        if (response.status === 200) {
            alert('Thêm tập phim mới thành công');
        } else {
            alert('Có lỗi xảy ra, vui lòng thử lại.');
        }
    } catch (error) {
        console.error("Error submitting the form:", error);
        alert('Có lỗi xảy ra, vui lòng thử lại.');
    }
};

const filteredTitles = (titlefilm || []).filter((film) =>
    film.title.toLowerCase().includes(searchTerm.toLowerCase())
);

const handleEdit = (index:number|string|any) => {
    const film = detailfilm[index];
    setSelectedTitle(film.title);
    setEpisode(film.episode);
    setLinkFilm(film.linkfilm);
};

const handleDelete = (index:number|string|any) => {
    const updatedDetailfilm = detailfilm.filter((_, i) => i !== index);
    setDetailfilm(updatedDetailfilm);
};
return {
    detailfilm,
    handleSearchChange,
    handleTitleSelect,
    handleSubmit,
    filteredTitles,
    handleEdit,
    handleDelete,
    searchTerm,
    episode,
    linkfilm,
    setLinkFilm,
    setEpisode
}

}