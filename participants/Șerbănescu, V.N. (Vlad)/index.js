import { LitElement, html, css } from 'lit-element';

class VladBudgetList extends LitElement {
  static get properties() {
    return {
      title: {
        type: String,
        reflect: true,
        attribute: 'my-title',
      },
      list: {
        attribute: false,
      },
      currentIncome: {
        attribute: false,
      },
      budgetLeft: {
        attribute: false,
      },
      spent: {
        attribute: false,
      },
    };
  }

  static get styles() {
    return css`
      h1 {
        color: red;
      }
    `;
  }

  constructor() {
    super();
    this.currentIncome = 0;
    this.title = 'Budget List';
    this.spent = 0;
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('list')) {
      this.recalculateBudget();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchTransactions();
  }

  render() {
    return html`
      <h1>${this.title}</h1>
      <h2>My Money!! = ${this.currentIncome}</h2>
      <h2>Expenses = ${this.spent}</h2>
      <h2>Left funds = ${this.budgetLeft}</h2>
      <ul>
        ${this.list.map(
          (item) => html`
            <li>
              <div>
                ${item.type === 'expense' ? 'spent' : 'received'} ${item.amount} ${item.name}
              </div>
            </li>
          `,
        )}
      </ul>
    `;
  }

  async fetchTransactions() {
    const response = await fetch(
      new URL(
        'transactions.json',
        'http://localhost:8000/participants/Șerbănescu, V.N. (Vlad)/index.js',
      ).href,
    );
    this.list = await response.json();
  }

  recalculateBudget() {
    this.list.map((item) => {
      if (item.type === 'expense') this.spent = this.spent + item.amount;
    });
    this.list.map((item) => {
      if (item.type === 'income') this.currentIncome = this.currentIncome + item.amount;
    });
    this.budgetLeft = this.currentIncome - this.spent;
  }
}

customElements.define('vlad-budget-list', VladBudgetList);

export default `<vlad-budget-list></vlad-budget-list>`;
