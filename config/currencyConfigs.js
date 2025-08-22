// Iraqi Dinar Configuration
export const IRAQI_DINAR_CONFIG = {
  currencyOptions: [
    { label: "25,000 IQD - $186 AUD", value: 186 },
    { label: "50,000 IQD - $281 AUD", value: 281 },
    { label: "75,000 IQD - $325 AUD", value: 325 },
    { label: "100,000 IQD - $381 AUD", value: 381 },
    { label: "200,000 IQD - $656 AUD", value: 656 },
    { label: "1,000,000 IQD - $2,800 AUD", value: 2800 },
    { label: "1,500,000 IQD - $4,200 AUD", value: 4200 },
    { label: "2,000,000 IQD - $5,600 AUD", value: 5600 },
    { label: "2,500,000 IQD - $7,000 AUD", value: 7000 },
    { label: "3,000,000 IQD - $8,400 AUD", value: 8400 },
    { label: "3,500,000 IQD - $9,800 AUD", value: 9800 },
    { label: "4,000,000 IQD - $11,200 AUD", value: 11200 },
    { label: "4,500,000 IQD - $12,600 AUD", value: 12600 },
    { label: "5,000,000 IQD - $14,000 AUD", value: 14000 },
    { label: "6,000,000 IQD - $16,800 AUD", value: 16800 },
    { label: "7,000,000 IQD - $19,600 AUD", value: 19600 },
    { label: "8,000,000 IQD - $22,400 AUD", value: 22400 },
    { label: "9,000,000 IQD - $25,200 AUD", value: 25200 },
    { label: "10,000,000 IQD - $28,000 AUD", value: 28000 },
    { label: "11,000,000 IQD - $30,800 AUD", value: 30800 },
    { label: "12,000,000 IQD - $33,600 AUD", value: 33600 },
    { label: "13,000,000 IQD - $36,400 AUD", value: 36400 },
    { label: "14,000,000 IQD - $39,200 AUD", value: 39200 },
    { label: "15,000,000 IQD - $42,000 AUD", value: 42000 },
  ],
  bankDetails: {
    accountName: "Oz Trading Group Pty Ltd",
    bankName: "National Australia Bank Limited",
    bsb: "083004",
    accountNumber: "739384751",
    swiftCode: "NATAAU3303M",
    bankAddress: "Ground Level 330 Collins St, Melbourne, VIC 3000",
  },
  bonusConfig: {
    minAmount: 1_000_000, // 1,000,000 IQD
    bonusAmount: 20_000_000, // 20,000,000 ZWL
    bonusLabel: "20,000,000 Zimbabwe Dollars",
    bonusReason: "Orders of 1,000,000 IQD or more",
    bonusType: "ZWL",
  },
  shippingFee: 49.99,
  pageTitle: "Buy Iraqi Dinar",
};

// Zimbabwe Dollar Configuration
export const ZIMBABWE_DOLLAR_CONFIG = {
  currencyOptions: [
    { label: "10 Billion Zimbabwe Dollars - $250 AUD", value: 250 },
    { label: "20 Billion Zimbabwe Dollars - $500 AUD", value: 500 },
    { label: "30 Billion Zimbabwe Dollars - $750 AUD", value: 750 },
    { label: "40 Billion Zimbabwe Dollars - $1000 AUD", value: 1000 },
    { label: "50 Billion Zimbabwe Dollars - $1250 AUD", value: 1250 },
    { label: "60 Billion Zimbabwe Dollars - $1500 AUD", value: 1500 },
    { label: "80 Billion Zimbabwe Dollars - $2000 AUD", value: 2000 },
    { label: "100 Billion Zimbabwe Dollars - $2500 AUD", value: 2500 },
    { label: "10 Trillion Zimbabwe Dollars - $2600 AUD", value: 2600 },
  ],
  bankDetails: {
    accountName: "Oz Trading Group Pty Ltd",
    bankName: "National Australia Bank Limited",
    bsb: "083004",
    accountNumber: "739384751",
    swiftCode: "NATAAU3303M",
    bankAddress: "Ground Level 330 Collins St, Melbourne, VIC 3000",
  },
  bonusConfig: null, // No bonus for ZWL orders
  shippingFee: 49.99,
  pageTitle: "Buy Zimbabwe Dollar",
};
