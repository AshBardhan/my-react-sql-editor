export const initialQueryData = [
    {
        name: "Customers",
        code: "SELECT * from customers;"
    },
    {
        name: "Suppliers From Sales",
        code: "SELECT * from suppliers WHERE contactTitle='Sales Representative'",
   },
   {
        name: "Customer with Territory",
        code: "SELECT customerId, customerName, territoryId, territoryName from customers, territories;"
    }
];