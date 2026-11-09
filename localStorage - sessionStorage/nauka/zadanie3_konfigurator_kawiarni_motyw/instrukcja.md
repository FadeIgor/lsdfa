# Zadanie 3: Konfigurator preferencji i motywu z serializacją JSON

## Cel zadania
Celem zadania jest opanowanie zapisu i odczytu złożonego obiektu preferencji w pamięci `localStorage` z wykorzystaniem metod `JSON.stringify()` oraz `JSON.parse()`. Uczeń nauczy się zabezpieczać proces parsowania blokiem `try...catch`, definiować stan domyślny oraz natychmiastowo stosować odczytaną konfigurację do stylów i klas elementów drzewa DOM.

## Gdzie to się stosuje? (Przykłady ze świata aplikacji)
- **Serwisy multimedialne i streamingowe (np. YouTube, Spotify):** zapamiętywanie wybranego motywu graficznego (ciemny/jasny), preferencji językowych i głośności.
- **Panele administracyjne (dashboardy B2B):** przechowywanie konfiguracji układu kafelków, gęstości danych w tabeli oraz stanu powiadomień.
- **Aplikacje czytnikowe i portale informacyjne:** zapisywanie preferowanego rozmiaru tekstu i kroju czcionki wybranego przez czytelnika.

## Wymagania funkcjonalne
1. Zdefiniuj w kodzie obiekt wartości domyślnych:
   - `motyw`: `"cieply"`
   - `powiadomienia`: `true`
   - `rozmiarCzcionki`: `16`
2. Przy starcie skryptu odczytaj klucz `aroma_cafe_ustawienia` z `localStorage`.
   - Jeśli klucz istnieje, sparsuj go za pomocą `JSON.parse()` wewnątrz bloku `try...catch`. W przypadku błędu składni przywróć stan domyślny i usuń uszkodzony wpis.
   - Jeśli klucz nie istnieje, zastosuj wartości domyślne.
   - Ustaw wartości w kontrolkach: `#wybor-motywu`, `#opcja-powiadomienia`, `#suwak-rozmiar` oraz zaktualizuj podgląd `#podglad-karty` (dodanie klasy motywu, ustawienie `style.fontSize`).
3. Kliknięcie przycisku `#btn-zapisz-konfiguracje` pobiera wartości z kontrolek, tworzy obiekt konfiguracji, serializuje go metodą `JSON.stringify()` i zapisuje w `localStorage` pod kluczem `aroma_cafe_ustawienia`. W kontenerze `#status-konfiguracji` wyświetla komunikat o sukcesie.
4. Kliknięcie przycisku `#btn-przywroc-domyslne` usuwa klucz metodą `localStorage.removeItem()`, przywraca stan domyślny w kontrolkach i podglądzie oraz wyświetla stosowny komunikat.

## Treść do wpisania
W interfejsie należy umieścić dosłowne teksty:
- Tytuł nagłówka: "Aroma Cafe — Personalizacja Panelu Baristy"
- Etykieta motywu: "Wybierz paletę kolorystyczną kawiarni:"
- Etykieta powiadomień: "Włącz dźwiękowe powiadomienia o nowych zamówieniach"
- Etykieta suwaka: "Wielkość czcionki menu (w pikselach):"
- Przycisk zapisu: "Zapisz preferencje w pamięci"
- Przycisk resetu: "Przywróć konfigurację fabryczną"
- Komunikat zapisu: "Ustawienia panelu baristy zostały trwale zapisane w pamięci."
- Komunikat resetu: "Przywrócono fabryczne ustawienia wyglądu kawiarni."

## Wskazówki techniczne
- Pamiętaj o obsłudze błędu `try...catch` przy wywołaniu `JSON.parse()`.
- Wartość suwaka pobieraj z `input.valueAsNumber` lub parsuj za pomocą `Number(input.value)`.
- Wypisuj komunikaty za pomocą właściwości `textContent`.
