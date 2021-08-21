<?php
echo "DSD";die;
session_start();

// initializing variables
$first_name = "";
$last_name = "";
$dob = "";
$gender = "";
$password_1 = "";
$password_2 = "";
$address = "";
$email    = "";
$errors = array(); 

// connect to the database
$db = mysqli_connect('localhost', 'root', '', 'reactapp');

$response = [];
$response['success'] = false;
$response['message'] = '';
$response['status'] = 400;
$response['data'] = [];

// REGISTER USER
if(isset($_POST['reg_user'])) {
  // receive all input values from the form
  $first_name = mysqli_real_escape_string($db, $_POST['first_name']);
  $last_name = mysqli_real_escape_string($db, $_POST['last_name']);
  $dob = mysqli_real_escape_string($db, $_POST['dob']);
  $gender = mysqli_real_escape_string($db, $_POST['gender']);
  $address = mysqli_real_escape_string($db, $_POST['address']);
  $email = mysqli_real_escape_string($db, $_POST['email']);
  $password_1 = mysqli_real_escape_string($db, $_POST['password_1']);
  $password_2 = mysqli_real_escape_string($db, $_POST['password_2']);

  // form validation: ensure that the form is correctly filled ...
  // by adding (array_push()) corresponding error unto $errors array
  if (empty($first_name)) { array_push($errors, "first_name is required"); }
  if (empty($email)) { array_push($errors, "Email is required"); }
  if (empty($password_1)) { array_push($errors, "Password is required"); }
  if ($password_1 != $password_2) {
	array_push($errors, "The two passwords do not match");
  }

  // first check the database to make sure 
  // a user does not already exist with the same first_name and/or email
  $user_check_query = "SELECT * FROM users WHERE  email='$email' LIMIT 1";
  $result = mysqli_query($db, $user_check_query);
  $user = mysqli_fetch_assoc($result);
  
  if ($user) { // if user exists
    if ($user['email'] === $email) {
      array_push($errors, "email already exists");
    }
  }
  // Finally, register user if there are no errors in the form
  if (count($errors) == 0) {
    $token = createToken();
    $created_at = date('Y-m-d H:i:s');
  	$password = md5($password_1);//encrypt the password before saving in the database

  	$query = "INSERT INTO users (first_name,last_name, email,gender,dob, password,address,token,created_at) 
  			  VALUES('$first_name','$last_name', '$email','$gender','$dob', '$password','$address','$token','$created_at')";
  	mysqli_query($db, $query);
  	$_SESSION['username'] = $username;
  	$_SESSION['success'] = "You are now logged in";
    $response['message'] = "Registration Successfully!";
    $response['status'] = 200;
    $response['success'] = true;
    $response['data'] = json_encode(array("email"=>$email,"token"=>$token));
      	
  }else{
    $response['message'] = "Error";
    $response['status'] = 400;
    $response['success'] = false;
    $response['data'] = json_encode($errors);
  }
  return $response;
}

function createToken($length=16){
    //Generate a random string.
  $token = openssl_random_pseudo_bytes($length);
  //Convert the binary data into hexadecimal representation.
  $token = bin2hex($token);
  //Print it out for example purposes.
  return $token;
}