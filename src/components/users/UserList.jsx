'use server'

import { GetUsers } from "@/server/actions/user/GetUsers"

async function UserList() {
    const result = await GetUsers();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-gray-800">Våra anställda</h1>

            <div className="grid grid-cols-1 gap-4">
                {result.data.map((user) => (
                    <div 
                        key={user.id}
                        className="
                            bg-white 
                            shadow-sm 
                            rounded-xl 
                            p-4 
                            border 
                            hover:shadow-md 
                            hover:border-gray-300 
                            transition 
                            duration-200
                        "
                    >
                        <div className="font-medium text-gray-900 text-lg">
                            {user.firstName} {user.lastName}
                        </div>

                        <div className="mt-2 text-sm text-gray-600">
                            <p><span className="font-semibold">Roll:</span> {user.roles}</p>
                            <p><span className="font-semibold">Avdelning:</span> {user.department}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserList;
