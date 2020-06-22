import React from "react"
import {Formik} from "formik";
import {Button, Col, Divider, Row, Select} from "antd";
import PersonDisabilities from "./components/sections/PersonDisabilities/PersonDisabilities";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import AuthorDateChange from "./components/sections/AuthorDateChange/AuthorDateChange";
import PersonalData from "./components/sections/PersonalData/PersonalData";
import FormField from "../components/FormField/FormField";
import LpuAttachment from "./components/sections/LpuAttachment/LpuAttachment";
import RpfAcceptPeriod from "./components/sections/RpfAcceptPeriod/RpfAcceptPeriod";
import PreventiveMeasures from "./components/sections/PreventiveMeasures/PreventiveMeasures";
import OutsideIdn from "./components/sections/OutsideIdn/OutsideIdn";
import MedIntolerance from "../FeaturesForm/components/sections/MedIntolerance/MedIntolerance";

const PatientSearchFilterForm: React.FC = (props) => {
    const store = useSelector((state: RootState) => state.searchPatientFilters)


    return (
        <Formik
            initialValues={{...store}}
            onSubmit={() => {}}
        >
            {(formProps) => (
                <form className={'patient-search-filter-form'}>
                    <Row>
                        <Col span={10}>
                            <PersonDisabilities/>
                        </Col>
                    </Row>
                    <Divider/>
                    <Row>
                        <Col span={7}>
                            <AuthorDateChange/>
                        </Col>
                        <Col span={6}>
                            <PersonalData/>
                        </Col>
                        <Col span={5}>
                            <div className={'form-section'}>
                                <h2>По участку</h2>
                                <Row>
                                    <Col span={24}>
                                        <FormField>
                                            <Select/>
                                        </FormField>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <FormField>
                                            <Select/>
                                        </FormField>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col span={3}>
                            <div className={'form-section'}>
                                <h2>По койкам</h2>
                                <Row>
                                    <Col span={24}>
                                        <FormField>
                                            <Select/>
                                        </FormField>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <FormField>
                                            <Select/>
                                        </FormField>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col span={3}>
                            <div className={'form-section'}>
                                <h2>Прикрепление</h2>
                                <Row>
                                    <Col span={24}>
                                        <FormField>
                                            <Select/>
                                        </FormField>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <FormField>
                                            <Select/>
                                        </FormField>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                    <Divider/>
                    <Row>
                        <Col span={6}>
                            <LpuAttachment/>
                        </Col>
                        <Col span={4}>
                            <RpfAcceptPeriod/>
                        </Col>
                        <Col span={6}>
                            <PreventiveMeasures/>
                        </Col>
                        <Col span={7}>
                            <OutsideIdn/>
                        </Col>
                    </Row>
                    <Row gutter={8} justify={'end'}>
                        <Col>
                            <Button type={'primary'} danger>
                                Сбросить
                            </Button>
                        </Col>
                        <Col>
                            <Button type={'primary'} className={'save-btn'}>
                                Прмиенить фильтры
                            </Button>
                        </Col>
                    </Row>
                </form>
            )}
        </Formik>
    )
}

export default PatientSearchFilterForm
