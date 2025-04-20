export type LostAnimal = {
    species: 'Chat' | 'Chien' | 'Autre';
    location: string;
    color: string;
    imageUrl: string;
    gender: 'Male' | 'Female';
    distinctiveMarkings: string;
    lat: number;
    lng: number;
};

export const lostAnimals: LostAnimal[] = [
    {
        species: 'Chat',
        location: 'Paris',
        imageUrl: 'https://www.lesrecettesdedaniel.fr/modules/hiblog/views/img/upload/original/488818546d009ef951fa45b42f404daa.jpg',
        gender: 'Female',
        distinctiveMarkings: 'White spot on the forehead',
        color: 'White',
        lat: 48.8566,
        lng: 2.3522
    },
    {
        species: 'Chat',
        location: 'Lyon',
        imageUrl: 'https://www.lesrecettesdedaniel.fr/modules/hiblog/views/img/upload/original/488818546d009ef951fa45b42f404daa.jpg',
        gender: 'Male',
        distinctiveMarkings: 'Black spot on the back',
        color: 'Black',
        lat: 45.7640,
        lng: 4.8357
    },
    {
        species: 'Chien',
        location: 'Lyon',
        imageUrl: 'https://www.lesrecettesdedaniel.fr/modules/hiblog/views/img/upload/original/488818546d009ef951fa45b42f404daa.jpg',
        gender: 'Male',
        distinctiveMarkings: 'Black spot on the back',
        color: 'Black',
        lat: 45.7578,
        lng: 4.8320
    },
    {
        species: 'Chat',
        location: 'Lyon',
        imageUrl: 'https://www.lesrecettesdedaniel.fr/modules/hiblog/views/img/upload/original/488818546d009ef951fa45b42f404daa.jpg',
        gender: 'Male',
        distinctiveMarkings: 'Black spot on the back',
        color: 'Black',
        lat: 45.7500,
        lng: 4.8500
    },
    {
        species: 'Chat',
        location: 'Lyon',
        imageUrl: 'https://www.lesrecettesdedaniel.fr/modules/hiblog/views/img/upload/original/488818546d009ef951fa45b42f404daa.jpg',
        gender: 'Male',
        distinctiveMarkings: 'Black spot on the back',
        color: 'Black',
        lat: 45.7680,
        lng: 4.8350
    },
    {
        species: 'Chat',
        location: 'Lille',
        imageUrl: 'https://www.lesrecettesdedaniel.fr/modules/hiblog/views/img/upload/original/488818546d009ef951fa45b42f404daa.jpg',
        gender: 'Male',
        distinctiveMarkings: 'Black spot on the back',
        color: 'Black',
        lat: 50.6292,
        lng: 3.0573
    }
];
