# Teoria: localStorage i sessionStorage — Trwałość Danych w Przeglądarce

> ✦ **Materiały wspomagane AI** — treść działu powstała z udziałem narzędzi AI
> według programu i standardów INF.03; przed zajęciami weryfikuje ją nauczyciel.

---

## 1. Dlaczego potrzebujemy pamięci przeglądarki?

Do tej pory wszystkie aplikacje frontendowe, które tworzyliśmy w JavaScript, opierały swój stan wyłącznie na **pamięci operacyjnej RAM komputera**. Zmienne deklarowane za pomocą słów kluczowych `let` i `const`, tablice obiektów reprezentujące modele danych CRUD oraz wpisy w formularzach istniały tylko tak długo, jak długo karta przeglądarki pozostawała otwarta i nieodświeżona.

Wciśnięcie klawisza F5, kliknięcie przycisku odświeżenia strony, przejście pod inny adres URL lub przypadkowe zamknięcie okna powodowało natychmiastowe zresetowanie całego środowiska uruchomieniowego JavaScript. W rezultacie użytkownik bezpowrotnie tracił mozolnie wypełniane pola formularza, zdefiniowane preferencje wyglądu (np. tryb ciemny) czy stan koszyka zakupowego.

Rozwiązaniem tego problemu w nowoczesnym ekosystemie witryn i aplikacji WWW jest standard **Web Storage API**, wprowadzony w specyfikacji HTML5. Zapewnia on prosty, wydajny i ustandaryzowany mechanizm przechowywania danych w postaci par **klucz–wartość** bezpośrednio na dysku lokalnym urządzenia użytkownika.

---

## 2. Architektura Web Storage: `localStorage` kontra `sessionStorage`

Specyfikacja Web Storage udostępnia dwa globalne obiekty w kontekście okna przeglądarki (`window.localStorage` oraz `window.sessionStorage`), które implementują ten sam interfejs programistyczny `Storage`, lecz różnią się diametralnie **czasem życia** danych oraz **zasięgiem dostępności**.

```
+-----------------------------------------------------------------------------------+
|                                  WEB STORAGE API                                  |
+-----------------------------------------+-----------------------------------------+
|              localStorage               |             sessionStorage              |
+-----------------------------------------+-----------------------------------------+
| Trwałość: permanentna (dane trwają po   | Trwałość: tymczasowa (dane usuwane      |
| zamknięciu karty, okna i przeglądarki). | natychmiast po zamknięciu danej karty). |
|                                         |                                         |
| Zasięg: współdzielony przez wszystkie   | Zasięg: ściśle ograniczony do jednej,   |
| karty i okna tego samego pochodzenia.   | konkretnej karty (tab) przeglądarki.    |
|                                         |                                         |
| Pojemność: ok. 5 MB na pochodzenie.     | Pojemność: ok. 5 MB na pochodzenie.     |
|                                         |                                         |
| Zastosowanie: motyw graficzny, draft    | Zastosowanie: wieloetapowe kreatory     |
| formularza, koszyk, historia wyszukiwań.| formularzy (wizard), licznik sesyjny.   |
+-----------------------------------------+-----------------------------------------+
```

### Izolacja pochodzenia (Same-Origin Policy)

Zarówno `localStorage`, jak i `sessionStorage` podlegają żelaznej zasadzie **tego samego pochodzenia** (*Same-Origin Policy*). Oznacza to, że dane zapisane przez stronę internetową mogą być odczytane wyłącznie przez skrypty uruchomione pod dokładnie tym samym:
1. **Protokołem** (np. `https://` nie ma dostępu do danych z `http://`),
2. **Domeną** (np. `portal.pl` nie ma dostępu do `sklep.portal.pl`),
3. **Porcie** (np. `localhost:3000` nie współdzieli magazynu z `localhost:8080`).

Dzięki temu witryna bankowości internetowej lub sklep online nie mogą podejrzeć danych zapisanych przez inną, potencjalnie złośliwą witrynę działającą w innej domenie.

> **Po co to jest:**
> Rozdzielenie magazynu na `localStorage` i `sessionStorage` pozwala programiście precyzyjnie zarządzać cyklem życia informacji. Informacje o wybranym motywie kolorystycznym powinny trwać miesiącami (`localStorage`), podczas gdy dane o tymczasowym kroku wypełniania formularza kredytowego powinny zniknąć natychmiast po opuszczeniu karty (`sessionStorage`), nie pozostawiając śladów na cudzym komputerze.

> **Typowa pomyłka:**
> Oczekiwanie, że `sessionStorage` będzie współdzielone pomiędzy dwoma różnymi kartami przeglądarki otwartymi pod tym samym adresem. Każda karta otrzymuje swój własny, całkowicie odizolowany magazyn sesyjny! Jedynie `localStorage` jest współdzielony pomiędzy wszystkimi kartami danej domeny.

---

## 3. Metody interfejsu `Storage`

Oba obiekty (`localStorage` i `sessionStorage`) posiadają identyczny zestaw metod i właściwości:

```javascript
// 1. Zapis danych pod wskazanym kluczem
localStorage.setItem('nazwaKlucza', 'wartoscTekstowa');

// 2. Odczyt danych na podstawie klucza
const odczytanaWartosc = localStorage.getItem('nazwaKlucza'); // zwraca string lub null

// 3. Usunięcie pojedynczego klucza
localStorage.removeItem('nazwaKlucza');

// 4. Całkowite wyczyszczenie całego magazynu domeny
localStorage.clear();

// 5. Odczyt liczby zapisanych kluczy w magazynie
const ileWpisow = localStorage.length;

// 6. Odczyt nazwy klucza na danej pozycji indeksowej (od 0 do length - 1)
const pierwszyKlucz = localStorage.key(0);
```

### Kluczowa cecha: magazyn przyjmuje wyłącznie ciągi znaków (String)

Wszystkie klucze oraz wartości przekazywane do `setItem(key, value)` są **automatycznie konwertowane na ciągi tekstowe** za pomocą niejawnego wywołania metody `.toString()`.

```javascript
// Zapis liczby
localStorage.setItem('liczbaPuntkow', 150);
console.log(typeof localStorage.getItem('liczbaPuntkow')); // "string", a nie "number"!

// Zapis wartości logicznej boolean
localStorage.setItem('regulaminZaakceptowany', true);
console.log(localStorage.getItem('regulaminZaakceptowany') === true); // false! Ponieważ "true" !== true
console.log(localStorage.getItem('regulaminZaakceptowany') === 'true'); // true

// Błędny zapis obiektu bez serializacji JSON:
const uzytkownik = { imie: 'Anna', rola: 'Admin' };
localStorage.setItem('uzytkownik', uzytkownik);
console.log(localStorage.getItem('uzytkownik')); // "[object Object]" — bezpowrotna utrata danych!
```

> **Po co to jest:**
> Metody `setItem()` i `getItem()` tworzą jednolity interfejs słownikowy. Wymuszenie typu tekstowego ułatwia optymalizację pamięciową silnika przeglądarki i uniemożliwia przypadkowe umieszczanie w pamięci obiektów zawierających referencje do żywych węzłów drzewa DOM.

> **Typowa pomyłka:**
> Próba bezpośredniego porównania wartości logicznej `if (localStorage.getItem('flaga') === true)`. Odczytana wartość jest zawsze łańcuchem znaków `"true"` lub `"false"`, a w przypadku braku klucza — wartością `null`. Zawsze sprawdzaj `=== 'true'` lub stosuj jawną konwersję.

---

## 4. Integracja z JSON — Zapis i Odczyt Struktur Złożonych

Aby zapisać w Web Storage złożone obiekty, tablice rekordów lub konfiguracje, musimy połączyć mechanizmy Web Storage z poznanym w module T60 obiektem `JSON`:
1. **Przed zapisem:** przekształcamy strukturę w ciąg tekstowy za pomocą `JSON.stringify()`.
2. **Po odczycie:** odtwarzamy strukturę w pamięci RAM za pomocą `JSON.parse()`.

### Wzorzec bezpiecznego zapisu obiektu lub tablicy

```javascript
const preferencjeUzytkownika = {
  motyw: 'ciemny',
  wielkoscCzcionki: 16,
  powiadomienia: true
};

try {
  const jsonTekst = JSON.stringify(preferencjeUzytkownika);
  localStorage.setItem('profil_preferencje', jsonTekst);
} catch (error) {
  console.error('Błąd zapisu do localStorage:', error.message);
}
```

### Wzorzec bezpiecznego odczytu z obsługą `null` i wartości domyślnej

Metoda `getItem()` zwraca `null`, jeśli klucz nie istnieje w magazynie (np. przy pierwszej wizycie użytkownika na stronie). Dlatego przed parsowaniem należy bezwzględnie sprawdzić obecność danych:

```javascript
function wczytajPreferencje() {
  const domyslnePreferencje = {
    motyw: 'jasny',
    wielkoscCzcionki: 14,
    powiadomienia: false
  };

  const suroweDane = localStorage.getItem('profil_preferencje');

  // Krok 1: Weryfikacja, czy klucz w ogóle istnieje
  if (suroweDane === null) {
    return domyslnePreferencje;
  }

  // Krok 2: Bezpieczne parsowanie w bloku try...catch
  try {
    const sparsowaneDane = JSON.parse(suroweDane);
    return sparsowaneDane;
  } catch (error) {
    console.warn('Wykryto uszkodzone dane w magazynie, przywracam domyślne:', error.message);
    // Usunięcie uszkodzonego klucza, by nie blokował aplikacji w przyszłości
    localStorage.removeItem('profil_preferencje');
    return domyslnePreferencje;
  }
}
```

> **Po co to jest:**
> Zabezpieczenie odczytu blokiem `try...catch` chroni aplikację przed całkowitą awarią (*crash* skryptu). Użytkownik lub złośliwe rozszerzenie przeglądarki może ręcznie zmodyfikować zawartość `localStorage` w narzędziach DevTools, wpisując niepoprawny składniowo ciąg JSON. Brak obsługi wyjątku `SyntaxError` unieruchomiłby całą stronę.

> **Typowa pomyłka:**
> Bezpośrednie wywołanie `JSON.parse(localStorage.getItem('klucz'))` bez wcześniejszego sprawdzenia `null`. Choć `JSON.parse(null)` zwraca `null` i nie rzuca błędu, to dalsza próba odwołania się do właściwości `dane.motyw` natychmiast wywoła krytyczny wyjątek `TypeError: Cannot read properties of null`.

---

## 5. Limity pamięci i obsługa błędu `QuotaExceededError`

Magazyn Web Storage nie ma nieskończonej pojemności. Większość współczesnych przeglądarek internetowych (Chrome, Firefox, Safari, Edge) przydziela limit **około 5 MB danych tekstowych na jedno pochodzenie**.

W przypadku próby przekroczenia tego limitu przeglądarka rzuci błąd `DOMException` o nazwie `QuotaExceededError`. Profesjonalna aplikacja frontendowa powinna przechwytywać takie sytuacje:

```javascript
function zapiszBezpiecznieDoStorage(klucz, wartoscTekstowa) {
  try {
    localStorage.setItem(klucz, wartoscTekstowa);
    return true;
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      console.error('Magazyn pamięci podręcznej przeglądarki jest pełny!');
      // Prezentacja czytelnego komunikatu w interfejsie użytkownika
      const kontenerBledu = document.getElementById('komunikat-bledu');
      if (kontenerBledu) {
        kontenerBledu.textContent = 'Nie udało się zapisać danych: pamięć przeglądarki jest przepełniona.';
      }
    } else {
      console.error('Wystąpił nieoczekiwany błąd zapisu:', error.message);
    }
    return false;
  }
}
```

> **Po co to jest:**
> Magazyn Web Storage zaprojektowano do przechowywania lekkich ustawień, metadanych i prostych stanów, a nie plików graficznych czy gigantycznych baz danych. Przechwycenie błędu przepełnienia pozwala powiadomić użytkownika zamiast doprowadzić do cichego zignorowania operacji zapisu.

> **Typowa pomyłka:**
> Próba kodowania dużych zdjęć do formatu Base64 i masowego zapisywania ich w `localStorage`. Zaledwie dwa lub trzy zdjęcia o wysokiej rozdzielczości wyczerpią cały limit 5 MB, blokując działanie pozostałych modułów aplikacji.

---

## 6. Bezpieczeństwo i ochrona przed atakami XSS (Cross-Site Scripting)

Jednym z najważniejszych zagadnień bezpieczeństwa przy pracy z pamięcią przeglądarki jest zapobieganie atakom **Stored XSS (Persistent XSS)**.

### Zasada ograniczonego zaufania do danych ze Storage

Dane znajdujące się w `localStorage` nie mogą być traktowane jako w 100% bezpieczne i godne zaufania. Każdy użytkownik może otworzyć narzędzia programistyczne i wstrzyknąć do magazynu dowolny złośliwy ciąg znaków, na przykład:
```text
<img src="blad.png" onerror="alert('Atak XSS!');">
```

Jeśli programista odczyta taką wartość z magazynu i wstawi ją do dokumentu za pomocą właściwości `innerHTML`:
```javascript
// BŁĄD KRYTYCZNY (ZAGROŻENIE BEZPIECZEŃSTWA):
const zapisanaNazwa = localStorage.getItem('nazwaUzytkownika');
document.getElementById('naglowek').innerHTML = `Witaj, ${zapisanaNazwa}!`; // PODATNOŚĆ NA XSS!
```
Wówczas przeglądarka zinterpretuje wstrzyknięty kod HTML i wykona niebezpieczny skrypt atakującego w kontekście bieżącej sesji!

### Prawidłowe i bezpieczne renderowanie danych

Wszystkie dane tekstowe pobierane z magazynu `localStorage` i `sessionStorage` należy wypisywać na stronę **wyłącznie** za pomocą:
1. Bezpiecznej właściwości `element.textContent`, która traktuje wszelkie znaki specjalne (np. `<`, `>`, `&`) jako zwykły tekst, neutralizując kod HTML,
2. Dynamicznie tworzonych węzłów `document.createTextNode()` lub metody `document.createElement()`.

```javascript
// POPRAWNIE I BEZPIECZNIE:
const zapisanaNazwa = localStorage.getItem('nazwaUzytkownika') || 'Gość';
const naglowek = document.getElementById('naglowek');
naglowek.textContent = `Witaj, ${zapisanaNazwa}!`; // Bezpieczne — znaki HTML nie zostaną zinterpretowane
```

### Ograniczenia poufności danych

Magazyn Web Storage jest w całości dostępny dla każdego kodu JavaScript działającego na danej stronie. Z tego względu w `localStorage` i `sessionStorage`:
- **NIGDY nie przechowujemy:** haseł użytkownika w postaci jawnej, wrażliwych danych osobowych (np. numerów PESEL, danych kart płatniczych) ani poufnych tokenów autoryzacyjnych o wysokim poziomie uprawnień.
- Dane wymagające pełnej ochrony przed kradzieżą przez skrypty klienta powinny być przechowywane w ciasteczkach z flagą `HttpOnly` (omawianych w module T62).

---

## 7. Praktyczny scenariusz: Zapisywanie draftu (szkicu) formularza

Jednym z najczęstszych zastosowań `localStorage` w komercyjnych serwisach jest automatyczne zapamiętywanie wypełnianych pól formularza podczas pisania. Jeśli użytkownik przypadkowo odświeży stronę, jego wpisy zostaną natychmiast odtworzone z magazynu.

```javascript
// Pobieramy referencje do elementów formularza
const formularz = document.getElementById('formularz-kontaktowy');
const poleTytul = document.getElementById('tytul');
const poleTresc = document.getElementById('tresc');

// Klucz w magazynie
const STORAGE_KEY = 'draft_formularza_kontaktowego';

// 1. Funkcja odtwarzająca dane po załadowaniu strony
function przywrocSzkic() {
  const suroweDane = localStorage.getItem(STORAGE_KEY);
  if (!suroweDane) return;

  try {
    const szkic = JSON.parse(suroweDane);
    if (szkic.tytul) poleTytul.value = szkic.tytul;
    if (szkic.tresc) poleTresc.value = szkic.tresc;
  } catch (e) {
    console.error('Błąd odtwarzania szkicu:', e.message);
  }
}

// 2. Funkcja zapisująca bieżący stan pól
function zapiszSzkic() {
  const stan = {
    tytul: poleTytul.value,
    tresc: poleTresc.value,
    ostatniaModyfikacja: Date.now()
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stan));
}

// 3. Nasłuchiwanie na zdarzenia wprowadzania tekstu
poleTytul.addEventListener('input', zapiszSzkic);
poleTresc.addEventListener('input', zapiszSzkic);

// 4. Czyszczenie szkicu po udanym wysłaniu formularza
formularz.addEventListener('submit', (e) => {
  e.preventDefault();
  // Walidacja i przetwarzanie...
  console.log('Formularz wysłany pomyślnie!');
  
  // Usuwamy szkic z magazynu, ponieważ został pomyślnie zapisany
  localStorage.removeItem(STORAGE_KEY);
  formularz.reset();
});

// Inicjalizacja przy starcie skryptu
przywrocSzkic();
```

---

## 8. Diagnostyka w przeglądarce (Narzędzia DevTools)

Podczas tworzenia i testowania aplikacji korzystających z Web Storage niezastąpione są narzędzia deweloperskie wbudowane w przeglądarkę internetową (klawisz F12 lub skrót Ctrl+Shift+I):

1. Przejdź do zakładki **Application** (w Google Chrome, Edge) lub **Storage** (w Mozilla Firefox).
2. W panelu bocznym rozwiń sekcję **Storage** i wybierz odpowiednio **Local Storage** lub **Session Storage**.
3. Kliknij adres bieżącego pochodzenia (np. `http://localhost:3000` lub `file://`).
4. W oknie głównym zobaczysz tabelę zawierającą kolumny:
   - **Key:** nazwa klucza tekstowego,
   - **Value:** zapisana wartość tekstowa.
5. Z poziomu tego widoku możesz:
   - Podglądać wartości w czasie rzeczywistym,
   - Kliknąć dwukrotnie na wartość, aby ją ręcznie zmodyfikować w celach testowych,
   - Zaznaczyć wiersz i wcisnąć klawisz Delete, aby przetestować zachowanie aplikacji przy braku klucza,
   - Kliknąć ikonę przekreślonego kółka (*Clear All*), aby wyczyścić cały magazyn i symulować pierwszą wizytę nowego użytkownika.

---

## 9. Podsumowanie składniowe

| Operacja | Składnia `localStorage` | Składnia `sessionStorage` |
| :--- | :--- | :--- |
| **Zapis wartości** | `localStorage.setItem('k', 'v')` | `sessionStorage.setItem('k', 'v')` |
| **Odczyt wartości** | `const v = localStorage.getItem('k')` | `const v = sessionStorage.getItem('k')` |
| **Usunięcie wpisu** | `localStorage.removeItem('k')` | `sessionStorage.removeItem('k')` |
| **Wyczyszczenie magazynu** | `localStorage.clear()` | `sessionStorage.clear()` |
| **Liczba elementów** | `localStorage.length` | `sessionStorage.length` |
| **Zapis obiektu JSON** | `localStorage.setItem('k', JSON.stringify(obj))` | `sessionStorage.setItem('k', JSON.stringify(obj))` |
| **Odczyt obiektu JSON** | `const obj = JSON.parse(localStorage.getItem('k'))` | `const obj = JSON.parse(sessionStorage.getItem('k'))` |
