import { html, LitElement } from 'lit-element';

class BertramCounterComponent extends LitElement {
  static get properties() {
    return {
      _list: { attribute: false },
      _income: { attribute: false },
      _expenses: { attribute: false },
    };
  }

  constructor() {
    super();
    this._income = 0;
    this._expenses = 0;
    this._list = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchTransactions();
  }

  async fetchTransactions() {
    const response = await fetch(new URL('transactions.json', import.meta.url).href);
    this._list = await response.json();
    this.calculateInOut();
  }

  calculateInOut() {
    this._income = this._list
      .filter(({ type }) => type === 'income')
      .reduce((acc, item) => (acc += item.amount), 0);
    this._expenses = this._list
      .filter(({ type }) => type === 'expenses')
      .reduce((acc, item) => (acc += item.amount), 0);
  }

  render() {
    return html` <div>Income: E ${this._income}</div>
    <div>Expenses: E ${this._expenses}</div>
      <ul>
        ${this._list.map(
          (i) => html`<li>
            <div>Post: ${i.name}</div>
            <div>Amount: E${i.amount}</div>
            <div>Type: ${i.type}</div>
          </li>`,
        )}
      </ul>
    </div>`;
  }
}

customElements.define('bertram-budgetlist-component', BertramCounterComponent);

export default `<bertram-budgetlist-component></bertram-budgetlist-component>`;
