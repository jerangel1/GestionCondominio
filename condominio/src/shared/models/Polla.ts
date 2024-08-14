export type PollaIndividualProductResult = {
  number: number;
  draw_date: string;
  symbol: string;
  draw_name: string;
};


export type PollaPublicResults = Record<
  string,
  PollaIndividualProductResult[]
>;
export type PollaPublicResultsDataTable = {
	[key: string]: {
		resultado: string;
		simbolo: string;
	};
} & {
	hour: string;
};
