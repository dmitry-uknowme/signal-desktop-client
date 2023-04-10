import React, { createContext } from "react";

// export interface IProductsItemCart {
//   id: string
//   number: number
//   count: number
//   unit_price: any
//   price: any
//   okpd?: string
//   label?: string
//   updated_at: string
// }
interface ICentrifugeContext {
  terminalWeight: string | number;
  setTerminalWeight: React.Dispatch<React.SetStateAction<string | number>>;

  // productsCart: IProductsItemCart[]
  // setProductsCart: React.Dispatch<React.SetStateAction<IProductsItemCart[]>>
}
const CentrifugeContext = createContext({
  terminalWeight: 0,
  setTerminalWeight: () => null,
} as ICentrifugeContext);

export default CentrifugeContext;
