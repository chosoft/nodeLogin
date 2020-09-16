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
            }).then(data => {
                console.log(data)
                getterModels()
            }).catch(e => {
                console.log(e)
            })
        })
    })


    function getterModels(){
        axios({
            url: '/modelos',
            method: 'POST',
            data: true
        }).then(data => {
            console.log(data)
        }).catch(e => {
            console.log(e)
        })
    }
})