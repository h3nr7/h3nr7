export function filterObjectByArr(
    obj:Record<string, unknown>, 
    arr:string[]
):Record<string, unknown> {
    return Object.keys(obj)
        .filter(key => arr.includes(key))
        .reduce((o:Record<string, unknown>, k) => {
            o[k] = obj[k];
            return o;
        }, {})
}