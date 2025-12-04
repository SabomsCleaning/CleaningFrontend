import { getServiceTypes } from "../../../server/actions/serviceType/serviceTypeApi";
import ServiceTypesList from "@/components/serviceType/ServiceTypesList";
import ServiceTypeForm from "@/components/serviceType/ServiceTypeForm";

export default async function ServiceTypePage() {
    const serviceTypes = await getServiceTypes();
    return (
        <div className="flex">
            <ServiceTypeForm />
            <ServiceTypesList serviceTypes={serviceTypes}/>
        </div>
    );
}
