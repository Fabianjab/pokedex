document.addEventListener("DOMContentLoaded", function () {
});

function search() {
  var input, filter, divs, a, i, txtValue;
  input = document.getElementById('searchedPokemon');
  filter = input.value.toUpperCase();
  divs = document.querySelectorAll('.pokemonsCard');

  for (i = 0; i < divs.length; i++) {
    a = divs[i].getElementsByTagName("h2")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      divs[i].style.display = "";
    } else {
      divs[i].style.display = "none";
    }
  }
}
