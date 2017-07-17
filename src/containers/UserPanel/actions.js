

export const POST_USER = 'POST_USER'
export const LACKING_FIELD = 'LACKING_FIELD'
export const USER_RECEIVED = 'USER_RECEIVED'

export function lackingField(field_name) {
  return{
    type: LACKING_FIELD,
    field: field_name
  }
}

function userReceived(){
  return{
    type: USER_RECEIVED
  }
}

export function postUser(){}
