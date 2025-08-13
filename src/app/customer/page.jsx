'use client'
import CustomerForm from "@/components/customerComponents/CustomerForm";
import CustomerList from "@/components/customerComponents/CustomerList";
import { useState } from "react";


const CustomerPage = () => {
    const [customer, setCustomer] = useState("")
    const [updateFlag, setUpdateFlag] = useState(false)

    return (
        <div className="flex">
            <CustomerForm key={customer?.id ?? 'new'} customer={customer} setCustomer={setCustomer} setUpdateFlag={setUpdateFlag}/>
            <CustomerList setCustomer={setCustomer} updateFlag={updateFlag}/>
        </div>
    );
};

export default CustomerPage;
