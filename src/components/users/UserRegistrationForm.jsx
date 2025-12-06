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
                phoneNumber: data.phoneNumber, // FIX
                role: data.role,
                department: data.department,
            };

            const response = await CreateUser(payload);
            if (!response.success) {
                throw new Error(response.message || "Kunde inte skapa en användare");
            }
        } catch (error) {
            console.error("Felet i registerform: ", error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Registrera användare
            </h2>

            <form onSubmit={handleSubmit(registerUser)} className="space-y-4">
                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        {...register("email", { required: true })}
                        className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Lösenord
                    </label>
                    <input
                        type="password"
                        {...register("password", { required: true })}
                        className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Name Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Förnamn
                        </label>
                        <input
                            type="text"
                            {...register("firstName", { required: true })}
                            className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Efternamn
                        </label>
                        <input
                            type="text"
                            {...register("lastName", { required: true })}
                            className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Telefon
                    </label>
                    <input
                        type="text"
                        {...register("phoneNumber", { required: true })}
                        className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Role & Department */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Roll
                        </label>
                        <input
                            type="text"
                            {...register("role", { required: true })}
                            className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Avdelning
                        </label>
                        <input
                            type="text"
                            {...register("department", { required: true })}
                            className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition"
                >
                    Spara användare
                </button>
            </form>
        </div>
    );
};

export default UserForm;
