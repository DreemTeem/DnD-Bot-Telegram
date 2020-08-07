export class Defect {
    public static intro: string = "WE'RE GONNA CLAW OUR WAY TO VICTORY WITH THIS ONE, BOYS. \n DEFRAG YOUR BRAINS AND WISH UPON A STAR FOR CALIPERS. \n D E F E C T";
    public static imageName: string = "defect.jpg";
    public static challenges: string[] = [
        "EVER SEEN \"TOY STORY\"? - YOU MUST TAKE ALL CLAWS.",
        "STACK OVERFLOW - IF RECURSION IS AVAILABLE YOU MUST TAKE IT.",
        "ONE SHOT ONE KILL - YOU MUST TAKE ALL BULLSEYES.",
        "ONE FOR ALL! - YOUR DECK MUST BE THEMED AROUND 0-COST CARDS.",
        "I'MA FIREN MAH LAZAR - IF YOU SEE A HYPERBEAM, YOU HAVE TO TAKE IT.",
        "WHO LET SEPHEROTH PLAY? - TIME TO TAKE ALL METEOR STRIKES."
    ];
    public static uniqueChallenges: SpireUniqueChallenge[] = [
        {
            challengeName: "ORBS",
            challenges: [
                "ZIP ZAP MOTHERFUCKER - IT'S TIME TO \"FOCUS\" ON LIGHTNING ORBS.",
                "BABY IT'S COLD INSIDE MY HEART - IT'S TIME TO \"FOCUS\" ON FROST ORBS.",
                "DARKNESS CONSUMES ME - IT'S TIME TO \"FOCUS\" ON DARK ORBS."
            ]
        },
        {
            challengeName: "ORB_GEN",
            challenges: [
                "PASSIVE AGRESSIVE - YOU CAN'T GENERATE ORBS FROM ATTACK CARDS.",
                "AGRESSIVE MODE - YOU CAN'T GENERATE ORBS FROM SKILL CARDS (NOT COUNTING YOUR FIRST ZAP)."
            ]
        },
        {
            challengeName: "BOSS_RELICS",
            challenges: [
                "SURROUNDED BY ORBS - IF INSERTER ARM IS OFFERED, YOU MUST TAKE IT. (OVERWRITTEN BY \"PRAISE SNECKO\" RULE)",
                "CAN YOU PRONOUNCE IT? - IF NUCLEAR BATTERY IS OFFERED, YOU MUST TAKE IT. (OVERWRITTEN BY \"PRAISE SNECKO\" RULE)",
                "CHILL OUT - IF FROZEN CORE IS OFFERED, YOU MUST TAKE IT. (OVERWRITTEN BY \"PRAISE SNECKO\" RULE)"
            ]
        }
    ];
}