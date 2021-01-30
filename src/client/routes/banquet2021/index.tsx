import { hot } from 'react-hot-loader';
import { Banquet } from './Banquet2021';
import { BanquetTeam } from './BanquetTeam';
import { BanquetMember } from './BanquetMember';
import { BanquetMemberList } from './BanquetMemberList'; 
import { BanquetAdmin } from './BanquetAdmin';

const Banquet2021 = hot(module)(Banquet);

export {
    Banquet2021,
    BanquetTeam,
    BanquetMember,
    BanquetMemberList,
    BanquetAdmin
}