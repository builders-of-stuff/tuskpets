# Tuskpets

Idle RPG POC on Sui & Walrus (testnet)

Mint a tuskpet (testnet), level skills, aquire items.

Each tuskpet also comes with its own shareable walrus-site.

https://tuskpets.buildersofstuff.com

Example tuskpet:

https://242u79u2hsuwjppi75fb5llcosru2pr89adg9d0fbrkatixi7i.walrus.site

## Steps to deploy from scratch

1. Build
2. Deploy as walrus-site
3. Update `tuskpet.move` `VISUALIZATION_SITE`
4. Deploy contract
5. Update `shared.constant` package IDs, build, copy/paste back to `walrus-sites`
6. Update walrus site

`./target/release/site-builder update --epochs 100 examples/tuskpets 0x554c708a0e592b5d57b83c7cef9bc2a56376f76ce96f36a7a2fa9889cffe3896`

## TODO

- Battle systems
- "Maps"
- Fixing timer for crafting (both frontend & on-chain)
- More stuff
