<?php
/**
 * Returns the list of cars.
 */
require 'connect.php';
    
$cats = [];
$sql = "SELECT * FROM cats";

if($result = mysqli_query($con,$sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $cats[$cr]['id']    = $row['id'];
    $cats[$cr]['catName'] = $row['catName'];
    $cats[$cr]['catDesc'] = $row['catDesc'];
    $cats[$cr]['parent_id'] = $row['parent_id'];
    $cr++;
  }
    
  echo json_encode(['data'=>$cats]);
}
else
{
  http_response_code(404);
}
