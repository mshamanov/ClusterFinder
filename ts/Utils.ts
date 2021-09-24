class Utils {
    public static getRandomNum(max: number): number {
        return Math.round(Math.random() * max);
    }

    public static getRandomColor(): string {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}

export default Utils;