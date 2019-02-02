<?php
/**
 * Returns the list of cars.
 */
require 'connect.php';
    
$prods = [];
$sql = "SELECT * FROM  products";

if($result = mysqli_query($con,$sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $prods[$cr]['id']    = $row['prod_id'];
    $prods[$cr]['prod_name'] = $row['prod_name'];
    $prods[$cr]['prod_description'] = $row['prod_description'];
    $prods[$cr]['prod_price'] = $row['prod_price'];
    $cr++;
  }
    
  echo json_encode(['data'=>$prods]);
}
else
{
  http_response_code(404);
}
