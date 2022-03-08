import faker from 'faker';
import { sample } from 'lodash';

// utils
// import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------
const number = () => {
    for (let i = 1; i <= 100; i++) {
        return i;
    }
};

const users = [...Array(24)].map((_, index) => ({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    company: faker.company.companyName(),
    isVerified: faker.datatype.boolean(),
    status: sample(['active', 'banned']),
    email: faker.internet.email(),
    role: sample([
        'Leader',
        'Hr Manager',
        'UI Designer',
        'UX Designer',
        'UI/UX Designer',
        'Project Manager',
        'Backend Developer',
        'Full Stack Designer',
        'Front End Developer',
        'Full Stack Developer'
    ]),
    noPelanggan: number(),
    statusPayment: sample(['Done', 'Waiting for Payment', 'Delivering', 'Cancelled']),
    dateJoin: sample(['13-01-2022'])
}));

export default users;
