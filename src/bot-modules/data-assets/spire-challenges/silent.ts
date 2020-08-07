export class Silent {
    public static intro: string = "HUSH YOUR MOUTH IT'S TIME TO POISON SOME FOOLS. \n LEAVE THE SHIVS BEHIND AND BECOME A SPOOKY GHOST. \n S I L E N T";
    public static imageName: string = "silent.jpg";
    public static challenges: string[] = [
        "NOTHING PERSONAL, KID - IT'S TIME FOR A SHIV DECK. TAKE ALL SHIVS AND SHIV POWERS.",
        "YOU ARE A SPOOKY GHOST - YOU MUST TAKE ALL AVAILABLE APPARITION.",
        "LET THEM COME TO YOU - CALTROPS MUST NOW BE TAKEN.",
        "REMOVING TOXICITY FROM MY LIFE - YOU AREN'T ALLOWED TO PICK UP CARDS OR POTIONS THAT CAUSE POISON.",
        "EXTREMELY SHOWY - IF GRAND FINALE IS AVAILABLE, YOU MUST TAKE IT."
    ];
    public static uniqueChallenges: SpireUniqueChallenge[] = [
        {
            challengeName: "BOSS_RELICS",
            challenges: [
                "IT'S BASICALLY A SHIV RUN - IF WRIST BLADE IS OFFERED, YOU MUST TAKE IT. (OVERWRITTEN BY \"PRAISE SNECKO\" RULE)",
                "LET'S GO FLY A KITE - IF HOVERING KITE IS OFFERED, YOU MUST TAKE IT. (OVERWRITTEN BY \"PRAISE SNECKO\" RULE)",
                "DANGER NOODLE -  IF RING OF THE SERPENT IS OFFERED, YOU MUST TAKE IT. (OVERWRITTEN BY \"PRAISE SNECKO\" RULE)"
            ]
        }
    ];
}