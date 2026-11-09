// Zadanie 1: Licznik odsłon i operacji w sessionStorage
// Klucz sesyjny do zapisu
const KLUCZ_SESJI = 'odwiedziny_recepcji';

// Pobieranie referencji do elementów DOM
const licznikEl = document.getElementById('licznik-odwiedzin');
const btnZwieksz = document.getElementById('btn-zwieksz');
const btnReset = document.getElementById('btn-reset');
const komunikatEl = document.getElementById('komunikat-stanu');

// KROK 1: Napisz funkcję inicjalizującą licznik przy załadowaniu strony
// Odczytaj wartość z sessionStorage za pomocą metody getItem(KLUCZ_SESJI).
// Jeśli klucz nie istnieje, ustaw wartość 1. Jeśli istnieje, zwiększ ją o 1.
// Zapisz zaktualizowaną wartość metodą setItem(KLUCZ_SESJI, nowaWartosc) i wyświetl w licznikEl.
function zainicjalizujLicznik() {
  // Twoje rozwiazanie: KROK 1
}

// KROK 2: Obsłuż kliknięcie przycisku "Zarejestruj operację w sesji"
btnZwieksz.addEventListener('click', () => {
  // Twoje rozwiazanie: KROK 2
  // Pobierz aktualną wartość z sessionStorage, zwiększ o 1, zapisz i zaktualizuj textContent.
});

// KROK 3: Obsłuż kliknięcie przycisku "Wyczyść licznik sesyjny"
btnReset.addEventListener('click', () => {
  // Twoje rozwiazanie: KROK 3
  // Usuń klucz metodą sessionStorage.removeItem(), ustaw textContent licznika na 0
  // i wyświetl komunikat o resecie.
});

// Uruchomienie inicjalizacji przy starcie
zainicjalizujLicznik();
