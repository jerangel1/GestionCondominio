const CoinDollar = ({ className }: { className: string }) => {
  return (
    <svg
      className={className}
      width="114"
      height="116"
      viewBox="0 0 114 116"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M58.3336 29.5334V91.1336M73.7337 47.5002C73.7337 40.4161 66.8396 34.6668 58.3336 34.6668C49.8277 34.6668 42.9336 40.4161 42.9336 47.5002C42.9336 54.5842 49.8277 60.3335 58.3336 60.3335C66.8396 60.3335 73.7337 66.0829 73.7337 73.1669C73.7337 80.2509 66.8396 86.0003 58.3336 86.0003C49.8277 86.0003 42.9336 80.2509 42.9336 73.1669"
        stroke="#81C564"
        strokeWidth="7.5"
        strokeLinecap="round"
      />
      <path
        d="M32.6667 15.8685C40.467 11.3558 49.3219 8.98618 58.3335 9.00006C86.685 9.00006 109.667 31.9821 109.667 60.3336C109.667 88.685 86.685 111.667 58.3335 111.667C29.982 111.667 7 88.685 7 60.3336C7 50.9857 9.49994 42.2128 13.8684 34.6668"
        stroke="#81C564"
        strokeWidth="7.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export type CurrencyUtilType = {
  dbName: string;
  currencyName: string;
  currencyAbbr: string;
  currencySymbol: string;
  primaryColor: {
    bg: string;
    text: string;
    border: string;
  };
  secondaryColor: {
    bg: string;
    text: string;
    border: string;
  };
  Icon: (props: { className: string }) => JSX.Element;
};

export const currencyUtils: CurrencyUtilType[] = [
  {
    dbName: "001",
    currencyName: "Bolivares",
    currencyAbbr: "BS",
    currencySymbol: "Bs",
    primaryColor: {
      bg: "bg-[#458C2D]",
      text: "text-[#458C2D]",
      border: "border-[#84CC67]",
    },
    secondaryColor: {
      bg: "bg-[#84CC67]",
      text: "text-[#84CC67]",
      border: "border-[#84CC67]",
    },
    Icon: CoinDollar,
  },
  {
    dbName: "002",
    currencyName: "Dolares",
    currencyAbbr: "USD",
    currencySymbol: "$",
    primaryColor: {
      bg: "bg-[#f06611]",
      text: "text-[#f06611]",
      border: "border-[#f06611]",
    },
    secondaryColor: {
      bg: "bg-[#f5823b]",
      text: "text-[#f5823b]",
      border: "border-[#f5823b]",
    },
    Icon: CoinDollar,
  },
  {
    dbName: "006",
    currencyName: "Pesos Colombianos",
    currencyAbbr: "COD",
    currencySymbol: "$",
    primaryColor: {
      bg: "bg-[#f06611]",
      text: "text-[#f06611]",
      border: "border-[#f5823b]",
    },
    secondaryColor: {
      bg: "bg-[#f5823b]",
      text: "text-[#f5823b]",
      border: "border-[#f5823b]",
    },
    Icon: CoinDollar,
  },
];
