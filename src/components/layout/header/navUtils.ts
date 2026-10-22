import type { LayoutMenuItem, LayoutData } from "@/types/layoutTypes";
import { formatLayoutPhone } from "@/types/layoutTypes";
import type { NavItem } from "@/types";
import type { FooterData } from "@/components/layout/footer/Footer";
import menuRoutes from "@/lib/data/menu-routes.json";

const routes = menuRoutes as Record<string, string>;

// Empty link falls back to menu-routes.json by id.
export function resolveLink(item: {
  id?: number;
  link?: string | null;
  href?: string | null;
  url?: string | null;
}): string {
  const raw = (item.link || item.href || item.url || "").trim();

  if (!raw) {
    return item.id != null ? (routes[String(item.id)] ?? "#") : "#";
  }

  try {
    let path = raw.startsWith("http") ? new URL(raw).pathname : raw;
    path = path.replace(/^\/(en|ar|tr)(?=\/|$)/i, "");
    path = path.replace(/\/+$/, "");

    if (!path) return "/";
    return path.startsWith("/") ? path : `/${path}`;
  } catch {
    return raw.startsWith("/") ? raw : `/${raw}`;
  }
}

function hrefToKey(href: string, id?: number): string {
  if (href === "/" || href === "") return "home";
  const cleaned = href.replace(/^\//, "").replace(/\//g, "-");
  return cleaned || (id != null ? String(id) : "item");
}

// Products dropdown: only the product names returned by the API.
export function withProductLinks(
  items: NavItem[],
  products: { slug: string; label: string }[],
): NavItem[] {
  const links = products.filter((product) => product.slug && product.label);
  if (!links.length) return items;

  const children: NavItem[] = links.map((product) => ({
    key: product.slug,
    href: `/products/${product.slug}`,
    label: product.label,
  }));

  return items.map((item) =>
    item.href === "/products" || item.key === "products" ? { ...item, children } : item,
  );
}

export function mapLayoutMenu(menu: LayoutMenuItem[] | null | undefined): NavItem[] {
  if (!menu?.length) return [];

  return menu.map((item) => {
    const href = resolveLink(item);
    const children = item.children?.length ? mapLayoutMenu(item.children) : undefined;

    return {
      key: hrefToKey(href, item.id),
      href,
      label: item.title,
      children: children?.length ? children : undefined,
    };
  });
}

// Footer navigation uses the same links shown in the header.
export function mapLayoutFooter(layout: LayoutData | null, menuNav: NavItem[]): FooterData {
  return {
    branding: {
      name: layout?.branding?.site_name || "S&PA",
      logo: layout?.branding?.logo || "/img/logo.png",
    },
    about: layout?.footer?.body?.trim() || "",
    contact: {
      phone: formatLayoutPhone(layout?.contact) || "",
      email: layout?.contact?.email || "",
      address: layout?.contact?.address || undefined,
    },
    social: (layout?.social_links ?? []).map((link) => ({
      name: link.platform,
      href: link.url,
    })),
    footerLinks: menuNav,
    copyright: layout?.footer?.copyright?.trim() || null,
  };
}
