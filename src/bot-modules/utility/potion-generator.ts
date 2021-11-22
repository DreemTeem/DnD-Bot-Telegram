import { Potions } from "../data-assets/dnd/potions";

export class PotionGenerator {
    private static rollDice(sides: number): number {
        return Math.floor(Math.random() * sides) + 1;
    }

    public static getPotionTitle(diceRoll: number): string {
        if (diceRoll > Potions.titles.length) {
            diceRoll = Potions.titles.length;
        }
        return Potions.titles[diceRoll - 1];
    }

    public static getPotionEffect(diceRoll: number): string {
        if (diceRoll > Potions.effects.length) {
            diceRoll = Potions.effects.length;
        }
        return Potions.effects[diceRoll - 1];
    }

    public static getPotionStrength(diceRoll: number): string {
        if (diceRoll > Potions.strengths.length) {
            diceRoll = Potions.strengths.length;
        }
        return Potions.strengths[diceRoll - 1];
    }

    public static getPotionSideEffect(diceRoll: number): string {
        if (diceRoll > Potions.sideEffects.length) {
            diceRoll = Potions.sideEffects.length;
        }
        return Potions.sideEffects[diceRoll - 1];
    }

    public static getPotionContainer(diceRoll: number): string {
        if (diceRoll > Potions.containers.length) {
            diceRoll = Potions.containers.length;
        }
        return Potions.containers[diceRoll - 1];
    }

    public static getPotionPrimaryAppearance(diceRoll: number): string {
        if (diceRoll > Potions.appearancePrimarys.length) {
            diceRoll = Potions.appearancePrimarys.length;
        }
        return Potions.appearancePrimarys[diceRoll - 1];
    }

    public static getPotionSecondaryAppearance(diceRoll: number): string {
        if (diceRoll > Potions.appearanceSecondarys.length) {
            diceRoll = Potions.appearanceSecondarys.length;
        }
        return Potions.appearanceSecondarys[diceRoll - 1];
    }

    public static getPotionTexture(diceRoll: number): string {
        if (diceRoll > Potions.textures.length) {
            diceRoll = Potions.textures.length;
        }
        return Potions.textures[diceRoll - 1];
    }

    public static getPotionTasteOrSmell(diceRoll: number): string {
        if (diceRoll > Potions.tastesAndSmells.length) {
            diceRoll = Potions.tastesAndSmells.length;
        }
        return Potions.tastesAndSmells[diceRoll - 1];
    }

    public static getPotionLabel(diceRoll: number): string {
        if (diceRoll > Potions.labels.length) {
            diceRoll = Potions.labels.length;
        }
        return Potions.labels[diceRoll - 1];
    }

    public static generatePotionString(): string {
        const titleRoll: number = PotionGenerator.rollDice(10);
        const effectRoll: number = PotionGenerator.rollDice(100);
        const strengthRoll: number = PotionGenerator.rollDice(10);
        const sideEffectRoll: number = PotionGenerator.rollDice(100);
        const containerRoll: number = PotionGenerator.rollDice(20);
        const primaryAppearanceRoll: number = PotionGenerator.rollDice(20);
        const secondaryAppearanceRoll: number = PotionGenerator.rollDice(20);
        const textureRoll: number = PotionGenerator.rollDice(10);
        const tasteRoll: number = PotionGenerator.rollDice(100);
        const smellRoll: number = PotionGenerator.rollDice(100);
        const labelRoll: number = PotionGenerator.rollDice(100);

        return 'A/An ' + PotionGenerator.getPotionTitle(titleRoll) + 'of \n' +
            PotionGenerator.getPotionEffect(effectRoll) + '\n' +
            'The strength is' + PotionGenerator.getPotionStrength(strengthRoll) + '\n' +
            'It also causes ' + PotionGenerator.getPotionSideEffect(sideEffectRoll) + '\n' +
            'It comes in a/an' + PotionGenerator.getPotionContainer(containerRoll) + '\n' +
            'It appears ' + PotionGenerator.getPotionPrimaryAppearance(primaryAppearanceRoll) +
            'and is also ' + PotionGenerator.getPotionSecondaryAppearance(secondaryAppearanceRoll) + '\n' +
            PotionGenerator.getPotionTexture(textureRoll) + '\n' +
            'It tastes like ' + PotionGenerator.getPotionTasteOrSmell(tasteRoll) + '\n' +
            'It smells like ' + PotionGenerator.getPotionTasteOrSmell(smellRoll) + '\n' +
            'The label is ' + PotionGenerator.getPotionLabel(labelRoll) + '\n';
    }
}