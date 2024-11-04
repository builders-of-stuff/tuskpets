import SoftshellClam from '$lib/assets/softshell-clam.png';
import ArcticSurfclam from '$lib/assets/arctic-surfclam.png';
import GreenlandCockle from '$lib/assets/greenland-cockle.png';

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
      compactSnow: {},
      ice: {},
      blueIce: {}
    },
    crafting: {
      snowMittens: {},
      iceHelmet: {},
      tuskBlades: {}
    }
  }
};
