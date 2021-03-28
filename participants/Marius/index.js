import { html, css, LitElement } from 'lit-element';

class MariusComponent extends LitElement {
  static get properties() {
    return {
      budget: { type: Number },
      totalBudget: { type: Number },
      transactions: { type: Array },
      progress: { type: Number },
      filter: { type: String },
    };
  }
  static get styles() {
    return css`
      main {
        max-width: 300px;
        margin: 0 auto;
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      li {
        background-color: #cdfbe2;
        padding: 5px;
      }
      li.expense {
        background-color: #ffc9c9;
      }
      .progress-container {
        background-color: #eaeaea;
        height: 10px;
        /* width: 200px; */
        position: relative;
        overflow: hidden;
      }
      .progress {
        position: absolute;
        left: 0;
        background-color: green;
        height: 10px;
      }
    `;
  }

  constructor() {
    super();
    this.budget = 0;
    this.totalBudget = 0;
    this.transactions = [];
    this.filter = 'all';
  }

  connectedCallback() {
    super.connectedCallback();
    this.getTransactions();
  }

  updated(props) {
    if (props.has('transactions') || props.has('filter')) {
      this.getBudget();
    }
  }

  async getTransactions() {
    const localTransactions = localStorage.getItem('transactions');
    if (!localTransactions) {
      this.transactions = await fetch(new URL('./transactions.json', import.meta.url)).then((res) =>
        res.json(),
      );

      localStorage.setItem('transactions', JSON.stringify(this.transactions));
      return;
    }
    this.transactions = JSON.parse(localTransactions);
  }

  getBudget() {
    let budget = 0;
    let income = 0;
    this.transactions
      .filter((t) => this.filter == 'all' || t.type === this.filter)
      .forEach((t) => {
        budget = t.type === 'expense' ? budget - t.amount : budget + t.amount;
        income = t.type === 'income' ? income + t.amount : 0;
      });
    this.budget = budget;

    this.progress = this.budget > 0 ? (this.budget * 100) / income : 0;
  }
  addTransaction() {
    this.nameEl = this.shadowRoot.querySelector('[name="name"]');
    this.amountEl = this.shadowRoot.querySelector('[name="amount"]');
    this.typeEl = this.shadowRoot.querySelector('[name="type"]:checked');

    const name = this.nameEl.value;
    const amount = +this.amountEl.value;
    const type = this.typeEl.value;
    if (!name || !amount || !type) return;
    this.transactions = [{ name, amount, type }, ...this.transactions];
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
  }

  filterTransactions(event) {
    const [filterEl] = event.composedPath();
    this.filter = filterEl.value;
  }

  render() {
    return html`
      <main>
      <h1>Budget left: ${new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
      }).format(this.budget)}</h1>
      <div class="progress-container">
        <div class="progress" style="width: ${this.progress}%"></div>
      </div>
      <hr />
      <input type="text" name="name" placeholder="name" /><br />
      <input type="number" name="amount" placeholder="amount" /><br />
      <input type="radio" id="expense" name="type" value="expense" />
      <label for="expense">expense</label>
      <input type="radio" id="income" name="type" value="income" />
      <label for="income">income</label><br />
      <button @click="${() => this.addTransaction()}">Add</button>
      <hr />
      <select @change="${(event) => this.filterTransactions(event)}">
        <option value="all">all</option>
        <option value="expense">expense</option>
        <option value="income">income</option>
      </select>
        <ul>
          ${this.transactions
            .filter((t) => this.filter == 'all' || t.type === this.filter)
            .map(
              (t) =>
                html`
                  <li class="${t.type === 'expense' ? 'expense' : ''}">
                    ${t.name} -
                    ${new Intl.NumberFormat('de-DE', {
                      style: 'currency',
                      currency: 'EUR',
                    }).format(t.amount)}$
                  </li>
                `,
            )}
        </ul>
      </select>
      </main>
    `;
  }
}
customElements.define('marius-component', MariusComponent);

export default html`<marius-component></marius-component>`;
