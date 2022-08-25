import { Ironclad } from "./spire-challenges/ironclad";
import { Silent } from "./spire-challenges/silent";
import { Defect } from "./spire-challenges/defect";
import { Watcher } from "./spire-challenges/watcher";
import { GenericChallenges } from "./spire-challenges/generic";
import { CustomChallenges } from "./spire-challenges/custom";

export class RoRChallenges {
    // TODO: Move characters into static class files.
    public static characters: RoRCharacterList = {
        commando: {
            intro: 'Generic man rolls into action! Now where did he put those glasses...',
            imageName: 'commando',
            challenges: []
        },
        huntress: {
            intro: 'Tired of aiming? Me too. Zip zoom!',
            imageName: 'huntress',
            challenges: []
        },
        bandit: {
            intro: 'I see you\'re into taking dudes from behind.',
            imageName: 'bandit',
            challenges: []
        },
        mult: {
            intro: 'Beep boop.',
            imageName: 'mult',
            challenges: []
        },
        engineer: {
            intro: 'Gimme my bungus!',
            imageName: 'engineer',
            challenges: []
        },
        artificer: {
            intro: 'Glass canon reporting for duty!',
            imageName: 'artificer',
            challenges: []
        },
        mercenary: {
            intro: 'While you were busy playing other games I was studying the blade.',
            imageName: 'mercenary',
            challenges: []
        },
        rex: {
            intro: 'Wait you actually got the fuel cell here without dying? Here\'s a plant monster I guess.',
            imageName: 'rex',
            challenges: []
        },
        loader: {
            intro: 'PUNCH. CHARGE. REPEAT.',
            imageName: 'loader',
            challenges: []
        },
        acrid: {
            intro: 'The Jelly Dog has escaped the kennels again.',
            imageName: 'acrid',
            challenges: []
        },
        captain: {
            intro: '*Orbital bombartment intensifies*',
            imageName: 'captain',
            challenges: []
        },
        heretic: {
            intro: 'Caw? Caw. Hope you have enough lunar coins saved up for this.',
            imageName: 'heretic',
            challenges: []
        },
    };

    public static genericChallenges: GenericSpireChallenge = {
        challenges: GenericChallenges.challenges,
        uniqueChallenges: GenericChallenges.uniqueChallenges
    };
}