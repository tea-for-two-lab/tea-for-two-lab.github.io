# Modale accessible — Spécification

## 1. Objectif

Créer une démonstration pédagogique d'une modale accessible en utilisant une implémentation HTML, ARIA et JavaScript classique basée sur un élément `div` avec `role="dialog"`.

Cette démonstration n'utilise pas l'élément HTML natif `<dialog>`.

La page doit respecter les conventions générales définies dans `CLAUDE.md` et reprendre la structure et la présentation des démonstrations existantes.

Le nouveau composant est créé dans :

`demo-modal/`

## 2. Démonstration

La démonstration comporte :

* un bouton permettant d'ouvrir la modale ;
* une modale de dimensions approximatives de 400 × 400 px sur un écran permettant cet affichage ;
* un titre visible dans la modale ;
* un contenu simple ;
* au moins un élément interactif dans le contenu de la modale, en plus du bouton de fermeture, afin de permettre de démontrer réellement le confinement et la boucle du focus ;
* un bouton de fermeture représenté visuellement par une croix.

La boîte de dialogue est, de préférence, visuellement centrée horizontalement et verticalement par rapport à la zone de démonstration de la colonne de gauche.

Un fond assombri recouvre l'ensemble de la page lorsque la modale est ouverte afin de matérialiser visuellement son caractère modal.

Même si la boîte de dialogue est visuellement positionnée par rapport à la zone de démonstration, la modalité concerne l'ensemble de la page : tant que la modale est ouverte, le contenu situé en dehors de celle-ci n'est pas interactif.

Le centrage dans la zone de démonstration ne doit pas compromettre le fonctionnement du fond plein écran. La structure réelle de la page doit notamment être examinée afin de tenir compte d'éventuels ancêtres ou styles (`transform`, `filter`, `overflow`, etc.) susceptibles de modifier ou de limiter le positionnement du fond et de la boîte de dialogue.

**Si le centrage dans la colonne est incompatible avec un fond couvrant correctement toute la fenêtre dans la structure existante, centrer la boîte de dialogue dans la fenêtre et le signaler dans le plan d'implémentation avant de développer.**

Sur les écrans ne permettant pas d'afficher confortablement une modale de 400 × 400 px, ses dimensions doivent s'adapter à l'espace disponible sans provoquer de débordement horizontal.

## 3. Bouton d'ouverture

L'élément déclencheur est un élément HTML natif :

`button`

Il doit être accessible au clavier dans l'ordre normal de tabulation.

Son indicateur de focus doit être visible en utilisant les styles de focus déjà définis dans le projet lorsqu'ils sont applicables.

L'activation du bouton ouvre la modale.

Le bouton déclencheur est mémorisé afin que le focus puisse lui être restitué lorsque la modale est fermée.

## 4. Structure de la modale

Le conteneur principal de la modale est un `div`.

Il possède :

* `role="dialog"` ;
* `aria-modal="true"` ;
* `aria-labelledby`, dont la valeur correspond à l'`id` du titre visible de la modale ;
* `tabindex="-1"` afin de pouvoir recevoir le focus par programmation à l'ouverture.

Ces attributs sont statiques : ils sont présents dans le HTML et ne sont ni ajoutés ni retirés par le JavaScript à l'ouverture ou à la fermeture. En particulier, `aria-modal="true"` n'est jamais retiré. C'est l'attribut `hidden` (voir section 5) qui rend la modale inaccessible lorsqu'elle est fermée.

Structure attendue :

```html
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  tabindex="-1"
>
```

Les identifiants définitifs doivent être cohérents avec les conventions du projet et uniques dans la page.

## 5. État fermé

Lorsque la modale est fermée, elle ne doit pas être uniquement masquée visuellement.

Elle doit être retirée :

* de l'affichage ;
* de l'ordre de navigation au clavier ;
* de l'arbre d'accessibilité.

Utiliser pour cela l'attribut HTML `hidden`.

Vérifier qu'aucune règle CSS appliquée à la modale ou à son fond ne neutralise le comportement de l'attribut `hidden`, notamment par une déclaration `display` qui maintiendrait l'élément affiché.

À l'ouverture, retirer `hidden` avant de déplacer le focus dans la modale.

À la fermeture :

1. retirer `inert` des éléments concernés afin de restaurer l'interactivité du reste de la page ;
2. restaurer le comportement normal de défilement ;
3. appliquer `hidden` à la modale afin de la retirer de l'affichage, de la navigation au clavier et de l'arbre d'accessibilité ;
4. restituer le focus au bouton déclencheur.

Cet ordre doit rester cohérent dans toute l'implémentation.

## 6. Titre de la modale

La modale possède un titre visible.

Utiliser un titre de niveau adapté à la hiérarchie de la page, a priori un `h2`.

Ce titre possède un `id`.

L'attribut `aria-labelledby` du conteneur `role="dialog"` référence cet `id`.

Exemple :

```html
<h2 id="modal-title">Titre de la modale</h2>
```

Le titre visible fournit ainsi le nom accessible de la boîte de dialogue.

## 7. Focus à l'ouverture

Lorsque l'utilisateur active le bouton d'ouverture :

1. le bouton déclencheur est mémorisé ;
2. la modale devient visible et accessible ;
3. le reste de la page devient inerte ;
4. le défilement de l'arrière-plan est bloqué ;
5. le focus est placé par programmation sur le conteneur `div` portant `role="dialog"`.

Le `tabindex="-1"` permet au conteneur de recevoir ce focus sans l'ajouter à l'ordre normal de tabulation.

Ce choix est volontaire pour cette démonstration : à l'ouverture, le focus entre directement dans le conteneur représentant la boîte de dialogue.

Le conteneur doit présenter un indicateur de focus visible lorsqu'il reçoit le focus, y compris lorsque l'ouverture de la modale a été déclenchée à la souris.

Pour garantir ce comportement, le style de focus spécifique au conteneur de la modale doit utiliser `:focus` et ne pas reposer uniquement sur `:focus-visible`.

Ne pas supprimer le contour de focus sans fournir une indication visuelle équivalente.

## 8. Confinement du focus

Tant que la modale est ouverte, le focus doit rester à l'intérieur de celle-ci.

La touche `Tab` permet de parcourir les éléments interactifs de la modale.

Lorsque le focus est initialement placé sur le conteneur `role="dialog"` :

* `Tab` déplace le focus vers le premier élément interactif de la modale ;
* `Shift + Tab` déplace le focus vers le dernier élément interactif de la modale.

Lorsque le focus atteint le dernier élément interactif de la modale et que l'utilisateur appuie sur `Tab`, le focus revient au premier élément interactif.

Lorsque le focus se trouve sur le premier élément interactif et que l'utilisateur appuie sur `Shift + Tab`, le focus revient au dernier élément interactif.

L'utilisateur ne doit pas pouvoir atteindre avec `Tab` ou `Shift + Tab` un élément situé derrière la modale tant que celle-ci est ouverte.

Le conteneur `role="dialog"` ayant `tabindex="-1"` reçoit le focus à l'ouverture, mais ne fait pas partie de l'ordre normal de tabulation.

La démonstration doit contenir au minimum deux éléments interactifs dans la modale afin que le fonctionnement de la boucle de focus puisse être observé.

## 9. Ordre des éléments interactifs

Le bouton de fermeture est le premier élément interactif dans l'ordre du DOM de la modale.

Il est positionné visuellement en haut à droite par le CSS, sans modifier artificiellement l'ordre de navigation au clavier.

Le contenu de la modale comporte au moins un second élément interactif après ce bouton, par exemple un bouton d'action ou un lien adapté au contenu choisi pour la démonstration.

L'ordre de tabulation doit suivre l'ordre logique du DOM.

Ne pas utiliser de valeurs positives de `tabindex` pour modifier cet ordre.

## 10. Contenu situé derrière la modale et `inert`

Lorsque la modale est ouverte, le reste de la page doit être non interactif.

Utiliser l'attribut HTML `inert` pour rendre inactifs les contenus extérieurs à la modale.

L'implémentation doit tenir compte de l'emplacement de la modale dans le DOM : ne jamais appliquer `inert` à un ancêtre contenant lui-même la modale, car celle-ci deviendrait également inerte.

Le fond assombri ne doit pas non plus être rendu inerte. Deux cas sont possibles selon la structure retenue :

* le fond est le parent de la boîte de dialogue : il n'est alors jamais rendu inerte, puisque `inert` ne doit pas être appliqué à un ancêtre de la modale ;
* le fond est un élément frère de la boîte de dialogue : il est exclu de l'ensemble des éléments rendus inertes.

Selon la structure réelle de la page constatée dans le dépôt, choisir une stratégie qui permette à la modale et à son fond de rester actifs tout en rendant le reste de la page inerte. Par exemple :

* placer la modale et son fond dans une position appropriée à la racine du `body` ;
* ou appliquer `inert` uniquement aux éléments extérieurs appropriés sans rendre inerte un ancêtre de la modale ni le fond.

Ne pas déplacer ou restructurer inutilement des éléments du projet si la structure existante permet une solution plus simple.

L'attribut `aria-modal="true"` expose le caractère modal du dialogue, mais ne remplace pas le mécanisme permettant de rendre réellement le reste de la page non interactif.

## 11. Fond assombri

Lorsque la modale est ouverte, un fond assombri recouvre visuellement l'ensemble de la page située derrière la boîte de dialogue.

Ce fond fait partie de la présentation de l'état modal.

Le clic ou l'activation de ce fond ne ferme pas la modale.

Les seules méthodes de fermeture prévues dans cette démonstration sont :

* le bouton de fermeture ;
* la touche `Escape`.

## 12. Défilement de l'arrière-plan

Tant que la modale est ouverte, le défilement de la page située derrière elle doit être bloqué.

Si le contenu de la modale dépasse l'espace vertical disponible, la modale ou une zone appropriée de son contenu doit pouvoir défiler sans réactiver le défilement de l'arrière-plan.

À la fermeture, le comportement normal de défilement de la page doit être restauré.

## 13. Fermeture avec la touche Escape

Lorsque la modale est ouverte, la touche `Escape` ferme la modale.

La fermeture doit respecter l'ordre suivant, identique à celui de la section 5 :

1. retirer `inert` des éléments concernés afin de restaurer l'interactivité du reste de la page ;
2. restaurer le comportement normal de défilement ;
3. appliquer `hidden` à la modale afin de la retirer de l'affichage, de la navigation au clavier et de l'arbre d'accessibilité ;
4. replacer le focus sur le bouton qui avait déclenché son ouverture.

L'état `inert` qui affecte le bouton déclencheur doit impérativement être retiré avant de tenter de lui redonner le focus.

Les attributs statiques de la modale, dont `aria-modal="true"`, ne sont pas modifiés lors de la fermeture.

## 14. Bouton de fermeture

La modale possède un bouton de fermeture visible placé en haut à droite.

Il s'agit d'un véritable élément :

`button`

Ce bouton est le premier élément interactif dans l'ordre du DOM de la modale.

Le bouton est représenté visuellement par une croix.

La croix peut être réalisée avec un SVG.

Si le SVG est uniquement décoratif, il doit être masqué aux technologies d'assistance, par exemple avec :

`aria-hidden="true"`

Le bouton doit posséder un nom accessible explicite :

`aria-label="Fermer la modale"`

L'activation du bouton ferme la modale et replace le focus sur le bouton ayant déclenché son ouverture.

## 15. Fermeture et restitution du focus

Quelle que soit la méthode de fermeture prévue par cette démonstration :

* activation du bouton de fermeture ;
* touche `Escape` ;

le focus revient au bouton ayant ouvert la modale.

Avant de replacer le focus sur le bouton déclencheur, retirer `inert` des éléments concernés afin que le bouton soit de nouveau interactif et puisse recevoir le focus.

La fermeture de la modale rétablit également le défilement normal de la page.

Aucune fermeture au clic à l'extérieur de la modale n'est implémentée.

## 16. `aria-describedby`

Ne pas ajouter systématiquement `aria-describedby` au conteneur de la modale.

Dans cette démonstration, `aria-labelledby` fournit le nom accessible de la boîte de dialogue à partir de son titre visible.

`aria-describedby` ne doit être ajouté que si le contenu choisi pour la démonstration justifie réellement une description accessible associée au dialogue.

## 17. Principaux éléments pour réaliser ce composant accessible

La section « Principaux éléments pour réaliser ce composant accessible » doit notamment présenter la structure suivante :

* `button` d'ouverture ;
* `div`

  * `role="dialog"`
  * `aria-modal="true"`
  * `aria-labelledby`
  * `tabindex="-1"`
* titre de la modale (`h2`)

  * `id` référencé par `aria-labelledby`
* `button` de fermeture

  * `aria-label="Fermer la modale"`
  * SVG décoratif avec `aria-hidden="true"` si un SVG est utilisé.

Adapter la présentation au modèle visuel déjà utilisé dans les autres pages du projet.

L'attribut `inert` utilisé pour rendre le reste de la page non interactif doit être expliqué dans les spécifications d'accessibilité, même s'il ne fait pas partie du conteneur `role="dialog"` lui-même.

## 18. Spécifications d'accessibilité à expliquer sur la page

### Attributs et propriétés

La partie pédagogique doit expliquer au minimum :

* le rôle de `role="dialog"` ;
* le rôle de `aria-modal="true"` ;
* la relation entre `aria-labelledby` et l'`id` du titre ;
* le rôle de `tabindex="-1"` sur le conteneur de la modale ;
* le rôle de `inert` sur le contenu extérieur à la modale ;
* le rôle de `hidden` lorsque la modale est fermée ;
* le nom accessible du bouton de fermeture ;
* pourquoi le SVG de la croix est masqué aux technologies d'assistance lorsqu'il est purement décoratif.

Expliquer également la différence entre les attributs statiques et les comportements gérés dynamiquement par JavaScript lorsque cela est pertinent.

### Comportements clavier

Documenter au minimum :

* `Enter` ou `Space` sur le bouton d'ouverture : ouverture de la modale selon le comportement natif du `button` ;
* à l'ouverture : déplacement du focus sur le conteneur `role="dialog"` ;
* `Tab` depuis le conteneur : déplacement vers le premier élément interactif ;
* `Shift + Tab` depuis le conteneur : déplacement vers le dernier élément interactif ;
* `Tab` : déplacement vers l'élément interactif suivant à l'intérieur de la modale ;
* `Tab` depuis le dernier élément interactif : retour au premier élément interactif ;
* `Shift + Tab` depuis le premier élément interactif : retour au dernier élément interactif ;
* `Escape` : fermeture de la modale et retour du focus au bouton déclencheur ;
* activation du bouton de fermeture : fermeture de la modale et retour du focus au bouton déclencheur.

## 19. Responsive

La dimension d'environ 400 × 400 px constitue la présentation de référence lorsque l'espace disponible le permet.

Sur un écran ou dans une zone d'affichage plus petite :

* la modale doit rester entièrement utilisable ;
* sa largeur doit s'adapter à l'espace disponible ;
* elle ne doit pas provoquer de débordement horizontal ;
* son contenu doit pouvoir être consulté si sa hauteur dépasse l'espace disponible.

Ne pas imposer une dimension fixe qui rendrait la modale inutilisable sur petit écran.

Le fond assombri continue de couvrir l'ensemble de la fenêtre, quelle que soit la taille de l'écran.

## 20. Critères d'acceptation

La démonstration est conforme à cette spécification si :

* l'ouverture est déclenchée par un `button` ;
* la modale utilise un `div` avec `role="dialog"` ;
* elle possède `aria-modal="true"`, qui n'est jamais retiré par le JavaScript ;
* son nom accessible est fourni par son titre visible via `aria-labelledby` ;
* le conteneur possède `tabindex="-1"` ;
* la modale fermée est retirée de l'affichage, de la navigation au clavier et de l'arbre d'accessibilité avec `hidden` ;
* aucune règle CSS ne neutralise l'état `hidden` ;
* le focus est placé sur le conteneur à l'ouverture ;
* le conteneur possède un indicateur de focus visible basé sur `:focus`, y compris après une ouverture à la souris ;
* la modale contient au moins deux éléments interactifs permettant d'observer la navigation au clavier ;
* le bouton de fermeture est le premier élément interactif dans l'ordre du DOM ;
* `Tab` depuis le conteneur mène au premier élément interactif ;
* `Shift + Tab` depuis le conteneur mène au dernier élément interactif ;
* le focus reste confiné dans la modale pendant son ouverture ;
* `Tab` et `Shift + Tab` bouclent correctement ;
* le contenu extérieur est rendu non interactif avec `inert` sans rendre inerte la modale, ses ancêtres ni son fond assombri ;
* le fond assombri couvre l'ensemble de la fenêtre ;
* cliquer sur le fond ne ferme pas la modale ;
* le défilement de l'arrière-plan est bloqué ;
* `Escape` ferme la modale ;
* un bouton de fermeture visible permet également de la fermer ;
* le bouton de fermeture possède un nom accessible ;
* `inert` est retiré avant la restitution du focus ;
* la modale est masquée avec `hidden` avant la restitution du focus ;
* le focus revient au bouton déclencheur après la fermeture ;
* le reste de la page redevient interactif et défilable après la fermeture ;
* la démonstration reste utilisable sur petit écran ;
* les explications pédagogiques correspondent au comportement réellement implémenté ;
* les exemples HTML, CSS et JavaScript affichés correspondent à la démonstration.