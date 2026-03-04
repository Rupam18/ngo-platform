export const getFinancialYearRange = (year: number) => {
    // Indian Financial Year: April 1 to March 31
    const start = new Date(`${year}-04-01T00:00:00.000Z`);
    const end = new Date(`${year + 1}-03-31T23:59:59.999Z`);
    return { start, end };
};
