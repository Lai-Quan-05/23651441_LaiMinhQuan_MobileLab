# PUT /mobilelab/tours/:id.json
header 'Content-Type', 'application/json'
id = params['id'].to_s
favorite = entity && entity['isFavorite']

if !['1', '2', '3', '4', '5'].include?(id)
  status 404
  { 'error' => 'Tour not found' }
elsif favorite != true && favorite != false
  status 400
  { 'error' => 'isFavorite must be boolean' }
else
  { 'id' => id, 'isFavorite' => favorite }
end
