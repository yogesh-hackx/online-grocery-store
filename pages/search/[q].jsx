import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import api from "../../utils/api";

const SearchPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const { q } = router.query;

  const getSearchResults = async () => {
    const res = await api.get(`/products/product/search?query=${q}&limit=10`);
    setProducts(res.data);
  };
  useEffect(() => {
    getSearchResults();
  }, [q]);
  return (
    <div className="mt-4 max-w-7xl mx-auto flex flex-col gap-4">
      {/* {JSON.stringify(products)} */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 max-w-[1400px] mx-auto mt-4 px-4">
        {products.map((product, i) => (
          <ProductCard key={product._id + i} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
