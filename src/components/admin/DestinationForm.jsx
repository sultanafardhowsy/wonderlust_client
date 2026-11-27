"use client";

import { useState } from "react";
import { Button, FieldError, Input, Label, ListBox, Select, Spinner, Switch, TextArea, TextField } from "@heroui/react";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import SmartImage from "@/components/ui/SmartImage";
import { CATEGORIES } from "@/lib/format";

/**
 * Shared create/edit form for travel packages.
 * onSubmit(values) must return a promise; throw to keep the form open.
 */
export default function DestinationForm({ initial = {}, submitLabel = "Save", onSubmit, onCancel }) {
  const [itinerary, setItinerary] = useState(
    initial.itinerary?.length ? initial.itinerary : [{ title: "", description: "" }]
  );
  const [imageUrl, setImageUrl] = useState(initial.imageUrl || "");
  const [featured, setFeatured] = useState(Boolean(initial.featured));
  const [saving, setSaving] = useState(false);

  const setDay = (i, key, value) => setItinerary((list) => list.map((d, idx) => (idx === i ? { ...d, [key]: value } : d)));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = Object.fromEntries(new FormData(e.currentTarget).entries());
    const values = {
      destinationName: form.destinationName,
      country: form.country,
      category: form.category,
      price: Number(form.price),
      duration: form.duration,
      departureDate: form.departureDate,
      imageUrl: form.imageUrl,
      description: form.description,
      highlights: form.highlights,
      itinerary: itinerary.filter((d) => d.title.trim()),
      featured,
    };
    setSaving(true);
    try {
      await onSubmit(values);
    } finally {
      setSaving(false);
    }
  };

  const validImage = /^https?:\/\/.+/i.test(imageUrl) || imageUrl.startsWith("/");

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <TextField name="destinationName" defaultValue={initial.destinationName} isRequired className="md:col-span-2">
          <Label>Destination Name</Label>
          <Input placeholder="Bali Paradise" />
          <FieldError />
        </TextField>

        <TextField name="country" defaultValue={initial.country} isRequired>
          <Label>Country</Label>
          <Input placeholder="Indonesia" />
          <FieldError />
        </TextField>

        <Select name="category" defaultValue={initial.category} isRequired placeholder="Select category">
          <Label>Category</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {CATEGORIES.map((c) => (
                <ListBox.Item key={c} id={c} textValue={c}>
                  {c}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
          <FieldError />
        </Select>

        <TextField name="price" type="number" defaultValue={initial.price?.toString()} isRequired>
          <Label>Price per person (USD)</Label>
          <Input type="number" min={1} placeholder="e.g. 1299" />
          <FieldError />
        </TextField>

        <TextField name="duration" defaultValue={initial.duration} isRequired>
          <Label>Duration</Label>
          <Input placeholder="e.g. 7 Days / 6 Nights" />
          <FieldError />
        </TextField>

        <TextField name="departureDate" type="date" defaultValue={initial.departureDate} isRequired>
          <Label>Default Departure Date</Label>
          <Input type="date" />
          <FieldError />
        </TextField>

        <div className="flex items-end pb-2">
          <Switch isSelected={featured} onChange={setFeatured}>
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            <Label>Show in Featured Destinations</Label>
          </Switch>
        </div>

        <div className="grid gap-4 md:col-span-2 md:grid-cols-[1fr_160px]">
          <TextField name="imageUrl" value={imageUrl} onChange={setImageUrl} isRequired>
            <Label>Image URL</Label>
            <Input type="text" placeholder="https://example.com/image.jpg" />
            <FieldError />
          </TextField>
          <div className="relative hidden h-[72px] overflow-hidden rounded-lg border border-line bg-black/5 md:block">
            {validImage && <SmartImage src={imageUrl} alt="Preview" fill sizes="160px" className="object-cover" />}
          </div>
        </div>

        <TextField name="description" defaultValue={initial.description} isRequired className="md:col-span-2">
          <Label>Description</Label>
          <TextArea rows={4} placeholder="Describe the travel experience..." />
          <FieldError />
        </TextField>

        <TextField name="highlights" defaultValue={(initial.highlights || []).join("\n")} className="md:col-span-2">
          <Label>Highlights (one per line)</Label>
          <TextArea rows={4} placeholder={"Luxury beachfront accommodation\nSunrise trek to Mount Batur"} />
        </TextField>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-medium">Itinerary</p>
          <Button
            size="sm"
            variant="secondary"
            onPress={() => setItinerary((l) => [...l, { title: "", description: "" }])}
          >
            <LuPlus /> Add day
          </Button>
        </div>
        <ol className="space-y-3">
          {itinerary.map((d, i) => (
            <li key={i} className="flex gap-3 rounded-xl border border-line p-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-light font-display font-bold text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 space-y-2">
                <input
                  value={d.title}
                  onChange={(e) => setDay(i, "title", e.target.value)}
                  placeholder="Day title, e.g. Arrival & Beach Welcome"
                  aria-label={`Day ${i + 1} title`}
                  className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand"
                />
                <textarea
                  value={d.description}
                  onChange={(e) => setDay(i, "description", e.target.value)}
                  placeholder="What happens on this day?"
                  aria-label={`Day ${i + 1} description`}
                  rows={2}
                  className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand"
                />
              </div>
              <button
                type="button"
                onClick={() => setItinerary((l) => l.filter((_, idx) => idx !== i))}
                className="self-start rounded-lg p-2 text-muted hover:bg-red-50 hover:text-bad"
                aria-label={`Remove day ${i + 1}`}
              >
                <LuTrash2 />
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex justify-end gap-3 border-t border-line pt-5">
        {onCancel && (
          <Button variant="tertiary" onPress={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" isDisabled={saving} className="min-w-40">
          {saving ? <Spinner size="sm" color="current" /> : submitLabel}
        </Button>
      </div>
    </form>
  );
}
