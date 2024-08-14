export type CashRegister = {
  difference: number;
  responsableId: number;
  cashRegisterDate: Date;
  cashFund: string;
  currencyId: string;
  rate: number;
  amountDollars: number;
  details: CashRegisterDetail;
};

export type CashRegisterDetail = {
  cash: CashItem[];
  sales: SalesItem[];
  products: ProductItem[];
  expenses: ExpenseItem[];
};

export type CashItem = {
  id: number;
  amount: number;
};

export type SalesItem = {
  id: number;
  amount: number;
};

export type ProductItem = {
  id: number;
  amount: number;
  name: string;
  code: string;
};

export type ExpenseItem = {
  amount: number;
};

export type PaymentMethod = {
  id: number;
  nombre: string;
};


export type DetailsCash = {
  id: number;
  ticketOffice: number;
  currency: string;
  date: string;
  rate: number;
  cashFund: number;
};

export type Cash = {
  id: number;
  name: string;
  value: number;
};

export type Sale = {
  id: number;
  name: string;
  value: number;
};

export type Product = {
  id: number;
  name: string;
  value: number;
};

export type DigitalMoney = {
  id: number;
  name: string;
  value: number;
};

export type Expenses = {
  id: number;
  name: string;
  value: number;
};
export type CashReportDetails = {
  detailsCash: DetailsCash[];
  CASH: Cash[];
  SALE: Sale[];
  PRODUCT: Product[];
  digital_money: DigitalMoney[];
  expenses: Expenses[];
};

export type PayMethod = {
  id: number;
  name: string;
  description: string;
  abbreviation: string;
  currency: string[];
};

export type AmountPayMethod = {
  currency: string;
  id: number;
  pay_mode: string;
  total_amount: number;
};

export type PayMethodCashRegister = {
  id: number;
  name: string;
  description: string;
  abbreviation: string;
  currency: string[];
};
