'use client'
import CustomerForm from "@/components/customerComponents/CustomerForm";
import CustomerList from "@/components/customerComponents/CustomerList";

const CustomerPage = () => {
    return (
        <div>
            <CustomerForm />
            <CustomerList />
        </div>
    );
};

export default CustomerPage;
