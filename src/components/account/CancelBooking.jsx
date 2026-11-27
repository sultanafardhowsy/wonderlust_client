"use client";

import { useState } from "react";
import { AlertDialog, Button, toast } from "@heroui/react";
import { api } from "@/lib/api";

export default function CancelBooking({ booking, onCancelled }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const cancel = async () => {
    setLoading(true);
    try {
      const updated = await api(`/bookings/${booking._id}/cancel`, { method: "PATCH" });
      toast.success("Booking cancelled");
      setOpen(false);
      onCancelled(updated);
    } catch (err) {
      toast.danger(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog isOpen={open} onOpenChange={setOpen}>
      <Button size="sm" variant="danger-soft">
        Cancel
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[420px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Cancel this booking?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                Your trip to <strong>{booking.destinationName}</strong> will be cancelled. You can always book again
                later.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button variant="tertiary" onPress={() => setOpen(false)}>
                Keep Booking
              </Button>
              <Button variant="danger" onPress={cancel} isDisabled={loading}>
                {loading ? "Cancelling…" : "Yes, Cancel"}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
