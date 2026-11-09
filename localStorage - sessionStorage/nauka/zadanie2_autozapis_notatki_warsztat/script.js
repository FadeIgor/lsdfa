// Zadanie 2: Autozapis szkicu zlecenia w localStorage
const KLUCZ_NR = 'warsztat_nr_zlecenia';
const KLUCZ_OPIS = 'warsztat_opis_usterki';

const inputNr = document.getElementById('nr-zlecenia');
const textareaOpis = document.getElementById('opis-usterki');
const btnWyczysc = document.getElementById('btn-wyczysc-szkic');
const statusEl = document.getElementById('status-zapisu');

// KROK 1: Przywróć zapisany szkic po załadowaniu strony
// Odczytaj wartości obu kluczy z localStorage metodą getItem().
// Jeśli którykolwiek z nich istnieje (nie jest równy null), przypisz go do .value kontrolki
// i poinformuj użytkownika w statusEl.
function wczytajSzkic() {
  // Twoje rozwiazanie: KROK 1
}

// KROK 2: Zapisuj wprowadzane dane na bieżąco podczas zdarzenia input
// Użyj localStorage.setItem() dla numeru i opisu oraz zaktualizuj statusEl.
function zapiszSzkic() {
  // Twoje rozwiazanie: KROK 2
}

inputNr.addEventListener('input', zapiszSzkic);
textareaOpis.addEventListener('input', zapiszSzkic);

// KROK 3: Obsłuż przycisk czyszczenia szkicu
btnWyczysc.addEventListener('click', () => {
  // Twoje rozwiazanie: KROK 3
  // Usuń oba klucze z localStorage za pomocą removeItem(),
  // wyczyść pola tekstowe i ustaw statusEl.
});

// Uruchomienie przy starcie
wczytajSzkic();
