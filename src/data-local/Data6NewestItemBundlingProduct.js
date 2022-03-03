export const media = [
    {
        id: 1,
        photo: 'https://live.staticflickr.com/65535/51800343677_290c820c8c_b.jpg',
        title: 'Bundling 1 Pair Character Foam Pillow',
        price: 210000,
        promo_price: 115000,
        material: '100 % Premium Foam',
        size: {
            length: 55,
            width_or_diameter: 70
        },
        rating: 5,
        weight: 1200,
        desc: 'Bantal kesehatan terbuat dari Premium Foam. Bantal yang dirancang untuk sepenuhnya menopang leher dan bahu anda 100 % katun untuk kenyamanan tidur anda ,serat premium foam terkonjungsi berongga untuk keempukkan extra dan dan sirkulasi udara yang baik.'
    },
    {
        id: 2,
        photo: 'https://live.staticflickr.com/65535/51800343527_06e75ff357_b.jpg',
        title: 'Bundling 2 Char Foam Pillow 1 Bolster',
        price: 310000,
        promo_price: 175000,
        material: '100 % Premium Foam',
        size: {
            length: 55,
            width_or_diameter: 70
        },
        rating: 5,
        weight: 1200,
        desc: 'Bantal kesehatan terbuat dari Premium Foam. Bantal yang dirancang untuk sepenuhnya menopang leher dan bahu anda 100 % katun untuk kenyamanan tidur anda ,serat premium foam terkonjungsi berongga untuk keempukkan extra dan dan sirkulasi udara yang baik.'
    },
    {
        id: 3,
        photo: 'https://live.staticflickr.com/65535/51801410363_778ef1fc09_b.jpg',
        title: 'Bundling 1 Pair Pillow Bolster Microfiber',
        price: 500000,
        promo_price: 298000,
        material: '100 % Microfiber ',
        size: {
            length: 90,
            width_or_diameter: 20
        },
        rating: 5,
        weight: 1500,
        desc: 'Bantal microfiber adalah bantal berbahan Microfiber yang memiliki komposisi serat yang sangat halus berukuran kurang dari 1 denier (berdiameter 0,006mm), (setengah diameter dari serat sutra, sepertiga ukuran dari serat katun, dan seperempat dari ukuran serat wol). Microfiber adalah produk bebas serat, non-abrasif, dan hypoallergenic yang memungkinkan Anda untuk membersihkan tanpa menggunakan bahan kimia. Tidak seperti produk kapas dan kertas tradisional menyeka atau pel katun yang cenderung mendorong kotoran dan debu, microfiber benar-benar menyerap kotoran dan kuman, mengangkat mereka dari permukaan dan menjebak mereka sampai kain atau mop dicuci. Oleh karena itu, bahan kimia tidak diperlukan.'
    },
    {
        id: 4,
        photo: 'https://live.staticflickr.com/65535/51802020125_656c45ee9b_b.jpg',
        title: 'Bundling 2 Microfiber Bolster',
        price: 500000,
        promo_price: 298000,
        material: '100 % Microfiber ',
        size: {
            length: 90,
            width_or_diameter: 20
        },
        rating: 5,
        weight: 1500,
        desc: 'Bantal microfiber adalah bantal berbahan Microfiber yang memiliki komposisi serat yang sangat halus berukuran kurang dari 1 denier (berdiameter 0,006mm), (setengah diameter dari serat sutra, sepertiga ukuran dari serat katun, dan seperempat dari ukuran serat wol). Microfiber adalah produk bebas serat, non-abrasif, dan hypoallergenic yang memungkinkan Anda untuk membersihkan tanpa menggunakan bahan kimia. Tidak seperti produk kapas dan kertas tradisional menyeka atau pel katun yang cenderung mendorong kotoran dan debu, microfiber benar-benar menyerap kotoran dan kuman, mengangkat mereka dari permukaan dan menjebak mereka sampai kain atau mop dicuci. Oleh karena itu, bahan kimia tidak diperlukan.'
    },
    {
        id: 5,
        photo: 'https://live.staticflickr.com/65535/51800343352_e4ee146105_b.jpg',
        title: 'Bundling 2 Microfiber Pillow',
        price: 500000,
        promo_price: 298000,
        material: '100 % Microfiber ',
        size: {
            length: 90,
            width_or_diameter: 20
        },
        rating: 5,
        weight: 1500,
        desc: 'Bantal microfiber adalah bantal berbahan Microfiber yang memiliki komposisi serat yang sangat halus berukuran kurang dari 1 denier (berdiameter 0,006mm), (setengah diameter dari serat sutra, sepertiga ukuran dari serat katun, dan seperempat dari ukuran serat wol). Microfiber adalah produk bebas serat, non-abrasif, dan hypoallergenic yang memungkinkan Anda untuk membersihkan tanpa menggunakan bahan kimia. Tidak seperti produk kapas dan kertas tradisional menyeka atau pel katun yang cenderung mendorong kotoran dan debu, microfiber benar-benar menyerap kotoran dan kuman, mengangkat mereka dari permukaan dan menjebak mereka sampai kain atau mop dicuci. Oleh karena itu, bahan kimia tidak diperlukan.'
    },
    {
        id: 6,
        photo: 'https://live.staticflickr.com/65535/51800343157_1746247def_b.jpg',
        title: 'Countour Pillow Bundling',
        price: 300000,
        promo_price: 165000,
        material: '100 % Premium Foam',
        size: {
            length: 55,
            width_or_diameter: 70
        },
        rating: 5,
        weight: 1200,
        desc: 'Bantal kesehatan terbuat dari Premium Foam. Bantal yang dirancang untuk sepenuhnya menopang leher dan bahu anda 100 % katun untuk kenyamanan tidur anda ,serat premium foam terkonjungsi berongga untuk keempukkan extra dan dan sirkulasi udara yang baik.'
    }
];

export const Data6NewestItemBundlingProduct = (index) => media[index % media.length];
