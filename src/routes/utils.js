export function extractNotNullValues(obj){
    let result = {}
    const array = Object.entries(obj)
    for(const [key,elem] of array){
        if(elem == undefined)
            continue  
        else if((typeof elem == 'object') || (elem instanceof Object)){
            const notNullValues = extractNotNullValues(elem)
            if(Object.keys(notNullValues).length == 0)
                continue
            result = {...result, [key]:notNullValues}
        }
        else 
            result = {...result, [key]:elem}
    }
    return result
}