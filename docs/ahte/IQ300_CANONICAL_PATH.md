# IQ300 Canonical Path

`Authority → Standard / Instrument → Clause / Requirement → Applicability → Control → HCP / SCCP → Evidence → Audit Test → Finding → Corrective Action → Re-verification → Authority Gate → Trust State → Operational Release`

| Machine object | Canonical node | Rule |
|---|---|---|
| assessment_object | Evidence / Audit Test | AI advisory; never E5 |
| hitm_case_object | Authority Gate pre-gate | Human-review case |
| authority_decision_object | Authority Gate | Competent human/authority decision |
| trust_vector_object | Trust State | Descriptive vector; score secondary |
| release_decision_object | Operational Release | Not certification |
| fracture_event_object | Trust State | Can trigger hold |
| custody / port custody | Evidence / Trust State | Physical-digital continuity |

## Hard rules
- Certificate != Trust.
- NOT DETECTED != HALAL.
- AI output never creates E5 authority status.
- A trust score is descriptive and secondary to hard gates.
- Operational release is not certification.
- Source-locked normative text must not be invented.
