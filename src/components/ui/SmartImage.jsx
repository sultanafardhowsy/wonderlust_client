import Image from "next/image";

/**
 * next/image for local assets; remote URLs (entered by admins, any host)
 * skip the optimizer so we don't need to whitelist every domain.
 */
export default function SmartImage({ src, alt = "", ...props }) {
  const safe = src || "/assets/destinations/image2.png";
  const remote = /^https?:\/\//i.test(safe);
  return <Image src={safe} alt={alt} unoptimized={remote} {...props} />;
}
