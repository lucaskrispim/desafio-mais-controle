import { obra } from './obra'

export type DespesaData = {
  id: string,
  value: number,
  description: string,
  obra: obra,
  date: string
}

export type DespesaDataPage = {
  content?:DespesaData[];
  last: boolean;
  totalElements:number;
  totalPages:number;
  size?:number;
  number:number;
  first: boolean;
  numberOfElements?:number;
  empty?: boolean;
}