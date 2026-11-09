# Zadanie 1: Licznik odsłon i operacji w pamięci sesyjnej

## Cel zadania
Celem zadania jest opanowanie podstawowych metod interfejsu `sessionStorage` (`setItem`, `getItem`, `removeItem`) na przykładzie licznika operacji w recepcji hotelowej. Uczeń dowie się, w jaki sposób przechowywać i modyfikować wartości liczbowe w pamięci sesyjnej oraz jak reagować na brak zapisanego klucza (`null`).

## Gdzie to się stosuje? (Przykłady ze świata aplikacji)
- **Kreatory rezerwacji i formularze wielokrokowe (np. Booking.com, Airbnb):** zapamiętywanie numeru bieżącego kroku rezerwacji w ramach otwartej karty.
- **Portfele i bankowość elektroniczna:** zliczanie operacji wykonanych podczas bieżącego logowania użytkownika w celach bezpieczeństwa.
- **Sklepy internetowe:** monitorowanie liczby przejrzanych produktów w trakcie jednej sesji przeglądania.

## Wymagania funkcjonalne
1. Podczas ładowania strony skrypt powinien sprawdzić w `sessionStorage`, czy istnieje klucz o nazwie `odwiedziny_recepcji`.
2. Jeśli klucz nie istnieje (wartość `null`), skrypt ustawia wartość początkową równą `1` i zapisuje ją w `sessionStorage`.
3. Jeśli klucz istnieje, pobrana wartość zostaje przekonwertowana na liczbę za pomocą `Number()`, zwiększona o `1`, a nowy wynik zostaje zapisany w `sessionStorage`.
4. Bieżąca wartość licznika musi zostać wyświetlona w kontenerze `#licznik-odwiedzin` za pomocą właściwości `textContent`.
5. Kliknięcie przycisku `#btn-zwieksz` zwiększa licznik o 1, aktualizuje `sessionStorage` i odświeża widok.
6. Kliknięcie przycisku `#btn-reset` usuwa klucz za pomocą metody `sessionStorage.removeItem('odwiedziny_recepcji')`, ustawia licznik na 0 i wyświetla w `#komunikat-stanu` informację o wyczyszczeniu sesji.

## Treść do wpisania
W projekcie należy umieścić dosłowne teksty i etykiety:
- Tytuł nagłówka: "Recepcja Hotelu Grand Panorama — Panel Dyżuru"
- Etykieta licznika: "Bieżąca liczba odsłon i akcji w sesji:"
- Tekst przycisku zwiększenia: "Zarejestruj operację w sesji"
- Tekst przycisku resetu: "Wyczyść licznik sesyjny"
- Komunikat po resecie: "Pamięć bieżącej sesji została pomyślnie zresetowana."

## Wskazówki techniczne
- Pamiętaj, że `sessionStorage.getItem()` zwraca łańcuch tekstowy (`string`) lub `null`. Przed dodawaniem liczb użyj `Number()`.
- Wypisuj stan licznika do właściwości `textContent`, a nie `innerHTML`.
- Nie używaj słowa kluczowego `var` ani zdarzeń inline w kodzie HTML.
