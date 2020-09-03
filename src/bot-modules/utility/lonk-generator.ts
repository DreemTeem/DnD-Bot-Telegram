import { Image, Canvas } from "canvas";

export class LonkGenerator {
    public static randomizeLonkImage(image: Image): Buffer {
        const sideLength = image.width / 2;
        const canvas: Canvas = new Canvas(sideLength, sideLength);
        const ctx = canvas.getContext('2d');
        const angle = Math.floor(Math.random() * 360) + 1;
        let scale = Math.random();
        let anger = 0;


        if (scale < 0.375) {
            // Minimum scale before the image is too small
            scale = 0.375;
        } else if (scale > 0.5) {
            // Maximum scale before the image is too big to handle the random scale below
            scale = 0.5;
        }

        // Random number to determine if we add more scale and anger
        const d100 = Math.floor(Math.random() * 100) + 1;

        if (d100 > 50) {
            const rand50 = Math.random();
            if (rand50 > 0.25) {
                anger += 0.25;
            } else {
                anger += rand50;
            }
            scale += rand50;
        }

        if (d100 >= 90) {
            const rand90 = Math.random();
            if (rand90 > 0.5) {
                anger += 0.5;
            } else {
                anger += rand90;
            }
            scale += Math.random();
        }

        // Draw the randomized Lonk
        ctx.fillStyle = 'rgba(55,89,117,1)';
        ctx.fillRect(0, 0, sideLength, sideLength);
        ctx.translate(sideLength / 2, sideLength / 2);
        ctx.scale(scale, scale);
        ctx.rotate(angle * Math.PI / 180);
        ctx.translate(- sideLength / 2, - sideLength / 2);
        ctx.drawImage(image, -sideLength / 2, -sideLength / 2);

        // Overlay the anger filter
        ctx.resetTransform();
        ctx.fillStyle = 'rgba(255,0,0,' + anger + ')';
        ctx.fillRect(0, 0, sideLength, sideLength);

        return canvas.toBuffer('image/png');
    }
}