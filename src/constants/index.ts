export const navigation = [
    {
      title: "New Arrivals",
      href: "/new-arrivals",
    },
    {
      title: "Brands",
      href: "/brands",
      dropdown: [
        { title: "Popular Brands", href: "/brands/popular" },
        { title: "All Brands", href: "/brands/all" },
      ],
    },
    {
      title: "Makeup",
      href: "/makeup",
      dropdown: [
        { title: "Face", href: "/makeup/face" },
        { title: "Eyes", href: "/makeup/eyes" },
        { title: "Lips", href: "/makeup/lips" },
      ],
    },
    {
      title: "Skin",
      href: "/skin",
      dropdown: [
        {
          title: "Face Care",
          href: "/skin/face-care",
          subItems: [
            { title: "Cleanser", href: "/skin/face-care/cleanser" },
            { title: "Moisturizer & Creams", href: "/skin/face-care/moisturizer" },
            { title: "Micellar Water", href: "/skin/face-care/micellar" },
            { title: "Serums & Essence", href: "/skin/face-care/serums" },
            { title: "Toners", href: "/skin/face-care/toners" },
          ],
        },
        {
          title: "Eye Care",
          href: "/skin/eye-care",
          subItems: [],
        },
        {
          title: "Body Care",
          href: "/skin/body-care",
          subItems: [],
        },
      ],
    },
    {
      title: "Hair",
      href: "/hair",
    },
    {
      title: "Fragrance",
      href: "/fragrance",
    },
    {
      title: "Combos & Gift Sets",
      href: "/combos",
    },
  ];
  