
export const saveState = (state: any, stateName: string) => {
    try {
        const serializedData = JSON.stringify(state);
        localStorage.setItem(stateName, serializedData);
    } catch{
        // tslint:disable-next-line: no-console
        console.log("can not save in storage")
    }
}

export const LoadState = (stateName: string) => {
    try {
        const serializedData = localStorage.getItem(stateName);
        if (serializedData === null) {
            return undefined;
        }
        return JSON.parse(serializedData);
    }
    catch{
        return undefined;
    }
}