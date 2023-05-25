import {configureStore} from '@reduxjs/toolkit'
import productReducer from '../redux/slices/product/productSlice';
import categoryReducer from '../redux/slices/category/categorySlice';

const store = configureStore({
    reducer:{
        products:productReducer,
        categorys:categoryReducer
    }
})

export default store;