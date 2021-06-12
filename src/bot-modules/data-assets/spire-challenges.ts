import { Ironclad } from "./spire-challenges/ironclad";
import { Silent } from "./spire-challenges/silent";
import { Defect } from "./spire-challenges/defect";
import { Watcher } from "./spire-challenges/watcher";
import { GenericChallenges } from "./spire-challenges/generic";
import { CustomChallenges } from "./spire-challenges/custom";

export class SpireChallenges {
    public static characters: SpireCharacterList = {
        ironclad: {
            intro: Ironclad.intro,
            imageName: Ironclad.imageName,
            challenges: Ironclad.challenges,
            uniqueChallenges: Ironclad.uniqueChallenges
        },
        silent: {
            intro: Silent.intro,
            imageName: Silent.imageName,
            challenges: Silent.challenges,
            uniqueChallenges: Silent.uniqueChallenges
        },
        defect: {
            intro: Defect.intro,
            imageName: Defect.imageName,
            challenges: Defect.challenges,
            uniqueChallenges: Defect.uniqueChallenges
        },
        watcher: {
            intro: Watcher.intro,
            imageName: Watcher.imageName,
            challenges: Watcher.challenges,
            uniqueChallenges: Watcher.uniqueChallenges
        }
    };

    public static genericChallenges: GenericSpireChallenge = {
        challenges: GenericChallenges.challenges,
        uniqueChallenges: GenericChallenges.uniqueChallenges
    };

    public static customChallenges: GenericSpireChallenge = {
        challenges: CustomChallenges.challenges,
        uniqueChallenges: CustomChallenges.uniqueChallenges
    }
}