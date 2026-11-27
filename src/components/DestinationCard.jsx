import Link from "next/link";
import { LuMapPin, LuCalendarDays, LuArrowUpRight } from "react-icons/lu";
import { FaStar } from "react-icons/fa6";
import SmartImage from "@/components/ui/SmartImage";
import { money } from "@/lib/format";

export default function DestinationCard({ destination, priority = false, href }) {
  const { _id, imageUrl, price, destinationName, duration, country, category, rating, reviewsCount } = destination;

  return (
    <Link
      href={href || `/destinations/${_id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <SmartImage
          src={imageUrl}
          alt={destinationName}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent" />
        {category && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur">
            {category}
          </span>
        )}
        {reviewsCount > 0 && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
            <FaStar className="text-warn" /> {rating}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-sm text-muted">
          <LuMapPin className="text-brand" /> {country}
        </p>
        <h3 className="mt-1.5 line-clamp-2 text-xl font-bold leading-snug">{destinationName}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
          <LuCalendarDays /> {duration}
        </p>

        <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
          <div>
            <p className="text-xs text-muted">Starting from</p>
            <p className="text-2xl font-bold text-ink">
              {money(price)}
              <span className="text-sm font-normal text-muted"> /person</span>
            </p>
          </div>
          <span className="grid size-10 place-items-center rounded-full bg-brand-light text-brand transition group-hover:bg-brand group-hover:text-white">
            <LuArrowUpRight size={18} />
          </span>
        </div>
      </div>
    </Link>
  );
}
