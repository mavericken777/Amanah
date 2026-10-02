# Platinum Vehicle Technology Stack

**Version:** 1.0.0 | **Control date:** 2026-10-02 | **Status:** RFQ READY REFERENCE

## Baseline vehicle stack
- Teltonika FMC650 vehicle telematics gateway — GNSS/vehicle/IO event source.
- calibrated temperature/humidity probe appropriate to cargo class (Vaisala-class industrial probe or validated equivalent).
- rugged Zebra TC78-class driver/inspection handheld.
- container/seal identity scanner; QR/RFID as deployed.
- tamper/door input where vehicle/container supports it.
- encrypted mobile connectivity and buffered offline event queue.
- DeviceID/certificate, firmware inventory, health/heartbeat and time synchronization.

## Event contract
`VehicleID + DriverID + ShipmentID + ContainerID + SealID + EventID + Timestamp + Position/Geofence + Condition + EvidenceID + IntegrityProof`.

## Operating rules
Loss of connectivity buffers events; it does not invent continuity. Seal mismatch, unauthorized opening, route deviation, condition excursion or identity contradiction can trigger D4 HOLD. Human/authority release rules remain unchanged.

Exact regional SKUs, antennas, harnesses, SIM/eSIM, carrier plan, probe calibration, installation kit and vehicle CAN/IO compatibility require RFQ/site validation.
