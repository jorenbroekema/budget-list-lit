import { html, LitElement, css } from 'lit-element';

class MihneaComponent extends LitElement {
  static get styles() {
    return css`
      :host {
        --bar-bg-color: #990000;
        --bar-color: #009900;
        --progress-width: 100%;
      }

      .bar,
      .progress {
        height: 1em;
        width: 45ch;
        background-color: var(--bar-bg-color);
      }
      .progress {
        background-color: var(--bar-color);
        width: var(--progress-width);
      }

      .statements div {
        display: inline-block;
      }
      .statements {
        list-style-type: none;
      }
      .expense-name {
        width: 20ch;
      }
      .amount {
        width: 20ch;
        text-align: right;
      }
      .income .amount {
        color: #009900;
      }
      .income .amount::before {
        content: '🤑 ';
      }
      .expense .amount::before {
        content: '💸 ';
      }
      .expense .amount {
        color: #990000;
      }
    `;
  }
  // nice emojis :D
  static get properties() {
    return {
      transactions: { attribute: false },
      budgetLeft: { attribute: false },
      income: { attribute: false },
    };
  }

  async fetchTransactions() {
    const response = await fetch(new URL('./transactions.json', import.meta.url));
    const result = await response.json();
    console.log(`result: ${result}`);

    this.transactions = result;
  }

  updated(changedProperties) {
    console.log(changedProperties);
    if (changedProperties.has('transactions')) {
      this.budgetLeft = this.transactions.reduce(
        (acum, crt) => acum + (crt.type === 'expense' ? -1 : 1) * crt.amount,
        0,
      );
      this.income = this.transactions
        .filter((x) => x.type === 'income')
        .reduce((acum, crt) => acum + crt.amount, 0);
    }
    this.style.setProperty('--progress-width', (this.budgetLeft / this.income) * 100 + '%');
  }

  constructor() {
    super();
    this.budgetLeft = 0;
    this.income = 0;
    this.transactions = [];
    this.fetchTransactions();
  }

  submitForm(ev) {
    ev.preventDefault();
    const name = ev.target.elements.itemName.value;
    const amount = parseFloat(ev.target.elements.itemAmount.value);
    const expenseType = ev.target.elements.expenseType.value;
    if (!name || !amount || (expenseType !== 'expense' && expenseType !== 'income')) return;
    this.transactions = [...this.transactions, { name, amount, type: expenseType }];
  }

  progressBar() {
    return html`<div class="bar"><div class="progress"></div></div>`;
  }

  inputForm() {
    return html`
      <form @submit=${this.submitForm}>
        <div>
          <label for="itemName"></label><input type="text" id="itemName" name="itemName" />
          <label for="itemAmount"></label><input type="number" id="itemAmount" name="itemAmount"" />
        </div>
        <div>
          <input type="radio" id="expense" name="expenseType" value="expense" />
          <label for="expense">expense</label>
          <input type="radio" id="income" name="expenseType" value="income" />
          <label for="income">income</label>

          <button>Add</button>
        </div>
      </form>
    `;
  }

  render() {
    return html`<h1>Balance: ${this.budgetLeft}</h1>
      ${this.progressBar()}
      <ul class="statements">
        ${this.transactions.map(
          (transaction) =>
            html`<li class="${transaction.type}">
              <div class="expense-name">${transaction.name}</div>
              <div class="amount">
                ${new Intl.NumberFormat('RO', { style: 'currency', currency: 'EUR' }).format(
                  transaction.amount,
                )}
              </div>
            </li>`,
        )}
      </ul>
      ${this.inputForm()}`;
  }
}
customElements.define('mihnea-component', MihneaComponent);

export default html`<mihnea-component></mihnea-component>`;
