$(document).ready(function() {
    $("#submit").click(function(e){
        e.preventDefault()
        let correo = $('#correo').val()
        let password = $('#password').val()
        if(correo !== '' && password !== ''){
            const data = {
                correo,
                password
            }
            axios({
                url: '/api/login',
                method: 'POST',
                data: data
            }).then(ok =>{
                console.log(ok)
                switch(ok.data){
                    case 'vacios':
                        Swal.fire({
                            title: 'Campos Vacios!',
                            icon: 'warning',
                            text: 'Rellena todo los campos',
                            confirmButtonText: "Ok"
                        })
                        break
                    case '!found':
                        Swal.fire({
                            title: 'Correo no encontrado',
                            icon: 'warning',
                            text: 'El correo no se encuentra o esta inactivo',
                            confirmButtonText: "Ok"
                        })
                        break
                    case '!fail':
                        Swal.fire({
                            title: 'Error al loguearse',
                            icon: 'error',
                            text: 'La combinacion de usuario y contraseña no se ha encontrado',
                            confirmButtonText: "Ok"
                        })
                        break
                    case 'ok':
                        Swal.fire({
                            title: 'Logueado Correctamente',
                            icon: 'success',
                            text: 'Pronto sera redireccionado',
                            confirmButtonText: "Ok"
                        })
                        break
                    default:
                        Swal.fire({
                            title: 'Error',
                            icon: 'error',
                            text: 'Ha ocurrido unsfd error interno',
                            confirmButtonText: "Ok"
                        })
                        break
                        
                }
            }).catch(err => {
                Swal.fire({
                    title: "Error",
                    icon: "error",
                    text: "Ha ocurrido un efdsrror interno",
                    confirmButtonText: "Ok"
                })
            })
        }else{
            Swal.fire({
                title: 'Campos Vacios!',
                icon: 'warning',
                text: 'Rellena todo los campos',
                confirmButtonText: "Ok"
            })
        }

    })

    $('.button-toggle').click(function(e){
        e.preventDefault()
        let btn = $(this)
        let input= $(`#${$(this).attr('ref')}`)
        let p1 = btn.children()[0].id
        let p2 = btn.children()[1].id
        if(input.attr('type') === "password"){
            input.attr('type','text')
            $(`#${p1}`).css('display','none')
            $(`#${p2}`).css('display','block')
        }else{
            input.attr('type','password')
            $(`#${p1}`).css('display','block')
            $(`#${p2}`).css('display','none')
        }
    })
})