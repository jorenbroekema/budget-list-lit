import { LitElement, html, css } from 'lit-element';

class BartoszBudgetList extends LitElement {
  static get styles() {
    return css`
      h1 {
        color: red;
      }
    `;
  }

  static get properties() {
    return {
      budgetIncome: { attribute: false },
      budgetExpense: { attribute: false },
      transactions: { attribute: false },
    };
  }

  constructor() {
    super();
    this.budgetIncome = 0;
    this.budgetExpense = 0;
    this.transactions = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchTransactions();
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('transactions')) {
      this.recalculateBudget();
    }
  }

  recalculateBudget() {
    this.budgetIncome = this.recalculate('income');
    this.budgetExpense = this.recalculate('expense');
  }

  recalculate(type) {
    return this.transactions
      .filter((transaction) => type === transaction.type)
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  }

  async fetchTransactions() {
    const response = await fetch(new URL('transactions.json', import.meta.url).href);
    this.transactions = await response.json();
  }

  render() {
    return html`
      <h1>Budget List</h1>
      <ul>
        <li>${this.budgetIncome} : ${this.budgetExpense}</li>
        ${this.transactions.map(
          (transaction) =>
            html`<li>${transaction.type} : ${transaction.name} : ${transaction.amount}</li>`,
        )}
      </ul>
    `;
  }
}

customElements.define('bartosz-budget-list', BartoszBudgetList);
export default `<bartosz-budget-list></bartosz-budget-list>`;
