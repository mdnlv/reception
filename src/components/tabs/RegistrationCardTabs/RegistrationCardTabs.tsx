import React, {FC} from 'react'
import {Tabs} from "antd"
import PassportGeneralPage from "./pages/PassportGeneralPage/PassportGeneralPage"
import './styles.scss'

const RegistrationCardTabs: FC = (props) => {
    return (
        <div  className='registration-card-tabs'>
            <Tabs type='card' defaultActiveKey={'1'} animated={true}>
                <Tabs.TabPane key={'1'} tab='Паспортные данные'>
                    <PassportGeneralPage/>
                </Tabs.TabPane>
                <Tabs.TabPane key={'2'} tab='Паспортные данные'>
                    <PassportGeneralPage/>
                </Tabs.TabPane>
                <Tabs.TabPane key={'3'} tab='Паспортные данные'>
                    <PassportGeneralPage/>
                </Tabs.TabPane>
                <Tabs.TabPane key={'4'} tab='Паспортные данные'>
                    <PassportGeneralPage/>
                </Tabs.TabPane>
                <Tabs.TabPane key={'5'} tab='Паспортные данные'>
                    <PassportGeneralPage/>
                </Tabs.TabPane>
                <Tabs.TabPane key={'6'} tab='Паспортные данные'>
                    <PassportGeneralPage/>
                </Tabs.TabPane>
                <Tabs.TabPane key={'7'} tab='Паспортные данные'>
                    <PassportGeneralPage/>
                </Tabs.TabPane>
                <Tabs.TabPane key={'8'} tab='Паспортные данные'>
                    <PassportGeneralPage/>
                </Tabs.TabPane>
                <Tabs.TabPane key={'9'} tab='Паспортные данные'>
                    <PassportGeneralPage/>
                </Tabs.TabPane>
                <Tabs.TabPane key={'10'} tab='Паспортные данные'>
                    <PassportGeneralPage/>
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}

export default RegistrationCardTabs
