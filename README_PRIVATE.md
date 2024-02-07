# Nova verze externiho plugin systemu

## Hlavni cile

1. Zachovat system externich pluginu

2. Zjednodusit vyvoj pluginu pro vyvojare

3. Omezit moznosti umisteni a chovani eternich pluginu v clientovi. Externi pluginy maji nekolik moznych umisteni v UI a do tech se musi vejit.

4. Zjednodusit lifecycle pluginu v clientovi, taky aby pouziti pluginu pro uzivatele Windy.com bylo jednoduche

## Zmeny pro vyvojare pluginu

-   Pro vyvojare zustane hlavni repo na GitHubu na `windycom/windy-plugins`. System clonu, prikladu a dokumentace bude podobny jako nyni.

-   Soucasti repa jsou i vyexportovane typingy z clienta (oemzeny na nekolik uzitecnych modulu)

-   K dispozici je Windy CSS styleguice (`styles.windy.com`) a dokumentace API clienta generovana z komentaru pomoci nastroje`typedoc` (pouze ty casti klienta, ktere mohou vyvajari vyuzit)

-   Pluginy se budou buildit ve Svelte. Kazdy plugin bude mit pouze 2 soubory. `plugin.svelte` a `pluginConfig.ts`

-   Vyvojar, ktery neumi Typescript, ci Svelte muze zustat u nativniho JS. Do Svelte souboru pouze vlozi HTML., CSS a JS kod tak jak je zvykly

-   Externi knihovny, ktere chce vyvojar pouzit si nejdrive nainstaluje `npm i` a do kodu prilinkuje pomoci `import ...`

-   Build system je jednoduchy rollup.config, ktery provadi i watch a serve na portu 9999

-   Ukazky budou obsahovat i verze pro mobilni UI

-   Priklady pluginu:
    -   Hello World (plnohodnotny RHpane plugin)
    -   Race tracker (embedovany plugin)
    -   Sounding (ukazka pouziti 3rd party knihovny `d3` a lat lon pluginu)
    -   Windy UI (ukazka Windy like UI controls + odkaz na nasi CSS knihovnu)
    -   Sun position (plnohodnotny RHpane plugin + maly mobilni plugin a lat lon pluginu + ukazka mobilniho kalendare)

## Proces vyvoje

1. Vyvojar si udela git clone z https://github.com/windycom/windy-plugins

2. Zalozi si novou branch branch `developement` (do `masteru` nejde commitovat), prejmenuje si repositar a zacne si psat vlastni plugin.

3. Rollup watch & serve plugin zbuildni a bude jej serverovat na https://localhost:9999 stejne jako nyni. Soucastgi buildu budou i sourcemapy, pro snadne debugovani.

4. Probiha vyvoj pluginu a jeho testovani pres `www.windy.com/developer-mode` stejne jako nyni.

5. Pokud chce developer skript publikovat vygeneruje si u nas API klic na https://api.windy.com/keys a ten ulozi do souboru `.secrets` (ten je v .gitignore aby se nedostal ven). Tento klic bude pouzit pro CI/CD proces.

6. Pokud vyvojar provede push do `masteru` spusit na GitHubu CI/CD proces. Hlavni CI/CD skript neni soucasti repositary, abychom neprozrazovali nasi infrastukturu.

7. CI/CD provede build pluginu a zkopiruje ho k nam na bucket. Pozor, CI/CD plugin obohati o server name, github username a repo name, aby bylo mozne plugin jednoznacne identifikovat. Dale pak jej obohati o Windy.com user ID, jenz je spojene s API klicem.

8. Z bucketu bude mozne plugin spustit v clientovi

## Ulozeni pluginu v nasem bucketu

Pro zachovani bezpecnosti je nutne aby:

1. Plugin byl ulozen v nasem bucketu na `windy-plugins.com`

2. Jednou ulozeny plugin se neda prepsat/zemint (muze se totiz jednat o nami schvaleny kod)

3. Client umozni nacitat pluginy POUZE z `windy-plugins.com`, `windy.com` a `localhost`

# Export do bucketu

-   Vyvojar musi byt registrovany Windy user a musi mit vytvoreny API klic na `api.windt.com/keys`

-   Klic si ulozi nekam do secrets v danem repozitari

-   Zbuildeny plugin do naseho bucketu pomoci `npm deploy`

-   Do tohoto bucketu je mozne pouze uploadivat. Snaha prepsat existujici soubor vrati exception

-   Kazdy build daneho pluginu se sestava z techto souboru `plugin.js`, `plugin.js.map`, `plugin.json`, `plugin.min.js`, `screenshot.jpg`, ty jsoiu ulozeny v adresari `dist/`

-   Vyse uvedne soubory se v nasem bucketu ulozi tak aby byly pristupne pod: `windy-plugins.com/cisloUserID/windy-plugin-nazev-pluginu/v1.0.2/*`

-   Kazda verze tedy bude mit vlastni adresar, ktery bude obsahovat vsechny soubory pluginu

-   V adresari `.../windy-plugin-nazev-pluginu/` bychom mohli udelat automaticky symlink latest, ktery bude ukazovat na posledni verzi pluginu (ciste pro ucely vyvoje a ladeni)

-   Schvalene pluginy, tj ty co pujdou do Galerie zatim budeme udrzovat na Community zde v tomto topicu (`https://community.windy.com/topic/31066/list-of-finished-windy-plugins-v42`)

-   Schvaleny plugin je identifikovan pomoci celeho URL vsetne verze (napr `.../1234567890/windy-plugin-nazev-pluginu/v1.0.2/plugin.min.js`) takze kdyz nekdo vypusti novou verzi pluginu, nic se nedeje, uzivatele si stale tahaji starou verzi.

## Schvalovani pluginu do galerie Pluginu

Pro schvaleni pluginu do galerie pluginu je potreba videt zdrojove kody. Jakmile udelame zbezny check
plugin pridame do gelerie. Do galerie se pridava URL na plugin obsahujici commitHash, takze nova
verze pluginu znamena opetovne schvaleni.

## Lifecycle pluginu v clientovi

Pouze schvalene pluginy se zobrazi v clientovi v Plugin Galerii. Ostatni pluginy se daji nainstalovat
pomoci vyse uvedenho URL, ale nebudou zobrazeny v galerii.

Lifecycle pluginu vypada nasledovne:

**1. Instalace pluginu**

Plugin se stahe a z .mjs souboru se precte vyexportovana konfigurace `__config`, typu
`ExternalPluginConfig`. Plugin se nespusti, pouze se...

-   Config informace se ulozi do `installedPlugins` v nastaveni klienta

-   Odkaz na plugin se zobrazi v menu v novem boxiku `Installed plugins`. Kazdy plugin je odtud
    mozne otevrit nebo odinstalovat

-   U pluinu s `requiresLatLon: true` na nej odkaz do contextmenu a do mobilniho pickeru, ci do praveho prostoru v detailu

**2. Spusteni pluginu**

-   V hlavnim menu vpravo nahore je boxik `Installed plugins` s odkazy na vsechny nainstalovane pluginy

-   Kliknutim na odkaz v menu nebo contextmenu se spusti plugin

**3. Spusteni pluginu z URL**

-   Instalovane pluginy je mozne spustit z URL `https://www.windy.com/plugin/name`

**4. Reload clienta**

-   Po reloadu clienta se precte config z `installedPlugins`

-   Pokud ma user `installedPlugins` zkontroluje se pripadna nova verze pluginu a ta se nabidne uzivateli na instalaci

V plugin galerii `www.windy.com/plugins` je mozne plugin pouze nainstalovat, ci kliknout na tlacitko About.

# Vypublikovane pluginy

https://windy-plugins.com/3/windy-plugin-hello-world/1.0.0/

https://windy-plugins.com/3/windy-plugin-using-vanilla-js/1.0.0/

https://windy-plugins.com/3/windy-plugin-boat-tracker/1.0.0/

https://windy-plugins.com/3/windy-plugin-aircraft-range/1.0.0/

https://windy-plugins.com/3/windy-plugin-airspace-example/1.0.0/
