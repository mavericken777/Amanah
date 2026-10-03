import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const files=['ACTION_ITEMS.md','ITINERARY.md','MEETINGS.md','LOGISTICS.md','ACCOMMODATION.md'];

test('root China mission handoffs are evidence-bound and no longer blank TBD templates',()=>{
  for(const file of files){
    const text=fs.readFileSync(file,'utf8');
    assert.match(text,/SOURCE-LOCKED|OPEN GATE|EVIDENCE-BOUND/);
    assert.doesNotMatch(text,/\|\s*TBD\s*\|/);
    assert.doesNotMatch(text,/\nTBD\n/);
  }
  assert.match(fs.readFileSync('ITINERARY.md','utf8'),/PROPOSED: 11–18 Oct 2026/);
  assert.match(fs.readFileSync('MEETINGS.md','utf8'),/CHINA_MISSION_MEETING_BRIEF_BOOK_2026-10-03\.md/);
});
