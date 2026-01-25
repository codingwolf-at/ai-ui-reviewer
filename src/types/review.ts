export type ReviewResult = {
    ui: string,
    accessibility: string,
    code: string
};

export type ReviewRequest = { type: "code"; code: string } | { type: "image"; image: string };

export type ReviewApiResponse =
    | {
        success: true;
        data: ReviewResult;
    }
    | {
        success: false;
        error: string;
    };
