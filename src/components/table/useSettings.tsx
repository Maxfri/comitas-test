import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useAppDispatch } from 'store/hooks';
import { ISorter, IFixed, ITitleSettings } from 'types/types';

export const useSettings = (
  sorters: ISorter[],
  hiddens: string[],
  fixeds: IFixed[],
  actions: {
    setSorters: ActionCreatorWithPayload<ISorter[], string>;
    setHiddens: ActionCreatorWithPayload<string[], string>;
    setFixeds: ActionCreatorWithPayload<IFixed[], string>;
  },
): ITitleSettings => {
  const dispatch = useAppDispatch();

  const handleChange =
    <P extends unknown>(setter: ActionCreatorWithPayload<P, string>) =>
    (value: P) => {
      dispatch(setter(value));
    };

  const settings = {
    sorter: { sorters, onChangeSorters: handleChange(actions.setSorters) },
    fixed: { fixeds, onChangeFixeds: handleChange(actions.setFixeds) },
    hidden: { hiddens, onChangeHiddens: handleChange(actions.setHiddens) },
  };
  return settings;
};
