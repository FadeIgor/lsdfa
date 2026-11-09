# Pomoc Krótka Ogólna — Moduł T61

Podręczny przewodnik po strukturze zadań oraz kluczowych konstrukcjach składniowych Web Storage API dla modułu **T61: localStorage i sessionStorage**.

---

## 1. Struktura zadania: Szablon startowy a folder `rozwiazanie/`

Każde zadanie w katalogach `nauka/` oraz `sprawdzian/` posiada przejrzystą, powtarzalną strukturę plików:

| Element | Lokalizacja | Przeznaczenie |
| :--- | :--- | :--- |
| **Instrukcja zadania** | `instrukcja.md` | Dokładny opis problemu, wytyczne techniczne oraz wykaz treści do umieszczenia w aplikacji. |
| **Szablon startowy ucznia** | Katalog główny zadania (`index.html`, `style.css`, `script.js`) | Baza wyjściowa do samodzielnej pracy: zawiera kompletny szkielet HTML, ostylowanie CSS oraz plik JavaScript z komentarzami wskazującymi miejsca implementacji. |
| **Wzorzec referencyjny** | Podkatalog `rozwiazanie/` (`index.html`, `style.css`, `script.js`) | W 100% kompletny, działający kod demonstracyjny. Służy do autoweryfikacji po podjęciu samodzielnej próby rozwiązania zadania. |

---

## 2. Pigułka składniowa Web Storage API

```javascript
// ==========================================
// 1. Zapis i odczyt wartości prostych
// ==========================================
// Zapis ciągu tekstowego do trwałej pamięci
localStorage.setItem('klucz', 'wartoscTekstowa');

// Odczyt wartości z pamięci (zwraca string lub null)
const wartosc = localStorage.getItem('klucz');

// Bezpieczne sprawdzenie obecności klucza
if (wartosc !== null) {
  console.log('Znaleziono wpis:', wartosc);
}

// Usunięcie pojedynczego klucza
localStorage.removeItem('klucz');

// Całkowite wyczyszczenie magazynu domeny
localStorage.clear();

// ==========================================
// 2. Integracja ze strukturami złożonymi (JSON)
// ==========================================
// Zapis obiektu / tablicy
const daneModelu = { id: 101, status: 'aktywny', elementy: ['A', 'B'] };
localStorage.setItem('rejestr', JSON.stringify(daneModelu));

// Odczyt z bezpiecznym parsowaniem i wartością domyślną
function odczytajModel() {
  const surowe = localStorage.getItem('rejestr');
  if (surowe === null) {
    return { id: 0, status: 'brak', elementy: [] }; // Wartość domyślna
  }
  try {
    return JSON.parse(surowe);
  } catch (blad) {
    console.error('Uszkodzony format JSON w pamięci:', blad.message);
    localStorage.removeItem('rejestr');
    return { id: 0, status: 'brak', elementy: [] };
  }
}

// ==========================================
// 3. Pamięć sesyjna (sessionStorage)
// ==========================================
// Dokładnie te same metody, ale dane znikają po zamknięciu karty
sessionStorage.setItem('krokKreatora', '2');
const bieżącyKrok = sessionStorage.getItem('krokKreatora');
```

---

## 3. Szybkie przypomnienie (Checklist deweloperski)

1. **Magazyn przyjmuje tylko napisy:** Każda liczba, obiekt czy wartość logiczna przekazana do `setItem()` jest zamieniana na string. Złożone obiekty zawsze serializuj za pomocą `JSON.stringify()`.
2. **Sprawdzaj wartość `null`:** Gdy dany klucz nie istnieje w magazynie, `getItem()` zwraca `null`, a nie pusty ciąg czy `undefined`. Zawsze sprawdzaj `if (dane !== null)` przed dalszym przetwarzaniem.
3. **Podgląd w DevTools:** Otwórz konsolę klawiszem F12, przejdź do zakładki **Application** (Chrome/Edge) lub **Storage** (Firefox), rozwiń **Local Storage** i kliknij adres strony. Zobaczysz tam tabelę ze wszystkimi kluczami i wartościami.
4. **Zatrzymanie przeładowania formularza:** W zdarzeniu `submit` formularza zawsze jako pierwszą instrukcję wywołuj `event.preventDefault()`, aby przeglądarka nie odświeżyła strony przed zapisaniem danych w magazynie.
5. **Nigdy nie wstrzykuj danych do `innerHTML`:** Wypisuj odczytane wartości z `localStorage` wyłącznie za pomocą właściwości `element.textContent`, aby chronić aplikację przed atakami XSS.
