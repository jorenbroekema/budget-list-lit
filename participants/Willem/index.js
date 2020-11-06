import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';

class WillemComponent extends LitElement {
  static get properties() {
    return {
      totalBudget: {
        attribute: false,
      },
      transactions: {
        attribute: false,
      },
      totalIncome: {
        attribute: false,
      },
      totalExpense: {
        attribute: false,
      },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        width: max-content;
        margin: 0 auto;
        --bar-progress-color: hsl(0, 100%, 50%);
        padding: 10px;
      }

      h2 {
        margin: 0;
        text-align: center;
      }
      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
      li {
        margin: 3px 0;
        background-color: lightgrey;
        display: flex;
        justify-content: space-between;
      }

      .bar-bg {
        overflow: hidden;
        height: 30px;
        border-radius: 5px;
        background-color: lightgrey;
        margin: 5px 0;
      }

      .bar-progress {
        background-color: var(--bar-progress-color);
        height: 100%;
        width: var(--bar-progress-width);
      }
      .name {
        flex-grow: 1;
      }
      .amount {
        min-width: 70px;
        text-align: right;
      }
      .income {
        background-color: rgba(0, 255, 0, 0.3);
      }
      .expense {
        background-color: rgba(255, 0, 0, 0.3);
      }

      form {
        max-width: max-content;
      }

      form input:not([type='radio']) {
        width: 170px;
      }

      .radio {
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
      }

      .radio-group {
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
      }

      .radio-wrapper {
        width: 170px;
        display: flex;
        justify-content: space-between;
      }

      .radio-filler {
        flex-grow: 1;
      }
    `;
  }

  constructor() {
    super();
    this.startBudget = 2000;
    this.transactions = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchTransactions();
  }

  async fetchTransactions() {
    const result = await fetch('./transactions.json');
    this.transactions = await result.json();

    this.doTransactions();
  }

  doTransactions() {
    const total = this.transactions.reduce((acc, curr) => {
      return curr.type === 'expense' ? (acc -= curr.amount) : (acc += curr.amount);
    }, 0);

    this.totalBudget = total;

    this.totalExpense = this.transactions
      .filter((item) => item.type === 'expense')
      .reduce((acc, curr) => (acc += curr.amount), 0);

    this.totalIncome = this.transactions
      .filter((item) => item.type === 'income')
      .reduce((acc, curr) => (acc += curr.amount), 0);

    const ratio = Math.max(100 - (100 / this.totalIncome) * this.totalExpense, 0);

    this.style.setProperty('--bar-progress-width', `${ratio}%`);
    this.style.setProperty('--bar-progress-color', `hsl(${ratio}, 100%, 50%`);
  }

  submitForm(event) {
    event.preventDefault();

    const form = event.target;
    const tname = form.elements['tname'].value;
    const tvalue = form.elements['tvalue'].value;
    const ttypeExpense = form.elements['ttype-expense'].checked;
    const ttypeIncome = form.elements['ttype-income'].checked;

    if (!ttypeExpense && !ttypeIncome) {
      throw new Error('You must at least check one value');
    }

    if (!tname || !tvalue) {
      return;
    }

    const newTransaction = {
      name: tname,
      amount: parseFloat(tvalue),
      type: ttypeExpense ? 'expense' : 'income',
    };

    console.log(newTransaction);

    this.transactions = [...this.transactions, newTransaction];
  }

  updated(changedProps) {
    if (changedProps.has('transactions')) {
      this.doTransactions();
    }
  }

  getListItemClassMap(item) {
    return {
      expense: item.type === 'expense',
      income: item.type === 'income',
    };
  }

  render() {
    return html`
      <h2>
        Total budget is:
        ${new Intl.NumberFormat(document.documentElement.lang || navigator.language, {
          style: 'currency',
          currency: 'EUR',
        }).format(this.totalBudget)}
      </h2>
      <div class="bar-bg">
        <div class="bar-progress"></div>
      </div>
      <form @submit=${this.submitForm}>
        <div>
          <label for="tname">Transaction name:</label>
          <input type="text" id="tname" name="tname" />
        </div>

        <div>
          <label for="tvalue">Transaction value:</label>
          <input type="number" id="tvalue" name="tvalue" />
        </div>

        <div class="radio-group">
          <div class="radio-wrapper">
            <div class="radio">
              <label for="ttype-expense">Expense</label>
              <input type="radio" id="ttype-expense" ?checked=${true} name="ttype" />
            </div>
            <div class="radio">
              <label for="ttype-income">Income</label>
              <input type="radio" id="ttype-income" name="ttype" />
            </div>
          </div>
          <div class="radio-filler">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
      <ul>
        ${this.transactions.map(
          (item) => html`
            <li class=${classMap(this.getListItemClassMap(item))}>
              <div class="name">${item.name}</div>
              <div>${item.type === 'expense' ? '-' : '+'}</div>
              <div class="amount">
                ${new Intl.NumberFormat(document.documentElement.lang || navigator.language, {
                  style: 'currency',
                  currency: 'EUR',
                }).format(item.amount)}
              </div>
            </li>
          `,
        )}
      </ul>
    `;
  }
}
customElements.define('willem-component', WillemComponent);

export default html`<willem-component></willem-component>`;
