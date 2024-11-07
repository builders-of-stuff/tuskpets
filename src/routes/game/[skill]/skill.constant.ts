import SoftshellClam from '$lib/assets/softshell-clam.png';
import ArcticSurfclam from '$lib/assets/arctic-surfclam.png';
import GreenlandCockle from '$lib/assets/greenland-cockle.png';
import Snow from '$lib/assets/snow.png';
import Ice from '$lib/assets/ice.png';
import BlueIce from '$lib/assets/blue-ice.png';
import Snowman from '$lib/assets/snowman.png';
import IceHelmet from '$lib/assets/ice-helmet.png';
import TuskBlades from '$lib/assets/tuskblades.png';

export const SKILLS_CONFIG = {
  maxActivityDurationSeconds: 7200, // 2 hours
  skills: {
    diving: {
      101: {
        name: 'Soft shell clam',
        description: `A humble but hearty mollusk, perfect for a walrus's first diving expedition. Its shell may be thin, but what it lacks in armor it makes up for in sweet, tender meat. A reliable snack that's earned its nickname 'the beginner's blessing.`,
        code: 101,
        requirements: {
          level: 1
        },
        baseTime: 10,
        baseXp: 4,
        image: SoftshellClam
      },
      102: {
        name: 'Arctic surfclam',
        description: `This robust beauty is a prized find among the northern seas. Its sturdy shell houses a generous portion of savory flesh that makes even experienced walruses do a happy flipper dance. Some say you can hear the sound of waves when you hold it close - but that might just be your stomach growling.`,
        code: 102,
        requirements: {
          level: 5
        },
        baseTime: 20,
        baseXp: 12,
        image: ArcticSurfclam
      },
      103: {
        name: 'Greenland cockle',
        description: `The legendary jewel of the arctic depths! This rare delicacy is the stuff of walrus dreams, with its distinctive heart-shaped shell and impossibly succulent meat. Finding one of these is like striking gold, if gold was delicious and came in its own carrying case. Ancient walrus tales speak of entire colonies celebrating when one is found.`,
        code: 103,
        requirements: {
          level: 25
        },
        baseTime: 30,
        baseXp: 32,
        image: GreenlandCockle
      }
    },
    mining: {
      201: {
        name: 'Compact snow',
        description: `The foundation of any arctic construction project! This densely packed snow has been naturally compressed by generations of walrus flippers. While common, it's essential for any respectable walrus builder. Some say it's extra satisfying to pack when you're feeling grumpy.`,
        code: 201,
        requirements: {
          level: 1
        },
        baseTime: 10,
        baseXp: 4,
        image: Snow
      },
      202: {
        name: 'Ice',
        description: `Crystal-clear and surprisingly sturdy, this natural arctic treasure is a cut above regular frozen water. Its pristine surface reflects the aurora borealis in spectacular ways, making it a favorite among walrus architects. Just don't lick it - your tongue will stick!`,
        code: 202,
        requirements: {
          level: 5
        },
        baseTime: 20,
        baseXp: 12,
        image: Ice
      },
      203: {
        name: 'Blue ice',
        description: `The rarest and most mesmerizing form of frozen water known to walrus-kind. Formed under immense pressure over countless winters, this ancient ice holds a mysterious blue glow that some say is powered by arctic magic. A master walrus miner's proudest discovery.`,
        code: 203,
        requirements: {
          level: 25
        },
        baseTime: 30,
        baseXp: 32,
        image: BlueIce
      }
    },
    crafting: {
      301: {
        name: 'Snowman',
        description: `A time-honored walrus tradition: creating a frozen friend! While it might not be the most practical creation, there's something heartwarming about building a cheerful snow companion. Some walruses insist on using a carrot for the nose, though nobody's quite sure where they get them.`,
        code: 301,
        requirements: {
          level: 1
        },
        baseTime: 10,
        baseXp: 10,
        image: Snowman
      },
      302: {
        name: 'Ice helmet',
        description: `A sophisticated piece of protective headgear crafted from carefully shaped ice. Not only does it keep your head cool under pressure, but it also makes you look rather dashing. The ultimate fashion statement for the safety-conscious walrus.`,
        code: 302,
        requirements: {
          level: 5
        },
        baseTime: 20,
        baseXp: 100,
        image: IceHelmet
      },
      303: {
        name: 'Tusk blades',
        description: `The pinnacle of walrus crafting achievement! These magnificent blade attachments transform ordinary tusks into extraordinary tools. Carefully forged from the finest materials, they're perfect for everything from ice carving to impressing other walruses at social gatherings. A true mark of mastery.`,
        code: 303,
        requirements: {
          level: 10
        },
        baseTime: 30,
        baseXp: 1000,
        image: TuskBlades
      }
    }
  }
};
