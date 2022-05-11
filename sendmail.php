<?php
   
   use PHPMailer\PHPMailer\PHPMailer;
   use PHPMailer\PHPMailer\Exception;

   require = 'phpmailer/src/Exception.php';
   require = 'phpmailer/src/PHPMailer.php';

   $mail = new PHPMailer(true);
   $mail->CharSet = 'UTF-8';
   $mail->setLanguage('ru', 'phpmailer/language/');
   $mail->IsHTML(true);

   //От кого письмо
   $mail->setFrom('Сообщение с сайта MaksAuto152rus');
   //Кому отправить
   $mail->addAddress('gorelikovaVN@gmail.com');
   //Тема письма
   $mail->Subject = 'Новый клиент';

 //проверка полей и присваивание им значений
   
   $body = '<h1> Новое сообщение с сайта <h1>';
 
   if (trim(!empty($_POST['name']))){
       $body.='<p><strong> Имя: </strong> '.$_POST['name'].'</p>';
   }
   if (trim(!empty($_POST['email']))){
    $body.='<p><strong> E-mail: </strong> '.$_POST['email'].'</p>';
   }
   if (trim(!empty($_POST['message']))){
    $body.='<p><strong> Сообщение: </strong> '.$_POST['message'].'</p>';
  }

  //Прикрепляем файл

  if(!empty($_FILES['image']['tmp_name'])) {
      //путь загрузки файла
      $filePath = __DIR__ . "/files/" . $_FILES['image']['name'];
      //грузим файл
      if (copy($_FILES['image']['tmp_name'], $filePath)){
          $fileAttach = $filePath;
          $body.='<p><strong>Фото повреждения</strong>';
          $mail->addAttachmeent($fileAttach);
      }
  }

  $mail->Body = $body;

  //отправка

  if(!$mail->send()) {
      $message = 'Ошибка, повторите отправку';
  } else {
      $message = 'Сообщение отправлено мастеру, ожидайте звонка ближайшее время';
  }

  $response = ['message' => $message];

  header('Content-type: application/json');
  echo json_encode($response);

  ?>

