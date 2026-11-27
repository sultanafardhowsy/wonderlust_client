"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { useSession } from "@/lib/auth-client";
import EditDestinationModal from "@/components/admin/EditDestinationModal";
import DeleteDestination from "@/components/admin/DeleteDestination";

export default function AdminActions({ destination }) {
  const { data: session } = useSession();
  const router = useRouter();
  if (session?.user?.role !== "admin") return null;

  return (
    <div className="flex gap-2">
      <EditDestinationModal
        destination={destination}
        onSaved={() => router.refresh()}
        trigger={
          <Button variant="secondary" size="sm">
            <LuPencil /> Edit
          </Button>
        }
      />
      <DeleteDestination
        destination={destination}
        onDeleted={() => {
          router.push("/destinations");
          router.refresh();
        }}
        trigger={
          <Button variant="danger-soft" size="sm">
            <LuTrash2 /> Delete
          </Button>
        }
      />
    </div>
  );
}
