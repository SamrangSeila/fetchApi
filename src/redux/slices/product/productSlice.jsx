import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
export const fetchProduct = createAsyncThunk('product/fetch', async ([id,keyword]) => {
    const {data} = await axios.get(`http://192.168.100.16:8000/api/v1/product?id=${id}&keyword=${keyword}`)
    return data
});

export const fetchDetail = createAsyncThunk('product/detail',async (id) => {
    const {data} = await axios.get(`http://192.168.100.16:8000/api/v1/product/${id}`);
    return data;
})

const initialState = {
    loading:false,
    product:[],
    error:false,
}
//slice

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.pending,(state,action) => {
            state.loading = true;
        });
        builder.addCase(fetchProduct.fulfilled,(state,action) => {
            state.loading = false;
            state.error = false;
            state.product = action.payload;
        });
        builder.addCase(fetchProduct.rejected,(state,action) => {
            state.loading = false;
            state.error = true;
            state.product = null;
        });

        //detail

        builder.addCase(fetchDetail.pending,(state,action) => {
            state.loading = true;
        });
        builder.addCase(fetchDetail.fulfilled,(state,action) => {
            state.loading = false;
            state.error = false;
            state.detail = action.payload;
        });
        builder.addCase(fetchDetail.rejected,(state,action) => {
            state.loading = false;
            state.error = true;
            state.detail = null;
        });
    }
})

export default productSlice.reducer;

