/*
/// Module: tuskpets
module tuskpets::tuskpets;
*/

module tuskpets::main;

use std::string::String;
use sui::address;
use sui::display;
use sui::package;
use sui::object_bag::{Self, ObjectBag};

const BASE36: vector<u8> = b"0123456789abcdefghijklmnopqrstuvwxyz";

// Update to this walrus site once deployed
const VISUALIZATION_SITE: address =
    @0xab25a686b8dcff5614d681c6d7619ecabaa350b4cf39d583cf2b675593c090b7;

public struct MAIN has drop {}

public struct Walrus has key, store {
    id: UID,
    b36_address: String,
    stats: WalrusStats,
    skills: WalrusSkills,
    inventory: ObjectBag
}

public struct WalrusStats has store {
    level: u8,
    health: u16,
    tuskfu: u8,
    // hunting
    swimming: u8,
    // Goes down a static amount, even more when training tuskfu
    // energy: u8,
    // Every level up, plus, minus, or same based on energy level 
    // weight: u16,
}

public struct WalrusSkills has store {
    diving: u8,
}

fun init(otw: MAIN, ctx: &mut TxContext) {
    let publisher = package::claim(otw, ctx);
    let mut display = display::new<Walrus>(&publisher, ctx);

    display.add(
        b"link".to_string(),
        b"https://{{b36_address}}.walrus.site".to_string(),
    );
    display.add(
        b"walrus site address".to_string(),
        VISUALIZATION_SITE.to_string(),
    );
    display.update_version();

    transfer::public_transfer(publisher, ctx.sender());
    transfer::public_transfer(display, ctx.sender());
}




// Walrus-site =============================================================================

public fun to_b36(addr: address): String {
    let source = address::to_bytes(addr);
    let size = 2 * vector::length(&source);
    let b36copy = BASE36;
    let base = vector::length(&b36copy);
    let mut encoding = vector::tabulate!(size, |_| 0);
    let mut high = size - 1;

    source.length().do!(|j| {
        let mut carry = source[j] as u64;
        let mut it = size - 1;
        while (it > high || carry != 0) {
            carry = carry + 256 * (encoding[it] as u64);
            let value = (carry % base) as u8;
            *&mut encoding[it] = value;
            carry = carry / base;
            it = it - 1;
        };
        high = it;
    });

    let mut str: vector<u8> = vector[];
    let mut k = 0;
    let mut leading_zeros = true;
    while (k < vector::length(&encoding)) {
        let byte = encoding[k] as u64;
        if (byte != 0 && leading_zeros) {
            leading_zeros = false;
        };
        let char = b36copy[byte];
        if (!leading_zeros) {
            str.push_back(char);
        };
        k = k + 1;
    };
    str.to_string()
}
