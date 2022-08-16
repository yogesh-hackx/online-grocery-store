import React, { useContext, useEffect, useState } from "react";
import CartContext from "../context/CartContext";

const CartList = () => {
  const { cart } = useContext(CartContext);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    if (cart.length) {
      let total = 0;
      cart.forEach((item) => {
        total += item.count * item.sellingPrice;
      });
      setCartTotal(total);
    }
  }, [cart]);

  return (
    <div>
      {cart &&
        cart.map((item) => (
          <div key={item._id} className="flex">
            <div className="w-20 h-20">
              <img src={item.imgURLThumb} alt={item.name} />
            </div>
            <div>
              <div className="font-bold">{item.name}</div>
              <div className="flex gap-2">
                <p className="font-bold">Qty:</p>
                <p className="font-semibold">{item.count}</p>
              </div>
              <div>Rs. {item.sellingPrice}</div>
            </div>
          </div>
        ))}

      {cart && (
        <div className="mt-4">
          <div className="font-bold flex gap-4 text-lg">
            Cart Total: <p className="text-grocery-green">Rs. {cartTotal}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartList;
