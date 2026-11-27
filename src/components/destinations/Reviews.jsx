"use client";

import { useEffect, useState } from "react";
import { Avatar, toast } from "@heroui/react";
import { FaStar } from "react-icons/fa6";
import Stars from "@/components/ui/Stars";
import { useSession } from "@/lib/auth-client";
import { api } from "@/lib/api";
import { date } from "@/lib/format";

export default function Reviews({ destinationId, rating, reviewsCount }) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState(null);
  const [form, setForm] = useState({ rating: 5, comment: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api(`/destinations/${destinationId}/reviews`)
      .then(setReviews)
      .catch(() => setReviews([]));
  }, [destinationId]);

  const alreadyReviewed = reviews?.some((r) => r.userId === session?.user?.id);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const review = await api(`/destinations/${destinationId}/reviews`, { method: "POST", body: form });
      setReviews((r) => [review, ...(r || [])]);
      setForm({ rating: 5, comment: "" });
      toast.success("Thanks for your review!");
    } catch (err) {
      toast.danger(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <h2 className="text-3xl font-bold">Traveler Reviews</h2>
        {reviewsCount > 0 && (
          <p className="flex items-center gap-2 text-sm">
            <FaStar className="text-warn" />
            <span className="text-lg font-bold">{rating}</span>
            <span className="text-muted">({reviewsCount} review{reviewsCount === 1 ? "" : "s"})</span>
          </p>
        )}
      </div>

      {session && !alreadyReviewed && (
        <form onSubmit={submit} className="mb-8 rounded-2xl bg-brand-light p-5">
          <p className="mb-2 text-sm font-semibold">Share your experience</p>
          <div className="mb-3 flex gap-1" role="radiogroup" aria-label="Rating">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={form.rating === n}
                aria-label={`${n} star${n > 1 ? "s" : ""}`}
                onClick={() => setForm((f) => ({ ...f, rating: n }))}
                className={`text-2xl transition ${n <= form.rating ? "text-warn" : "text-black/15"}`}
              >
                <FaStar />
              </button>
            ))}
          </div>
          <textarea
            value={form.comment}
            onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
            required
            minLength={5}
            rows={3}
            placeholder="How was the trip? (only travelers who booked can review)"
            className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brand"
          />
          <button type="submit" disabled={saving} className="btn-brand mt-3 !py-2.5 disabled:opacity-60">
            {saving ? "Posting…" : "Post Review"}
          </button>
        </form>
      )}

      {reviews === null ? (
        <div className="h-24 animate-pulse rounded-2xl bg-black/5" />
      ) : reviews.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line p-8 text-center text-muted">
          No reviews yet. Travelers who book this trip can share their experience here.
        </p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((r) => (
            <li key={r._id || r.createdAt} className="rounded-2xl border border-line p-5">
              <div className="flex items-center gap-3">
                <Avatar size="sm">
                  {r.userImage && <Avatar.Image src={r.userImage} alt={r.userName} />}
                  <Avatar.Fallback className="bg-brand text-white">{r.userName?.[0]}</Avatar.Fallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold">{r.userName}</p>
                  <p className="text-xs text-muted">{date(r.createdAt, { month: "short", year: "numeric" })}</p>
                </div>
                <Stars value={r.rating} />
              </div>
              <p className="mt-3 text-muted">{r.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
