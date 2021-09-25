/**
 * Class with utility methods
 */
class Utils {
    /**
     * Generates a random value from 0 to the given value (inclusive)
     *
     * @param maxValue maximum value
     */
    public static getRandomNum(maxValue: number): number {
        return Math.round(Math.random() * maxValue);
    }

    /**
     * Generates a random color value
     */
    public static getRandomColor(): string {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    /**
     * Suspends program execution for a duration specified
     *
     * @param ms milliseconds
     */
    public static sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export default Utils;