# Assignment

Create a budget list app. It keeps your budget that you have left over, and shows an overview of transactions. You can add transactions.

## Budget & List

Steps:

1. Create a budget property to keep track of the total budget, display this. Start by assigning it a default value
2. Create a list that keeps track of transactions. For now, every transaction is an expense, which has a name and an amount
3. Ensure that if the totalBudget is edited, it updates automatically
4. Ensure that if the list of transactions changes, the totalBudget as well as the transactions are reflected automatically
5. Create a transactions.json file which contains an array of transactions to start with. Fetch it at the start!

## Income transactions

Make sure transactions can also be income, instead of expense.

1. Add a property on each transaction that tracks whether it is an income or expense
2. Make sure income/expenses are rendered differently
3. Get rid of the totalBudget, since you can now use income transactions as your buffer
4. Make sure that the leftover budget is calculated properly by expenses and transactions
5. Leftover budget should update properly when adding expense or income to the list

## Form for adding transactions

Now we should add a little form so we can add transactions.

1. Make a form to add transactions. Suggestion: a text input for the name, a number input for the amount, a radio input for expense vs income
2. Add a handler for form submission
3. Ignore adding when some of the information is not filled in
4. Adding a new transaction should already update the leftover budget and list of transactions, but verify it :) keep in mind reference value vs real value

## Add a visual bar

1. Add a visual bar element that shows progress --> how much budget is left
2. Use custom CSS properties for dynamically setting the right values when leftover budget changes
3. Start with just the width of the bar to align with percentage left
4. Make sure it's visually clear what the total width is vs the width leftover
5. Be stylish! Make the bar change color the fuller / emptier it is

## Add filter buttons

1. Add a button to filter only expenses
2. Add a button to filter only incomes
3. Add a button to filter none
4. Change your render method or budget items property to make sure the right items get rendered depending on the filters
5. Make the leftover budget be calculated based on which items are shown

## Bonus exercises

1. Use localStorage to store items on client side
2. Be creative!