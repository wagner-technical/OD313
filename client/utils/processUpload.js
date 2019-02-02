import store, {loadPoles, loadMenu} from '../store'

module.exports = file => {
  // native nodejs module for interacting with file system

  // load the text file
  const allPolesTxt = file
  // console.log(allPolesTxt)

  // turn each line of the text file into an item in an array (ignore the map function, just cleaning out extraneous characters)
  const allPolesArray = allPolesTxt.split('\n').map(pole => pole.replace('\r', ''))

  // first line of AllPoles is the keys that the values represent
  // i.e. ['floc', 'lat', 'long', 'division', 'county', 'town' 'road', 'line', 'pole']
  const keys = allPolesArray.shift().split(',') 

  const menu = {}

  // .shift() takes away the first index, so now we can loop reduce the poles array into an object of objects
  const poleObjects = allPolesArray.reduce( (poleObjs, currentPole) => {
    // this part is a bit tricky to just read unless you know JS, read the docs on reduce
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    // here we are using reduce twice to take information from an array and make a more useful object out of item
    // another resource that explains how to use reduce in this fasion (keep in mind he has a different use case)
    // https://medium.com/dailyjs/rewriting-javascript-converting-an-array-of-objects-to-an-object-ec579cafbfc7
    
    // split the text of the line into an array of values
    const values = currentPole.split(',')
    // reduce the keys array into a single pole object - this only works because both the keys array and the values array share a respective index (i.e. 0th index of keys is 'floc', and the 0th index of values is the floc value)
    const singlePoleObject = keys.reduce( (poleObject, key, index) => {
      poleObject[key] = values[index]
      return poleObject
    }, {})

    const floc = singlePoleObject['FLOC']
    const town = singlePoleObject['Town']
    const road = singlePoleObject['Road']

    if (town) {
      if (!Object.keys(menu).includes(town)) {
        menu[town] = {
          selected: false,
          roads: {
            [road]: {
              value: road,
              selected: false,
              flocs: [floc]
            }
          }
        }
      } else {
        if (!Object.keys(menu[town].roads).includes(road)) {
          menu[town].roads[road] = {
            value: road,
            selected: false,
            town,
            flocs: [floc]
          } 
        } else {
          menu[town].roads[road].flocs.push(floc)
        }
      }
    } else {

    }
    
    poleObjs[floc] = singlePoleObject
    return poleObjs
  }, {})

  store.dispatch(loadPoles(poleObjects))
  store.dispatch(loadMenu(menu))
}