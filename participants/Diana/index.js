import { LitElement, html, css } from 'lit-element';

class DianaComponent extends LitElement {
  static get styles() {
    return css`
      :host([foo]) {
        color: red;
      }
    `;
  }

  static get properties() {
    return {
      title: {
        type: String,
        reflect: true,
      },
      transactions: {
        attribute: false,
      },
      totalBudget: {
        attribute: false,
      },
      budgetLeft: {
        attribute: false,
      },
      leftBudgetPercent: {
        type: Number,
        reflect: true,
      },
      filterTransactions: {
        attribute: false,
      },
    };
  }

  async fetchTransactions() {
    const response = await fetch(new URL('./transactions.json', import.meta.url));
    const result = await response.json();

    this.transactions = result;
    this.filterTransactions = this.transactions;
  }

  constructor() {
    super();
    this.title = 'Awesome budget list!';
    this.totalBudget = 2000;
    this.budgetLeft = 0;
    this.transactions = [];
    this.leftBudgetPercent = 0;
    this.filterTransactions = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchTransactions();
  }

  updated(changedProperties) {
    if (changedProperties.has('totalBudget') || changedProperties.has('transactions')) {
      this.recalculateBudget();
    }
  }
  formSubmit(ev) {
    ev.preventDefault();
    const name = ev.target.elements['name'];
    const amount = ev.target.elements['amount'];
    const isExpense = ev.target.elements['transactionType'];
    if (name.value === '' || amount.value === '' || +amount.value === 0) return;
    this.transactions = [
      ...this.transactions,
      {
        name: name.value,
        amount: +amount.value,
        type: isExpense.checked ? 'Expense' : 'Income',
      },
    ];
  }

  filter(ev) {
    this.filterTransactions = this.transactions.filter(
      (t) => t.type === ev.target.value || ev.target.value === 'all',
    );
  }

  render() {
    return html`
      <label for="money">Progress:</label>
      <progress id="money" value="${this.leftBudgetPercent}" max="100">
        ${this.leftBudgetPercent}%
      </progress>
      <form @submit="${this.formSubmit}">
        <label for="name">Transaction name</label>
        <input type="text" name="name" />
        <label for="amount">Transaction amount</label>
        <input type="number" name="amount" />
        <label for="transactionType">Expense?</label>
        <input type="checkbox" name="transactionType" />
        <button>Add transaction</button>
      </form>
      <label for="filter">Filter by transactions</label>
      <select name="filter" @change="${this.filter}">
        <option value="all">All</option>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>
      <h1>${this.title}</h1>
      <h2>${this.budgetLeft}</h2>
      <ul>
        ${this.filterTransactions.map(
          (item) => html`
            <li>
              <div>${item.name}</div>
              <div>${item.amount}</div>
            </li>
          `,
        )}
      </ul>
    `;
  }

  recalculateBudget() {
    const totalExpenses = this.transactions.length
      ? this.transactions
          .filter((t) => t.type === 'Expense')
          .reduce((acc, expense) => (acc += expense.amount), 0)
      : 0;

    const totalIncomes = this.transactions.length
      ? this.transactions
          .filter((t) => t.type === 'Income')
          .reduce((acc, expense) => (acc += expense.amount), 0)
      : 0;

    this.budgetLeft = totalIncomes - totalExpenses;

    this.leftBudgetPercent =
      this.budgetLeft > this.totalBudget ? 100 : (this.budgetLeft / this.totalBudget) * 100;
  }
}
customElements.define('diana-component', DianaComponent);

export default `<diana-component></diana-component>`;
