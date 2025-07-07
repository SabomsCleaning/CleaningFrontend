import CustomerList from "@/components/CustomerList";
import RegisterCustomer from "@/components/forms/CustomerRegisterForm";

export default function serviceTypes(){
    return (
        <div>
            <RegisterCustomer/>
            <CustomerList/>
        </div>
        );
}