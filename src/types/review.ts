export type ReviewResult = {
    ui: string,
    accessibility: string,
    code: string
};

export type ReviewRequest = { type: "code"; code: string } | { type: "image"; image: string };
