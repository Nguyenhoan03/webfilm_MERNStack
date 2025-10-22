import React, { useState } from "react";
import { IoIosHome } from "react-icons/io";
import "./Style.scss";
import { ServiceUserlogin } from "../../services/Users";
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { GoogleLogin } from "@react-oauth/google";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const data = await ServiceUserlogin({email, password});
      if (data.success) {
        // navigate('/');
        window.location.href = "/"
      } else {
        setError('Thông tin đăng nhập không chính xác !!!');
      }
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
      setError('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.');
    }
  };

  const handleKeyDown = (e:any) => {
    if (e.key === "Enter") { 
      handleLogin();
    }
  };
  const handleSuccess = async (response: any) => {
    try {
      console.log("Login Success:", response);
      const data = await ServiceUserlogin({ email: '', password: '', googleToken: response.credential });
      if (data.success) {
        window.location.href = "/";
      } else {
        setError('Đăng nhập thất bại. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error("Error:", error);
      setError('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.dfvsdsdf');
    }
  };

  const handleError = () => {
    console.error("Login Failed");
  };

  return (
    <div className="">
        <Helmet>
        <title>Đăng nhập tài khoản | mephim</title>
        <meta name="description" content="Tạo tài khoản mới tại Motchill để xem phim online miễn phí với nhiều thể loại hấp dẫn. Đăng ký tài khoản ngay để trải nghiệm các bộ phim hành động, tình cảm, kinh dị, khoa học viễn tưởng, và nhiều hơn nữa." />
        <meta name="keywords" content="đăng nhập tài khoản, tạo tài khoản, xem phim online miễn phí, phim hành động, phim tình cảm, phim khoa học viễn tưởng, phim kinh dị, Motchill" />
        <meta property="og:title" content="Đăng nhập tài khoản tại Motchill" />
        <meta property="og:description" content="Đăng nhập tài khoản để xem phim online miễn phí với chất lượng cao tại Motchill. Trải nghiệm hàng ngàn bộ phim thuộc nhiều thể loại." />
        <meta property="og:image" content="https://motchillj.net/motchill.png?v1.0.2" />
        <meta property="og:url" content="https://www.mephim.com/dang-ky" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Đăng nhập tài khoản | Motchill" />
        <meta name="twitter:description" content="Tạo tài khoản mới tại Motchill để xem phim online miễn phí. Trải nghiệm nhiều thể loại phim hành động, tình cảm, và nhiều hơn nữa." />
        <meta name="twitter:image" content="https://motchillj.net/motchill.png?v1.0.2" />
        <link rel="canonical" href="https://mephim.com/dang-ky" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="container">
        <div className="caption mt-3 d-flex">
          <p>
            <IoIosHome /> mephim
          </p>
          <p> {'>'}</p>
          <p style={{ color: "white" }}> Đăng nhập</p>
        </div>

        <div className="formlogin">
          <form>
            <h2>Đăng nhập</h2>
           
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown} // Thêm sự kiện onKeyDown cho input
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown} // Thêm sự kiện onKeyDown cho input
              />
            </div>
            <div className="d-flex">
              <div className="checkbox-group py-2">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember" style={{ color: "white" }}>
                  Ghi nhớ
                </label>
              </div>
              <div className="forgot-password">
                <a href="#">Quên mật khẩu ? </a> <Link to='/dang-ky'> Đăng kí tài khoản mới</Link>
              </div>
            </div>
            <GoogleLogin onSuccess={handleSuccess} onError={handleError}/>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="button" onClick={handleLogin} className="submit-btn">
              Đăng nhập
            </button>
         
          </form>
        </div>
      </div>
    </div>
  );
}
