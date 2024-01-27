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

# Export do bucketu (myslenka)

-   URL bude vypdat takto: `/userID(cislo)/windy-plugin-.....`

-   userID vezmeme z klice v API

-   V kazdem adresari budou sobory `commitHash.js`, `commitHash.js.map` a `commitHash.min.js` s tim, ze `*.js` a `*.min.js` bude pristupne pouze pro nasi VPN

-   V kazdem adresati bude take soubor `latest.json` s kopii posledniho configu informaci o poslednim commitHashi a vsech mnoznych informacich (repository, github username, server name, ...)

-   server bude browsovatelny z nasi VPN takze uvidime vsechny adrease v bucketu a muzeme z nich vysochat latest.json

~~Vysledne URL bucketu bude `https://windy-plugins.com/github.com/github-username/github-repo-name/commitHash.mjs`

Toto URL je naprosto unikatni a navic nam hend rekne, odkud plugin pochazi a informace o serveru
username a repu nam napraska CI/CD proces.

Zatimco soubor `.mjs` obsahuje minifikovany plugin, CI/CD navic na stejne URL ulozi i soubor
`commitHash.js` (pristupny pouze z nasi VPN), ktery bude obsahovat neminifikovany kod, s
originalnimi komentari ktery se da pouzit pro rychle zjisteni, co to dela.

V kazdem adresari bude navic soubor `latest.json`, ktery bude obsahovat informace o posledne
nahranem commitHashi a datumu nahrani, takze bude (napriklad pro korporatni klienty) mozne
zjistit novou verzi klienta (pozor schvelenych pluginy berou posledni commitHash z Community kde
bude info o poslednim schvalenem commitHashi)

V danem bucketu se nemuze prepisovat, pouze pridavat soubory, tj jednou schvaleny plugin bude
stale dostupny na danem URL.

Format URL umozni vyuzivat plugin system i pro korporatni pluginy, ktere nebudou verejne na GitHubu.

Podrobna analyza navstevnosti pluginu zjisti, kdo plugin pouziva a jak casto, uvidime aktivitu
jednotlivych vyvojaru atd.~~

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

-   Instalovane pluginy je mozne spustit z URL `https://www.windy.com/plugins/name`

-   V pripade, ze se jedna o plugin `requiresLatLon: true` je nutne plugin spustits parametry `https://www.windy.com/plugins/name/:lat/:lon`

-   Parametry query stringu se predaji se pluginu

**4. Reload clienta**

-   Po reloadu clienta se precte config z `installedPlugins`

-   Do contextmenu, mobilniho pickeru se praji odkazy na pluginy s `requeresLatLon: true`

-   Pokud ma user `installedPlugins` zkontroluje se pripadna nova verze pluginu a ta se nabidne uzivateli na instalaci

V plugin galerii `www.windy.com/plugins` je mozne plugin pouze nainstalovat, ci kliknout na tlacitko About.

## Nastroje ktere muzeme vyuzit na dokumentaci

https://squidfunk.github.io/mkdocs-material/

Docusaurus

KSS Styles

TSDoc

https://typedoc.org/guides/overview/
