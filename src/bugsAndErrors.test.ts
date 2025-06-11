import { MultiplicatorUnitFailure } from './bugsAndErrors';
import { primitiveMultiply } from './bugsAndErrors';
import { retryPrimitiveMultiply } from './bugsAndErrors';

describe('MultiplicatorUnitFailure', () => {
    it('should be an instance of Error', () => {
        const err = new MultiplicatorUnitFailure('fail');
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('fail');
    });
});

describe('primitiveMultiply', () => {
    it('should throw MultiplicatorUnitFailure about 80% of the time', () => {
        let throws = 0;
        let passes = 0;
        for (let i = 0; i < 100; i++) {
            try {
                primitiveMultiply(2, 3);
                passes++;
            } catch (e) {
                if (e instanceof MultiplicatorUnitFailure) throws++;
            }
        }
        // Should throw more than it passes
        expect(throws).toBeGreaterThan(passes);
    });
    it('should return the product if no error is thrown', () => {
        // Mock Math.random to always return > 0.8
        const originalRandom = Math.random;
        Math.random = () => 0.9;
        expect(primitiveMultiply(2, 3)).toBe(6);
        Math.random = originalRandom;
    });
});

describe('retryPrimitiveMultiply', () => {
    it('should eventually return the product', () => {
        // Mock Math.random to fail twice, then succeed
        const sequence = [0.1, 0.2, 0.9];
        let call = 0;
        const originalRandom = Math.random;
        Math.random = () => sequence[call++];
        expect(retryPrimitiveMultiply(2, 3)).toBe(6);
        Math.random = originalRandom;
    });
});
