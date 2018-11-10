import React from 'react'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'
import Panel from '../../UI/Panel/Panel'

const search = (props) => {
    const defaultValue = {
        value: '',
        name: 'Select a service type',
    }

    let selectElem = <Input inputType="select"
                            label="Tipo de servicio"
                            value={defaultValue.value}
                            onChange={props.onServiceTypeChange}
                            defaultValue={defaultValue}
                            />

    if(props.serviceTypeOptions) {
        selectElem = <Input inputType="select"
                label="Tipo de Servicio:"
                type="text"
                placeholder="Seleccione un tipo de servicio"
                onChange={props.onServiceTypeChange}
                value={props.serviceTypeValue}
                defaultValue={props.serviceTypeDefault}
                options={props.serviceTypeOptions} />
    }

    return (
        <Panel className={props.className}>
            <Input inputType="input"
                label="Zona:"
                type="text"
                placeholder="Ingrese su direccion"
                onChange={props.onLocationChange}
                value={props.locationValue} />
            {selectElem}
            <Button onClick={props.onSubmitSearch}>
                Buscar
            </Button>
        </Panel>
    )}

export default search