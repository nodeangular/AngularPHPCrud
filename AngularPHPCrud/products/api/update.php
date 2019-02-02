<?php
require 'connect.php';

// Get the posted data.

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
	
  // Validate.
  if ((int)$request->data->id < 1 || trim($request->data->prod_name) == '' || trim($request->data->prod_description)=='') {
    return http_response_code(400);
  }
    
  // Sanitize.
  $id = mysqli_real_escape_string($con, (int)$request->data->id);
  $prodName = mysqli_real_escape_string($con, trim($request->data->prod_name));
  $prodDesc = mysqli_real_escape_string($con, trim($request->data->prod_description));
   $prodPrice = mysqli_real_escape_string($con, $request->data->prod_price);
  // Update.
    $sql = "UPDATE `products` SET `prod_name`='$prodName',`prod_description`='$prodDesc',`prod_price`='$prodPrice' WHERE `prod_id` = '{$id}' LIMIT 1";

  if(mysqli_query($con, $sql))
  {
    http_response_code(204);
  }
  else
  {
    return http_response_code(422);
  }  
}
