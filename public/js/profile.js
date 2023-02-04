const newPetForm = document.querySelector('#addPetForm')

newPetForm.addEventListener('click', function () {
  newPetForm.classList.toggle('visible');
});

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/pet/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete pet');
    }
  }
};

document
  .getElementById('add-pet-btn')
  .addEventListener('click', addPetHandler);

document
  .getElementById('delete-pet-btn')
  .addEventListener('click', delButtonHandler);
  

