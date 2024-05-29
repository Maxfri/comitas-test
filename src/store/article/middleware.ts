//dependencies
import { createAsyncThunk } from "@reduxjs/toolkit";

//types
import { IArticleItem } from "types/article.type";

//data
import { articles } from "data/article";

export const getArticle = createAsyncThunk(
	'article/getArticle',
	async (_, { rejectWithValue }) => {
		const promise: Promise<IArticleItem[]> = new Promise((resolve) => {
			setTimeout(() => {
				resolve(articles);
			}, 500);
		});

		try {
			return await promise;
		} catch (error) {
			return rejectWithValue(error);
		};
	},
);

