const PATH = './transactions.json';

export const TransactionManager = {
  async getTransactions() {
    return await fetch(new URL(PATH, import.meta.url)).then((response) => response.json());
  },
};
