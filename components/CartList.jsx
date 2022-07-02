import React, { useContext } from "react";
import CartContext from "../context/CartContext";

const CartList = () => {
  const { cart } = useContext(CartContext);
  return (
    <div>
      {cart.map((item) => (
        <div className="flex">
          <div className="w-20 h-20">
            <img src={item.imgURLThumb} />
          </div>
          <div>
            <div className="font-bold">{item.name}</div>
            <div>{item.sellingPrice}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartList;
