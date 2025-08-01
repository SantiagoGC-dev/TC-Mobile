import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ImageBackground,
  Modal,
  Button,
  SafeAreaView,
} from "react-native";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const popularTours = [
  {
    id: "1",
    title: "Chichen-Itza",
    image: {
      uri: "https://media.tacdn.com/media/attractions-splice-spp-674x446/07/be/c6/6b.jpg",
    },
    price: "$154",
    location: "Merida, MX",
    features: {
      left: ["Local Visit", "Business Tours", "Transportation"],
      right: ["Pet Friendly", "Nature & Adventure"],
    },
    description:
      "Chichén Itzá es uno de los principales sitios arqueológicos de la península de Yucatán, en México. Fue y sigue siendo un centro ceremonial y urbano maya, uno de los principales asentamientos de esta cultura durante el período Posclásico.",
    details: {
      groupSize: "1-6",
      duration: "Full day",
      entryFees: "25$ per person",
      transportation: "Includes",
    },
    itinerary: [
      {
        title: "3 pickup location options",
        description:
          "Parque de Santa Ana, Viajes Collorí Yucatán TOURS, Entrada Avenida Cupules del Hotel Fiesta Americana.",
      },
      {
        title: "Van (2 hours)",
        description: "",
      },
      {
        title: "Chichén Itzá",
        description:
          "Photo stop, Visit, Guided tour, Free time, Shopping (2.5 hours)",
      },
      {
        title: "Van (15 minutes)",
        description: "",
      },
      {
        title: "Cenote Ik Kil",
        description: "Lunch, Swimming (2.5 hours)",
      },
    ],
    images: [
      "https://media.tacdn.com/media/attractions-splice-spp-674x446/07/be/c6/6b.jpg",
      "https://tse1.mm.bing.net/th/id/OIP.4ApXIXa9iW_s5J13uMnIqwHaE0?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://images.pexels.com/photos/16987280/pexels-photo-16987280/free-photo-of-chichen-itza.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://th.bing.com/th/id/R.4bc76d901f09bd98285a250bfa7b5a9a?rik=Hj%2fx%2bVSYVQEiag&riu=http%3a%2f%2fimages2.fanpop.com%2fimages%2fphotos%2f5900000%2fChichen-Itza-mexico-5942392-1600-1200.jpg&ehk=QVctrBWkqYP%2bjQYIBK%2f2CMZ%2f2IDk%2fyhCNoqIAjo9AF4%3d&risl=&pid=ImgRaw&r=0",
      "https://th.bing.com/th/id/R.ef1673cfcbed253e6f37fd03f3e4d173?rik=olY5LQh4uh1Vxg&pid=ImgRaw&r=0",
      "https://th.bing.com/th/id/R.71d526add644f78fd124e5d93a79e897?rik=8DNa1%2fro6J9wEg&pid=ImgRaw&r=0",
    ],
  },
  {
    id: "2",
    title: "Playa Forum Cancun",
    image: {
      uri: "https://th.bing.com/th/id/R.5346077e7c92b4ba1ccf476b8a0545b0?rik=p8fyVpoCoSoLOg&pid=ImgRaw&r=0",
    },
    price: "$120",
    location: "Cancun, MX",
    features: {
      left: ["Nature", "Swimming", "Transportation"],
      right: ["Pet Friendly", "Adventure"],
    },
    description:
      "La Ruta de los Cenotes es un corredor turístico que comprende más de 50 cenotes en el municipio de Puerto Morelos. Es una experiencia única para nadar en aguas cristalinas y explorar la naturaleza.",
    details: {
      groupSize: "1-8",
      duration: "6-8 hours",
      entryFees: "15$ per person",
      transportation: "Includes",
    },
    itinerary: [
      {
        title: "Hotel pickup",
        description: "We pick you up at your hotel",
      },
      {
        title: "Transportation (1 hour)",
        description: "",
      },
      {
        title: "Cenote Las Mojarras",
        description: "Swimming and snorkeling (2 hours)",
      },
      {
        title: "Cenote Siete Bocas",
        description: "Exploration and lunch (2.5 hours)",
      },
    ],
    images: [
      "https://th.bing.com/th/id/R.5346077e7c92b4ba1ccf476b8a0545b0?rik=p8fyVpoCoSoLOg&pid=ImgRaw&r=0",
      "https://i.ytimg.com/vi/nDWrykct_38/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGBggXih_MA8=&rs=AOn4CLA6XBMyFmN35CtZxTrNW7Z85-AHvQ",
      "https://a.cdn-hotels.com/gdcs/production30/d565/b75c0c19-be56-4132-819e-b174cee81509.jpg?impolicy=fcrop&w=1600&h=1066&q=medium",
    ],
  },
  {
    id: "3",
    title: "El cielito de Cozumel",
    image: {
      uri: "https://th.bing.com/th/id/R.03e6b134179929f7b0e56de4db2e936b?rik=Yr%2fVkg0wzV7C2A&pid=ImgRaw&r=0",
    },
    price: "$135",
    location: "Cozumel, MX",
    features: {
      left: ["Cultural", "Guided Tour", "Transportation"],
      right: ["Photography", "History"],
    },
    description:
      "El cielito es un sitio arqueológico maya ubicado en el estado de Yucatán. Es conocido por sus impresionantes estructuras y su rica historia.",
    details: {
      groupSize: "1-10",
      duration: "6 hours",
      entryFees: "20$ per person",
      transportation: "Includes",
    },
    itinerary: [
      {
        title: "Morning departure",
        description: "Pickup at 7:00 AM",
      },
      {
        title: "Guided tour",
        description: "Explore the Pyramid of the Magician and other structures",
      },
      {
        title: "Lunch",
        description: "Traditional Yucatecan cuisine",
      },
    ],
    images: [
      "https://th.bing.com/th/id/R.03e6b134179929f7b0e56de4db2e936b?rik=Yr%2fVkg0wzV7C2A&pid=ImgRaw&r=0",
      "https://www.mexperience.com/wp-content/uploads/Uxmal-Yucatan.jpg",
      "https://www.visitmexico.com/viajemospormexico/assets/uploads/destinos/yucatan_destinos-principales_uxmal_01.jpg",
    ],
  },
  {
    id: "4",
    title: "Cenote Ik Kil",
    image: {
      uri: "https://th.bing.com/th/id/R.cd801fb271777ffdc7d81ba4de844013?rik=tJ0M%2fR5RrjaZ5A&pid=ImgRaw&r=0",
    },
    price: "$50",
    location: "Merida, MX",
    features: {
      left: ["Swimming", "Nature", "Photography"],
      right: ["Family Friendly", "Adventure"],
    },
    description:
      "El cenote Ik Kil es uno de los cenotes más famosos de Yucatán, conocido por su belleza natural y sus aguas cristalinas. Es un lugar ideal para nadar y relajarse.",
    details: {
      groupSize: "1-20",
      duration: "3 hours",
      entryFees: "10$ per person",
      transportation: "Not included",
    },
    itinerary: [
      {
        title: "Arrival at cenote",
        description: "Free time to explore and swim",
      },
      {
        title: "Lunch options available",
        description: "",
      },
    ],
    images: [
      "https://th.bing.com/th/id/R.cd801fb271777ffdc7d81ba4de844013?rik=tJ0M%2fR5RrjaZ5A&pid=ImgRaw&r=0",
      "https://tse2.mm.bing.net/th/id/OIP.JPiVODGevQSNRas2lqswvwHaJ4?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://tse2.mm.bing.net/th/id/OIP.GXOJeaJHZNawDDgtEBcB8QHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    ],
  },
  {
    id: "5",
    title: "Tulum Ruins",
    image: {
      uri: "https://th.bing.com/th/id/R.fb0ac15f8b122c9adc64d00b32077866?rik=38RfBUsQKj1uuw&pid=ImgRaw&r=0",
    },
    price: "$80",
    location: "Tulum, MX",
    features: {
      left: ["Cultural", "Guided Tour", "Transportation"],
      right: ["Beach Access", "History"],
    },
    description:
      "Las Ruinas de Tulum son un antiguo puerto maya en la costa caribeña de México. Es famoso por sus impresionantes vistas al mar y su rica historia.",
    details: {
      groupSize: "1-15",
      duration: "4 hours",
      entryFees: "15$ per person",
      transportation: "Includes",
    },
    itinerary: [
      {
        title: "Morning tour",
        description: "Explore the ruins with a guide",
      },
      {
        title: "Free time at the beach",
        description: "",
      },
    ],
    images: [
      "https://th.bing.com/th/id/R.fb0ac15f8b122c9adc64d00b32077866?rik=38RfBUsQKj1uuw&pid=ImgRaw&r=0",
      "https://www.goatsontheroad.com/wp-content/uploads/2021/05/tulum-mayan-ruins-in-Mexico-720x504.jpg",
      "https://th.bing.com/th/id/R.2c6339947f0ff12374c295ba6e6871e2?rik=Wecd3aarRt1rhg&riu=http%3a%2f%2fwww.tulum.com%2fwp-content%2fuploads%2f2013%2f01%2ftulum-ruins-2.png&ehk=EmN%2fHtn4cR%2f8NOKV8HCkCdJa6Jw%2fTXkWXDQMZ0puHSY%3d&risl=&pid=ImgRaw&r=0",
    ],
  },
  {
    id: "6",
    title: "Punta Esmeralda",
    image: {
      uri: "https://quintanaroo.quadratin.com.mx/www/wp-content/uploads/2021/10/b966015c-f62d-48e3-8e66-d14c27a7d731.jpg",
    },
    price: "$60",
    location: "Playa del Carmen, MX",
    features: {
      left: ["Swimming", "Sunbathing", "Beach Clubs"],
      right: ["Family Friendly", "Water Sports"],
    },
    description:
      "Playa del Carmen es conocida por sus playas de arena blanca y su vibrante vida nocturna. Es un destino ideal para relajarse y disfrutar del sol.",
    details: {
      groupSize: "1-30",
      duration: "Full day",
      entryFees: "Free",
      transportation: "Not included",
    },
    itinerary: [
      {
        title: "Arrival at the beach",
        description: "Free time to explore and relax",
      },
      {
        title: "Lunch options available",
        description: "",
      },
    ],
    images: [
      "https://quintanaroo.quadratin.com.mx/www/wp-content/uploads/2021/10/b966015c-f62d-48e3-8e66-d14c27a7d731.jpg",
      "https://static.vecteezy.com/system/resources/previews/004/754/989/large_2x/playa-del-carmen-mexico-26-september-2021-tropical-mexican-beach-88-punta-esmeralda-playa-del-carmen-mexico-free-photo.jpg",
    ],
  },
  {
    id: "7",
    title: "Xcaret Park",
    image: {
      uri: "https://th.bing.com/th/id/R.ecca8d0481e3133d2e55b6a795189d98?rik=NXGymP6QjhwIWQ&riu=http%3a%2f%2fwww.playadelcarmen.com%2fblog%2fwp-content%2fuploads%2fXcaret.03.jpg&ehk=DyD%2fFTxY3U0y7Zbyqu%2fecBLqjc%2fS9VTQrLc8qsSz9a8%3d&risl=&pid=ImgRaw&r=0"
    },
    price: "$70",
    location: "Playa del Carmen, MX",
    features: {
      left: ["Swimming", "Snorkeling", "Guided Tour"],
      right: ["Family Friendly", "Restrooms"]
    },
    description:
      "Xcaret Park es un parque eco-arqueológico en la Riviera Maya, que ofrece una mezcla de cultura mexicana, naturaleza y diversión.",
    details: {
      groupSize: "1-30",
      duration: "Full day",
      entryFees: "100$ per person",
      transportation: "Not included"
    },
    itinerary: [
      {
        title: "Arrival at the cenote",
        description: "Free time to explore and swim"
      },
      {
        title: "Guided snorkeling tour",
        description: "Discover the underwater world"
      }
    ],
    images: [
      "https://th.bing.com/th/id/R.ecca8d0481e3133d2e55b6a795189d98?rik=NXGymP6QjhwIWQ&riu=http%3a%2f%2fwww.playadelcarmen.com%2fblog%2fwp-content%2fuploads%2fXcaret.03.jpg&ehk=DyD%2fFTxY3U0y7Zbyqu%2fecBLqjc%2fS9VTQrLc8qsSz9a8%3d&risl=&pid=ImgRaw&r=0",
      "https://tse3.mm.bing.net/th/id/OIP.-AAA9cuHz85ER0Dw2oA4xgHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://mediaim.expedia.com/localexpert/189689/43ef3b77-7820-4d16-bb32-3575c9bf02eb.jpg?impolicy=resizecrop&rw=1005&rh=565"
    ]
  },
  {
    id: "8",
    title: "Cenote Dos Ojos",
    image: {
      uri: "https://tse3.mm.bing.net/th/id/OIP.b3Ct5Pe-TYhweLntILQynwHaEb?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    price: "$80",
    location: "Tulum, MX",
    features: {
      left: ["Swimming", "Snorkeling", "Guided Tour"],
      right: ["Family Friendly", "Restrooms"]
    },
    description:
      "Cenote Dos Ojos es un impresionante sistema de cenotes en la Riviera Maya, famoso por sus aguas cristalinas y su belleza natural.",
    details: {
      groupSize: "1-20",
      duration: "3 hours",
      entryFees: "10$ per person",
      transportation: "Not included"
    },
    itinerary: [
      {
        title: "Arrival at the cenote",
        description: "Free time to explore and swim"
      },
      {
        title: "Guided snorkeling tour",
        description: "Discover the underwater world"
      }
    ],
    images: [
      "https://quintanaroo.quadratin.com.mx/www/wp-content/uploads/2022/02/WhatsApp-Image-2022-02-11-at-7.11.51-PM.jpeg",
      "https://tse1.mm.bing.net/th/id/OIP.YHdanKjI8q5yAVE5X1_MYgHaFj?r=0&w=1600&h=1200&rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://tse2.mm.bing.net/th/id/OIP.Z94W-AnbMptjHtetI94MsAHaE8?r=0&w=1000&h=667&rs=1&pid=ImgDetMain&o=7&rm=3"
    ]
  },
  {
    id: "9",
    title: "Rio Secreto",
    image: { uri: "https://www.turismomexico.es/wp-content/uploads/2023/01/rio_secreto_mexico.jpg" },
    price: "$90",
    location: "Playa del Carmen, MX",
    features: {
      left: ["Caving", "Guided Tour", "Transportation"],
      right: ["Family Friendly", "Adventure"]
    },
    description:
      "Rio Secreto es un sistema de ríos subterráneos en la Riviera Maya, conocido por sus impresionantes formaciones de estalactitas y estalagmitas.",
    details: {
      groupSize: "1-15",
      duration: "3 hours",
      entryFees: "20$ per person",
      transportation: "Not included"
    },
    itinerary: [
      {
        title: "Arrival at the cenote",
        description: "Free time to explore and swim"
      },
      {
        title: "Guided snorkeling tour",
        description: "Discover the underwater world"
      }
    ],
    images: [
      "https://tse1.mm.bing.net/th/id/OIP._BbWebvYet-oH-MrJpLowQHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://maritur.com/wp-content/uploads/2020/04/rio-secreto-mexico-1024x576-2.jpg",
      "https://th.bing.com/th/id/R.074a8669decd08205d25d0d8b966db23?rik=LqIXAx4YVffmXw&pid=ImgRaw&r=0"
    ]
  },
  {
    id: "10",
    title: "Mr. Sancho's Beach Club",
    image: { uri: "https://th.bing.com/th/id/R.d094fd0959c3f2642ef33bdc6252f3fa?rik=MFAO3hgunOlOyw&pid=ImgRaw&r=0" },
    price: "$100",
    location: "Cozumel, MX",
    features: {
      left: ["Snorkeling", "All-Inclusive", "Family Friendly"],
      right: ["Restrooms", "Food & Drinks"]
    },
    description:
      "Mr. Sancho's Beach Club is a popular beach club in Cozumel, known for its all-inclusive packages and family-friendly atmosphere.",
    details: {
      groupSize: "1-30",
      duration: "6 hours",
      entryFees: "15$ per person",
      transportation: "Included"
    },
    itinerary: [
      {
        title: "Arrival at Mr. Sancho's Beach Club",
        description: "Free time to explore the beach club"
      },
      {
        title: "Guided snorkeling tour",
        description: "Discover the underwater world"
      }
    ],
    images: [
      "https://th.bing.com/th/id/R.d094fd0959c3f2642ef33bdc6252f3fa?rik=MFAO3hgunOlOyw&pid=ImgRaw&r=0",
      "https://th.bing.com/th/id/R.310b129924d4d76eea4c3602aaf9fe2b?rik=Wx3i524yKug26A&pid=ImgRaw&r=0",
      "https://th.bing.com/th/id/R.c6cae24b1a01a2f728f9de331fe59beb?rik=orPc6ZimmZ612Q&pid=ImgRaw&r=0&sres=1&sresct=1"
    ]
  },
  {
    id: "11",
    title: "Buceo en Palancar y Colombia",
    image: { uri: "https://www.dresseldivers.com/wp-content/uploads/Palancar-Reef-Arrecife-Palancar-1.jpg" },
    price: "$120",
    location: "Cozumel, MX",
    features: {
      left: ["Snorkeling", "All-Inclusive", "Family Friendly"],
      right: ["Restrooms", "Food & Drinks"]
    },
    description:
      "Buceo en Palancar y Colombia is a unique diving experience where you can explore the vibrant coral reefs and marine life.",
    details: {
      groupSize: "1-10",
      duration: "3 hours",
      entryFees: "15$ per person",
      transportation: "Included"
    },
    itinerary: [
      {
        title: "Arrival at Cozumel",
        description: "Free time to explore the area"
      },
      {
        title: "Guided snorkeling tour",
        description: "Discover the underwater world"
      }
    ],
    images: [
      "https://tse2.mm.bing.net/th/id/OIP.tFVIcrf_Q1F8t-DRkxJSbwHaEd?r=0&w=628&h=378&rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://www.dresseldivers.com/wp-content/uploads/Palancar-Reef-Arrecife-Palancar-1.jpg",
      "https://tse2.mm.bing.net/th/id/OIP.XNgvYBE4i-yEjZ-E8azmEAHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    ]
  },
  {
    id: "12",
    title: "Sian Ka'an Biosphere",
    image: { uri: "https://tse2.mm.bing.net/th/id/OIP.oldR_ZWKcBLiUC0ZkhQ4hgHaFM?r=0&rs=1&pid=ImgDetMain&o=7&rm=3g" },
    price: "$120",
    location: "Tulum, MX",
    features: {
      left: ["Snorkeling", "All-Inclusive", "Family Friendly"],
      right: ["Restrooms", "Food & Drinks"]
    },
    description:
      "Sian Ka'an Biosphere is a unique diving experience where you can explore the vibrant coral reefs and marine life.",
    details: {
      groupSize: "1-10",
      duration: "3 hours",
      entryFees: "15$ per person",
      transportation: "Included"
    },
    itinerary: [
      {
        title: "Arrival at Tulum",
        description: "Free time to explore the area"
      },
      {
        title: "Guided snorkeling tour",
        description: "Discover the underwater world"
      }
    ],
    images: [
      "https://tse2.mm.bing.net/th/id/OIP.oldR_ZWKcBLiUC0ZkhQ4hgHaFM?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://tse3.mm.bing.net/th/id/OIP.D5GUwOVUC6oqqPGQaTP_hAHaE9?r=0&w=1200&h=803&rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://tse1.mm.bing.net/th/id/OIP.5VG_s5Y-VkKcKOcNIdZFIQHaFa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://images.squarespace-cdn.com/content/v1/570d3048f699bb1e46683c68/1608672033353-9Y97W0C7QPD94OOOAOCK/Maya_Luxe_Magazine_Luxury_Villa_Rentals_Sian_Kaan_Biosphere_Reserve_Hero_1.jpg"
    ]
  },
  {
    id: "13",
    title: "Paseo en catamarán",
    image: { uri: "https://tse3.mm.bing.net/th/id/OIP.PlN9Inwrr_eDFS1JmF3DawHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
    price: "$120",
    location: "Cancun, MX",
    features: {
      left: ["Snorkeling", "All-Inclusive", "Family Friendly"],
      right: ["Restrooms", "Food & Drinks"]
    },
    description:
      "Paseo en catamarán es una experiencia única en la que podrás disfrutar de las hermosas vistas de la costa de Cancún.",
    details: {
      groupSize: "1-10",
      duration: "8 hours",
      entryFees: "15$ per person",
      transportation: "Included"
    },
    itinerary: [
      {
        title: "Arrival at Cancun",
        description: "Free time to explore the area"
      },
      {
        title: "Guided snorkeling tour",
        description: "Discover the underwater world"
      }
    ],
    images: [
      "https://tse3.mm.bing.net/th/id/OIP.PlN9Inwrr_eDFS1JmF3DawHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://www.civitatis.com/f/mexico/cancun/excursion-isla-mujeres-catamaran-589x392.jpg",
      "https://tse2.mm.bing.net/th/id/OIP.tCAhW_ZvXIv1u4O6ANrk0AHaE8?r=0&w=768&h=512&rs=1&pid=ImgDetMain&o=7&rm=3"
    ]
  },
  {
    id: "13",
    title: "Celestun",
    image: { uri: "https://media-cdn.tripadvisor.com/media/photo-s/0f/9d/55/ef/celestine.jpg" },
    price: "$120",
    location: "Merida, MX",
    features: {
      left: ["Snorkeling", "All-Inclusive", "Family Friendly"],
      right: ["Restrooms", "Food & Drinks"]
    },
    description:
      "Celestun es una experiencia única en la que podrás disfrutar de las hermosas vistas de la costa de Merida.",
    details: {
      groupSize: "1-10",
      duration: "8 hours",
      entryFees: "15$ per person",
      transportation: "Included"
    },
    itinerary: [
      {
        title: "Arrival at Merida",
        description: "Free time to explore the area"
      },
      {
        title: "Guided snorkeling tour",
        description: "Discover the underwater world"
      }
    ],
    images: [
      "https://media-cdn.tripadvisor.com/media/photo-s/0f/9d/55/ef/celestine.jpg",
      "https://cdn.mexicodestinos.com/tours/tour-celestun-merida-playa.jpg",
      "https://mediaim.expedia.com/destination/2/61d6c8081d5d5fece92585d914e75176.jpg"
    ]
  },
  {
    id: "14",
    title: "Uxmal",
    image: { uri: "https://tse1.mm.bing.net/th/id/OIP._8IS7sOzDW2yk5jGym9CaQHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
    price: "$120",
    location: "Merida, MX",
    features: {
      left: ["Snorkeling", "All-Inclusive", "Family Friendly"],
      right: ["Restrooms", "Food & Drinks"]
    },
    description:
      "Uxmal es una experiencia única en la que podrás disfrutar de las hermosas vistas de la costa de Merida.",
    details: {
      groupSize: "1-10",
      duration: "all day",
      entryFees: "15$ per person",
      transportation: "Included"
    },
    itinerary: [
      {
        title: "Arrival at Merida",
        description: "Free time to explore the area"
      },
      {
        title: "Guided tour of Uxmal",
        description: "Discover the ancient Mayan ruins"
      }
    ],
    images: [
      "https://tse1.mm.bing.net/th/id/OIP._8IS7sOzDW2yk5jGym9CaQHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://adventuresofaplusk.com/wp-content/uploads/2023/02/DSC03529-684x1024.jpg",
      "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/245000/245719-Uxmal.jpg"
    ]
  }
];

export default function ToursScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [searchText, setSearchText] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);

  const [tempFilters, setTempFilters] = useState({
    location: null,
    price: null,
    duration: null,
  });

  const isActive = (routeName) => route.name === routeName;

  const filteredTours = popularTours.filter((tour) => {
    const matchesSearch =
      tour.title.toLowerCase().includes(searchText.toLowerCase()) ||
      tour.location.toLowerCase().includes(searchText.toLowerCase());
    const matchesLocation = selectedLocation
      ? tour.location === selectedLocation
      : true;

    let priceValue = parseInt(tour.price.replace("$", ""));
    let matchesPrice = true;
    if (selectedPrice === 80) matchesPrice = priceValue <= 80;
    else if (selectedPrice === 150)
      matchesPrice = priceValue > 80 && priceValue <= 150;
    else if (selectedPrice === 151) matchesPrice = priceValue > 150;

    let matchesDuration = true;
    if (selectedDuration === "short")
      matchesDuration = tour.details.duration.includes("3 hours");
    else if (selectedDuration === "medium")
      matchesDuration =
        tour.details.duration.includes("4") ||
        tour.details.duration.includes("6") ||
        tour.details.duration.includes("8");
    else if (selectedDuration === "long")
      matchesDuration = tour.details.duration
        .toLowerCase()
        .includes("full day");

    return matchesSearch && matchesLocation && matchesPrice && matchesDuration;
  });

  const locations = [...new Set(popularTours.map((t) => t.location))];
  const priceRanges = [
    { label: "Todos", value: null },
    { label: "Hasta $80", value: 80 },
    { label: "$81 - $150", value: 150 },
    { label: "Más de $150", value: 151 },
  ];
  const durationOptions = [
    { label: "Todas", value: null },
    { label: "3 horas o menos", value: "short" },
    { label: "4-8 horas", value: "medium" },
    { label: "Full day", value: "long" },
  ];

  const renderCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("TourDetail", { tourData: item })}
    >
      <ImageBackground
        source={item.image}
        style={styles.image}
        imageStyle={{ borderRadius: 16 }}
      >
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{item.title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Tours</Text>
        <Text style={styles.subtitle}>Find the place you want to know</Text>

        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#aaa" />
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            placeholderTextColor="#aaa"
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity onPress={() => setShowFilterModal(true)}>
            <Ionicons name="options-outline" size={22} color="#356672" />
          </TouchableOpacity>
        </View>

        {/* Modal filtros */}
        <Modal visible={showFilterModal} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Filtrar tours</Text>

              <Text style={styles.modalLabel}>Ubicación:</Text>
              <View style={styles.optionsContainer}>
                {locations.map((loc) => (
                  <TouchableOpacity
                    key={loc}
                    onPress={() =>
                      setTempFilters((prev) => ({ ...prev, location: loc }))
                    }
                    style={[
                      styles.optionButton,
                      tempFilters.location === loc && styles.selectedOption,
                    ]}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        tempFilters.location === loc &&
                          styles.selectedOptionText,
                      ]}
                    >
                      {loc}
                    </Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  onPress={() =>
                    setTempFilters((prev) => ({ ...prev, location: null }))
                  }
                  style={styles.clearButton}
                  activeOpacity={0.7}
                >
                  <Text style={styles.clearOption}>Limpiar ubicación</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.modalLabel}>Precio:</Text>
              <View style={styles.optionsContainer}>
                {priceRanges.map((range) => (
                  <TouchableOpacity
                    key={range.label}
                    onPress={() =>
                      setTempFilters((prev) => ({
                        ...prev,
                        price: range.value,
                      }))
                    }
                    style={[
                      styles.optionButton,
                      tempFilters.price === range.value &&
                        styles.selectedOption,
                    ]}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        tempFilters.price === range.value &&
                          styles.selectedOptionText,
                      ]}
                    >
                      {range.label}
                    </Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  onPress={() =>
                    setTempFilters((prev) => ({ ...prev, price: null }))
                  }
                  style={styles.clearButton}
                  activeOpacity={0.7}
                >
                  <Text style={styles.clearOption}>Limpiar precio</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.modalLabel}>Duración:</Text>
              <View style={styles.optionsContainer}>
                {durationOptions.map((opt) => (
                  <TouchableOpacity
                    key={opt.value}
                    onPress={() =>
                      setTempFilters((prev) => ({
                        ...prev,
                        duration: opt.value,
                      }))
                    }
                    style={[
                      styles.optionButton,
                      tempFilters.duration === opt.value &&
                        styles.selectedOption,
                    ]}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        tempFilters.duration === opt.value &&
                          styles.selectedOptionText,
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  onPress={() =>
                    setTempFilters((prev) => ({ ...prev, duration: null }))
                  }
                  style={styles.clearButton}
                  activeOpacity={0.7}
                >
                  <Text style={styles.clearOption}>Limpiar duración</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.applyButton]}
                  onPress={() => {
                    setSelectedLocation(tempFilters.location);
                    setSelectedPrice(tempFilters.price);
                    setSelectedDuration(tempFilters.duration);
                    setShowFilterModal(false);
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.actionButtonText}>Aplicar filtros</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.cancelButton]}
                  onPress={() => setShowFilterModal(false)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.actionButtonText, { color: "#5e8b92" }]}>
                    Cancelar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Text style={styles.sectionTitle}>Popular tours</Text>
        <FlatList
          data={filteredTours}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      </View>
      <View style={styles.bottomNav}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.navButton}
        >
          <Ionicons
            name="home"
            size={30}
            color={isActive("Home") ? "#5e8b92" : "#666"}
          />
          {isActive("Home") && <View style={styles.activeIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Tours")}
          style={styles.navButton}
        >
          <FontAwesome5
            name="route"
            size={30}
            color={isActive("Tours") ? "#5e8b92" : "#666"}
          />
          {isActive("Tours") && <View style={styles.activeIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Guides")}
          style={styles.navButton}
        >
          <MaterialIcons
            name="people-alt"
            size={30}
            color={isActive("Guides") ? "#5e8b92" : "#666"}
          />
          {isActive("Guides") && <View style={styles.activeIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Usuario")}
          style={styles.navButton}
        >
          <FontAwesome5
            name="user-circle"
            size={30}
            color={isActive("Usuario") ? "#5e8b92" : "#666"}
          />
          {isActive("Usuario") && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export { popularTours };

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 100,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontFamily: "PlayfairDisplay_700Bold",
    color: "#5e8b92",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginTop: 1,
    fontFamily: "PlayfairDisplay_700Bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 24,
    marginTop: 23,
    justifyContent: "space-between",
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    paddingHorizontal: 8,
    color: "#000",
  },
  sectionTitle: {
    fontSize: 19,
    fontFamily: "PlayfairDisplay_700Bold",
    marginBottom: 12,
    color: "#000",
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    width: "48%",
    height: 120,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  labelContainer: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 4,
    borderTopRightRadius: 12,
  },
  label: {
    fontFamily: "PlayfairDisplay_400Regular",
    fontSize: 16,
    color: "#000",
  },
  bottomNav: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  navButton: {
    alignItems: "center",
    padding: 5,
  },
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#5e8b92",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    width: "85%",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#356672",
  },
  modalLabel: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  optionButton: {
    padding: 8,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginTop: 5,
  },
  selectedOption: {
    backgroundColor: "#5e8b92",
  },
  clearOption: {
    padding: 8,
    color: "#5e8b92",
    textAlign: "center",
  },
  modalButtons: {
    marginTop: 20,
    gap: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
    marginBottom: 15,
    gap: 8,
  },

  optionButton: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  selectedOption: {
    backgroundColor: "#5e8b92",
    shadowOpacity: 0.3,
    elevation: 5,
  },

  optionText: {
    color: "#333",
    fontWeight: "600",
  },

  selectedOptionText: {
    color: "#fff",
  },

  clearButton: {
    backgroundColor: "#e0f0f0",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: 5,
  },

  clearOption: {
    color: "#5e8b92",
    fontWeight: "600",
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 12,
  },

  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  applyButton: {
    backgroundColor: "#5e8b92",
  },

  cancelButton: {
    backgroundColor: "#d2e8e7",
  },

  actionButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
