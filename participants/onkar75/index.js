import { LitElement, html, css } from 'lit-element';

class OnkarBudgetList extends LitElement {
  constructor() {
    super();
    this.totalBudget = 2000;
    this.title = 'Budget';
    this.budgetItems = [];
    this.incomeList = [];
    this.expenseList = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.__fetchTransactionDetails();
  }

  static get styles() {
    return css`
      h1,
      h2 {
        color: grey;
      }
    `;
  }

  static get properties() {
    return {
      incomeList: {
        type: Array,
      },
      title: {
        type: String,
      },
      budgetLeft: {
        type: Number,
      },
      budgetItems: {
        type: Array,
      },
      expenseList: {
        type: Array,
      },
    };
  }
  render() {
    return html`
      <h1>The Total Budget is :${this.totalBudget}</h1>
      <h2>The Budget left is : ${this.budgetLeft}</h2>
      <div>${this.budgetItems.map((item) => html`<li>${item.name}-${item.amount}</li>`)}</div>
      <br />
      <p>Income List</p>
      <div>${this.incomeList.map((item) => html`<li>${item.name}-${item.amount}</li>`)}</div>
      <br />
      <p>Expense List</p>
      <div>${this.expenseList.map((item) => html`<li>${item.name}-${item.amount}</li>`)}</div>
    `;
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('budgetItems')) {
      this.recalculateBudget();
      this.__filterIncomeAndExpenseList(); // it worked but didnt get why it didnt worked when I was caalling from cc method
      // cc only executes once when the element gets added to the DOM
      // Once the budgetList is fetched, we need to update it again
      // In the constructor, budgetList = [], so the first time it runs the expenses and income lists
      // are also [], ok.. got it , thank you :)
    }
  }

  recalculateBudget() {
    this.budgetLeft =
      this.totalBudget - this.budgetItems.reduce((acc, item) => (acc += item.amount), 0);
  }

  async __fetchTransactionDetails() {
    const response = await fetch(new URL('transactions.json', import.meta.url).href);
    this.budgetItems = await response.json();
  }

  __filterIncomeAndExpenseList() {
    console.log(10, this.budgetItems);
    this.incomeList = this.budgetItems.filter((item) => item.type === 'income');
    this.expenseList = this.budgetItems.filter((item) => item.type === 'expense');
    console.log(12, this.incomeList, this.expenseList);
  }
}

customElements.define('onkar-budget-list', OnkarBudgetList);

export default `<onkar-budget-list></onkar-budget-list>`;
