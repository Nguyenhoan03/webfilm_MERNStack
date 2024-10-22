// Đường dẫn: client/src/services/Admin/Adminservices.tsx
import axios from 'axios';

interface FilmData {
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
}

interface ApiResponse {
  message: string;
}

const Themphim = async (formdata: FilmData): Promise<ApiResponse> => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/addphim`, formdata);
    return response.data;         
  } catch (error) {
    throw error; 
  }
};

interface UpdateVIPParams {
  updatedItem: string;
  newVIP1Value: string | number;
}

const UpdateVIP = async ({ updatedItem, newVIP1Value }: UpdateVIPParams): Promise<{ success: boolean }> => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/edit_packageVIP1`,
      {
        title: updatedItem,
        VIP1: newVIP1Value,
      }
    );

    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Error in UpdateVIP:", error);
    return { success: false };
  }
};

export {
  Themphim,
  UpdateVIP
};