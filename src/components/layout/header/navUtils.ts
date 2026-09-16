import type { LayoutFooterLink, LayoutMenuItem, LayoutData } from "@/types/layoutTypes";
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

export function mapFooterLinks(links: LayoutFooterLink[] | null | undefined): NavItem[] {
  if (!links?.length) return [];

  return links
    .filter((link) => link.title)
    .map((link) => {
      const href = resolveLink(link);
      return {
        key: hrefToKey(href, link.id),
        href,
        label: link.title!,
      };
    });
}

// Build footer props from layout API (+ fallback nav links).
export function mapLayoutFooter(layout: LayoutData | null, fallbackNav: NavItem[]): FooterData {
  const footerLinks = mapFooterLinks(layout?.footer?.links);
  const links =
    footerLinks.length > 0 ? footerLinks : fallbackNav.filter((item) => item.href !== "/");

  return {
    branding: {
      name: layout?.branding?.site_name || "S&PA",
      logo: layout?.branding?.logo || "/img/logo.png",
    },
    contact: {
      phone: formatLayoutPhone(layout?.contact) || "",
      email: layout?.contact?.email || "",
      address: layout?.contact?.address || undefined,
    },
    social: (layout?.social_links ?? []).map((link) => ({
      name: link.platform,
      href: link.url,
    })),
    footerLinks: links,
    copyright: layout?.footer?.copyright ?? null,
  };
}
