import { html, LitElement, css } from 'lit-element';

class EkaterinaBudgetList extends LitElement {
  constructor() {
    super();
    this.totalBudget = 1000;
    this.transactionsList = [];
    this.leftBudget = 10;
  }
  static get styles() {
    return css`

      .transaction-income {
        color:green;
      }
      .transaction-expense {
        color:red;
      },

    `;
  }
  static get properties() {
    return {
      totalBudget: {
        reflect: true,
        type: String,
      },
      transactionsList: {},
      leftBudget: {},
    };
  }

  connectedCallback() {
    super.connectedCallback(); //don't forget!
    this.fetchTransactions();
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('transactionsList')) {
      this.recalculateBudget();
    }
  }

  render() {
    return html`
      <h3>Total Budget: ${this.totalBudget}</h3>
      <ul class="transaction-list">
        ${this.transactionsList.map(
          (item) => html`
            <li class="transaction-${item.type}">
              <div class="item__name">${item.name}</div>
              <div class="item__amount">${item.amount}</div>
              <div class="item__type">${item.type}</div>
            </li>
          `,
        )}
      </ul>
    `;
  }

  async fetchTransactions() {
    const result = await fetch('./transactions.json');
    this.transactionsList = await result.json();
  }

  recalculateBudget() {
    let totalExpense = this.transactionsList
      .filter((item) => item.type === 'expense')
      .reduce((acc, item) => (acc += item.amount), 0);
    let totalIncome = this.transactionsList
      .filter((item) => item.type === 'income')
      .reduce((acc, item) => (acc += item.amount), 0);
    this.totalBudget = this.totalBudget - totalExpense + totalIncome;
  }
}

customElements.define('ekaterina-budget-component', EkaterinaBudgetList);

export default `<ekaterina-budget-component></ekaterina-budget-component>`;
