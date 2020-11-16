$(document).ready(function(){
    $('#add-model').click(function(e){
        e.preventDefault();
        Swal.mixin({
            input: "text",
            text: "",
            confirmButtonText: 'Next &rarr;',
            showCancelButton: true,
            progressSteps: ['1', '2', '3','4','5','6'],
            inputAttributes:{}
        }).queue([
            {
                title: 'Nombre del modelo',
                input: 'text',
                inputAttributes: {placeholder: 'Nombre del modelo'}
            },
            {
                title: 'Nombre del Colegio',
                input: 'text',
                inputAttributes: {placeholder: 'Nombre del colegio'}
            },
            {
                title: 'Direccion',
                input: 'text',
                inputAttributes: {placeholder: 'Direccion del colegio'}
            },
            {
                title: 'Correos del modelo',
                input: 'textarea',
                text: "Divide los correos mediante una coma (,)",
                inputAttributes: {placeholder: 'Correos del modelo'}
            },
            {
                title: 'Lideres del modelo',
                input: 'textarea',
                text: "Divide los lideres mediante una coma (,)",
                inputAttributes: {placeholder: 'Lideres del modelo'}
            },
            {
                title: 'Telefonos del modelo',
                input: 'textarea',
                text: "Divide los telefonos mediante una coma (,)",
                inputAttributes: {placeholder: 'Telefonos del modelo'}
            }
        ]).then((result) => {
                
            let data = {
                nombre:result.value[0],
                colegio: result.value[1],
                direccion: result.value[2],
                correos: result.value[3].split(','),
                lideres: result.value[4].split(','),
                telefonos: result.value[5].split(','),
            }
            axios({
                url: '/api/modeladd',
                method: 'POST',
                data,
            }).then(ok => {
                console.log(ok)
               if(ok.data === 'fail'){
                Swal.fire({
                    title: "Error",
                    text: "Ha ocurrido un error inesperado",
                    icon: "error",
                    confirmButtonText: "Ok"
                })
               }
               else if(ok.data === 'yetExists'){
                Swal.fire({
                    title: "Nombre de modelo en uso",
                    text: "Este nombre de modelo ya esta en uso elija otro",
                    icon: "warning",
                    confirmButtonText: "Ok"
                })
               }
               else{
                getterModels()

                Swal.fire({
                    title: "Bien hecho",
                    text: "Se ha añadido el modelo correctamente",
                    icon: "success",
                    confirmButtonText: "Ok"
                })
               }
            }).catch(e => {
                Swal.fire({
                    title: "Error",
                    text: "Ha ocurrido un error inesperado",
                    icon: "error",
                    confirmButtonText: "Ok"
                })
            })
        }).catch(e => console.log(e))
    })

    $('body').on('click','.wp-division main .modelos .wp-modelos .card .card-btns .btn-delete',function(e){
        e.preventDefault(e)
        const key = {
            key: $(this).attr('deleterKey')
        }
        Swal.fire({
            title: 'Estas seguro de eliminar este modelo ?',
            text: 'Esta accion no sera reversible',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then(result => {
            if(result.isConfirmed){
                axios({
                    url: '/api/deleteModel',
                    method: 'DELETE',
                    data: key
                })
                .then(result => {
                    getterModels()
                })
                .catch(e => console.log(e))
            }else{

            }
        })
    })
    function getterModels(){
        axios({
            url: '/modelos',
            method: 'POST',
            data: true,
        })
        .then(resultado => {

            const modelos = resultado.data
            if(modelos === '!fail'){
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Ha ocurrido un error a la hora de encontrar los modelos'
                })
            }else if(modelos === 'empty'){
                let template = `<div class="modelos" id="empty">
                                    <div class="title-modelos">
                                        <h1>Modelos</h1>
                                    </div>
                                    <div class="modelos-p">
                                        <p>Parece que aun no tienes modelos añadidos, puedes agregar uno dando tan solo un click en el boton de Mas</p>
                                    </div>
                                    <div class="modelos-img">
                                        <img src="icons/empty.svg" alt="empty-draw">
                                    </div>
                                </div>`
                $('.cont').html(template)
            }else if(Array.isArray(modelos) && modelos.length > 0){
                let mockup = `
                        <div class="modelos">
                            <div class="title-modelos">
                                <h1>Modelos</h1>
                              </div>
                            <div class="wp-modelos" id="md">
                
                            </div>
                        </div>`

                $('.cont').html(mockup)
                let template = ''
                modelos.forEach(element => {
                    template += `
                    <div class="card" idModelo="${element._id}">
                        <div class="card-header">
                            <h2>${element.nombre}</h2>
                        </div>
                        <div class="card-img">
                            <img src="/modelosImg/logo.svg" alt="logo-modelo">
                        </div>
                        <div class="card-btns">
                            <a href="/modelos/${element.nombre}" class="btn link-btn">Ver ahora </a>
                            <button class="btn btn-delete" deleterKey="${element._id}">Eliminar</button>
                        </div>
                    </div>
                    
                    `
                    $('#md').html(template)
                })

            }else{
                Swal.fire({
                    title: 'Error',
                    text: 'Ha ocurrido un error al buscar los modelos',
                    icon: 'error'
                })
            }
        })
        .catch(e => console.log(e))
    }
    
})