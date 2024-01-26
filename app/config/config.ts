type ValidationConfig = {
    lang: string; // Language code for the validation configuration.
    userNameMinChars: number; // Minimum number of characters allowed for a username.
    validRegex: string | any;
    country: string;
    code: string;
    formatErrorMsg?: string;
};

type ValidationConfigs = {
    [key: string]: ValidationConfig;
};

// Collection of validation configurations for different countries or scenarios.
export const validations: ValidationConfigs = {
    IN: {
        lang: 'en',
        userNameMinChars: 5,
        validRegex: /^[Ii][a-zA-Z]*$/,
        country: "India",
        code: "IN",
        formatErrorMsg: 'USERNAME_IN_FORMAT_ERR'
    },
    FR: {
        lang: 'fr',
        userNameMinChars: 6,
        validRegex: /^FR[a-zA-Z0-9%_]*$/,
        country: "France",
        code: "FR",
        formatErrorMsg: 'USERNAME_FR_FORMAT_ERR'
    },
    AE: {
        lang: 'ar',
        userNameMinChars: 8,
        validRegex: /^[a-zA-Z0-9]+$/,
        country: "UAE",
        code: "AE"
    }
};

export const languageOptions = [
    { value: "en", label: "English" },
    { value: "fr", label: "Français" },
    { value: "ar", label: "عربي" }
];

export const MIN_PASSWORD_LENGTH = 8
export const MIN_USERNAME_LENGTH = 6
