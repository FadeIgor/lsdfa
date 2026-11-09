// Zadanie 3: Konfigurator preferencji i motywu z serializacją JSON
const KLUCZ_STORAGE = 'aroma_cafe_ustawienia';

const DOMYSLNE_USTAWIENIA = {
  motyw: 'cieply',
  powiadomienia: true,
  rozmiarCzcionki: 16
};

const selectMotyw = document.getElementById('wybor-motywu');
const checkboxPowiadomienia = document.getElementById('opcja-powiadomienia');
const suwakRozmiar = document.getElementById('suwak-rozmiar');
const wartoscSuwakaTxt = document.getElementById('wartosc-suwaka');
const btnZapisz = document.getElementById('btn-zapisz-konfiguracje');
const btnPrzywroc = document.getElementById('btn-przywroc-domyslne');
const statusEl = document.getElementById('status-konfiguracji');
const podgladEl = document.getElementById('podglad-karty');

// Aktualizacja etykiety pikseli przy przesuwaniu suwaka
suwakRozmiar.addEventListener('input', () => {
  wartoscSuwakaTxt.textContent = `${suwakRozmiar.value}px`;
});

// KROK 1: Napisz funkcję aplikującą ustawienia do kontrolek i podglądu DOM
// Zaktualizuj selectMotyw.value, checkboxPowiadomienia.checked, suwakRozmiar.value
// Zmień klasę na podgladEl (usuń motyw-* i dodaj motyw-${ustawienia.motyw})
// Zmień podgladEl.style.fontSize na `${ustawienia.rozmiarCzcionki}px`
function zastosujUstawienia(ustawienia) {
  // Twoje rozwiazanie: KROK 1
}

// KROK 2: Napisz funkcję wczytującą konfigurację z localStorage przy starcie
// Użyj getItem(), sprawdź null, użyj JSON.parse() w bloku try...catch.
// Przy błędzie usuń klucz removeItem() i zwróć DOMYSLNE_USTAWIENIA.
function wczytajUstawienia() {
  // Twoje rozwiazanie: KROK 2
  return DOMYSLNE_USTAWIENIA;
}

// KROK 3: Obsłuż kliknięcie przycisku "Zapisz preferencje w pamięci"
btnZapisz.addEventListener('click', () => {
  // Twoje rozwiazanie: KROK 3
  // Zbierz wartości z kontrolek do obiektu, zserializuj JSON.stringify(),
  // zapisz w localStorage i zastosuj w podglądzie.
});

// KROK 4: Obsłuż kliknięcie przycisku "Przywróć konfigurację fabryczną"
btnPrzywroc.addEventListener('click', () => {
  // Twoje rozwiazanie: KROK 4
  // Usuń klucz metodą localStorage.removeItem(), zastosuj DOMYSLNE_USTAWIENIA i wyświetl komunikat.
});

// Start: załaduj i zastosuj konfigurację
const startowe = wczytajUstawienia();
zastosujUstawienia(startowe);
