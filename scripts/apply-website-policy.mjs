import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = path.join(root, 'ghscl-website', 'ecosystem.en.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const replacements = new Map([
  [
    'Enterprise and facility profiles, products and SKUs, formulas and BOMs, suppliers, origin records, training and remediation.',
    'Enterprise and facility profiles, products and SKUs, formulas and BOMs, suppliers, origin records, training and remediation from onboarding through continuous assurance.'
  ],
  [
    'Applicability across products, processes and destinations; requirement-to-control mapping, HCP and SCCP obligations, and source-bound standards references.',
    'Complete applicable Malaysian/JAKIM standards and instruments are mapped by applicability to requirements, controls, HCP/SCCP obligations and source-bound evidence; MS2400 is one applicable standards family, not the complete framework.'
  ],
  [
    'PHC + JAKIM authorised human review',
    'PHC + JAKIM Mufti / scholars / authorised Halal officers human review'
  ],
  [
    'Formal certification review is an authorised decision-maker workflow.',
    'JAKIM, JAIN/JAIM, muftis, scholars and authorised halal auditors decide certification award or revocation. The platform connects evidence and monitors certification status across the complete product journey; AI/ML supports review, prediction and preemptive action.'
  ],
  [
    'The Amanah application is deployed and available through its sign-in page. Full operating scope brings together the modules described here.',
    'Amanah brings product identity, evidence, custody and accountable operating workflows into one connected workspace.'
  ],
  [
    'Start with the deployed workspace. Connect your operating environment.',
    'Start with Amanah. Connect your operating environment.'
  ],
  [
    'The system aims to prevent integrity failures rather than only report them after the fact.',
    'The Command Center combines continuous evidence monitoring with AI/ML predictive analytics and preemptive strategies so accountable teams can identify emerging risk, place configured holds, act, and re-verify before operational release.'
  ]
]);

function transform(value) {
  if (typeof value === 'string') {
    let out = value;
    for (const [from, to] of replacements) out = out.replaceAll(from, to);
    return out;
  }
  if (Array.isArray(value)) return value.map(transform);
  if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) value[key] = transform(child);
  }
  return value;
}

transform(data);
fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
