import { Chip } from "@heroui/react";

const MAP = {
  confirmed: { color: "success", label: "Confirmed" },
  pending: { color: "warning", label: "Pending" },
  cancelled: { color: "danger", label: "Cancelled" },
};

export default function StatusChip({ status }) {
  const s = MAP[status] || MAP.pending;
  return (
    <Chip color={s.color} variant="soft" size="sm">
      <Chip.Label>{s.label}</Chip.Label>
    </Chip>
  );
}
