const updatePetHandler = async (event) => {
    event.preventDefault();
    console.log("test")
    const name = document.querySelector('#updated-name').value.trim();
    const animal_type = document.querySelector('#updated-animal').value.trim();
    const gender = document.querySelector('#updated-gender').value.trim();
    // const birthday = document.querySelector('#updated-birthday').value.trim();
    // const weight = document.querySelector('#updated-weight').value.trim();
    // const vaccinations = document.querySelector('#updated-vacs').value.trim();
    // const sterilized = document.querySelector('#updated-sterilized').value.trim();
    const breed = document.querySelector('#updated-breed').value.trim();
    const id = document.querySelector('#update-pet-btn').dataset?.id
    console.log(id)
    if (id) {
              const response = await fetch(`/api/pet/${id}`, {
                  method: 'PUT',
                  body: JSON.stringify({ name, animal_type, gender,breed }),
                  headers: { 'Content-Type': 'application/json' },
              });
  
  
      if (response.ok) {
        document.location.replace(`/api/pet/${id}`);
        // alert('Update successful')
      } else {
        alert('Failed to update profile');
      }
    }
  };
  
  document
    .querySelector('#update-pet-btn')
    .addEventListener('click', updatePetHandler);