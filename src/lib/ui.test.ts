import { describe, it, expect } from 'vitest';
import { getCurrentInputKey } from './ui';
import { INPUT_TYPES } from '@/constants/ui';

describe('getCurrentInputKey', () => {
    it('should return correct key for code mode', () => {
        expect(getCurrentInputKey(INPUT_TYPES.CODE, '<div></div>', null)).toBe('code:<div></div>');
    });

    it('should return correct key for image mode with valid file', () => {
        const file = new File([''], 'test.png');
        expect(getCurrentInputKey(INPUT_TYPES.IMG, '', file)).toBe(`image:test.png-${file.size}`);
    });

    it('should return correct key for image mode with null file', () => {
        expect(getCurrentInputKey(INPUT_TYPES.IMG, '', null)).toBe('image:undefined-undefined');
    });

    it('should return null for unknown input mode', () => {
        expect(getCurrentInputKey('unknown', '', null)).toBeNull();
    });
});
