async function yieldX() {
    return 42;
}

// This will unwrap the promise value recursively
async function unwrapPromiseValue(x: Promise<string | Promise<number>>, y: Promise<string | Promise<number>>) {
    const z = await Promise.all([x, y]);
    // const z: [string | Promise<number>, string | Promise<number>] in TS4.4 and below 😭
    // const z: [string | number, string | number] in TS4.5 and above 😊
    return z;
}