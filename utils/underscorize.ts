export default (obj: Record<string, any>) => {
    const newObj: Record<string, any> = {};
    Object.entries(obj).forEach(([key, value]) => {
        const newKeyName = key.split(/\.?(?=[A-Z])/).join('_').toLowerCase();
        newObj[newKeyName] = value;
    })
    return newObj;
}