# Zadanie 2: Autozapis szkicu zlecenia w pamięci trwałej (localStorage)

## Cel zadania
Celem zadania jest opanowanie mechanizmu automatycznego zapisu danych formularza w pamięci trwałej `localStorage` podczas ich wprowadzania przez użytkownika (zdarzenie `input`). Uczeń wdroży funkcjonalność przywracania szkicu po ponownym otwarciu lub odświeżeniu witryny oraz bezpieczne czyszczenie zapisanego stanu.

## Gdzie to się stosuje? (Przykłady ze świata aplikacji)
- **Systemy ticketowe i helpdesk (np. Jira, Zendesk):** zachowywanie wpisywanej treści zgłoszenia technicznego, aby zapobiec utracie pracy w razie przypadkowego zamknięcia karty.
- **Edytory poczty elektronicznej (np. Gmail, Outlook):** automatyczne zapisywanie wersji roboczej wiadomości e-mail w tle.
- **Platformy blogowe i CMS (np. WordPress):** lokalny bufor szkicu artykułu chroniący przed awarią połączenia internetowego.

## Wymagania funkcjonalne
1. Podczas wpisywania tekstu w polu numeru zlecenia `#nr-zlecenia` oraz w polu opisu usterki `#opis-usterki` (obsługa zdarzenia `input`) skrypt natychmiast zapisuje wartości w `localStorage` pod osobnymi kluczami:
   - `warsztat_nr_zlecenia`
   - `warsztat_opis_usterki`
2. W kontenerze `#status-zapisu` pojawia się informacja tekstowa: "Szkic zlecenia zapisany lokalnie w pamięci urządzenia."
3. Przy uruchomieniu skryptu następuje próba odczytania obu kluczy z `localStorage`. Jeśli klucze istnieją (ich wartość nie jest równa `null`), ich zawartość zostaje wpisana do odpowiednich kontrolek (`element.value`), a w `#status-zapisu` pojawia się informacja: "Przywrócono wcześniej zapisany szkic zlecenia."
4. Kliknięcie przycisku `#btn-wyczysc-szkic` usuwa oba klucze metodą `localStorage.removeItem()`, czyści zawartość pól tekstowych i ustawia komunikat: "Szkic został wyczyszczony z pamięci."

## Treść do wpisania
W interfejsie należy umieścić dosłowne teksty:
- Tytuł główny: "Auto-Naprawa MotoMaster — Przyjęcie Pojazdu do Serwisu"
- Etykieta numeru: "Numer rejestracyjny pojazdu lub zlecenia:"
- Etykieta opisu: "Szczegółowy opis zgłaszanej usterki mechanicznej:"
- Przycisk czyszczenia: "Wyczyść zapisany szkic zlecenia"
- Komunikat gotowości: "Wprowadź dane usterki. Zmiany są automatycznie zapamiętywane."

## Wskazówki techniczne
- Używaj zdarzenia `input`, aby reagować na każdy wpisany znak bez konieczności klikania przycisku.
- Pamiętaj o sprawdzeniu warunku `raw !== null` przed przypisaniem wartości do kontrolki.
- Do prezentacji komunikatów stosuj właściwość `textContent`.
