<?php
require 'connect.php';

// Get the posted data.
 $postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
	

  // Validate.
 if(trim($request->data->emailId) === '' || trim($request->data->Password) === '')
  {
    return http_response_code(400);
  }
	
  // Sanitize.
  $emailId = mysqli_real_escape_string($con, trim($request->data->emailId));
  $Password = mysqli_real_escape_string($con, trim($request->data->Password));
    
  $sel="select * from admin where email='".$emailId."'  and password='".$Password ."'";
  $qry = mysqli_query($con,$sel);
  $result=mysqli_num_rows($qry);
  $rs=mysqli_fetch_array($qry);

  if($result>0)
  {
    http_response_code(201);
    $users = [
      'email' => $emailId,
      'fullName' => $rs['fullName'],
      'id' => $rs['id'],
      'status'=>'success'

    ];
    echo json_encode(['data'=>$users]);
  }
  else if($result==0){
    $users = [
      'loginStatus' => 'failed'
    ];
    echo json_encode(['data'=>$users]);
  }
  else
  {
    http_response_code(422);
  }
}
