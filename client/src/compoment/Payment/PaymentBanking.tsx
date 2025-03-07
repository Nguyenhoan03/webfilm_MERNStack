import React from "react";

interface PaymentBankingProps {
  packagechoose: string;
  price: string;
  name?: string | null;
  email?: string | null;
}

const PaymentBanking: React.FC<PaymentBankingProps> = ({ packagechoose, price, name, email }) => {
  return (
    <div>
      <div className="payment-container">
        <div className="payment-header">
          <h2>Đăng kí gói {packagechoose}</h2>
        </div>
        <div className="account-info" style={{ color: "black" }}>
          {name} - {email} - <span className="price">{price}.000 VND</span>
        </div>
        <div className="payment-methods">
          <button className="payment-button">Phương thức thanh toán: Chuyển khoản</button>
        </div>
        <div className="qr-code">
          <img src="" alt="QR Code for Bank Transfer" />
        </div>
        <div className="note">Nội dung CK ghi địa chỉ email đăng kí của bạn</div>
        <div className="instructions">
          VD: nguyenvana@gmail.com, (Hệ thống sẽ cộng tiền vào tài khoản này cho bạn).<br />
          Phải nhập chính xác nội dung CK mà hệ thống đã hiển thị sẵn cho bạn, để được <em>CỘNG TIỀN TỰ ĐỘNG</em>.<br />
          Trường hợp sau vài phút mà bạn không nhận được tiền vui lòng gọi tới số hotline{" "}
          <span className="hotline">0981.282.756</span>.
        </div>
        <div className="security-logos">
          <img src="https://cdn-icons-png.flaticon.com/512/6404/6404655.png" alt="Security Logo 1" />
          <img src="https://c8.alamy.com/comp/2BRYNP8/bank-account-security-rgb-color-icon-2BRYNP8.jpg" alt="Security Logo 2" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg3ZBPdzULqOFGT8c53RzzeBLPqfi4fpvLxA&s" alt="Security Logo 3" />
        </div>
      </div>
    </div>
  );
};

export default PaymentBanking;
