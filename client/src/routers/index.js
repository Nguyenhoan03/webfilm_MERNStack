import React from 'react';

const Homepage = React.lazy(()=> import('../pages/Homepage/Homepage'));
const Detailpage = React.lazy(()=> import('../pages/Detailpage/Detailpage'));
const Xemphim = React.lazy(()=> import('../pages/Xemphim/Xemphim'));
const Phimbo = React.lazy(()=> import('../pages/Theloai/Phimbo/Phimbo'));
const Vientuong = React.lazy(()=> import('../pages/Theloai/Vientuong/Vientuong'));
const Search = React.lazy(()=> import('../pages/Search/Search'));
const Plus18 = React.lazy(()=> import('../pages/Theloai/18+/Plus18'));
const Amnhac = React.lazy(()=> import('../pages/Theloai/amnhac/Amnhac'));
const Chientranh = React.lazy(()=> import('../pages/Theloai/chientranh/Chientranh'));
const Chinhkich = React.lazy(()=> import('../pages/Theloai/chinhkich/Chinhkich'));
const Cotrang = React.lazy(()=> import('../pages/Theloai/cotrang/Cotrang'));
const Bian = React.lazy(()=> import('../pages/Theloai/Bian/Bian'));
const Giadinh = React.lazy(()=> import('../pages/Theloai/giadinh/Giadinh'));
const Haihuoc = React.lazy(()=> import('../pages/Theloai/haihuoc/Haihuoc'));
const Hinhsu = React.lazy(()=> import('../pages/Theloai/hinhsu/Hinhsu'));
const Hoathinh = React.lazy(()=> import('../pages/Theloai/hoathinh/Hoathinh'));
const Hocduong = React.lazy(()=> import('../pages/Theloai/hocduong/Hocduong'));
const Khoahoc = React.lazy(()=> import('../pages/Theloai/khoahoc/Khoahoc'));
const Kinhdi = React.lazy(()=> import('../pages/Theloai/kinhdi/Kinhdi'));
const Kinhdien = React.lazy(()=> import('../pages/Theloai/kinhdien/Kinhdien'));
const Phieuluu = React.lazy(()=> import('../pages/Theloai/phieuluu/Phieuluu'));
const Tailieu = React.lazy(()=> import('../pages/Theloai/tailieu/Tailieu'));
const Tamly = React.lazy(()=> import('../pages/Theloai/Tamly/Tamly'));
const Thanthoai = React.lazy(()=> import('../pages/Theloai/thanthoai/Thanthoai'));
const Thethao = React.lazy(()=> import('../pages/Theloai/thethao/Thethao'));
const Tinhcam = React.lazy(()=> import('../pages/Theloai/tinhcam/Tinhcam'));
const Vothuat = React.lazy(()=> import('../pages/Theloai/vothuat/Vothuat'));
const Phimle = React.lazy(()=> import('../pages/Theloai/phimle/Phimle'));
const Phimshows = React.lazy(()=> import('../pages/Theloai/phimshows/Phimshows'));
const Phimsapchieu = React.lazy(()=> import('../pages/Theloai/phimsapchieu/Phimsapchieu'));
const Hanhdong = React.lazy(()=> import('../pages/Theloai/Hanhdong/Hanhdong'));
const Login = React.lazy(()=> import('../pages/Login/Login'));
const Register = React.lazy(()=> import('../pages/Register/Register'));
const Ando = React.lazy(()=> import('../pages/quocgia/Ando'));
const Trungquoc = React.lazy(()=> import('../pages/quocgia/Trungquoc'));
const Hanquoc = React.lazy(()=> import('../pages/quocgia/Hanquoc'));
const Nhatban = React.lazy(()=> import('../pages/quocgia/Nhatban'));
const Thailan = React.lazy(()=> import('../pages/quocgia/Thailan'));
const Aumy = React.lazy(()=> import('../pages/quocgia/Aumy'));
const Dailoan = React.lazy(()=> import('../pages/quocgia/Dailoan'));
const Hongkong = React.lazy(()=> import('../pages/quocgia/Hongkong'));
const Anh = React.lazy(()=> import('../pages/quocgia/Anh'));
const Phap = React.lazy(()=> import('../pages/quocgia/Phap'));
const Canada = React.lazy(()=> import('../pages/quocgia/Canada'));
const Quocgiakhac = React.lazy(()=> import('../pages/quocgia/Quocgiakhac'));
const Duc = React.lazy(()=> import('../pages/quocgia/Duc'));
const Taybannha = React.lazy(()=> import('../pages/quocgia/Taybannha'));
const Thonhiky = React.lazy(()=> import('../pages/quocgia/Thonhiky'));
const Halan = React.lazy(()=> import('../pages/quocgia/Halan'));
const Indonesia = React.lazy(()=> import('../pages/quocgia/Indonesia'));
const Nga = React.lazy(()=> import('../pages/quocgia/Nga'));
const Mexico = React.lazy(()=> import('../pages/quocgia/Mexico'));
const Balan = React.lazy(()=> import('../pages/quocgia/Balan'));
const Uc = React.lazy(()=> import('../pages/quocgia/Uc'));
const Thuydien = React.lazy(()=> import('../pages/quocgia/Thuydien'));
const Malaysia = React.lazy(()=> import('../pages/quocgia/Malaysia'));
const Brazil = React.lazy(()=> import('../pages/quocgia/Brazil'));
const Philippines = React.lazy(()=> import('../pages/quocgia/Philippines'));
const Bodaonha = React.lazy(()=> import('../pages/quocgia/Bodaonha'));
const Y = React.lazy(()=> import('../pages/quocgia/Y'));
const Danmach = React.lazy(()=> import('../pages/quocgia/Danmach'));
const Uae = React.lazy(()=> import('../pages/quocgia/Uae'));
const Nauy = React.lazy(()=> import('../pages/quocgia/Nauy'));
const Thuysi = React.lazy(()=> import('../pages/quocgia/Thuysi'));
const Chauphi = React.lazy(()=> import('../pages/quocgia/Chauphi'));
const Namphi = React.lazy(()=> import('../pages/quocgia/Namphi'));
const Ukraina = React.lazy(()=> import('../pages/quocgia/Ukraina'));
const Arapxeut = React.lazy(()=> import('../pages/quocgia/Arapxeut'));

const Dashboard = React.lazy(()=> import('../pages/Admin/Dashboard/Dashboard'));
const Users = React.lazy(()=> import('../pages/Admin/Users/Users'));
const Autocrawlphim = React.lazy(()=> import('../pages/Admin/Autocrawlphim/Autocrawlphim'));
const Product = React.lazy(()=> import('../pages/Admin/Product/Product'));
const Addphim = React.lazy(()=> import('../pages/Admin/Product/Addphim/Addphim'));
const Addepisode = React.lazy(()=> import('../pages/Admin/Product/Addepisode/Addepisode'));
const PrivateRoute = React.lazy(()=> import('../compoment/PrivateRoute/PrivateRoute'));
const NotFound = React.lazy(()=> import('../pages/Notfound/Notfound'));
const RegisterVIP = React.lazy(()=> import('../pages/RegisterVIP/RegisterVIP'));
const Pay_banktranfer = React.lazy(()=> import('../pages/Pay/Pay_banktranfer/Pay_banktranfer'));
const RegisterVIP2 = React.lazy(()=> import('../pages/RegisterVIP2/RegisterVIP2'));
  export const routes = [
    {
      path: '/not-found',
      page: NotFound,
      isShowHeader: true,
    },
    {
      path: '*',
      page: NotFound,
      isShowHeader: true,
    },
    {
      path: '/dang-ky-goi-vip',
      page: RegisterVIP,
      isShowHeader: true,
    },
    {
      path: '/dang-ky-goi-vip/:title',
      page: RegisterVIP2,
      isShowHeader: true,
    },
    {
      path: '/dang-ky-goi-vip/:title/:paymentMethod',
      page: Pay_banktranfer,
      isShowHeader: true,
    },
  // Admin Routes
  {
    path: '/admin/products',
    page: ()=>(
      <PrivateRoute roles={['admin']}>
        <Product />
      </PrivateRoute>
    ),
    isShowHeader: false,
  },
  {
    path: '/admin/products/add_phim',
    page: ()=>(
      <PrivateRoute roles={['admin']} permissions={['VIP2']}>
        <Addphim />
      </PrivateRoute>
    ),
    isShowHeader: false,
  },
  {
    path: '/admin/products/add_episode',
    page: ()=>(
      <PrivateRoute roles={['admin']} permissions={['VIP2']}>
        <Addepisode />
      </PrivateRoute>
    ),
    isShowHeader: false,
  },
  {
    path: '/admin/dashboard',
    page: ()=>(
      <PrivateRoute roles={['admin']} permissions={['VIP2']}>
        <Dashboard />
      </PrivateRoute>
    ),
    isShowHeader: false,
  },
  {
    path: '/admin/users',
    page: ()=>(
      <PrivateRoute roles={['admin']} >
        <Users />
      </PrivateRoute>
    ),
    isShowHeader: false,
  },
  {
    path: '/admin/auto_crawlphim',
    page: ()=>(
      <PrivateRoute roles={['admin']}>
        <Autocrawlphim />
      </PrivateRoute>
    ),
    isShowHeader: false,
  },

//
  {
    path: '/',
    page: Homepage,
    isShowHeader: true,
  },

  {
    path: '/:title',
    page: Detailpage,
    isShowHeader: true,
  },
  {
    path: '/tim-kiem/:content_search',
    page: Search ,
    isShowHeader: true,
  },
  {
    path: '/xem-phim/:title/:episode',
    page: Xemphim,
    isShowHeader: true,
  },

  {
    path: '/dang-nhap',
    page: Login,
    isShowHeader: true,
  },
  {
    path: '/dang-ky',
    page: Register,
    isShowHeader: true,
  },

  {
    path: '/phim-bo',
    page: Phimbo,
    isShowHeader: true,
  },
  {
    path: '/phim-le',
    page: Phimle,
    isShowHeader: true,
  },
  {
    path: '/phim-shows',
    page: Phimshows,
    isShowHeader: true,
  },
  {
    path: '/phim-sap-chieu',
    page: Phimsapchieu,
    isShowHeader: true,
  },
  {
    path: '/the-loai/hanh-dong',
    page: Hanhdong, 
    isShowHeader: true,
  },
  {
    path: '/the-loai/vien-tuong',
    page: Vientuong,
    isShowHeader: true,
  },
  {
    path: '/the-loai/bi-an',
    page: Bian,
    isShowHeader: true,
  },
  {
    path: '/the-loai/am-nhac',
    page: Amnhac,
    isShowHeader: true,
  },
  {
    path: '/the-loai/18+',
    page: Plus18,
    isShowHeader: true,
  },
  {
    path: '/the-loai/chien-tranh',
    page: Chientranh,
    isShowHeader: true,
  },
  {
    path: '/the-loai/chinh-kich',
    page: Chinhkich,
    isShowHeader: true,
  },
  {
    path: '/the-loai/co-trang',
    page: Cotrang,
    isShowHeader: true,
  },
  {
    path: '/the-loai/gia-dinh',
    page: Giadinh,
    isShowHeader: true,
  },
  {
    path: '/the-loai/hai-huoc',
    page: Haihuoc,
    isShowHeader: true,
  },
  {
    path: '/the-loai/hinh-su',
    page: Hinhsu,
    isShowHeader: true,
  },
  {
    path: '/the-loai/hoat-hinh',
    page: Hoathinh,
    isShowHeader: true,
  },
  {
    path: '/the-loai/hoc-duong',
    page: Hocduong,
    isShowHeader: true,
  },
  {
    path: '/the-loai/khoa-hoc',
    page: Khoahoc,
    isShowHeader: true,
  },
  {
    path: '/the-loai/kinh-di',
    page: Kinhdi,
    isShowHeader: true,
  },
  {
    path: '/the-loai/kinh-dien',
    page: Kinhdien,
    isShowHeader: true,
  },
  {
    path: '/the-loai/phieu-luu',
    page: Phieuluu,
    isShowHeader: true,
  },
  {
    path: '/the-loai/tai-lieu',
    page: Tailieu,
    isShowHeader: true,
  },
  {
    path: '/the-loai/tam-ly',
    page: Tamly,
    isShowHeader: true,
  },
  {
    path: '/the-loai/than-thoai',
    page: Thanthoai,
    isShowHeader: true,
  },
  {
    path: '/the-loai/the-thao',
    page: Thethao,
    isShowHeader: true,
  },
  {
    path: '/the-loai/tinh-cam',
    page: Tinhcam,
    isShowHeader: true,
  },
  {
    path: '/the-loai/vo-thuat',
    page: Vothuat,
    isShowHeader: true,
  },
 

  //phim theo quốc gia
  { path: '/an-do', page: Ando, isShowHeader: true },
  { path: '/trung-quoc', page: Trungquoc, isShowHeader: true },
  { path: '/han-quoc', page: Hanquoc, isShowHeader: true },
  { path: '/nhat-ban', page: Nhatban, isShowHeader: true },
  { path: '/thai-lan', page: Thailan, isShowHeader: true },
  { path: '/au-my', page: Aumy, isShowHeader: true },
  { path: '/dai-loan', page: Dailoan, isShowHeader: true },
  { path: '/hong-kong', page: Hongkong, isShowHeader: true },
  { path: '/anh', page: Anh, isShowHeader: true },
  { path: '/phap', page: Phap, isShowHeader: true },
  { path: '/canada', page: Canada, isShowHeader: true },
  { path: '/quoc-gia-khac', page: Quocgiakhac, isShowHeader: true },
  { path: '/duc', page: Duc, isShowHeader: true },
  { path: '/tay-ban-nha', page: Taybannha, isShowHeader: true },
  { path: '/tho-nhi-ky', page: Thonhiky, isShowHeader: true },
  { path: '/ha-lan', page: Halan, isShowHeader: true },
  { path: '/indonesia', page: Indonesia, isShowHeader: true },
  { path: '/nga', page: Nga, isShowHeader: true },
  { path: '/mexico', page: Mexico, isShowHeader: true },
  { path: '/ba-lan', page: Balan, isShowHeader: true },
  { path: '/uc', page: Uc, isShowHeader: true },
  { path: '/thuy-dien', page: Thuydien, isShowHeader: true },
  { path: '/malaysia', page: Malaysia, isShowHeader: true },
  { path: '/brazil', page: Brazil, isShowHeader: true },
  { path: '/philippines', page: Philippines, isShowHeader: true },
  { path: '/bo-dao-nha', page: Bodaonha, isShowHeader: true },
  { path: '/y', page: Y, isShowHeader: true },
  { path: '/dan-mach', page: Danmach, isShowHeader: true },
  { path: '/uae', page: Uae, isShowHeader: true },
  { path: '/na-uy', page: Nauy, isShowHeader: true },
  { path: '/thuy-si', page: Thuysi, isShowHeader: true },
  { path: '/chau-phi', page: Chauphi, isShowHeader: true },
  { path: '/nam-phi', page: Namphi, isShowHeader: true },
  { path: '/ukraina', page: Ukraina, isShowHeader: true },
  { path: '/a-rap-xe-ut', page: Arapxeut, isShowHeader: true },
];
