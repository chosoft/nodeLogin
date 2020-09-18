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
               if(ok.data === 'fail'){
                Swal.fire({
                    title: "Error",
                    text: "Ha ocurrido un error inesperado",
                    icon: "error",
                    confirmButtonText: "Ok"
                })
               }
               else{
                Swal.fire({
                    title: "Bien hecho",
                    text: "Se ha añadido el modelo correctamente",
                    icon: "success",
                    confirmButtonText: "Ok"
                })
                getterModels()
               }
            }).catch(e => {
                Swal.fire({
                    title: "Error",
                    text: "Ha ocurrido un error inesperado",
                    icon: "error",
                    confirmButtonText: "Ok"
                })
            })
        })
    })
    $('#add-model2').click(function(e){
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
               if(ok.data === 'fail'){
                Swal.fire({
                    title: "Error",
                    text: "Ha ocurrido un error inesperado",
                    icon: "error",
                    confirmButtonText: "Ok"
                })
               }
               else{
                Swal.fire({
                    title: "Bien hecho",
                    text: "Se ha añadido el modelo correctamente",
                    icon: "success",
                    confirmButtonText: "Ok"
                })
                getterModels()
               }
            }).catch(e => {
                Swal.fire({
                    title: "Error",
                    text: "Ha ocurrido un error inesperado",
                    icon: "error",
                    confirmButtonText: "Ok"
                })
            })
        })
    })
    function getterModels(){
        axios({
            url: '/modelos',
            method: 'POST',
            data: true
        }).then(ok => {
            if(Array.isArray(ok.data) && ok.data.length > 0){
                let data = ok.data
                let template = ``
                $('#mainCont').empty()
                $('#mainCont').html(`
                <div class="title-modelos">
                    <h1>Modelos</h1>
                </div>
                <div class="wp-modelos" id="md">
                    
                </div>
                `) 
                data.forEach(element => {
                    template += `
                    <div class="card" idModelo="${element._id}">
                        <div class="card-header">
                            <h2>${element.nombre}</h2>
                        </div>
                        <div class="card-img">
                            <img src="${element.img}", alt="${element.nombre}-img">
                        </div>
                        <div class="card-btns">
                            <a href="/modelos/${element.nombre}" class="btn link-btn">Ver ahora</a>
                            <button class="btn btn-delete" deleterKey="${element._id}">Eliminar</button>
                        </div>
                    </div>
                    
                    `
                });
                $('#md').html(template);
            }else{
                Swal.fire({
                    title: "Error",
                    text: "Ha ocurrido un error inesperado al momento de traer los datos actualizados actualize la pagina",
                    icon: "error",
                    confirmButtonText: "Ok"
                })
            }
        }).catch(e => {
            console.log(e)
        })
    }
})