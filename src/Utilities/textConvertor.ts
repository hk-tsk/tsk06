
export function ReplaceAll(text: string, SearchValue: string, replaceSymbole: string) {
    const reg = new RegExp(SearchValue, "gi");
    return text.replace(reg, replaceSymbole);
}

export function ApplyLineStyle(text: string) {
    return ReplaceAll(text, "  ", '&nbsp;&nbsp;')
}