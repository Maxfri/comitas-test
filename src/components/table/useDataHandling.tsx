import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useAppDispatch } from 'store/hooks';
import { ISorter, IFixed } from 'types/types';

export interface UseDataHandlingProps<T> {
  getItems: () => void;
  resetFilters: () => void;
  handleRefresh: () => void;
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (pageSize: number) => void;
}

export const useDataHandling = <T extends unknown>(
  getItems: () => void,
  actions: {
    setSorters: ActionCreatorWithPayload<ISorter[], string>;
    setHiddens: ActionCreatorWithPayload<string[], string>;
    setFixeds: ActionCreatorWithPayload<IFixed[], string>;
    setPage: ActionCreatorWithPayload<number, string>;
    setPageSize: ActionCreatorWithPayload<number, string>;
  },
): UseDataHandlingProps<T> => {
  const dispatch = useAppDispatch();

  const resetFilters = () => {
    dispatch(actions.setSorters([]));
    dispatch(actions.setHiddens([]));
    dispatch(actions.setFixeds([]));
  };

  const handleRefresh = () => {
    resetFilters();
    getItems();
  };

  const handlePageChange = (page: number) => {
    dispatch(actions.setPage(page));
    handleRefresh();
  };

  const handlePageSizeChange = (pageSize: number) => {
    dispatch(actions.setPageSize(pageSize));
    handleRefresh();
  };

  useEffect(() => {
    resetFilters();
    getItems();
  }, [dispatch]);

  return {
    getItems,
    resetFilters,
    handleRefresh,
    handlePageChange,
    handlePageSizeChange,
  };
};
