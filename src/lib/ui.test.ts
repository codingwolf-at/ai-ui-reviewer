import { enforceMinDelay } from "./ui";

describe("enforceMinDelay", () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.spyOn(Date, "now");
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.restoreAllMocks();
    });

    it("should wait for the remaining time if elapsed time is less than minDelay", async () => {
        const startTime = 1000;
        const minDelay = 1500;
        const currentTime = 2000; // 1000ms elapsed

        (Date.now as jest.Mock).mockReturnValue(currentTime);

        const promise = enforceMinDelay(startTime, minDelay);

        // Fast-forward by remaining time (500ms)
        jest.advanceTimersByTime(minDelay - (currentTime - startTime));

        await promise;

        expect(Date.now).toHaveBeenCalledTimes(1);
    });

    it("should not wait if elapsed time is greater than or equal to minDelay", async () => {
        const startTime = 1000;
        const minDelay = 1500;
        const currentTime = 3000; // 2000ms elapsed (>= 1500ms)

        (Date.now as jest.Mock).mockReturnValue(currentTime);

        const promise = enforceMinDelay(startTime, minDelay);

        // No need to advance timers, it should resolve immediately
        await promise;

        expect(Date.now).toHaveBeenCalledTimes(1);
    });

    it("should use the default minDelay of 1500ms", async () => {
        const startTime = 1000;
        const currentTime = 2000; // 1000ms elapsed

        (Date.now as jest.Mock).mockReturnValue(currentTime);

        const promise = enforceMinDelay(startTime);

        // Fast-forward by remaining time (1500 - 1000 = 500ms)
        jest.advanceTimersByTime(500);

        await promise;

        expect(Date.now).toHaveBeenCalledTimes(1);
    });
});
