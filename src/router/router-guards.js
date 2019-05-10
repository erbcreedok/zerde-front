import store from '../store'

export const requireAuth = (to, from, next)  => {
  console.log(store.state.auth.authorized)
  if (store.state.auth.authorized) {
    next()
  } else {
    next({name: 'home'})
  }
}

export const unrequireAuth = (to, from, next) => {
  console.log(store.state.auth.authorized)
  if (store.state.auth.authorized) {
    next({name: 'home'})
  } else {
    next()
  }
}