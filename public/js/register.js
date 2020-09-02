$(document).ready(function(){
    $('.button-toggle').click(function(e){
        e.preventDefault()
        console.log($(this).attr('ref'))
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
})