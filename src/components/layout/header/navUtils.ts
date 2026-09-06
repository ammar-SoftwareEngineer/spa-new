/**
 * Layout menu helpers — resolve API links and map to NavItem[].
 */
import type { LayoutFooterLink, LayoutMenuItem } from "@/types/layoutTypes";
import type { NavItem } from "@/types";
import menuRoutes from "@/lib/data/menu-routes.json";

const routes = menuRoutes as Record<string, string>;

/**
 * Clean one API link into an internal path.
 * Empty link → fallback from menu-routes.json by id.
 */
export function resolveLink(item: {
  id?: number;
  link?: string | null;
  href?: string | null;
  url?: string | null;
}): string {
  const raw = (item.link || item.href || item.url || "").trim();

  if (!raw) {
    return item.id != null ? routes[String(item.id)] ?? "#" : "#";
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

/** Convert API menu items into NavItem[] for Header / Footer. */
export function mapLayoutMenu(menu: LayoutMenuItem[] | null | undefined): NavItem[] {
  if (!menu?.length) return [];

  return menu.map((item) => {
    const href = resolveLink(item);
    const children = item.children?.length
      ? mapLayoutMenu(item.children)
      : undefined;

    return {
      key: hrefToKey(href, item.id),
      href,
      label: item.title,
      children: children?.length ? children : undefined,
    };
  });
}

/** Map footer quick links from layout footer.links. */
export function mapFooterLinks(
  links: LayoutFooterLink[] | null | undefined,
): NavItem[] {
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
