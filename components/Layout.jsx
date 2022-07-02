import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button, Drawer, Space } from "antd";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import CartContext from "../context/CartContext";
import CartList from "./CartList";

const Layout = ({ children }) => {
  const { cart, setCart } = useContext(CartContext);
  const [cartDrawerVisible, setCartDrawerVisible] = useState(false);

  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    if (localCart) {
      setCart(JSON.parse(localCart));
    }
  }, []);

  const showDrawer = () => {
    setCartDrawerVisible(true);
  };

  const onDrawerClose = () => {
    setCartDrawerVisible(false);
  };

  return (
    <div>
      <nav className="sticky top-0 flex bg-head-black font-black text-xl py-3 px-12 text-white justify-between items-center z-50">
        <Link href="/" passHref>
          <a className="pointer-events-none cursor-pointer">sabjiwaala</a>
        </Link>

        <div id="cart-btn">
          <Badge size="small" count={cart?.length || 0} color="#8EBF30">
            <Button
              type="text"
              shape="circle"
              onClick={showDrawer}
              icon={<ShoppingCartOutlined className="text-white text-2xl" />}
            />
          </Badge>
        </div>

        <Drawer
          title="Your Shopping Cart"
          placement="right"
          width={500}
          onClose={onDrawerClose}
          visible={cartDrawerVisible}
          extra={
            <Space>
              <Button type="" size="small" onClick={onDrawerClose}>
                Checkout
              </Button>
            </Space>
          }
        >
          <CartList />
        </Drawer>
      </nav>
      {children}
    </div>
  );
};

export default Layout;
