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
    $('#menu').click(function(e){
        e.preventDefault()
        const menu = $('#menu-display')
        if(menu.css('display') === 'none'){
            menu.css('width', '100%')
            menu.css('display', 'block')
        }else{
            menu.css('width', '100%')
            menu.css('display', 'none')
        }
    })
})