# Tea For Two Lab — Instructions pour Claude Code

## 1. Contexte

Tea For Two Lab est un site pédagogique consacré à l'accessibilité des composants d'interface. Chaque page montre le fonctionnement d'un composant, ses principales exigences d'accessibilité et leur traduction dans le code.

Le projet existe déjà et contient plusieurs démonstrations terminées : `demo-accordion/`, `demo-custom-select/`, `demo-footnotes/`, `demo-tabs/`.

Deux sources font autorité, chacune pour son domaine :

* **Les pages existantes** : la structure, le gabarit et les conventions du site.
* **La spécification du composant demandé** (dans `docs/`) : son comportement fonctionnel et ses exigences d'accessibilité.

Le dépôt local est la source de référence pour l'implémentation.

## 2. Structure du dépôt

* `index.html` : page d'accueil, avec un lien vers la page de chaque composant.
* `demo-<nom-du-composant>/` : un répertoire par composant, contenant :

  * `index.html` : la page du composant (obligatoire) ;
  * un fichier CSS propre au composant (uniquement s'il est nécessaire) ;
  * un fichier JS propre au composant (uniquement s'il est nécessaire).
* `docs/` : les spécifications des composants, au format Markdown.
* `assets/` :

  * `base.css` : CSS global, commun à toutes les pages ;
  * images ;
  * JS partagé ;
  * `includes/` : éléments communs à toutes les pages de composants (header, footer, bouton de retour vers l'index).

Les noms exacts des fichiers CSS et JS d'un composant suivent la convention réellement utilisée par les démos existantes : la constater dans le dépôt, ne pas l'inventer.

## 3. Prévisualisation locale

Le site est statique. Si les includes sont chargés par JavaScript, les pages ne fonctionnent pas en ouvrant directement le fichier (`file://`). Pour les tester dans un navigateur, il faut un serveur local, par exemple :

```bash
python -m http.server 8000
```

puis ouvrir `http://localhost:8000`.

Ne pas ajouter de dépendance ni d'outil de build pour cela. Si un test dans le navigateur est nécessaire, indiquer la commande à l'utilisateur plutôt que d'installer quoi que ce soit.

## 4. Langue

Le contenu des pages (titres, explications, textes de démonstration) est rédigé en français.

## 5. Avant toute implémentation

1. Lire entièrement la spécification du composant demandé dans `docs/` (l'utilisateur indique laquelle).
2. Examiner plusieurs démos existantes, sans en prendre une seule comme modèle absolu. Distinguer ce qui relève du gabarit du site de ce qui est spécifique à un composant. À comparer notamment : structure des fichiers, structure HTML, styles communs et propres au composant, organisation du JS, includes, navigation, présentation de la démo, des explications et des blocs de code, mécanisme de copie du code, comportement responsive.
3. Identifier les ambiguïtés ou contradictions de la spécification.
4. **Proposer un court plan d'implémentation et lister les éventuelles ambiguïtés avant d'écrire du code.**
5. Implémenter uniquement le composant demandé.

## 6. Réutiliser l'existant

* Utiliser les includes, `assets/base.css`, le JS partagé et les classes génériques existantes plutôt que de les recréer ou de les dupliquer.
* Pour les nouveaux développements, ne pas ajouter dans `assets/base.css` de styles spécifiques à un seul composant. Les styles propres au nouveau composant vont dans son fichier CSS dédié.
* Le header, le footer et le bouton de retour utilisent le mécanisme d'inclusion existant.
* Il est possible de partir d'une page existante comme base technique, mais tout ce qui est spécifique à un autre composant doit être retiré : HTML, CSS, JS, identifiants, attributs ARIA, comportements.
* Ne pas créer de nouvelle organisation de fichiers quand une convention existe.
* Éviter toute dépendance supplémentaire.

## 7. Structure pédagogique d'une page composant

Sauf indication contraire dans la spécification, reprendre l'ordre des sections des démos existantes.

### 7.1 En-tête

Reprendre le modèle existant : mention « Démo Accessibilité », titre du composant, éléments introductifs du gabarit. Respecter la hiérarchie des titres du projet.

### 7.2 Démonstration

Une démonstration réellement fonctionnelle, dont le comportement correspond exactement à la spécification. C'est l'exemple auquel se rapportent les explications et le code de la page.

### 7.3 « Principaux éléments pour réaliser ce composant accessible »

Section synthétique placée après la démonstration : les principaux éléments HTML et, si nécessaire, leurs attributs ARIA, présentés de façon à voir quel attribut appartient à quel élément. Modèle : celui des pages existantes.

Exemple pour un accordéon :

* `button`

  * `aria-controls`
  * `aria-expanded`

Cette section n'explique pas encore le fonctionnement en détail. Ne pas ajouter d'attribut ARIA uniquement pour l'alimenter. Si le composant repose surtout sur la sémantique HTML native, mettre en valeur les éléments HTML plutôt que d'ajouter des rôles artificiels.

### 7.4 « Spécifications d'accessibilité »

Section qui développe la précédente, organisée en sous-sections adaptées au composant.

**Attributs ARIA** (uniquement si le composant en utilise). Pour chaque attribut : sur quel élément il est placé, son rôle, sa valeur, s'il est statique ou dynamique, comment il évolue selon l'état du composant, les relations qu'il établit. Les valeurs données correspondent à l'implémentation réelle.

**Comportements clavier.** Pour chaque interaction : l'élément qui a le focus, la touche, le résultat, les changements de focus et d'état. Ne documenter que ce qui est réellement implémenté.

### 7.5 États et interactions

Une représentation des états ou interactions peut être ajoutée uniquement quand elle facilite réellement la compréhension. Elle n'est pas obligatoire.

## 8. Code présenté sur la page

Reprendre la présentation existante des blocs HTML, CSS et JavaScript et le mécanisme de consultation et de copie du code.

Le code présenté a une finalité pédagogique. Il doit correspondre exactement à la démonstration exécutée sur la page. Il n'est pas présenté comme une bibliothèque prête pour la production.

Ces trois niveaux doivent toujours être cohérents :

1. la démonstration fonctionnelle ;
2. les explications (« Principaux éléments… » et « Spécifications d'accessibilité ») ;
3. le code HTML, CSS et JS affiché.

Toute exigence décrite doit être réellement implémentée. Inversement, les mécanismes d'accessibilité importants de l'implémentation doivent être expliqués quand ils aident à comprendre le composant.

## 9. Accessibilité

L'accessibilité est une exigence fonctionnelle dès la conception, pas une correction ultérieure.

* Privilégier les éléments HTML natifs. N'utiliser ARIA que lorsque c'est nécessaire, et jamais sans fonction précise.
* Assurer la cohérence entre l'état visuel et l'état exposé aux technologies d'assistance.
* Implémenter les interactions clavier de la spécification et gérer explicitement le focus quand le composant l'exige.
* Préserver un indicateur de focus visible.
* Ne pas rendre une information ou une interaction dépendante d'un seul mode d'interaction.
* Prendre en compte tous les états définis dans la spécification.

Les composants existants servent de référence pour la cohérence du site, mais ne sont pas une référence normative d'accessibilité. Ne pas reproduire un choix HTML ou ARIA uniquement parce qu'il apparaît dans une démo existante. En cas de divergence, la spécification du composant l'emporte.

## 10. Ajout à l'index

Quand le composant est terminé, l'ajouter à la suite des composants existants dans `index.html`, avec la même structure HTML, les mêmes classes et la même présentation que les entrées existantes.

Adapter uniquement le contenu et le lien.

Ne pas réorganiser ni modifier les entrées existantes sauf demande explicite.

## 11. Responsive

Le nouveau composant et sa page doivent fonctionner dans la mise en page responsive existante.

N'ajouter des règles spécifiques que si elles sont nécessaires, et ne pas modifier le comportement responsive global.

## 12. Périmètre des modifications

* Limiter les modifications aux fichiers nécessaires.
* Ne pas modifier les pages de démonstration existantes, sauf nécessité technique clairement identifiée.
* Ne pas faire de refactoring général, d'améliorations annexes ou de développement anticipé d'autres composants.
* Ne pas modifier le design général du site.
* Si une modification générale semble nécessaire, l'expliquer avant de l'entreprendre.

## 13. Vérification avant de conclure

Vérifier au minimum :

* le fonctionnement de la démonstration ;
* les interactions clavier prévues, l'ordre et la gestion du focus, la visibilité du focus ;
* les états et propriétés ARIA, et la cohérence entre l'état visuel et l'état programmatique ;
* la cohérence entre démonstration, code affiché et explications ;
* la présence et la pertinence des sections « Principaux éléments pour réaliser ce composant accessible » et « Spécifications d'accessibilité » ;
* l'utilisation correcte des includes et des éléments communs ;
* l'intégration visuelle et le comportement responsive ;
* l'ajout du composant à la suite des autres dans l'index ;
* l'absence de régression évidente sur les pages existantes ;
* que l'ensemble de la spécification a été traité.

**À la fin, distinguer clairement ce qui a été vérifié de ce qui reste à tester manuellement.**

Indiquer notamment :

* ce qui a été vérifié par lecture et analyse du code ;
* les éventuels tests automatisés réellement exécutés et leurs résultats ;
* ce qui reste à vérifier par une utilisation réelle dans le navigateur ;
* ce qui reste à tester au clavier ;
* ce qui reste à tester avec des lecteurs d'écran tels que NVDA ou VoiceOver ;
* ce qui reste à vérifier dans différents navigateurs et différentes tailles d'écran.

Ne jamais présenter comme testé ou validé un comportement qui a seulement été déduit de l'analyse du code.

Ne pas affirmer qu'un comportement fonctionne avec un lecteur d'écran sans l'avoir effectivement testé avec ce lecteur d'écran.