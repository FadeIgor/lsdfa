// Zadanie 5 (Przyrostowe): Trwały rejestr magazynowy IT z obsługą kolekcji w localStorage
const KLUCZ_MAGAZYNU = 'it_partner_magazyn';

// Baza startowa w przypadku braku wpisu w localStorage
const POCZATKOWE_CZESCI = [
  { id: 101, nazwa: 'Dysk SSD 1TB NVMe M.2', kategoria: 'Dyski i pamięci masowe', ilosc: 8, cena: 320.00 },
  { id: 102, nazwa: 'Pamięć RAM 16GB DDR4 3200MHz', kategoria: 'Pamięci RAM DDR4/DDR5', ilosc: 12, cena: 185.00 },
  { id: 103, nazwa: 'Zasilacz ATX 650W 80 Plus Bronze', kategoria: 'Zasilacze i obudowy', ilosc: 5, cena: 260.00 }
];

let stanMagazynu = [];

// Elementy DOM
const formularz = document.getElementById('formularz-czesci');
const inputNazwa = document.getElementById('nazwa-czesci');
const selectKategoria = document.getElementById('kategoria-czesci');
const inputIlosc = document.getElementById('ilosc-czesci');
const inputCena = document.getElementById('cena-czesci');
const inputSzukaj = document.getElementById('pole-szukaj');
const cialoTabeli = document.getElementById('cialo-tabeli');
const licznikEl = document.getElementById('licznik-magazynu');
const pustyKomunikat = document.getElementById('komunikat-pusty');

// KROK 1: Napisz funkcję wczytującą stan z localStorage
// Sprawdź czy istnieje KLUCZ_MAGAZYNU w localStorage.
// Jeśli tak, zdeserializuj JSON.parse() w bloku try...catch.
// Jeśli nie lub wystąpi błąd, zainicjalizuj POCZATKOWE_CZESCI i zapisz do localStorage.
function wczytajMagazynZPamieci() {
  // Twoje rozwiazanie: KROK 1
}

// KROK 2: Napisz funkcję pomocniczą zapisującą bieżący stan do localStorage
function zapiszDoStorage() {
  // Twoje rozwiazanie: KROK 2
  // Użyj JSON.stringify(stanMagazynu) i localStorage.setItem()
}

// KROK 3: Napisz funkcję renderującą wiersze tabeli z ochroną przed XSS
// Pamiętaj: dane tekstowe (nazwa, kategoria) wpisuj do td za pomocą textContent!
function renderujTabele(elementyDoWyswietlenia) {
  // Twoje rozwiazanie: KROK 3
}

// KROK 4: Obsłuż formularz dodawania nowego podzespołu (zdarzenie submit)
formularz.addEventListener('submit', (e) => {
  e.preventDefault();
  // Twoje rozwiazanie: KROK 4
  // Pobierz wartości, stwórz obiekt z id: Date.now(), dodaj do stanMagazynu,
  // wywołaj zapiszDoStorage(), zresetuj formularz i odśwież widok.
});

// KROK 5: Obsłuż usuwanie elementu za pomocą delegacji zdarzeń na ciele tabeli
cialoTabeli.addEventListener('click', (e) => {
  // Twoje rozwiazanie: KROK 5
  // Sprawdź czy kliknięto przycisk z klasą .btn-usun.
  // Odczytaj dataset.id, przefiltruj stanMagazynu, zapisz i zrenderuj.
});

// KROK 6: Obsłuż filtrowanie w czasie rzeczywistym
inputSzukaj.addEventListener('input', () => {
  // Twoje rozwiazanie: KROK 6
  // Przefiltruj stanMagazynu wg wpisanej frazy i wywołaj renderujTabele()
});

// Inicjalizacja przy starcie
wczytajMagazynZPamieci();
