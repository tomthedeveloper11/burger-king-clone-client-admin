import Swal from 'sweetalert2'

export const showError = (error) => {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: error,
  })
}
