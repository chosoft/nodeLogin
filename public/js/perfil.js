$(document).ready(function(){
    $('#logout').click(function(e){
        e.preventDefault()
        axios({
            url: '/logout',
            method: 'DELETE',
            data: true
        }).then(ok  => {
            location.href = '/'
        }).catch(e => {
            location.href = '/'
        })
    })
})