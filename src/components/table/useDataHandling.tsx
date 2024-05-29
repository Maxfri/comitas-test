import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'store/hooks';
import { ISorter, IFixed } from 'types/types';

export interface UseDataHandlingProps {
  getItems: () => void;
  resetFilters: () => void;
  handleRefresh: () => void;
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (pageSize: number) => void;
}

export const useDataHandling = (
  getItems: () => void,
  actions: {
    setSorters: ActionCreatorWithPayload<ISorter[], string>;
    setHiddens: ActionCreatorWithPayload<string[], string>;
    setFixeds: ActionCreatorWithPayload<IFixed[], string>;
    setPage: ActionCreatorWithPayload<number, string>;
    setPageSize: ActionCreatorWithPayload<number, string>;
  },
): UseDataHandlingProps => {
  const dispatch = useAppDispatch();

  const resetFilters = useCallback(() => {
    dispatch(actions.setSorters([]));
    dispatch(actions.setHiddens([]));
    dispatch(actions.setFixeds([]));
  }, [dispatch, actions]);

  const handleRefresh = useCallback(() => {
    resetFilters();
    getItems();
  }, [getItems, resetFilters]);

  const handlePageChange = useCallback(
    (page: number) => {
      dispatch(actions.setPage(page));
      handleRefresh();
    },
    [dispatch, actions, handleRefresh],
  );

  const handlePageSizeChange = useCallback(
    (pageSize: number) => {
      dispatch(actions.setPageSize(pageSize));
      handleRefresh();
    },
    [dispatch, actions, handleRefresh],
  );

  useEffect(() => {
    resetFilters();
    getItems();
  }, []);

  return {
    getItems,
    resetFilters,
    handleRefresh,
    handlePageChange,
    handlePageSizeChange,
  };
};
