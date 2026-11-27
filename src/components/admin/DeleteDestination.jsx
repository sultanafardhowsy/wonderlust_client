"use client";

import { useState } from "react";
import { AlertDialog, Button, toast, useOverlayState } from "@heroui/react";
import { api } from "@/lib/api";

export default function DeleteDestination({ destination, trigger, onDeleted }) {
  const state = useOverlayState();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await api(`/destinations/${destination._id}`, { method: "DELETE" });
      toast.success(`"${destination.destinationName}" deleted`);
      state.close();
      onDeleted?.();
    } catch (err) {
      toast.danger(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog isOpen={state.isOpen} onOpenChange={state.setOpen}>
      {trigger}
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[420px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete Travel Package</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                Are you sure you want to delete <strong>&quot;{destination.destinationName}&quot;</strong>? This action cannot
                be undone and will permanently remove this travel package and its reviews.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button variant="tertiary" onPress={state.close}>
                Cancel
              </Button>
              <Button variant="danger" onPress={handleDelete} isDisabled={loading}>
                {loading ? "Deleting…" : "Delete Package"}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
