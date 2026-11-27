"use client";

import { Modal, toast, useOverlayState } from "@heroui/react";

// `trigger` must be a HeroUI <Button> (no onPress) — the Modal opens it.
import { api } from "@/lib/api";
import DestinationForm from "./DestinationForm";

export default function EditDestinationModal({ destination, trigger, onSaved }) {
  const state = useOverlayState();

  const save = async (values) => {
    try {
      const updated = await api(`/destinations/${destination._id}`, { method: "PATCH", body: values });
      toast.success("Travel package updated");
      state.close();
      onSaved?.(updated);
    } catch (err) {
      toast.danger(err.message);
      throw err;
    }
  };

  return (
    <Modal state={state}>
      {trigger}
      <Modal.Backdrop>
        <Modal.Container placement="auto" scroll="outside">
          <Modal.Dialog className="sm:max-w-3xl">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Update Travel Package</Modal.Heading>
              <p className="text-sm text-muted">Make changes to the travel package details below</p>
            </Modal.Header>
            <Modal.Body>
              <DestinationForm
                initial={destination}
                submitLabel="Save Changes"
                onSubmit={save}
                onCancel={state.close}
              />
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
