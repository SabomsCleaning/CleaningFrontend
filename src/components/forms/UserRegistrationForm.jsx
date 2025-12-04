"use client";
import { useForm } from "react-hook-form";
import { CreateUser } from "@/server/actions/user/CreateUser";

const UserForm = () => {
    const { register, handleSubmit } = useForm();

    const registerUser = async (data) => {
        try {
            const payload = {
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                role: data.role,
                department: data.department,
            };
            console.log(data);
            const response = await CreateUser(payload);

            if (!response.success) {
                throw new Error(
                    response.message || "Kunde inte skapa en användare"
                );
            }
        } catch (error) {
            console.error("Felet i registerform: ", error);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit(registerUser)}>
                <h2>Registrera användare</h2>
                <span className="text-sm text-gray-500 mb-1">Email</span>
                <input
                    type="email"
                    {...register("email", { required: true })}
                    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-500 mb-1">Password</span>
                <input
                    type="password"
                    {...register("password", { required: true })}
                    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-500 mb-1">Förnamn</span>
                <input
                    type="text"
                    {...register("firstName", { required: true })}
                    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-500 mb-1">Efternamn</span>
                <input
                    type="text"
                    {...register("lastName", { required: true })}
                    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-500 mb-1">Telefon</span>
                <input
                    type="text"
                    {...register("phoneNumber", { required: true })}
                    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-500 mb-1">Role</span>
                <input
                    type="text"
                    {...register("role", { required: true })}
                    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-500 mb-1">Department</span>
                <input
                    type="text"
                    {...register("department", { required: true })}
                    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition">
                    Spara användare
                </button>
            </form>
        </div>
    );
};

export default UserForm;

// {
//   "email": "string",
//   "password": "string",
//   "firstName": "string",
//   "lastName": "string",
//   "phoneNumber": "string",
//   "role": "string",
//   "department": "string"
// }
