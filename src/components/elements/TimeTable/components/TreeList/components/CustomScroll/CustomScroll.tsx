import React from 'react'

type ScrollProps = {
    onDeltaChange(delta: number): void
}

const CustomScroll: React.FC = (props) => {
    return (
        <div className={'app-scrollbar_wrapper'}>
            <div className="app-scrollbar"></div>
        </div>
    )
}

export default CustomScroll
