import React from 'react'
import { getServiceTypes} from "@/server/serviceTypeApi";
import ServiceTypesList from '@/components/serviceType/ServiceTypesList';

export default async function ServiceTypePage() {
    const serviceTypes = await getServiceTypes();
  return (
    <div>
        <ServiceTypesList serviceTypes={serviceTypes}/>
    </div>
  )
}

