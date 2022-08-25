
interface RoRCharacterList {
    commando: RoRCharacter,
    huntress: RoRCharacter,
    bandit: RoRCharacter,
    mult: RoRCharacter,
    engineer: RoRCharacter,
    artificer: RoRCharacter,
    mercenary: RoRCharacter,
    rex: RoRCharacter,
    loader: RoRCharacter,
    acrid: RoRCharacter,
    captain: RoRCharacter,
    heretic: RoRCharacter,
}

interface RoRCharacter {
    intro: string,
    imageName: string,
    challenges: string[],
}

interface GenericRoRChallenge {
    challenges: string[],
    uniqueChallenges: SpireUniqueChallenge[]
}