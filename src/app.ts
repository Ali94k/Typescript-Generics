function merge(objA: object, objB: object) {
  return Object.assign(objA, objB)
}

console.log(merge({ name: 'Max' }, { age: 30 }))

const mergedObj = merge({ name: 'Max' }, { age: 30 })

// mergedObj.age // Error: Property 'age' does not exist on type 'object'

function merge2<T, U>(objA: T, objB: U) {
  //return {...objA, ...objB}
  return Object.assign(objA!, objB)
}

const mergedObj2 = merge2({ name: 'Max' }, { age: 30 })

mergedObj2.age // No Error: Property 'age' does not exist on type 'object'

// Constraints

function merge3<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB)
}

const mergedObj3 = merge2({ name: 'Max', hobbies: ['Sports'] }, 30) //  fails silently
// const mergedObj4 = merge3({name: 'Max', hobbies: ['Sports']}, 30) //  fails with error

// Another example

interface Lengthy {
  length: number
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value'
  if (element.length === 1) {
    descriptionText = 'Got 1 element'
  } else if (element.length > 1) {
    descriptionText = 'Got ' + element.length + ' elements'
  }
  return [element, descriptionText]
}

console.log(countAndDescribe('Hi there!'))
console.log(countAndDescribe(['Sports', 'Cooking']))
console.log(countAndDescribe([]))

// The "keyof" Constraint

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return 'Value: ' + obj[key]
}

// Generic Classes

class DataStorage<T extends string | number | boolean> {
  private data: T[] = []

  addItem(item: T) {
    this.data.push(item)
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return
    }
    this.data.splice(this.data.indexOf(item), 1) // -1
  }

  getItems() {
    return [...this.data]
  }
}

const textStorage = new DataStorage<string>()

textStorage.addItem('Max')
textStorage.addItem('Manu')

textStorage.removeItem('Max')

const numberAndTextStorage = new DataStorage<number | string>()

numberAndTextStorage.addItem('Max')
numberAndTextStorage.addItem(1)

// Generic Utility Types

// Partial

interface CourseGoal {
  title: string
  description: string
  completeUntil: Date
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  // Partial
  let courseGoal: Partial<CourseGoal> = {}
  courseGoal.title = title
  courseGoal.description = description
  courseGoal.completeUntil = date
  return courseGoal as CourseGoal
}

// Readonly

const names: Readonly<string[]> = ['Max', 'Anna']
// names.push('Manu') // Error: Property 'push' does not exist on type 'readonly string[]'

//record

interface CatInfo {
  age: number
  breed: string
}

type CatName = 'miffy' | 'boris' | 'mordred'

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: 'Persian' },
  boris: { age: 5, breed: 'Maine Coon' },
  mordred: { age: 16, breed: 'British Shorthair' },
}

//Error Property 'mordred' is missing in type
//'{ miffy: { age: number; breed: string; }; boris: { age: number; breed: string; }; }'
//but required in type 'Record<CatName, CatInfo>'.

// const cats2: Record<CatName, CatInfo> = {
//   miffy: { age: 10, breed: 'Persian' },
//   boris: { age: 5, breed: 'Maine Coon' },
// }
