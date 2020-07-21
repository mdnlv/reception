import React, {FC, useMemo, useState} from 'react'
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

    const iconBody = useMemo(() => {
        if(isShown){
            return <DownOutlined style={{marginTop: '4px'}}/>
        }else{
            return <UpOutlined/>
        }
    }, [isShown])

    return (
        <div className={'drop-down__wrapper'}>
            <div className="drop-down__title">
                <h2>{props.title}</h2>
                <Button size={'small'}  shape={'circle'} className={'drop-down-btn'} onClick={(e) => {
                    changeShown()
                }} icon={iconBody}/>
            </div>
            {isShown && <div className="drop-down__content">
                {props.children}
            </div>}
        </div>
    )
}

export default DropDownContent
