import { css, html, LitElement } from 'lit-element';

class JokeListComponent extends LitElement {
  static get properties() {
    return {
      budget: { attribute: false },
      list: { attribute: false },
    };
  }

  static get styles() {
    return css`
      tr.expense td {
        color: red;
      }
      tr.income td {
        color: blue;
      }
    `;
  }

  constructor() {
    super();
    this.budget = 0;
    this.list = {};
  }

  connectedCallback() {
    super.connectedCallback();
    // initialize list
    this._fetchTransactions();
  }

  updated(changedProperties) {
    if (changedProperties.has('list')) {
      this._recalculateBudget();
    }
  }

  render() {
    return html`
      <div>
        <table>
          <tr>
            <th>Name</th>
            <th>Amount</th>
          </tr>
          ${this.list.map((element, i) => {
            return html`<tr class="${element.type}">
              <td>${element.name}</td>
              <td>${element.amount}</td>
            </tr>`;
          })}
        </table>
        <p>Budget left: ${this.budget}</p>
      </div>
    `;
  }

  async _fetchTransactions() {
    const response = await fetch(new URL('transactions.json', import.meta.url));
    this.list = await response.json();
  }

  _recalculateBudget() {
    this.budget = this.list.reduce(this._reducer, 0);
  }

  _reducer(acc, cur) {
    let amount = 0;
    if (cur.type === 'expense') {
      amount = -1 * cur.amount;
    } else if (cur.type === 'income') {
      amount = 1 * cur.amount;
    }
    return acc + amount;
  }
}

customElements.define('joke-list-component', JokeListComponent);

export default `<joke-list-component></joke-list-component>`;
