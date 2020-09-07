$(document).ready(function(){
    $('.button-toggle').click(function(e){
        e.preventDefault()
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

    $("#submit").click(function(e){
        e.preventDefault()
        let userName = $('#user').val()
        let password = $('#password').val()
        let passwordConfirm = $('#passwordConfirm').val()
        let correo = $('#correo').val()
        if(userName !== '' && password !== '' && passwordConfirm !== ''){
            const data = {
                userName,
                password,
                passwordConfirm,
                correo
            }
            axios({
                url: '/api/register',
                method: 'POST',
                data: data
            }).then(ok =>{
                console.log(data)
                switch(ok.data){
                    case "ok":
                        Swal.fire({
                            title: "Registrado Correctamente",
                            text: "Espera a que activen tu usuario",
                            icon: "success",
                            confirmButtonText: "Ok"
                        })
                        break
                    case "!Correo":
                        Swal.fire({
                            title: "Correo en uso",
                            text: "Este correo ya esta en uso cambialo",
                            icon: "warning",
                            confirmButtonText: "Ok"
                        })
                        break
                    case "vacios":
                        Swal.fire({
                            title: "Campos vacios!",
                            text: "Por favor rellena los campos",
                            icon: "warning",
                            confirmButtonText: "Ok"
                        })
                        break
                    case "!password":
                        Swal.fire({
                            title: "Contraseña invalida",
                            text: "Por favor asegurese de que la contrasela sea valida",
                            icon: "warning",
                            confirmButtonText: "Ok"
                        })
                        break
                    case "!passwords":
                        Swal.fire({
                            title: "Contraseñas no coinciden",
                            text: "Asegurate de que las contraseñas coincidan",
                            icon: "error",
                            confirmButtonText: "Ok"
                        })
                        break
                    case "!username":
                        Swal.fire({
                            title: "Nombre de usuario invalido",
                            text: "Asegurate de que tu usuario sea valido",
                            icon: "error",
                            confirmButtonText: "Ok"
                        })
                        break
                    default: 
                        Swal.fire({
                            title: "Error",
                            text: "intentalo mas tarde",
                            icon: "error",
                            confirmButtonText: "Ok"
                        })
                        break
                }
            }).catch(err => {
                Swal.fire({
                    title: "Error",
                    text: "Ha ocurrido un error interno",
                    icon: "error",
                    confirmButtonText: "Ok"
                })
            })
        }else{
            Swal.fire({
                title: "Campos Vacios!",
                text: "Por Favor rellene todos los campos",
                icon: "warning",
                confirmButtonText: "Ok"
            })
        }

    })
})