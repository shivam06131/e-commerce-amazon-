import React, { useEffect } from "react";
import Product from "../Component/Product";
import LoadingBox from "../Component/LoadingBox";
import MessageBox from "../Component/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../Actions/productActions";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => {
            return <Product key={product._id} product={product} />;
          })}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
