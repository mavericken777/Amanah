/** Never turn an unavailable database response into a successful empty state. */
export function requireQueryResult<T extends { error: unknown }>(result: T): T {
  if (result.error) throw new Error("Workspace data is unavailable. Please retry.");
  return result;
}

export function requireQueryResults<T extends { error: unknown }[]>(results: [...T]): T {
  results.forEach(requireQueryResult);
  return results;
}
