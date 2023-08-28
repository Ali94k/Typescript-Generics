function merge(objA: object, objB: object) {
    return Object.assign(objA, objB)
}

console.log(merge({name: 'Max'}, {age: 30}))

const mergedObj = merge({name: 'Max'}, {age: 30})

// mergedObj.age // Error: Property 'age' does not exist on type 'object'

function merge2<T, U>(objA: T, objB: U) {
    //return {...objA, ...objB}
    return Object.assign(objA!, objB)
}

const mergedObj2 = merge2({name: 'Max'}, {age: 30})

mergedObj2.age // No Error: Property 'age' does not exist on type 'object'


