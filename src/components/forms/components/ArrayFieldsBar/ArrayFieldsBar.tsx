import React, {FC} from 'react'
import {Button, Space, Tooltip} from "antd";
import PlusIcon from "../../../../assets/icons/plus.svg";
import TrashIcon from "../../../../assets/icons/trash.svg";

type BarProps = {
    addNewField: () => void
    removeLast: () => void
    isDisabledDelete: boolean
}

const ArrayFieldBar: FC<BarProps> = (props) => {
    return (
        <Space>
            <Tooltip title={'Добавить еще одну'}>
                <Button shape='circle' onClick={() => {
                    props.addNewField()
                }}  icon={<img src={PlusIcon}/>} className={'full-icon'}/>
            </Tooltip>
            <Tooltip title={'Удалить'} >
                <Button disabled={props.isDisabledDelete} shape='circle' onClick={() => {
                    props.removeLast()
                }} icon={<img src={TrashIcon}/>}/>
            </Tooltip>
        </Space>
    )
}

export default ArrayFieldBar
