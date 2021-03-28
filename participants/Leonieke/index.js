import { html, LitElement } from 'lit-element';

class LeoniekeComponent extends LitElement {
  static get properties() {
    return {
      transactions: {
        type: Array,
      },
    };
  }

  async getTransactions() {
    const response = await fetch(new URL('./transactions.json', import.meta.url));
    const result = await response.json();
    this.transactions = result;
  }

  connectedCallback() {
    super.connectedCallback();
    this.getTransactions();
  }

  render() {
    return html`<h1>Budget list</h1>
      <ul>
        ${this.transactions.map(
          (item) => html`
            <li>
              <div>${item.name}</div>
              <div>${item.amount}</div>
            </li>
          `,
        )}
      </ul> `;
  }
}
customElements.define('leonieke-component', LeoniekeComponent);

export default html`<leonieke-component></leonieke-component>`;
