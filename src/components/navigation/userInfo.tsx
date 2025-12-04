import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import LogoutButton from "./LogoutButtonTest";
import Navbar from "@/components/navigation/Navbar";

interface JwtPayload {
    Role?: string;
    FirstName?: string;
    LastName?: string;
    Department?: string;
}

export default async function UserInfo() {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) {
        return;
    }

    try {
        const decoded = jwt.decode(token) as JwtPayload;
        const firstName = decoded?.FirstName || "Okänd";
        const lastName = decoded?.LastName || "Okänd";
        const role = decoded?.Role || "Ingen roll";
        const department = decoded?.Department || "ingen avdelning";
        return (
            <div className="bg-purple-100 p-4 rounded-md shadow-md mb-4 flex flex-col justify-between">
                <div className="flex sm:flex-row justify-between">
                    <h2 className="text-xl font-bold text-purple-700">
                        Välkommen {firstName} {lastName} 👋
                    </h2>
                    <p className="text-md text-purple-600 hidden sm:inline-block">
                        Din roll: <strong>{role}</strong> inom{" "}
                        <strong>{department}</strong>
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <Navbar />
                    <LogoutButton />
                </div>
            </div>
        );
    } catch (err) {
        return <p>Tokenfel: {String(err)}</p>;
    }
}
