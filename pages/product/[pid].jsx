import { Button, Rate, Tag } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import CartContext from "../../context/CartContext";
import api from "../../utils/api";

const ProductDetails = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [productDetails, setProductDetails] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const { cart, setCart } = useContext(CartContext);

  const getRecommendations = async () => {
    const res = await api.get("/products/home");
    setRecommendations(res.data);
  };

  const getProductDetails = async (pid) => {
    const res = await api.get(`/products/details?id=${pid}`);
    setProductDetails(res.data);
    getRecommendations();
  };

  const handleAddToCart = () => {
    const newCart = [...cart, productDetails];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  useEffect(() => {
    if (pid) getProductDetails(pid);
  }, [pid]);

  return (
    <div className="">
      {productDetails && (
        <div className="flex flex-col md:flex-row gap-12 max-w-4xl mx-auto mt-4 px-4">
          <div className="md:w-96 h-96 relative">
            <Image
              src={productDetails.imgURL}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="md:mt-16">
            <h1 className="font-semibold text-2xl">{productDetails.name}</h1>
            <div className="mt-4 mb-4">
              <Tag color="green">{productDetails.volume}</Tag>
            </div>
            <Rate disabled defaultValue={4.5} />
            <h2 className="font-semibold text-2xl mt-6 text-grocery-green">
              Rs. {productDetails.sellingPrice}
            </h2>
            <Button
              className="bg-grocery-green text-white text-lg flex items-center mt-4 font-medium rounded-lg"
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
          </div>
        </div>
      )}
      <div className="max-w-[1400px] mx-auto mt-24 px-4">
        <h1 className="mt-4 mb-12 text-xl font-semibold text-gray-600">
          Other Recommendations
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
          {recommendations.map((product, i) => (
            <ProductCard key={product._id + i} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
