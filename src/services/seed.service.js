import bcrypt from 'bcrypt'
import { User, Post, Tag, Comment } from '../models/index.js'

const USERS_DATA = [
  {
    nickName: 'sofia_reyes',
    email: 'sofia.reyes@gmail.com',
    name: 'Sofía Reyes',
    bio: 'Fotógrafa amateur 📷 | Amante de los viajes y el café ☕ | Buenos Aires',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400',
  },
  {
    nickName: 'mateo_gomez',
    email: 'mateo.gomez@hotmail.com',
    name: 'Mateo Gómez',
    bio: 'Desarrollador web 💻 | Música en el tiempo libre 🎸 | Rosario, Argentina',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400',
  },
  {
    nickName: 'valentina_torres',
    email: 'valentina.torres@yahoo.com',
    name: 'Valentina Torres',
    bio: 'Diseñadora gráfica 🎨 | Vegetariana convencida 🌱 | Córdoba',
    profileImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400',
  },
  {
    nickName: 'lucas_fernandez',
    email: 'lucas.fernandez@gmail.com',
    name: 'Lucas Fernández',
    bio: 'Chef casero 🍳 | Hincha de River 🔴⚪ | Mendoza',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400',
  },
  {
    nickName: 'camila_rodriguez',
    email: 'camila.rodriguez@outlook.com',
    name: 'Camila Rodríguez',
    bio: 'Estudiante de medicina 🩺 | Running addict 🏃‍♀️ | La Plata',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400',
  },
  {
    nickName: 'nicolas_martinez',
    email: 'nicolas.martinez@gmail.com',
    name: 'Nicolás Martínez',
    bio: 'Arquitecto de día, gamer de noche 🎮 | Buenos Aires',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400',
  },
  {
    nickName: 'julieta_lopez',
    email: 'julieta.lopez@gmail.com',
    name: 'Julieta López',
    bio: 'Maestra de primaria 📚 | Loca de los gatos 🐱 | Mar del Plata',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400',
  },
]

const TAGS_DATA = [
  'fotografia',
  'viajes',
  'gastronomia',
  'tecnologia',
  'moda',
  'deportes',
  'naturaleza',
  'arte',
  'musica',
  'arquitectura',
  'cultura',
  'fitness',
]

const POSTS_DATA = [
  // Sofía - Fotografía y viajes
  {
    description:
      'Amanecer en Bariloche 🌅 Después de tres horas de trekking, esta vista lo vale todo. El lago Nahuel Huapi en su máximo esplendor. #bariloche #patagonia #naturaleza',
    images: [
      { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800' },
      { url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=800' },
    ],
    tags: ['viajes', 'naturaleza', 'fotografia'],
  },
  {
    description:
      'El barrio de La Boca desde otro ángulo 🎨 Buenos Aires tiene magia en cada esquina. Caminito nunca decepciona.',
    images: [{ url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=800' }],
    tags: ['fotografia', 'cultura', 'arte'],
  },
  {
    description:
      'Nueva cámara, nuevo mundo 📷 Empezando a explorar la fotografía macro. ¿Algún consejo para principiantes?',
    images: [
      { url: 'https://images.unsplash.com/photo-1452830978618-d6feae7d0ffa?q=80&w=800' },
      { url: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=800' },
    ],
    tags: ['fotografia', 'arte'],
  },
  {
    description:
      'Atardecer en la costa 🌊 Vacaciones en Mar del Plata, nada como el mar argentino. El cielo pintado de naranja y rosa.',
    images: [
      { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800' },
      { url: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?q=80&w=800' },
    ],
    tags: ['viajes', 'naturaleza', 'fotografia'],
  },
  {
    description:
      'Flores del jardín de la abuela 🌸 La naturaleza en su estado más puro. A veces el mejor estudio fotográfico está en casa.',
    images: [
      { url: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=927' },
      { url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=800' },
    ],
    tags: ['fotografia', 'naturaleza'],
  },
  {
    description:
      'Porteña de corazón 🏙️ Buenos Aires de madrugada tiene otro encanto. Las luces de la ciudad que nunca duerme.',
    images: [{ url: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=800' }],
    tags: ['fotografia', 'cultura'],
  },

  // Mateo - Tecnología y música
  {
    description:
      'Setup actualizado 💻 Finalmente terminé de armar el espacio de trabajo perfecto. Dual monitor + teclado mecánico = productividad máxima 🚀',
    images: [
      { url: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?q=80&w=800' },
      { url: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?q=80&w=800' },
    ],
    tags: ['tecnologia'],
  },
  {
    description:
      'Jam session del domingo 🎸 Nada como desenchufarse tocando. La música es el mejor terapista.',
    images: [
      { url: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=800' },
      { url: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?q=80&w=800' },
    ],
    tags: ['musica', 'arte'],
  },
  {
    description:
      'Primer proyecto freelance terminado 🎉 Seis meses de trabajo y finalmente el cliente lo aprobó. El esfuerzo vale la pena.',
    images: [{ url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800' }],
    tags: ['tecnologia'],
  },
  {
    description:
      'Coworking en Rosario ☕ Trabajando desde el café favorito. La combinación perfecta: buen internet + cortado + código.',
    images: [
      { url: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=800' },
      { url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800' },
    ],
    tags: ['tecnologia'],
  },
  {
    description:
      'Colección creciendo 🎵 ¿Cuántos pedales son demasiados pedales? La respuesta correcta es nunca.',
    images: [{ url: 'https://images.unsplash.com/photo-1490750967868-88df5691cc28?q=80&w=800' }],
    tags: ['musica'],
  },
  {
    description:
      'Hackathon universitario 👾 48 horas sin dormir, pizza fría y código. Terminamos en tercer lugar, pero aprendimos muchísimo.',
    images: [{ url: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=800' }],
    tags: ['tecnologia'],
  },

  // Valentina - Diseño y estilo de vida
  {
    description:
      'Nuevo proyecto de branding terminado ✨ Meses de trabajo para este cliente de Córdoba. El logo final captura perfectamente la esencia de la marca.',
    images: [
      { url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800' },
      { url: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=800' },
    ],
    tags: ['arte', 'tecnologia'],
  },
  {
    description:
      'Mercado de pulgas del domingo 🛍️ Encontré estas joyas increíbles. La ropa vintage tiene una historia que contar.',
    images: [{ url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800' }],
    tags: ['moda', 'cultura'],
  },
  {
    description:
      'Bowl vegano del mediodía 🥗 Quinoa, aguacate, zanahoria rallada y aderezo de tahini. Comer saludable puede ser hermoso.',
    images: [
      { url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800' },
      { url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800' },
    ],
    tags: ['gastronomia'],
  },
  {
    description:
      'Expo de diseño en el Centro Cultural ♨️ Increíble ver cómo los diseñadores locales están elevando el nivel. Inspiración total.',
    images: [{ url: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?q=80&w=800' }],
    tags: ['arte', 'cultura'],
  },
  {
    description:
      'Sketchbook de la semana 📐 Bocetos para el próximo proyecto. El proceso creativo antes del producto final.',
    images: [
      { url: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?q=80&w=800' },
      { url: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=800' },
    ],
    tags: ['arte', 'fotografia'],
  },
  {
    description:
      'Outfit del día 👗 Combinando texturas y colores para el verano cordobés. El calor no es excusa para no vestir bien.',
    images: [{ url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800' }],
    tags: ['moda'],
  },

  // Lucas - Gastronomía
  {
    description:
      'Asado del domingo 🥩🔥 Cortes premium, fuego lento y buena compañía. La religión argentina no necesita iglesia.',
    images: [
      { url: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=800' },
      { url: 'https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=800' },
    ],
    tags: ['gastronomia'],
  },
  {
    description:
      'Empanadas mendocinas caseras 🥟 Receta de la abuela con carne cortada a cuchillo. El secreto está en el repulgue.',
    images: [{ url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=800' }],
    tags: ['gastronomia', 'cultura'],
  },
  {
    description:
      'Locro de invierno 🍲 El frío mendocino pide locro. Maíz, poroto, cuero de cerdo y todo el amor del mundo.',
    images: [{ url: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800' }],
    tags: ['gastronomia'],
  },
  {
    description:
      'Vendimia 2024 🍇 La cosecha de la uva es un espectáculo único. Mendoza es otra cosa en época de vendimia.',
    images: [
      { url: 'https://images.unsplash.com/photo-1472740378865-80aab8e73251?q=80&w=800' },
      { url: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=800' },
    ],
    tags: ['gastronomia', 'cultura', 'viajes'],
  },
  {
    description:
      'Pizza de molde estilo Buenos Aires 🍕 Masa alta, mucha mozzarella y fugazeta. La rivalidad porteño-mendocina también llega a la cocina.',
    images: [{ url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800' }],
    tags: ['gastronomia'],
  },
  {
    description:
      'Mercado Central de Mendoza 🛒 Las verduras más frescas y los quesos artesanales. Cocinar bien empieza en elegir bien.',
    images: [
      { url: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=800' },
      { url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800' },
    ],
    tags: ['gastronomia'],
  },

  // Camila - Salud y deporte
  {
    description:
      'Maratón de La Plata completada 🏅 42km en 4h15min. Primer maratón completa y estoy destrozada pero feliz. ¡Gracias a todos los que me bancaron!',
    images: [
      { url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800' },
      { url: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800' },
    ],
    tags: ['deportes', 'fitness'],
  },
  {
    description:
      'Guardia en el hospital 🏥 Noche larga pero gratificante. Elegir medicina es elegir servicio. Cansada pero orgullosa.',
    images: [{ url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800' }],
    tags: ['cultura'],
  },
  {
    description:
      'Entrenamiento de trail running 🏔️ Salida de madrugada por las sierras. El running solo o en naturaleza es meditación en movimiento.',
    images: [{ url: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=800' }],
    tags: ['deportes', 'naturaleza', 'fitness'],
  },
  {
    description:
      'Estudiar medicina a los 25 📖 Examen final de anatomía mañana. Llevo tres cafés y la biblioteca cierra en una hora.',
    images: [{ url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800' }],
    tags: ['cultura'],
  },
  {
    description:
      'Domingo de paddle 🎾 Deporte nuevo, cuerpo adolorido. Pero con las amigas todo es divertido. La Plata tiene canchas increíbles.',
    images: [
      { url: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=800' },
      { url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=800' },
    ],
    tags: ['deportes', 'fitness'],
  },
  {
    description:
      'Smoothie bowl post-entreno 🍓 Después de 15km, el cuerpo pide nutrición. Banana, frutillas, granola y semillas de chía.',
    images: [{ url: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?q=80&w=800' }],
    tags: ['gastronomia', 'fitness'],
  },

  // Nicolás - Arquitectura y gaming
  {
    description:
      'Proyecto de tesis aprobado con distinción 🏛️ Cinco años de carrera y este es el resultado. Un complejo cultural sustentable en Palermo.',
    images: [
      { url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=800' },
      { url: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=800' },
    ],
    tags: ['arquitectura', 'arte'],
  },
  {
    description:
      'Puerto Madero de noche 🌃 Salida fotográfica con la facultad. La arquitectura contemporánea porteña tiene su propio encanto.',
    images: [{ url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800' }],
    tags: ['arquitectura', 'fotografia'],
  },
  {
    description:
      'Gaming Friday 🎮 Nuevo setup con RTX 4070. Counter Strike 2 en ultra settings es otra cosa. Los vecinos ya me conocen.',
    images: [{ url: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=800' }],
    tags: ['tecnologia'],
  },
  {
    description:
      'Viaje de estudio a Mendoza 📐 Recorriendo la arquitectura del Casco Histórico. Las bodegas tienen un diseño impresionante.',
    images: [
      { url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=800' },
      { url: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=800' },
    ],
    tags: ['arquitectura', 'viajes', 'cultura'],
  },
  {
    description:
      'Maqueta terminada 📦 Dos semanas y 400 horas de trabajo. Escala 1:100 del proyecto final. Las manos dicen todo.',
    images: [{ url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800' }],
    tags: ['arquitectura', 'arte'],
  },
  {
    description:
      'Torneos de FIFA 26 🏆 Primer puesto en el torneo del estudio. El trofeo más preciado de mi carrera hasta ahora.',
    images: [{ url: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?q=80&w=800' }],
    tags: ['deportes', 'tecnologia'],
  },

  // Julieta - Educación y vida cotidiana
  {
    description:
      'Primer día de clases del año 🎒 23 caras nuevas llenas de curiosidad. Ser maestra es empezar el año tres veces: enero, marzo y agosto.',
    images: [{ url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800' }],
    tags: ['cultura'],
  },
  {
    description:
      'Mis cuatro gatos 🐱 Michi, Frida, Galileo y Tostada. Sí, cuatro. No, no es demasiado. Sí, ocupan toda la cama.',
    images: [
      { url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800' },
      { url: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=800' },
    ],
    tags: ['cultura'],
  },
  {
    description:
      'Proyecto de aula: huerta escolar 🌱 Los chicos plantaron tomates, lechuga y albahaca. El aprendizaje más hermoso es el que se puede comer.',
    images: [
      { url: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=800' },
      { url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800' },
    ],
    tags: ['naturaleza', 'cultura'],
  },
  {
    description:
      'Mar del Plata fuera de temporada 🌊 La ciudad es otra sin turistas. Las playas vacías tienen algo de poético.',
    images: [{ url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800' }],
    tags: ['viajes', 'naturaleza'],
  },
  {
    description:
      'Lectura del fin de semana 📚 Terminé "El nombre del viento" en dos días. Rothfuss es un genio. ¿Cuándo sale el tercer libro?',
    images: [{ url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800' }],
    tags: ['arte', 'cultura'],
  },
  {
    description:
      'Tarde de tejido ☕🧶 Lluvia afuera, mate adentro y agujas en movimiento. El tejido como meditación funciona perfecto.',
    images: [
      { url: 'https://images.unsplash.com/photo-1584661156681-540e80a161d3?q=80&w=800' },
      { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800' },
    ],
    tags: ['arte'],
  },
]

const COMMENTS_POOL = [
  '¡Hermoso! Me encantó la foto 😍',
  'Qué lugar increíble, lo tengo en pendiente para visitar',
  'Te quedó bárbaro! 🔥',
  'Eso se ve riquísimo, me pasás la receta?',
  '¡Felicitaciones! Qué logro tan grande 🎉',
  'Yo también quiero ir ahí! ¿Cuándo nos vamos?',
  'La calidad de esa foto es impresionante 📷',
  'Eso me motivó a salir a correr hoy',
  'Qué talento! Enserio impresionante',
  'Me acuerdo cuando fui ahí, qué recuerdos 🥹',
  'Eso se ve profesional, bien hecho!',
  '¿Cuánto tiempo te llevó hacerlo?',
  'La paleta de colores es perfecta',
  'Jaja me reí con el caption 😂',
  'Esto me inspiró demasiado, gracias por compartir',
  'Dios, qué rico se ve eso 🤤',
  'Buenos Aires siempre hermosa 🏙️',
  'El laburo que hay en eso... chapeau!',
  'Estoy de acuerdo al 100%, muy buena perspectiva',
  'Primera vez que lo veo así y me voló la cabeza',
  'Compartilo más seguido, por favor!',
  'Ese lugar existe o es photoshop? Jaja 😅',
  'Te sigo desde hace poco y cada post mejor',
  'La composición fotográfica es excelente',
  'Eso me hizo tener hambre a las 11 de la noche',
  'Qué energía tan positiva transmitís!',
  'Ojalá pudiera ir algún día, se ve fantástico',
  'Genio/a, siempre sacando contenido top',
]

const getRandomElements = (arr, n) => {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
}

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

export const generateDummyData = async () => {
  const hashedPassword = await bcrypt.hash('password123', 10)

  // 1. Crear tags
  const existingTags = await Tag.find({ name: { $in: TAGS_DATA } })
  const existingTagNames = existingTags.map((t) => t.name)
  const newTagNames = TAGS_DATA.filter((name) => !existingTagNames.includes(name))
  const newTags =
    newTagNames.length > 0 ? await Tag.insertMany(newTagNames.map((name) => ({ name }))) : []
  const allTags = [...existingTags, ...newTags]
  const tagMap = Object.fromEntries(allTags.map((t) => [t.name, t]))

  // 2. Crear usuarios
  const createdUsers = []
  for (const userData of USERS_DATA) {
    const exists = await User.findOne({ email: userData.email })
    if (!exists) {
      const user = await User.create({ ...userData, password: hashedPassword })
      createdUsers.push(user)
    } else {
      createdUsers.push(exists)
    }
  }

  // 3. Crear relaciones de seguimiento realistas
  for (let i = 0; i < createdUsers.length; i++) {
    const user = createdUsers[i]
    const usersToFollow = getRandomElements(
      createdUsers.filter((u) => !u._id.equals(user._id)),
      getRandomInt(2, 4),
    )

    for (const target of usersToFollow) {
      const alreadyFollowing = user.following.some((id) => id.equals(target._id))
      if (!alreadyFollowing) {
        user.following.push(target._id)
        target.followers.push(user._id)
      }
    }
  }

  // 4. Asignar y crear posts por usuario
  const userPostMap = {}
  const postsPerUser = Math.ceil(POSTS_DATA.length / createdUsers.length)

  for (let i = 0; i < createdUsers.length; i++) {
    const user = createdUsers[i]
    const userPostsData = POSTS_DATA.slice(i * postsPerUser, (i + 1) * postsPerUser)
    const createdPosts = []

    for (const postData of userPostsData) {
      const postTags = postData.tags.map((tagName) => tagMap[tagName]?._id).filter(Boolean)

      const post = await Post.create({
        description: postData.description,
        author: user._id,
        images: postData.images,
        tags: postTags,
      })

      createdPosts.push(post)
      user.posts.push(post._id)
    }

    userPostMap[user._id.toString()] = createdPosts
  }

  // 5. Crear comentarios cruzados entre usuarios
  const allCreatedPosts = Object.values(userPostMap).flat()
  const createdComments = []

  for (const post of allCreatedPosts) {
    const commenters = getRandomElements(
      createdUsers.filter((u) => !u._id.equals(post.author)),
      getRandomInt(2, 5),
    )

    for (const commenter of commenters) {
      const text = COMMENTS_POOL[getRandomInt(0, COMMENTS_POOL.length - 1)]
      const comment = await Comment.create({
        text,
        userId: commenter._id,
        postId: post._id,
      })
      createdComments.push(comment)
    }
  }

  // 6. Guardar todos los usuarios con sus relaciones actualizadas
  for (const user of createdUsers) {
    await user.save()
  }

  return {
    users: createdUsers.map((u) => ({
      id: u._id,
      nickName: u.nickName,
      email: u.email,
      postsCount: userPostMap[u._id.toString()]?.length ?? 0,
      followersCount: u.followers.length,
      followingCount: u.following.length,
    })),
    postsTotal: allCreatedPosts.length,
    commentsTotal: createdComments.length,
    tagsTotal: allTags.length,
  }
}
