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
    function getterModels(){
        axios({
            url: '/modelos',
            method: 'POST',
            data: true
        }).then(ok => {
            if(Array.isArray(ok.data) && ok.data.length > 0){
                $('#main').empty()
                console.log('ok')
                let template = ''
                let template2 = ''
                $('#main').innerHTML = `
                    <div class="title-modelos">
                        <h1>Modelos</h1>
                    </div>
                    <div class="wp-modelos" id="md">
                    </div>

                `
                ok.data.forEach(dato => {
                    template2 += `             

                    <div class="card" idModelo="${dato._id}">
                    <div class="card-header">
                        <h2>${dato.nombre}</h2>
                    </div>
                    <div class="card-img"><img src="${dato.img}" alt="" srcset=""/></div>
                    <div class="card-btns"><a class="btn link-btn" href="/modelos/${dato.nombre}">Ver ahora</a>
                        <button class="btn btn-delete" deleterKey="${dato._id}">Eliminar</button>
                    </div>
                    </div>
                    
                    `
                })
                $('#md').innerHTML = template2
            }else{
                let template = `
                                    <div class="modelos" id="empty">
                    <div class="modelos-title">
                        <h1>Modelos</h1>
                    </div>
                    <div class="modelos-p">
                        <p>Aun no tines modelos agregados agrega uno dando click aqui abajo</p>
                    </div>
                    <div class="modelos-btn"><button id="add-model">Añadir proyecto</button></div>
                    <div class="modelos-img"><img src="icons/empty.svg" alt="empty-draw" /></div>
                </div>
                `
                $('#main').innerHTML = template
            }
        }).catch(e => {
            console.log(e)
        })
    }
})