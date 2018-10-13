# onkel
A commandline calender inspired by cal and ncal.


<img src="https://raw.githubusercontent.com/ztiromoritz/ncal-js/master/screenshot.png" alt="screenshot" width="360">

# Usage

```
Usage: onkel [options] <<month> year>

A commandline calendar inspired by tools like cal, pal and ncal.

Options:

  -v, --version             output the version number
  -l, --locale <locale>     Select a locale.
  -L, --listLocales         List available locales.
  -y, --year                Display a calendar for the specified year.
  -t, --textOnly            No color escape sequences.
  -n, --noHighlights        No highlights at all. (Overrides -H).
  -H, --highlights [dates]  Comma separated lists of dates to highlight. This does not affect which month and year is shown.
  -c, --columns <number>    Number of month per row
  -A, --after <number>      Display the number of months after the current month.
  -B, --before <number>     Display the number of months before the current month.
  -3                        Display the previous, current and next month surrounding today.
  -h, --help                output usage information
```

# Notes 
Onkel only supports gregorian calendar based on [moment.js](https://momentjs.com/).
