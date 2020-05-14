import React, {FC} from 'react'
import {Menu} from "antd"
import './styles.scss'
import BoxIcon from '../../../assets/icons/box.svg'
import TableIcon from '../../../assets/icons/table-up.svg'


const SideMenu: FC = (props) => {
    return (
        <Menu
            className='side-menu'
            theme={'dark'}
        >
            <Menu.Item className='side-menu__item'>
                <img src={BoxIcon} className="side-menu__icon" alt=""/>
            </Menu.Item>
            <Menu.Item className='side-menu__item'>
                <img src={TableIcon} className="side-menu__icon" alt=""/>
            </Menu.Item>
        </Menu>
    )
}

export default SideMenu
