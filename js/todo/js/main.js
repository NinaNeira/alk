// $(document).ready(function() {
//     function addItem() {
//         const item = $('input[name="item-add"]'),
//               add = $('.btn');

//         add.on('click', function(){
//             if(item.val()) {
//                 $('.items').append('<label class="check"><span class="item-item">' + item.val() + '<input class="item-item-check" type="checkbox"><span class="checkmark"></span></span></label>');
//             }
//         });
//     }

//     function removeItem() {
//         $('.items').on('click', '.item-item', function(){
//             let parent = $(this).parent(),
//                 children = $(this).children();

//             if(!parent.hasClass('completed')) {
//                 parent.addClass('completed');

//                 let clone = parent.clone();
//                 children.attr('disabled', true);
//                 clone.appendTo('.completed-items');
//             }
//         });
//     }

//     function showCompleted() {
//         $('.show-completed').on('click', function(e){
//             e.preventDefault();
//             $('.show-completed').toggleClass('open');
//             $('.completed-items').toggleClass('hidden');
//         });
//     }

//     addItem();
//     removeItem();
//     showCompleted();
// }); 

window.addEventListener("pagehide", event => {
    if (event.persisted) {
      

var test = window.document.querySelector('.test');
test.addEventListener('click', e => {
    
test.setAttribute('checked', 'checked'); 
});
if (test.checked) {
    console.log('yeah!');
}
console.log(test.checked);
    }
  }, false);