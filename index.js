import { css, html, LitElement } from 'lit-element';

class JorenComponent extends LitElement {
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
      budgetLeft: {
        attribute: false,
      },
    };
  }

  static get styles() {
    return css`
      :host {
        font-family: Roboto Slab, sans-serif;
        display: block;
        width: max-content;
        margin: 0 auto;
      }

      h1,
      h2 {
        text-align: center;
      }

      .transaction-list {
        list-style: none;
        padding: 0;
        margin: 10px auto;
      }

      .item {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        background-color: #ddd;
        margin: 10px 0;
        border-radius: 5px;
      }
    `;
  }

  constructor() {
    super();
    this.title = 'Budget List';
    this.list = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchTransactions();
  }

  updated(changedProperties) {
    if (changedProperties.has('list')) {
      this.recalculateBudget();
    }
  }

  render() {
    return html`
      <h1>${this.title}</h1>
      <h2 class="budget">
        ${new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(
          this.budgetLeft,
        )}
      </h2>
      <div class="budget__bar">
        <div class="budget__bar-fill"></div>
      </div>
      <ul class="transaction-list">
        ${this.list.map(
          (item) => html`
            <li class="item">
              <div class="item__name">${item.name}</div>
              <div class="item__amount">
                ${item.expense ? '-' : '+'}
                ${new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(
                  item.amount,
                )}
              </div>
            </li>
          `,
        )}
      </ul>
    `;
  }

  async fetchTransactions() {
    const response = await fetch('./transactions.json');
    if (response.status === 200) {
      const data = await response.json();
      this.list = data;
    }
  }

  recalculateBudget() {
    const totalExpenses = this.list.length
      ? this.list
          .filter((item) => item.expense)
          .reduce((acc, expense) => (acc += expense.amount), 0)
      : 0;

    const totalIncomes = this.list.length
      ? this.list
          .filter((item) => !item.expense)
          .reduce((acc, expense) => (acc += expense.amount), 0)
      : 0;

    this.budgetLeft = totalIncomes - totalExpenses;
  }
}
customElements.define('joren-component', JorenComponent);
