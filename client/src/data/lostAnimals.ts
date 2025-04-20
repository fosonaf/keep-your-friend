export type LostAnimal = {
    species: 'Chat' | 'Chien' | 'Autre';
    location: string;
    color: string;
    imageUrl: string;
    gender: 'Male' | 'Female';
    distinctiveMarkings: string;
};

export const lostAnimals: LostAnimal[] = [
    {
        species: 'Chat',
        location: 'Paris',
        imageUrl: 'https://www.lesrecettesdedaniel.fr/modules/hiblog/views/img/upload/original/488818546d009ef951fa45b42f404daa.jpg',
        gender: 'Female',
        distinctiveMarkings: 'White spot on the forehead',
        color: 'White',
    },
    {
        species: 'Chat',
        location: 'Lyon',
        imageUrl: 'https://www.lesrecettesdedaniel.fr/modules/hiblog/views/img/upload/original/488818546d009ef951fa45b42f404daa.jpg',
        gender: 'Male',
        distinctiveMarkings: 'Black spot on the back',
        color: 'Black',
    },
    {
        species: 'Chien',
        location: 'Lyon',
        imageUrl: 'https://www.lesrecettesdedaniel.fr/modules/hiblog/views/img/upload/original/488818546d009ef951fa45b42f404daa.jpg',
        gender: 'Male',
        distinctiveMarkings: 'Black spot on the back',
        color: 'Black',
    },
    {
        species: 'Chat',
        location: 'Lyon',
        imageUrl: 'https://www.lesrecettesdedaniel.fr/modules/hiblog/views/img/upload/original/488818546d009ef951fa45b42f404daa.jpg',
        gender: 'Male',
        distinctiveMarkings: 'Black spot on the back',
        color: 'Black',
    },
    {
        species: 'Chat',
        location: 'Lyon',
        imageUrl: 'https://www.lesrecettesdedaniel.fr/modules/hiblog/views/img/upload/original/488818546d009ef951fa45b42f404daa.jpg',
        gender: 'Male',
        distinctiveMarkings: 'Black spot on the back',
        color: 'Black',
    },
    {
        species: 'Chat',
        location: 'Lille',
        imageUrl: 'https://www.lesrecettesdedaniel.fr/modules/hiblog/views/img/upload/original/488818546d009ef951fa45b42f404daa.jpg',
        gender: 'Male',
        distinctiveMarkings: 'Black spot on the back',
        color: 'Black',
    }
];
