$(document).ready(function() {
    $("#submit").click(function(e){
        e.preventDefault()
        let userName = $('#user').val()
        let password = $('#password').val()
        if(userName !== '' && password !== ''){
            const data = {
                userName,
                password
            }
            axios({
                url: '/api/login',
                method: 'POST',
                data: data
            }).then(ok =>{
                console.log(ok.data)
            }).catch(err => console.log(err))
        }else{
            console.log('error')
        }

    })
})