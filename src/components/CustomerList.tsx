import { getCustomers } from "../../lib/api/customerService";

export default async function CustomerList() {
    const customers = await getCustomers();
    console.log(customers)
    return (
        <div>
            <h2>kunder</h2>
            <ul>
                {customers.map((c, index) => (
                    <li key={index}>{c.customerNumber} {c.customerFirstName} {c.customerLastName} –{" "}
                        {c.customerEmail}
                    </li>
                ))}
            </ul>
        </div>
    );
}
