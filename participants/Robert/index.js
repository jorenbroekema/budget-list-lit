import { html, LitElement } from 'lit-element';

class RobertComponent extends LitElement {
  static get properties() {
    return {
      leftoverBuget: {
        type: Number,
      },
      transactions: {
        type: Array,
      },
    };
  }

  async fetchTransactions() {
    // const response = await fetch(new URL('./transactions.json', import.meta.url));
    // const result = await response.json();
    // this.transactions = result;
  }

  constructor() {
    super();
    this.leftoverBuget = 0;
    this.transactions = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchTransactions();
  }

  updated(changedProperties) {
    if (changedProperties.has('leftoverBuget') || changedProperties.has('transactions')) {
      this.calculateBuget();
    }
  }

  calculateBuget() {
    this.transactions.map((transaction) => {
      if (transaction.transactionType === 'income')
        this.leftoverBuget = this.leftoverBuget + transaction.amount;
      else {
        this.leftoverBuget = this.leftoverBuget - transaction.amount;
      }
    });
  }

  createTransactionList() {
    return this.transactions.map((transaction) => {
      return html`<li>Name:${transaction.name} Amount:${transaction.amount}</li>`;
    });
  }

  addToTheTransactionsList(ev) {
    ev.preventDefault();
    const tr = {
      name: ev.target.elements['trname'],
      amount: ev.target.elements['amount'],
      type: ev.target.elements['income'].checked === true ? 'income' : 'expense',
    };
    this.transactions = [...this.transactions, tr];
  }

  render() {
    return html`<form @submit=${this.addToTheTransactionsList}>
        <input type="text" id="name" name="trname" />
        <input type="number" id="amount" name="amount" />
        <input type="radio" id="income" name="type" value="income" />
        <input type="radio" id="expense" name="type" value="expense" />
        <button>Submit</button>
      </form>
      <p>Buget: ${this.leftoverBuget} $</p>
      <ul>
        ${this.createTransactionList()}
      </ul>`;
  }
}
customElements.define('robert-component', RobertComponent);

export default html`<robert-component></robert-component>`;
