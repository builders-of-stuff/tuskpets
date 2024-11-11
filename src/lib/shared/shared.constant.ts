import SoftshellClam from '$lib/assets/softshell-clam.png';
import ArcticSurfclam from '$lib/assets/arctic-surfclam.png';
import GreenlandCockle from '$lib/assets/greenland-cockle.png';
import Snow from '$lib/assets/snow.png';
import Ice from '$lib/assets/ice.png';
import BlueIce from '$lib/assets/blue-ice.png';
import Snowman from '$lib/assets/snowman.png';
import IceHelmet from '$lib/assets/ice-helmet.png';
import TuskBlades from '$lib/assets/tuskblades.png';
import Diving from '$lib/assets/diving.png';
import Crafting from '$lib/assets/crafting.png';
import Mining from '$lib/assets/mining.png';

import { ITEM_TYPE } from './shared.type';

export const PACKAGE_ID =
  '0x5d26d1a6d75745e1cae29e28e4b96fc500ee92e5f588a4b59da5af5f187e6cc8';

export const PUBLISHER_ID =
  '0xbff286590bf71b1a308a6303a36c14d805d3f01ede7c33c885edbc025b274fdd';

export const UPGRADE_CAP_ID =
  '0x60d6ebb1801a509d5127affe7ee077c5af9582b2e390ffb1aafcc61bb29e56ac';

export const DISPLAY_ID =
  '0xaaf0443730338f932b8e20094478c39c7345d2e3cc55c983ff5ff3ece27d0258';

export const DIVING_SOFT_SHELL_CLAM = 101;
export const DIVING_SOFT_SHELL_CLAM_TIME = 10;
export const DIVING_SOFT_SHELL_CLAM_XP = 4;

export const DIVING_ARCTIC_SURFCLAM = 102;
export const DIVING_ARCTIC_SURFCLAM_TIME = 20;
export const DIVING_ARCTIC_SURFCLAM_XP = 12;

export const DIVING_GREENLAND_COCKLE = 103;
export const DIVING_GREENLAND_COCKLE_TIME = 30;
export const DIVING_GREENLAND_COCKLE_XP = 32;

export const MINING_COMPACT_SNOW = 201;
export const MINING_COMPACT_SNOW_TIME = 10;
export const MINING_COMPACT_SNOW_XP = 4;

export const MINING_ICE = 202;
export const MINING_ICE_TIME = 20;
export const MINING_ICE_XP = 12;

export const MINING_BLUE_ICE = 203;
export const MINING_BLUE_ICE_TIME = 30;
export const MINING_BLUE_ICE_XP = 32;

export const CRAFTING_SNOWMAN = 301;
export const CRAFTING_SNOWMAN_TIME = 10;
export const CRAFTING_SNOWMAN_XP = 10;

export const CRAFTING_ICE_HELMET = 302;
export const CRAFTING_ICE_HELMET_TIME = 20;
export const CRAFTING_ICE_HELMET_XP = 100;

export const CRAFTING_TUSK_BLADES = 303;
export const CRAFTING_TUSK_BLADES_TIME = 30;
export const CRAFTING_TUSK_BLADES_XP = 1000;

export const SKILL_IMAGES = {
  diving: Diving,
  mining: Mining,
  crafting: Crafting
};

export const SKILLS_CONFIG = {
  maxActivityDurationSeconds: 7200, // 2 hours
  skills: {
    diving: {
      101: {
        name: 'Soft shell clam',
        type: ITEM_TYPE.SOFT_SHELL_CLAM,
        image: SoftshellClam,
        skill: 'diving',
        description: `A humble but hearty mollusk, perfect for a walrus's first diving expedition. Its shell may be thin, but what it lacks in armor it makes up for in sweet, tender meat. A reliable snack that's earned its nickname 'the beginner's blessing.`,
        code: 101,
        requirements: {
          level: 1
        },
        baseTime: 10,
        baseXp: 4
      },
      102: {
        name: 'Arctic surfclam',
        type: ITEM_TYPE.ARCTIC_SURFCLAM,
        image: ArcticSurfclam,
        skill: 'diving',
        description: `This robust beauty is a prized find among the northern seas. Its sturdy shell houses a generous portion of savory flesh that makes even experienced walruses do a happy flipper dance. Some say you can hear the sound of waves when you hold it close - but that might just be your stomach growling.`,
        code: 102,
        requirements: {
          level: 5
        },
        baseTime: 20,
        baseXp: 12
      },
      103: {
        name: 'Greenland cockle',
        type: ITEM_TYPE.GREENLAND_COCKLE,
        image: GreenlandCockle,
        skill: 'diving',
        description: `The legendary jewel of the arctic depths! This rare delicacy is the stuff of walrus dreams, with its distinctive heart-shaped shell and impossibly succulent meat. Finding one of these is like striking gold, if gold was delicious and came in its own carrying case. Ancient walrus tales speak of entire colonies celebrating when one is found.`,
        code: 103,
        requirements: {
          level: 25
        },
        baseTime: 30,
        baseXp: 32
      }
    },
    mining: {
      201: {
        name: 'Compact snow',
        type: ITEM_TYPE.COMPACT_SNOW,
        image: Snow,
        skill: 'mining',
        description: `The foundation of any arctic construction project! This densely packed snow has been naturally compressed by generations of walrus flippers. While common, it's essential for any respectable walrus builder. Some say it's extra satisfying to pack when you're feeling grumpy.`,
        code: 201,
        requirements: {
          level: 1
        },
        baseTime: 10,
        baseXp: 4
      },
      202: {
        name: 'Ice',
        type: ITEM_TYPE.ICE,
        image: Ice,
        skill: 'mining',
        description: `Crystal-clear and surprisingly sturdy, this natural arctic treasure is a cut above regular frozen water. Its pristine surface reflects the aurora borealis in spectacular ways, making it a favorite among walrus architects. Just don't lick it - your tongue will stick!`,
        code: 202,
        requirements: {
          level: 5
        },
        baseTime: 20,
        baseXp: 12
      },
      203: {
        name: 'Blue ice',
        type: ITEM_TYPE.BLUE_ICE,
        image: BlueIce,
        skill: 'mining',
        description: `The rarest and most mesmerizing form of frozen water known to walrus-kind. Formed under immense pressure over countless winters, this ancient ice holds a mysterious blue glow that some say is powered by arctic magic. A master walrus miner's proudest discovery.`,
        code: 203,
        requirements: {
          level: 25
        },
        baseTime: 30,
        baseXp: 32
      }
    },
    crafting: {
      301: {
        name: 'Snowman',
        type: ITEM_TYPE.SNOWMAN,
        image: Snowman,
        skill: 'crafting',
        description: `A time-honored walrus tradition: creating a frozen friend! While it might not be the most practical creation, there's something heartwarming about building a cheerful snow companion. Some walruses insist on using a carrot for the nose, though nobody's quite sure where they get them.`,
        code: 301,
        requirements: {
          level: 1
        },
        baseTime: 10,
        baseXp: 10
      },
      302: {
        name: 'Ice helmet',
        type: ITEM_TYPE.ICE_HELMET,
        image: IceHelmet,
        skill: 'crafting',
        description: `A sophisticated piece of protective headgear crafted from carefully shaped ice. Not only does it keep your head cool under pressure, but it also makes you look rather dashing. The ultimate fashion statement for the safety-conscious walrus.`,
        code: 302,
        requirements: {
          level: 5
        },
        baseTime: 20,
        baseXp: 100
      },
      303: {
        name: 'Tusk blades',
        type: ITEM_TYPE.TUSK_BLADES,
        image: TuskBlades,
        skill: 'crafting',
        description: `The pinnacle of walrus crafting achievement! These magnificent blade attachments transform ordinary tusks into extraordinary tools. Carefully forged from the finest materials, they're perfect for everything from ice carving to impressing other walruses at social gatherings. A true mark of mastery.`,
        code: 303,
        requirements: {
          level: 10
        },
        baseTime: 30,
        baseXp: 1000
      }
    }
  }
};

/**
 * e.g. {
 *   101: {
 *     ...stuff
 *   }
 * }
 */
export const ACTIVITY_CONFIG = Object.entries(SKILLS_CONFIG.skills).reduce(
  (acc, [skillName, skillItems]) => {
    Object.entries(skillItems).forEach(([code, item]: any) => {
      acc[code] = {
        type: item.type,
        image: item.image,
        skill: skillName,
        baseTime: item.baseTime,
        baseXp: item.baseXp
      };
    });
    return acc;
  },
  {}
);

/**
 * e.g. {
 *   compact_snow: {
 *     ...stuff
 *   }
 * }
 */
export const TYPE_CONFIG = Object.entries(SKILLS_CONFIG.skills).reduce(
  (acc, [skillName, skillItems]) => {
    Object.entries(skillItems).forEach(([code, item]: any) => {
      acc[item.type] = {
        name: item.name,
        description: item.description,
        code: item.code,
        skill: skillName,
        image: item.image,
        baseTime: item.baseTime,
        baseXp: item.baseXp
      };
    });
    return acc;
  },
  {}
);

// === XP Thresholds ===
export const LEVEL_2_XP = 83;
export const LEVEL_3_XP = 174;
export const LEVEL_4_XP = 276;
export const LEVEL_5_XP = 388;
export const LEVEL_6_XP = 512;
export const LEVEL_7_XP = 650;
export const LEVEL_8_XP = 801;
export const LEVEL_9_XP = 969;
export const LEVEL_10_XP = 1154;
export const LEVEL_11_XP = 1358;
export const LEVEL_12_XP = 1584;
export const LEVEL_13_XP = 1833;
export const LEVEL_14_XP = 2107;
export const LEVEL_15_XP = 2411;
export const LEVEL_16_XP = 2746;
export const LEVEL_17_XP = 3115;
export const LEVEL_18_XP = 3523;
export const LEVEL_19_XP = 3973;
export const LEVEL_20_XP = 4470;
export const LEVEL_21_XP = 5018;
export const LEVEL_22_XP = 5624;
export const LEVEL_23_XP = 6291;
export const LEVEL_24_XP = 7028;
export const LEVEL_25_XP = 7842;
export const LEVEL_26_XP = 8740;
export const LEVEL_27_XP = 9730;
export const LEVEL_28_XP = 10824;
export const LEVEL_29_XP = 12031;
export const LEVEL_30_XP = 13363;
export const LEVEL_31_XP = 14833;
export const LEVEL_32_XP = 16456;
export const LEVEL_33_XP = 18247;
export const LEVEL_34_XP = 20224;
export const LEVEL_35_XP = 22406;
export const LEVEL_36_XP = 24813;
export const LEVEL_37_XP = 27473;
export const LEVEL_38_XP = 30408;
export const LEVEL_39_XP = 33648;
export const LEVEL_40_XP = 37224;
export const LEVEL_41_XP = 41171;
export const LEVEL_42_XP = 45529;
export const LEVEL_43_XP = 50339;
export const LEVEL_44_XP = 55649;
export const LEVEL_45_XP = 61512;
export const LEVEL_46_XP = 67983;
export const LEVEL_47_XP = 75127;
export const LEVEL_48_XP = 83014;
export const LEVEL_49_XP = 91721;
export const LEVEL_50_XP = 101333;
export const LEVEL_51_XP = 111945;
export const LEVEL_52_XP = 123660;
export const LEVEL_53_XP = 136594;
export const LEVEL_54_XP = 150872;
export const LEVEL_55_XP = 166636;
export const LEVEL_56_XP = 184040;
export const LEVEL_57_XP = 203254;
export const LEVEL_58_XP = 224466;
export const LEVEL_59_XP = 247886;
export const LEVEL_60_XP = 273742;
export const LEVEL_61_XP = 302288;
export const LEVEL_62_XP = 333804;
export const LEVEL_63_XP = 368599;
export const LEVEL_64_XP = 407015;
export const LEVEL_65_XP = 449428;
export const LEVEL_66_XP = 496254;
export const LEVEL_67_XP = 547953;
export const LEVEL_68_XP = 605032;
export const LEVEL_69_XP = 668051;
export const LEVEL_70_XP = 737627;
export const LEVEL_71_XP = 814445;
export const LEVEL_72_XP = 899257;
export const LEVEL_73_XP = 992895;
export const LEVEL_74_XP = 1096278;
export const LEVEL_75_XP = 1210421;
export const LEVEL_76_XP = 1336443;
export const LEVEL_77_XP = 1475581;
export const LEVEL_78_XP = 1629200;
export const LEVEL_79_XP = 1798808;
export const LEVEL_80_XP = 1986068;
export const LEVEL_81_XP = 2192818;
export const LEVEL_82_XP = 2421087;
export const LEVEL_83_XP = 2673114;
export const LEVEL_84_XP = 2951373;
export const LEVEL_85_XP = 3258594;
export const LEVEL_86_XP = 3597792;
export const LEVEL_87_XP = 3972294;
export const LEVEL_88_XP = 4385776;
export const LEVEL_89_XP = 4842295;
export const LEVEL_90_XP = 5346332;
export const LEVEL_91_XP = 5902831;
export const LEVEL_92_XP = 6517253;
export const LEVEL_93_XP = 7195629;
export const LEVEL_94_XP = 7944614;
export const LEVEL_95_XP = 8771558;
export const LEVEL_96_XP = 9684577;
export const LEVEL_97_XP = 10692629;
export const LEVEL_98_XP = 11805606;
export const LEVEL_99_XP = 13034431;
