const convertToString = (value: string | undefined): string =>  (typeof value === "string") ? value: "";

export {convertToString};