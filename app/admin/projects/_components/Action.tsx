"use client";

import { deleteProjectById } from "@/lib/database/projectGetServerSession";
import { ProjectPayLoad } from "@/lib/database/User.query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "./Modal";

export default function Action({ deleteId, updateId, data }: { deleteId: string; updateId: ProjectPayLoad; data: ProjectPayLoad[] }) {
  const [loader, setLoader] = useState(true);

  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState<ProjectPayLoad | null>(null);

  const editProject = (data: ProjectPayLoad) => {
    setModal(true);
    setModalData(data);
  };

  async function deleteProject(id: string) {
    if (!confirm("Are you sure you want to delete?")) return;
    const toasts = toast.loading("Deleting...");
    const result = await deleteProjectById(id);
    if (!result.error) toast.success(result.message, { id: toasts });
    else toast.error(result.message, { id: toasts });
  }
  useEffect(() => {
    setLoader(false);
  }, []);

  if (loader) return <div>Loading</div>;

  return (
    <>
      <div className="flex gap-x-2">
        <button
          onClick={() => editProject(updateId)}
          className="font-semibold text-[16px] text-warning-200 border-2 rounded-[12px] border-warning-400 px-4 py-1 hover:ring-2 hover:ring-warning-200 hover:bg-gradient-to-r hover:from-warning-400 hover:to-warning-300 transition-all duration-200 hover:text-surface-50 focus:ring-2 focus:bg-warning-400 focus:text-surface-50 focus:ring-warning-100"
        >
          View
        </button>
        <button
          onClick={() => deleteProject(deleteId)}
          className="font-semibold text-[16px] text-red-500 border-2 rounded-[12px] border-red-500 px-4 py-1 hover:ring-2 hover:ring-red-200 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-300 transition-all duration-200 hover:text-surface-50 focus:ring-2 focus:bg-red-400 focus:text-surface-50 focus:ring-red-100 "
        >
          Delete
        </button>
      </div>
      <section className="absolute">{modal && <Modal setOpenModal={setModal} data={modalData} />}</section>
    </>
  );
}
