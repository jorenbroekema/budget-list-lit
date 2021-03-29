import { LitElement, html, css } from 'lit-element';

class SukhBudgetList extends LitElement {
  static get styles() {
    return css`
      h1 {
        color: blue;
      }
    `;
  }
  static get properties() {
    return {
      title: { type: String },
      totalBudget: { attribute: false },
      pendingBudget: { attribute: false },
      transactions: { attribute: false },
    };
  }
  constructor() {
    super();
    this.title = 'My budget';
    this.totalBudget = 1500;
    this.pendingBudget = 1500;
    this.income = 0;
    this.expense = 0;
    this.fetchTransactions();
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('transactions')) {
      this.recalculateBudget();
    }
  }

  render() {
    return html`<h1>${this.title}</h1>
      <h2>Total ${this.totalBudget}</h2>
      <h2>Pending ${this.pendingBudget}</h2>
      <ul class="transaction-list">
        ${this.transactions.map(
          (trans) => html`
            <li>
              <div>Name: ${trans.name}</div>
              <div>Amount: ${trans.amount}</div>
              <div>Type : ${trans.type}</div>
            </li>
          `,
        )}
      </ul>`;
  }

  async fetchTransactions() {
    const response = await fetch(new URL('transactions.json', import.meta.url).href);
    this.transactions = await response.json();
  }

  recalculateBudget() {
    const totalExp = this;.transactions
    .filter(trans => trans === 'expense')
    .reduce((acc, item) => (acc += item.amount), 0);

    const totalIn = this;.transactions
    .filter(trans => trans === 'income')
    .reduce((acc, item) => (acc += item.amount), 0);
    this.budgetPending = totalIncome - totalExpenses;

  }
}
customElements.define('sukh-budget-list', SukhBudgetList);

export default `<sukh-budget-list></sukh-budget-list>`;
