import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Getallproduct } from '../services/Productservices';
import { toast } from 'react-toastify';
import useAuth from './useAuth';
interface Product {
    hinhanh: string;
    title: string;
    nameenglish: string;
  }
export const useLayoutHeader = () => {
const { hasRole, hasPermissions } = useAuth();
const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
const [showDropdown, setShowDropdown] = useState<boolean>(false);
const [search, setSearch] = useState<string>("");
const [filteredData, setFilteredData] = useState<Product[]>([]);
const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
const [tabMenuVisible, setTabMenuVisible] = useState<boolean>(false);

const navigate = useNavigate();
const token = sessionStorage.getItem("token");
const name = sessionStorage.getItem("name");

useEffect(() => {
  if (search.trim() === "") {
    setFilteredData([]);
    return;
  }

  const fetchData = async () => {
    try {
      const response = await Getallproduct();
      if(!response || !response.data) return;
      const filterSearch = response.data
        .filter((item: Product) => item.title && item.title.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 5);
      setFilteredData(filterSearch);
    } catch (error) {
      console.error(error); 
    }
  };
  fetchData();
}, [search]);

useEffect(() => {
  if (token && name) {
    setIsLoggedIn(true);
  }
}, [token, name]);

const handleLogout = () => {
  const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
  if (confirmLogout) {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("id");
    setIsLoggedIn(false);
    toast.success("Bạn đã đăng xuất thành công!");
  }
};

const handleSearch = () => {
  navigate(`/tim-kiem/${search}`, { state: { data_tk: filteredData } });
  setSearch('');
};

const handleTabMenuToggle = () => {
  setTabMenuVisible(!tabMenuVisible);
};
return {
    isLoggedIn,
    showDropdown,
    setShowDropdown,
    search,
    setSearch,
    filteredData,
    activeDropdown,
    setActiveDropdown,
    tabMenuVisible,
    name,
    handleLogout,
    handleSearch,
    handleTabMenuToggle,
    hasRole,
    hasPermissions
  };
};