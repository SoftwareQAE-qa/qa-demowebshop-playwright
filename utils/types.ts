export type ProductData = {
  name: string;
  quantity: number;
};

export type CustomerData = {
  firstName: string;
  lastName: string;
  emailPrefix: string;
  password: string;
};

export type BillingAddress = {
  country: string;
  city: string;
  address1: string;
  zipPostalCode: string;
  phoneNumber: string;
};

export type OrderData = {
  customer: CustomerData;
  billingAddress: BillingAddress;
  products: ProductData[];
};
