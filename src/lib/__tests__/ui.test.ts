import { fileToBase64 } from '../ui';

describe('fileToBase64', () => {
  let file: File;

  beforeEach(() => {
    file = new File(['test content'], 'test.png', { type: 'image/png' });

    // Mock global FileReader
    global.FileReader = jest.fn(() => ({
      readAsDataURL: jest.fn(),
      onload: null,
      onerror: null,
      result: null,
    })) as unknown as typeof FileReader;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should successfully convert file to base64', async () => {
    const mockResult = 'data:image/png;base64,dGVzdCBjb250ZW50';

    const promise = fileToBase64(file);

    // Get the instance of FileReader created in fileToBase64
    const readerInstance = (global.FileReader as unknown as jest.Mock).mock.results[0].value;

    // Simulate onload event
    readerInstance.result = mockResult;
    if (readerInstance.onload) {
        readerInstance.onload();
    }

    await expect(promise).resolves.toBe(mockResult);
  });

  it('should reject if FileReader result is not a string', async () => {
    const promise = fileToBase64(file);

    const readerInstance = (global.FileReader as unknown as jest.Mock).mock.results[0].value;

    // Simulate onload event with ArrayBuffer instead of string
    readerInstance.result = new ArrayBuffer(8);
    if (readerInstance.onload) {
        readerInstance.onload();
    }

    await expect(promise).rejects.toThrow('FileReader result was not a string.');
  });

  it('should reject if FileReader encounters an error', async () => {
    const promise = fileToBase64(file);

    const readerInstance = (global.FileReader as unknown as jest.Mock).mock.results[0].value;

    // Simulate onerror event
    if (readerInstance.onerror) {
        readerInstance.onerror();
    }

    await expect(promise).rejects.toThrow('Failed to read file.');
  });
});
