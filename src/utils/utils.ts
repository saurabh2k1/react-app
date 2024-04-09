import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const range = (start: number, end: number): number[] => {
    let length: number = end -start + 1;
    return Array.from({length}, (_, idx) => idx + start);
};
