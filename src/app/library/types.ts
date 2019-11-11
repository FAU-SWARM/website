function type_of(a: any) {
    let prototype = typeof a;
    if (prototype !== 'object') { return prototype; }
    if (Array.isArray(a)) { return '[]'; }
    else { return '{}'; }
}

function normalize(a: {value: any, type: string, key: string}[] | any): any {
    if (type_of(a) === '[]') {
        if (type_of(a[0]) === '{}' && 'value' in a[0] && 'type' in a[0] && 'key' in a[0]) {
            let val = {};
            for (const iterator of a) {
                val[iterator.key] = normalize(iterator.value);
            }
            a = val;
        } else if (type_of(a[0]) === '{}' && 'value' in a[0] && 'type' in a[0]) {
            let val = [];
            for (const iterator of a) {
                val.push(normalize(iterator.value));
            }
            a = val;
        }
    } else if (type_of(a) === '{}') {
        for (const key in a) {
            if (a.hasOwnProperty(key)) {
                const element = a[key];
                a[key] = normalize(element);
            }
        }
    }
    return a;
}

export {
    type_of, normalize,
};