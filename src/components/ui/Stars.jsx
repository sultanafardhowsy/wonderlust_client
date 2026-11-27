import { FaStar, FaRegStar } from "react-icons/fa6";

export default function Stars({ value = 0, size = 14 }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-warn" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) =>
        i <= Math.round(value) ? <FaStar key={i} size={size} /> : <FaRegStar key={i} size={size} />
      )}
    </span>
  );
}
