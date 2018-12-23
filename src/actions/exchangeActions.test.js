import * as actions from './exchangeActions'
import * as types from './actionTypes'

//Example of how I would approach testing of synchronous actions
describe('exchangeActions', () => {
  it('should create an action to update origin amount', () => {
    const expectedAction = {
      type: types.SET_AMOUNT,
      payload: 25
    }
    expect(actions.updateOriginAmount(25)).toEqual(expectedAction)
  })
})