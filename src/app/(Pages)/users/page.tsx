export const dynamic = "force-dynamic";

import UserForm from "@/components/users/UserRegistrationForm";
import UserList from "@/components/users/UserList"
import React from "react";

export default function page() {
    return (
        <div className="flex flex-col p-2.5">
            Detta är användar sidan
          <div className="grid grid-cols-2 gap-2.5">
            <UserForm />
            <UserList/>
          </div>
        </div>
    );
}
