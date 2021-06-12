export class CustomChallenges {
    public static easyIndexes: number[] = []; // TODO - Populate and use
    public static hardCombos: number[] = []; // TODO - Populate and use
    public static easyCombos: number[] = []; // TODO - Populate and use
    public static dailyModsIndex: number = 0;
    public static challenges: string[] = [
        "[DAILY MODS] - LOOKS LIKE YOU GET TO ROLL IN-GAME INSTEAD!", // TODO - This overrides all other mods. We need to only use this if it's selected
        "[THE ENDING] - IT'S ALMOST LIKE YOU'RE PLAYING THE ACTUAL GAME!",
        //"[ENDLESS]", // TODO - Endless runs don't match what we want to do really...
        //"[BLIGHT CHEST]", // TODO - This can only be enabled WITH endless.
        "[HOARDER] - NO REMOVE, ONLY TAKE.",
        "[INSANITY] - GOOD LUCK GETTING RELEVANT UPGRADES.",
        "[CHIMERA] - ENJOY NOT HAVING A WAY OUT OF WRATH, DICKHEAD.",
        "[PRAISE SNECKO] - THE SNECKO GIVETH AND THE SNECKO TAKETH AWAY.",
        "[SHINY] - HOPE YOUR CHARACTER HAS GOOD RARES.",
        "[SPECIALIZED] - DID YOU ALSO GET HOARDER? NO? OH THANK GOODNESS.",
        "[VINTAGE] - WHO NEEDS CARDS? RELICS ARE THE NEW CARDS.",
        "[CONTROLLED CHAOS] - FUN FACT, YOU GET FROZEN EYE TO NEVER USE WITH THIS.",
        "[INCEPTION] - THE TOP DON'T STOP.",
        "[ALL STAR] - COLORLESS CARDS AREN'T ALWAYS BAD...RIGHT?",
        "[DIVERSE] - CONGRATULATIONS! IT'S PRISMATIC SHARD.", // TODO - Do we need to make this not clash with the other colored options?
        "[RED CARDS] - GET SWOLE OR WHATEVER I GUESS.",
        "[GREEN CARDS] - WELL NOW YOU CAN ACCESS INTANGIBLE I GUESS.",
        "[BLUE CARDS] - OOOOORBS...OR CLAWS I GUESS.",
        "[PURPLE CARDS] - ENTER WRATH. FORGET TO HAVE EXIT OUT OF WRATH I GUESS.",
        "[COLORLESS CARDS] - ENJOY GETTING YOUR CARD REWARDS CLOGGED WITH BAD CARDS I GUESS.",
        "[HEIRLOOM] - FREE SHIT!",
        "[TIME DILATION] - FINALLY, GIANT HEAD'S TIME TO SHINE.",
        "[FLIGHT] - ALSO KNOWN AS \"TAKE ALL ELITES FOREVER\"",
        "[MY TRUE FORM] - ACT I JUST GOT INCREDIBLY EASY OR INCREDIBLE HARD.",
        "[DEADLY EVENTS] - I SEE THIS AS AN ABSOLUTE WIN!",
        // "[ONE HIT WONDER] - HOPE YOU CAN CLIMB WHILE DEAD.", // TODO - FIGURE OUT WHAT NEEDS TO PAIR WITH THIS TO RE-ENABLE. IT'S TOO HARD OTHERWISE
        "[CURSED RUN] - DEREK? DEREK.",
        "[BIG GAME HUNTER] - DON'T YOU JUST WANT A DECK FULL OF RARES?",
        "[LETHALITY] - DID YOU GET ONE HIT WONDER? NO? GOOD THEN I DON'T HAVE TO FIX THIS.",
        "[MIDAS] - PRAY FOR FUSION HAMMER.",
        "[NIGHT TERRORS] - REGAL PILLOW LOOKS NICE, BUT CAN'T HELP YOU ANYMORE.",
        "[TERMINAL] - THIS SEEMS GREAT IN ACT I. NOT SO MUCH IN ACT III.",
        "[CERTAIN FUTURE] - DID YOU GET FLIGHT? WHAT A LOSER."
    ];
    public static uniqueChallenges: SpireUniqueChallenge[] = [
        {
            challengeName: "DRAFT",
            challenges: [
                "[DRAFT] - PICK WHAT YOU THINK IS BEST AND THEN GET NO SYNERGIES.",
                "[SEALED DECK] - NO JOKE HERE, ENJOY."
            ]
        },
        {
            challengeName: "BINARY",
            challenges: [
                "[BINARY]",
                "[STARTER DECK]"
            ]
        }
    ];
}