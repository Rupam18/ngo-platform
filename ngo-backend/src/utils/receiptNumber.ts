export const generateReceiptNumber = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 100000);
    return `RISO-${year}-${random}`;
};
