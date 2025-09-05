import {useForm} from "react-hook-form"

const ServiceLocationForm = () => {
    const { register, handleSubmit } = useForm();
  return (
    <div className="flex flex-col bg-green-200">
          <input
            className="input-glow"
            type="text"
            {...register("serviceAddressLine")}
            placeholder="Service-address"
          />
          <div className="flex">
            <input
              className="input-glow w-full"
              type="text"
              {...register("serviceCity")}
              placeholder="Stad"
            />
            <input
              className="input-glow w-full"
              type="text"
              {...register("servicePostalCode")}
              placeholder="Postnummer"
            />
          </div>
          <input
            className="input-glow"
            type="text"
            placeholder="ex. Hemmet, Sommarstugan"
            {...register("description")}
          />
          <label>
            <input type="checkbox" className="m-1 gap-28" {...register("Isdefault")} />
            Standard adress
          </label>
          <button className="border-1 rounded-xl p-2 m-1">Lägg till en ny</button>
        </div>
  )
}

export default ServiceLocationForm