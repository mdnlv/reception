import React from "react"
import {Tabs, Descriptions} from "antd";

import './styles.scss'
import {DataItemType} from "./types";

import PaginationSearchList from "../../lists/PaginationSearchList/PaginationSearchList";

const arr: DataItemType[] = []
for(let i = 0; i < 90; i++){
    arr.push({
        id: i,
        title: `title ${i}`,
        phone: 'test',
        address: 'test'
    })
}

const InfoPageTabs: React.FC = () => {
    return (
        <div className={'info-page-tabs'}>
            <Tabs size={'small'}>
                <Tabs.TabPane key={'1'} tab='Графики больниц'>
                    <p>Графики больниц</p>
                </Tabs.TabPane>
                <Tabs.TabPane key={'2'} tab='Контакты больниц'>
                    <PaginationSearchList<DataItemType>
                      data={arr} perPage={42}
                      renderItem={(item) => {
                        return (
                            <Descriptions
                              className={'hospital-description'}
                              title={item.title}
                              column={1}
                              size={'small'}
                            >
                                <Descriptions.Item
                                  className={'hospital-description__item'}
                                  label="адрес"
                                >{item.address}</Descriptions.Item>
                                <Descriptions.Item
                                  className={'hospital-description__item'}
                                  label="телефон"
                                >{item.phone}</Descriptions.Item>
                            </Descriptions>
                        )
                    }}/>
                </Tabs.TabPane>
                <Tabs.TabPane key={'3'} tab='Контакты филиалов'>
                    <p>dsf</p>
                </Tabs.TabPane>
                <Tabs.TabPane key={'4'} tab='Памятка диспансер'>
                    <p>dsf</p>
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}

export default InfoPageTabs
