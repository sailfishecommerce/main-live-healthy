/* eslint-disable @next/next/no-img-element */

export default function useCurrencyLangSelector() {
    function displayLanguageFlag(lang: string | undefined) {
        switch (lang) {
            case "English": {
                return "/en.png";
            }
            case "French": {
                return "/fr.png";
            }
            case "Italiano": {
                return "/it.png";
            }
            default:
                return undefined;
        }
    }

    function displayCurencySymbol(lang: string | undefined) {
        switch (lang) {
            case "usd": {
                return "$";
            }
            case "eur": {
                return "€";
            }
            case "jpy": {
                return "¥";
            }
            default:
                return null;
        }
    }

    return {
        displayLanguageFlag,
        displayCurencySymbol,
    };
}
