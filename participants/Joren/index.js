import { css, html, LitElement } from 'lit-element';

class JorenComponent extends LitElement {
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
      :host {
        font-family: Roboto Slab, sans-serif;
        display: block;
        width: max-content;
        margin: 0 auto;
        --bar-color: hsl(0, 50%, 70%);
        --bar-color-fill: hsl(0, 50%, 50%);
        --bar-width: 400px;
      }
      h1,
      h2 {
        text-align: center;
      }
      .budget__bar {
        position: relative;
        height: 10px;
        width: 400px;
        border-radius: 4px;
        background-color: var(--bar-color);
        margin-bottom: 50px;
      }
      .budget__bar-fill {
        position: absolute;
        height: 10px;
        width: var(--bar-width);
        border-radius: 4px;
        background-color: var(--bar-color-fill);
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
    this.title = 'Budget List';
    this.transactions = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchTransactions();
  }

  updated(changedProperties) {
    if (changedProperties.has('transactions')) {
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
      <form @submit=${this.submitForm}>
        <div class="radio-group">
          <div class="radio">
            <label for="input-type-expense">Expense</label>
            <input id="input-type-expense" name="input-type" type="radio" checked />
          </div>
          <div class="radio">
            <label for="input-type-income">Income</label>
            <input id="input-type-income" name="input-type" type="radio" />
          </div>
        </div>
        <div class="form-group">
          <label>Name</label>
          <input type="text" name="name" />
          <label>Amount</label>
          <input type="number" name="amount" />
        </div>
        <button>+</button>
      </form>
      <ul class="transaction-list">
        ${this.transactions.map(
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
    const response = await fetch(new URL('./transactions.json', import.meta.url));
    if (response.status === 200) {
      const data = await response.json();
      this.transactions = data;
    }
  }

  recalculateBudget() {
    const totalExpenses = this.transactions.length
      ? this.transactions
          .filter((item) => item.expense)
          .reduce((acc, expense) => (acc += expense.amount), 0)
      : 0;

    const totalIncomes = this.transactions.length
      ? this.transactions
          .filter((item) => !item.expense)
          .reduce((acc, expense) => (acc += expense.amount), 0)
      : 0;

    this.budgetLeft = totalIncomes - totalExpenses;

    const percentageLeft = Math.max((100 / totalIncomes) * this.budgetLeft, 0);
    const barWidth = Math.max((400 / 100) * percentageLeft, 0);
    this.style.setProperty('--bar-width', `${barWidth}px`);
    this.style.setProperty('--bar-color', `hsl(${percentageLeft}, 50%, 70%)`);
    this.style.setProperty('--bar-color-fill', `hsl(${percentageLeft}, 50%, 50%)`);
  }

  submitForm(ev) {
    ev.preventDefault();
    const formElems = ev.target.elements;
    const amount = parseFloat(formElems['amount'].value);
    const name = formElems['name'].value;
    const expense = formElems['input-type-expense'].checked;
    if (!amount || !name) {
      return;
    }
    this.transactions = [{ amount, name, expense }, ...this.transactions];
  }
}
customElements.define('joren-component', JorenComponent);

export default `<joren-component></joren-component>`;
