import { LitElement, html, css } from 'lit-element';

class MarkoBudgetList extends LitElement {
  static get properties() {
    return {
      title: {
        type: String,
        reflect: true,
        attribute: 'my-title',
      },
      transactions: {
        attribute: false,
      },
      budgetLeft: {
        attribute: false,
      },
    };
  }

  static get styles() {
    return css`
      h1 {
        color: red;
      }
      .item--expense {
        color: red;
      }

      .item--income {
        color: green;
      }
    `;
  }

  constructor() {
    super();
    this.budgetLeft = 0;
    this.title = 'Budget List';
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
      this.requestUpdate(); // not nice, but trigger explicit re-render here to make sure that all transactions are displayed
    }
  }

  render() {
    return html`
      <h1>${this.title}</h1>
      <h2>Budget ${this.budgetLeft}</h2>
      <ul>
        ${this.transactions.map(
          (item) => html`
            <li>
              <div>
                ${item.name}
                <span class="item--${item.type}">${item.amount}</span>
                ${item.type === 'income' ? '+' : '-'}
              </div>
            </li>
          `,
        )}
      </ul>
    `;
  }

  async fetchTransactions() {
    const response = await fetch(new URL('transactions.json', import.meta.url).href);
    this.transactions = await response.json();
  }

  recalculateBudget() {
    // this.budgetLeft =
    //   this.budgetLeft - this.transactions.reduce((acc, item) => (acc += item.amount), 0);

    const totalExpenses = this.transactions
      .filter((item) => item.type === 'expense')
      .reduce((acc, item) => (acc += item.amount), 0);

    const totalIncome = this.transactions
      .filter((item) => item.type === 'income')
      .reduce((acc, item) => (acc += item.amount), 0);

    this.budgetLeft = totalIncome - totalExpenses;

    // this.transactions.forEach((transaction) => {
    //   if (transaction.type === 'income') {
    //     this.budgetLeft = this.budgetLeft + transaction.amount;
    //   }
    //   if (transaction.type === 'expense') this.budgetLeft = this.budgetLeft - transaction.amount;
    // });
  }
}

customElements.define('marko-budget-list', MarkoBudgetList);

export default `<marko-budget-list></marko-budget-list>`;
