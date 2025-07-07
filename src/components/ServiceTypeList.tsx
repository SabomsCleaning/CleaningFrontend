import { getServiceTypes } from "../../lib/api/serviceTypes";

export default async function ServiceTypeList() {
    const serviceTypes = await getServiceTypes();
    return (
        <ul>
            {serviceTypes.map((t) => (
                <li key={t.id}>{t.name}</li>
            ))}
        </ul>
    );
}
