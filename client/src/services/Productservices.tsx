import axios from 'axios';
export interface FilmData {
  id?: number | string | null 
  title: string;
  hinhanh: string;
  nameenglish: string;
  trangthai: string;
  sotap: string;
  thoiluong: string;
  namphathanh: string;
  chatluong: string;
  ngonngu: string;
  daodien: string;
  dienvien: string;
  theloai: string;
  quocgia: string;
  descripts: string;
  category_id: string;
  VIP1?: number;
  views?: number | string
  likes?: number | string
}
export interface ProductDetailParams {
  title?: string | any ;
  id?: string | any;
  permissions?: string[];
  roles?: string[]; 
}
interface FetchDataParams {
  endpoint: string;
  filters?: Record<string, any>; 
}

interface UserCommentParams {
  token: string;
  titlefilm?: string | any;
  contentcomment: string;
}

export interface HandleRatingParams {
  token: string;
  titlefilm: string | null | any;
  id?: string | undefined;
  email?: string;
  starselect?: number; 
  contentcomment?: string,
}


interface UserChildCommentParams {
  token: string;
  titlefilm: string | any;
  contentcomment: string;
  parent_id: number|string;
}

const Producthome = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/product/product-home`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
const ProductDetail = async ({title, id, permissions}: ProductDetailParams): Promise<any> => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/product/${title}`;
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'userId': id
      }
    });

    // Kiểm tra nếu phim yêu cầu quyền VIP1
    if (response.data.datafilm.VIP1 === 1) {
      console.log("firstvip1")
      console.log("firstVIP12",permissions);
      if (!permissions) {
        return { error1: true };
      }

      if (permissions.includes("VIP1") || permissions.includes("VIP2")) {
        return response.data;
      } else {
        return { error: true }; 
      }
    }

    return response.data;
  } catch (error) {
    console.error("Error in ProductDetail:", error);
    throw error;
  }
};

const Getallproduct =async ()=>{
    try {
      const data = axios.get(`${process.env.REACT_APP_API_URL}/product`)
      if(data){
        return data;
      }
    } catch (error) {
      throw(error)
    }
}
const services_edit_productphim = async (data: FilmData): Promise<{ success: boolean }> => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/product/edit_productphim`, { data });
    return response.status === 200 ? { success: true } : { success: false };
  } catch (error) {
    console.error('Error in services_edit_productphim:', error);
    throw error;
  }
};
const Getdetailfilm =async (titlefilm: string) : Promise<any>=>{
    try {
      const data = axios.get(`${process.env.REACT_APP_API_URL}/product/getdetail_xemphim/${titlefilm}`)
      if(data){
        return data;
      }
    } catch (error) {
      throw(error)
    }
}

const apiUrl = process.env.REACT_APP_API_URL;

const fetchData = async ({ endpoint, filters = {} }: FetchDataParams): Promise<string[] | any> => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const url = `${process.env.REACT_APP_API_URL}/product/${endpoint}${queryParams ? `?${queryParams}` : ''}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error:any) {
    console.error(`Error fetching data from ${endpoint}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

export const Productdanhmucphimbo = async (filters: Record<string, any>) => {
  return fetchData({ endpoint: 'product-phimbo', filters });
};

export const Productdanhmucphimbian = async (filters: Record<string, any>) => {
  return fetchData( {endpoint: 'product-phimbian',filters});
};

export const Productdanhmucphimtamly = async (filters: Record<string, any>) => {
  return fetchData( {endpoint: 'product-phimtamly',filters});
};
export const Productdanhmucphimamnhac = async (filters: Record<string, any>) => {
  return fetchData( {endpoint: 'product-phimamnhac',filters});
};

export const Productdanhmucphimhaihuoc = async (filters: Record<string, any>) => {
  return fetchData( {endpoint: 'product-phimhaihuoc',filters});
};

export const Productdanhmucphimkhoahoc = async (filters: Record<string, any>) => {
  return fetchData( {endpoint: 'product-phimkhoahoc',filters});
};

export const Productdanhmucphimkinhdien = async (filters: Record<string, any>) => {
  return fetchData( {endpoint: 'product-phimkinhdien',filters});
};

export const Productdanhmucphimcotrang = async (filters: Record<string, any>) => {
  return fetchData( {endpoint: 'product-phimcotrang',filters});
};

export const Productdanhmucphimkinhdi = async (filters: Record<string, any>) => {
  return fetchData( {endpoint: 'product-phimkinhdi',filters});
};

export const Productdanhmucphim18plus = async (filters: Record<string, any>) => {
  return fetchData( {endpoint: 'product-phim18plus', filters});
};

export const Productdanhmucphimhanhdong = async (filters: Record<string, any>) => {
  return fetchData( {endpoint: 'product-phimhanhdong', filters});
};

export const Productdanhmucphimthethao = async (filters: Record<string, any>) => {
  return fetchData( {endpoint: 'product-phimthethao',filters});
};

export const Productdanhmucphimgiadinh = async (filters: Record<string, any>) => {
  return fetchData( {endpoint: 'product-phimgiadinh',filters});
};

export const Productdanhmucphimhinhsu = async (filters: Record<string, any>) => {
  return fetchData( {endpoint: 'product-phimhinhsu',filters});
};

export const Productdanhmucphimthanthoai = async (filters: Record<string, any>) => {
  return fetchData( {endpoint: 'product-phimthanthoai',filters});
};

export const Productdanhmucphimhoathinh = async (filters: Record<string, any>) => {
  return fetchData( {endpoint: 'product-phimhoathinh',filters});
};

export const Productdanhmucphimchientranh = async (filters: Record<string, any>) => {
  return fetchData( {endpoint: 'product-phimchientranh',filters});
};

export const Productdanhmucphimtailieu = async (filters: Record<string, any>) => {
  return fetchData( {endpoint: 'product-phimtailieu',filters});
};

export const Productdanhmucphimtinhcam = async (filters: Record<string, any>) => {
  return fetchData( {endpoint: 'product-phimtinhcam',filters});
};

export const Productdanhmucphimphieuluu = async (filters: Record<string, any>) => {
  return fetchData( {endpoint: 'product-phimphieuluu',filters});
};

export const Productdanhmucphimhocduong = async (filters: Record<string, any>) => {
  return fetchData( {endpoint: 'product-phimhocduong',filters});
};

export const Productdanhmucphimvothuat = async (filters: Record<string, any>) => {
  return fetchData( {endpoint: 'product-phimvothuat',filters});
};

export const Productdanhmucphimchinhkich = async (filters: Record<string, any>) => {
  return fetchData( {endpoint: 'product-phimchinhkich',filters});
};

export const Productdanhmucphimle = async (filters: Record<string, any>) => {
  return fetchData( {endpoint: 'product-phimle',filters});
};

export const Productdanhmucphimshows = async (filters: Record<string, any>) => {
  return fetchData( {endpoint: 'product-phimshows',filters});
};

export const Productdanhmucphimsapchieu = async (filters: Record<string, any>) => {
  return fetchData( {endpoint: 'product-phimsapchieu',filters});
};

export const Productdanhmucphimvientuong = async (filters: Record<string, any>) => {
  return fetchData( {endpoint: 'product-phimvientuong',filters});
};

//product theo quốc gia phim


  export const Productquocgia_anh = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-anh', filters});
  };

  export const Productquocgia_phap = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-phap', filters});
  };

  export const Productquocgia_nhatban = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-nhat-ban', filters});
  };

  export const Productquocgia_hanquoc = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-han-quoc', filters});
  };

  export const Productquocgia_thailan = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-thai-lan', filters});
  };

  export const Productquocgia_aumy = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-au-my', filters});
  };

  export const Productquocgia_dailoan = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-dai-loan', filters});
  };

  export const Productquocgia_hongkong = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-hong-kong', filters});
  };

  export const Productquocgia_ando = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-ando', filters});
  };

  export const Productquocgia_duc = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-duc', filters});
  };

  export const Productquocgia_canada = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-canada', filters});
  };

  export const Productquocgia_taybannha = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-tay-ban-nha', filters});
  };

  export const Productquocgia_thonhiky = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-tho-nhi-ky', filters});
  };

  export const Productquocgia_halan = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-ha-lan', filters});
  };

  export const Productquocgia_indonesia = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-indonesia', filters});
  };

  export const Productquocgia_nga = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-nga', filters});
  };

  export const Productquocgia_mexico = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-mexico', filters});
  };

  export const Productquocgia_balan = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-ba-lan', filters});
  };

  export const Productquocgia_uc = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-uc', filters});
  };

  export const Productquocgia_thuydien = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-thuy-dien', filters});
  };

  export const Productquocgia_malaysia = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-malaysia', filters});
  };

  export const Productquocgia_brazil = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-brazil', filters});
  };

  export const Productquocgia_philippines = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-philippines', filters});
  };

  export const Productquocgia_bodaonha = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-bo-dao-nha', filters});
  };

  export const Productquocgia_y = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-y', filters});
  };

  export const Productquocgia_danmach = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-dan-mach', filters});
  };

  export const Productquocgia_uae = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-uae', filters});
  };

  export const Productquocgia_nauy = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-na-uy', filters});
  };

  export const Productquocgia_thuysi = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-thuy-si', filters});
  };

  export const Productquocgia_chauphi = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-chau-phi', filters});
  };

  export const Productquocgia_namphi = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-nam-phi', filters});
  };

  export const Productquocgia_ukraina = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-ukraina', filters});
  };

  export const Productquocgia_arapxeut = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-a-rap-xe-ut', filters});
  };
  export const Productquocgia_trungquoc = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-trung-quoc', filters});
  };
  export const Productquocgia_quocgiakhac = async (filters: Record<string, any>) => {
    return fetchData( {endpoint: 'product-quoc-gia-khac', filters});
  };



const refreshToken = async () => {
  try {
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!refreshToken) {
      alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      window.location.href = '/dang-nhap';
      return null;
    }

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/refresh_token`,
      { token: refreshToken }
    );

    sessionStorage.setItem('token', data.tokennew);
    return data.tokennew;
  } catch (error) {
    console.error("Error refreshing token:", error);
    alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
    window.location.href = '/dang-nhap';
    return null;
  }
};
const usercomment = async ({ token, titlefilm, contentcomment }: UserCommentParams): Promise<any> => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/comment`,
      { titlefilm, contentcomment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );

    if (response.status === 200) {
      //window.location.reload();
    
    } else if (response.status === 401 || response.status === 403) {
      const newToken = await refreshToken();
      if (newToken) {
        return HandleRating({ token: newToken, titlefilm, contentcomment });
      }
    } else {
      console.error('Server error:', response.data);
      return "Server error";
    }
  } catch (error:any) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      const newToken = await refreshToken();
      if (newToken) {
        return HandleRating({ token: newToken, titlefilm, contentcomment });
      }
    } else {
      console.error("Error in usercomment:", error);
    }
  }
};

// Hàm xử lý đánh giá
const HandleRating = async ({ token, titlefilm, id, email, starselect }: HandleRatingParams): Promise<any> => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/rating_star`,
      { titlefilm, id, email, starselect },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );

    if (response.status === 200) {
      window.location.reload();
    } else if (response.status === 401 || response.status === 403) {
      const newToken = await refreshToken();
      if (newToken) {
        return HandleRating({ token: newToken, titlefilm, id, email, starselect });
      }
    } else {
      console.error('Server error:', response.data);
      return "Server error";
    }
  } catch (error:any) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      const newToken = await refreshToken();
      if (newToken) {
        return HandleRating({ token: newToken, titlefilm, id, email, starselect });
      }
    } else {
      console.error("Error in HandleRating:", error);
    }
  }
};

const userchildcomment = async ({ token, titlefilm, contentcomment, parent_id }: UserChildCommentParams): Promise<void|any> => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/comment`,
      { titlefilm, contentcomment, parent_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );

    if (response.status === 200) {
     //window.location.reload();
      
    } else if (response.status === 401 || response.status === 403) {
      const newToken = await refreshToken();
      if (newToken) {
        return userchildcomment({ token: newToken, titlefilm, contentcomment, parent_id });
      }
    } else {
      console.error("Failed to post comment:", response.data);
    }
  } catch (error:any) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      const newToken = await refreshToken();
      if (newToken) {
        return userchildcomment({ token: newToken, titlefilm, contentcomment, parent_id });
      }
    } else {
      console.error("Error in userchildcomment:", error);
    }
  }
};
const ProductServiceUpdateView = async (title:string| any) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/product/update_view`, { title });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error in ProductServiceUpdateView:", error);
    throw error;
  }
};

const services_delete_productphim = async (title:string[]) : Promise<{success:boolean}>=> {
  try {
    const data = await axios.delete(`${process.env.REACT_APP_API_URL}/product/delete_product`, {
      params: { title }
    });
    if (data.status === 200) {
      return { success: true };
    }
  } catch (error) {
    throw error;
  }
  return { success: false }; 
};


export {
  services_delete_productphim,
  ProductServiceUpdateView,
  Producthome,
  Getallproduct,
  ProductDetail,
  userchildcomment,
  usercomment,
  HandleRating,
  Getdetailfilm,
  services_edit_productphim
};


