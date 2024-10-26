module tuskpets::walrus;

use std::string::{Self, String};
use sui::address;
use sui::display;
use sui::package;
use sui::object_bag::{Self, ObjectBag};
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
const SNOWMAN: vector<u8> = b"snowman";
const ICE_HELMET: vector<u8> = b"ice_helmet";
const TUSK_BLADES: vector<u8> = b"tusk_blades";

// === Activities ===
const HUNTING: u64 = 42;
const HUNTING_TIME: u64 = 22;
const HUNTING_XP: u64 = 8;

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

const CRAFTING_SNOWMAN: u64 = 301;
const CRAFTING_SNOWMAN_TIME: u64 = 10;
const CRAFTING_SNOWMAN_XP: u64 = 10;

const CRAFTING_ICE_HELMET: u64 = 302;
const CRAFTING_ICE_HELMET_TIME: u64 = 20;
const CRAFTING_ICE_HELMET_XP: u64 = 100;

const CRAFTING_TUSK_BLADES: u64 = 303;
const CRAFTING_TUSK_BLADES_TIME: u64 = 30;
const CRAFTING_TUSK_BLADES_XP: u64 = 1000;

// === XP Thresholds === 
const LEVEL_2_XP: u64 = 83;
const LEVEL_3_XP: u64 = 174;
const LEVEL_4_XP: u64 = 276;
const LEVEL_5_XP: u64 = 388;
const LEVEL_6_XP: u64 = 512;
const LEVEL_7_XP: u64 = 650;
const LEVEL_8_XP: u64 = 801;
const LEVEL_9_XP: u64 = 969;
const LEVEL_10_XP: u64 = 1154;
const LEVEL_11_XP: u64 = 1358;
const LEVEL_12_XP: u64 = 1584;
const LEVEL_13_XP: u64 = 1833;
const LEVEL_14_XP: u64 = 2107;
const LEVEL_15_XP: u64 = 2411;
const LEVEL_16_XP: u64 = 2746;
const LEVEL_17_XP: u64 = 3115;
const LEVEL_18_XP: u64 = 3523;
const LEVEL_19_XP: u64 = 3973;
const LEVEL_20_XP: u64 = 4470;
const LEVEL_21_XP: u64 = 5018;
const LEVEL_22_XP: u64 = 5624;
const LEVEL_23_XP: u64 = 6291;
const LEVEL_24_XP: u64 = 7028;
const LEVEL_25_XP: u64 = 7842;
const LEVEL_26_XP: u64 = 8740;
const LEVEL_27_XP: u64 = 9730;
const LEVEL_28_XP: u64 = 10824;
const LEVEL_29_XP: u64 = 12031;
const LEVEL_30_XP: u64 = 13363;
const LEVEL_31_XP: u64 = 14833;
const LEVEL_32_XP: u64 = 16456;
const LEVEL_33_XP: u64 = 18247;
const LEVEL_34_XP: u64 = 20224;
const LEVEL_35_XP: u64 = 22406;
const LEVEL_36_XP: u64 = 24813;
const LEVEL_37_XP: u64 = 27473;
const LEVEL_38_XP: u64 = 30408;
const LEVEL_39_XP: u64 = 33648;
const LEVEL_40_XP: u64 = 37224;
const LEVEL_41_XP: u64 = 41171;
const LEVEL_42_XP: u64 = 45529;
const LEVEL_43_XP: u64 = 50339;
const LEVEL_44_XP: u64 = 55649;
const LEVEL_45_XP: u64 = 61512;
const LEVEL_46_XP: u64 = 67983;
const LEVEL_47_XP: u64 = 75127;
const LEVEL_48_XP: u64 = 83014;
const LEVEL_49_XP: u64 = 91721;
const LEVEL_50_XP: u64 = 101333;
const LEVEL_51_XP: u64 = 111945;
const LEVEL_52_XP: u64 = 123660;
const LEVEL_53_XP: u64 = 136594;
const LEVEL_54_XP: u64 = 150872;
const LEVEL_55_XP: u64 = 166636;
const LEVEL_56_XP: u64 = 184040;
const LEVEL_57_XP: u64 = 203254;
const LEVEL_58_XP: u64 = 224466;
const LEVEL_59_XP: u64 = 247886;
const LEVEL_60_XP: u64 = 273742;
const LEVEL_61_XP: u64 = 302288;
const LEVEL_62_XP: u64 = 333804;
const LEVEL_63_XP: u64 = 368599;
const LEVEL_64_XP: u64 = 407015;
const LEVEL_65_XP: u64 = 449428;
const LEVEL_66_XP: u64 = 496254;
const LEVEL_67_XP: u64 = 547953;
const LEVEL_68_XP: u64 = 605032;
const LEVEL_69_XP: u64 = 668051;
const LEVEL_70_XP: u64 = 737627;
const LEVEL_71_XP: u64 = 814445;
const LEVEL_72_XP: u64 = 899257;
const LEVEL_73_XP: u64 = 992895;
const LEVEL_74_XP: u64 = 1096278;
const LEVEL_75_XP: u64 = 1210421;
const LEVEL_76_XP: u64 = 1336443;
const LEVEL_77_XP: u64 = 1475581;
const LEVEL_78_XP: u64 = 1629200;
const LEVEL_79_XP: u64 = 1798808;
const LEVEL_80_XP: u64 = 1986068;
const LEVEL_81_XP: u64 = 2192818;
const LEVEL_82_XP: u64 = 2421087;
const LEVEL_83_XP: u64 = 2673114;
const LEVEL_84_XP: u64 = 2951373;
const LEVEL_85_XP: u64 = 3258594;
const LEVEL_86_XP: u64 = 3597792;
const LEVEL_87_XP: u64 = 3972294;
const LEVEL_88_XP: u64 = 4385776;
const LEVEL_89_XP: u64 = 4842295;
const LEVEL_90_XP: u64 = 5346332;
const LEVEL_91_XP: u64 = 5902831;
const LEVEL_92_XP: u64 = 6517253;
const LEVEL_93_XP: u64 = 7195629;
const LEVEL_94_XP: u64 = 7944614;
const LEVEL_95_XP: u64 = 8771558;
const LEVEL_96_XP: u64 = 9684577;
const LEVEL_97_XP: u64 = 10692629;
const LEVEL_98_XP: u64 = 11805606;
const LEVEL_99_XP: u64 = 13034431;

// === Structs ===
public struct WALRUS has drop {}

public struct Walrus has key, store {
    id: UID,
    b36_address: String,
    stats: WalrusStats,
    skills: WalrusSkills,
    inventory: ObjectBag,
    foes: ObjectBag,
    current_activity: Option<u64>,
    activity_start: Option<u64>,
}

public struct WalrusStats has store {
    health: u16,
}

// Todo: 
// - Hunting
// - battling
// - using items
// - Display of items and walrus

public struct WalrusSkills has store {
    attack_xp: u8,
    defence_xp: u8,
    hunting_xp: u8,
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

public fun finish_activity(walrus: &mut Walrus, clock: &Clock, ctx: &mut TxContext): Item {
    assert!(option::is_some<u64>(&walrus.current_activity), EIdleWalrus);
    assert!(option::is_some<u64>(&walrus.activity_start), EIdleWalrus);

    let code = option::extract<u64>(&mut walrus.current_activity);
    let start = option::extract<u64>(&mut walrus.activity_start);
    let now = clock::timestamp_ms(clock);

    let elapsed_ms = now - start;
    let elapsed_s = elapsed_ms / 1000;

    assert!(elapsed_s > 0, EActivityFinishTooSoon);

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
    } else if (code == CRAFTING_SNOWMAN) {
        let intervals = elapsed_s / CRAFTING_SNOWMAN_TIME;
        let xp = intervals * CRAFTING_SNOWMAN_XP;
        walrus.skills.crafting_xp = walrus.skills.crafting_xp + xp;

        return Item {
            id: object::new(ctx),
            `type`: string::utf8(SNOWMAN),
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


// === Admin Functions ===
entry fun drop_walrus(walrus: Walrus, ctx: &mut TxContext) {
    let Walrus {
        id,
        b36_address: _,
        stats,
        skills,
        inventory,
        foes,
        current_activity: _,
        activity_start: _,
    } = walrus;
    let WalrusStats {
        health: _,
     } = stats;
     let WalrusSkills {
        attack_xp: _,
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
    object_bag::destroy_empty(foes);
    object_bag::destroy_empty(inventory);

    object::delete(id);
}

entry fun test_clock(clock: &Clock, ctx: &mut TxContext): u64 {
    let now = clock::timestamp_ms(clock);

    now
}

// Gathering - Rocks, soft snow, hard snow, ice

// Crafting - Snowman, Ice helmet, Tusk blades/tips, flipper shields


// === Private Functions ===
fun new(ctx: &mut TxContext): Walrus {
    let id = object::new(ctx);
    let b36_address = to_b36(id.uid_to_address());
    let stats = WalrusStats {
        health: 100,
    };
    let skills = WalrusSkills { 
        attack_xp: 0,
        defence_xp: 0,
        hunting_xp: 0,
        diving_xp: 0,
        mining_xp: 0,
        crafting_xp: 0,
     };
    let inventory = object_bag::new(ctx);
    let foes = object_bag::new(ctx);

    Walrus {
        id,
        b36_address,
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
