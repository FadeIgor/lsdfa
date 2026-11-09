// Zadanie 4 (Integrujące): Formularz rezerwacji z autozapisem i licznikiem sesji
const KLUCZ_SESJA = 'kajaki_licznik_sesji';
const KLUCZ_SZKIC = 'kajaki_szkic_rezerwacji';

const form = document.getElementById('formularz-rezerwacji');
const inputImie = document.getElementById('imie-klienta');
const selectKajak = document.getElementById('typ-kajaka');
const inputGodziny = document.getElementById('liczba-godzin');
const checkboxKamizelka = document.getElementById('opcja-kamizelka');
const btnAnuluj = document.getElementById('btn-anuluj-szkic');
const podsumowanieEl = document.getElementById('podsumowanie-rezerwacji');
const licznikSesjiEl = document.getElementById('licznik-sesji');

// Cennik bazowy za godzinę
const CENNIK = {
  jednoosobowy: 25,
  dwuosobowy: 40,
  rodzinny: 55
};

// KROK 1: Obsłuż licznik sesji w sessionStorage
// Sprawdź czy istnieje klucz KLUCZ_SESJA. Jeśli nie, ustaw 1, jeśli tak, zwiększ o 1.
// Wyświetl w licznikSesjiEl tekst: `Odwiedziny w tej sesji: ${liczba}`.
function aktualizujSesje() {
  // Twoje rozwiazanie: KROK 1
}

// KROK 2: Wczytaj szkic z localStorage (jeśli istnieje)
// Użyj getItem(KLUCZ_SZKIC) oraz JSON.parse() w bloku try...catch.
// Uzupełnij kontrolki wartościami ze szkicu.
function wczytajSzkic() {
  // Twoje rozwiazanie: KROK 2
}

// KROK 3: Zapisuj bieżący stan formularza do localStorage
// Zbierz wartości do obiektu i zserializuj za pomocą JSON.stringify().
function zapiszSzkic() {
  // Twoje rozwiazanie: KROK 3
}

// Podpięcie zdarzeń autozapisu
inputImie.addEventListener('input', zapiszSzkic);
selectKajak.addEventListener('change', zapiszSzkic);
inputGodziny.addEventListener('input', zapiszSzkic);
checkboxKamizelka.addEventListener('change', zapiszSzkic);

// KROK 4: Obsłuż zdarzenie submit formularza
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // Twoje rozwiazanie: KROK 4
  // Oblicz koszt: godziny * stawka z CENNIK + (kamizelka ? 10 : 0)
  // Wypisz bezpiecznie podsumowanie w podsumowanieEl za pomocą textContent
  // Usuń szkic z localStorage metodą removeItem() i zresetuj formularz.
});

// KROK 5: Obsłuż przycisk anulowania szkicu
btnAnuluj.addEventListener('click', () => {
  // Twoje rozwiazanie: KROK 5
  // Usuń szkic z localStorage, zresetuj formularz i wyczyść podsumowanie.
});

// Inicjalizacja przy otwarciu
aktualizujSesje();
wczytajSzkic();
