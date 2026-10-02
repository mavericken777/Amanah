# Platinum Hardware Reference Architecture

**Version:** 1.0.0 | **Control date:** 2026-10-02 | **Status:** RFQ READY REFERENCE

## Layers

1. **Identity/capture:** RealWear Navigator 520 / Vuzix M400; Zebra rugged handhelds.
2. **Serialization/RFID:** Zebra FX9600 fixed RFID readers; Zebra ZT610 RFID printer.
3. **Environmental sensing:** Sensirion SHT85; Vaisala HMP110 where industrial probe class is required.
4. **Visual evidence:** Axis M2036-LE or validated equivalent camera class.
5. **Vehicle telemetry:** Teltonika FMC650.
6. **Industrial edge:** Moxa UC-8220 series.
7. **Industrial networking:** Cisco Catalyst IE3400 Heavy Duty.
8. **Platform edge:** signed event envelope → secure gateway/API → AHTE event fabric → evidence/trust graph → Command Center.

## Security/control profile

- unique DeviceID and certificate/credential;
- secure boot/firmware policy where supported;
- mTLS/API credentials per connector;
- network segmentation;
- local buffering/offline reconciliation;
- signed/timestamped events where supported;
- no device creates certification.

## Procurement rule

Exact regional part numbers, certifications, accessory kits, power/environment ratings, warranty, support, carrier compatibility and pricing are confirmed at RFQ. Public prices in the master BOM are planning references, not purchase commitments.
