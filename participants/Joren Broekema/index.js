import { LitElement, html, css } from 'lit-element';

class JorenBudgetList extends LitElement {
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

      .item--expense {
        border: 1px solid red;
      }

      .item--income {
        border: 1px solid green;
      }

      form {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 50px;
      }

      .form-group {
        display: flex;
        flex-direction: column;
      }

      .radio {
        display: flex;
        width: 100px;
        justify-content: space-between;
      }

      input[type='number'] {
        width: 70px;
      }

      input[type='text'] {
        width: 120px;
      }
    `;
  }

  constructor() {
    super();
    this.budgetLeft = 0;
    this.title = 'Budget List';
    this.list = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchTransactions();
  }

  updated(changedProperties) {
    super.updated(changedProperties);
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
      <ul class="transaction-list">
        ${this.list.map(
          (item) => html`
            <li class="item item--${item.type}">
              <div class="item__name">${item.name}</div>
              <div class="item__amount">
                ${item.type === 'expense' ? '-' : '+'}
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
    const response = await fetch(new URL('transactions.json', import.meta.url).href);
    this.list = await response.json();
  }

  recalculateBudget() {
    const totalExpenses = this.list
      .filter((item) => item.type === 'expense')
      .reduce((acc, item) => (acc += item.amount), 0);

    const totalIncome = this.list
      .filter((item) => item.type === 'income')
      .reduce((acc, item) => (acc += item.amount), 0);

    this.budgetLeft = totalIncome - totalExpenses;
  }
}

customElements.define('joren-budget-list', JorenBudgetList);

export default `<joren-budget-list></joren-budget-list>`;
