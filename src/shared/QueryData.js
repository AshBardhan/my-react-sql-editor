export const initialQueryData = [
    {
        name: "Customers",
        input: "SELECT * from customers;"
    },
    {
        name: "Suppliers From Sales",
        input: "SELECT * from suppliers WHERE contactTitle='Sales Representative'",
   },
   {
        name: "Customer with Territory",
        input: "SELECT customerId, customerName, territoryId, territoryName from customers, territories;"
    }
];