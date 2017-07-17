export const LOCATION_CHANGE = 'LOCATION_CHANGE'

export function changeLocation(location){
  return {
    type: 'LOCATION_CHANGE',
    location: location
  }
}
