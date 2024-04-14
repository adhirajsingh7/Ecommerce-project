import cartIcon from "../../../assets/icons/simple-cart.svg";
import "./NewProductCard.styles.scss";

interface propType {
  image: string;
  title: string;
  discountedPrice: number;
  originalPrice: number;
}

export const NewProductCard = (props: propType) => {
  const { image, title, discountedPrice, originalPrice } = props;

  return (
    <div className="product-card">
      <img className="product-card-image" src={image} alt="" />
      <div className="product-card-info">
        <h1>{title}</h1>
        <span className="product-card-original-price">
          <s>${originalPrice}</s>
        </span>
        <span className="product-card-discounted-price">
          ${discountedPrice}
        </span>
        <div className="cart-icon-box">
          <img className="cart-icon" src={cartIcon} alt="" />
        </div>
      </div>
    </div>
  );
};
