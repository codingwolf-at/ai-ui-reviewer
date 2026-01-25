export const INPUT_TYPES = {
    CODE: 'code',
    IMG: 'image'
};

export const INPUT_TABS = [
    { id: INPUT_TYPES.CODE, label: "Code" },
    { id: INPUT_TYPES.IMG, label: "Image" }
];

export const MIN_CODE_LENGTH = 20;

export const ERROR_TYPES = {
    API: 'api',
    NON_UI_CODE: 'non_ui_code',
    NON_UI_IMAGE: 'non_ui_image',
    SHORT_CODE: 'short_code',
    IMAGE_TOO_SMALL: 'image_too_small',
    IMAGE_DIMENSIONS_TOO_SMALL: 'image_dimensions_too_small'
};

export const ERROR_MSGS = {
    [ERROR_TYPES.API]: {
        text: "Couldn’t analyze the UI. Please try again.",
        subText: "This usually happens if OpenRouter is temporarily unavailable or the credit balance has been exhausted. If it’s a credit issue, please contact me via email, LinkedIn, or X to have the balance restored."
    },
    [ERROR_TYPES.NON_UI_CODE]: {
        text: "Invalid Input",
        subText: "We couldn’t detect UI code. Try pasting HTML, JSX, or CSS."
    },
    [ERROR_TYPES.NON_UI_IMAGE]: {
        text: "Invalid Input",
        subText: "Please upload a screenshot of an app or website UI."
    },
    [ERROR_TYPES.SHORT_CODE]: {
        text: "Input too short",
        subText: "Please paste more UI code so we can analyze it properly."
    },
    [ERROR_TYPES.IMAGE_TOO_SMALL]: {
        text: "Image too small",
        subText: "Please upload a screenshot that is at least 5KB in size and clearly shows the UI."
    },
    [ERROR_TYPES.IMAGE_DIMENSIONS_TOO_SMALL]: {
        text: "Image dimensions are too small",
        subText: "Image resolution is too low. Minimum required dimensions are 200 × 200 pixels."
    }
};