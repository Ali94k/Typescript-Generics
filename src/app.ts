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

// Constraints

function merge3<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB)
}

const mergedObj3 = merge2({name: 'Max', hobbies: ['Sports']}, 30) //  fails silently
// const mergedObj4 = merge3({name: 'Max', hobbies: ['Sports']}, 30) //  fails with error


// Another example

interface Lengthy {
    length: number
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string]{
    let descriptionText = 'Got no value'
    if(element.length === 1){
        descriptionText = 'Got 1 element'
    } else if(element.length > 1){
        descriptionText = 'Got ' + element.length + ' elements'
    }
    return [element, descriptionText]
}

console.log(countAndDescribe('Hi there!'))