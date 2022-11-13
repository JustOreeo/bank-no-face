import React from "react";

const CardManager = ({ userInfo }) => {
  const { balance } = userInfo;
  const currencyFormatted = (value) =>
    new Intl.NumberFormat("fil-PH", {
      style: "currency",
      currency: "PHP",
    }).format(value);

  const [face, setFace] = React.useState(true);
  const rotateStyle = {
    transform: "rotateY(180deg)",
  };

  const rotateY = () => {
    setFace((oldFace) => !oldFace);
  };

  console.log(
    "HELPPPPPPP!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
    face,
    {
      userInfo,
    }
  );

  return (
    <div className="card-manager">
      <div className="card-placeholder" onClick={rotateY}>
        <div className={`${face === false ? "back" : "front"} card-face a`}>
          <i class="fa-solid fa-wallet"></i>
          <p className="cardholder-name">{userInfo.name}</p>
          <p className="account-type">
            {userInfo.role === "User" ? "Personal Savings" : "Cheat Card"}
          </p>
          <p className="account-balance-label">Available Balance</p>
          <p className="account-balance">
            {balance > 0 ? currencyFormatted(balance) : "₱ 0.00"}
          </p>
        </div>
        <div className={`${face === true ? "back" : "front"} card-face b`}>
          <p className="app-name">
            Dae<span>bank</span>
          </p>
          <p className="card-number">**** - {"1234"}</p>
          <p className="card-expiration">
            {"12"}/{"24"}
          </p>
          <div className="mastercard-logo">mastercard</div>
        </div>
      </div>
      <div className="manage-link">
        <p>Manage Card</p>
      </div>
    </div>
  );
};

export default CardManager;
