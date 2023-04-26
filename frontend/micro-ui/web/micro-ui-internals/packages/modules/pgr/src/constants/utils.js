export const arraySort = (options, optionkey, locilizationkey) => {
    return options.sort((a, b) => locilizationkey(a[optionkey]).localeCompare(locilizationkey(b[optionkey])));
};