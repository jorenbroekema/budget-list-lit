import { html, css, LitElement } from 'lit-element';
import { TransactionManager } from './transaction.service.js';

const formatter = new Intl.NumberFormat('en', {
  maximumFractionDigits: 4,
  style: 'currency',
  currency: 'EUR',
});

class MatiasComponent extends LitElement {
  static get properties() {
    return {
      transactions: {
        type: Object,
      },
      leftover: {
        type: Number,
        attribute: false,
      },
    };
  }

  static get styles() {
    return css`
      :host {
        max-width: 500px;
        display: block;
        margin: 1rem;
      }
      .expense {
        color: red;
      }
      .income {
        color: green;
      }
    `;
  }

  constructor() {
    super();
    this.transactions = [];
    this.leftover = 0;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.transactions = await TransactionManager.getTransactions();
  }

  updated(changes) {
    if (changes.has('transactions')) this.recalculate();
  }

  recalculate() {
    if (this.transactions.length) {
      this.leftover = this.transactions
        .map((t) => (t.type === 'expense' ? t.amount * -1 : t.amount))
        .reduce((a, b) => a + b);
    }
  }

  _onSubmit(ev) {
    ev.preventDefault();
    console.log(ev);
    this.transactions = [
      ...this.transactions,
      {
        name: ev.target.elements['name'].value,
        amount: ev.target.elements['amount'].value,
        type: ev.target.elements['type'].value,
      },
    ];
    ev.target.elements['name'].value = '';
    ev.target.elements['amount'].value = '';
  }

  render() {
    return html`
      <form @submit=${this._onSubmit}"">
        <input name="name" type="text" placeholder="Transaction Name"/>
        <input name="amount" type="number" placeholder="Amount"/>
        <div class="button-group">
        <input id="expense" type="radio" name="type" value="expense" checked>
        <label for="expense">Expense</label>
        <input id="income" type="radio" name="type" value="income">
        <label for="income">Income</label>
        </div>
        <input type="submit"/>
      </form>
      <h1>Leftover Budget: ${formatter.format(this.leftover)}</h1>
      <ul>
        ${this.transactions.map((t) => {
          return html`
            <li class="${t.type}">${t.name} - amount: ${formatter.format(t.amount)}</li>
          `;
        })}
      </ul>
    `;
  }
}
customElements.define('matias-component', MatiasComponent);

export default html`<matias-component></matias-component>`;
