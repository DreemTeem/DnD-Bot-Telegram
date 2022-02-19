import { Canvas, Image } from 'canvas';

export class ManhattanGenerator {
    private static drinkImages: Image[] = [];

    private static readonly numCol: number = 3;

    public static async getManhattanImage(): Promise<Canvas> {
        return new Promise<Canvas>(async (resolve, reject) => {
            try {
                await this.loadDrinkImages();
                resolve(this.getManhattanCanvas());
            } catch (error) {
                console.log('ISSUES GENERATING IMAGES FROM ');
                console.log(error);
                reject(undefined);
            }
        });
    }

    private static getUniqueRandomNumber(limit: number, usedNumbers: number[]): number {
        let newRandomNumber = Math.floor(Math.random() * limit) + 1;
        while (usedNumbers.indexOf(newRandomNumber) >= 0) {
            newRandomNumber = Math.floor(Math.random() * limit) + 1;
        }

        return newRandomNumber;
    }

    private static getManhattanCanvas(): Canvas {
        const canvas: Canvas = new Canvas(1000, 200);
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 600, 400);
        const numberOfManhattans: number = 5;
        const manhattenIndexsUsed: number[] = [];
        let currentCol: number = 0;
        let currentRow: number = 0;

        for (let i = 0; i < numberOfManhattans; i++) {
            const newManhattanIndex: number = this.getUniqueRandomNumber(17, manhattenIndexsUsed);
            manhattenIndexsUsed.push(newManhattanIndex);
            let drinkImage: Image = this.drinkImages[newManhattanIndex - 1];
            ctx.drawImage(drinkImage, currentCol, currentRow, 200, 200);
            currentCol += 200;
        }

        return canvas;
    }

    private static async loadDrinkImages(): Promise<any> {
        // Only load images if they've not been loaded yet.
        if (
            this.drinkImages[0]
        ) {
            return Promise.resolve();
        }

        const promises: Promise<any>[] = [];
        for (let i = 0; i < 17; i++) {
            let whiskeyPromise = this.loadCanvasImage('./assets/manhattan/manhattan' + (i + 1) + '.jpg');
            whiskeyPromise.then((image: Image) => {
                this.drinkImages.push(image);
            });
            promises.push(whiskeyPromise);
        }

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