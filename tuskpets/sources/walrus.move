module tuskpets::walrus;

use std::string::{Self, String};
use sui::address;
use sui::display;
use sui::package;
use sui::object_bag::{Self, ObjectBag};
use sui::bag::{Self, Bag};
use sui::clock::{Self, Clock};

const BASE36: vector<u8> = b"0123456789abcdefghijklmnopqrstuvwxyz";

// Update to this walrus site once deployed
const VISUALIZATION_SITE: address =
    @0xab25a686b8dcff5614d681c6d7619ecabaa350b4cf39d583cf2b675593c090b7;

const EBusyWalrus: u64 = 0;
const EIdleWalrus: u64 = 1;
const EActivityFinishTooSoon: u64 = 2;

// === Items === 
const SOFT_SHELL_CLAM: vector<u8> = b"soft_shell_clam";
const ARCTIC_SURFCLAM: vector<u8> = b"arctic_surfclam";
const GREENLAND_COCKLE: vector<u8> = b"greenland_cockle";
const COMPACT_SNOW: vector<u8> = b"compact_snow";
const ICE: vector<u8> = b"ice";
const BLUE_ICE: vector<u8> = b"blue_ice";
const SNOW_MITTENS: vector<u8> = b"snow_mittens";
const ICE_HELMET: vector<u8> = b"ice_helmet";
const TUSK_BLADES: vector<u8> = b"tusk_blades";

// === Activities ===
const DIVING_SOFT_SHELL_CLAM: u64 = 101;
const DIVING_SOFT_SHELL_CLAM_TIME: u64 = 10;
const DIVING_SOFT_SHELL_CLAM_XP: u64 = 4;

const DIVING_ARCTIC_SURFCLAM: u64 = 102;
const DIVING_ARCTIC_SURFCLAM_TIME: u64 = 20;
const DIVING_ARCTIC_SURFCLAM_XP: u64 = 12;

const DIVING_GREENLAND_COCKLE: u64 = 103;
const DIVING_GREENLAND_COCKLE_TIME: u64 = 30;
const DIVING_GREENLAND_COCKLE_XP: u64 = 32;

const MINING_COMPACT_SNOW: u64 = 201;
const MINING_COMPACT_SNOW_TIME: u64 = 10;
const MINING_COMPACT_SNOW_XP: u64 = 4;

const MINING_ICE: u64 = 202;
const MINING_ICE_TIME: u64 = 20;
const MINING_ICE_XP: u64 = 12;

const MINING_BLUE_ICE: u64 = 203;
const MINING_BLUE_ICE_TIME: u64 = 30;
const MINING_BLUE_ICE_XP: u64 = 32;

const CRAFTING_SNOW_MITTENS: u64 = 301;
const CRAFTING_SNOW_MITTENS_TIME: u64 = 10;
const CRAFTING_SNOW_MITTENS_XP: u64 = 10;

const CRAFTING_ICE_HELMET: u64 = 302;
const CRAFTING_ICE_HELMET_TIME: u64 = 20;
const CRAFTING_ICE_HELMET_XP: u64 = 100;

const CRAFTING_TUSK_BLADES: u64 = 303;
const CRAFTING_TUSK_BLADES_TIME: u64 = 30;
const CRAFTING_TUSK_BLADES_XP: u64 = 1000;

// === XP Thresholds ===
const LEVEL_2_XP: u64 = 139;
const LEVEL_3_XP: u64 = 292;
const LEVEL_4_XP: u64 = 460;
const LEVEL_5_XP: u64 = 645;
const LEVEL_6_XP: u64 = 848;
const LEVEL_7_XP: u64 = 1071;
const LEVEL_8_XP: u64 = 1315;
const LEVEL_9_XP: u64 = 1583;
const LEVEL_10_XP: u64 = 1877;
const LEVEL_11_XP: u64 = 2200;
const LEVEL_12_XP: u64 = 2554;
const LEVEL_13_XP: u64 = 2943;
const LEVEL_14_XP: u64 = 3370;
const LEVEL_15_XP: u64 = 3839;
const LEVEL_16_XP: u64 = 4354;
const LEVEL_17_XP: u64 = 4919;
const LEVEL_18_XP: u64 = 5539;
const LEVEL_19_XP: u64 = 6220;
const LEVEL_20_XP: u64 = 6968;
const LEVEL_21_XP: u64 = 7789;
const LEVEL_22_XP: u64 = 8691;
const LEVEL_23_XP: u64 = 9681;
const LEVEL_24_XP: u64 = 10769;
const LEVEL_25_XP: u64 = 11963;
const LEVEL_26_XP: u64 = 13275;
const LEVEL_27_XP: u64 = 14716;
const LEVEL_28_XP: u64 = 16298;
const LEVEL_29_XP: u64 = 18036;
const LEVEL_30_XP: u64 = 19945;
const LEVEL_31_XP: u64 = 22042;
const LEVEL_32_XP: u64 = 24346;
const LEVEL_33_XP: u64 = 26877;
const LEVEL_34_XP: u64 = 29657;
const LEVEL_35_XP: u64 = 32711;
const LEVEL_36_XP: u64 = 36067;
const LEVEL_37_XP: u64 = 39754;
const LEVEL_38_XP: u64 = 43805;
const LEVEL_39_XP: u64 = 48257;
const LEVEL_40_XP: u64 = 53149;
const LEVEL_41_XP: u64 = 58525;
const LEVEL_42_XP: u64 = 64433;
const LEVEL_43_XP: u64 = 70925;
const LEVEL_44_XP: u64 = 78060;
const LEVEL_45_XP: u64 = 85902;
const LEVEL_46_XP: u64 = 94521;
const LEVEL_47_XP: u64 = 103995;
const LEVEL_48_XP: u64 = 114409;
const LEVEL_49_XP: u64 = 125856;
const LEVEL_50_XP: u64 = 138440;

// === Structs ===
public struct WALRUS has drop {}

public struct Walrus has key, store {
    id: UID,
    b36_address: String,
    name: Option<String>,
    stats: WalrusStats,
    skills: WalrusSkills,
    current_activity: Option<u64>,
    activity_start: Option<u64>,
    inventory: ObjectBag,
    foes: Bag,
}

public struct WalrusStats has store {
    health: u64,
    energy: u64,
}

// Todo: 
// - crafting
// - energy?
// - Timer/limits logic

// 1.5
// - Display of items and walrus
// - New item vs update existing item quantity logic

public struct WalrusSkills has store {
    strength_xp: u64,
    dexterity_xp: u64,
    defence_xp: u64,
    hunting_xp: u64,
    diving_xp: u64,
    mining_xp: u64,
    crafting_xp: u64,
}

public struct Item has key, store {
    id: UID,
    `type`: String,
    quantity: u64,
}

fun init(otw: WALRUS, ctx: &mut TxContext) {
    let publisher = package::claim(otw, ctx);
    let mut display = display::new<Walrus>(&publisher, ctx);

    display.add(
        b"link".to_string(),
        b"https://{b36_address}.walrus.site".to_string(),
    );
    display.add(
        b"walrus site address".to_string(),
        VISUALIZATION_SITE.to_string(),
    );
    display.update_version();

    transfer::public_transfer(publisher, ctx.sender());
    transfer::public_transfer(display, ctx.sender());
}

// === Public-Mutative Functions ===
public fun mint(ctx: &mut TxContext): Walrus {
    let walrus = new(ctx);

    walrus
}

entry fun start_activity(code: u64, walrus: &mut Walrus, clock: &Clock, ctx: &mut TxContext) {
    assert!(option::is_none<u64>(&walrus.current_activity), EBusyWalrus);
    assert!(option::is_none<u64>(&walrus.activity_start), EBusyWalrus);

    let now = clock::timestamp_ms(clock);

    option::fill<u64>(&mut walrus.current_activity, code);
    option::fill<u64>(&mut walrus.activity_start, now);
}

public fun finish_skill(walrus: &mut Walrus, clock: &Clock, ctx: &mut TxContext): Item {
    assert!(option::is_some<u64>(&walrus.current_activity), EIdleWalrus);
    assert!(option::is_some<u64>(&walrus.activity_start), EIdleWalrus);

    let code = option::extract<u64>(&mut walrus.current_activity);
    let start = option::extract<u64>(&mut walrus.activity_start);
    let now = clock::timestamp_ms(clock);

    let elapsed_ms = now - start;
    let mut elapsed_s = elapsed_ms / 1000;
    let max_elapsed_s = 7200; // 2 hours
    elapsed_s = if (elapsed_s > max_elapsed_s) {
        max_elapsed_s
    } else {
        elapsed_s
    };

    assert!(elapsed_s > 0, EActivityFinishTooSoon);

    let diving_lvl = xp_to_level(walrus.skills.diving_xp);
    let crafting_lvl = xp_to_level(walrus.skills.crafting_xp);

    if (code == DIVING_SOFT_SHELL_CLAM) {
        let intervals = elapsed_s / DIVING_SOFT_SHELL_CLAM_TIME;
        let xp = intervals * DIVING_SOFT_SHELL_CLAM_XP;
        walrus.skills.diving_xp = walrus.skills.diving_xp + xp;
        
        return Item {
            id: object::new(ctx),
            `type`: string::utf8(SOFT_SHELL_CLAM),
            quantity: intervals,
        }
    } else if (code == DIVING_ARCTIC_SURFCLAM) {
        let intervals = elapsed_s / DIVING_ARCTIC_SURFCLAM_TIME;
        let xp = intervals * DIVING_ARCTIC_SURFCLAM_XP;
        walrus.skills.diving_xp = walrus.skills.diving_xp + xp;

        return Item {
            id: object::new(ctx),
            `type`: string::utf8(ARCTIC_SURFCLAM),
            quantity: intervals,
        }
    } else if (code == DIVING_GREENLAND_COCKLE) {
        let intervals = elapsed_s / DIVING_GREENLAND_COCKLE_TIME;
        let xp = intervals * DIVING_GREENLAND_COCKLE_XP;
        walrus.skills.diving_xp = walrus.skills.diving_xp + xp;

        return Item {
            id: object::new(ctx),
            `type`: string::utf8(GREENLAND_COCKLE),
            quantity: intervals,
        }
    } else if (code == MINING_COMPACT_SNOW) {
        let intervals = elapsed_s / MINING_COMPACT_SNOW_TIME;
        let xp = intervals * MINING_COMPACT_SNOW_XP;
        walrus.skills.mining_xp = walrus.skills.mining_xp + xp;

        return Item {
            id: object::new(ctx),
            `type`: string::utf8(COMPACT_SNOW),
            quantity: intervals,
        }
    } else if (code == MINING_ICE) {
        let intervals = elapsed_s / MINING_ICE_TIME;
        let xp = intervals * MINING_ICE_XP;
        walrus.skills.mining_xp = walrus.skills.mining_xp + xp;

        return Item {
            id: object::new(ctx),
            `type`: string::utf8(ICE),
            quantity: intervals,
        }
    } else if (code == MINING_BLUE_ICE) {
        let intervals = elapsed_s / MINING_BLUE_ICE_TIME;
        let xp = intervals * MINING_BLUE_ICE_XP;
        walrus.skills.mining_xp = walrus.skills.mining_xp + xp;

        return Item {
            id: object::new(ctx),
            `type`: string::utf8(BLUE_ICE),
            quantity: intervals,
        }
    } else if (code == CRAFTING_SNOW_MITTENS) {
        let intervals = elapsed_s / CRAFTING_SNOW_MITTENS_TIME;
        let xp = intervals * CRAFTING_SNOW_MITTENS_XP;
        walrus.skills.crafting_xp = walrus.skills.crafting_xp + xp;

        return Item {
            id: object::new(ctx),
            `type`: string::utf8(SNOW_MITTENS),
            quantity: intervals,
        }
    } else if (code == CRAFTING_ICE_HELMET) {
        let intervals = elapsed_s / CRAFTING_ICE_HELMET_TIME;
        let xp = intervals * CRAFTING_ICE_HELMET_XP;
        walrus.skills.crafting_xp = walrus.skills.crafting_xp + xp;

        return Item {
            id: object::new(ctx),
            `type`: string::utf8(ICE_HELMET),
            quantity: intervals,
        }
    } else if (code == CRAFTING_TUSK_BLADES) {
        let intervals = elapsed_s / CRAFTING_TUSK_BLADES_TIME;
        let xp = intervals * CRAFTING_TUSK_BLADES_XP;
        walrus.skills.crafting_xp = walrus.skills.crafting_xp + xp;

        return Item {
            id: object::new(ctx),
            `type`: string::utf8(TUSK_BLADES),
            quantity: intervals,
        }
    };

    Item {
        id: object::new(ctx),
        `type`: string::utf8(b"nothing"),
        quantity: 0,
    }
}

public fun item_to_inventory(item: Item, walrus: &mut Walrus, ctx: &mut TxContext) {
    let is_existing_item = object_bag::contains(&walrus.inventory, item.`type`);

    if (is_existing_item) {
        let Item {
            id,
            `type`,
            quantity,
        } = item;

        let existing_item = object_bag::borrow_mut<String, Item>(&mut walrus.inventory, `type`);
        existing_item.quantity = existing_item.quantity + quantity;

        object::delete(id);
    } else {
        object_bag::add(&mut walrus.inventory, item.`type`, item);
    };
}


// === Admin Functions ===
entry fun drop_walrus(walrus: Walrus, ctx: &mut TxContext) {
    let Walrus {
        id,
        b36_address: _,
        name: _,
        stats,
        skills,
        inventory,
        foes,
        current_activity: _,
        activity_start: _,
    } = walrus;
    let WalrusStats {
        health: _,
        energy: _,
     } = stats;
     let WalrusSkills {
        strength_xp: _,
        dexterity_xp: _,
        defence_xp: _,
        hunting_xp: _,
        diving_xp: _,
        mining_xp: _,
        crafting_xp: _,
     } = skills;

    // while (!(object_bag::is_empty(&inventory))) {
    //     // You'll need to implement logic to handle each object type
    //     // This is just an example and would need to be adapted to your specific case
    //     let (_key, _value) = object_bag::remove(&mut inventory);
    //     // Handle the removed object appropriately
    // };

    // Now that the bag is empty, we can destroy it
    bag::destroy_empty(foes);
    object_bag::destroy_empty(inventory);

    object::delete(id);
}

entry fun test_clock(clock: &Clock, ctx: &mut TxContext): u64 {
    let now = clock::timestamp_ms(clock);

    now
}

// === Private Functions ===
fun new(ctx: &mut TxContext): Walrus {
    let id = object::new(ctx);
    let b36_address = to_b36(id.uid_to_address());
    let stats = WalrusStats {
        health: 100,
        energy: 100,
    };
    let skills = WalrusSkills { 
        strength_xp: 0,
        dexterity_xp: 0,
        defence_xp: 0,
        hunting_xp: 0,
        diving_xp: 0,
        mining_xp: 0,
        crafting_xp: 0,
     };
    let inventory = object_bag::new(ctx);
    let foes = bag::new(ctx);

    Walrus {
        id,
        b36_address,
        name: option::none(),
        stats,
        skills,
        inventory,
        foes,
        current_activity: option::none(),
        activity_start: option::none(),
    }
}

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

fun xp_to_level(xp: u64): u64 {
    if (xp >= LEVEL_2_XP && xp < LEVEL_3_XP) {
        return 2
    } else if (xp >= LEVEL_3_XP && xp < LEVEL_4_XP) {
        return 3
    } else if (xp >= LEVEL_4_XP && xp < LEVEL_5_XP) {
        return 4
    } else if (xp >= LEVEL_5_XP && xp < LEVEL_6_XP) {
        return 5
    } else if (xp >= LEVEL_6_XP && xp < LEVEL_7_XP) {
        return 6
    } else if (xp >= LEVEL_7_XP && xp < LEVEL_8_XP) {
        return 7
    } else if (xp >= LEVEL_8_XP && xp < LEVEL_9_XP) {
        return 8
    } else if (xp >= LEVEL_9_XP && xp < LEVEL_10_XP) {
        return 9
    } else if (xp >= LEVEL_10_XP && xp < LEVEL_11_XP) {
        return 10
    } else if (xp >= LEVEL_11_XP && xp < LEVEL_12_XP) {
        return 11
    } else if (xp >= LEVEL_12_XP && xp < LEVEL_13_XP) {
        return 12
    } else if (xp >= LEVEL_13_XP && xp < LEVEL_14_XP) {
        return 13
    } else if (xp >= LEVEL_14_XP && xp < LEVEL_15_XP) {
        return 14
    } else if (xp >= LEVEL_15_XP && xp < LEVEL_16_XP) {
        return 15
    } else if (xp >= LEVEL_16_XP && xp < LEVEL_17_XP) {
        return 16
    } else if (xp >= LEVEL_17_XP && xp < LEVEL_18_XP) {
        return 17
    } else if (xp >= LEVEL_18_XP && xp < LEVEL_19_XP) {
        return 18
    } else if (xp >= LEVEL_19_XP && xp < LEVEL_20_XP) {
        return 19
    } else if (xp >= LEVEL_20_XP && xp < LEVEL_21_XP) {
        return 20
    } else if (xp >= LEVEL_21_XP && xp < LEVEL_22_XP) {
        return 21
    } else if (xp >= LEVEL_22_XP && xp < LEVEL_23_XP) {
        return 22
    } else if (xp >= LEVEL_23_XP && xp < LEVEL_24_XP) {
        return 23
    } else if (xp >= LEVEL_24_XP && xp < LEVEL_25_XP) {
        return 24
    } else if (xp >= LEVEL_25_XP && xp < LEVEL_26_XP) {
        return 25
    } else if (xp >= LEVEL_26_XP && xp < LEVEL_27_XP) {
        return 26
    } else if (xp >= LEVEL_27_XP && xp < LEVEL_28_XP) {
        return 27
    } else if (xp >= LEVEL_28_XP && xp < LEVEL_29_XP) {
        return 28
    } else if (xp >= LEVEL_29_XP && xp < LEVEL_30_XP) {
        return 29
    } else if (xp >= LEVEL_30_XP && xp < LEVEL_31_XP) {
        return 30
    } else if (xp >= LEVEL_31_XP && xp < LEVEL_32_XP) {
        return 31
    } else if (xp >= LEVEL_32_XP && xp < LEVEL_33_XP) {
        return 32
    } else if (xp >= LEVEL_33_XP && xp < LEVEL_34_XP) {
        return 33
    } else if (xp >= LEVEL_34_XP && xp < LEVEL_35_XP) {
        return 34
    } else if (xp >= LEVEL_35_XP && xp < LEVEL_36_XP) {
        return 35
    } else if (xp >= LEVEL_36_XP && xp < LEVEL_37_XP) {
        return 36
    } else if (xp >= LEVEL_37_XP && xp < LEVEL_38_XP) {
        return 37
    } else if (xp >= LEVEL_38_XP && xp < LEVEL_39_XP) {
        return 38
    } else if (xp >= LEVEL_39_XP && xp < LEVEL_40_XP) {
        return 39
    } else if (xp >= LEVEL_40_XP && xp < LEVEL_41_XP) {
        return 40
    } else if (xp >= LEVEL_41_XP && xp < LEVEL_42_XP) {
        return 41
    } else if (xp >= LEVEL_42_XP && xp < LEVEL_43_XP) {
        return 42
    } else if (xp >= LEVEL_43_XP && xp < LEVEL_44_XP) {
        return 43
    } else if (xp >= LEVEL_44_XP && xp < LEVEL_45_XP) {
        return 44
    } else if (xp >= LEVEL_45_XP && xp < LEVEL_46_XP) {
        return 45
    } else if (xp >= LEVEL_46_XP && xp < LEVEL_47_XP) {
        return 46
    } else if (xp >= LEVEL_47_XP && xp < LEVEL_48_XP) {
        return 47
    } else if (xp >= LEVEL_48_XP && xp < LEVEL_49_XP) {
        return 48
    } else if (xp >= LEVEL_49_XP && xp < LEVEL_50_XP) {
        return 49
    } else if (xp >= LEVEL_50_XP) {
        return 50
    } else {
        return 1
    }
}


// 2.0
// - Hunting
// - Battling

// == Misc. ===
// const STRENGTH_STANCE: u64 = 0;
// const DEXTERITY_STANCE: u64 = 1;
// const DEFENCE_STANCE: u64 = 2;


// === Foes ===
// const AGGRESSIVE_CRABS: vector<u8> = b"aggressive_crabs";
// const RIVAL_WALRUS: vector<u8> = b"rival_walrus";
// const ARCTIC_WOLVES: vector<u8> = b"arctic_wolves";
// const POLAR_BEAR: vector<u8> = b"polar_bear";

// const HUNTING_AGGRESSIVE_CRABS: u64 = 401;
// const HUNTING_AGGRESSIVE_CRABS_TIME: u64 = 22;
// const HUNTING_AGGRESSIVE_CRABS_XP: u64 = 10;

// const HUNTING_RIVAL_WALRUS: u64 = 402;
// const HUNTING_RIVAL_WALRUS_TIME: u64 = 33;
// const HUNTING_RIVAL_WALRUS_XP: u64 = 30;

// const HUNTING_ARCTIC_WOLVES: u64 = 403;
// const HUNTING_ARCTIC_WOLVES_TIME: u64 = 44;
// const HUNTING_ARCTIC_WOLVES_XP: u64 = 60;

// const HUNTING_POLAR_BEAR: u64 = 404;
// const HUNTING_POLAR_BEAR_TIME: u64 = 55;
// const HUNTING_POLAR_BEAR_XP: u64 = 200;

// const BATTLING_AGGRESSIVE_CRABS: u64 = 501;
// const BATTLING_AGGRESSIVE_CRABS_XP: u64 = 1;

// const BATTLING_RIVAL_WALRUS: u64 = 502;
// const BATTLING_RIVAL_WALRUS_XP: u64 = 2;

// const BATTLING_ARCTIC_WOLVES: u64 = 503;
// const BATTLING_ARCTIC_WOLVES_XP: u64 = 5;

// const BATTLING_POLAR_BEAR: u64 = 504;
// const BATTLING_POLAR_BEAR_XP: u64 = 10;

// public struct Foe has store, drop {
//     `type`: String,
//     quantity: u64,
//     health: u64,
//     strength: u64,
//     dexterity: u64,
//     defence: u64,
// }

// entry fun finish_hunting(walrus: &mut Walrus, clock: &Clock, ctx: &mut TxContext) {
//     assert!(option::is_some<u64>(&walrus.current_activity), EIdleWalrus);
//     assert!(option::is_some<u64>(&walrus.activity_start), EIdleWalrus);

//     let code = option::extract<u64>(&mut walrus.current_activity);
//     let start = option::extract<u64>(&mut walrus.activity_start);
//     let now = clock::timestamp_ms(clock);

//     let elapsed_ms = now - start;
//     let elapsed_s = elapsed_ms / 1000;

//     assert!(elapsed_s > 0, EActivityFinishTooSoon);

//     if (code == HUNTING_AGGRESSIVE_CRABS) {
//         let intervals = elapsed_s / HUNTING_AGGRESSIVE_CRABS_TIME;
//         let xp = intervals * HUNTING_AGGRESSIVE_CRABS_XP;
//         walrus.skills.hunting_xp = walrus.skills.hunting_xp + xp;
//         let `type` = string::utf8(AGGRESSIVE_CRABS);

//         let foe =  Foe {
//             `type`: `type`,
//             quantity: intervals,
//             health: 50,
//             strength: 10,
//             dexterity: 10,
//             defence: 5,
//         };

//         bag::add(&mut walrus.foes, `type` , foe);
//     } else if (code == HUNTING_RIVAL_WALRUS) {
//         let intervals = elapsed_s / HUNTING_RIVAL_WALRUS_TIME;
//         let xp = intervals * HUNTING_RIVAL_WALRUS_XP;
//         walrus.skills.hunting_xp = walrus.skills.hunting_xp + xp;

//         let foe = Foe {
//             `type`: string::utf8(RIVAL_WALRUS),
//             quantity: intervals,
//             health: 200,
//             strength: 30,
//             dexterity: 20,
//             defence: 40,
//         };

//         bag::add(&mut walrus.foes, string::utf8(RIVAL_WALRUS), foe);
//     } else if (code == HUNTING_ARCTIC_WOLVES) {
//         let intervals = elapsed_s / HUNTING_ARCTIC_WOLVES_TIME;
//         let xp = intervals * HUNTING_ARCTIC_WOLVES_XP;
//         walrus.skills.hunting_xp = walrus.skills.hunting_xp + xp;

//         let foe = Foe {
//             `type`: string::utf8(ARCTIC_WOLVES),
//             quantity: intervals,
//             health: 500,
//             strength: 60,
//             dexterity: 50,
//             defence: 25,
//         };

//         bag::add(&mut walrus.foes, string::utf8(ARCTIC_WOLVES), foe);
//     } else if (code == HUNTING_POLAR_BEAR) {
//         let intervals = elapsed_s / HUNTING_POLAR_BEAR_TIME;
//         let xp = intervals * HUNTING_POLAR_BEAR_XP;
//         walrus.skills.hunting_xp = walrus.skills.hunting_xp + xp;

//         let foe = Foe {
//             `type`: string::utf8(POLAR_BEAR),
//             quantity: intervals,
//             health: 2000,
//             strength: 100,
//             dexterity: 80,
//             defence: 100,
//         };

//         bag::add(&mut walrus.foes, string::utf8(POLAR_BEAR), foe);
//     };

// }

// public fun battle(walrus: &mut Walrus, code: u64, stance: u64, ctx: &mut TxContext) {
//     let walrus_str_lvl = xp_to_level(walrus.skills.strength_xp);
//     let walrus_dex_lvl = xp_to_level(walrus.skills.dexterity_xp);
//     let walrus_def_lvl = xp_to_level(walrus.skills.defence_xp);
//     let walrus_hp = walrus.stats.health;


//     if (code == BATTLING_AGGRESSIVE_CRABS) {
//         let foe = bag::remove<String, Foe>(&mut walrus.foes, string::utf8(AGGRESSIVE_CRABS));
//         let Foe {
//             `type`: _,
//             quantity,
//             health: foe_hp,
//             strength: foe_str,
//             dexterity: foe_dex,
//             defence: foe_def,
//         } = foe;

//         let walrus_dmg = if (walrus_str_lvl > foe_def) {
//             walrus_str_lvl - foe_def
//         } else {
//             1
//         };

//         let foe_dmg 
//     }
// }
