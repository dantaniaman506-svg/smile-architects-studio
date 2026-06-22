import logo from "@/assets/logo.png.asset.json";

export function Logo({ size = 44 }: { size?: number }) {
  return (
    <img
      src={logo.url}
      alt="The Tooth Wellness Dental Clinic logo"
      width={size}
      height={size}
      className="rounded-full shadow-card object-cover"
      style={{ width: size, height: size }}
    />
  );
}
