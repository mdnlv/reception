import React, {useMemo} from "react";
import {PlusOutlined} from "@ant-design/icons/lib";
import './styles.scss'
import {Popover} from "antd";
import {PlaceItemEvent} from "../../../../../../types";

type CardProps = {
    type: 'closed' | 'non-time' | 'opened'
    popoverContent?: React.ReactNode
    isPopover?: boolean
    showType: 'day' | 'week'
}

const RowItemCard: React.FC<CardProps> = (props) => {

    const getBackgroundClass = useMemo(() => {
        return `row-item-card--${props.type}`
    }, [props.type])

    const showTypeClass = useMemo(() => {
        if(props.showType === 'day'){
            return 'row-item-card--day'
        }else{
            return 'row-item-card--week'
        }
    }, [props.showType])

    const cardBody = useMemo(() => {
        if(props.isPopover && props.popoverContent){
            return <Popover overlayClassName={'row-item-card__popover'} placement={'bottomLeft'} content={props.popoverContent}>
                <div className={'row-item-card__wrapper'}>
                    <div className={`row-item-card ${getBackgroundClass} ${showTypeClass}`}>
                    </div>
                </div>
            </Popover>
        }else{
            return <div className={'row-item-card__wrapper'}>
                <div className={`row-item-card ${getBackgroundClass} ${showTypeClass}`}>
                    {props.type === 'opened' && <PlusOutlined />}
                </div>
            </div>
        }
    }, [props.type, props.isPopover, props.popoverContent])

    return (
        <>
            {cardBody}
        </>
    )
}

export default RowItemCard
