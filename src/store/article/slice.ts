//dependencies
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getArticle } from './middleware';

//types
import {  IFixed, ISorter } from 'types/types';
import { IArticle } from 'types/article.type';

const initialState = {
	data: [],
	pagination: {
		page: 0,
		pageSize: 10,
		total: 0,
	},
	sorters: [],
	hiddens: [],
	fixeds: [],
	get: {
		status: "idle",
		error: {},
	},
	loading: false,
} as IArticle;

export const articleSlice = createSlice({
	name: 'article',
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.pagination.page = action.payload;
		},
		setPageSize: (state, action: PayloadAction<number>) => {
			state.pagination.pageSize = action.payload;
		},
		setTotal: (state, action: PayloadAction<number>) => {
			state.pagination.total = action.payload;
		},
		setSorters: (state, action: PayloadAction<ISorter[]>) => {
			state.sorters = action.payload;
		},
		setHiddens: (state, action: PayloadAction<string[]>) => {
			state.hiddens = action.payload;
		},
		setFixeds: (state, action: PayloadAction<IFixed[]>) => {
			state.fixeds = action.payload;
		},
	},
	extraReducers: (builder) => {
		// get
		builder.addCase(getArticle.pending, (state) => {
			state.get.status = "pending";
			state.loading = true;
		})
		builder.addCase(getArticle.fulfilled, (state, action) => {
			state.get.status = "fulfilled";
			state.data = action.payload;
			state.loading = false;

			state.pagination.total = action.payload.length;
		})
		builder.addCase(getArticle.rejected, (state, action) => {
			state.get.error = action.error;
			state.get.status = "failed";
			state.loading = false;

			console.log("Failed to load article data");
		})
	},
});

export const {
	setPage,
	setPageSize,
	setTotal,

	setSorters,
	setHiddens,
	setFixeds,
} = articleSlice.actions;


export default articleSlice.reducer;
