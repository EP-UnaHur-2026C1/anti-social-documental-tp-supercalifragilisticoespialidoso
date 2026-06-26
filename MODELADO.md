# Modelado de Datos — UnaHur Anti-Social Net

El proyecto utiliza **4 colecciones** en MongoDB. La regla general aplicada fue: se embebe cuando el dato pertenece exclusivamente al documento padre y siempre se accede junto a él; se referencia cuando el dato es compartido, puede crecer sin límite, o necesita consultarse de forma independiente.

---

## Colección `users`

```
User {
  nickName:     String  (único)
  email:        String  (único)
  name:         String
  password:     String
  profileImage: String
  bio:          String
  followers:    [ObjectId → User]   ← referencia
  following:    [ObjectId → User]   ← referencia
  posts:        [ObjectId → Post]   ← referencia
}
```

- **followers / following** son referencias auto-relacionadas (N:M entre usuarios). Un usuario no "posee" a sus seguidores — son entidades independientes.
- **posts** se referencia porque cada Post tiene su propia complejidad y puede crecer sin límite. Embeber posts completos dentro del usuario violaría rápidamente el límite de 16 MB de un documento MongoDB.

---

## Colección `posts`

```
Post {
  description: String
  author:      ObjectId → User       ← referencia
  images:      [{ url: String }]     ← EMBEBIDO
  tags:        [ObjectId → Tag]      ← referencia
  createdAt / updatedAt
}
```

- **images → embebidas**: Las imágenes pertenecen exclusivamente a su post y siempre se acceden junto a él. No tienen identidad propia fuera de este contexto. El subdocumento `postImageSchema` permite gestionarlas (agregar/eliminar) sin necesidad de una colección separada.
- **author → referencia**: El usuario existe independientemente del post y es compartido por múltiples publicaciones.
- **tags → referencia (N:M)**: Un tag puede estar en muchos posts y un post puede tener muchos tags. Embeber el tag en cada post generaría duplicación y problemas de sincronización ante actualizaciones.

---

## Colección `comments`

```
Comment {
  text:      String
  isVisible: Boolean
  postId:    ObjectId → Post   ← referencia
  userId:    ObjectId → User   ← referencia
  createdAt / updatedAt
}
```

**Decisión clave — colección separada, no embebida en Post**: Los comentarios se filtran por fecha mediante la variable de entorno `COMMENT_MONTHS`. Al estar en una colección propia, el filtro se delega directamente a MongoDB:

```js
Comment.find({ postId: id, createdAt: { $gte: cutoff } })
```

Si estuvieran embebidos dentro del Post, habría que recuperar el documento completo y filtrar en la aplicación. Además, un post con muchos comentarios haría crecer el documento Post indefinidamente.

---

## Colección `tags`

```
Tag {
  name: String  (único)
}
```

Entidad simple e independiente. Los posts almacenan un array de referencias (`ObjectId`) a esta colección. La relación inversa (qué posts tienen un tag) se resuelve con `Post.find({ tags: tagId })`.

---

## Resumen de relaciones

| Relación                   | Cardinalidad  | Estrategia           | Razón                               |
| -------------------------- | ------------- | -------------------- | ----------------------------------- |
| Post → images              | 1:N exclusivo | **Embebido**         | Dato exclusivo, siempre co-accedido |
| Post → author              | N:1           | Referenciado         | Usuario independiente               |
| Post → tags                | N:M           | Referenciado en Post | Dato compartido entre posts         |
| Comment → Post             | N:1           | Referenciado         | Filtrado por fecha independiente    |
| Comment → User             | N:1           | Referenciado         | Usuario independiente               |
| User → followers/following | N:M auto-ref  | Referenciado         | Entidades independientes            |
