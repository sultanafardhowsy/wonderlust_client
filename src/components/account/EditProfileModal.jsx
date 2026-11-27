"use client";

import { useState } from "react";
import { Button, FieldError, Input, Label, Modal, TextArea, TextField, toast, useOverlayState } from "@heroui/react";
import { LuPencil } from "react-icons/lu";
import { authClient } from "@/lib/auth-client";

export default function EditProfileModal({ user }) {
  const state = useOverlayState();
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const { name, image, phone, location, bio } = Object.fromEntries(new FormData(e.currentTarget));
    setSaving(true);
    const { error } = await authClient.updateUser({ name, image: image || null, phone, location, bio });
    setSaving(false);
    if (error) return toast.danger(error.message || "Could not update profile");
    toast.success("Profile updated");
    state.close();
  };

  return (
    <Modal state={state}>
      <Button variant="secondary">
        <LuPencil /> Edit Profile
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-lg">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Edit Profile</Modal.Heading>
              <p className="text-sm text-muted">Manage your account settings and travel preferences</p>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={submit} className="space-y-4">
                <TextField name="name" defaultValue={user.name} isRequired>
                  <Label>Full Name</Label>
                  <Input />
                  <FieldError />
                </TextField>
                <TextField name="image" type="url" defaultValue={user.image || ""}>
                  <Label>Photo URL</Label>
                  <Input placeholder="https://…" />
                  <FieldError />
                </TextField>
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField name="phone" defaultValue={user.phone || ""}>
                    <Label>Phone</Label>
                    <Input placeholder="+880 …" />
                  </TextField>
                  <TextField name="location" defaultValue={user.location || ""}>
                    <Label>Location</Label>
                    <Input placeholder="Dhaka, Bangladesh" />
                  </TextField>
                </div>
                <TextField name="bio" defaultValue={user.bio || ""}>
                  <Label>About you</Label>
                  <TextArea rows={3} placeholder="Favourite kind of trip, dream destination…" />
                </TextField>
                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="tertiary" onPress={state.close}>
                    Cancel
                  </Button>
                  <Button type="submit" isDisabled={saving}>
                    {saving ? "Saving…" : "Save Changes"}
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
