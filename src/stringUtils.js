const spaces = (count) => ' '.repeat(count);


const center = (str, width) => {
    const spaceCount = width - str.length;
    const before = Math.floor(spaceCount / 2);
    const after = Math.ceil(spaceCount / 2);
    return spaces(before) + str + spaces(after);
};

const padRight = (str, width) => {
    const spaceCount = width - str.length;
    return str + spaces(spaceCount);
};

const padLeft = (str, width) => {
    const spaceCount = width - str.length;
    return spaces(spaceCount) + str;
}

module.exports = {spaces, center, padRight, padLeft};