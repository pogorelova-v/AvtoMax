
   // Слайдер слик

$(document).ready(function(){
    $('.slider').slick({
        arrow:true,
        dots:false,
        slidesToShow: 3,
        
    });
});




   //Проверка полей формы обратной связи

document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

   async function formSend(e) {
     e.preventDefault();
  
     let error = formValidate(form);

     let formData = new FormData(form);
     formData.append('image', formImage.files[0]);
     
     if(error === 0){

        form.classList.add('_sending');

        let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData
        });
        if(response.ok) {
            let result = await response.json();
            alert(result.message);
            formPreview.innerHTML = '';
            form.reset();
            form.classList.remove('_sending');
        } else {
            alert('ошибка');
            form.classList.remove('_sending');
        }
  
     } else {
         alert('Заполните обязатеьные поля');
     }

  }

  function formValidate(form){
      let error = 0;
      let formReg = document.querySelectorAll('._reg');


      //добавление поляям класса еррор

      for (let index = 0; index < formReg.length; index++){
          const input = formReg[index];
          formRemoveError(input)

          if (input.getAttribute('type') === 'checkbox' && input.checked === false){
            formAddError(input);
            error++;
          } else {
              if (input.value === ''){
                formAddError(input);
                error++;
              }
          }
      }
      return error;
  }
  

  // то что добавлять будет класс к элементу и рожителю


  function formAddError(input){
      input.parentElement.classList.add('_error')
      input.classList.add('_error')
  }
  function formRemoveError(input){
    input.parentElement.classList.remove('_error')
    input.classList.remove('_error')
}
    // превью фото

   const formImage = document.getElementById('formImage');
   const formPreview = document.getElementById('formPreview');
   
   formImage.addEventListener('change', () => {
       uploadFile(formImage.files[0]);
   });
    
    function uploadFile(file) {
        
        var reader = new FileReader();
        reader.onload = function (e) {
            formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
        };
        reader.onerror = function (e) {
            alert('Ошибка');
        };
        reader.readAsDataURL(file);
    }

});