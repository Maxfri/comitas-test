import type { RootState } from 'store/store';

export const selectUsers = (state: RootState) => state.user.data;

export const selectPage = (state: RootState) => state.user.pagination.page;
export const selectPageSize = (state: RootState) => state.user.pagination.pageSize;
export const selectTotal = (state: RootState) => state.user.pagination.total;

export const selectSorters = (state: RootState) => state.user.sorters;
export const selectHiddens = (state: RootState) => state.user.hiddens;
export const selectFixeds = (state: RootState) => state.user.fixeds;

export const selectLoading = (state: RootState) => state.user.loading;
export const selectGetError = (state: RootState) => state.user.get.error;
