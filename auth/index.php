<?php

  if (empty($_POST)) {
    $_POST = json_decode(file_get_contents('php://input'), true);
  }

  $admin_email = 'admin@admin.com';
  $admin_password = 'Admin1';

  function validatePassword($val) {
    if (preg_match("#.*^(?=.{6,20})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$#", $val)) {
      return true;
    } else {
      return false;
    }
  }

  function validateEmail($val) {
    if (filter_var($val, FILTER_VALIDATE_EMAIL)) {
      return true;
    } else {
      return false;
    }
  }

  if (isset($_POST['email']) && isset($_POST['password'])) {
    $email = mysql_real_escape_string(trim($_POST['email']));
    $password = mysql_real_escape_string(trim($_POST['password']));

    if (validateEmail($email) && validatePassword($password)) {
      if ($email === $admin_email && $password === $admin_password) {
        http_response_code(201);
      } else {
        http_response_code(401);
      }
    } else {
      http_response_code(400);
    }
  } else {
    http_response_code(500);
  }
