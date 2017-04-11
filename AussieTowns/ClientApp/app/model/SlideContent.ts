export enum Direction { UNKNOWN, NEXT, PREV }

export class SlideContent {
    image: string;
    text: string;
    index: number;
    direction: Direction;
    active: boolean;
}