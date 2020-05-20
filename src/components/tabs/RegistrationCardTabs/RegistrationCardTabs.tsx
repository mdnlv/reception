import React, {FC} from 'react'
import {Tabs} from "antd"
import PassportGeneralPage from "./pages/PassportGeneralPage/PassportGeneralPage"
import './styles.scss'
import SocialStatusPage from "./pages/SocialStatusPage/SocialStatusPage";
import EmploymentPage from "./pages/EmploymentPage/EmploymentPage";
import AttachmentsPage from "./pages/AttachmentsPage/AttachmentsPage";
import ViewTypesPage from "./pages/ViewTypesPage/ViewTypesPage";
import FeaturesPage from "./pages/FeaturesPage/FeaturesPage";
import PrivilegesPage from "./pages/PrivilegesPage/PrivilegesPage";
import OffencesPage from "./pages/OffencesPage/OffencesPage";

const RegistrationCardTabs: FC = (props) => {
    return (
        <div  className='registration-card-tabs'>
            <Tabs defaultActiveKey={'1'} animated={true}>
                <Tabs.TabPane key={'1'} tab='Паспортные данные'>
                    <PassportGeneralPage/>
                </Tabs.TabPane>
                <Tabs.TabPane key={'2'} tab='Социальный статус'>
                    <SocialStatusPage/>
                </Tabs.TabPane>
                <Tabs.TabPane key={'3'} tab='Занятось'>
                    <EmploymentPage/>
                </Tabs.TabPane>
                <Tabs.TabPane key={'4'} tab='Прикрепления'>
                    <AttachmentsPage/>
                </Tabs.TabPane>
                <Tabs.TabPane key={'5'} tab='Вид наблюдения'>
                    <ViewTypesPage/>
                </Tabs.TabPane>
                <Tabs.TabPane key={'6'} tab='Особенности'>
                    <FeaturesPage/>
                </Tabs.TabPane>
                <Tabs.TabPane key={'7'} tab='Льготы/инвалидность'>
                    <PrivilegesPage/>
                </Tabs.TabPane>
                <Tabs.TabPane key={'8'} tab='Правонарушения'>
                    <OffencesPage/>
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
