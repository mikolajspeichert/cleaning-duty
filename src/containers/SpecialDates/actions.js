export const PICKED_NEW = 'PICKED_NEW'

export function pickNew(pick) {
  return {
    type: 'PICKED_NEW',
    value: pick,
  }
}
