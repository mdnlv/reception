import React, {useState} from "react"
import PatientHappeningsHeader from "./components/PatientHappeningsHeader/PatientHappeningsHeader";
import './styles.scss'
import {Col, Row} from "antd";
import PatientHappeningsList from "./components/PatienHappeningsList/PatientHappeningsList";
import UploadDoc from "../../modals/UploadDoc/UploadDoc";

const listData = [
    {
        id: '1',
        type: 'Осмотр',
        assignDoc: 'Болотов В.К.',
        executedDoc: 'Болотов В.Д',
        state: 'Закончено',
        startDate: new Date()
    },
    {
        id: '2',
        type: 'Осмотр',
        assignDoc: 'Болотов В.К.',
        executedDoc: 'Болотов В.Д',
        state: 'Закончено',
        startDate: new Date()
    }
]

const PatientHappenings: React.FC = (props) => {

    const [selectedHappening, setSelectedHappening] = useState<number | undefined>(1)
    const [isVisibleModal, setVisibleModal] = useState(false)

    const selectHappening = (index: number) => {
        if(selectedHappening !== index){
            setSelectedHappening(index)
        }else{
            setSelectedHappening(undefined)
        }
    }

    const showUploadModal = () => {
        setVisibleModal(true)
    }

    return (
        <div className={'patient-happenings-card'}>
            <div className="patient-happenings-card__header">
                <h3 className={'header-title'}>Случаи</h3>
            </div>
            <div className="patient-happenings-card__content">
                <PatientHappeningsHeader uploadDoc={showUploadModal} selectedHappening={selectedHappening}/>
                <Row>
                    <Col span={24}>
                        <PatientHappeningsList data={listData} onSelect={selectHappening} selectedItem={selectedHappening}/>
                    </Col>
                </Row>
            </div>
            <UploadDoc onClose={() => {
                setVisibleModal(false)
            }} isVisible={isVisibleModal}/>
        </div>
    )
}

export default PatientHappenings
