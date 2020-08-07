
interface SpireCharacterList {
    ironclad: SpireCharacter,
    silent: SpireCharacter,
    defect: SpireCharacter,
    watcher: SpireCharacter
}

interface GenericSpireChallenge {
    challenges: string[],
    uniqueChallenges: SpireUniqueChallenge[]
}

interface SpireCharacter extends GenericSpireChallenge {
    intro: string,
    imageName: string
}

interface SpireUniqueChallenge {
    challengeName: string,
    challenges: string[]
}