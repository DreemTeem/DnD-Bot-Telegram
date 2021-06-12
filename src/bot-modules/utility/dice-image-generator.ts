import { Canvas, Image } from 'canvas';
import { RollResult } from '../commands/roll';

export class DiceImageGenerator {
    private static d20Image: Image;
    private static d12Image: Image;
    private static d10Image: Image;
    private static d8Image: Image;
    private static d6Image: Image;
    private static d4Image: Image;

    private static readonly numCol: number = 3;

    public static async getDiceImage(rollResult: RollResult): Promise<Canvas> {
        return new Promise<Canvas>(async (resolve, reject) => {
            try {
                await this.loadDiceImages();
                resolve(this.getRollResultCanvas(rollResult));
            } catch (error) {
                console.log('ISSUES GENERATING IMAGES FROM ' + rollResult);
                reject(undefined);
            }
        });
    }

    private static getDiceCanvas(diceSides: number, roll: number): Canvas {
        const canvas: Canvas = new Canvas(100, 100);
        const ctx = canvas.getContext('2d');
        let diceImage: Image;

        switch (diceSides) {
            case 4:
                diceImage = this.d4Image;
                break;
            case 6:
                diceImage = this.d6Image;
                break;
            case 8:
                diceImage = this.d8Image;
                break;
            case 10:
                diceImage = this.d10Image;
                break;
            case 12:
                diceImage = this.d12Image;
                break;
            default:
                diceImage = this.d20Image;
                break;
        }

        ctx.drawImage(diceImage, 0, 0, 100, 100);
        // Select the font size and type from one of the natively available fonts
        ctx.font = '30px sans-serif';
        // Select the style that will be used to fill the text in
        ctx.fillStyle = 'red';
        ctx.strokeStyle = '#000000';
        // Actually fill the text with a solid color
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const textY = diceSides === 6 ? 28 : 50;
        ctx.fillText('' + roll, 50, textY);
        ctx.strokeText('' + roll, 50, textY);

        return canvas;
    }

    private static getRollResultCanvas(rollResult: RollResult): Canvas {
        const canvasWidth: number = rollResult.numberOfDice > this.numCol ? (this.numCol * 100) : (rollResult.numberOfDice * 100);
        const canvasHeight: number = Math.ceil(rollResult.numberOfDice / this.numCol) * 100;
        const canvas: Canvas = new Canvas(canvasWidth, canvasHeight);
        const ctx = canvas.getContext('2d');
        let currentRow: number = 0;
        let currentCol: number = 0;
        for (let i = 0; i < rollResult.numberOfDice; i++) {
            const diceCanvas: Canvas = this.getDiceCanvas(rollResult.diceSides, rollResult.rolls[i]);
            ctx.drawImage(diceCanvas, currentCol, currentRow, 100, 100);
            currentCol += 100;
            if ((currentCol / 100) === this.numCol) {
                currentCol = 0;
                currentRow += 100;
            }
        }
        return canvas;
    }

    private static getRollResultsCanvas(rollResults: RollResult[]): Canvas {
        const canvasChunks: Canvas[] = [];
        let canvasWidth: number = 0;
        let canvasHeight: number = 0;
        rollResults.forEach((rollResult: RollResult) => {
            const rollResultCanvas: Canvas = this.getRollResultCanvas(rollResult);
            if (rollResultCanvas.width > canvasWidth) {
                canvasWidth = rollResultCanvas.width;
            }
            canvasHeight += rollResultCanvas.height;
            canvasChunks.push(rollResultCanvas);
        });

        const canvas: Canvas = new Canvas(canvasWidth, canvasHeight);
        const ctx = canvas.getContext('2d');

        let runningHeight: number = 0;

        canvasChunks.forEach((canvasChunk: Canvas) => {
            ctx.drawImage(canvasChunk, 0, runningHeight, canvasChunk.width, canvasChunk.height);
            runningHeight += canvasChunk.height;
        });

        return canvas;
    }

    private static async loadDiceImages(): Promise<any> {
        // Only load images if they've not been loaded yet.
        if (
            this.d20Image &&
            this.d12Image &&
            this.d10Image &&
            this.d8Image &&
            this.d6Image &&
            this.d4Image
        ) {
            return Promise.resolve();
        }
        const d4Promise = this.loadCanvasImage('./assets/dice/d4.png');
        d4Promise.then((image: Image) => {
            this.d4Image = image;
        });
        const d6Promise = this.loadCanvasImage('./assets/dice/d6.png');
        d6Promise.then((image: Image) => {
            this.d6Image = image;
        });
        const d8Promise = this.loadCanvasImage('./assets/dice/d8.png');
        d8Promise.then((image: Image) => {
            this.d8Image = image;
        });
        const d10Promise = this.loadCanvasImage('./assets/dice/d10.png');
        d10Promise.then((image: Image) => {
            this.d10Image = image;
        });
        const d12Promise = this.loadCanvasImage('./assets/dice/d12.png');
        d12Promise.then((image: Image) => {
            this.d12Image = image;
        });
        const d20Promise = this.loadCanvasImage('./assets/dice/d20.png');
        d20Promise.then(image => {
            this.d20Image = image;
        });

        const promises: Promise<any>[] = [
            d4Promise,
            d6Promise,
            d8Promise,
            d10Promise,
            d12Promise,
            d20Promise
        ];

        return Promise.all(promises);
    }

    private static loadCanvasImage(url: string): Promise<any> {
        const image = new Image();
        const imagePromise = new Promise((resolve, reject) => {
            image.onload = () => resolve(image);
            image.onerror = reject;
        });
        image.src = url;
        return imagePromise;
    }
}