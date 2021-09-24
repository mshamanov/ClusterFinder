import Field from "./Field.js";
import Point from "./Point.js";
import Cluster from "./Cluster.js";

class View {
    private static root: string = ".main";

    public static showButton(value: string = "", callback: (event: MouseEvent) => void): void {
        const buttonCallback = (event: MouseEvent) => {
            callback(event);
            this.hideButton();
        }

        const buttonElement: HTMLButtonElement = View.getButton();
        buttonElement.classList.remove("hidden");
        buttonElement.innerHTML = value;
        buttonElement.onclick = buttonCallback;
    }

    public static hideButton(): void {
        const buttonElement: HTMLButtonElement = View.getButton();
        if (!buttonElement.classList.contains("hidden")) {
            buttonElement.classList.add("hidden");
        }
    }

    private static getButton(): HTMLButtonElement {
        const buttonElement: HTMLButtonElement | null = document.querySelector(".control button");

        if (!buttonElement) {
            throw new Error(`Button element not found!`);
        }

        return buttonElement;
    }

    public static draw(field: Field) {
        const rootElement: HTMLElement | null = document.querySelector(this.root);

        if (!rootElement) {
            throw new Error(`Root element ${(View.root)} not found!`);
        }

        rootElement.innerHTML = "";

        for (let x = 0; x < field.size; x++) {
            const rowDiv = this.createDiv(`row-x-${x}`, "row");
            for (let y = 0; y < field.size; y++) {
                const colValue = field.getValue(x, y);
                const colDiv = this.createDiv(`col-x-${x}-y-${y}`, "point", colValue === -1 ? "" : String(colValue));
                rowDiv.appendChild(colDiv);
            }
            rootElement.appendChild(rowDiv)
        }
    }

    public static print(value: string): void {
        const outputElement: HTMLElement | null = document.querySelector(".output");

        if (!outputElement) {
            throw new Error(`Output element not found!`);
        }

        outputElement.innerHTML = value;
    }

    public static drawClusters(clusters: Cluster[]): void {
        clusters.forEach(cluster => {
            cluster.points.forEach(point => View.highlight(point));
        });
    }

    public static async blinkClusters(clusters: Cluster[]): Promise<any> {
        function blink(ms: number) {
            return new Promise(resolve => {
                setTimeout(() => {
                    clusters.forEach(cluster => {
                        cluster.points.forEach(point => View.highlight(point));
                    });
                    resolve(null);
                }, ms);
            });
        }

        const promises: Array<Promise<any>> = [];
        for (let i = 8; i > 0; i--) {
            promises.push(blink(i * 300));
        }

        await Promise.all(promises);
    }

    private static highlight(point: Point): void {
        const pointElement: HTMLElement | null = document.getElementById(`col-x-${point.x}-y-${point.y}`);

        if (!pointElement) {
            throw new Error(`Point element x: ${point.x}, y: ${point.y} not found!`);
        }

        pointElement.classList.toggle("highlighted-point");
    }

    private static createDiv(id: string, className?: string, value?: string) {
        const div: HTMLDivElement = document.createElement("div");
        div.setAttribute("id", id);

        if (className) {
            div.setAttribute("class", className);
        }

        if (value) {
            const p: HTMLParagraphElement = document.createElement("p");
            p.innerHTML = value;
            div.appendChild(p);
        }

        return div;
    }
}

export default View;