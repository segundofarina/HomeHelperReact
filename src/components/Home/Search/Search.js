import React from 'react'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'
import Panel from '../../UI/Panel/Panel'

const search = (props)=>{
    return (
        <Panel className={props.className}>
            <Input inputType="input"
                label="Zona:"
                type="text"
                placeholder="Ingrese su direccion" />
            <Input inputType="input"
                label="Tipo de Servicio:"
                type="text"
                placeholder="Seleccione un tipo de servicio" />
            <Button>
                Buscar
            </Button>
        </Panel>
    )}

export default search