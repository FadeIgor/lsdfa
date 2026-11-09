# Pomoc Dostępna — Moduł T61

Wersja materiału dydaktycznego przygotowana z myślą o uczniach preferujących jednoznaczny, dosłowny przekaz instruktażowy.

---

## 1. Słowniczek pojęć tego działu

* **Pamięć przeglądarki (Web Storage):** Miejsce na dysku komputera, w którym przeglądarka internetowa zapisuje dane tekstowe dla konkretnej strony WWW.
* **localStorage:** Magazyn trwały. Dane zapisane w tym miejscu nie znikają po zamknięciu karty ani po wyłączeniu komputera.
* **sessionStorage:** Magazyn sesyjny. Dane zapisane w tym miejscu znikają w momencie zamknięcia karty w przeglądarce.
* **Klucz (key):** Unikalna nazwa, pod którą zapisujesz daną informację (na przykład napis `"motyw"` lub `"login"`).
* **Wartość (value):** Informacja tekstowa przypisana do danego klucza (na przykład napis `"ciemny"`).
* **Metoda setItem():** Polecenie w języku JavaScript służące do zapisania klucza i wartości w magazynie.
* **Metoda getItem():** Polecenie w języku JavaScript służące do odczytania wartości na podstawie nazwy klucza.
* **Wartość null:** Specjalna wartość w języku JavaScript oznaczająca brak danych. Pojawia się, gdy pytasz o klucz, który nie został wcześniej zapisany.

---

## 2. Standardowa ścieżka pracy nad zadaniem

Wykonuj zadania krok po kroku według poniższej, stałej procedury.

1. **Otwórz instrukcję:** Przeczytaj plik `instrukcja.md` znajdujący się w katalogu zadania. Dowiesz się z niego, jak ma działać aplikacja oraz jakie nazwy identyfikatorów i treści należy zastosować.
2. **Otwórz pliki szablonu:** Otwórz pliki `index.html` oraz `script.js` znajdujące się bezpośrednio w folderze danego zadania. Plik `style.css` jest już w pełni przygotowany.
3. **Zlokalizuj miejsce pracy:** W pliku `index.html` szukaj komentarzy `<!-- KROK N: ... -->`. W pliku `script.js` kod wpisuj pod komentarzami `// Twoje rozwiazanie`.
4. **Uruchom stronę w przeglądarce:** Otwórz plik `index.html` w przeglądarce internetowej. Wciśnij klawisz F12, aby otworzyć konsolę i sprawdzać, czy nie pojawiają się czerwone komunikaty o błędach.
5. **Przetestuj działanie:** Wpisz dane do formularza lub kliknij przycisk. Sprawdź w zakładce *Application -> Local Storage*, czy dane zostały zapisane, a następnie odśwież stronę klawiszem F5 i sprawdź, czy stan się zachował.
6. **Porównaj z rozwiązaniem wzorcowym:** Dopiero po samodzielnym ukończeniu zadania otwórz pliki w podkatalogu `rozwiazanie/`. Porównaj swój kod z kodem wzorcowym, aby upewnić się, że zastosowano bezpieczne praktyki.

---

## 3. Instrukcja krok po kroku: Zapis i odczyt z pamięci

Poniższy schemat przedstawia najprostszą operację zapisania i odczytania tekstu z `localStorage`.

### Krok 1: Zapisanie tekstu pod kluczem
Aby zapisać wartość wpisaną przez użytkownika do pola tekstowego, użyj metody `setItem()`:
```javascript
const poleTekstowe = document.getElementById('imie');
const wartoscWpisana = poleTekstowe.value;

localStorage.setItem('zapisaneImie', wartoscWpisana);
```

### Krok 2: Odczytanie tekstu po otwarciu strony
Podczas startu skryptu odczytaj wartość za pomocą metody `getItem()`. Sprawdź, czy wartość nie jest pusta:
```javascript
const pobranaWartosc = localStorage.getItem('zapisaneImie');

if (pobranaWartosc !== null) {
  const poleTekstowe = document.getElementById('imie');
  poleTekstowe.value = pobranaWartosc;
}
```

### Krok 3: Bezpieczne wyświetlenie tekstu na stronie
Gdy chcesz wyświetlić odczytany tekst w elemencie strony, zawsze przypisuj go do właściwości `textContent`:
```javascript
const kontenerWyniku = document.getElementById('wynik');
kontenerWyniku.textContent = pobranaWartosc;
```
Nigdy nie wpisuj odczytanych danych do właściwości `innerHTML`, ponieważ mogłoby to umożliwić uruchomienie obcego, złośliwego kodu.

---

## 4. Zasady dostępności cyfrowej (a11y) w zadaniach

Każdy formularz i interfejs korzystający z Web Storage powinien być przyjazny dla każdego użytkownika.

1. **Etykiety dla kontrolek:** Każde pole formularza `<input>` musi posiadać przypisaną etykietę `<label>`. Atrybut `for` etykiety musi być identyczny jak atrybut `id` pola.
2. **Czytelne przyciski:** Każdy przycisk `<button>` musi zawierać jednoznaczny tekst informujący o akcji, na przykład „Zapisz szkic” lub „Wyczyść formularz”.
3. **Komunikaty o stanie:** Po zapisaniu lub wyczyszczeniu danych wyświetlaj krótki, jednoznaczny komunikat tekstowy w dedykowanym kontenerze z atrybutem `role="status"` lub `aria-live="polite"`.
