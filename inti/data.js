const rooms = [
  {
    roomNumber: "101",
    type: "Single",
    floor: 1,
    pricePerNight: 1800,
    status: "Available",
    capacity: 1,
    image: {
      url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
      filename: "wenimage"
    }
  },
  {
    roomNumber: "102",
    type: "Double",
    floor: 1,
    pricePerNight: 2800,
    status: "Occupied",
    capacity: 2,
    image: {
      url: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
      filename: "wenimage"
    }
  },
  {
    roomNumber: "103",
    type: "Deluxe",
    floor: 1,
    pricePerNight: 4200,
    status: "Available",
    capacity: 2,
    image: {
      url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
      filename: "wenimage"
    }
  },
  {
    roomNumber: "104",
    type: "Suite",
    floor: 1,
    pricePerNight: 6500,
    status: "Reserved",
    capacity: 4,
    image: {
      url: "https://images.unsplash.com/photo-1591088398332-8a7791972843",
      filename: "wenimage"
    }
  },
  {
    roomNumber: "105",
    type: "Double",
    floor: 1,
    pricePerNight: 3000,
    status: "Cleaning",
    capacity: 2,
    image: {
      url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
      filename: "wenimage"
    }
  },
  {
    roomNumber: "201",
    type: "Single",
    floor: 2,
    pricePerNight: 2000,
    status: "Available",
    capacity: 1,
    image: {
      url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39",
      filename: "wenimage"
    }
  },
  {
    roomNumber: "202",
    type: "Deluxe",
    floor: 2,
    pricePerNight: 4500,
    status: "Occupied",
    capacity: 2,
    image: {
      url: "https://images.unsplash.com/photo-1560185008-b033106af5c3",
      filename: "wenimage"
    }
  },
  {
    roomNumber: "203",
    type: "Suite",
    floor: 2,
    pricePerNight: 7200,
    status: "Available",
    capacity: 4,
    image: {
      url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      filename: "wenimage"
    }
  },
  {
    roomNumber: "204",
    type: "Double",
    floor: 2,
    pricePerNight: 3200,
    status: "Reserved",
    capacity: 2,
    image: {
      url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf",
      filename: "wenimage"
    }
  },
  {
    roomNumber: "205",
    type: "Deluxe",
    floor: 2,
    pricePerNight: 4800,
    status: "Available",
    capacity: 3,
    image: {
      url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
      filename: "wenimage"
    }
  },
  {
    roomNumber: "301",
    type: "Single",
    floor: 3,
    pricePerNight: 2100,
    status: "Available",
    capacity: 1,
    image: {
      url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      filename: "wenimage"
    }
  },
  {
    roomNumber: "302",
    type: "Double",
    floor: 3,
    pricePerNight: 3100,
    status: "Occupied",
    capacity: 2,
    image: {
      url: "https://images.unsplash.com/photo-1615873968403-89e068629265",
      filename: "wenimage"
    }
  },
  {
    roomNumber: "303",
    type: "Deluxe",
    floor: 3,
    pricePerNight: 4600,
    status: "Available",
    capacity: 2,
    image: {
      url: "https://images.unsplash.com/photo-1617104678098-de229db51175",
      filename: "wenimage"
    }
  },
  {
    roomNumber: "304",
    type: "Suite",
    floor: 3,
    pricePerNight: 7800,
    status: "Occupied",
    capacity: 4,
    image: {
      url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
      filename: "wenimage"
    }
  },
  {
    roomNumber: "305",
    type: "Double",
    floor: 3,
    pricePerNight: 3300,
    status: "Cleaning",
    capacity: 2,
    image: {
      url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0",
      filename: "wenimage"
    }
  },
  {
    roomNumber: "401",
    type: "Single",
    floor: 4,
    pricePerNight: 2200,
    status: "Available",
    capacity: 1,
    image: {
      url: "https://images.unsplash.com/photo-1631049035182-249067d7618e",
      filename: "wenimage"
    }
  },
  {
    roomNumber: "402",
    type: "Double",
    floor: 4,
    pricePerNight: 3400,
    status: "Reserved",
    capacity: 2,
    image: {
      url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
      filename: "wenimage"
    }
  },
  {
    roomNumber: "403",
    type: "Deluxe",
    floor: 4,
    pricePerNight: 4900,
    status: "Available",
    capacity: 3,
    image: {
      url: "https://images.unsplash.com/photo-1615529162924-f8605388461d",
      filename: "wenimage"
    }
  },
  {
    roomNumber: "404",
    type: "Suite",
    floor: 4,
    pricePerNight: 8200,
    status: "Occupied",
    capacity: 4,
    image: {
      url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
      filename: "wenimage"
    }
  },
  {
    roomNumber: "405",
    type: "Double",
    floor: 4,
    pricePerNight: 3500,
    status: "Available",
    capacity: 2,
    image: {
      url: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061",
      filename: "wenimage"
    }
  },
  {
    roomNumber: "501",
    type: "Single",
    floor: 5,
    pricePerNight: 2300,
    status: "Available",
    capacity: 1,
    image: {
      url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
      filename: "wenimage"
    }
  },
  {
    roomNumber: "502",
    type: "Double",
    floor: 5,
    pricePerNight: 3600,
    status: "Occupied",
    capacity: 2,
    image: {
      url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      filename: "wenimage"
    }
  },
  {
    roomNumber: "503",
    type: "Deluxe",
    floor: 5,
    pricePerNight: 5200,
    status: "Available",
    capacity: 3,
    image: {
      url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
      filename: "wenimage"
    }
  },
  {
    roomNumber: "504",
    type: "Suite",
    floor: 5,
    pricePerNight: 8500,
    status: "Reserved",
    capacity: 4,
    image: {
      url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      filename: "wenimage"
    }
  },
  {
    roomNumber: "505",
    type: "Double",
    floor: 5,
    pricePerNight: 3700,
    status: "Cleaning",
    capacity: 2,
    image: {
      url: "https://images.unsplash.com/photo-1600566753051-7c3c9f5e0c4b",
      filename: "wenimage"
    }
  },
  {
    roomNumber: "601",
    type: "Deluxe",
    floor: 6,
    pricePerNight: 5500,
    status: "Available",
    capacity: 3,
    image: {
      url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
      filename: "wenimage"
    }
  },
  {
    roomNumber: "602",
    type: "Suite",
    floor: 6,
    pricePerNight: 9000,
    status: "Occupied",
    capacity: 4,
    image: {
      url: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87",
      filename: "wenimage"
    }
  },
  {
    roomNumber: "603",
    type: "Double",
    floor: 6,
    pricePerNight: 3900,
    status: "Available",
    capacity: 2,
    image: {
      url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
      filename: "wenimage"
    }
  },
  {
    roomNumber: "604",
    type: "Deluxe",
    floor: 6,
    pricePerNight: 5800,
    status: "Reserved",
    capacity: 3,
    image: {
      url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
      filename: "wenimage"
    }
  },
  {
    roomNumber: "605",
    type: "Presidential Suite",
    floor: 6,
    pricePerNight: 15000,
    status: "Available",
    capacity: 6,
    image: {
      url: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154",
      filename: "wenimage"
    }
  }
];

module.exports = { data: rooms };
