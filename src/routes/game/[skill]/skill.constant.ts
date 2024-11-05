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
  activities: {
    diving: {
      softShellClam: {
        name: 'Soft shell clam',
        requirements: {
          level: 1
        },
        baseTime: 10,
        baseXp: 4,
        image: SoftshellClam
      },
      arcticSurfclam: {
        name: 'Arctic surfclam',
        requirements: {
          level: 5
        },
        baseTime: 20,
        baseXp: 12,
        image: ArcticSurfclam
      },
      greenlandCockle: {
        name: 'Greenland cockle',
        requirements: {
          level: 25
        },
        baseTime: 30,
        baseXp: 32,
        image: GreenlandCockle
      }
    },
    mining: {
      compactSnow: {
        name: 'Compact snow',
        requirements: {
          level: 1
        },
        baseTime: 10,
        baseXp: 4,
        image: Snow
      },
      ice: {
        name: 'Ice',
        requirements: {
          level: 5
        },
        baseTime: 20,
        baseXp: 12,
        image: Ice
      },
      blueIce: {
        name: 'Blue ice',
        requirements: {
          level: 25
        },
        baseTime: 30,
        baseXp: 32,
        image: BlueIce
      }
    },
    crafting: {
      snowman: {
        name: 'Snowman',
        requirements: {
          level: 1
        },
        baseTime: 10,
        baseXp: 10,
        image: Snowman
      },
      iceHelmet: {
        name: 'Ice helmet',
        requirements: {
          level: 5
        },
        baseTime: 20,
        baseXp: 100,
        image: IceHelmet
      },
      tuskBlades: {
        name: 'Tusk blades',
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
