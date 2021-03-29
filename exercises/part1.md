# Web component exercise

https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare

Live share session: https://prod.liveshare.vsengsaas.visualstudio.com/join?DDF4319451279357041805942A35A25F48B1


## Create a custom Counter component that

- Renders its contents into its shadow DOM.
- Has a node to show current value.
- Has buttons to increment and decrement the value.
- Updates its contents when the value attribute is updated.


### Life cycle callbacks

- static getObservedAttributes: returns array of aatributes
- constructor
- connectedCallback
- attributeChangedCallback(attributeName, oldValue, newValue)
- disconnectedCallback

- get propName()
- set propName(propValue)
