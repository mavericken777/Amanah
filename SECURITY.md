# Security & Sensitive Information

This repository is for project coordination, not secret storage.

## Never commit

- Passwords
- API keys
- Access tokens
- Recovery codes
- Passport scans
- Identity-card scans
- Bank-card details
- Private authentication links
- Sensitive personal information
- Confidential documents that are not approved for repository storage

## Safe approach

Store sensitive material in the team's approved secure storage and record only a non-sensitive reference here.

Example:
Booking confirmation stored in the approved team document vault. Reference: HOTEL-SH-001.

## Accidental secret exposure

If a secret is committed:

1. Treat it as compromised.
2. Revoke or rotate it immediately.
3. Remove it from the current files.
4. Review repository history and clean the history where necessary.
5. Notify the appropriate owner.

Deleting the latest copy does not make a historical secret safe.
