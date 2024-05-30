export const initialQueryData = [
	{
		name: 'All Customers',
		code: 'SELECT * FROM customers;',
	},
	{
		name: 'Territory with IDs',
		code: 'SELECT territoryID, territoryName FROM territories;',
	},
	{
		name: 'Suppliers From Sales',
		code: "SELECT * FROM suppliers WHERE contactTitle='Sales Representative;'",
	},
	{
		name: 'Customer with Territory',
		code: 'SELECT customerId, customerName, territoryId, territoryName FROM customers, territories;',
	},
	{
		name: 'Customers from Dallas',
		code: "SELECT customerId, customerName, pinCode FROM customers WHERE city='Dallas';",
	},
	{
		name: 'All Suppliers',
		code: 'SELECT * FROM suppliers;',
	},
];
