import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IProduct } from '../store/modules/cart/types';
import { addProductToCartRequest } from '../store/modules/cart/actions';
import { IState } from '../store';

interface IProps{
 product: IProduct;
}

const CatalogItem: React.FC<IProps> = ({product}) => {
  
  const dispatch = useDispatch();
  
  const hasFailedStockCheck = useSelector<IState, boolean>(state => state.cart.failedStockCheck.includes(product.id));

  const handleAddProductToCart = useCallback(()=> {
    dispatch(addProductToCartRequest(product));
  }, [dispatch, product]);

  return (
    <article key={product.id}>
      <strong>{product.title}</strong> {" - "}
      <span>{product.price}</span> {"  "}
      <button type="button" onClick={() => handleAddProductToCart()} >Comprar</button> 
      {
        hasFailedStockCheck && <span style={{color: 'red'}}>Sem estoque</span>
      }
    </article>
  );
}

export default CatalogItem;