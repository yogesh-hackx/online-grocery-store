import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button, Drawer, Input, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import CartContext from "../context/CartContext";
import CartList from "./CartList";

const Layout = ({ children }) => {
  const { cart, setCart } = useContext(CartContext);
  const [cartDrawerVisible, setCartDrawerVisible] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    if (localCart) {
      const cartItems = JSON.parse(localCart);
      setCart(cartItems);
    }
  }, []);

  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    if (localCart) {
      const cartItems = JSON.parse(localCart);
      let count = 0;
      cartItems.forEach((item) => {
        count += item.count;
      });
      setCartItemCount(count);
    }
  }, [cart]);

  const showDrawer = () => {
    setCartDrawerVisible(true);
  };

  const onDrawerClose = () => {
    setCartDrawerVisible(false);
  };

  const onSearch = (searchText) => {
    if (searchText) {
      router.push(`/search/${searchText}`);
    }
  };

  return (
    <div>
      <nav className="sticky top-0 flex bg-head-black text-xl py-3 px-12 text-white justify-between items-center z-50">
        <Link href="/" passHref>
          <a className="pointer-events-none cursor-pointer font-black">
            sabjiwaala
          </a>
        </Link>

        <div className="max-w-2xl w-full">
          <Input.Search
            placeholder="Enter search query..."
            onSearch={onSearch}
            width="100%"
            className="rounded-md overflow-hidden"
          />
        </div>

        <div id="cart-btn">
          <Badge size="small" count={cartItemCount || 0} color="#8EBF30">
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
              <Button
                type=""
                className="bg-grocery-green text-white font-bold rounded-md"
                onClick={onDrawerClose}
              >
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
