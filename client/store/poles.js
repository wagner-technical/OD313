
/**
 * ACTION TYPES
 */
const LOAD_POLES = 'LOAD_POLES'
const REMOVE_POLES = 'REMOVE_POLES'

/**
 * INITIAL STATE
 */
const defaultPoles = {}

/**
 * ACTION CREATORS
 */
export const loadPoles = poles => ({type: LOAD_POLES, poles})
export const removePoles = () => ({type: REMOVE_POLES})

/**
 * REDUCER
 */
export default function(state = defaultPoles, action) {
  switch (action.type) {
    case LOAD_POLES:
      return action.poles
    case REMOVE_POLES:
      return defaultPoles
    default:
      return state
  }
}
