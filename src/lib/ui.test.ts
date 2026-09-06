import { describe, it, expect } from 'vitest';
import { validateCodeInput } from './ui';
import { ERROR_TYPES } from '@/constants/ui';

describe('validateCodeInput', () => {
    it('returns SHORT_CODE if the input is too short after trimming', () => {
        expect(validateCodeInput('   <div />   ')).toBe(ERROR_TYPES.SHORT_CODE);
        expect(validateCodeInput('1234567890123456789')).toBe(ERROR_TYPES.SHORT_CODE);
    });

    it('returns NON_UI_CODE if the input is long enough but does not contain UI code patterns', () => {
        const longNonUiCode = 'This is just a regular string that is definitely longer than twenty characters but has no UI code.';
        expect(validateCodeInput(longNonUiCode)).toBe(ERROR_TYPES.NON_UI_CODE);
    });

    it('returns null if the input is long enough and contains UI code patterns (HTML)', () => {
        const validHtml = '<div class="container">Hello World</div>';
        expect(validateCodeInput(validHtml)).toBeNull();
    });

    it('returns null if the input contains JSX components', () => {
        const validJsx = 'function App() { return <MyComponent prop="value">Content</MyComponent>; }';
        expect(validateCodeInput(validJsx)).toBeNull();
    });

    it('returns null if the input contains CSS blocks', () => {
        const validCss = '.my-class { display: flex; flex-direction: column; }';
        expect(validateCodeInput(validCss)).toBeNull();
    });
});
