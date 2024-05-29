import { SerializedError } from "@reduxjs/toolkit";

//api settings
export interface IRequest {
    status: 'idle' | 'pending' | 'fulfilled' | 'failed',
    error: SerializedError,
};

//table settings
export interface IPagination {
  page: number,
  pageSize: number,
  total: number,
};

export type TSorterOperator = "ASC" | "DESC";

export interface ISorter {
  key: string,
  direction: TSorterOperator,
};

export type TFixedOperator = "left" | "right";

export interface IFixed {
  key: string,
  fixed: TFixedOperator,
};

export interface ITitleSettings {
  sorter?: {
    sorters: ISorter[],
    onChangeSorters: (sorters: ISorter[]) => void,
  },
  fixed?: {
    fixeds: IFixed[],
    onChangeFixeds: (fixeds: IFixed[]) => void,
  },
  hidden?: {
    hiddens: string[],
    onChangeHiddens: (hiddens: string[]) => void,
  },
};
