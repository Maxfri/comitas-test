//dependencies
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getUser } from './middleware';

//types
import { IFixed, ISorter } from 'types/types';
import { IUser } from 'types/user.type';

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
} as IUser;

export const userSlice = createSlice({
	name: 'user',
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
		builder.addCase(getUser.pending, (state) => {
			state.get.status = "pending";
			state.loading = true;
		})
		builder.addCase(getUser.fulfilled, (state, action) => {
			state.get.status = "fulfilled";
			state.data = action.payload;
			state.loading = false;

			state.pagination.total = action.payload.length;
		})
		builder.addCase(getUser.rejected, (state, action) => {
			state.get.error = action.error;
			state.get.status = "failed";
			state.loading = false;

			console.log("Failed to load user data");
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
} = userSlice.actions;

export default userSlice.reducer;
