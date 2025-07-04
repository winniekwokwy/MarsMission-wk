import * as FaIcons from 'react-icons/fa'; 
import * as SiIcons from 'react-icons/si';
import * as MdIcons from 'react-icons/md';

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <FaIcons.FaHome />
    },
    {
        title: 'Mars Fact',
        path: '/Fact',
        icon: <MdIcons.MdOutlineFactCheck />
    },
    {
        title: 'Quiz',
        path: '/Quiz',
        icon: <SiIcons.SiQuizlet />
    }
]
