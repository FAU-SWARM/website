function clone(o: any) {
    if (typeof o === 'object') {
        return JSON.parse(JSON.stringify(o));
    } else {
        return o;
    }
}

export {
    clone
};