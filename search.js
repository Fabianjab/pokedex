document.addEventListener("DOMContentLoaded", function () {
});

function search() {
  var input, filter, divs, a, i, txtValue;
  input = document.getElementById('searchedPokemon');
  filter = input.value.toUpperCase();
  divs = document.querySelectorAll('.pokemonsCard'); // Alle Pokémon-Divs auswählen

  for (i = 0; i < divs.length; i++) {
    a = divs[i].getElementsByTagName("h2")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      divs[i].style.display = ""; // Div sichtbar machen, wenn der Name übereinstimmt
    } else {
      divs[i].style.display = "none"; // Div ausblenden, wenn der Name nicht übereinstimmt
    }
  }
}
