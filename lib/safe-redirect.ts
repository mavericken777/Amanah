/** Accept only a local absolute path. Browser and URL backslash normalization must not escape the origin. */
export function safeNext(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || /[\\\u0000-\u0020\u007f]/.test(value)) return "/dashboard";
  const base = "https://amanah.invalid";
  try {
    const target = new URL(value, base);
    return target.origin === base ? target.pathname + target.search + target.hash : "/dashboard";
  } catch { return "/dashboard"; }
}
