function purge_key(array: {}[], key: string) {
    for (const el of array) {
        if (key in el) {
            delete el[key];
        }
    }
    return array;
}

function purge_value(array: {}[], key: string, value: any) {
    for (const el of array) {
        if (key in el && el[key] === value) {
            delete el[key];
        }
    }
    return array;
}

export {
    purge_key, purge_value,
};