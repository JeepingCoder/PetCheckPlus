const petProfileHandler = async (event) => {
    event.preventDefault();
    console.log("test")
    const name = document.querySelector('#pet-name').value.trim();
    const species = document.querySelector('#species').value.trim();
    const gender = document.querySelector('#gender').value.trim();
    const id = document.querySelector('#add-pet-btn').dataset?.id
    console.log(id)
    if (id) {
              const response = await fetch(`/api/user/${id}`, {
                  method: 'POST',
                  body: JSON.stringify({ name, species, gender}),
                  headers: { 'Content-Type': 'application/json' },
              });
  
  
      if (response.ok) {
        document.location.replace('/profile');
        // alert('Update successful')
      } else {
        alert('Failed to update pet');
      }
    }
  };
  
  document
    .querySelector('#add-pet-btn')
    .addEventListener('click', petProfileHandler);
  