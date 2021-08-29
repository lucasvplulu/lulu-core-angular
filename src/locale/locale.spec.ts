import * as enUs from "./en-US.json";
import * as esEs from "./es-ES.json";
import * as ptBr from "./pt-BR.json";

describe("Locale", () => {
    const allTranslations = Object.keys({ ...ptBr, ...enUs, ...esEs });
    const allTranslationsSet = new Set(allTranslations);
    const ptBrVerify = new Set();
    const enUsVerify = new Set();
    const esEsVerify = new Set();

    function verifyTranslationOnPtBr(verifiedTranslations: string[]): Object {
        const missingTranslations = {};
        verifiedTranslations.forEach(item => {
            if (ptBr.hasOwnProperty(item)) {
                missingTranslations[item] = ptBr[item];
            }
        });

        return missingTranslations;
    }

    it("Should the 'ptBr' translation keys be in all files", () => {
        allTranslationsSet.forEach((translateKey) => {
            if (!ptBr.hasOwnProperty(translateKey)) {
                ptBrVerify.add(translateKey);
            }
        });

        expect(ptBrVerify.size).toBeFalsy(ptBrVerify);
    });

    it("Should the 'enUs' translation keys be in all files", () => {
        allTranslationsSet.forEach((translateKey) => {
            if (!enUs.hasOwnProperty(translateKey)) {
                enUsVerify.add(translateKey);
            }
        });

        expect(enUsVerify.size).toBeFalsy(enUsVerify);
    });

    it("Should the 'esEs' translation keys be in all files", () => {
        allTranslationsSet.forEach((translateKey) => {
            if (!esEs.hasOwnProperty(translateKey)) {
                esEsVerify.add(translateKey);
            }
        });

        expect(esEsVerify.size).toBeFalsy(esEsVerify);
    });

    it("Should 'ptBr' not have empty entries on translations", () => {
        const verifiedTranslation = Object.keys(ptBr)
            .filter(translateKey => !ptBr[translateKey]);

        const missingTranslations = verifyTranslationOnPtBr(verifiedTranslation);
        expect(verifiedTranslation.length).toBeFalsy(missingTranslations);
    });

    it("Should 'enUs' not have empty entries on translations", () => {
        const verifiedTranslation = Object.keys(enUs)
            .filter(translateKey => !enUs[translateKey]);

        const missingTranslations = verifyTranslationOnPtBr(verifiedTranslation);
        expect(verifiedTranslation.length).toBeFalsy(missingTranslations);
    });

    it("Should 'esEs' not have empty entries on translations", () => {
        const verifiedTranslation = Object.keys(esEs)
            .filter(translateKey => !esEs[translateKey]);

        const missingTranslations = verifyTranslationOnPtBr(verifiedTranslation);
        expect(verifiedTranslation.length).toBeFalsy(missingTranslations);
    });

    it("Should 'ptBr' not have incorrect translations", () => {
        const verifiedTranslation = Object.keys(ptBr)
            .filter(translateKey => ptBr[translateKey].includes(translateKey));

        const missingTranslations = verifyTranslationOnPtBr(verifiedTranslation);
        expect(verifiedTranslation.length).toBeFalsy(missingTranslations);
    });

    it("Should 'enUs' not have incorrect translations", () => {
        const verifiedTranslation = Object.keys(enUs)
            .filter(translateKey => enUs[translateKey].includes(translateKey));

        const missingTranslations = verifyTranslationOnPtBr(verifiedTranslation);
        expect(verifiedTranslation.length).toBeFalsy(missingTranslations);
    });

    it("Should 'esEs' not have incorrect translations", () => {
        const verifiedTranslation = Object.keys(esEs)
            .filter(translateKey => esEs[translateKey].includes(translateKey));

        const missingTranslations = verifyTranslationOnPtBr(verifiedTranslation);
        expect(verifiedTranslation.length).toBeFalsy(missingTranslations);
    });
});
