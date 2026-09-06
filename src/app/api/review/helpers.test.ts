import { describe, it, expect } from 'vitest';
import { cleanText } from './helpers';

describe('cleanText', () => {
    it('should return plain text as is', () => {
        expect(cleanText('hello world')).toBe('hello world');
    });

    it('should trim surrounding whitespace', () => {
        expect(cleanText('  hello world  ')).toBe('hello world');
        expect(cleanText('\n\thello world\n')).toBe('hello world');
    });

    it('should remove inline backticks', () => {
        expect(cleanText('hello `world`')).toBe('hello world');
        expect(cleanText('`hello` `world`')).toBe('hello world');
    });

    it('should remove fenced code blocks', () => {
        expect(cleanText('hello\n```\nworld\n```')).toBe('hello');
    });

    it('should remove fenced code blocks with language specifiers', () => {
        expect(cleanText('hello\n```json\n{"key": "value"}\n```')).toBe('hello');
        expect(cleanText('```typescript\nconst a = 1;\n```')).toBe('');
    });

    it('should remove multiple fenced code blocks', () => {
        const input = `start\n\`\`\`js\nconst a = 1;\n\`\`\`\nmiddle\n\`\`\`html\n<div></div>\n\`\`\`\nend`;
        expect(cleanText(input)).toBe('start\n\nmiddle\n\nend');
    });

    it('should handle mixed inline backticks and fenced code blocks', () => {
        const input = `Here is \`inline\` code and a block:\n\`\`\`\nblock\n\`\`\``;
        expect(cleanText(input)).toBe('Here is inline code and a block:');
    });

    it('should handle unclosed fenced blocks as regular text, removing only the backticks', () => {
        // The regex /```[\s\S]*?```/g only matches fully closed blocks.
        // An unclosed block will be handled by the second regex /`/g which removes all backticks.
        const input = `hello\n\`\`\`\nworld`;
        expect(cleanText(input)).toBe('hello\n\nworld');
    });

    it('should return empty string for empty string input', () => {
        expect(cleanText('')).toBe('');
    });

    it('should return empty string if input contains only code blocks', () => {
        expect(cleanText('```json\n{}\n```')).toBe('');
        expect(cleanText('```\ncode\n```\n```\nmore code\n```')).toBe('');
    });
});