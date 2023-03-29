import { AiOutlineHome, AiOutlineSetting } from 'react-icons/ai'
import { FiUsers, FiUser, FiLogOut } from 'react-icons/fi';
import { FcTodoList } from 'react-icons/fc';
import {FaRegBuilding} from 'react-icons/fa';
import {GrMapLocation} from 'react-icons/gr';
import {RxAvatar} from 'react-icons/rx';
import {RiUserSettingsLine} from 'react-icons/ri'

export const topMenus = [
    { title: "Dashboard", icon: <AiOutlineHome size={"1.2rem"} /> },
    { title: "Gig Execution", icon: <FcTodoList size={"1.2rem"} /> },
    { title: "Companies", icon: <FaRegBuilding size={"1.2rem"} /> },
    { title: "Giggers ", icon: <FiUsers size={"1.2rem"} /> },
    { title: "Gig config", icon: <AiOutlineSetting size={"1.2rem"} /> },
];

export const bottomMenus = [
    { title: "Admin@gigchain.ai", icon: <RxAvatar size={"1.2rem"} /> },
    { title: "Users & Privileges", icon: <RiUserSettingsLine size={"1.2rem"} /> },
    { title: "Profile & Settings", icon: <FiUser size={"1.2rem"} /> },
    { title: "Logout ", icon: <FiLogOut size={"1.2rem"} /> },
];

export const linkMenu = [
  { title: "Gig Allocation", icon: <FaRegBuilding size={"1.2rem"} />, url: 'allocation' },
  { title: "Tracking", icon: <GrMapLocation size={"1.2rem"} />, url: 'track' },
]
