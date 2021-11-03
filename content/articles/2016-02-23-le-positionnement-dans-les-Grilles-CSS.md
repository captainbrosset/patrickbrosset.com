---
layout: main-layout.njk
subtitle: articles
pagetitle: Le positionnement dans les Grilles CSS
tags: article
---
<link href="https://unpkg.com/prismjs@1.20.0/themes/prism-okaidia.css" rel="stylesheet">

## Le positionnement dans les Grilles CSS

<time datetime="2016-02-23">February 23rd, 2016</time>

* * *

This is the French translation of Manuel Rego’s ([@regocas](https://twitter.com/regocas)) post “[Deep Dive into Grid Layout Placement](http://blogs.igalia.com/mrego/2016/02/01/deep-dive-into-grid-layout-placement/)”, published on February 1st, 2016. All images and code samples come from the original article, with the author’s permission.
Translation: Patrick Brosset ([@patrickbrosset](https://twitter.com/patrickbrosset)).

* * *

Ceci est la traduction française de l’article “[Deep Dive into Grid Layout Placement](http://blogs.igalia.com/mrego/2016/02/01/deep-dive-into-grid-layout-placement/)” par Manuel Rego ([@regocas](https://twitter.com/regocas)), publié le 1er Février 2016. Toutes les images et extraits de code viennent de l’article original avec la permission de l’auteur.
Traduction: Patrick Brosset ([@patrickbrosset](https://twitter.com/patrickbrosset)). 

* * *

## Une revue complète des différentes méthodes de positionnement offertes par les grilles CSS

_Manuel Rego_

_1er Février 2016_

Ces derniers mois, dans le cadre de mon travail à [Igalia](http://www.igalia.com/), je me penche sur les derniers détails **d’implementation du positionnement des éléments au sein d’un layout de type CSS Grid dans Blink**.
En résumé, il s’agit principalement de travailler sur ces 2 choses:

* Supporter _d’abord les grilles implicites avant les grilles explicites_. Cela afin qu’une grille puisse ajouter des pistes si besoin, pas seulement dans la direction où la grille grandit (en général vers la droite et le bas), mais aussi dans la direction opposée.
* Faire fonctionner la _résolution des lignes inconnues de la grille_. Ceci peut arriver lorsqu’un élément est placé sur une ligne nommée “foo”, mais que cette ligne n’existe pas au sein de la grille.

À première vue ces tâches peuvent paraître simples, mais elles ont demandé une refonte assez importante de l’implémentation interne. Elles m’ont même finalement poussé à remanier tout le code de résolution du positionnement dans une grille.
Pour l’occasion j’ai même écrit [un document expliquant tout le plan](https://docs.google.com/document/d/1D9x8IUZxirhc3RUma16L6p0yJGv8h199GMnmBA6zLAI/edit) et les détails techniques. Vous y trouverez les liens vers tous les changements effectués.

Maintenant que le gros du travail est terminé, il est temps d’expliquer comment placer des éléments dans une grille. Bien que mon collègue [Sergio ait déjà publié un article à ce sujet en 2014](http://blogs.igalia.com/svillar/2014/03/31/adventures-in-the-grid/), la spécification ayant changé depuis, je pense qu’il est bon d’expliquer à nouveau les mécanismes de placement au sein d’une
grille. Cet article est en quelque sorte un résumé (avec des exemples) de la partie [“Placing Grid Items” de la spécification CSS Grid Layout](https://drafts.csswg.org/css-grid/#placement).

### Les lignes d’une grille

Probablement l’un des concepts les plus importants de la spécification. **Les lignes d’une grille** sont celles qui la séparent horizontalement et verticalement. Ces lignes sont **numérotées**,
la première étant numéro 1.

Utilisons une grille de taille 3x2 afin d’expliquer comment cela fonctionne :

```html
<div style="display: grid;
            grid-template-columns: 300px 200px 100px;
            grid-template-rows: 100px 50px;">
</div>
```

![Exemple des lignes numérotées](/assets/rego-grid/3NuTmTNakrljqRVFfpR1EQ.png)

### Les propriétés de positionnement dans une grille

Afin de positionner des éléments à l’intérieur d’une grille, il va falloir utiliser des [propriétés de positionnement](https://drafts.csswg.org/css-grid/#line-placement). Ces propriétés sont les suivantes :

* **`grid-column-start`**: Sert à définir la ligne verticale où l’élément commence.
* **`grid-column-end`**: Sert à définir la ligne verticale où l’élément s’arrête.
* **`grid-row-start`**: Sert à définir la ligne horizontale où l’élément commence.
* **`grid-row-end`**: Sert à définir la ligne horizontale où l’élément s’arrête.

Grâce à ces propriétés vous pouvez définir la zone où un élément va venir se positionner, en utilisant les numéros des lignes.

La valeur initiale de ces propriétés à auto. Cela rend possible le positionnement automatique d’un élément (au sein de cellules disponibles dans la grille). Pour plus d’information à ce sujet, vous pouvez consulter [un article précédent](http://blogs.igalia.com/mrego/2015/02/25/grid-auto-placement-is-ready/).

Il existe aussi des propriétés [raccourcies](https://drafts.csswg.org/css-grid/#placement-shorthands) :

* **`grid-column`**: Raccourci des propriétés grid-column-start et grid-column-end.
* **`grid-row`**: Raccourci des propriétés grid-row-start et grid-row-end.
* **`grid-area`**: Raccourci servant à définir les 4 propriétés à la fois.

Ajoutons l’élément suivant dans la grille définie précédemment :

```html
<div style="grid-column-; grid-column-end: 4;
            grid-row-start: 1; grid-row-end 2;">
</div>
```

Ou, plus simplement, en utilisant les propriétés raccourcies :

```html
<div style="grid-column: 2 / 4; grid-row: 1 / 2;"></div>
```

Ce qui signifie que l’élément sera positionné sur la première ligne, et sur les deuxième et troisième colonnes.

![Exemple de positionnement d’élément en utilisant les numéros de ligne](/assets/rego-grid/wv0sImq7-yXG003fLWtzEA.png)

### Le recouvrement de cellules

Grâce aux numéros de lignes, l’élément précédent a recouvert 2 colonnes (la 2ème et la 3ème). Nous pourrions faire la même chose en utilisant le mot clé `span` et en indiquant le nombre de cellules à recouvrir.

En effet, l’élément peut être positionné de manière identique avec :

```html
<div style="grid-column: 2 / span 2; grid-row: 1;"></div>
```

![Exemple de positionnement d’élément en utilisant span](/assets/rego-grid/9l1DA7SP7FGdrWuGEzr4bg.png)

Dans l’exemple précédent, nous n’avons défini que le numéro de ligne où l’élément commence. Cela signifie que grid-row-end prend la valeur auto, et dans ce cas auto couvre par défaut 1 cellule.

### Lignes négatives

Pour le moment, nous avons uniquement numéroté les lignes avec des nombres positifs, mais les lignes peuvent aussi être référencées avec des nombres **négatifs**, permettant ainsi de référencer des lignes depuis la fin de la grille.

En utilisant l’exemple précédent, nous pouvons positionner une nouvelle fois l’élément au même endroit en utilisant des nombres négatifs :

```html
<div style="grid-column: -3 / -1; grid-row: -3 / -2;"></div>
```

![Exemple de positionnement en utilisant des numéros de lignes négatifs](/assets/rego-grid/pGeTLX8eQUD805vZXI-8uA.png)

Cela peut s’avérer très utile dans certaines situations. Par exemple, afin de positionner un élément dans la dernière colonne, sans pour autant connaître le nombre total de colonnes de la grille, il nous suffira de définir : `grid-column-end: -1`.

### Nommage des lignes

Non seulement les lignes peuvent être référencées grâce à leurs indices (positifs ou négatifs), mais elles peuvent être **nommées**. Nommer une ligne permet de ne pas avoir à en connaître le numéro lorsqu’on la référence.

Modifions à présent la définition de notre grille, en gardant les mêmes tailles mais en nommant cette fois les lignes :

```html
<div style="display: grid;
            grid-template-columns: [start] 300px [main] 200px [aside] 100px [end];
            grid-template-rows: [top] 100px [middle] 50px [bottom];">
</div>
```

Ainsi, pour placer l’élément à la même position que précédemment, il nous suffit simplement d’utiliser le nom des lignes :

```html
<div style="grid-column: main / end; grid-row: top / middle;"></div>
```

![Exemple de positionnement avec lignes nommées](/assets/rego-grid/eHMGOmjVK_dTGRTj5k7abA.png)

Une même ligne peut avoir plusieurs noms différents, il suffit pour cela de les lister dans la définition : `grid-template-rows: [top start] 100px [middle center] 50px [bottom end];`.

De plus, les noms de lignes peuvent être répétés. Afin de référencer une ligne dont le nom a été utilisé à plusieurs reprises, il faudra utiliser un nombre (positif ou négatif). Prenons un nouvel exemple pour illustrer cela :

```html
<div style="display: grid;
grid-template-columns: [col] 200px [gap] 50px [col] 200px [gap] 50px [col] 200px [gap];">
</div>
```

Et imaginons les éléments suivants :

```html
<div style="grid-column: col 2;"></div>
<div style="grid-column: col 1 / gap 2;"></div>
<div style="grid-column: col -1;"></div>
```

![Exemple de noms de lignes répétés](/assets/rego-grid/ab8rTaTiXcfbL-6B0W_iDg.png)

Bien entendu, il est aussi possible de recouvrir plusieurs cellules jusqu’à une ligne nommée :

```html
<div style="grid-column: col 2 / span 2 gap;"></div>
```

![Exemple de recouvrement de cellules en utilisant des lignes nommées](/assets/rego-grid/B_7T9KvkAkWsf8X1juXx4w.png)

### Les aires

Les **aires de grille** sont encore plus intéressantes, il est possible d’y positionner directement des éléments. Pour cela, il nous faudra utiliser la propriété [`grid-template-areas`](https://drafts.csswg.org/css-grid/#grid-template-areas-property) qui permet de nommer différentes zones (les aires) de la grille.
Il est ensuite possible d’utiliser la propriété raccourcie grid-area pour positionner les éléments dans ces aires.

Utilisons une grille légèrement plus grande (5x4) dans cet exemple :

```html
<div style="display: grid;
            grid-template-columns: 100px 100px 100px 100px 100px;
            grid-template-rows: 100px 100px 100px 100px;
            grid-template-areas:
              'title  title  title  title  aside'
              'nav    main   main   main   aside'
              'nav    main   main   main   aside'
              'footer footer footer footer footer';">
</div>
```

Et positionnons 1 élément au sein de chacune des ces aires :

```html
<div style="grid-area: title;"></div>
<div style="grid-area: nav;"></div>
<div style="grid-area: main;"></div>
<div style="grid-area: aside;"></div>
<div style="grid-area: footer;"></div>
```

![Exemple de positionnement dans des aires](/assets/rego-grid/XFBWWxiOHYrlHT1xIHTPoQ.png)

### Aires et lignes nommées

L’un des points intéressants relatif aux aires est qu’elles créent des noms implicites pour les lignes qui les entourent. Ces noms implicites utilisent les suffixes “-start” et “-end”. Il est donc possible d’utiliser ces noms pour positionner un élément à la place d’utiliser l’aire elle-même.

Par exemple, l’aire “title” de l’exemple précédent génère 4 noms implicites pour les lignes qui l’entourent (2 par axe) :

* Ligne de gauche : “title-start”
* Ligne de droite : “title-end”
* Ligne du haut : “title-start”
* Ligne du bas : “title-end”

Nous pourrions donc positionner un élément en utilisant ces noms de lignes :

```html
<div style="grid-column: aside-end;
            grid-row: title-start / nav-end;"></div>
```

![Exemple de positionnement selon les noms implicites de lignes d’aires](/assets/rego-grid/7LEV3iOqOVRpFtKd4e-3kA.png)

De plus, la même chose est possible dans l’autre sens. En nommant explicitement des lignes avec ces suffixes, les aires correspondantes seront générées implicitement. Il est donc possible de créer la même grille que précédemment en utilisant uniquement des noms de lignes :

```html
<div style="display: grid;
            grid-template-columns: [title-start nav-start footer-start] 100px [main-start nav-end] 100px 100px 100px [aside-start title-end main-end] 100px [aside-end footer-end];
            grid-template-rows: [title-start aside-start] 100px [nav-start main-start title-end] 100px 100px [footer-start nav-end main-end aside-end] 100px [footer-end];">
</div>
```

Tous les exemples d’éléments positionnés précédemment se retrouveront exactement au même endroit dans cette nouvelle grille.

### Grille implicite

Grâce aux [propriétés de définition d’une grille](https://drafts.csswg.org/css-grid/#grid-definition) (`grid-template-columns`, `grid-template-rows` et `grid-template-areas`), il est possible de déterminer les colonnes et rangées d’une grille. Cependant, la spécification prévoit aussi la possibilité de positionner des éléments en dehors de cette grille explicite. Pour cela, de nouvelles colonnes et rangées sont créées implicitement et automatiquement, et leurs tailles sont contrôlées par [les propriétés `grid-auto-columns` et `grid-auto-rows`](https://drafts.csswg.org/css-grid/#auto-tracks). Dans les exemples qui suivent, nous utiliserons la couleur rouge pour représenter les lignes implicites.

Utilisons une grille très simple de 2x1 :

```html
<div style="display: grid;
            grid-template-columns: 200px 200px;
            grid-auto-columns: 100px;">
</div>
```

Maintenant, imaginons placer un élément dans la 5ème colonne (`grid-column: 5;`). Cette grille n’ayant que 2 colonnes, 3 nouvelles colonnes implicites sont créées afin de positionner l’élément.

![Exemple de grille implicite](/assets/rego-grid/-TDBgCDnlKM5cTRz7GmLbw.png)

Il est aussi possible de créer des colonnes et rangées implicites en positionnant des éléments qui recouvrent plusieurs cellules. Par exemple, prenons un élément qui commence à la 2ème colonne et en recouvre 3 (`grid-column: 2 / span 3`) :

![Exemple de grille implicite avec recouvrement](/assets/rego-grid/Fc_7gBnhygFsCzhNYhVT2A.png)

Notons que la grille peut être implicitement étendue dans les deux sens. Par exemple, en plaçant un élément avec `grid-column: -5;`, 2 nouvelles colonnes seront ajoutées sur la gauche de la grille et l’élément sera positionné dans la colonne **-2**.

![Exemple de grille implicite avant explicite](/assets/rego-grid/pOq3Crj0pcQCaIo36yxAaw.png)

### Grille implicite et lignes nommées

Ce que nous venons de voir n’est pas la seule façon de créer des colonnes et rangées implicites. Il est aussi possible de les créer en utilisant des lignes nommées non définies. Ceci relève plus d’une manière de trouver des erreurs de CSS plutôt que d’une fonctionnalité, mais certains pourront trouver cela utile. L’idée sous-jacente est que toutes les lignes faisant partie de la grille implicite se retrouvent nommées avec tous les noms utilisés pour positionner les éléments.

Utilisons un exemple simple : plaçons des éléments qui référencent une ligne non existante appelée “foo”. Créons 3 colonnes implicites (1 avant et 2 après la grille explicite) avec les éléments suivants :

```html
<div style="grid-column: foo;"></div>
<div style="grid-column: 2 / span 2 foo;"></div>
<div style="grid-column: -1 foo;"></div>
```

![Exemple de grille implicite utilisant une ligne indéfinie](/assets/rego-grid/2-8MzyS6C3lXegJMR_Y14w.png)

L’élément ayant grid-column: foo est positionné sur la 4ème colonne (une colonne vide ayant été rajoutée juste après la grille explicite). En effet, la première ligne considérée comme ayant le nom “foo” est la première ligne implicite (ligne 4), la dernière ligne de la grille explicite (ligne 3) n’étant pas incluse.

De plus, le dernier élément `grid-column: -1 foo` est positionné dans la colonne -1. La raison pour cela étant que la recherche de ligne nommée “foo” démarre au bord de la grille explicite. Les lignes -1, -2
et -3 sont ignorées (puisqu’elles ne portent pas le nom “foo”) et la ligne -4 est donc celle qui prend ce nom (la première ligne de la grille implicite).

Les choses se corsent un peu lorsque la ligne existe vraiment car, dans ce cas, la ligne est prise en compte quand l’élément est positionné. C’est d’autant plus complexe lorsqu’il y a du recouvrement de cellules en jeu, et qu’une ligne nommée est recouverte mais qu’il n’y a plus assez de lignes. Dans ce cas, seules les lignes implicites se trouvant dans la direction de la recherche sont considérées comme ayant le nom en question.

Un exemple devrait aider à la compréhension. Dans l’exemple précédent, donnons un nom à la ligne du milieu :

```html
<div style="display: grid;
            grid-template-columns: 200px [middle] 200px;
            grid-auto-columns: 100px;">
</div>
```

Maintenant, positionnons quelques éléments référençant cette ligne “middle” :

```html
<div style="grid-column: 3 middle;"></div>
<div style="grid-column: span 2 middle / 5;"></div>
<div style="grid-column: -4 / span middle;"></div>
```

![Exemple de grille implicite utilisant plus de lignes nommées que disponibles](/assets/rego-grid/WKfQ0rMsydYDI7EIy_6Cow.png)

Le cas le plus étrange ici est `grid-column: span 2 middle / 5;`. Comme indiqué sur le schéma, l’élément occupe la place de la colonne -1 à la colonne 4 (incluses). L’élément se termine à la ligne 5, et doit recouvrir 2 lignes s’appelant “middle” afin de trouver son point de départ. Peut-être devrait-il simplement compter les lignes 4 et 2 comme étant les 2 lignes “middle” recouvertes? Non, puisque comme expliqué auparavant, la recherche se fait en partant du bord de la grille explicite. Donc la ligne 2 étant dejà prise en compte dans le recouvrement, la prochaine ligne considérée est, dans le sense de la recherche, la ligne implicite à gauche de la grille explicite : ligne -4.

### Cas spéciaux

Les propriétés de positionnement peuvent donner lieu à certains cas spéciaux qui sont alors résolus par [la section de la spécification sur la gestion des conflits](https://drafts.csswg.org/css-grid/#grid-placement-errors).

Par exemple, si un élément se retrouve positionné avec une ligne de fin se trouvant avant la ligne de départ, les deux lignes sont inversées. `grid-column: 5 / 2;` devient alors `grid-column: 2 / 5;`.

De plus, s’il y a recouvrement à la fois aux positions de départ et de fin, le span de la position finale sera ignoré. Donc `grid-column: span 2 / span 3;` devient grid-column: span 2;. Ceci aura pour effet d’utiliser algorithme de positionnement afin de trouver une zone vide pour placer l’élément (une zone de 2 colonnes dans cet exemple).

Le dernier cas spécial se produit lorsqu’il y a recouvrement uniquement vers une ligne nommée. Dans ce cas, le recouvrement est remplacé par span 1. Par exemple `grid-column: span foo;` devient `grid-column: span 1;`.

![Exemple de positionnement spécial](/assets/rego-grid/96txNnstWcllGM1TlX-BVg.png)

### Récapitulatif

Si vous avez lu jusqu’ici, vous êtes visiblement très intéressé par les grilles CSS. En conclusion, le point le plus important de cette spécification est la grande flexibilité offerte quant au positionnement des éléments sur la grille. En effet, comme nous venons de le voir, il y a de nombreuses manières de positionner un élément au même endroit. Il est probable que les utilisateurs s’habituent à quelques-unes de ces manières et oublient les autres.

De mon point de vue, le positionnement simple (à base d’indices de lignes, noms de lignes et aires) est plutot aisé à prendre en main. Le concept de grille implicite n’est pas si compliqué non plus. Les indices négatifs rajoutent un côté amusant. Par contre, le comportement des lignes indéfinies est assez complexe (mais avec un peu de chance, ce n’est pas quelque chose qui se révélera très important dans l’utilisation des grilles). Cela dit, mon avis est forcément biaisé, puisque je travaille depuis maintenant longtemps sur les grilles CSS.

Pour finir, j’ai pensé qu’il serait intéressant de terminer par un **exemple complexe** qui utilise la plupart des concepts décrits dans cet article.
Si vous êtes capables de le comprendre complètement, vous maîtrisez alors le positionnement dans les grilles CSS. Félicitations!

Voici la définition de la grille que nous utiliserons dans cet exemple :

```html
<div style="display: grid;
            grid-template-columns: [left] 200px [main-start] 100px [center] 100px 100px [main-end] 50px 50px [right];
            grid-template-rows: [top title-start] 50px [title-end main-start] 200px [main-end center] 150px 100px [bottom];
            grid-auto-columns: 50px;
            grid-auto-rows: 50px;">
</div>
```

Dans le schéma suivant, vous pouvez voir la manière dont les différents éléments sont positionnés.

![Exemple complexe de positonnement](/assets/rego-grid/7dJ9s-vhOeRZrKNuqZaNNA.png)

Vous pouvez essayer la démo sur notre site d’exemples : [http://igalia.github.io/css-grid-layout/grid-placement.html](http://igalia.github.io/css-grid-layout/grid-placement.html)

### État des lieux

Comme je l’ai déjà dit dans l’introduction [**l’implémentation dans Blink**](https://code.google.com/p/chromium/issues/detail?id=444011) devrait désormais supporter (Chrome 50+) toutes ces possibilités de positionnement. Igalia y a travaillé, et nous sommes maintenant en train de transposer l’implémentation vers [**WebKit**](https://bugs.webkit.org/show_bug.cgi?id=153488).

De plus, [**Gecko**](https://bugzilla.mozilla.org/show_bug.cgi?id=1009776), développé par Mozilla, supporte aussi ces possibilités de positionnement.

Enfin, j’aimerais préciser à nouveau que ce travail a été réalisé grâce à une collaboration entre **[Igalia](http://www.igalia.com/)** et **[Bloomberg](http://www.bloomberg.com/company/)**. Merci beaucoup pour votre support!
