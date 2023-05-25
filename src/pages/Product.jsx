
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategory } from "../redux/slices/category/categorySlice";
import {
  fetchDetail,
  fetchProduct,
} from "../redux/slices/product/productSlice";
import LoadingPage from "./LoadingPage";

const Product = () => {
  const [cate,setCate] = useState('');
  const [keyword,setKeyword] = useState('');
  const dispatch = useDispatch();
  const store = useSelector((state) => state.products);
  const categoryStore = useSelector(state => state?.categorys);
  const {category} = categoryStore;
  const { product } = store;
  const { loading } = store;
  useEffect(() => {
    dispatch(fetchProduct([cate,keyword]));
    dispatch(fetchCategory())
  }, [dispatch,cate,keyword]);

  return (
    
    <div className="w-[90%] mx-auto mt-24">
      <div className="w-[50%] mx-auto my-3">
      <form class="flex items-center">   
    <label for="simple-search" class="sr-only">Search</label>
      <div class="relative w-full">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
          </div>
          <input type="text" onChange={(e) =>setKeyword(e.target.value) } id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required/>
      </div>
</form>
      </div>
      <div className="flex justify-between">
        <div className=" w-[19%]">
          <div class="max-w-xs flex flex-col">
           {
            category?.data?.map(cate => (
              <a
              onClick={() => setCate(cate?.id)}
              value={cate?.id}
              class="inline-flex items-center gap-x-3.5 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-blue-600"
              href="#"
            >
              <svg
                class="flex-none"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708l2 2z"
                />
                <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
              </svg>
              {cate?.title}
            </a>
            ))
           }
          </div>
        </div>
        <div className=" w-[80%]">
       {
        loading ? (<LoadingPage />):(
          <div className="grid grid-cols-3 gap-3 lg:grid-cols-4">
          {
           product?.data?.map(item => (
             <div class=" flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
             <Link to={`/detail/${item?.id}`} 
               class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
               href="#"
             >
               <img
                 class="object-cover"
                 src={item?.images[0]?.url}
                 alt="product image"
               />
               <span class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                 {item?.category?.title}
               </span>
             </Link>
             <div class="mt-4 px-5 pb-5">
               <Link to={`/detail/${item?.id}`} >
                 <h5 class="text-xl tracking-tight text-slate-900">
                   {item?.title}
                 </h5>
               </Link>
               <div class="mt-2 mb-5 flex items-center justify-between">
                 <p>
                   <span class="text-3xl font-bold text-slate-900">${item?.discount}</span>
                   <span class="text-sm text-slate-900 line-through">${item?.price}</span>
                 </p>
                 <div class="flex items-center">
                   <svg
                     aria-hidden="true"
                     class="h-5 w-5 text-yellow-300"
                     fill="currentColor"
                     viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg"
                   >
                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                   </svg>
                   <svg
                     aria-hidden="true"
                     class="h-5 w-5 text-yellow-300"
                     fill="currentColor"
                     viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg"
                   >
                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                   </svg>
                   <svg
                     aria-hidden="true"
                     class="h-5 w-5 text-yellow-300"
                     fill="currentColor"
                     viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg"
                   >
                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                   </svg>
                   <svg
                     aria-hidden="true"
                     class="h-5 w-5 text-yellow-300"
                     fill="currentColor"
                     viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg"
                   >
                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                   </svg>
                   <svg
                     aria-hidden="true"
                     class="h-5 w-5 text-yellow-300"
                     fill="currentColor"
                     viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg"
                   >
                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                   </svg>
                   <span class="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                     5.0
                   </span>
                 </div>
               </div>
               <a
                 href="#"
                 class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
               >
                 <svg
                   xmlns="http://www.w3.org/2000/svg"
                   class="mr-2 h-6 w-6"
                   fill="none"
                   viewBox="0 0 24 24"
                   stroke="currentColor"
                   stroke-width="2"
                 >
                   <path
                     stroke-linecap="round"
                     stroke-linejoin="round"
                     d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                   />
                 </svg>
                 Add to cart
               </a>
             </div>
           </div>
           ))
          }
          
          </div>
        )
       }
        </div>
      </div>
    </div>
  );
};

export default Product;
