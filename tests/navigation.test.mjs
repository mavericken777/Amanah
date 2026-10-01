import test from 'node:test';
import assert from 'node:assert/strict';
import { currentNavigation } from '../lib/navigation.ts';

const groups = [['Core', [['/projects', 'Projects'], ['/ahte', 'Control plane'], ['/ahte/shipments', 'Trade & custody']]], ['Configured modules', [['/china-trip', 'China trip']]]];

test('nested pages retain the closest configured navigation context', () => {
  for (const [route, expected] of [['/projects/example-id', '/projects'], ['/china-trip/itinerary', '/china-trip'], ['/ahte/process', '/ahte'], ['/ahte/shipments/example-id', '/ahte/shipments']]) {
    assert.equal(currentNavigation(route, groups)?.[0], expected);
  }
});
test('navigation matching respects segment boundaries and empty configuration', () => {
  assert.equal(currentNavigation('/projects-archive', groups), undefined);
  assert.equal(currentNavigation('/dashboard', []), undefined);
});
test('another deployment can inject a different module set', () => {
  const alternative = [['Modules', [['/inspections', 'Inspections']]]];
  assert.equal(currentNavigation('/inspections/session', alternative)?.[1], 'Inspections');
  assert.equal(currentNavigation('/china-trip', alternative), undefined);
});
