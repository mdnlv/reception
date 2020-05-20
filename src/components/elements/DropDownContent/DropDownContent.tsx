import React, {FC, useState} from 'react'
import {Button} from "antd";
import {DownOutlined, UpOutlined} from "@ant-design/icons/lib"
import './styles.scss'

type DropDownProps = {
    title?: string
}

const DropDownContent: FC<DropDownProps> = (props) => {

    const [isShown, setIsShown] = useState(true)

    function changeShown() {
        setIsShown(!isShown)
    }

    function getIcon() {
        if(isShown){
            return <DownOutlined style={{marginTop: '4px'}}/>
        }else{
            return <UpOutlined/>
        }
    }

    return (
        <div className={'drop-down__wrapper'}>
            <div className="drop-down__title">
                <h2>{props.title}</h2>
                <Button size={'small'}  shape={'circle'} className={'dropdown-btn'} onClick={(e) => {
                    changeShown()
                }} icon={getIcon()}/>
            </div>
            {isShown && <div className="drop-down__content">
                {props.children}
            </div>}
        </div>
    )
}

export default DropDownContent
