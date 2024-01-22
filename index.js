const elMap = {
  budget: document.querySelector('.budget'),
  form: document.getElementById('transaction-form'),
  list: document.querySelector('.transaction-list'),
};

class BudgetList {
  get list() {
    return this._list;
  }

  set list(value) {
    this._list = value;
    this.recalculateBudget();
    this.render();
  }

  constructor() {
    this.list = [];
    this.fetchTransactions();
    elMap.form.addEventListener('submit', this.submitForm.bind(this));
  }

  render() {
    elMap.list.innerHTML = this.list
      .map(
        (item) => `
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
      )
      .join('');

    elMap.budget.innerText = new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
    }).format(this.budgetLeft);
  }

  async fetchTransactions() {
    const response = await fetch(new URL('./transactions.json', import.meta.url));
    if (response.status === 200) {
      const data = await response.json();
      this.list = data;
    }
  }

  recalculateBudget() {
    const totalExpenses = this.list.length
      ? this.list
          .filter((item) => item.expense)
          .reduce((acc, expense) => (acc += expense.amount), 0)
      : 0;

    const totalIncomes = this.list.length
      ? this.list
          .filter((item) => !item.expense)
          .reduce((acc, expense) => (acc += expense.amount), 0)
      : 0;

    this.budgetLeft = totalIncomes - totalExpenses;

    const percentageLeft = Math.max((100 / totalIncomes) * this.budgetLeft, 0);
    const barWidth = Math.max((400 / 100) * percentageLeft, 0);

    const stylesheet = document.styleSheets[0];
    const rule = [...stylesheet.cssRules].find((r) => r.selectorText === ':root');
    rule.style.setProperty('--bar-width', `${barWidth}px`);
    rule.style.setProperty('--bar-color', `hsl(${percentageLeft}, 50%, 70%)`);
    rule.style.setProperty('--bar-color-fill', `hsl(${percentageLeft}, 50%, 50%)`);
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
    this.list = [{ amount, name, expense }, ...this.list];
  }
}

new BudgetList();
