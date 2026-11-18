import { brand } from "./config";
export function canonical(path: string) {
  return brand.domain
    ? { alternates: { canonical: new URL(path, brand.domain).toString() } }
    : {};
}
