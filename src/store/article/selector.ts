import type { RootState } from 'store/store';

export const selectArticles = (state: RootState) => state.article.data;

export const selectPagination = (state: RootState) => state.article.pagination;
export const selectPage = (state: RootState) => state.article.pagination.page;
export const selectPageSize = (state: RootState) => state.article.pagination.pageSize;
export const selectTotal = (state: RootState) => state.article.pagination.total;

export const selectSorters = (state: RootState) => state.article.sorters;
export const selectHiddens = (state: RootState) => state.article.hiddens;
export const selectFixeds = (state: RootState) => state.article.fixeds;

export const selectLoading = (state: RootState) => state.article.loading;
export const selectGetError = (state: RootState) => state.article.get.error;
