import { useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';

export function useValues<T>(getStore: (state: RootState) => T) {
  const store = useAppSelector(getStore);
  return store;
}

