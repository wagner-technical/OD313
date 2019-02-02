/**
 * ACTION TYPES
 */
const LOAD_MENU = 'LOAD_MENU'
const REMOVE_MENU = 'REMOVE_MENU'
const TOGGLE_TOWN = 'TOGGLE_TOWN'
const TOGGLE_ROAD = 'TOGGLE_ROAD'

/**
 * INITIAL STATE
 */
const defaultMenu = {}

/**
 * ACTION CREATORS
 */
export const loadMenu = menu => ({type: LOAD_MENU, menu})
export const removeMenu = () => ({type: REMOVE_MENU})
export const toggleTown = town => ({type: TOGGLE_TOWN, town})
export const toggleRoad = (town, road) => ({type: TOGGLE_ROAD, town, road})

/**
 * REDUCER
 */
export default function(state = defaultMenu, action) {
  switch (action.type) {
    case LOAD_MENU:
      return action.menu
    case REMOVE_MENU:
      return defaultMenu
    case TOGGLE_TOWN:
      return {
        ...state,
        [action.town]: {
          selected: !state[action.town].selected,
          roads: Object.keys(state[action.town].roads).reduce((roads, road) => {
            roads[road] = {...state[action.town].roads[road]}
            return roads
          }, {})
        }
      }
    case TOGGLE_ROAD:
      return {
        ...state,
        [action.town]: {
          ...state[action.town],
          roads: {
            ...state[action.town].roads,
            [action.road]: {
              ...state[action.town].roads[action.road],
              selected: !state[action.town].roads[action.road].selected
            }
          }
        }
      }
    default:
      return state
  }
}
