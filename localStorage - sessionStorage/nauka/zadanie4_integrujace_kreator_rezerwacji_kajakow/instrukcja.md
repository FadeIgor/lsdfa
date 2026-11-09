# Zadanie 4 (Integrujące): Formularz rezerwacji z autozapisem i licznikiem sesji

## Cel zadania
Celem zadania integrującego jest połączenie w spójnej aplikacji frontendowej mechanizmów poznanych w zadaniach 1–3:
1. Zliczanie otwarć i prób rezerwacji w ramach bieżącej karty za pomocą `sessionStorage`.
2. Ciągły autozapis szkicu formularza do pamięci trwałej `localStorage` w postaci zserializowanego obiektu JSON.
3. Obsługa zdarzenia `submit` formularza z `e.preventDefault()`, kalkulacją kosztu, bezpieczną prezentacją podsumowania w DOM (`textContent`) oraz wyczyszczeniem szkicu po udanej rezerwacji.

## Gdzie to się stosuje? (Przykłady ze świata aplikacji)
- **Wypożyczalnie aut i sprzętu sportowego (np. Sixt, Decathlon Rent):** zabezpieczanie wpisanych parametrów rezerwacji przed przypadkowym odświeżeniem okna.
- **Systemy biletowe i rezerwacji miejsc (np. PKP Intercity, e-podróżnik):** monitorowanie czasu trwania rezerwacji w sesji przy jednoczesnym zachowywaniu wprowadzonych danych pasażera.
- **Kreatory ubezpieczeń turystycznych:** autozapis parametrów polisy i kalkulacja składki bez konieczności ponownego wpisywania danych.

## Wymagania funkcjonalne
1. **Licznik sesyjny (`sessionStorage`):** Przy załadowaniu strony skrypt sprawdza klucz `kajaki_licznik_sesji`. Zwiększa go o 1 (lub ustawia 1, gdy brak klucza) i wyświetla w elemencie `#licznik-sesji` tekst informujący o liczbie interakcji.
2. **Przywracanie szkicu (`localStorage`):** Przy starcie skryptu odczytaj klucz `kajaki_szkic_rezerwacji`. Jeśli istnieje, rozpakuj go za pomocą `JSON.parse()` w bloku `try...catch` i uzupełnij pola: `#imie-klienta`, `#typ-kajaka`, `#liczba-godzin`, `#opcja-kamizelka`.
3. **Autozapis szkicu:** Każda zmiana w kontrolkach (zdarzenia `input` i `change`) tworzy obiekt szkicu, serializuje go za pomocą `JSON.stringify()` i zapisuje pod kluczem `kajaki_szkic_rezerwacji`.
4. **Zatwierdzenie formularza (`submit`):**
   - Zablokuj domyślne wysłanie formularza za pomocą `event.preventDefault()`.
   - Oblicz koszt: kajak jednoosobowy = 25 PLN/h, dwuosobowy = 40 PLN/h, rodzinny = 55 PLN/h; kamizelka asekuracyjna = dopłata 10 PLN ryczałtem.
   - Wypisz podsumowanie w kontenerze `#podsumowanie-rezerwacji` za pomocą bezpiecznego `textContent`.
   - Usuń szkic metodą `localStorage.removeItem('kajaki_szkic_rezerwacji')` i zresetuj kontrolki metodą `form.reset()`.
5. **Przycisk anulowania szkicu:** Kliknięcie `#btn-anuluj-szkic` usuwa wpis z `localStorage`, czyści pola formularza i czyści kontener podsumowania.

## Treść do wpisania
W interfejsie należy umieścić dosłowne teksty:
- Tytuł nagłówka: "Przystań Kajakowa Fala — System Rezerwacji Sprzętu"
- Etykieta klienta: "Imię i nazwisko osoby wypożyczającej:"
- Etykieta sprzętu: "Wybierz rodzaj kajaka wodnego:"
- Opcje kajaków: "Jednoosobowy sportowy (25 zł/h)", "Dwuosobowy turystyczny (40 zł/h)", "Rodzinny 3-osobowy (55 zł/h)"
- Etykieta godzin: "Planowany czas wypożyczenia (w godzinach):"
- Etykieta dodatku: "Dodatkowa kamizelka asekuracyjna dla dziecka (+10 zł)"
- Przycisk wysłania: "Zatwierdź rezerwację i opłać na przystani"
- Przycisk anulowania: "Anuluj szkic rezerwacji"
- Informacja sesji: "Bieżąca sesja przeglądania przystani aktywna."

## Wskazówki techniczne
- Ceny bazowe: `jednoosobowy`: 25, `dwuosobowy`: 40, `rodzinny`: 55.
- Wypisuj podsumowanie za pomocą `textContent`, nigdy nie wstrzykuj imienia klienta do `innerHTML`.
- Pamiętaj o obsłudze `event.preventDefault()`.
