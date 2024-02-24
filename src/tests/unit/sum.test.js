const sum = require("../../utils/sum"); 


describe('sum function', () => {
    it('should return the sum of two positive numbers', () => {
        expect(sum(2, 3)).toBe(5);
    });

    it('should return the sum of a positive and a negative number', () => {
        expect(sum(5, -3)).toBe(2);
    });

    it('should return the sum of two negative numbers', () => {
        expect(sum(-10, -5)).toBe(-15);
    });

    it('should return the sum of zero and a number', () => {
        expect(sum(0, 7)).toBe(7);
    });

    it('should return the sum of two zeros', () => {
        expect(sum(0, 0)).toBe(0);
    });
});
