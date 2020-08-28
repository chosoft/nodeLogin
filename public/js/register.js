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
                url: '/api/validator',
                method: 'POST',
                data: data
            }).then((ok,err) =>{
                console.log(ok)
            })
        }else{
            console.log('please check the inputs')
        }
    })
    function registerValidation(obj){
        let {userName,password,passwordConfirm} = obj
        const regexUserName = /(\w+[@!#$%&?¡¿]?)/
        const regexPassword = /([a-zA-Z]+[\d]+[@!#$%&?¡¿]+)/
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