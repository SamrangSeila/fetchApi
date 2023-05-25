import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchCategory = createAsyncThunk('category/fetch', async () => {
    const {data} = await axios.get(`http://127.0.0.1:8000/api/v1/category`)
    return data
});

const initialState = {
    loading:false,
    category:[],
    error:false,
}
//slice

const categorySlice = createSlice({
    name:"category",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchCategory.pending,(state,action) => {
            state.loading = true;
        });
        builder.addCase(fetchCategory.fulfilled,(state,action) => {
            state.loading = false;
            state.error = false;
            state.category = action.payload;
        });
        builder.addCase(fetchCategory.rejected,(state,action) => {
            state.loading = false;
            state.error = true;
            state.category = null;
        });

       
    }
})

export default categorySlice.reducer;

