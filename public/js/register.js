$(document).ready(function() {
    $('#submit').click(function(e) {
        e.preventDefault()
        let userName = $("#user").val()
        let password = $("#password").val()
        let passwordConfirm = $("#passwordConfirm").val()
        const data = {
            userName,
            password,
            passwordConfirm
        }
        if(registerValidation(data)){
            axios({
                url: '/api/register',
                method: 'POST',
                data: data
            }).then((ok) =>{
                console.log(ok.data)
            }).catch(err =>console.log(err))
        }else{
            console.log('please check the inputs')
        }
    })
    function registerValidation(obj){
        let {userName,password,passwordConfirm} = obj
        const regexUserName = /(\w+[@!#$%&?¡¿]?)/
        const regexPassword = /([a-zA-Z]+[\d]+[@!#$%&?¡¿]+)/
        if(userName === '' || password === ''|| passwordConfirm === ''){
            console.log('vacios')
        }
        if(regexUserName.test(userName) && (userName.length >=3 && userName.length <=20)){
            if(regexPassword.test(password) && (password.length >=12 && password.length <= 25)){
                if(password === passwordConfirm){
                    return true
                }else{
                    return false
                }
            }else{
                return false
            }
        }else{
            return false
        }
    }
})