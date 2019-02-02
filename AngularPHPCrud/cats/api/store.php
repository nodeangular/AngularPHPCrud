<?php
require 'connect.php';

// Get the posted data.
 $postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
	

  // Validate.
 if(trim($request->data->catName) === '' || trim($request->data->catDesc) === '')
  {
    return http_response_code(400);
  }
	
  // Sanitize.
  $catName = mysqli_real_escape_string($con, trim($request->data->catName));
  $catDesc = mysqli_real_escape_string($con, trim($request->data->catDesc));
  $parent_id = mysqli_real_escape_string($con, $request->data->parent_id);
    

  // Store.
  $sql = "INSERT INTO `cats`(`catName`,`catDesc`,`parent_id`) VALUES ('{$catName}','{$catDesc}','{$parent_id}')";

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $cats = [
      'catName' => $catName,
      'catDesc' => $catDesc,
      'parent_id' => $parent_id,
      'id' => mysqli_insert_id($con)
    ];
    echo json_encode(['data'=>$cats]);
  }
  else
  {
    http_response_code(422);
  }
}
