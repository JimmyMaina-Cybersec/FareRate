export default interface CurrencyConversion {
    _id?: string;
    fromCurrency: string;
    toCurrency: string;
    fromAmount: number;
    toAmount: number;
    rate: number;
    serviceAgent: string;
    shop: string;
    createdAt?: Date;
    updatedAt?: Date;
}