import { getServiceTypes } from "@/server/serviceTypeApi";
import ServiceTypesList from "@/components/ServiceType/ServiceTypesList";
import ServiceTypeForm from "@/components/ServiceType/ServiceTypeForm";

export default async function ServiceTypePage() {
    const serviceTypes = await getServiceTypes();
    return (
        <div>
            <ServiceTypesList serviceTypes={serviceTypes}/>
            <ServiceTypeForm />
        </div>
    );
}
