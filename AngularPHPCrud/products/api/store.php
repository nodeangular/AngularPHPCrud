<?php
require 'connect.php';

// Get the posted data.
 $postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
	

  // Validate.
 if(trim($request->data->prodName) === '' || trim($request->data->prodDesc) === '')
  {
    return http_response_code(400);
  }
	
  // Sanitize.
  $prodName = mysqli_real_escape_string($con, trim($request->data->prodName));
  $prodDesc = mysqli_real_escape_string($con, trim($request->data->prodDesc));
  $prodPrice = mysqli_real_escape_string($con, $request->data->prodPrice);
  $catId = mysqli_real_escape_string($con, $request->data->cat_id);
    

  // Store.
  $sql = "INSERT INTO `products`(
     `prod_name`,
     `prod_description`,
     `prod_price`,
     `cat_id`
 ) VALUES
  ('{$prodName}',
  '{$prodDesc}',
  '{$prodPrice}',
  '{$catId}')
  ";

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $prods = [
      'prod_name' => $prodName,
      'prod_description' => $prodDesc,
      'prod_price' => $prodPrice,
      'cat_id' => $prodPrice,
      'prod_id' => mysqli_insert_id($con)
    ];
    echo json_encode(['data'=>$prods]);
  }
  else
  {
    http_response_code(422);
  }
}
