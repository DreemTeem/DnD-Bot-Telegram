export class Watcher {
    public static intro: string = "HOW THE FUCK DOES THIS CHARACTER WORK AGAIN? \n WHO CARES, JUST PROSTRATE YOUR WAY TO VICTORY. \n W A T C H E R";
    public static imageName: string = "watcher.jpg";
    public static challenges: string[] = [
        "BOW DOWN - YOU HAVE TO TAKE ALL PROSTRATES.",
        "THE END IS NIGH - IF BLASPHEMOUS POPS UP, YOU GOTTA TAKE IT.",
        "IS THE PRESSURE TOO MUCH FOR YOU TO HANDLE? - TIME TO BUILD A PRESSURE POINTS DECK.",
        "ALPHA FEMALE - TAKE ALL OFFERED ALPHAS.",
        "PALADIN MODE - TAKE ANY CARD THAT ALLOWS YOU TO GENERATE SMITE CARDS.",
        "MARK IT ZERO - YOU ARE NOW REQUIRED TO TAKE ALL BOWLING BASHES.",
        "I CAN SEE THE FUTURE - TAKE ALL CARDS THAT GRANT YOU 'SCRY'.",
        "EMPTY YOURSELF - TAKE ALL EMPTY BODY, EMPTY FIST, AND EMPTY MIND CARDS.",
        "HUNGRY? - YOU MUST TAKE AT LEAST 2 FASTING CARDS IF THEY SHOW UP.",
        "THEY TOOK URRR JERBS - TAKE ALL FOREIGN INFLUENCE CARDS.",
        "BIGGER HAND IS BETTERER - IF THE CARD HAS 'RETAIN' ... TAKE IT.",
        "I AM... THE LAW - YOU MUST TAKE JUDGEMENT CARDS."
    ];
    public static uniqueChallenges: SpireUniqueChallenge[] = [
        {
            challengeName: "BOSS_RELICS",
            challenges: [
                "FLOWER POWER - IF VIOLET LOTUS IS OFFERED, YOU MUST TAKE IT. (OVERWRITTEN BY \"PRAISE SNECKO\" RULE)",
                "SLURP IT UP - IF HOLY WATER IS OFFERED, YOU MUST TAKE IT. (OVERWRITTEN BY \"PRAISE SNECKO\" RULE)"
            ]
        }
    ];
}