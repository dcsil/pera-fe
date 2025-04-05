export function getOrdinalSuffix(num: number, t: (key: string) => string): string {
    const remainder10 = num % 10;
    const remainder100 = num % 100;

    if (remainder100 >= 11 && remainder100 <= 13) {
        return t("peerComparison.ordinalSuffixes.th");
    }

    switch (remainder10) {
        case 1:
            return t("peerComparison.ordinalSuffixes.st");
        case 2:
            return t("peerComparison.ordinalSuffixes.nd");
        case 3:
            return t("peerComparison.ordinalSuffixes.rd");
        default:
            return t("peerComparison.ordinalSuffixes.th");
    }
}
export function getOrdinalPrefix(num: number, t: (key: string) => string): string {
    return t("peerComparison.ordinalPrefix");
}
