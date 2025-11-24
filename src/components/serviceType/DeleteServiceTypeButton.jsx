"use client";

import { deleteServiceType } from "@/server/serviceType/serviceTypeApi";
import { useRouter } from "next/navigation";

const DeleteServiceTypeButton = ({ id }) => {
    const router = useRouter();

  const handleDelete = () => {
    (async () => {
      try {
        console.log(`Detta är id: ${id}`);
        await deleteServiceType(id);
        router.refresh();
      } catch (error) {
        console.error(error);
        //alert("Något gick fel");
      }
    })();
  };
  return (
    <button
      onClick={() => handleDelete()}
      className="border-red-400 border-1 bg-red-300 rounded-lg p-1 cursor-pointer"
    >
      Delete
    </button>
  );
};

export default DeleteServiceTypeButton;
