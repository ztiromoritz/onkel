const spaces = (count) => ' '.repeat(count);


const center = (str, width) => {
    const spaceCount = width - str.length;
    if(spaceCount < 0){
        return str.substring(0,width)
    }
    const before = Math.floor(spaceCount / 2);
    const after = Math.ceil(spaceCount / 2);
    return spaces(before) + str + spaces(after);
};

module.exports = {spaces, center};