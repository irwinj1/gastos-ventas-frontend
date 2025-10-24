import { reactive, readonly } from 'vue'

const state = reactive({
  visible: false,
  message: '',
  color: 'success', // success, error, warning, info
  timeout: 3000
})

export function useAlert() {
  const show = (message: string, color: string = 'success', timeout: number = 3000) => {
    state.message = message
    state.color = color
    state.timeout = timeout
    state.visible = true
    setTimeout(()=>{close() },timeout)
  }

  const close = () => {
    state.visible = false
  }

  return {
    state: readonly(state),
    show,
    close
  }
}