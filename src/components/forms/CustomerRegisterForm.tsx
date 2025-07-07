import { fetchApi } from "../../../lib/api/fetch";

export default function RegisterCustomer() {
    const inputStyle =
        "w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition";

    const labelStyle = "block mb-1 text-sm font-medium text-gray-500 pl-2 pr-2";
    async function addService(formdata: FormData) {
        "use server";
        const data = {
            CustomerFirstName: formdata.get("firstName") as string,
            CustomerLastName: formdata.get("lastName") as string,
            CustomerEmail: formdata.get("email") as string,
            CustomerPhoneNumber: formdata.get("phone") as string,
            CustomerAddressLine: formdata.get("streetAddress") as string,
            CustomerPostalCode: formdata.get("postalAddress") as string,
            CustomerCity: formdata.get("city") as string,
        };

        console.log("Skickar data till API", data);

        try {
            const response = await fetchApi("Customer", {
                method: "POST",
                body: JSON.stringify(data),
            });
            console.log("Svar från API:", response);
        } catch (error) {
            console.error("Kunde inte skicka data till API: ", error);
        }
    }
    return (
        <div>
            <form
                action={addService}
                className="flex flex-col"
                autoComplete="off">
                <div className="grid grid-cols-2 gap-2">
                    <label htmlFor="firstName" className={labelStyle}>
                        Förnamn
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="Förnamn"
                            className={inputStyle}
                        />
                    </label>
                    <label htmlFor="lastName" className={labelStyle}>
                        Efternamn
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Efternamn"
                            className={inputStyle}
                        />
                    </label>
                    <label htmlFor="email" className={labelStyle}>
                        E-post
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="E-post"
                            className={inputStyle}
                        />
                    </label>
                    <label htmlFor="phone" className={labelStyle}>
                        Telefon nummer
                        <input
                            type="tel"
                            name="phone"
                            id="phone"
                            placeholder="Telefon nummer"
                            className={inputStyle}
                        />
                    </label>
                </div>
                <label htmlFor="streetAddress" className={labelStyle}>
                    Adress
                    <input
                        type="text"
                        name="streetAddress"
                        id="streetAddress"
                        placeholder="Gatuadress"
                        className={inputStyle}
                    />
                </label>
                <div className="grid grid-cols-2 gap-2">
                    <label htmlFor="postalAddress" className={labelStyle}>
                        Postnummer
                        <input
                            type="text"
                            name="postalAddress"
                            id="postalAddress"
                            placeholder="Postnummer"
                            className={inputStyle}
                        />
                    </label>
                    <label htmlFor="city" className={labelStyle}>
                        Ort
                        <input
                            type="text"
                            name="city"
                            id="city"
                            placeholder="Ort"
                            className={inputStyle}
                        />
                    </label>
                </div>

                <button
                    className="border-1 border-gray-300 rounded-xl p-2 m-2 text-gray-500 hover:bg-purple-300 hover:border-purple-600 hover:border-2"
                    type="submit">
                    klicka mig
                </button>
            </form>
        </div>
    );
}
