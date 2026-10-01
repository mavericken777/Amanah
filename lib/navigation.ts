export type NavigationLink = readonly [href: string, title: string];
export type NavigationGroups = ReadonlyArray<readonly [label: string, links: ReadonlyArray<NavigationLink>]>;

/** Preserve the nearest configured parent on nested routes, at segment boundaries. */
export function currentNavigation(pathname: string, groups: NavigationGroups): NavigationLink | undefined {
  return groups.flatMap(([, links]) => links)
    .filter(([href]) => pathname === href || (href !== "/" && pathname.startsWith(href + "/")))
    .sort(([a], [b]) => b.length - a.length)[0];
}
