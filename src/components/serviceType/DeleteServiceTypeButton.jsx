'use client'

import { deleteServiceTypeAction } from "@/server/serviceTypeAction";
import {useTransaction} from "react"

const DeleteServiceTypeButton = ({ id }) => {
    const handleDelete = () => {
        // const confirmDelete = confirm("Vill du verkligen");
        // if (!confirmDelete) return;
        
        startTransaction(async () => {

            try {
                console.log(`Detta är id: ${id}`)
                await deleteServiceTypeAction(id);
            } catch (error) {
                console.error(error);
                //alert("Något gick fel");
            }
        })
    };
    return (
        <button
        onClick={()=>handleDelete()}
        className="border-red-400 border-1 bg-red-300 rounded-lg p-1">
            Delete
        </button>
    );
};

export default DeleteServiceTypeButton;
