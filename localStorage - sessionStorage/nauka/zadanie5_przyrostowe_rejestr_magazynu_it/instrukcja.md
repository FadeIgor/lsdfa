# Zadanie 5 (Przyrostowe): Trwały rejestr magazynowy IT z obsługą kolekcji w localStorage

## Cel zadania
Celem zwieńczenia działu jest zbudowanie kompletnej, trwałej aplikacji rejestru magazynowego podzespołów komputerowych, łączącej operacje CRUD w pamięci operacyjnej z automatyczną persystencją danych w `localStorage`. Uczeń przećwiczy pełny cykl życia kolekcji obiektów (odczyt przy starcie, walidacja, serializacja, dynamiczny re-render widoku oraz ochrona przed XSS).

## Gdzie to się stosuje? (Przykłady ze świata aplikacji)
- **Aplikacje typu offline-first (PWA, systemy magazynowe):** umożliwianie pracownikom magazynu rejestracji przyjęć i wydań towaru nawet przy chwilowym zaniku łączności z serwerem.
- **Koszyki sklepowe e-commerce (np. Allegro, Amazon):** trwałe przechowywanie listy wybranych produktów w przeglądarce klienta pomiędzy kolejnymi wizytami.
- **Systemy zarządzania stanem części w serwisach komputerowych:** lokalna ewidencja dostępnych podzespołów z natychmiastowym wyszukiwaniem i filtrowaniem.

## Wymagania funkcjonalne
1. **Model danych podzespołu:** Każdy element magazynu reprezentowany jest przez obiekt o polach:
   - `id` (unikalny identyfikator numeryczny, np. `Date.now()`),
   - `nazwa` (nazwa podzespołu, np. "Dysk SSD 1TB NVMe"),
   - `kategoria` (np. "Dyski", "Pamięci RAM", "Karty graficzne", "Zasilacze"),
   - `ilosc` (liczba sztuk na stanie, liczba całkowita > 0),
   - `cena` (cena jednostkowa w PLN).
2. **Inicjalizacja i odczyt z `localStorage`:**
   - Przy uruchomieniu skrypt próbuje odczytać klucz `it_partner_magazyn`.
   - Jeśli klucz istnieje, deszyfruje dane za pomocą `JSON.parse()` w bloku `try...catch`. W przypadku wykrycia błędu składniowego aplikacja oczyszcza uszkodzony wpis i ładuje 3 domyślne rekordy startowe.
   - Jeśli klucz nie istnieje, ładuje 3 rekordy startowe i zapisuje je do `localStorage`.
3. **Dodawanie nowego rekordu (`submit`):**
   - Po wypełnieniu formularza `#formularz-czesci` i zatwierdzeniu przyciskiem `#btn-dodaj` następuje zablokowanie domyślnej akcji (`event.preventDefault()`).
   - Następuje walidacja pól (nazwa min. 3 znaki, ilość > 0, cena > 0).
   - Nowy obiekt trafia do tablicy stanu, tablica zostaje zapisana w `localStorage` za pomocą `JSON.stringify()`, formularz zostaje wyczyszczony (`form.reset()`), a widok tabeli odświeżony.
4. **Prezentacja danych (re-render) i ochrona anty-XSS:**
   - Tabela `#tabela-czesci` renderuje wiersze `<tr>` z komórkami `<td>`.
   - Wartości tekstowe (`nazwa`, `kategoria`) wprowadzane są do komórek **wyłącznie za pomocą właściwości `textContent`**, co zapobiega podatnościom XSS.
   - Każdy wiersz zawiera przycisk usuwania z atrybutem `data-id`.
5. **Usuwanie rekordu:**
   - Kliknięcie przycisku usuwania filtruje tablicę stanu (`filter`), usuwając rekord o wskazanym `id`.
   - Zaktualizowana tablica trafia do `localStorage`, a widok tabeli i licznik magazynu `#licznik-magazynu` zostają odświeżone.
6. **Wyszukiwarka w czasie rzeczywistym:**
   - Wpisanie frazy w kontrolce `#pole-szukaj` filtruje wyświetlane wiersze w tabeli (metoda `filter` na kopii widoku), bez usuwania danych z `localStorage`.

## Treść do wpisania
W interfejsie należy umieścić dosłowne teksty:
- Tytuł nagłówka: "IT-Partner Serwis — Ewidencja Magazynowa Części"
- Etykieta nazwy: "Nazwa podzespołu lub modelu części:"
- Etykieta kategorii: "Kategoria komponentu komputerowego:"
- Opcje kategorii: "Dyski i pamięci masowe", "Pamięci RAM DDR4/DDR5", "Karty graficzne", "Zasilacze i obudowy"
- Etykieta ilości: "Liczba sztuk na stanie magazynowym:"
- Etykieta ceny: "Cena jednostkowa netto (w PLN):"
- Przycisk formularza: "Zarejestruj podzespół w magazynie"
- Etykieta wyszukiwarki: "Filtruj podzespoły według nazwy:"
- Komunikat pustego stanu: "Brak podzespołów w magazynie. Dodaj pierwszy element powyżej."

## Wskazówki techniczne
- Używaj `textContent` lub `document.createElement('td')` dla każdej komórki tabeli.
- Przechowuj stan w tablicy w pamięci i przy każdej modyfikacji (dodanie, usunięcie) wywołuj funkcję pomocniczą `zapiszMagazynDoStorage()`.
- Wypisuj liczbę pozycji i łączną wartość magazynu w dedykowanych elementach informacyjnych.
