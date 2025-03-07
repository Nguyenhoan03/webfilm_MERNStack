import { useContext } from "react";
import "./Pay_banktranfer.scss";
import { HomeContext } from "../../../store/HomeContext";
import { useLocation, useParams } from "react-router";
import { HomeContextType } from "../../../store/HomeContext";
import PaymentBanking from "../../../compoment/Payment/PaymentBanking";

export default function Pay_banktranfer() {
  const location = useLocation();
  const param = useParams();
  const url = new URLSearchParams(location.search);

  const price = url.get("price") ?? "0";
  const packagechoose = param.title ?? "";

  const { name, email } = useContext(HomeContext) as HomeContextType;

  return(
<PaymentBanking packagechoose={packagechoose} price={price} name={name} email={email} />
  ) 
}
