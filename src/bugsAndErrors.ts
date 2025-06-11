export class MultiplicatorUnitFailure extends Error {
    constructor(message: string) {
        super(message);
    }
}

export function primitiveMultiply(a: number, b: number): number {
    const randomChance = Math.random();
    if (randomChance < 0.8) {
        throw new MultiplicatorUnitFailure("MultiplicatorUnitFailure");
    }
    // Simulate a successful multiplication 20% of the time
    return a * b;
}

export function retryPrimitiveMultiply(a: number, b: number): number {
    let result: number;
    while (true) {
        try {
            result = primitiveMultiply(a, b);
            break; // Exit loop if multiplication is successful
        } catch (error) {
            if (error instanceof MultiplicatorUnitFailure) {
                // Optionally log or handle retry
            }
        }
    }
    return result;
}